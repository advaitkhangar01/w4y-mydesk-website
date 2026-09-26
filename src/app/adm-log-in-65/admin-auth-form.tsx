"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Lock, ShieldAlert, CheckCircle2 } from "lucide-react";

export function AdminAuthForm({ isBootstrapped }: { isBootstrapped: boolean }) {
  const router = useRouter();
  const [isSetupMode, setIsSetupMode] = useState(!isBootstrapped);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!username.trim() || !password.trim()) {
      setError("Please provide all required credentials.");
      return;
    }

    if (isSetupMode) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (password.length < 8) {
        setError("Password must be at least 8 characters.");
        return;
      }

      try {
        setIsLoading(true);
        const res = await fetch("/api/admin/setup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Setup failed");

        setSuccessMessage("Admin account created successfully! Please sign in.");
        setIsSetupMode(false);
        setPassword("");
        setConfirmPassword("");
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Initialization failed.");
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        setIsLoading(true);
        const res = await fetch("/api/admin/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Login failed");

        router.push("/admin/overview");
        router.refresh();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Authentication error.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Card className="p-8 border border-w4y-border bg-white dark:bg-w4y-dark-surface dark:border-w4y-dark-border shadow-lg">
      <div className="text-center space-y-3 mb-6">
        <div className="flex justify-center pb-1">
          <Image
            src="/logo.png"
            alt="W4Y"
            width={120}
            height={37}
            className="h-8 w-auto object-contain dark:brightness-0 dark:invert"
            priority
          />
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-w4y-secondary dark:text-w4y-dark-muted">
            Commercial Management
          </span>
          <h2 className="text-xl font-bold text-w4y-dark dark:text-white mt-0.5">
            {isSetupMode ? "Initialize System Admin" : "Private Commercial Access"}
          </h2>
          <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted mt-1">
            {isSetupMode
              ? "First-run setup: Establish the credentials for your single administrator."
              : "Enter administrative credentials to access operational controls."}
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-[#FCE8E6] border border-[#FAD2CF] text-[#A50E0E] text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {successMessage && (
        <div className="mb-4 p-3 rounded-lg bg-w4y-pastel-green border border-[#CEEAD6] text-[#0D652D] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Admin Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="e.g. w4y_admin"
          required
          autoFocus
          disabled={isLoading}
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          required
          disabled={isLoading}
        />

        {isSetupMode && (
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••••••"
            required
            disabled={isLoading}
          />
        )}

        <Button
          type="submit"
          className="w-full text-sm font-semibold mt-2"
          isLoading={isLoading}
        >
          {isSetupMode ? "Complete First-Run Setup" : "Sign In to Admin"}
        </Button>
      </form>
    </Card>
  );
}
