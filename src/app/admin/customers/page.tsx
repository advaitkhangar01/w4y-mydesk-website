import React from "react";
import { prisma } from "@/lib/prisma";
import { CustomersView } from "./customers-view";

export default async function AdminCustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
      },
      productAccesses: {
        include: {
          license: true,
          productHealth: true,
        },
      },
    },
  });

  const serialized = customers.map((c) => ({
    id: c.id,
    name: c.name,
    email: c.email,
    phone: c.phone,
    businessName: c.businessName,
    status: c.status,
    createdAt: c.createdAt.toISOString(),
    orders: c.orders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      amount: Number(o.amount),
      currency: o.currency,
      status: o.status,
      createdAt: o.createdAt.toISOString(),
    })),
    productAccesses: c.productAccesses.map((pa) => ({
      id: pa.id,
      status: pa.status,
      license: pa.license
        ? {
            id: pa.license.id,
            licenseKey: pa.license.licenseKey,
            status: pa.license.status,
            deviceId: pa.license.deviceId,
            activatedAt: pa.license.activatedAt?.toISOString() || null,
          }
        : null,
      productHealth: pa.productHealth
        ? {
            state: pa.productHealth.state,
            lastHeartbeat: pa.productHealth.lastHeartbeat?.toISOString() || null,
          }
        : null,
    })),
  }));

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
          Commercial Management
        </span>
        <h1 className="text-2xl font-bold text-w4y-dark dark:text-white mt-1">
          Customer Accounts
        </h1>
        <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted mt-1">
          Inspect customer records, license assignments, and manage product access permissions.
        </p>
      </div>

      <CustomersView initialCustomers={serialized} />
    </div>
  );
}
