import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, ShieldCheck, Laptop } from "lucide-react";

export const metadata = {
  title: "Pricing — W4Y MyDesk",
  description: "₹5,000 one-time purchase. No subscriptions or hidden fees. One license = one computer.",
};

export default function PricingPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
            Simple Pricing
          </span>
          <h1 className="text-3xl font-extrabold text-w4y-dark dark:text-white sm:text-5xl">
            ₹5,000 one-time purchase.
          </h1>
          <p className="text-base sm:text-lg text-w4y-secondary dark:text-w4y-dark-muted">
            No monthly subscription. No annual renewal. Own your license permanently.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <div className="rounded-card border-2 border-w4y-blue bg-white p-8 shadow-xl dark:bg-w4y-dark-surface space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-w4y-secondary dark:text-w4y-dark-muted">
                  Commercial License
                </span>
                <h3 className="text-2xl font-bold text-w4y-dark dark:text-white">
                  W4Y MyDesk
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-w4y-pastel-blue text-w4y-blue text-xs font-bold uppercase">
                Perpetual
              </span>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-extrabold text-w4y-dark dark:text-white">
                ₹5,000
              </span>
              <span className="text-sm font-medium text-w4y-secondary dark:text-w4y-dark-muted">
                one-time payment
              </span>
            </div>

            <div className="space-y-3 border-t border-w4y-border pt-6 dark:border-w4y-dark-border text-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-w4y-dark dark:text-white">
                What is included:
              </h4>
              <ul className="space-y-2.5 text-w4y-dark dark:text-w4y-dark-text">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                  <span>Full access to downloadable MyDesk desktop application</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                  <span>One-device commercial license (bound to your workstation)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                  <span>Unique cryptographic license key issued immediately</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                  <span>Protected download access on Hostinger VPS infrastructure</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                  <span>Official W4Y proforma invoice generated for your records</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                  <span>Access credentials & instructions sent to your email</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <Link href="/buy" className="block w-full">
                <Button size="lg" className="w-full justify-center text-base">
                  Purchase Commercial License
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* License clarifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8">
          <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-2 text-left">
            <Laptop className="w-6 h-6 text-w4y-blue" />
            <h4 className="font-bold text-w4y-dark dark:text-white">One Device Model</h4>
            <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
              Your license is authorized for one computer. If you upgrade computers, our support team can help rebind your license.
            </p>
          </div>

          <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-2 text-left">
            <ShieldCheck className="w-6 h-6 text-w4y-blue" />
            <h4 className="font-bold text-w4y-dark dark:text-white">Your Data Stays Local</h4>
            <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
              Your business clients, quotations, invoices, and accounting information stay stored securely on your machine.
            </p>
          </div>

          <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-2 text-left">
            <CheckCircle2 className="w-6 h-6 text-w4y-blue" />
            <h4 className="font-bold text-w4y-dark dark:text-white">No Monthly Tax</h4>
            <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
              You will never receive an unexpected credit card charge or recurring subscription bill from us.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
