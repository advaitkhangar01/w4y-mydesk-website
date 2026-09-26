import React from "react";
import Link from "next/link";
import { WorkflowInteractive } from "@/components/public/workflow-interactive";
import { Button } from "@/components/ui/button";
import {
  ComicClientBadge,
  ComicProjectBadge,
  ComicMeetingBadge,
  ComicInvoiceBadge,
} from "@/components/comic/comic-workflow-badges";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "How It Works — W4Y MyDesk",
  description: "Understand the connected commercial workflow of MyDesk from client record to payment reconciliation.",
};

export default function HowItWorksPage() {
  return (
    <div className="py-16 md:py-24 relative overflow-hidden bg-drafting-grid">
      {/* Ambient Depth Orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/3 w-[650px] h-[650px] depth-orb-blue blur-3xl opacity-60" />
      <div className="pointer-events-none absolute bottom-10 right-0 w-[500px] h-[500px] depth-orb-lavender blur-3xl opacity-50" />

      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
            Workflow Architecture
          </span>
          <h1 className="mt-2 text-3xl font-extrabold text-w4y-dark dark:text-white sm:text-5xl">
            How MyDesk connects your work.
          </h1>
          <p className="mt-4 text-base sm:text-lg text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
            Most software forces you to copy information between a CRM, a task manager, a word processor, and a spreadsheet. MyDesk connects every stage so you never have to re-enter data twice.
          </p>
        </div>

        {/* Interactive workflow */}
        <div className="comic-panel p-8 rounded-card bg-white dark:bg-w4y-dark-surface shadow-md">
          <WorkflowInteractive />
        </div>

        {/* Deep dive stages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="comic-panel p-6 rounded-card bg-white dark:bg-w4y-dark-surface space-y-4">
            <div className="flex items-center gap-3">
              <ComicClientBadge className="w-12 h-12" />
              <h3 className="text-lg font-bold text-w4y-dark dark:text-white">
                1. The Client Dossier
              </h3>
            </div>
            <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
              Every relationship begins with contact details and company information. Instead of an isolated address book, the dossier links to all historic projects, meeting agreements, quotations, and outstanding payments.
            </p>
          </div>

          <div className="comic-panel p-6 rounded-card bg-white dark:bg-w4y-dark-surface space-y-4">
            <div className="flex items-center gap-3">
              <ComicProjectBadge className="w-12 h-12" />
              <h3 className="text-lg font-bold text-w4y-dark dark:text-white">
                2. Projects & Deliverables
              </h3>
            </div>
            <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
              Projects house deliverables and milestones. You always know which phase of work is active, which deliverables need sign-off, and what commercial milestones are ready for billing.
            </p>
          </div>

          <div className="comic-panel p-6 rounded-card bg-white dark:bg-w4y-dark-surface space-y-4">
            <div className="flex items-center gap-3">
              <ComicMeetingBadge className="w-12 h-12" />
              <h3 className="text-lg font-bold text-w4y-dark dark:text-white">
                3. Meeting Minutes (MoM)
              </h3>
            </div>
            <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
              Document client decisions, meeting scopes, and action items in real-time. MoMs are stored chronologically under the client, establishing clear expectations without disputes.
            </p>
          </div>

          <div className="comic-panel p-6 rounded-card bg-white dark:bg-w4y-dark-surface space-y-4">
            <div className="flex items-center gap-3">
              <ComicInvoiceBadge className="w-12 h-12" />
              <h3 className="text-lg font-bold text-w4y-dark dark:text-white">
                4. Quotations to Invoices
              </h3>
            </div>
            <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
              Create structured itemized quotes with custom terms. Once the client approves, one click converts the quotation into an official commercial invoice with due date and balance tracking.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-card bg-w4y-cool border border-w4y-border dark:bg-w4y-dark-surface dark:border-w4y-dark-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold text-w4y-dark dark:text-white">
              Ready to streamline your desk?
            </h3>
            <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted">
              Get full commercial access for ₹5,000 one-time.
            </p>
          </div>
          <Link href="/buy">
            <Button size="lg" className="gap-2">
              Purchase MyDesk
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
