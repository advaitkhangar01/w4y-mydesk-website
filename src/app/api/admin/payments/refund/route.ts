import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminFromSession } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getEmailService } from "@/lib/email";
import { PaymentStatus, OrderStatus, LicenseStatus, AccessStatus, AuditAction } from "@prisma/client";

const refundSchema = z.object({
  paymentId: z.string().min(1, "Payment ID is required"),
  reason: z.string().optional(),
});

export async function POST(req: NextRequest) {
  const admin = await getAdminFromSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = refundSchema.parse(body);

    const payment = await prisma.payment.findUnique({
      where: { id: validated.paymentId },
      include: {
        order: {
          include: {
            customer: true,
            productAccess: {
              include: { license: true },
            },
          },
        },
      },
    });

    if (!payment) {
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    if (payment.status === PaymentStatus.REFUNDED) {
      return NextResponse.json({ error: "Payment is already marked as refunded" }, { status: 400 });
    }

    const now = new Date();

    // 1. Mark payment as REFUNDED with reason and date
    const updatedPayment = await prisma.payment.update({
      where: { id: payment.id },
      data: {
        status: PaymentStatus.REFUNDED,
        refundReason: validated.reason || "Manual refund recorded by administrator",
        refundedAt: now,
      },
    });

    // 2. Mark order as REFUNDED
    await prisma.order.update({
      where: { id: payment.orderId },
      data: { status: OrderStatus.REFUNDED },
    });

    // 3. Deactivate product access & revoke license
    if (payment.order.productAccess) {
      await prisma.productAccess.update({
        where: { id: payment.order.productAccess.id },
        data: { status: AccessStatus.INACTIVE },
      });

      if (payment.order.productAccess.license) {
        await prisma.license.update({
          where: { id: payment.order.productAccess.license.id },
          data: { status: LicenseStatus.REVOKED },
        });
      }
    }

    // 4. Audit Log
    await logAudit({
      action: AuditAction.REFUND_RECORDED,
      adminId: admin.id,
      entityType: "Payment",
      entityId: payment.id,
      details: {
        amount: Number(payment.amount),
        currency: payment.currency,
        orderId: payment.orderId,
        orderNumber: payment.order.orderNumber,
        reason: validated.reason,
      },
    });

    // 5. Send refund notification email
    const emailService = getEmailService();
    await emailService.sendRefundNotification(payment.order.customer.email, {
      customerName: payment.order.customer.name,
      orderNumber: payment.order.orderNumber,
      amount: Number(payment.amount),
      currency: payment.currency,
      refundReason: validated.reason,
    });

    return NextResponse.json({
      success: true,
      payment: updatedPayment,
      message: "Refund recorded manually and license revoked.",
    });
  } catch (error: unknown) {
    console.error("Refund recording error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to record manual refund" }, { status: 500 });
  }
}
