import React from "react";
import { redirect } from "next/navigation";
import { getAdminFromSession, isSystemBootstrapped } from "@/lib/auth";
import { AdminAuthForm } from "./admin-auth-form";

export const metadata = {
  title: "Administrative Control Panel — Secure Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const session = await getAdminFromSession();
  if (session) {
    redirect("/admin/overview");
  }

  const isBootstrapped = await isSystemBootstrapped();

  return (
    <div className="min-h-screen bg-w4y-soft dark:bg-w4y-dark-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <AdminAuthForm isBootstrapped={isBootstrapped} />
      </div>
    </div>
  );
}
