"use client";

import React, { useState } from "react";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { KeyRound, Laptop, CheckCircle, XCircle, ShieldAlert } from "lucide-react";
import { AccessStatus, LicenseStatus } from "@prisma/client";

interface AccessItem {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  orderNumber: string;
  productName: string;
  status: AccessStatus;
  createdAt: string;
  license: {
    id: string;
    licenseKey: string;
    status: LicenseStatus;
    deviceId: string | null;
    deviceName: string | null;
    activatedAt: string | null;
  } | null;
  health: {
    state: string;
    lastHeartbeat: string | null;
  } | null;
}

export function AccessManagementView({ initialAccess }: { initialAccess: AccessItem[] }) {
  const [accessList, setAccessList] = useState<AccessItem[]>(initialAccess);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  const toggleAccessStatus = async (item: AccessItem) => {
    const nextStatus = item.status === AccessStatus.ACTIVE ? AccessStatus.INACTIVE : AccessStatus.ACTIVE;
    const confirmPrompt =
      nextStatus === AccessStatus.INACTIVE
        ? `Deactivate access for customer ${item.customerName}?`
        : `Re-activate access for customer ${item.customerName}?`;

    if (!confirm(confirmPrompt)) return;

    try {
      setLoadingId(item.id);
      const res = await fetch(`/api/admin/customers/${item.customerId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          accessStatus: nextStatus,
          licenseStatus: nextStatus === AccessStatus.ACTIVE ? LicenseStatus.ACTIVE : LicenseStatus.SUSPENDED,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update access");

      setAccessList((prev) =>
        prev.map((a) =>
          a.id === item.id
            ? {
                ...a,
                status: nextStatus,
                license: a.license
                  ? {
                      ...a.license,
                      status: nextStatus === AccessStatus.ACTIVE ? LicenseStatus.ACTIVE : LicenseStatus.SUSPENDED,
                    }
                  : null,
              }
            : a
        )
      );

      setFeedback({ type: "success", msg: `Access successfully updated to ${nextStatus}.` });
    } catch (err: unknown) {
      setFeedback({ type: "error", msg: err instanceof Error ? err.message : "Update failed." });
    } finally {
      setLoadingId(null);
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
                <th className="p-3">Customer</th>
                <th className="p-3">Order Ref</th>
                <th className="p-3">Access State</th>
                <th className="p-3">License Key</th>
                <th className="p-3">License State</th>
                <th className="p-3">Bound Device</th>
                <th className="p-3">Created</th>
                <th className="p-3 text-right">Access Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-w4y-border dark:divide-w4y-dark-border">
              {accessList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-6 text-center text-w4y-secondary dark:text-w4y-dark-muted">
                    No product access records found.
                  </td>
                </tr>
              ) : (
                accessList.map((item) => {
                  const license = item.license;
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-w4y-soft/50 dark:hover:bg-w4y-dark-surface-elevated/50"
                    >
                      <td className="p-3">
                        <p className="font-semibold text-w4y-dark dark:text-white">{item.customerName}</p>
                        <p className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">{item.customerEmail}</p>
                      </td>

                      <td className="p-3 font-mono">{item.orderNumber}</td>

                      <td className="p-3">
                        <StatusBadge status={item.status} />
                      </td>

                      <td className="p-3 font-mono text-[11px] text-w4y-dark dark:text-white font-medium">
                        {license ? license.licenseKey : "—"}
                      </td>

                      <td className="p-3">
                        {license ? <StatusBadge status={license.status} /> : "—"}
                      </td>

                      <td className="p-3">
                        {license?.deviceId ? (
                          <div className="flex items-center gap-1.5 text-xs text-w4y-dark dark:text-white">
                            <Laptop className="w-3.5 h-3.5 text-w4y-blue" />
                            <span className="font-mono text-[11px]">
                              {license.deviceId.substring(0, 12)}...
                            </span>
                          </div>
                        ) : (
                          <span className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted italic">
                            Unactivated
                          </span>
                        )}
                      </td>

                      <td className="p-3 text-w4y-secondary dark:text-w4y-dark-muted">
                        {formatDate(item.createdAt)}
                      </td>

                      <td className="p-3 text-right">
                        <Button
                          size="sm"
                          variant={item.status === AccessStatus.ACTIVE ? "outline" : "secondary"}
                          onClick={() => toggleAccessStatus(item)}
                          disabled={loadingId === item.id}
                          className="text-xs"
                        >
                          {item.status === AccessStatus.ACTIVE ? "Deactivate" : "Activate"}
                        </Button>
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
