import { prisma } from "./prisma";
import { generateSecureLicenseKey, createDownloadToken } from "./license";
import { createOrGetProformaInvoice } from "./proforma";
import { getEmailService } from "./email";
import { APP_CONFIG } from "./config";
import { OrderStatus, PaymentStatus, AccessStatus, LicenseStatus, ProductHealthState } from "@prisma/client";

export interface FulfillOrderParams {
  orderId: string;
  providerPaymentId: string;
  provider: string;
  paidAmount?: number;
  paidCurrency?: string;
  rawResponse?: unknown;
}

export async function fulfillPaidOrder(params: FulfillOrderParams) {
  // Use a database transaction to guarantee atomic fulfillment
  return prisma.$transaction(async (tx) => {
    const order = await tx.order.findUnique({
      where: { id: params.orderId },
      include: {
        customer: true,
        payment: true,
        productAccess: { include: { license: true } },
      },
    });

    if (!order) {
      throw new Error(`Order ${params.orderId} not found`);
    }

    if (order.status === OrderStatus.PAID) {
      return { success: true, alreadyPaid: true, order };
    }

    // 1. Update Payment record to PAID
    if (order.payment) {
      await tx.payment.update({
        where: { id: order.payment.id },
        data: {
          status: PaymentStatus.PAID,
          provider: params.provider,
          providerPaymentId: params.providerPaymentId,
          paidAt: new Date(),
        },
      });
    } else {
      await tx.payment.create({
        data: {
          orderId: order.id,
          customerId: order.customerId,
          amount: order.amount,
          currency: order.currency,
          status: PaymentStatus.PAID,
          provider: params.provider,
          providerPaymentId: params.providerPaymentId,
          paidAt: new Date(),
        },
      });
    }

    // 2. Mark Order as PAID
    const updatedOrder = await tx.order.update({
      where: { id: order.id },
      data: { status: OrderStatus.PAID },
    });

    // 3. Create or ensure ProductAccess record
    let access = await tx.productAccess.findUnique({
      where: { orderId: order.id },
    });

    if (!access) {
      access = await tx.productAccess.create({
        data: {
          customerId: order.customerId,
          orderId: order.id,
          productName: APP_CONFIG.commercial.productName,
          status: AccessStatus.ACTIVE,
        },
      });
    }

    // 4. Generate Cryptographically Secure License
    let license = await tx.license.findUnique({
      where: { accessId: access.id },
    });

    if (!license) {
      const secureKey = generateSecureLicenseKey();
      license = await tx.license.create({
        data: {
          accessId: access.id,
          licenseKey: secureKey,
          status: LicenseStatus.ACTIVE,
        },
      });
    }

    // 5. Initialize ProductHealth record with initial state UNKNOWN
    const health = await tx.productHealth.findUnique({
      where: { accessId: access.id },
    });

    if (!health) {
      await tx.productHealth.create({
        data: {
          accessId: access.id,
          state: ProductHealthState.UNKNOWN,
          lastChecked: new Date(),
        },
      });
    }

    // 6. Generate Proforma Invoice
    await createOrGetProformaInvoice({
      orderId: order.id,
      customerName: order.customer.name,
      customerEmail: order.customer.email,
      customerPhone: order.customer.phone || undefined,
      customerBusiness: order.customer.businessName || undefined,
      amount: Number(order.amount),
      currency: order.currency,
    });

    // 7. Generate Protected Download Token
    const downloadToken = createDownloadToken(order.id, access.id);
    const downloadUrl = `${APP_CONFIG.brand.url}/order/download?token=${downloadToken}`;
    const invoiceUrl = `${APP_CONFIG.brand.url}/order/${order.orderNumber}/invoice`;

    // 8. Trigger Email notifications asynchronously
    const emailService = getEmailService();
    emailService
      .sendPurchaseConfirmation(order.customer.email, {
        customerName: order.customer.name,
        orderNumber: order.orderNumber,
        amount: Number(order.amount),
        currency: order.currency,
        licenseKey: license.licenseKey,
        downloadUrl,
        invoiceUrl,
      })
      .catch((err) => console.error("Error sending confirmation email:", err));

    return {
      success: true,
      alreadyPaid: false,
      order: updatedOrder,
      licenseKey: license.licenseKey,
      downloadToken,
      downloadUrl,
      invoiceUrl,
    };
  });
}
