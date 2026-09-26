import React from "react";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { APP_CONFIG } from "@/lib/config";
import { Shield, Key, FileText, CheckCircle2 } from "lucide-react";

export default async function AdminSettingsPage() {
  const [adminUser, auditLogs, countAudit] = await Promise.all([
    prisma.admin.findFirst({
      select: {
        id: true,
        username: true,
        role: true,
        lastLoginAt: true,
        createdAt: true,
      },
    }),
    prisma.auditLog.findMany({
      take: 25,
      orderBy: { createdAt: "desc" },
    }),
    prisma.auditLog.count(),
  ]);

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
          Commercial Management
        </span>
        <h1 className="text-2xl font-bold text-w4y-dark dark:text-white mt-1">
          System Settings & Audit Log
        </h1>
        <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted mt-1">
          Review commercial configuration, active payment provider adapter, and administrative audit trails.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Administrator Profile Card */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-w4y-border dark:border-w4y-dark-border">
            <Shield className="w-4 h-4 text-w4y-blue" />
            <h3 className="font-bold text-base text-w4y-dark dark:text-white">
              Single Administrator Account
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-w4y-border/50 dark:border-w4y-dark-border/50">
              <span className="text-w4y-secondary dark:text-w4y-dark-muted">Admin Username:</span>
              <span className="font-semibold font-mono text-w4y-dark dark:text-white">
                {adminUser?.username || "—"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-w4y-border/50 dark:border-w4y-dark-border/50">
              <span className="text-w4y-secondary dark:text-w4y-dark-muted">Role:</span>
              <span className="font-semibold text-w4y-dark dark:text-white">
                {adminUser?.role || "ADMIN"}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-w4y-border/50 dark:border-w4y-dark-border/50">
              <span className="text-w4y-secondary dark:text-w4y-dark-muted">Last Login:</span>
              <span className="font-medium text-w4y-dark dark:text-white">
                {formatDateTime(adminUser?.lastLoginAt)}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-w4y-secondary dark:text-w4y-dark-muted">Security:</span>
              <span className="text-w4y-success font-semibold">
                Bcrypt Hashed · Secure Session Cookies · Rate Limited
              </span>
            </div>
          </div>
        </Card>

        {/* Commercial Configuration */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-w4y-border dark:border-w4y-dark-border">
            <Key className="w-4 h-4 text-w4y-blue" />
            <h3 className="font-bold text-base text-w4y-dark dark:text-white">
              Commercial System Parameters
            </h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-w4y-border/50 dark:border-w4y-dark-border/50">
              <span className="text-w4y-secondary dark:text-w4y-dark-muted">Primary Domain:</span>
              <span className="font-mono text-w4y-dark dark:text-white">
                {APP_CONFIG.brand.domain}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-w4y-border/50 dark:border-w4y-dark-border/50">
              <span className="text-w4y-secondary dark:text-w4y-dark-muted">Base Product Price:</span>
              <span className="font-bold text-w4y-dark dark:text-white">
                ₹{APP_CONFIG.commercial.price} ({APP_CONFIG.commercial.currency})
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-w4y-border/50 dark:border-w4y-dark-border/50">
              <span className="text-w4y-secondary dark:text-w4y-dark-muted">Active Payment Provider:</span>
              <span className="font-mono font-semibold text-w4y-blue uppercase">
                {process.env.PAYMENT_PROVIDER || "MOCK (Ready for Razorpay / Cashfree)"}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-w4y-secondary dark:text-w4y-dark-muted">GST Configuration:</span>
              <span className="text-w4y-secondary dark:text-w4y-dark-muted">
                Unregistered / None initially
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Audit Log Stream */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-w4y-dark dark:text-white">
              Administrative Audit Log Trail
            </h3>
            <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted">
              Authoritative immutable log of administrative access, modifications, and refunds ({countAudit} total actions recorded).
            </p>
          </div>
        </div>

        <Card className="p-0 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface-elevated font-semibold text-w4y-secondary dark:text-w4y-dark-muted">
                  <th className="p-3">Action</th>
                  <th className="p-3">Target Entity</th>
                  <th className="p-3">Audit Details</th>
                  <th className="p-3">IP Address</th>
                  <th className="p-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-w4y-border dark:divide-w4y-dark-border">
                {auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-w4y-secondary dark:text-w4y-dark-muted">
                      No administrative actions logged yet.
                    </td>
                  </tr>
                ) : (
                  auditLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-w4y-soft/50 dark:hover:bg-w4y-dark-surface-elevated/50 font-mono text-[11px]"
                    >
                      <td className="p-3 font-semibold text-w4y-blue">
                        {log.action}
                      </td>
                      <td className="p-3 text-w4y-dark dark:text-white">
                        {log.entityType ? `${log.entityType} (${log.entityId || "—"})` : "—"}
                      </td>
                      <td className="p-3 text-w4y-secondary dark:text-w4y-dark-muted max-w-xs truncate">
                        {log.details || "—"}
                      </td>
                      <td className="p-3 text-w4y-secondary dark:text-w4y-dark-muted">
                        {log.ipAddress || "127.0.0.1"}
                      </td>
                      <td className="p-3 text-w4y-secondary dark:text-w4y-dark-muted">
                        {formatDateTime(log.createdAt)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
