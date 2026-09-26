import { prisma } from "./prisma";
import { APP_CONFIG } from "./config";
import { generateInvoiceNumber } from "./utils";
import { Decimal } from "@prisma/client/runtime/library";

export interface CreateProformaInvoiceInput {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  customerBusiness?: string;
  amount: number;
  currency: string;
}

export async function createOrGetProformaInvoice(input: CreateProformaInvoiceInput) {
  const existing = await prisma.proformaInvoice.findUnique({
    where: { orderId: input.orderId },
  });

  if (existing) {
    return existing;
  }

  const invoiceNumber = generateInvoiceNumber();
  const taxRate = 0; // No GST initially as per prompt specification
  const taxAmount = 0;
  const totalAmount = input.amount;

  return prisma.proformaInvoice.create({
    data: {
      invoiceNumber,
      orderId: input.orderId,
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      customerBusiness: input.customerBusiness,
      amount: new Decimal(input.amount),
      currency: input.currency.toUpperCase(),
      taxRate: new Decimal(taxRate),
      taxAmount: new Decimal(taxAmount),
      totalAmount: new Decimal(totalAmount),
      sellerName: APP_CONFIG.business.legalName,
      sellerAddress: `${APP_CONFIG.business.addressLine1} ${APP_CONFIG.business.addressLine2} ${APP_CONFIG.business.cityStateZip}`,
      sellerEmail: APP_CONFIG.business.email,
      sellerPhone: APP_CONFIG.business.phone,
      sellerWebsite: APP_CONFIG.business.website,
      notes: "This is a proforma invoice for the purchase of W4Y MyDesk commercial license (One device / computer). This document is not a tax invoice.",
    },
  });
}
