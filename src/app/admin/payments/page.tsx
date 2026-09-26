import React from "react";
import { prisma } from "@/lib/prisma";
import { PaymentsView } from "./payments-view";

export default async function AdminPaymentsPage() {
  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      order: {
        include: {
          customer: true,
        },
      },
    },
  });

  const serialized = payments.map((p) => ({
    id: p.id,
    orderId: p.orderId,
    orderNumber: p.order.orderNumber,
    customerName: p.order.customer.name,
    customerEmail: p.order.customer.email,
    amount: Number(p.amount),
    currency: p.currency,
    status: p.status,
    provider: p.provider,
    providerPaymentId: p.providerPaymentId,
    refundReason: p.refundReason,
    refundedAt: p.refundedAt?.toISOString() || null,
    paidAt: p.paidAt?.toISOString() || null,
    createdAt: p.createdAt.toISOString(),
  }));

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
          Commercial Management
        </span>
        <h1 className="text-2xl font-bold text-w4y-dark dark:text-white mt-1">
          Payments
        </h1>
        <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted mt-1">
          Inspect customer transaction records, payment statuses, and record manual refunds.
        </p>
      </div>

      <PaymentsView initialPayments={serialized} />
    </div>
  );
}
