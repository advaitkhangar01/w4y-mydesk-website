"use client";

import React, { useState } from "react";
import { APP_CONFIG } from "@/lib/config";
import {
  ComicContactHeroVignette,
  ComicMailBadge,
  ComicPhoneBadge,
  ComicLocationBadge,
  ComicChatBadge,
} from "@/components/comic/comic-contact-illustration";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  Send,
  Sparkles,
} from "lucide-react";

export function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Quick form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Pre-purchase questions (₹5,000 one-time)");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(APP_CONFIG.business.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(APP_CONFIG.business.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Compose mailto as fallback and direct action
    const subject = encodeURIComponent(`[MyDesk Inquiry] ${category} - ${name}`);
    const body = encodeURIComponent(
      `Hello Advait & W4Y Team,\n\nName: ${name}\nEmail: ${email}\nTopic: ${category}\n\nMessage:\n${message}\n\n---\nSent via W4Y MyDesk Website`
    );
    window.location.href = `mailto:${APP_CONFIG.business.email}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-w4y-border bg-w4y-soft py-20 dark:border-w4y-dark-border dark:bg-w4y-dark-surface print:hidden bg-drafting-grid"
    >
      {/* Ambient Depth Orbs */}
      <div className="pointer-events-none absolute -top-24 left-1/4 w-[600px] h-[600px] depth-orb-blue blur-3xl opacity-50" />
      <div className="pointer-events-none absolute bottom-0 right-10 w-[500px] h-[500px] depth-orb-lavender blur-3xl opacity-40" />

      <div className="relative mx-auto max-w-site px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header with Comic Hero Vignette */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-w4y-border bg-white/95 dark:border-w4y-dark-border dark:bg-w4y-dark-surface-elevated text-xs font-semibold text-w4y-dark dark:text-white shadow-xs">
            <span className="w-2 h-2 rounded-full bg-w4y-success animate-pulse" />
            <span>Direct Line · No Bots · Human Support</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-w4y-dark dark:text-white">
            Have questions? Talk directly to us.
          </h2>

          <p className="text-base sm:text-lg text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
            Whether you want clarification on our one-device license, need payment help, or have product feedback, our leadership desk is always accessible.
          </p>

          {/* Comic Hero Desk Vignette */}
          <div className="pt-2">
            <ComicContactHeroVignette className="w-full max-w-sm mx-auto" />
          </div>
        </div>

        {/* 2-Column Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Communication Channels (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            {/* Card 1: Direct Email */}
            <div className="comic-panel rounded-card bg-white p-6 dark:bg-w4y-dark-surface-elevated space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <ComicMailBadge className="w-11 h-11 shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-w4y-blue">
                      Primary Channel
                    </span>
                    <h3 className="text-lg font-bold text-w4y-dark dark:text-white">
                      Email Leadership
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-w4y-pastel-blue text-w4y-blue shrink-0">
                  2–4 hr reply
                </span>
              </div>

              <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                For sales questions, proforma invoice requests, enterprise orders, and license assistance.
              </p>

              <div className="p-3 rounded-lg bg-w4y-soft dark:bg-w4y-dark-surface border border-w4y-border/80 dark:border-w4y-dark-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="font-mono text-sm font-bold text-w4y-dark dark:text-white">
                  {APP_CONFIG.business.email}
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border border-w4y-border hover:bg-white dark:border-w4y-dark-border dark:hover:bg-w4y-dark-surface-elevated transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-w4y-success" />
                        <span className="text-w4y-success">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`mailto:${APP_CONFIG.business.email}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-w4y-blue text-white hover:bg-w4y-blue-hover transition-colors shadow-xs"
                  >
                    <span>Compose</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Direct Phone & WhatsApp */}
            <div className="comic-panel rounded-card bg-white p-6 dark:bg-w4y-dark-surface-elevated space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <ComicPhoneBadge className="w-11 h-11 shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-w4y-success">
                      Direct Hotline
                    </span>
                    <h3 className="text-lg font-bold text-w4y-dark dark:text-white">
                      Phone & WhatsApp
                    </h3>
                  </div>
                </div>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-w4y-pastel-green text-w4y-success shrink-0">
                  Mon – Sat IST
                </span>
              </div>

              <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                Available between 10:00 AM – 6:30 PM Indian Standard Time. Direct conversation with Advait Khangar.
              </p>

              <div className="p-3 rounded-lg bg-w4y-soft dark:bg-w4y-dark-surface border border-w4y-border/80 dark:border-w4y-dark-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="font-mono text-sm font-bold text-w4y-dark dark:text-white">
                  {APP_CONFIG.business.phone}
                </span>
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={handleCopyPhone}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold border border-w4y-border hover:bg-white dark:border-w4y-dark-border dark:hover:bg-w4y-dark-surface-elevated transition-colors"
                  >
                    {copiedPhone ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-w4y-success" />
                        <span className="text-w4y-success">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                  <a
                    href={`https://wa.me/917798647265?text=${encodeURIComponent("Hello Advait, I have an inquiry regarding W4Y MyDesk.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-semibold bg-[#25D366] text-white hover:bg-[#1EBE5D] transition-colors shadow-xs"
                  >
                    <span>WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3: Registered Office Address */}
            <div className="comic-panel rounded-card bg-white p-6 dark:bg-w4y-dark-surface-elevated space-y-3">
              <div className="flex items-center gap-3.5">
                <ComicLocationBadge className="w-11 h-11 shrink-0" />
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-w4y-secondary dark:text-w4y-dark-muted">
                    Headquarters
                  </span>
                  <h3 className="text-lg font-bold text-w4y-dark dark:text-white">
                    Registered Business Office
                  </h3>
                </div>
              </div>

              <div className="text-xs text-w4y-secondary dark:text-w4y-dark-muted space-y-1 pl-1 border-l-2 border-w4y-border dark:border-w4y-dark-border ml-2 mt-2">
                <p className="font-semibold text-w4y-dark dark:text-white">{APP_CONFIG.business.legalName}</p>
                <p>{APP_CONFIG.business.addressLine1}</p>
                <p>{APP_CONFIG.business.addressLine2}</p>
                <p>{APP_CONFIG.business.cityStateZip}</p>
                <p className="text-[11px] text-w4y-blue pt-1">Primary Domain: {APP_CONFIG.business.website}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Comic Quick Inquiry Form (5 cols) */}
          <div className="lg:col-span-5">
            <div className="comic-panel rounded-card bg-white p-6 sm:p-8 dark:bg-w4y-dark-surface-elevated space-y-5">
              <div className="flex items-center gap-3">
                <ComicChatBadge className="w-10 h-10 shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-w4y-dark dark:text-white">
                    Quick Message Box
                  </h3>
                  <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted">
                    Leave your note below and we'll reply directly.
                  </p>
                </div>
              </div>

              {isSubmitted ? (
                <div className="p-6 rounded-lg bg-w4y-pastel-green/40 border border-w4y-success/30 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-w4y-success text-white flex items-center justify-center mx-auto shadow-xs">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-base font-bold text-w4y-dark dark:text-white">
                    Inquiry Prepared!
                  </h4>
                  <p className="text-xs text-w4y-secondary dark:text-w4y-dark-muted leading-relaxed">
                    Your email client should have opened with your draft. If it didn't, please click below to send directly:
                  </p>
                  <a
                    href={`mailto:${APP_CONFIG.business.email}?subject=${encodeURIComponent(`[MyDesk Inquiry] ${category} - ${name}`)}&body=${encodeURIComponent(message)}`}
                    className="inline-block text-xs font-bold text-w4y-blue underline"
                  >
                    Click to Open Email Draft
                  </a>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSubmitted(false);
                        setMessage("");
                      }}
                      className="text-xs text-w4y-secondary hover:text-w4y-dark underline"
                    >
                      Send another message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-w4y-dark dark:text-white mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2 text-sm rounded-btn border-2 border-w4y-border bg-white dark:bg-w4y-dark-surface dark:border-w4y-dark-border text-w4y-dark dark:text-white placeholder:text-w4y-secondary/60 focus:outline-none focus:border-w4y-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-w4y-dark dark:text-white mb-1.5">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rahul@studio.com"
                      className="w-full px-3.5 py-2 text-sm rounded-btn border-2 border-w4y-border bg-white dark:bg-w4y-dark-surface dark:border-w4y-dark-border text-w4y-dark dark:text-white placeholder:text-w4y-secondary/60 focus:outline-none focus:border-w4y-blue"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-w4y-dark dark:text-white mb-1.5">
                      Topic
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3.5 py-2 text-sm rounded-btn border-2 border-w4y-border bg-white dark:bg-w4y-dark-surface dark:border-w4y-dark-border text-w4y-dark dark:text-white focus:outline-none focus:border-w4y-blue"
                    >
                      <option>Pre-purchase questions (₹5,000 one-time)</option>
                      <option>License & workstation binding</option>
                      <option>Multi-seat & team arrangements</option>
                      <option>Payment & invoice inquiries</option>
                      <option>General feedback or questions</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-w4y-dark dark:text-white mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you'd like to know or discuss..."
                      className="w-full px-3.5 py-2 text-sm rounded-btn border-2 border-w4y-border bg-white dark:bg-w4y-dark-surface dark:border-w4y-dark-border text-w4y-dark dark:text-white placeholder:text-w4y-secondary/60 focus:outline-none focus:border-w4y-blue resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2 text-sm font-bold shadow-md">
                    <span>Send Message to Team</span>
                    <Send className="w-4 h-4" />
                  </Button>

                  <div className="pt-2 text-center">
                    <p className="text-[11px] text-w4y-secondary dark:text-w4y-dark-muted">
                      Direct response from leadership. No spam, ever.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
