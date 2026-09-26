"use client";

import React, { useState } from "react";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { RotateCcw, AlertTriangle, CheckCircle2 } from "lucide-react";
import { PaymentStatus } from "@prisma/client";

interface PaymentRecord {
  id: string;
  orderId: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  provider: string;
  providerPaymentId: string | null;
  refundReason: string | null;
  refundedAt: string | null;
  paidAt: string | null;
  createdAt: string;
}

export function PaymentsView({ initialPayments }: { initialPayments: PaymentRecord[] }) {
  const [payments, setPayments] = useState<PaymentRecord[]>(initialPayments);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [refundReason, setRefundReason] = useState("");
  const [isRefunding, setIsRefunding] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const openRefundModal = (p: PaymentRecord) => {
    setSelectedPayment(p);
    setRefundReason("");
    setFeedback(null);
  };

  const handleRecordRefund = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPayment) return;

    if (!confirm(`Confirm recording manual refund of ${formatCurrency(selectedPayment.amount, selectedPayment.currency)} for order ${selectedPayment.orderNumber}? This will revoke the customer's license.`)) {
      return;
    }

    try {
      setIsRefunding(true);
      const res = await fetch("/api/admin/payments/refund", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: selectedPayment.id,
          reason: refundReason.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to record refund.");

      setPayments((prev) =>
        prev.map((p) =>
          p.id === selectedPayment.id
            ? {
                ...p,
                status: PaymentStatus.REFUNDED,
                refundReason: refundReason || "Manual refund recorded by administrator",
                refundedAt: new Date().toISOString(),
              }
            : p
        )
      );

      setFeedback({ type: "success", msg: "Manual refund recorded successfully. License revoked." });
      setSelectedPayment(null);
    } catch (err: unknown) {
      setFeedback({ type: "error", msg: err instanceof Error ? err.message : "Refund failed." });
    } finally {
      setIsRefunding(false);
    }
  };

  return (
    <div className="space-y-6">
      {feedback && (
        <div
          className={`p-3 rounded-lg text-xs flex items-center justify-between ${
            feedback.type === "success"
              ? "bg-w4y-pastel-green text-[#0D652D] border border-[#CEEAD6]"
              : "bg-[#FCE8E6] text-[#A50E0E] border border-[#FAD2CF]"
          }`}
        >
          <span>{feedback.msg}</span>
          <button onClick={() => setFeedback(null)} className="font-bold ml-4">✕</button>
        </div>
      )}

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface-elevated font-semibold text-w4y-secondary dark:text-w4y-dark-muted">
                <th className="p-3">Order Ref</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Provider</th>
                <th className="p-3">Reference ID</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-w4y-border dark:divide-w4y-dark-border">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-w4y-secondary dark:text-w4y-dark-muted">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                payments.map((p) => (
                  <tr
                    key={p.id}
                    className="hover:bg-w4y-soft/50 dark:hover:bg-w4y-dark-surface-elevated/50"
                  >
                    <td className="p-3 font-mono font-medium">{p.orderNumber}</td>
                    <td className="p-3">
                      <p className="font-semibold text-w4y-dark dark:text-white">{p.customerName}</p>
                      <p className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">{p.customerEmail}</p>
                    </td>
                    <td className="p-3 font-bold text-w4y-dark dark:text-white">
                      {formatCurrency(p.amount, p.currency)}
                    </td>
                    <td className="p-3">
                      <StatusBadge status={p.status} />
                      {p.refundedAt && (
                        <p className="text-[10px] text-purple-600 dark:text-purple-400 mt-0.5">
                          Refunded: {formatDate(p.refundedAt)}
                        </p>
                      )}
                    </td>
                    <td className="p-3 font-medium uppercase text-w4y-secondary dark:text-w4y-dark-muted">
                      {p.provider}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">
                      {p.providerPaymentId || "—"}
                    </td>
                    <td className="p-3 text-w4y-secondary dark:text-w4y-dark-muted">
                      {formatDate(p.paidAt || p.createdAt)}
                    </td>
                    <td className="p-3 text-right">
                      {p.status === PaymentStatus.PAID && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openRefundModal(p)}
                          className="text-xs gap-1 text-[#6200EE] hover:bg-purple-50 dark:hover:bg-purple-950/20"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Record Refund</span>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Manual Refund Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-w4y-dark-surface rounded-card border border-w4y-border dark:border-w4y-dark-border max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-2 border-b border-w4y-border dark:border-w4y-dark-border">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-w4y-warning" />
                <h3 className="font-bold text-base text-w4y-dark dark:text-white">
                  Record Manual Refund
                </h3>
              </div>
              <button onClick={() => setSelectedPayment(null)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
              Recording a manual refund updates the commercial records, revokes the customer&apos;s license, and emails a formal refund notification to <strong>{selectedPayment.customerEmail}</strong>.
            </p>

            <div className="p-3 rounded-lg bg-w4y-soft dark:bg-w4y-dark-surface-elevated text-xs space-y-1">
              <div className="flex justify-between">
                <span>Customer:</span>
                <span className="font-semibold">{selectedPayment.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span>Order:</span>
                <span className="font-mono">{selectedPayment.orderNumber}</span>
              </div>
              <div className="flex justify-between font-bold pt-1 border-t border-w4y-border dark:border-w4y-dark-border">
                <span>Refund Amount:</span>
                <span>{formatCurrency(selectedPayment.amount, selectedPayment.currency)}</span>
              </div>
            </div>

            <form onSubmit={handleRecordRefund} className="space-y-4">
              <Input
                label="Reason for Refund (Optional)"
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                placeholder="e.g. Incompatible hardware / Customer requested cancellation"
              />

              <div className="pt-2 flex justify-end gap-3 border-t border-w4y-border dark:border-w4y-dark-border">
                <Button type="button" variant="outline" onClick={() => setSelectedPayment(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="danger" isLoading={isRefunding}>
                  Confirm Manual Refund
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
