import React from "react";
import { redirect } from "next/navigation";
import { getAdminFromSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export const metadata = {
  title: "Commercial Admin System — W4Y MyDesk",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminFromSession();
  if (!session) {
    redirect("/adm-log-in-65");
  }

  return (
    <AdminShell adminUsername={session.username}>
      {children}
    </AdminShell>
  );
}
