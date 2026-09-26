"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  CreditCard,
  KeyRound,
  Activity,
  Settings,
  LogOut,
  Shield,
} from "lucide-react";

interface AdminShellProps {
  adminUsername: string;
  children: React.ReactNode;
}

export function AdminShell({ adminUsername, children }: AdminShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { href: "/admin/overview", label: "Overview", icon: LayoutDashboard },
    { href: "/admin/customers", label: "Customers", icon: Users },
    { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
    { href: "/admin/payments", label: "Payments", icon: CreditCard },
    { href: "/admin/access", label: "Product Access", icon: KeyRound },
    { href: "/admin/health", label: "Product Health", icon: Activity },
    { href: "/admin/settings", label: "Settings & Audit", icon: Settings },
  ];

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/adm-log-in-65");
      router.refresh();
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen bg-w4y-soft dark:bg-w4y-dark-bg flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 border-r border-w4y-border bg-white dark:border-w4y-dark-border dark:bg-w4y-dark-surface flex flex-col shrink-0">
        {/* Brand header */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-w4y-border dark:border-w4y-dark-border">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="W4Y"
              width={80}
              height={25}
              className="h-5 w-auto object-contain dark:brightness-0 dark:invert"
            />
            <span
              className="h-3.5 w-[1px] bg-w4y-border dark:bg-w4y-dark-border"
              aria-hidden="true"
            />
            <span className="text-xs font-bold text-w4y-dark dark:text-white">
              Admin
            </span>
          </div>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-w4y-pastel-blue text-w4y-blue uppercase tracking-wider">
            Commercial
          </span>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-btn text-xs font-medium transition-colors",
                  isActive
                    ? "bg-w4y-blue text-white font-semibold shadow-xs"
                    : "text-w4y-secondary hover:text-w4y-dark hover:bg-w4y-soft dark:text-w4y-dark-muted dark:hover:text-white dark:hover:bg-w4y-dark-surface-elevated"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-w4y-border dark:border-w4y-dark-border space-y-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 truncate">
              <div className="w-6 h-6 rounded-full bg-w4y-pastel-blue text-w4y-blue flex items-center justify-center font-bold text-[10px]">
                {adminUsername.substring(0, 1).toUpperCase()}
              </div>
              <span className="font-medium text-w4y-dark dark:text-white truncate">
                {adminUsername}
              </span>
            </div>
            <ThemeToggle />
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-1.5 text-xs text-[#A50E0E] hover:bg-[#FCE8E6] rounded-btn dark:hover:bg-[#A50E0E]/20 transition-colors font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
