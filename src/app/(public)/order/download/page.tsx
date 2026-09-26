"use client";

import React, { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { APP_CONFIG } from "@/lib/config";
import { Download, AlertCircle } from "lucide-react";

function DownloadContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startDownload = () => {
    if (!token) {
      setError("No download authorization token was provided.");
      return;
    }
    setDownloadStarted(true);
    window.location.href = `/api/download/${encodeURIComponent(token)}`;
  };

  return (
    <Card className="p-8 text-center space-y-6 bg-white dark:bg-w4y-dark-surface border border-w4y-border dark:border-w4y-dark-border">
      <div className="w-14 h-14 rounded-full bg-w4y-pastel-blue text-w4y-blue flex items-center justify-center mx-auto">
        <Download className="w-7 h-7" />
      </div>

      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
          Protected Hostinger VPS Delivery
        </span>
        <h1 className="text-2xl font-bold text-w4y-dark dark:text-white mt-1">
          Download {APP_CONFIG.brand.product}
        </h1>
        <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted mt-2">
          Windows 64-bit Commercial Desktop Application (One-Device License)
        </p>
      </div>

      {error ? (
        <div className="p-4 rounded-lg bg-[#FCE8E6] border border-[#FAD2CF] text-[#A50E0E] text-xs flex items-center gap-2 text-left">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : (
        <div className="space-y-4">
          <Button
            size="lg"
            onClick={startDownload}
            className="w-full gap-2 text-base font-semibold"
          >
            <Download className="w-5 h-5" />
            {downloadStarted ? "Downloading Started..." : "Download Installer (.exe)"}
          </Button>
          <p className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">
            Requires 64-bit Windows 10/11. Download link is protected and expires periodically.
          </p>
        </div>
      )}

      <div className="pt-6 border-t border-w4y-border dark:border-w4y-dark-border text-left space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-w4y-dark dark:text-white">
          Next Steps after Download:
        </h4>
        <ol className="space-y-2 text-xs text-w4y-secondary dark:text-w4y-dark-muted list-decimal list-inside leading-relaxed">
          <li>Run the downloaded setup installer (<code>MyDesk-Setup-x64.exe</code>).</li>
          <li>Launch MyDesk on your workstation.</li>
          <li>Enter the <strong>License Key</strong> you received via email and confirmation screen.</li>
          <li>Your license will bind to this device for commercial operations.</li>
        </ol>
      </div>
    </Card>
  );
}

export default function DownloadLandingPage() {
  return (
    <div className="py-16 md:py-24 bg-w4y-soft dark:bg-w4y-dark-bg min-h-screen">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto space-y-6">
          <Suspense
            fallback={
              <Card className="p-8 text-center text-xs text-w4y-secondary">
                Loading download verification...
              </Card>
            }
          >
            <DownloadContent />
          </Suspense>

          <div className="text-center text-xs text-w4y-secondary dark:text-w4y-dark-muted space-y-1">
            <p>Need download support? Contact {APP_CONFIG.business.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
