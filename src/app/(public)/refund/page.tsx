import React from "react";
import { APP_CONFIG } from "@/lib/config";

export const metadata = {
  title: "Refund Policy — W4Y MyDesk",
  description: "Commercial refund terms and policy for MyDesk software.",
};

export default function RefundPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">Commercial Policy</span>
          <h1 className="mt-1 text-3xl font-extrabold text-w4y-dark dark:text-white">Refund Policy</h1>
          <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted mt-2">Effective Date: 2026</p>
        </div>

        <div className="space-y-6 text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-w4y-dark dark:text-white">1. Commercial Overview</h2>
            <p>
              We believe in honest, straightforward business relationships. Because MyDesk provides direct, downloadable software access and cryptographic license keys upon purchase, we ask that you review the software capabilities and workflow demonstrated on our website prior to purchase.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-w4y-dark dark:text-white">2. Technical Incompatibility</h2>
            <p>
              If you experience genuine technical incompatibility on a supported 64-bit operating system that our support desk cannot resolve within 7 days of purchase, you may request a refund by emailing {APP_CONFIG.business.email} with your order number.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-w4y-dark dark:text-white">3. Deactivation Upon Refund</h2>
            <p>
              When a refund is approved and recorded by our administration, the associated license key is permanently revoked, and protected download access is deactivated.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-w4y-dark dark:text-white">4. Contact For Billing Questions</h2>
            <p>
              For any refund inquiries or billing clarification, please write directly to {APP_CONFIG.business.email} or call {APP_CONFIG.business.phone}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
