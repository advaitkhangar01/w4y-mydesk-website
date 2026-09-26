import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ComicClientBadge,
  ComicProjectBadge,
  ComicMeetingBadge,
  ComicQuoteBadge,
  ComicInvoiceBadge,
  ComicPaymentBadge,
} from "@/components/comic/comic-workflow-badges";
import {
  Users,
  Briefcase,
  Calendar,
  FileText,
  Receipt,
  CreditCard,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Features — W4Y MyDesk",
  description: "Explore the core features of MyDesk: Clients, Projects, Meetings, Quotes, Invoices, and Payments.",
};

const FEATURES = [
  {
    icon: Users,
    badge: ComicClientBadge,
    title: "Clients",
    summary: "Keep client information connected to the work.",
    details: [
      "Unified client dossiers with contact information and addresses",
      "Direct link to all historic and active projects",
      "Overview of total billed amounts and pending receivables",
      "Search and filter client records instantly",
    ],
  },
  {
    icon: Briefcase,
    badge: ComicProjectBadge,
    title: "Projects",
    summary: "Understand where work stands.",
    details: [
      "Track project status from planning to active delivery and completion",
      "Milestone and task scheduling tied to client commitments",
      "Connected document repository for project deliverables",
      "Commercial milestone monitoring to ensure billing on delivery",
    ],
  },
  {
    icon: Calendar,
    badge: ComicMeetingBadge,
    title: "Meetings & Minutes",
    summary: "Keep meeting information connected to business work.",
    details: [
      "Chronological meeting logging with dates, agendas, and attendees",
      "Structured Minutes of Meeting (MoM) recording decisions and scope",
      "Direct conversion of meeting decisions into actionable tasks",
      "Exportable meeting summaries for client sign-off",
    ],
  },
  {
    icon: FileText,
    badge: ComicQuoteBadge,
    title: "Quotes & Proposals",
    summary: "Create and manage itemized quotations.",
    details: [
      "Custom line itemization with rates, quantities, and descriptions",
      "Support for customizable discounts and commercial notes",
      "Unique quotation numbering system",
      "One-click conversion into an active invoice upon client approval",
    ],
  },
  {
    icon: Receipt,
    badge: ComicInvoiceBadge,
    title: "Invoices",
    summary: "Create and manage commercial invoices.",
    details: [
      "Clean professional invoice layouts ready for printing and PDF export",
      "Automatic balance calculation and due date tracking",
      "Direct linkage to original client quotation and project milestone",
      "Clear payment instructions and bank transfer details",
    ],
  },
  {
    icon: CreditCard,
    badge: ComicPaymentBadge,
    title: "Payments",
    summary: "Track payment reconciliation and balances.",
    details: [
      "Record incoming payments against specific invoices",
      "Support for partial payments and multi-stage receipts",
      "Optional TDS recording with tax section classification",
      "Clear client balance ledger showing paid vs outstanding amounts",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="py-16 md:py-24 relative overflow-hidden bg-drafting-grid">
      {/* Ambient Depth Orbs */}
      <div className="pointer-events-none absolute -top-24 -right-24 w-[600px] h-[600px] depth-orb-blue blur-3xl opacity-60" />
      <div className="pointer-events-none absolute bottom-1/4 -left-24 w-[500px] h-[500px] depth-orb-lavender blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
            Core Modules
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-w4y-dark dark:text-white sm:text-5xl">
            Features built for actual work.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
            Every feature in MyDesk was shaped by the daily demands of running independent client projects. No unnecessary complexity, no fake AI features—just solid commercial utilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => {
            const Badge = feature.badge;
            return (
              <div
                key={i}
                className="comic-panel p-6 rounded-card bg-white dark:bg-w4y-dark-surface space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="w-12 h-12" />
                    <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-w4y-soft text-w4y-secondary dark:bg-w4y-dark-surface-elevated dark:text-w4y-dark-muted">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-w4y-dark dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-sm font-medium text-w4y-secondary dark:text-w4y-dark-muted">
                    {feature.summary}
                  </p>
                  <ul className="space-y-2 pt-2 border-t border-w4y-border/60 dark:border-w4y-dark-border/60">
                    {feature.details.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-w4y-secondary dark:text-w4y-dark-muted flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-w4y-blue shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-8 rounded-card bg-w4y-soft border border-w4y-border dark:bg-w4y-dark-surface dark:border-w4y-dark-border text-center space-y-4">
          <h2 className="text-2xl font-bold text-w4y-dark dark:text-white">
            Everything you need for ₹5,000 one-time
          </h2>
          <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted max-w-md mx-auto">
            Install on your computer, activate with your license key, and keep your business records organized locally.
          </p>
          <div className="pt-2">
            <Link href="/buy">
              <Button size="lg" className="gap-2">
                Purchase MyDesk License
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
