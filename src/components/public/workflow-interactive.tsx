"use client";

import React, { useState } from "react";
import { Users, Briefcase, Calendar, FileText, Receipt, CreditCard, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowStage {
  id: string;
  name: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  mockData: {
    badge: string;
    fields: { label: string; value: string }[];
    highlight: string;
  };
}

const STAGES: WorkflowStage[] = [
  {
    id: "client",
    name: "Client",
    icon: Users,
    title: "Client Dossier",
    subtitle: "Connected client information",
    description:
      "Maintain every client's contacts, projects, communications, and financial summaries in one clear record without fragmented spreadsheets.",
    mockData: {
      badge: "ACTIVE CLIENT",
      fields: [
        { label: "Company", value: "Apex Design Studio" },
        { label: "Primary Contact", value: "Rohan Varma" },
        { label: "Email", value: "rohan@apexdesign.in" },
        { label: "Active Projects", value: "2 Ongoing" },
      ],
      highlight: "Total Billed: ₹2,40,000 | Outstanding: ₹0",
    },
  },
  {
    id: "project",
    name: "Project",
    icon: Briefcase,
    title: "Project Workspace",
    subtitle: "Understand where work stands",
    description:
      "Tie deliverables, milestones, meeting agendas, and billing straight to the project timeline. No separate task app required.",
    mockData: {
      badge: "IN PROGRESS",
      fields: [
        { label: "Project Title", value: "Brand Identity & Web Overhaul" },
        { label: "Client", value: "Apex Design Studio" },
        { label: "Milestones", value: "4 of 6 Completed" },
        { label: "Deadline", value: "15 Oct 2026" },
      ],
      highlight: "Next deliverable: Final Design Tokens & Component Library",
    },
  },
  {
    id: "meeting",
    name: "Meeting",
    icon: Calendar,
    title: "Meeting Minutes (MoM)",
    subtitle: "Minutes connected to work",
    description:
      "Document decisions, agreements, and next steps right under the client's project record, automatically creating action tasks.",
    mockData: {
      badge: "MOM APPROVED",
      fields: [
        { label: "Agenda", value: "Sprint Review & Scope Sign-off" },
        { label: "Date & Time", value: "26 Sep 2026, 4:00 PM" },
        { label: "Attendees", value: "Rohan Varma, Design Lead" },
        { label: "Decisions", value: "Scope finalized for phase 2" },
      ],
      highlight: "2 action items assigned directly to project timeline",
    },
  },
  {
    id: "quote",
    name: "Quote",
    icon: FileText,
    title: "Quotation Maker",
    subtitle: "Accurate itemized proposals",
    description:
      "Draft structured commercial quotations with clean itemization, custom notes, and instant client export. Convert to invoice in one click.",
    mockData: {
      badge: "ACCEPTED",
      fields: [
        { label: "Quote No", value: "QT-2026-084" },
        { label: "Valid Until", value: "30 Oct 2026" },
        { label: "Line Items", value: "3 Services specified" },
        { label: "Total Amount", value: "₹85,000" },
      ],
      highlight: "Accepted by client on 24 Sep — Converted to Invoice",
    },
  },
  {
    id: "invoice",
    name: "Invoice",
    icon: Receipt,
    title: "Billing & Invoicing",
    subtitle: "Professional commercial invoices",
    description:
      "Generate clean invoices linked directly to the accepted quotation and project milestones. Clear payment terms and downloadable PDFs.",
    mockData: {
      badge: "ISSUED",
      fields: [
        { label: "Invoice No", value: "INV-2026-112" },
        { label: "Issue Date", value: "25 Sep 2026" },
        { label: "Due Date", value: "10 Oct 2026" },
        { label: "Total Due", value: "₹85,000" },
      ],
      highlight: "Payment instructions & bank transfer details included",
    },
  },
  {
    id: "payment",
    name: "Payment",
    icon: CreditCard,
    title: "Payment Records",
    subtitle: "Reconcile what is paid",
    description:
      "Track incoming client payments against individual invoices. See exact balances, TDS deductions, and receipt references at a glance.",
    mockData: {
      badge: "RECONCILED",
      fields: [
        { label: "Payment Reference", value: "NEFT-782910452" },
        { label: "Amount Received", value: "₹85,000" },
        { label: "Date Received", value: "26 Sep 2026" },
        { label: "Invoice Balance", value: "₹0 (Fully Paid)" },
      ],
      highlight: "Automatic ledger update applied to client account",
    },
  },
];

export function WorkflowInteractive() {
  const [activeStageId, setActiveStageId] = useState("client");
  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];

  return (
    <div className="w-full">
      {/* Workflow Navigation Pipeline */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-w4y-border pb-4 dark:border-w4y-dark-border">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = stage.id === activeStageId;

          return (
            <React.Fragment key={stage.id}>
              <button
                onClick={() => setActiveStageId(stage.id)}
                className={cn(
                  "group flex items-center gap-2 px-3.5 py-2.5 rounded-btn text-xs font-semibold transition-all select-none text-left",
                  isActive
                    ? "bg-w4y-blue text-white shadow-sm"
                    : "bg-w4y-soft text-w4y-secondary hover:text-w4y-dark hover:bg-w4y-cool dark:bg-w4y-dark-surface dark:text-w4y-dark-muted dark:hover:text-white"
                )}
              >
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-white text-w4y-secondary dark:bg-w4y-dark-surface-elevated dark:text-w4y-dark-muted group-hover:text-w4y-dark"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span>{stage.name}</span>
              </button>

              {idx < STAGES.length - 1 && (
                <div className="hidden lg:block text-w4y-border dark:text-w4y-dark-border text-xs">
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Connected UI Preview Area */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
        {/* Stage Explanation */}
        <div className="lg:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-w4y-pastel-blue text-w4y-blue text-xs font-semibold dark:bg-w4y-blue/20 dark:text-blue-300">
            Stage {STAGES.findIndex((s) => s.id === activeStage.id) + 1} of {STAGES.length}
          </div>
          <h3 className="text-2xl font-bold text-w4y-dark dark:text-white">
            {activeStage.title}
          </h3>
          <p className="text-sm font-medium text-w4y-blue">
            {activeStage.subtitle}
          </p>
          <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
            {activeStage.description}
          </p>

          <div className="pt-2">
            <ul className="space-y-2 text-xs text-w4y-secondary dark:text-w4y-dark-muted">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                <span>Seamless transition to next stage</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                <span>Zero duplicate data entry</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-w4y-success shrink-0" />
                <span>Stored locally on your computer</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Realistic Simulated Product Interface */}
        <div className="lg:col-span-7">
          <div className="relative rounded-card border border-w4y-border bg-white shadow-md dark:border-w4y-dark-border dark:bg-w4y-dark-surface overflow-hidden">
            {/* Window titlebar */}
            <div className="flex items-center justify-between border-b border-w4y-border px-4 py-2.5 bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface-elevated">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-[#EA4335]/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#FBBC05]/70" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#34A853]/70" />
                <span className="ml-2 text-xs font-medium text-w4y-secondary dark:text-w4y-dark-muted">
                  MyDesk — {activeStage.title}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-w4y-blue uppercase tracking-wider">
                {activeStage.mockData.badge}
              </span>
            </div>

            {/* Inner Content Card */}
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-2 gap-4">
                {activeStage.mockData.fields.map((f, i) => (
                  <div key={i} className="p-3 rounded-lg bg-w4y-soft dark:bg-w4y-dark-surface-elevated border border-w4y-border/60 dark:border-w4y-dark-border/60">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-w4y-secondary dark:text-w4y-dark-muted">
                      {f.label}
                    </span>
                    <span className="block text-sm font-semibold text-w4y-dark dark:text-white mt-1">
                      {f.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-lg bg-w4y-pastel-blue/60 border border-w4y-blue/20 dark:bg-w4y-blue/10 dark:border-w4y-blue/30">
                <span className="text-xs font-medium text-w4y-dark dark:text-w4y-dark-text flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-w4y-blue" />
                  {activeStage.mockData.highlight}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
