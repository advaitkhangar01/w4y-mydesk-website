import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { FileText, ExternalLink } from "lucide-react";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      customer: true,
      payment: true,
      proformaInvoice: true,
      productAccess: {
        include: { license: true },
      },
    },
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
          Commercial Management
        </span>
        <h1 className="text-2xl font-bold text-w4y-dark dark:text-white mt-1">
          Orders
        </h1>
        <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted mt-1">
          Inspect customer commercial purchases, verification states, and proforma invoices.
        </p>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface-elevated font-semibold text-w4y-secondary dark:text-w4y-dark-muted">
                <th className="p-3">Order Number</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Product</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">License Key</th>
                <th className="p-3">Proforma Invoice</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-w4y-border dark:divide-w4y-dark-border">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-w4y-secondary dark:text-w4y-dark-muted">
                    No orders recorded yet.
                  </td>
                </tr>
              ) : (
                orders.map((order) => {
                  const license = order.productAccess?.license;
                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-w4y-soft/50 dark:hover:bg-w4y-dark-surface-elevated/50"
                    >
                      <td className="p-3 font-mono font-medium">
                        {order.orderNumber}
                      </td>
                      <td className="p-3">
                        <p className="font-semibold text-w4y-dark dark:text-white">
                          {order.customer.name}
                        </p>
                        <p className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">
                          {order.customer.email}
                        </p>
                      </td>
                      <td className="p-3 font-medium">W4Y MyDesk</td>
                      <td className="p-3 font-bold text-w4y-dark dark:text-white">
                        {formatCurrency(order.amount, order.currency)}
                      </td>
                      <td className="p-3">
                        <StatusBadge status={order.status} />
                      </td>
                      <td className="p-3 font-mono text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">
                        {license ? license.licenseKey : "—"}
                      </td>
                      <td className="p-3">
                        {order.proformaInvoice ? (
                          <Link
                            href={`/order/${order.orderNumber}/invoice`}
                            target="_blank"
                            className="inline-flex items-center gap-1 text-w4y-blue hover:underline font-medium"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{order.proformaInvoice.invoiceNumber}</span>
                          </Link>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                      </td>
                      <td className="p-3 text-w4y-secondary dark:text-w4y-dark-muted">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
