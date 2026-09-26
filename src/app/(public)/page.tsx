import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { WorkflowInteractive } from "@/components/public/workflow-interactive";
import { APP_CONFIG } from "@/lib/config";
import {
  ArrowRight,
  CheckCircle2,
  Users,
  Briefcase,
  Calendar,
  FileText,
  Receipt,
  CreditCard,
  ShieldCheck,
  Laptop,
  DownloadCloud,
  HelpCircle,
  Clock,
  Sparkles,
  Layers,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 aurora-halo">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-w4y-border bg-w4y-soft text-xs font-semibold text-w4y-dark dark:border-w4y-dark-border dark:bg-w4y-dark-surface dark:text-w4y-dark-text mb-6">
            <span className="w-2 h-2 rounded-full bg-w4y-blue" />
            <span>W4Y Software Release — ₹5,000 One-time Purchase</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-w4y-dark dark:text-white max-w-4xl mx-auto leading-tight">
            {APP_CONFIG.brand.tagline}
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-w4y-secondary dark:text-w4y-dark-muted max-w-2xl mx-auto leading-relaxed">
            {APP_CONFIG.brand.proposition}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/buy" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8">
                Get MyDesk — ₹5,000
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="#workflow" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
                See how it works →
              </Button>
            </Link>
          </div>

          <p className="mt-4 text-xs text-w4y-secondary dark:text-w4y-dark-muted">
            One-time purchase · One device license · No recurring subscriptions
          </p>

          {/* Hero Realistic Application Graphic */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="rounded-xl border border-w4y-border bg-white shadow-xl dark:border-w4y-dark-border dark:bg-w4y-dark-surface overflow-hidden text-left">
              {/* Fake Desktop Titlebar */}
              <div className="flex items-center justify-between border-b border-w4y-border bg-w4y-soft px-4 py-3 dark:border-w4y-dark-border dark:bg-w4y-dark-surface-elevated">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-[#EA4335]" />
                  <div className="h-3 w-3 rounded-full bg-[#FBBC05]" />
                  <div className="h-3 w-3 rounded-full bg-[#34A853]" />
                  <span className="ml-3 text-xs font-semibold text-w4y-dark dark:text-white">
                    W4Y MyDesk — Commercial Operations Workspace
                  </span>
                </div>
                <span className="text-[11px] font-mono text-w4y-secondary dark:text-w4y-dark-muted">
                  v1.0 · Local Device
                </span>
              </div>

              {/* Realistic Overview Grid */}
              <div className="p-6 md:p-8 space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 rounded-lg bg-w4y-soft border border-w4y-border/80 dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border">
                    <span className="text-xs font-semibold text-w4y-secondary dark:text-w4y-dark-muted uppercase">Active Clients</span>
                    <p className="text-2xl font-bold text-w4y-dark dark:text-white mt-1">14</p>
                    <span className="text-[11px] text-w4y-success font-medium">All dossiers synced</span>
                  </div>
                  <div className="p-4 rounded-lg bg-w4y-soft border border-w4y-border/80 dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border">
                    <span className="text-xs font-semibold text-w4y-secondary dark:text-w4y-dark-muted uppercase">Ongoing Projects</span>
                    <p className="text-2xl font-bold text-w4y-dark dark:text-white mt-1">8</p>
                    <span className="text-[11px] text-w4y-blue font-medium">3 milestones this week</span>
                  </div>
                  <div className="p-4 rounded-lg bg-w4y-soft border border-w4y-border/80 dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border">
                    <span className="text-xs font-semibold text-w4y-secondary dark:text-w4y-dark-muted uppercase">Pending Invoices</span>
                    <p className="text-2xl font-bold text-w4y-dark dark:text-white mt-1">₹1,45,000</p>
                    <span className="text-[11px] text-w4y-warning font-medium">2 due in 5 days</span>
                  </div>
                  <div className="p-4 rounded-lg bg-w4y-soft border border-w4y-border/80 dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border">
                    <span className="text-xs font-semibold text-w4y-secondary dark:text-w4y-dark-muted uppercase">Received This Month</span>
                    <p className="text-2xl font-bold text-w4y-dark dark:text-white mt-1">₹3,80,000</p>
                    <span className="text-[11px] text-w4y-success font-medium">Reconciled to bank</span>
                  </div>
                </div>

                <div className="rounded-lg border border-w4y-border p-4 bg-white dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border">
                  <div className="flex items-center justify-between pb-3 border-b border-w4y-border dark:border-w4y-dark-border text-xs font-semibold text-w4y-secondary dark:text-w4y-dark-muted">
                    <span>Recent Connected Business Pipeline</span>
                    <span>Status</span>
                  </div>
                  <div className="divide-y divide-w4y-border/50 dark:divide-w4y-dark-border text-sm">
                    <div className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-w4y-dark dark:text-white">Apex Design Studio — Identity Overhaul</p>
                        <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted">Meeting MoM signed · Quote QT-2026-084 approved</p>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-w4y-pastel-blue text-w4y-blue">Invoice Issued</span>
                    </div>
                    <div className="py-3 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-w4y-dark dark:text-white">Zenith Tech — Mobile Portal Setup</p>
                        <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted">Task review meeting scheduled for tomorrow</p>
                      </div>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-w4y-pastel-green text-w4y-success">Active Project</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. PROBLEM RECOGNITION SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 border-t border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-w4y-secondary dark:text-w4y-dark-muted">
              The Reality
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-w4y-dark dark:text-white sm:text-4xl">
              Your business shouldn't live in five different places.
            </h2>
            <p className="mt-4 text-base text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
              When you run an independent practice or service business, work scatters quickly. You start losing time keeping things aligned.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-card bg-white border border-w4y-border shadow-xs dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#EA4335]/10 text-w4y-error flex items-center justify-center font-bold">
                ✕
              </div>
              <h3 className="text-base font-bold text-w4y-dark dark:text-white">
                Scattered Client Notes & WhatsApp
              </h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Contact details in phone, notes in random text files, and project agreements buried inside old message threads.
              </p>
            </div>

            <div className="p-6 rounded-card bg-white border border-w4y-border shadow-xs dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#EA4335]/10 text-w4y-error flex items-center justify-center font-bold">
                ✕
              </div>
              <h3 className="text-base font-bold text-w4y-dark dark:text-white">
                Disconnected Quotes & Invoices
              </h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Manually copying line items from a quotation document into an invoice spreadsheet, hoping amounts and numbers match.
              </p>
            </div>

            <div className="p-6 rounded-card bg-white border border-w4y-border shadow-xs dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#EA4335]/10 text-w4y-error flex items-center justify-center font-bold">
                ✕
              </div>
              <h3 className="text-base font-bold text-w4y-dark dark:text-white">
                Missing Payment Reconciliation
              </h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Never knowing for certain who paid what, what is partially cleared, or which project is awaiting balance clearance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. SOLUTION SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 border-t border-w4y-border bg-white dark:border-w4y-dark-border dark:bg-w4y-dark-bg">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
                The Solution
              </span>
              <h2 className="text-3xl font-extrabold text-w4y-dark dark:text-white sm:text-4xl">
                Bring it together.
              </h2>
              <p className="text-base text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                MyDesk was designed around the actual rhythm of service work. When you sign a client, work flows naturally: from meeting discussions directly into quotation lines, from approved quotes into billing invoices, and from receipts directly into client ledger records.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-w4y-blue shrink-0 mt-0.5" />
                  <p className="text-sm text-w4y-dark dark:text-w4y-dark-text">
                    <strong>Connected Context:</strong> Every meeting note, quote, invoice, and payment lives under the client dossier.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-w4y-blue shrink-0 mt-0.5" />
                  <p className="text-sm text-w4y-dark dark:text-w4y-dark-text">
                    <strong>Local & Private:</strong> Runs right on your computer. Your business records remain completely in your own hands.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-w4y-blue shrink-0 mt-0.5" />
                  <p className="text-sm text-w4y-dark dark:text-w4y-dark-text">
                    <strong>No Monthly Ransom:</strong> Pay once, own your license permanently.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-card border border-w4y-border p-6 bg-w4y-cool dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-4">
              <h3 className="text-lg font-bold text-w4y-dark dark:text-white">
                Everything connected in a single line
              </h3>
              <div className="space-y-2 text-sm text-w4y-secondary dark:text-w4y-dark-muted">
                <div className="p-3 bg-white rounded-lg border border-w4y-border dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border flex items-center justify-between">
                  <span>1. Client Record Created</span>
                  <span className="text-xs font-semibold text-w4y-blue">Dossier</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-w4y-border dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border flex items-center justify-between">
                  <span>2. Meeting MoM Documented</span>
                  <span className="text-xs font-semibold text-w4y-blue">Agreed Scope</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-w4y-border dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border flex items-center justify-between">
                  <span>3. Quotation Generated</span>
                  <span className="text-xs font-semibold text-w4y-blue">Commercial Terms</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-w4y-border dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border flex items-center justify-between">
                  <span>4. Invoice Issued</span>
                  <span className="text-xs font-semibold text-w4y-blue">Billing Milestone</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-w4y-border dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border flex items-center justify-between">
                  <span>5. Payment Reconciled</span>
                  <span className="text-xs font-semibold text-w4y-success">Balance Cleared</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4 & 5. WORKFLOW DEMONSTRATION SECTION */}
      {/* ------------------------------------------------------------- */}
      <section id="workflow" className="py-20 border-t border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
              Connected Commercial Flow
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-w4y-dark dark:text-white sm:text-4xl">
              From conversation to payment
            </h2>
            <p className="mt-4 text-base text-w4y-secondary dark:text-w4y-dark-muted">
              Select any stage below to inspect how MyDesk handles each phase of your commercial work.
            </p>
          </div>

          <WorkflowInteractive />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. FEATURES SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 border-t border-w4y-border bg-white dark:border-w4y-dark-border dark:bg-w4y-dark-bg">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-w4y-secondary dark:text-w4y-dark-muted">
              Core Capabilities
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-w4y-dark dark:text-white sm:text-4xl">
              Only what genuinely matters to your business.
            </h2>
            <p className="mt-4 text-base text-w4y-secondary dark:text-w4y-dark-muted">
              No bloated enterprise configuration. Just the six core pillars you need every working day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-3">
              <div className="w-10 h-10 rounded-lg bg-w4y-pastel-blue text-w4y-blue flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-w4y-dark dark:text-white">Clients</h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Keep client contact cards, ongoing projects, meeting agreements, and financial ledgers unified in a single dossier.
              </p>
            </div>

            <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-3">
              <div className="w-10 h-10 rounded-lg bg-w4y-pastel-blue text-w4y-blue flex items-center justify-center">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-w4y-dark dark:text-white">Projects</h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Track deliverables, milestone statuses, and linked billing without switching to complicated kanban boards.
              </p>
            </div>

            <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-3">
              <div className="w-10 h-10 rounded-lg bg-w4y-pastel-blue text-w4y-blue flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-w4y-dark dark:text-white">Meetings & MoM</h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Log Minutes of the Meeting (MoM), agreed client decisions, and immediately assign action tasks linked to the project.
              </p>
            </div>

            <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-3">
              <div className="w-10 h-10 rounded-lg bg-w4y-pastel-blue text-w4y-blue flex items-center justify-center">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-w4y-dark dark:text-white">Quotations</h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Draft professional commercial proposals with clean itemization, custom terms, and export them directly to client PDF.
              </p>
            </div>

            <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-3">
              <div className="w-10 h-10 rounded-lg bg-w4y-pastel-blue text-w4y-blue flex items-center justify-center">
                <Receipt className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-w4y-dark dark:text-white">Invoices</h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Convert approved quotes to invoices in one click. Maintain clear invoice numbering, due dates, and payment instructions.
              </p>
            </div>

            <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-3">
              <div className="w-10 h-10 rounded-lg bg-w4y-pastel-blue text-w4y-blue flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-w4y-dark dark:text-white">Payments</h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Record incoming bank transfers, cheques, or online receipts with TDS deductions and track real outstanding balances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. TARGET AUDIENCE SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 border-t border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-w4y-secondary dark:text-w4y-dark-muted">
              Built For Independent Practice
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-w4y-dark dark:text-white sm:text-4xl">
              Who uses MyDesk?
            </h2>
            <p className="mt-4 text-base text-w4y-secondary dark:text-w4y-dark-muted">
              Designed specifically for professionals who manage their own client relationships from start to finish.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-card bg-white border border-w4y-border dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border space-y-2">
              <h3 className="font-bold text-w4y-dark dark:text-white">Solo Business Owners</h3>
              <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Run your entire commercial operations without hiring an administrative assistant or buying four SaaS subscriptions.
              </p>
            </div>

            <div className="p-6 rounded-card bg-white border border-w4y-border dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border space-y-2">
              <h3 className="font-bold text-w4y-dark dark:text-white">Freelancers & Consultants</h3>
              <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Present structured, professional proposals, track milestone sign-offs, and never miss an overdue invoice again.
              </p>
            </div>

            <div className="p-6 rounded-card bg-white border border-w4y-border dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border space-y-2">
              <h3 className="font-bold text-w4y-dark dark:text-white">Architects & Designers</h3>
              <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Keep client design changes, meeting minutes, and milestone payments organized directly on your workspace.
              </p>
            </div>

            <div className="p-6 rounded-card bg-white border border-w4y-border dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border space-y-2">
              <h3 className="font-bold text-w4y-dark dark:text-white">Service Agencies</h3>
              <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Maintain clean client dossiers, itemized project quotes, and reconciled billing records across your client roster.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8 & 9. PRICING SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 border-t border-w4y-border bg-white dark:border-w4y-dark-border dark:bg-w4y-dark-bg">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">
              Simple Commercial Terms
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-w4y-dark dark:text-white sm:text-4xl">
              One price. No recurring subscriptions.
            </h2>
            <p className="mt-4 text-base text-w4y-secondary dark:text-w4y-dark-muted">
              We do not charge you monthly fees to access your own business data.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="rounded-card border-2 border-w4y-blue bg-white p-8 shadow-lg dark:bg-w4y-dark-surface dark:border-w4y-blue text-left relative">
              <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-w4y-blue text-white text-xs font-bold uppercase tracking-wider">
                Full Commercial License
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-w4y-secondary dark:text-w4y-dark-muted uppercase tracking-wider">
                  W4Y MyDesk
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold text-w4y-dark dark:text-white">
                    ₹5,000
                  </span>
                  <span className="text-sm font-medium text-w4y-secondary dark:text-w4y-dark-muted">
                    one-time purchase
                  </span>
                </div>
                <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted">
                  No monthly plan · No yearly renewals · Standard commercial license
                </p>
              </div>

              <div className="my-6 border-t border-w4y-border dark:border-w4y-dark-border pt-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-w4y-dark dark:text-white">
                  What you receive:
                </h4>
                <ul className="space-y-2.5 text-sm text-w4y-dark dark:text-w4y-dark-text">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                    <span>Downloadable MyDesk desktop application</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                    <span>One-device commercial license</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                    <span>Cryptographic license key issued instantly</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                    <span>Protected download access on Hostinger VPS</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                    <span>Official W4Y proforma invoice generated</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                    <span>Access credentials delivered to your email</span>
                  </li>
                </ul>
              </div>

              <Link href="/buy" className="block w-full">
                <Button size="lg" className="w-full justify-center text-base">
                  Purchase MyDesk Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 10. PURCHASE PROCESS */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 border-t border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-w4y-secondary dark:text-w4y-dark-muted">
              Clear Purchase Process
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-w4y-dark dark:text-white sm:text-4xl">
              What happens after you pay?
            </h2>
            <p className="mt-4 text-base text-w4y-secondary dark:text-w4y-dark-muted">
              Every step is automated and transparent. No hidden steps or unexpected approvals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-card bg-white border border-w4y-border dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border space-y-3">
              <span className="text-xs font-bold text-w4y-blue uppercase tracking-wider">Step 1</span>
              <h3 className="font-bold text-w4y-dark dark:text-white">Secure Checkout</h3>
              <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Provide your contact details and proceed to payment. Your order and proforma invoice are generated immediately.
              </p>
            </div>

            <div className="p-6 rounded-card bg-white border border-w4y-border dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border space-y-3">
              <span className="text-xs font-bold text-w4y-blue uppercase tracking-wider">Step 2</span>
              <h3 className="font-bold text-w4y-dark dark:text-white">Server Verification</h3>
              <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Your payment is authoritatively confirmed server-side through cryptographic signatures, ensuring immediate order settlement.
              </p>
            </div>

            <div className="p-6 rounded-card bg-white border border-w4y-border dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border space-y-3">
              <span className="text-xs font-bold text-w4y-blue uppercase tracking-wider">Step 3</span>
              <h3 className="font-bold text-w4y-dark dark:text-white">License Generated</h3>
              <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                A unique cryptographic license key is generated for your device and displayed on-screen along with your invoice.
              </p>
            </div>

            <div className="p-6 rounded-card bg-white border border-w4y-border dark:bg-w4y-dark-surface-elevated dark:border-w4y-dark-border space-y-3">
              <span className="text-xs font-bold text-w4y-blue uppercase tracking-wider">Step 4</span>
              <h3 className="font-bold text-w4y-dark dark:text-white">Protected Download & Email</h3>
              <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                You receive full download access and an email confirmation containing your license key and download instructions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 11. FAQ SECTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 border-t border-w4y-border bg-white dark:border-w4y-dark-border dark:bg-w4y-dark-bg">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-w4y-secondary dark:text-w4y-dark-muted">
              Frequently Asked Questions
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-w4y-dark dark:text-white sm:text-4xl">
              Answers before you purchase.
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-2">
              <h3 className="text-base font-bold text-w4y-dark dark:text-white">
                How does the one-device license model work?
              </h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Each license purchased gives you authorization to activate and run MyDesk on one primary computer or workstation. The license key binds to that device upon initial setup.
              </p>
            </div>

            <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-2">
              <h3 className="text-base font-bold text-w4y-dark dark:text-white">
                Are there any recurring or hidden monthly fees?
              </h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                No. ₹5,000 is a one-time commercial purchase. There is no subscription, renewal fee, or monthly billing.
              </p>
            </div>

            <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-2">
              <h3 className="text-base font-bold text-w4y-dark dark:text-white">
                Do I receive an official invoice?
              </h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Yes. An official W4Y proforma invoice is generated during checkout and remains accessible in your purchase confirmation email and on-screen at any time.
              </p>
            </div>

            <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-2">
              <h3 className="text-base font-bold text-w4y-dark dark:text-white">
                How do I get product support or assistance?
              </h3>
              <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                You can reach out directly to our leadership and support desk at <a href={`mailto:${APP_CONFIG.business.email}`} className="text-w4y-blue underline">{APP_CONFIG.business.email}</a> or phone {APP_CONFIG.business.phone}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 12. FINAL CALL TO ACTION */}
      {/* ------------------------------------------------------------- */}
      <section className="py-20 border-t border-w4y-border bg-w4y-cool dark:border-w4y-dark-border dark:bg-w4y-dark-surface">
        <div className="mx-auto max-w-site px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-w4y-dark dark:text-white sm:text-4xl">
            Get your business organized at your desk.
          </h2>
          <p className="text-base text-w4y-secondary dark:text-w4y-dark-muted max-w-xl mx-auto">
            Clients, projects, meetings, quotes, invoices, and payments in one clean commercial system. ₹5,000 one-time.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/buy">
              <Button size="lg" className="w-full sm:w-auto px-8 gap-2 text-base">
                Get MyDesk Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
