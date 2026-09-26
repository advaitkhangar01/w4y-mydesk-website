import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getPaymentProvider } from "@/lib/payments";
import { fulfillPaidOrder } from "@/lib/fulfillment";

const verifySchema = z.object({
  orderId: z.string().min(1),
  providerOrderId: z.string().min(1),
  providerPaymentId: z.string().min(1),
  providerSignature: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = verifySchema.parse(body);

    const order = await prisma.order.findUnique({
      where: { id: validated.orderId },
      include: { customer: true, payment: true },
    });

    if (!order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Server-side authoritative verification
    const provider = getPaymentProvider();
    const verification = await provider.verifyPayment({
      orderId: validated.orderId,
      providerOrderId: validated.providerOrderId,
      providerPaymentId: validated.providerPaymentId,
      providerSignature: validated.providerSignature,
    });

    if (!verification.isVerified) {
      return NextResponse.json(
        { success: false, error: "Payment verification failed. Invalid gateway signature or unconfirmed transaction." },
        { status: 400 }
      );
    }

    // Fulfill order atomically
    const fulfillment = await fulfillPaidOrder({
      orderId: order.id,
      providerPaymentId: validated.providerPaymentId,
      provider: provider.name,
      paidAmount: Number(order.amount),
      paidCurrency: order.currency,
      rawResponse: verification.rawResponse,
    });

    return NextResponse.json({
      success: true,
      verified: true,
      orderNumber: order.orderNumber,
      licenseKey: fulfillment.licenseKey,
      downloadUrl: fulfillment.downloadUrl,
      invoiceUrl: fulfillment.invoiceUrl,
    });
  } catch (error: unknown) {
    console.error("Payment verification error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0]?.message || "Invalid payload" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Payment verification failed on server." },
      { status: 500 }
    );
  }
}
