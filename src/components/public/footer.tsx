import React from "react";
import Link from "next/link";
import Image from "next/image";
import { APP_CONFIG } from "@/lib/config";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-w4y-border bg-w4y-soft dark:border-w4y-dark-border dark:bg-w4y-dark-surface print:hidden">
      <div className="mx-auto max-w-site px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand & Proposition */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="W4Y"
                width={96}
                height={30}
                className="h-7 w-auto object-contain dark:brightness-0 dark:invert"
              />
              <span
                className="h-4 w-[1px] bg-w4y-border dark:bg-w4y-dark-border"
                aria-hidden="true"
              />
              <h3 className="text-lg font-bold text-w4y-dark dark:text-white">
                MyDesk
              </h3>
            </div>

            <p className="text-sm font-medium text-w4y-dark dark:text-w4y-dark-text max-w-md">
              {APP_CONFIG.brand.tagline}
            </p>
            <p className="text-sm text-w4y-secondary dark:text-w4y-dark-muted max-w-md leading-relaxed">
              {APP_CONFIG.brand.proposition}
            </p>

            <div className="pt-2 text-xs text-w4y-secondary dark:text-w4y-dark-muted space-y-1">
              <p className="font-semibold text-w4y-dark dark:text-white">
                Commercial Model:
              </p>
              <p>₹5,000 one-time purchase. No monthly recurring fees. One license = one computer.</p>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-w4y-dark dark:text-white">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-w4y-secondary dark:text-w4y-dark-muted">
              <li>
                <Link href="/how-it-works" className="hover:text-w4y-blue transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-w4y-blue transition-colors">
                  Features & Workflow
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-w4y-blue transition-colors">
                  Pricing & License
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-w4y-blue transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/buy" className="hover:text-w4y-blue font-semibold text-w4y-blue transition-colors">
                  Purchase MyDesk
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Business Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-w4y-dark dark:text-white">
              Business & Legal
            </h4>
            <div className="space-y-2 text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
              <p className="font-semibold text-w4y-dark dark:text-white">
                {APP_CONFIG.business.legalName}
              </p>
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5 text-w4y-blue" />
                <span>
                  {APP_CONFIG.business.addressLine1} {APP_CONFIG.business.addressLine2}<br />
                  {APP_CONFIG.business.cityStateZip}
                </span>
              </p>
              <p className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 shrink-0 text-w4y-blue" />
                <a href={`mailto:${APP_CONFIG.business.email}`} className="hover:underline">
                  {APP_CONFIG.business.email}
                </a>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 shrink-0 text-w4y-blue" />
                <span>{APP_CONFIG.business.phone}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 shrink-0 text-w4y-blue" />
                <span>{APP_CONFIG.business.website}</span>
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-w4y-secondary dark:text-w4y-dark-muted">
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/terms" className="hover:underline">Terms</Link>
              <Link href="/refund" className="hover:underline">Refund Policy</Link>
              <Link href="/support" className="hover:underline">Support</Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-w4y-border pt-8 text-center text-xs text-w4y-secondary dark:border-w4y-dark-border dark:text-w4y-dark-muted">
          <p>
            © {new Date().getFullYear()} {APP_CONFIG.business.legalName}. All rights reserved. MyDesk is a commercial software product of W4Y.
          </p>
        </div>
      </div>
    </footer>
  );
}
