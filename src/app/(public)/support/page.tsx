import React from "react";
import { APP_CONFIG } from "@/lib/config";
import { Mail, Phone, MapPin, Globe, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Commercial Support — W4Y MyDesk",
  description: "Official contact details and support channels for W4Y MyDesk customers.",
};

export default function SupportPage() {
  return (
    <div className="py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-12">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-w4y-blue">Direct Contact</span>
          <h1 className="mt-1 text-3xl font-extrabold text-w4y-dark dark:text-white">Commercial Support Desk</h1>
          <p className="text-base text-w4y-secondary dark:text-w4y-dark-muted mt-2">
            Reach out directly for assistance with licensing, device re-activation, downloads, or billing inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-card border border-w4y-border bg-white dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-3">
            <Mail className="w-6 h-6 text-w4y-blue" />
            <h3 className="font-bold text-w4y-dark dark:text-white">Email Inquiries</h3>
            <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
              For commercial orders, proforma invoices, and license re-assignment:
            </p>
            <a
              href={`mailto:${APP_CONFIG.business.email}`}
              className="text-sm font-semibold text-w4y-blue underline block pt-1"
            >
              {APP_CONFIG.business.email}
            </a>
          </div>

          <div className="p-6 rounded-card border border-w4y-border bg-white dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-3">
            <Phone className="w-6 h-6 text-w4y-blue" />
            <h3 className="font-bold text-w4y-dark dark:text-white">Phone Support</h3>
            <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
              Available Monday to Saturday, 10:00 AM – 6:30 PM IST:
            </p>
            <p className="text-sm font-semibold text-w4y-dark dark:text-white pt-1">
              {APP_CONFIG.business.phone}
            </p>
          </div>
        </div>

        <div className="p-6 rounded-card border border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface space-y-4">
          <h3 className="text-base font-bold text-w4y-dark dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-w4y-blue" />
            Registered Business Office
          </h3>
          <div className="text-xs text-w4y-secondary dark:text-w4y-dark-muted space-y-1">
            <p className="font-semibold text-w4y-dark dark:text-white">{APP_CONFIG.business.legalName}</p>
            <p>{APP_CONFIG.business.addressLine1}</p>
            <p>{APP_CONFIG.business.addressLine2}</p>
            <p>{APP_CONFIG.business.cityStateZip}</p>
            <p className="pt-2">Website: {APP_CONFIG.business.website}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
