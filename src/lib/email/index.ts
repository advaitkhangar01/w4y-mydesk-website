import {
  EmailService,
  EmailOptions,
  PurchaseConfirmationEmailData,
  PaymentFailedEmailData,
  RefundEmailData,
} from "./types";
import { APP_CONFIG } from "../config";
import { formatCurrency } from "../utils";

export * from "./types";

class ConsoleEmailService implements EmailService {
  private from = APP_CONFIG.business.email;

  async sendEmail(options: EmailOptions): Promise<boolean> {
    console.log("==================== [TRANSACTIONAL EMAIL] ====================");
    console.log(`From:    ${this.from}`);
    console.log(`To:      ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log("---------------------------------------------------------------");
    if (options.text) {
      console.log(options.text);
    } else {
      console.log(options.html.replace(/<[^>]*>?/gm, " ").trim());
    }
    console.log("===============================================================");
    return true;
  }

  async sendPurchaseConfirmation(
    to: string,
    data: PurchaseConfirmationEmailData
  ): Promise<boolean> {
    const formattedPrice = formatCurrency(data.amount, data.currency);
    const subject = `Your MyDesk Order Confirmation & Access Details [${data.orderNumber}]`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #121317; line-height: 1.6; padding: 24px;">
        <div style="border-bottom: 2px solid #EDF2FA; padding-bottom: 16px; margin-bottom: 24px;">
          <h2 style="margin: 0; color: #4285F4; font-size: 24px; font-weight: 700;">W4Y MyDesk</h2>
          <p style="margin: 4px 0 0 0; color: #555861; font-size: 14px;">Your business, at your desk.</p>
        </div>

        <p>Dear ${data.customerName},</p>
        <p>Thank you for purchasing <strong>MyDesk</strong>. Your payment of <strong>${formattedPrice}</strong> has been successfully verified.</p>

        <div style="background-color: #F8F8FB; border: 1px solid #E2E5EA; border-radius: 8px; padding: 20px; margin: 24px 0;">
          <h3 style="margin-top: 0; color: #121317; font-size: 16px;">Product Access & License</h3>
          <p style="margin: 6px 0; font-size: 14px;"><strong>Order ID:</strong> ${data.orderNumber}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong>License Model:</strong> One license = One device</p>
          <div style="margin: 16px 0 8px 0; padding: 12px; background: #FFFFFF; border: 1px dashed #4285F4; border-radius: 6px; font-family: monospace; font-size: 16px; font-weight: 600; text-align: center; color: #121317; letter-spacing: 1px;">
            ${data.licenseKey}
          </div>
          <p style="font-size: 12px; color: #555861; margin: 0 text-align: center;">Keep this license key secure. You will enter it during the desktop application setup.</p>
        </div>

        <div style="margin: 24px 0;">
          <a href="${data.downloadUrl}" style="display: inline-block; background-color: #4285F4; color: #FFFFFF; font-weight: 600; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 15px;">
            Download MyDesk Application
          </a>
          <span style="display: block; font-size: 12px; color: #555861; margin-top: 8px;">(Secure protected link, valid for authorized access)</span>
        </div>

        <p style="font-size: 14px;">You can also view and print your official proforma invoice here:<br />
          <a href="${data.invoiceUrl}" style="color: #4285F4; text-decoration: underline;">View Proforma Invoice</a>
        </p>

        <div style="border-top: 1px solid #EDF2FA; margin-top: 32px; padding-top: 16px; font-size: 13px; color: #555861;">
          <p style="margin: 2px 0;"><strong>${APP_CONFIG.business.legalName}</strong></p>
          <p style="margin: 2px 0;">${APP_CONFIG.business.addressLine1} ${APP_CONFIG.business.addressLine2}</p>
          <p style="margin: 2px 0;">${APP_CONFIG.business.cityStateZip}</p>
          <p style="margin: 2px 0;">Support: <a href="mailto:${APP_CONFIG.business.email}" style="color: #555861;">${APP_CONFIG.business.email}</a> | ${APP_CONFIG.business.phone}</p>
        </div>
      </div>
    `;

    return this.sendEmail({
      to,
      subject,
      html,
      text: `Hello ${data.customerName},\nThank you for purchasing MyDesk. Order: ${data.orderNumber}. License Key: ${data.licenseKey}. Download: ${data.downloadUrl}. Invoice: ${data.invoiceUrl}`,
    });
  }

  async sendPaymentFailure(to: string, data: PaymentFailedEmailData): Promise<boolean> {
    const formattedPrice = formatCurrency(data.amount, data.currency);
    const subject = `Payment Not Completed: MyDesk Order [${data.orderNumber}]`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #121317; padding: 24px;">
        <h2 style="color: #EA4335;">Payment Could Not Be Completed</h2>
        <p>Dear ${data.customerName},</p>
        <p>We noticed that your payment attempt of <strong>${formattedPrice}</strong> for MyDesk order <strong>${data.orderNumber}</strong> was not successfully completed.</p>
        <p>No charge has been deducted. If funds were debited, your bank will release them back shortly.</p>
        <p>You can complete your checkout at any time:</p>
        <p><a href="${data.retryUrl}" style="display: inline-block; background-color: #4285F4; color: #fff; padding: 10px 20px; border-radius: 6px; text-decoration: none;">Retry Checkout</a></p>
        <p>If you need assistance, please reply to this email (${APP_CONFIG.business.email}).</p>
      </div>
    `;

    return this.sendEmail({ to, subject, html });
  }

  async sendRefundNotification(to: string, data: RefundEmailData): Promise<boolean> {
    const formattedPrice = formatCurrency(data.amount, data.currency);
    const subject = `Refund Recorded: MyDesk Order [${data.orderNumber}]`;

    const html = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #121317; padding: 24px;">
        <h2 style="color: #121317;">Refund Confirmation</h2>
        <p>Dear ${data.customerName},</p>
        <p>A refund of <strong>${formattedPrice}</strong> has been recorded for your MyDesk order <strong>${data.orderNumber}</strong>.</p>
        ${data.refundReason ? `<p><strong>Reason:</strong> ${data.refundReason}</p>` : ""}
        <p>The associated license and product access have been deactivated accordingly.</p>
        <p>If you have any questions, contact us at ${APP_CONFIG.business.email}.</p>
      </div>
    `;

    return this.sendEmail({ to, subject, html });
  }
}

let emailServiceInstance: EmailService | null = null;

export function getEmailService(): EmailService {
  if (!emailServiceInstance) {
    emailServiceInstance = new ConsoleEmailService();
  }
  return emailServiceInstance;
}
