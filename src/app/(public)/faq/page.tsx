import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/lib/config";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions — W4Y MyDesk",
  description: "Find clear answers to common questions about MyDesk licensing, downloads, devices, and payment.",
};

const FAQS = [
  {
    q: "What exactly is W4Y MyDesk?",
    a: "W4Y is our brand; MyDesk is the product. It is a commercial management application built for independent professionals and service businesses to manage clients, projects, meetings, quotes, invoices, and payments in one unified place.",
  },
  {
    q: "How much does it cost?",
    a: "MyDesk costs ₹5,000 as a one-time purchase. There are no monthly subscriptions, annual renewal fees, or recurring charges.",
  },
  {
    q: "How many devices does a single license cover?",
    a: "One license is valid for one computer or workstation. The license key binds to that device upon your first setup.",
  },
  {
    q: "What happens if I change my computer or reformat my OS?",
    a: "If you replace your workstation or re-install your operating system, our commercial support team (ceo@w4y.online) can assist in re-authorizing your license on your new machine.",
  },
  {
    q: "What happens immediately after I pay?",
    a: "Your payment is verified server-side. Once confirmed, you are immediately provided with your unique cryptographic license key, access to your protected download, and a downloadable W4Y proforma invoice. We also dispatch an email with your access credentials.",
  },
  {
    q: "Is an invoice provided?",
    a: "Yes. An official proforma invoice is generated during checkout and remains available for viewing and printing at any time.",
  },
  {
    q: "Is GST included in the ₹5,000 price?",
    a: "Currently, W4Y is not registered for GST, so no GST is charged or added to your ₹5,000 purchase price.",
  },
  {
    q: "Where is the application hosted?",
    a: "The downloadable MyDesk installer is hosted on our protected Hostinger VPS infrastructure under the w4y.online domain. Download access is authorized via secure temporary tokens.",
  },
  {
    q: "How do I contact customer support?",
    a: `You can reach our team directly at ${APP_CONFIG.business.email} or by phone at ${APP_CONFIG.business.phone}.`,
  },
];

export default function FAQPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
            Support & Clarity
          </span>
          <h1 className="text-3xl font-extrabold text-w4y-dark dark:text-white sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-w4y-secondary dark:text-w4y-dark-muted">
            Clear, transparent answers to help you make an informed decision.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="p-6 rounded-card border border-w4y-border bg-white dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-2"
            >
              <h3 className="text-base font-bold text-w4y-dark dark:text-white">
                {faq.q}
              </h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-card bg-w4y-soft border border-w4y-border dark:bg-w4y-dark-surface dark:border-w4y-dark-border text-center space-y-4 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-w4y-dark dark:text-white">
            Have a question not listed here?
          </h3>
          <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted">
            Send us an email directly at {APP_CONFIG.business.email} and we will reply promptly.
          </p>
          <div className="pt-2">
            <Link href="/buy">
              <Button size="lg" className="gap-2">
                Get MyDesk — ₹5,000
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
