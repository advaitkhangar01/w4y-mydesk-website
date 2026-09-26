import { NextRequest, NextResponse } from "next/server";
import { getPaymentProvider } from "@/lib/payments";
import { fulfillPaidOrder } from "@/lib/fulfillment";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature =
      req.headers.get("x-razorpay-signature") ||
      req.headers.get("x-webhook-signature") ||
      "";

    const provider = getPaymentProvider();
    const webhookResult = await provider.verifyWebhook(rawBody, signature);

    if (!webhookResult.isVerified) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    // Try to extract provider payment ID & order ID if present in webhook payload
    const event = webhookResult.eventData as Record<string, unknown> | undefined;
    const providerOrderId = (event?.order_id || event?.orderId) as string | undefined;
    const providerPaymentId = (event?.payment_id || event?.paymentId) as string | undefined;

    if (providerOrderId) {
      const payment = await prisma.payment.findFirst({
        where: { providerOrderId },
        include: { order: true },
      });

      if (payment && payment.order) {
        await fulfillPaidOrder({
          orderId: payment.order.id,
          providerPaymentId: providerPaymentId || `wh_${Date.now()}`,
          provider: provider.name,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Webhook processing error" }, { status: 500 });
  }
}
