import { PaymentProvider, CreatePaymentOrderInput, PaymentOrderResult, VerifyPaymentInput, VerifyPaymentResult } from "../types";
import crypto from "crypto";

export class MockPaymentProvider implements PaymentProvider {
  readonly name = "MOCK";

  async createOrder(input: CreatePaymentOrderInput): Promise<PaymentOrderResult> {
    const mockOrderId = `mock_order_${input.orderNumber}_${Date.now()}`;
    return {
      providerOrderId: mockOrderId,
      amount: input.amount,
      currency: input.currency,
      provider: this.name,
      clientPayload: {
        mode: "mock",
        orderId: mockOrderId,
        amount: input.amount,
        currency: input.currency,
      },
    };
  }

  async verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    // In mock mode, if providerPaymentId is present, we verify server-side
    const isVerified = Boolean(input.providerPaymentId && input.providerOrderId);
    return {
      isVerified,
      paymentId: input.providerPaymentId || `mock_pay_${Date.now()}`,
      amount: 5000,
      currency: "INR",
      rawResponse: { mode: "mock", verifiedAt: new Date().toISOString() },
    };
  }

  async verifyWebhook(rawBody: string, signature: string): Promise<{ isVerified: boolean; eventData?: unknown }> {
    return {
      isVerified: true,
      eventData: { type: "payment.captured", rawBody },
    };
  }
}
