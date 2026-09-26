"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ComicBadgeProps {
  className?: string;
}

export function ComicClientBadge({ className }: ComicBadgeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-6 h-6 select-none", className)} aria-hidden="true">
      <rect x="6" y="8" width="36" height="32" rx="4" fill="#E8F0FE" stroke="#121317" strokeWidth="2" />
      <circle cx="24" cy="20" r="6" fill="#4285F4" stroke="#121317" strokeWidth="1.8" />
      <path d="M14 34C14 28 18 27 24 27C30 27 34 28 34 34" fill="#FFFFFF" stroke="#121317" strokeWidth="1.8" />
    </svg>
  );
}

export function ComicProjectBadge({ className }: ComicBadgeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-6 h-6 select-none", className)} aria-hidden="true">
      <rect x="6" y="10" width="36" height="28" rx="4" fill="#FEF7E0" stroke="#121317" strokeWidth="2" />
      <path d="M6 18H42" stroke="#121317" strokeWidth="1.8" />
      <rect x="18" y="6" width="12" height="6" rx="2" fill="#F4B400" stroke="#121317" strokeWidth="1.8" />
      <line x1="12" y1="26" x2="28" y2="26" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="32" x2="36" y2="32" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ComicMeetingBadge({ className }: ComicBadgeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-6 h-6 select-none", className)} aria-hidden="true">
      <rect x="8" y="10" width="32" height="30" rx="4" fill="#FFFFFF" stroke="#121317" strokeWidth="2" />
      <path d="M8 18H40" stroke="#121317" strokeWidth="1.8" />
      <rect x="14" y="6" width="4" height="6" rx="1" fill="#EA4335" stroke="#121317" strokeWidth="1.6" />
      <rect x="30" y="6" width="4" height="6" rx="1" fill="#EA4335" stroke="#121317" strokeWidth="1.6" />
      <circle cx="16" cy="26" r="2" fill="#4285F4" />
      <line x1="22" y1="26" x2="34" y2="26" stroke="#121317" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="33" r="2" fill="#34A853" />
      <line x1="22" y1="33" x2="30" y2="33" stroke="#121317" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ComicQuoteBadge({ className }: ComicBadgeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-6 h-6 select-none", className)} aria-hidden="true">
      <path d="M10 8H30L38 16V40H10V8Z" fill="#FFFFFF" stroke="#121317" strokeWidth="2" />
      <path d="M30 8V16H38" stroke="#121317" strokeWidth="1.8" fill="#EDF2FA" />
      <line x1="16" y1="22" x2="28" y2="22" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="28" x2="32" y2="28" stroke="#121317" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="34" x2="26" y2="34" stroke="#121317" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ComicInvoiceBadge({ className }: ComicBadgeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-6 h-6 select-none", className)} aria-hidden="true">
      <path d="M10 8H38V40L34 38L30 40L26 38L22 40L18 38L14 40L10 38V8Z" fill="#E6F4EA" stroke="#121317" strokeWidth="2" />
      <line x1="16" y1="16" x2="32" y2="16" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="22" x2="28" y2="22" stroke="#121317" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="16" y1="28" x2="24" y2="28" stroke="#121317" strokeWidth="1.8" strokeLinecap="round" />
      <rect x="24" y="27" width="10" height="6" rx="1" fill="#0F9D58" stroke="#121317" strokeWidth="1" />
    </svg>
  );
}

export function ComicPaymentBadge({ className }: ComicBadgeProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-6 h-6 select-none", className)} aria-hidden="true">
      <rect x="6" y="12" width="36" height="24" rx="4" fill="#FFFFFF" stroke="#121317" strokeWidth="2" />
      <rect x="6" y="18" width="36" height="6" fill="#121317" />
      <circle cx="16" cy="30" r="3" fill="#34A853" stroke="#121317" strokeWidth="1.5" />
      <rect x="24" y="28" width="12" height="4" rx="1" fill="#EDF2FA" stroke="#121317" strokeWidth="1" />
    </svg>
  );
}
