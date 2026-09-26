export interface CreatePaymentOrderInput {
  orderId: string;
  orderNumber: string;
  amount: number;
  currency: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}

export interface PaymentOrderResult {
  providerOrderId: string;
  amount: number;
  currency: string;
  provider: string;
  clientPayload?: Record<string, unknown>; // Data needed by frontend SDK (e.g. key_id, order_id)
}

export interface VerifyPaymentInput {
  orderId: string;
  providerOrderId: string;
  providerPaymentId: string;
  providerSignature?: string;
  rawPayload?: Record<string, unknown>;
}

export interface VerifyPaymentResult {
  isVerified: boolean;
  paymentId: string;
  amount: number;
  currency: string;
  rawResponse?: unknown;
}

export interface PaymentProvider {
  readonly name: string;
  createOrder(input: CreatePaymentOrderInput): Promise<PaymentOrderResult>;
  verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult>;
  verifyWebhook(rawBody: string, signature: string): Promise<{ isVerified: boolean; eventData?: unknown }>;
}
