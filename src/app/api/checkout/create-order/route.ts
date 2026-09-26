import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getPaymentProvider } from "@/lib/payments";
import { APP_CONFIG } from "@/lib/config";
import { generateOrderNumber } from "@/lib/utils";
import { createOrGetProformaInvoice } from "@/lib/proforma";
import { CustomerStatus, OrderStatus, PaymentStatus } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const checkoutSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  businessName: z.string().optional(),
  currency: z.string().default("INR"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = checkoutSchema.parse(body);

    // 1. Find or create customer
    let customer = await prisma.customer.findUnique({
      where: { email: validated.email.toLowerCase() },
    });

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: validated.name,
          email: validated.email.toLowerCase(),
          phone: validated.phone || null,
          businessName: validated.businessName || null,
          status: CustomerStatus.ACTIVE,
        },
      });
    } else {
      // Update phone or business name if provided
      customer = await prisma.customer.update({
        where: { id: customer.id },
        data: {
          name: validated.name,
          phone: validated.phone || customer.phone,
          businessName: validated.businessName || customer.businessName,
        },
      });
    }

    const orderNumber = generateOrderNumber();
    const amount = APP_CONFIG.commercial.price;
    const currency = validated.currency.toUpperCase();

    // 2. Create pending order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerId: customer.id,
        amount: new Decimal(amount),
        currency,
        status: OrderStatus.PENDING,
      },
    });

    // 3. Initiate payment order via provider abstraction
    const paymentProvider = getPaymentProvider();
    const providerOrder = await paymentProvider.createOrder({
      orderId: order.id,
      orderNumber: order.orderNumber,
      amount,
      currency,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone || undefined,
    });

    // 4. Create pending payment record
    await prisma.payment.create({
      data: {
        orderId: order.id,
        customerId: customer.id,
        amount: new Decimal(amount),
        currency,
        status: PaymentStatus.PENDING,
        provider: paymentProvider.name,
        providerOrderId: providerOrder.providerOrderId,
      },
    });

    // 5. Generate Proforma invoice immediately so it's accessible during purchase
    const proformaInvoice = await createOrGetProformaInvoice({
      orderId: order.id,
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone || undefined,
      customerBusiness: customer.businessName || undefined,
      amount,
      currency,
    });

    return NextResponse.json({
      success: true,
      orderId: order.id,
      orderNumber: order.orderNumber,
      amount,
      currency,
      provider: paymentProvider.name,
      clientPayload: providerOrder.clientPayload,
      invoiceNumber: proformaInvoice.invoiceNumber,
    });
  } catch (error: unknown) {
    console.error("Checkout order creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.errors[0]?.message || "Invalid input data" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Unable to initialize checkout. Please try again." },
      { status: 500 }
    );
  }
}
