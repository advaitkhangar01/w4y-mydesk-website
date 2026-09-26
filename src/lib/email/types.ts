export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export interface PurchaseConfirmationEmailData {
  customerName: string;
  orderNumber: string;
  amount: number;
  currency: string;
  licenseKey: string;
  downloadUrl: string;
  invoiceUrl: string;
}

export interface PaymentFailedEmailData {
  customerName: string;
  orderNumber: string;
  amount: number;
  currency: string;
  retryUrl: string;
}

export interface RefundEmailData {
  customerName: string;
  orderNumber: string;
  amount: number;
  currency: string;
  refundReason?: string;
}

export interface EmailService {
  sendEmail(options: EmailOptions): Promise<boolean>;
  sendPurchaseConfirmation(to: string, data: PurchaseConfirmationEmailData): Promise<boolean>;
  sendPaymentFailure(to: string, data: PaymentFailedEmailData): Promise<boolean>;
  sendRefundNotification(to: string, data: RefundEmailData): Promise<boolean>;
}
