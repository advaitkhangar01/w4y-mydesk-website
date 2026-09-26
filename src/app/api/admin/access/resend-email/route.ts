import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getAdminFromSession } from "@/lib/auth";
import { logAudit } from "@/lib/audit";
import { getEmailService } from "@/lib/email";
import { createDownloadToken } from "@/lib/license";
import { APP_CONFIG } from "@/lib/config";
import { AuditAction, OrderStatus } from "@prisma/client";

const resendSchema = z.object({
  customerId: z.string().min(1, "Customer ID is required"),
});

export async function POST(req: NextRequest) {
  const admin = await getAdminFromSession();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validated = resendSchema.parse(body);

    const customer = await prisma.customer.findUnique({
      where: { id: validated.customerId },
      include: {
        orders: {
          where: { status: OrderStatus.PAID },
          orderBy: { createdAt: "desc" },
          take: 1,
          include: {
            productAccess: { include: { license: true } },
          },
        },
      },
    });

    if (!customer || !customer.orders[0]) {
      return NextResponse.json(
        { error: "No paid order found for this customer to resend access." },
        { status: 404 }
      );
    }

    const order = customer.orders[0];
    const productAccess = order.productAccess;
    const license = productAccess?.license;

    if (!productAccess || !license) {
      return NextResponse.json(
        { error: "No active license associated with this order." },
        { status: 404 }
      );
    }

    const freshDownloadToken = createDownloadToken(order.id, productAccess.id);
    const downloadUrl = `${APP_CONFIG.brand.url}/order/download?token=${freshDownloadToken}`;
    const invoiceUrl = `${APP_CONFIG.brand.url}/order/${order.orderNumber}/invoice`;

    const emailService = getEmailService();
    await emailService.sendPurchaseConfirmation(customer.email, {
      customerName: customer.name,
      orderNumber: order.orderNumber,
      amount: Number(order.amount),
      currency: order.currency,
      licenseKey: license.licenseKey,
      downloadUrl,
      invoiceUrl,
    });

    await logAudit({
      action: AuditAction.ACCESS_EMAIL_RESENT,
      adminId: admin.id,
      entityType: "Customer",
      entityId: customer.id,
      details: {
        customerEmail: customer.email,
        orderNumber: order.orderNumber,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Access details and fresh download link resent to ${customer.email}.`,
    });
  } catch (error: unknown) {
    console.error("Resend access error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0]?.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to resend access email" }, { status: 500 });
  }
}
