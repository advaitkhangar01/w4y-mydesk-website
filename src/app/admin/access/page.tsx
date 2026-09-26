import React from "react";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import { AccessManagementView } from "./access-view";

export default async function AdminAccessPage() {
  const accessRecords = await prisma.productAccess.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      customer: true,
      order: true,
      license: true,
      productHealth: true,
    },
  });

  const serialized = accessRecords.map((a) => ({
    id: a.id,
    customerId: a.customerId,
    customerName: a.customer.name,
    customerEmail: a.customer.email,
    orderNumber: a.order.orderNumber,
    productName: a.productName,
    status: a.status,
    createdAt: a.createdAt.toISOString(),
    license: a.license
      ? {
          id: a.license.id,
          licenseKey: a.license.licenseKey,
          status: a.license.status,
          deviceId: a.license.deviceId,
          deviceName: a.license.deviceName,
          activatedAt: a.license.activatedAt?.toISOString() || null,
        }
      : null,
    health: a.productHealth
      ? {
          state: a.productHealth.state,
          lastHeartbeat: a.productHealth.lastHeartbeat?.toISOString() || null,
        }
      : null,
  }));

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
          Commercial Management
        </span>
        <h1 className="text-2xl font-bold text-w4y-dark dark:text-white mt-1">
          Product Access & Licenses
        </h1>
        <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted mt-1">
          Manage product access rights and 1-device commercial license states.
        </p>
      </div>

      <AccessManagementView initialAccess={serialized} />
    </div>
  );
}
