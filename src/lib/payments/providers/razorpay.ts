import crypto from "crypto";
import { PaymentProvider, CreatePaymentOrderInput, PaymentOrderResult, VerifyPaymentInput, VerifyPaymentResult } from "../types";

export class RazorpayProvider implements PaymentProvider {
  readonly name = "RAZORPAY";
  private keyId: string;
  private keySecret: string;
  private webhookSecret: string;

  constructor() {
    this.keyId = process.env.RAZORPAY_KEY_ID || "";
    this.keySecret = process.env.RAZORPAY_KEY_SECRET || "";
    this.webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "";
  }

  async createOrder(input: CreatePaymentOrderInput): Promise<PaymentOrderResult> {
    if (!this.keyId || !this.keySecret) {
      throw new Error("Razorpay credentials not configured. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.");
    }

    // Razorpay amounts are in smallest currency sub-unit (paise for INR)
    const amountInSubunits = Math.round(input.amount * 100);

    const authHeader = Buffer.from(`${this.keyId}:${this.keySecret}`).toString("base64");
    const response = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authHeader}`,
      },
      body: JSON.stringify({
        amount: amountInSubunits,
        currency: input.currency.toUpperCase(),
        receipt: input.orderNumber,
        notes: {
          customerEmail: input.customerEmail,
          customerName: input.customerName,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Razorpay order creation failed: ${errorText}`);
    }

    const orderData = (await response.json()) as { id: string; amount: number; currency: string };

    return {
      providerOrderId: orderData.id,
      amount: input.amount,
      currency: input.currency,
      provider: this.name,
      clientPayload: {
        key: this.keyId,
        orderId: orderData.id,
        amount: orderData.amount,
        currency: orderData.currency,
      },
    };
  }

  async verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    if (!this.keySecret) {
      throw new Error("Razorpay key secret not configured.");
    }

    if (!input.providerOrderId || !input.providerPaymentId || !input.providerSignature) {
      return { isVerified: false, paymentId: input.providerPaymentId, amount: 0, currency: "INR" };
    }

    const expectedSignature = crypto
      .createHmac("sha256", this.keySecret)
      .update(`${input.providerOrderId}|${input.providerPaymentId}`)
      .digest("hex");

    const isVerified = crypto.timingSafeEqual(
      Buffer.from(input.providerSignature),
      Buffer.from(expectedSignature)
    );

    return {
      isVerified,
      paymentId: input.providerPaymentId,
      amount: 5000,
      currency: "INR",
    };
  }

  async verifyWebhook(rawBody: string, signature: string): Promise<{ isVerified: boolean; eventData?: unknown }> {
    if (!this.webhookSecret) {
      return { isVerified: false };
    }

    const expectedSignature = crypto
      .createHmac("sha256", this.webhookSecret)
      .update(rawBody)
      .digest("hex");

    const isVerified = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );

    return {
      isVerified,
      eventData: JSON.parse(rawBody),
    };
  }
}
