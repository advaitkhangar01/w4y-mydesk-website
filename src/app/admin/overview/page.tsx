import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import {
  Users,
  ShoppingCart,
  CreditCard,
  KeyRound,
  Activity,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { CustomerStatus, OrderStatus, PaymentStatus, LicenseStatus, ProductHealthState } from "@prisma/client";

export default async function AdminOverviewPage() {
  // Query authoritative metrics directly from real database records
  const [
    activeCustomersCount,
    totalOrdersCount,
    paidPaymentsCount,
    pendingPaymentsCount,
    activeLicensesCount,
    attentionHealthCount,
    recentOrders,
    recentAuditLogs,
    revenueAggregate,
  ] = await Promise.all([
    prisma.customer.count({ where: { status: CustomerStatus.ACTIVE } }),
    prisma.order.count(),
    prisma.payment.count({ where: { status: PaymentStatus.PAID } }),
    prisma.payment.count({ where: { status: PaymentStatus.PENDING } }),
    prisma.license.count({ where: { status: LicenseStatus.ACTIVE } }),
    prisma.productHealth.count({
      where: {
        state: { in: [ProductHealthState.DEGRADED, ProductHealthState.OFFLINE] },
      },
    }),
    prisma.order.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
      include: {
        customer: true,
        payment: true,
      },
    }),
    prisma.auditLog.findMany({
      take: 6,
      orderBy: { createdAt: "desc" },
    }),
    prisma.payment.aggregate({
      where: { status: PaymentStatus.PAID },
      _sum: { amount: true },
    }),
  ]);

  const totalRevenue = revenueAggregate._sum.amount ? Number(revenueAggregate._sum.amount) : 0;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl">
      {/* Top Banner */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
          Commercial Management
        </span>
        <h1 className="text-2xl font-bold text-w4y-dark dark:text-white mt-1">
          Operational Overview
        </h1>
        <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted mt-1">
          Live commercial metrics computed strictly from current database records.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between text-w4y-secondary dark:text-w4y-dark-muted">
            <span className="text-xs font-semibold uppercase">Customers</span>
            <Users className="w-4 h-4 text-w4y-blue" />
          </div>
          <p className="text-2xl font-bold text-w4y-dark dark:text-white">
            {activeCustomersCount}
          </p>
          <span className="text-[11px] text-w4y-success font-medium">Active Accounts</span>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between text-w4y-secondary dark:text-w4y-dark-muted">
            <span className="text-xs font-semibold uppercase">Orders</span>
            <ShoppingCart className="w-4 h-4 text-w4y-blue" />
          </div>
          <p className="text-2xl font-bold text-w4y-dark dark:text-white">
            {totalOrdersCount}
          </p>
          <span className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">Total Placed</span>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between text-w4y-secondary dark:text-w4y-dark-muted">
            <span className="text-xs font-semibold uppercase">Paid</span>
            <CreditCard className="w-4 h-4 text-w4y-success" />
          </div>
          <p className="text-2xl font-bold text-w4y-dark dark:text-white">
            {paidPaymentsCount}
          </p>
          <span className="text-[11px] text-w4y-success font-medium">Verified Payments</span>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between text-w4y-secondary dark:text-w4y-dark-muted">
            <span className="text-xs font-semibold uppercase">Pending</span>
            <CreditCard className="w-4 h-4 text-w4y-warning" />
          </div>
          <p className="text-2xl font-bold text-w4y-dark dark:text-white">
            {pendingPaymentsCount}
          </p>
          <span className="text-[11px] text-w4y-warning font-medium">Awaiting Settlement</span>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between text-w4y-secondary dark:text-w4y-dark-muted">
            <span className="text-xs font-semibold uppercase">Licenses</span>
            <KeyRound className="w-4 h-4 text-w4y-blue" />
          </div>
          <p className="text-2xl font-bold text-w4y-dark dark:text-white">
            {activeLicensesCount}
          </p>
          <span className="text-[11px] text-w4y-success font-medium">Active Devices</span>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center justify-between text-w4y-secondary dark:text-w4y-dark-muted">
            <span className="text-xs font-semibold uppercase">Attention</span>
            <AlertTriangle className="w-4 h-4 text-w4y-error" />
          </div>
          <p className="text-2xl font-bold text-w4y-dark dark:text-white">
            {attentionHealthCount}
          </p>
          <span className="text-[11px] text-w4y-error font-medium">Degraded / Offline</span>
        </Card>
      </div>

      {/* Revenue Snapshot Card */}
      <Card className="p-6 bg-white dark:bg-w4y-dark-surface border border-w4y-border dark:border-w4y-dark-border">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase text-w4y-secondary dark:text-w4y-dark-muted">
              Total Realized Revenue
            </span>
            <h2 className="text-3xl font-extrabold text-w4y-dark dark:text-white mt-1">
              {formatCurrency(totalRevenue, "INR")}
            </h2>
            <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted mt-1">
              Authoritatively confirmed payments from {paidPaymentsCount} completed orders.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-w4y-blue hover:underline flex items-center gap-1"
            >
              View All Orders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </Card>

      {/* Tables Row: Recent Orders & Recent Audit */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-w4y-dark dark:text-white">
              Recent Commercial Orders
            </h3>
            <Link
              href="/admin/orders"
              className="text-xs font-semibold text-w4y-blue hover:underline"
            >
              View All
            </Link>
          </div>

          <Card className="p-0 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface-elevated font-semibold text-w4y-secondary dark:text-w4y-dark-muted">
                    <th className="p-3">Order</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-w4y-border dark:divide-w4y-dark-border">
                  {recentOrders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-w4y-secondary dark:text-w4y-dark-muted">
                        No orders recorded yet. Complete a checkout test to populate.
                      </td>
                    </tr>
                  ) : (
                    recentOrders.map((ord) => (
                      <tr key={ord.id} className="hover:bg-w4y-soft/50 dark:hover:bg-w4y-dark-surface-elevated/50">
                        <td className="p-3 font-mono font-medium">{ord.orderNumber}</td>
                        <td className="p-3">
                          <p className="font-medium text-w4y-dark dark:text-white">{ord.customer.name}</p>
                          <p className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">{ord.customer.email}</p>
                        </td>
                        <td className="p-3 font-semibold">
                          {formatCurrency(ord.amount, ord.currency)}
                        </td>
                        <td className="p-3">
                          <StatusBadge status={ord.status} />
                        </td>
                        <td className="p-3 text-w4y-secondary dark:text-w4y-dark-muted">
                          {formatDate(ord.createdAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Audit Log Activity */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-w4y-dark dark:text-white">
              Recent Administrative Actions
            </h3>
            <Link
              href="/admin/settings"
              className="text-xs font-semibold text-w4y-blue hover:underline"
            >
              Full Log
            </Link>
          </div>

          <Card className="p-4 space-y-3">
            {recentAuditLogs.length === 0 ? (
              <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted text-center py-4">
                No administrative actions logged yet.
              </p>
            ) : (
              <div className="space-y-3">
                {recentAuditLogs.map((log) => (
                  <div
                    key={log.id}
                    className="p-2.5 rounded-lg bg-w4y-soft dark:bg-w4y-dark-surface-elevated border border-w4y-border/60 dark:border-w4y-dark-border/60 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-w4y-blue">
                        {log.action}
                      </span>
                      <span className="text-[10px] text-w4y-secondary dark:text-w4y-dark-muted">
                        {formatDateTime(log.createdAt)}
                      </span>
                    </div>
                    {log.details && (
                      <p className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted truncate font-mono">
                        {log.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
