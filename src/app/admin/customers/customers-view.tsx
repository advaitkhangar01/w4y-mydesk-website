"use client";

import React, { useState } from "react";
import { formatCurrency, formatDate, formatDateTime } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/badge";
import {
  Search,
  Filter,
  Edit,
  Mail,
  ShieldAlert,
  CheckCircle,
  XCircle,
  RefreshCw,
  ExternalLink,
  Laptop,
} from "lucide-react";
import { CustomerStatus, AccessStatus, LicenseStatus } from "@prisma/client";

interface CustomerRecord {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  businessName: string | null;
  status: CustomerStatus;
  createdAt: string;
  orders: {
    id: string;
    orderNumber: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: string;
  }[];
  productAccesses: {
    id: string;
    status: AccessStatus;
    license: {
      id: string;
      licenseKey: string;
      status: LicenseStatus;
      deviceId: string | null;
      activatedAt: string | null;
    } | null;
    productHealth: {
      state: string;
      lastHeartbeat: string | null;
    } | null;
  }[];
}

export function CustomersView({ initialCustomers }: { initialCustomers: CustomerRecord[] }) {
  const [customers, setCustomers] = useState<CustomerRecord[]>(initialCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerRecord | null>(null);

  // Edit Modal State
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    status: "ACTIVE",
    accessStatus: "ACTIVE",
  });

  // Action status feedback
  const [actionFeedback, setActionFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const filteredCustomers = customers.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.phone && c.phone.includes(searchTerm)) ||
      (c.businessName && c.businessName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openEditModal = (cust: CustomerRecord) => {
    setSelectedCustomer(cust);
    setEditForm({
      name: cust.name,
      email: cust.email,
      phone: cust.phone || "",
      businessName: cust.businessName || "",
      status: cust.status,
      accessStatus: cust.productAccesses[0]?.status || "ACTIVE",
    });
    setIsEditing(true);
    setActionFeedback(null);
  };

  const handleSaveCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomer) return;

    try {
      setIsActionLoading(true);
      const res = await fetch(`/api/admin/customers/${selectedCustomer.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update customer");

      // Update state locally
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === selectedCustomer.id
            ? {
                ...c,
                ...data.customer,
                productAccesses: c.productAccesses.map((pa) => ({
                  ...pa,
                  status: editForm.accessStatus as AccessStatus,
                })),
              }
            : c
        )
      );

      setActionFeedback({ type: "success", msg: "Customer details updated successfully." });
      setIsEditing(false);
    } catch (err: unknown) {
      setActionFeedback({ type: "error", msg: err instanceof Error ? err.message : "Update failed." });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleResendAccess = async (customerId: string) => {
    if (!confirm("Are you sure you want to resend license access and download instructions to this customer?")) {
      return;
    }

    try {
      setIsActionLoading(true);
      const res = await fetch("/api/admin/access/resend-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend access email.");

      setActionFeedback({ type: "success", msg: data.message || "Access email sent successfully." });
    } catch (err: unknown) {
      setActionFeedback({ type: "error", msg: err instanceof Error ? err.message : "Error sending email." });
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleToggleSuspend = async (cust: CustomerRecord) => {
    const newStatus = cust.status === CustomerStatus.SUSPENDED ? CustomerStatus.ACTIVE : CustomerStatus.SUSPENDED;
    const confirmMsg =
      newStatus === CustomerStatus.SUSPENDED
        ? `Are you sure you want to SUSPEND access for ${cust.name}? Their license and download privileges will be halted.`
        : `Reactivate customer ${cust.name}?`;

    if (!confirm(confirmMsg)) return;

    try {
      setIsActionLoading(true);
      const res = await fetch(`/api/admin/customers/${cust.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          accessStatus: newStatus === CustomerStatus.SUSPENDED ? AccessStatus.SUSPENDED : AccessStatus.ACTIVE,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Status update failed");

      setCustomers((prev) =>
        prev.map((c) => (c.id === cust.id ? { ...c, status: newStatus } : c))
      );
      setActionFeedback({ type: "success", msg: `Customer status updated to ${newStatus}.` });
    } catch (err: unknown) {
      setActionFeedback({ type: "error", msg: err instanceof Error ? err.message : "Failed to toggle status." });
    } finally {
      setIsActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Action feedback */}
      {actionFeedback && (
        <div
          className={`p-3 rounded-lg text-xs flex items-center justify-between ${
            actionFeedback.type === "success"
              ? "bg-w4y-pastel-green text-[#0D652D] border border-[#CEEAD6]"
              : "bg-[#FCE8E6] text-[#A50E0E] border border-[#FAD2CF]"
          }`}
        >
          <span>{actionFeedback.msg}</span>
          <button onClick={() => setActionFeedback(null)} className="font-bold ml-4">✕</button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-w4y-secondary dark:text-w4y-dark-muted" />
          <input
            type="text"
            placeholder="Search by name, email, or firm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-10 pl-9 pr-4 text-xs rounded-input border border-w4y-border bg-white text-w4y-dark dark:border-w4y-dark-border dark:bg-w4y-dark-surface dark:text-white focus:outline-none focus:ring-2 focus:ring-w4y-blue"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-w4y-secondary dark:text-w4y-dark-muted" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            aria-label="Filter by customer status"
            className="h-10 px-3 text-xs rounded-input border border-w4y-border bg-white text-w4y-dark dark:border-w4y-dark-border dark:bg-w4y-dark-surface dark:text-white focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      {/* Customer Data Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface-elevated font-semibold text-w4y-secondary dark:text-w4y-dark-muted">
                <th className="p-3">Customer</th>
                <th className="p-3">Contact</th>
                <th className="p-3">Product & License</th>
                <th className="p-3">Access</th>
                <th className="p-3">Health</th>
                <th className="p-3">Date</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-w4y-border dark:divide-w4y-dark-border">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-w4y-secondary dark:text-w4y-dark-muted">
                    No customers found matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => {
                  const access = cust.productAccesses[0];
                  const license = access?.license;
                  const health = access?.productHealth;

                  return (
                    <tr
                      key={cust.id}
                      className="hover:bg-w4y-soft/50 dark:hover:bg-w4y-dark-surface-elevated/50 transition-colors"
                    >
                      <td className="p-3">
                        <p className="font-bold text-w4y-dark dark:text-white">{cust.name}</p>
                        {cust.businessName && (
                          <p className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">
                            {cust.businessName}
                          </p>
                        )}
                        <span className="inline-block mt-1">
                          <StatusBadge status={cust.status} />
                        </span>
                      </td>

                      <td className="p-3 space-y-0.5">
                        <p className="font-medium text-w4y-dark dark:text-white">{cust.email}</p>
                        {cust.phone && (
                          <p className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">
                            {cust.phone}
                          </p>
                        )}
                      </td>

                      <td className="p-3 space-y-1">
                        <p className="font-semibold text-w4y-dark dark:text-white">W4Y MyDesk</p>
                        {license ? (
                          <div className="font-mono text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">
                            <p>{license.licenseKey}</p>
                            <p className="text-[10px]">
                              {license.deviceId ? `Device: ${license.deviceId.substring(0, 8)}...` : "Device: Unbound"}
                            </p>
                          </div>
                        ) : (
                          <span className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">No License</span>
                        )}
                      </td>

                      <td className="p-3">
                        <StatusBadge status={access?.status || "INACTIVE"} />
                      </td>

                      <td className="p-3">
                        <StatusBadge status={health?.state || "UNKNOWN"} />
                      </td>

                      <td className="p-3 text-w4y-secondary dark:text-w4y-dark-muted">
                        {formatDate(cust.createdAt)}
                      </td>

                      <td className="p-3 text-right space-x-1 whitespace-nowrap">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEditModal(cust)}
                          title="Edit Customer"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleResendAccess(cust.id)}
                          title="Resend Access Email"
                          disabled={isActionLoading}
                        >
                          <Mail className="w-3.5 h-3.5 text-w4y-blue" />
                        </Button>

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleSuspend(cust)}
                          title={cust.status === CustomerStatus.SUSPENDED ? "Reactivate" : "Suspend"}
                          className={cust.status === CustomerStatus.SUSPENDED ? "text-w4y-success" : "text-w4y-error"}
                          disabled={isActionLoading}
                        >
                          {cust.status === CustomerStatus.SUSPENDED ? (
                            <CheckCircle className="w-3.5 h-3.5" />
                          ) : (
                            <XCircle className="w-3.5 h-3.5" />
                          )}
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

      {/* Edit Customer Modal */}
      {isEditing && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-w4y-dark-surface rounded-card border border-w4y-border dark:border-w4y-dark-border max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-center pb-2 border-b border-w4y-border dark:border-w4y-dark-border">
              <h3 className="font-bold text-base text-w4y-dark dark:text-white">
                Edit Customer Record
              </h3>
              <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>

            <form onSubmit={handleSaveCustomer} className="space-y-4">
              <Input
                label="Full Name"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                required
              />

              <Input
                label="Email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Phone"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                />
                <Input
                  label="Business Name"
                  value={editForm.businessName}
                  onChange={(e) => setEditForm({ ...editForm, businessName: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-w4y-secondary dark:text-w4y-dark-muted uppercase">
                    Customer Status
                  </label>
                  <select
                    value={editForm.status}
                    onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full h-10 px-3 text-xs rounded-input border border-w4y-border bg-white dark:bg-w4y-dark-surface dark:border-w4y-dark-border dark:text-white"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-w4y-secondary dark:text-w4y-dark-muted uppercase">
                    Product Access
                  </label>
                  <select
                    value={editForm.accessStatus}
                    onChange={(e) => setEditForm({ ...editForm, accessStatus: e.target.value })}
                    className="w-full h-10 px-3 text-xs rounded-input border border-w4y-border bg-white dark:bg-w4y-dark-surface dark:border-w4y-dark-border dark:text-white"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="INACTIVE">INACTIVE</option>
                    <option value="SUSPENDED">SUSPENDED</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-w4y-border dark:border-w4y-dark-border">
                <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" isLoading={isActionLoading}>
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
