import React from "react";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { Activity, ShieldCheck, Info } from "lucide-react";

export default async function AdminHealthPage() {
  const healthRecords = await prisma.productHealth.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      productAccess: {
        include: {
          customer: true,
          license: true,
        },
      },
    },
  });

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
          Integration Boundary
        </span>
        <h1 className="text-2xl font-bold text-w4y-dark dark:text-white mt-1">
          Product Health & Heartbeats
        </h1>
        <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted mt-1">
          Real-time telemetry reported by installed MyDesk desktop applications. Initial state is strictly UNKNOWN until verified heartbeat is received.
        </p>
      </div>

      <div className="p-4 rounded-card bg-w4y-pastel-blue/60 border border-w4y-blue/20 dark:bg-w4y-blue/10 dark:border-w4y-blue/30 text-xs text-w4y-dark dark:text-w4y-dark-text flex items-start gap-2.5">
        <Info className="w-4 h-4 text-w4y-blue shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Future MyDesk Integration Contract:</p>
          <p className="text-w4y-secondary dark:text-w4y-dark-muted">
            The external MyDesk desktop application sends authenticated telemetry to <code>/api/telemetry/health</code> with its license key and device identifier. No fake heartbeats are simulated.
          </p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface-elevated font-semibold text-w4y-secondary dark:text-w4y-dark-muted">
                <th className="p-3">Customer</th>
                <th className="p-3">License Key</th>
                <th className="p-3">Health Status</th>
                <th className="p-3">Last Heartbeat</th>
                <th className="p-3">Last Checked</th>
                <th className="p-3">Client App Version</th>
                <th className="p-3">Workstation OS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-w4y-border dark:divide-w4y-dark-border">
              {healthRecords.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-w4y-secondary dark:text-w4y-dark-muted">
                    No product health records found. Complete a purchase to initialize a commercial health record.
                  </td>
                </tr>
              ) : (
                healthRecords.map((h) => {
                  const customer = h.productAccess.customer;
                  const license = h.productAccess.license;

                  return (
                    <tr
                      key={h.id}
                      className="hover:bg-w4y-soft/50 dark:hover:bg-w4y-dark-surface-elevated/50"
                    >
                      <td className="p-3">
                        <p className="font-semibold text-w4y-dark dark:text-white">{customer.name}</p>
                        <p className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">{customer.email}</p>
                      </td>

                      <td className="p-3 font-mono text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">
                        {license ? license.licenseKey : "—"}
                      </td>

                      <td className="p-3">
                        <StatusBadge status={h.state} />
                      </td>

                      <td className="p-3 text-w4y-secondary dark:text-w4y-dark-muted">
                        {h.lastHeartbeat ? formatDateTime(h.lastHeartbeat) : "No heartbeat received"}
                      </td>

                      <td className="p-3 text-w4y-secondary dark:text-w4y-dark-muted">
                        {formatDateTime(h.lastChecked)}
                      </td>

                      <td className="p-3 font-mono text-[11px]">
                        {h.clientVersion || "—"}
                      </td>

                      <td className="p-3 text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">
                        {h.osInfo || "—"}
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
