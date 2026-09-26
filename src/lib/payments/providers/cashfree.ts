import crypto from "crypto";
import { PaymentProvider, CreatePaymentOrderInput, PaymentOrderResult, VerifyPaymentInput, VerifyPaymentResult } from "../types";

export class CashfreeProvider implements PaymentProvider {
  readonly name = "CASHFREE";
  private appId: string;
  private secretKey: string;
  private webhookSecret: string;
  private baseUrl: string;

  constructor() {
    this.appId = process.env.CASHFREE_APP_ID || "";
    this.secretKey = process.env.CASHFREE_SECRET_KEY || "";
    this.webhookSecret = process.env.CASHFREE_WEBHOOK_SECRET || "";
    this.baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://api.cashfree.com/pg"
        : "https://sandbox.cashfree.com/pg";
  }

  async createOrder(input: CreatePaymentOrderInput): Promise<PaymentOrderResult> {
    if (!this.appId || !this.secretKey) {
      throw new Error("Cashfree credentials not configured. Please add CASHFREE_APP_ID and CASHFREE_SECRET_KEY in .env.");
    }

    const response = await fetch(`${this.baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": this.appId,
        "x-client-secret": this.secretKey,
      },
      body: JSON.stringify({
        order_id: input.orderNumber,
        order_amount: input.amount,
        order_currency: input.currency.toUpperCase(),
        customer_details: {
          customer_id: input.orderId,
          customer_email: input.customerEmail,
          customer_phone: input.customerPhone || "9999999999",
          customer_name: input.customerName,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cashfree order creation failed: ${errorText}`);
    }

    const data = (await response.json()) as { order_id: string; payment_session_id?: string };

    return {
      providerOrderId: data.order_id,
      amount: input.amount,
      currency: input.currency,
      provider: this.name,
      clientPayload: {
        paymentSessionId: data.payment_session_id,
        orderId: data.order_id,
      },
    };
  }

  async verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    if (!this.appId || !this.secretKey) {
      throw new Error("Cashfree credentials not configured.");
    }

    // Cashfree authoritative check: fetch order status from Cashfree API
    const response = await fetch(`${this.baseUrl}/orders/${input.providerOrderId}`, {
      headers: {
        "x-api-version": "2023-08-01",
        "x-client-id": this.appId,
        "x-client-secret": this.secretKey,
      },
    });

    if (!response.ok) {
      return { isVerified: false, paymentId: input.providerPaymentId, amount: 0, currency: "INR" };
    }

    const data = (await response.json()) as { order_status: string; order_amount: number; order_currency: string };
    const isVerified = data.order_status === "PAID";

    return {
      isVerified,
      paymentId: input.providerPaymentId || input.providerOrderId,
      amount: data.order_amount,
      currency: data.order_currency,
      rawResponse: data,
    };
  }

  async verifyWebhook(rawBody: string, signature: string): Promise<{ isVerified: boolean; eventData?: unknown }> {
    if (!this.webhookSecret) {
      return { isVerified: false };
    }

    const expectedSignature = crypto
      .createHmac("sha256", this.webhookSecret)
      .update(rawBody)
      .digest("base64");

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
