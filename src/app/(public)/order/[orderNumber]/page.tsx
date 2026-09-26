import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createDownloadToken } from "@/lib/license";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { APP_CONFIG } from "@/lib/config";
import {
  CheckCircle2,
  Download,
  FileText,
  Copy,
  Laptop,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { OrderStatus } from "@prisma/client";

export default async function OrderConfirmationPage({
  params,
}: {
  params: { orderNumber: string };
}) {
  const order = await prisma.order.findUnique({
    where: { orderNumber: params.orderNumber },
    include: {
      customer: true,
      payment: true,
      proformaInvoice: true,
      productAccess: {
        include: { license: true },
      },
    },
  });

  if (!order) {
    notFound();
  }

  const isPaid = order.status === OrderStatus.PAID;
  const license = order.productAccess?.license;
  const downloadToken =
    isPaid && order.productAccess
      ? createDownloadToken(order.id, order.productAccess.id)
      : null;

  return (
    <div className="py-12 md:py-20 bg-w4y-soft dark:bg-w4y-dark-bg min-h-screen">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header Banner */}
          <div className="p-8 rounded-card bg-white border border-w4y-border shadow-sm dark:bg-w4y-dark-surface dark:border-w4y-dark-border text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-w4y-pastel-green text-w4y-success flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-w4y-secondary dark:text-w4y-dark-muted">
                Order {order.orderNumber}
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-w4y-dark dark:text-white mt-1">
                {isPaid ? "Payment Verified & Order Confirmed" : "Order Awaiting Payment"}
              </h1>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted mt-2">
                Thank you, <strong>{order.customer.name}</strong>. Access credentials and invoice have been prepared.
              </p>
            </div>
            <div className="pt-2">
              <StatusBadge status={order.status} />
            </div>
          </div>

          {/* License & Download Access Card (Only if PAID) */}
          {isPaid && license && (
            <Card className="p-6 md:p-8 border-2 border-w4y-blue bg-white dark:bg-w4y-dark-surface space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
                    Commercial License Key
                  </span>
                  <h3 className="text-lg font-bold text-w4y-dark dark:text-white">
                    One-Device Authorized Access
                  </h3>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-w4y-pastel-blue text-w4y-blue">
                  {license.status}
                </span>
              </div>

              {/* License Key Box */}
              <div className="p-4 rounded-lg bg-w4y-soft border border-dashed border-w4y-blue dark:bg-w4y-dark-surface-elevated text-center space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-w4y-secondary dark:text-w4y-dark-muted">
                  Your Unique License Key
                </span>
                <p className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-w4y-dark dark:text-white select-all">
                  {license.licenseKey}
                </p>
                <p className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">
                  Keep this key safe. You will enter it upon opening the desktop app to bind your computer.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {downloadToken && (
                  <Link
                    href={`/api/download/${downloadToken}`}
                    target="_blank"
                    className="w-full"
                  >
                    <Button size="lg" className="w-full gap-2 text-sm font-semibold">
                      <Download className="w-4 h-4" />
                      Download MyDesk Installer
                    </Button>
                  </Link>
                )}

                <Link
                  href={`/order/${order.orderNumber}/invoice`}
                  target="_blank"
                  className="w-full"
                >
                  <Button size="lg" variant="outline" className="w-full gap-2 text-sm font-semibold">
                    <FileText className="w-4 h-4" />
                    View Proforma Invoice
                  </Button>
                </Link>
              </div>

              <div className="pt-4 border-t border-w4y-border dark:border-w4y-dark-border grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-w4y-secondary dark:text-w4y-dark-muted">
                <div className="flex items-start gap-2">
                  <Laptop className="w-4 h-4 text-w4y-blue shrink-0 mt-0.5" />
                  <span>
                    <strong>One Device Bound:</strong> Valid for 1 primary workstation.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-w4y-blue shrink-0 mt-0.5" />
                  <span>
                    <strong>Email Dispatched:</strong> A copy has been delivered to {order.customer.email}.
                  </span>
                </div>
              </div>
            </Card>
          )}

          {/* Order Details Table */}
          <Card className="p-6 md:p-8 space-y-4">
            <h3 className="font-bold text-base text-w4y-dark dark:text-white">
              Order Information
            </h3>

            <div className="divide-y divide-w4y-border dark:divide-w4y-dark-border text-sm">
              <div className="py-2.5 flex justify-between">
                <span className="text-w4y-secondary dark:text-w4y-dark-muted">Order ID</span>
                <span className="font-semibold text-w4y-dark dark:text-white">{order.orderNumber}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-w4y-secondary dark:text-w4y-dark-muted">Product</span>
                <span className="font-semibold text-w4y-dark dark:text-white">W4Y MyDesk (Commercial License)</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-w4y-secondary dark:text-w4y-dark-muted">Purchase Date</span>
                <span className="font-semibold text-w4y-dark dark:text-white">{formatDate(order.createdAt)}</span>
              </div>
              <div className="py-2.5 flex justify-between">
                <span className="text-w4y-secondary dark:text-w4y-dark-muted">Amount Paid</span>
                <span className="font-bold text-base text-w4y-dark dark:text-white">
                  {formatCurrency(order.amount, order.currency)}
                </span>
              </div>
              {order.payment && (
                <div className="py-2.5 flex justify-between">
                  <span className="text-w4y-secondary dark:text-w4y-dark-muted">Payment Provider / Reference</span>
                  <span className="font-mono text-xs text-w4y-secondary dark:text-w4y-dark-muted">
                    {order.payment.provider} ({order.payment.providerPaymentId || "DIRECT"})
                  </span>
                </div>
              )}
            </div>
          </Card>

          {/* Business Support Footer */}
          <div className="text-center text-xs text-w4y-secondary dark:text-w4y-dark-muted space-y-1">
            <p>Need assistance with your installation or license activation?</p>
            <p>
              Contact {APP_CONFIG.business.legalName} at{" "}
              <a href={`mailto:${APP_CONFIG.business.email}`} className="text-w4y-blue underline">
                {APP_CONFIG.business.email}
              </a>{" "}
              or call {APP_CONFIG.business.phone}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
