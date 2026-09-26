import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate } from "@/lib/utils";
import { APP_CONFIG } from "@/lib/config";

export default async function ProformaInvoicePage({
  params,
}: {
  params: { orderNumber: string };
}) {
  const order = await prisma.order.findUnique({
    where: { orderNumber: params.orderNumber },
    include: {
      customer: true,
      proformaInvoice: true,
      payment: true,
    },
  });

  if (!order || !order.proformaInvoice) {
    notFound();
  }

  const invoice = order.proformaInvoice;

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4 sm:px-6 print:bg-white print:p-0">
      {/* Top action bar (hidden in print) */}
      <div className="max-w-3xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <a
          href={`/order/${order.orderNumber}`}
          className="text-xs font-semibold text-w4y-secondary hover:text-w4y-dark transition-colors"
        >
          ← Back to Order
        </a>
        <button
          onClick={() => {}}
          className="print-trigger bg-w4y-blue text-white text-xs font-semibold px-4 py-2 rounded-btn hover:bg-w4y-blue-hover shadow-sm"
          // Client script handles window.print()
        >
          Print / Save as PDF
        </button>
      </div>

      {/* Official Proforma Document */}
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-8 sm:p-12 print:shadow-none print:border-none print:p-0">
        {/* Document Header */}
        <div className="flex justify-between items-start border-b border-gray-200 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 relative bg-white p-0.5 border border-gray-200 rounded-md">
                <Image
                  src="/logo.png"
                  alt="W4Y Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900">
                  {invoice.sellerName}
                </h1>
                <p className="text-xs text-gray-500">{APP_CONFIG.brand.tagline}</p>
              </div>
            </div>

            <div className="text-xs text-gray-600 space-y-0.5 leading-relaxed pt-1">
              <p>{invoice.sellerAddress}</p>
              <p>Email: {invoice.sellerEmail}</p>
              <p>Phone: {invoice.sellerPhone}</p>
              <p>Website: {invoice.sellerWebsite}</p>
            </div>
          </div>

          <div className="text-right space-y-1">
            <span className="inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm bg-blue-50 text-blue-700 border border-blue-200">
              PROFORMA INVOICE
            </span>
            <p className="text-sm font-bold text-gray-900 pt-2 font-mono">
              {invoice.invoiceNumber}
            </p>
            <p className="text-xs text-gray-500">
              Date: {formatDate(invoice.createdAt)}
            </p>
            <p className="text-xs text-gray-500">
              Order Ref: {order.orderNumber}
            </p>
          </div>
        </div>

        {/* Billed To Details */}
        <div className="py-6 border-b border-gray-200 grid grid-cols-2 gap-6 text-xs">
          <div>
            <span className="font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Billed To (Customer):
            </span>
            <p className="font-semibold text-sm text-gray-900">{invoice.customerName}</p>
            {invoice.customerBusiness && (
              <p className="text-gray-700 font-medium">{invoice.customerBusiness}</p>
            )}
            <p className="text-gray-600">{invoice.customerEmail}</p>
            {invoice.customerPhone && (
              <p className="text-gray-600">{invoice.customerPhone}</p>
            )}
          </div>

          <div className="text-right space-y-1">
            <span className="font-bold uppercase tracking-wider text-gray-400 block mb-1">
              Payment Status:
            </span>
            <span className="inline-block font-semibold text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200">
              {order.status}
            </span>
            <p className="text-xs text-gray-500 pt-1">
              Payment Method: {order.payment?.provider || "Direct Online"}
            </p>
          </div>
        </div>

        {/* Itemized Table */}
        <div className="py-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-300 text-xs font-bold uppercase text-gray-500 tracking-wider">
                <th className="py-3">Description</th>
                <th className="py-3 text-center">Qty</th>
                <th className="py-3 text-right">Unit Price</th>
                <th className="py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              <tr>
                <td className="py-4 pr-4">
                  <p className="font-semibold text-gray-900">
                    W4Y MyDesk — Commercial Software License
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Standard Commercial License (One device/computer perpetual authorization). Includes protected application download access.
                  </p>
                </td>
                <td className="py-4 text-center text-gray-700">1</td>
                <td className="py-4 text-right text-gray-700 font-mono">
                  {formatCurrency(invoice.amount, invoice.currency)}
                </td>
                <td className="py-4 text-right font-semibold text-gray-900 font-mono">
                  {formatCurrency(invoice.amount, invoice.currency)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Summary Totals */}
        <div className="border-t border-gray-200 pt-4 flex justify-end">
          <div className="w-64 space-y-2 text-xs">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span className="font-mono">{formatCurrency(invoice.amount, invoice.currency)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>GST / Tax:</span>
              <span className="font-mono">₹0.00 (Exempt/None)</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-300">
              <span>Total:</span>
              <span className="font-mono">{formatCurrency(invoice.totalAmount, invoice.currency)}</span>
            </div>
          </div>
        </div>

        {/* Notes & Legal Declarations */}
        <div className="mt-12 pt-6 border-t border-gray-200 space-y-2 text-[11px] text-gray-500 leading-relaxed">
          <p className="font-semibold text-gray-700">Notes & Commercial Conditions:</p>
          <p>{invoice.notes}</p>
          <p>
            This document is an electronic commercial proforma invoice issued by {APP_CONFIG.business.legalName}. For any billing inquiries, email {APP_CONFIG.business.email}.
          </p>
        </div>
      </div>

      {/* Inline script for print button */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.querySelector('.print-trigger')?.addEventListener('click', () => {
              window.print();
            });
          `,
        }}
      />
    </div>
  );
}
