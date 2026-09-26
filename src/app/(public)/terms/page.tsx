import React from "react";
import { APP_CONFIG } from "@/lib/config";

export const metadata = {
  title: "Terms of Service — W4Y MyDesk",
  description: "Terms and conditions governing the purchase and licensing of MyDesk.",
};

export default function TermsPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">Legal</span>
          <h1 className="mt-1 text-3xl font-extrabold text-w4y-dark dark:text-white">Terms of Service</h1>
          <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted mt-2">Effective Date: 2026</p>
        </div>

        <div className="space-y-6 text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-w4y-dark dark:text-white">1. Commercial License Terms</h2>
            <p>
              By purchasing MyDesk through {APP_CONFIG.brand.domain}, you acquire a perpetual, non-exclusive, non-transferable commercial license to run the MyDesk software on one (1) designated device or computer.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-w4y-dark dark:text-white">2. One Device Policy</h2>
            <p>
              Each commercial license key is bound to one unique hardware identifier upon initial activation. Running simultaneous unauthorized copies on secondary machines violates the license terms and may result in license revocation.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-w4y-dark dark:text-white">3. Pricing & Payment</h2>
            <p>
              MyDesk is sold as a one-time purchase of ₹5,000 (or equivalent listed currency). There are no mandatory monthly subscription fees or hidden maintenance charges.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-w4y-dark dark:text-white">4. Business Entity</h2>
            <p>
              W4Y operates from Plot no. 7, New Sneh Nagar, Wardha Road, Nagpur, Maharashtra - 440015. Communications regarding commercial matters should be addressed to {APP_CONFIG.business.email}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
