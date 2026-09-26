"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ComicIllustrationProps {
  className?: string;
}

export function ComicStickyNotesIllustration({ className }: ComicIllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-auto max-h-36 object-contain select-none", className)}
      aria-hidden="true"
    >
      {/* Background soft shadow */}
      <rect x="24" y="24" width="80" height="80" rx="4" fill="#EDF2FA" className="dark:fill-[#1F222A]" />
      
      {/* Yellow Sticky Note tilted */}
      <g transform="rotate(-6 60 60)">
        <rect x="20" y="16" width="76" height="76" rx="3" fill="#FEF7E0" stroke="#121317" strokeWidth="1.8" />
        {/* Tape piece */}
        <rect x="42" y="10" width="32" height="12" fill="rgba(255,255,255,0.7)" stroke="#121317" strokeWidth="1.5" strokeDasharray="3 2" />
        {/* Scribbled notes */}
        <line x1="30" y1="36" x2="80" y2="36" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
        <line x1="30" y1="46" x2="72" y2="46" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
        <line x1="30" y1="56" x2="84" y2="56" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
        <line x1="30" y1="66" x2="60" y2="66" stroke="#EA4335" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      {/* WhatsApp / Chat Bubble overlapping */}
      <g transform="translate(110, 20)">
        <path
          d="M10 20C10 8.954 18.954 0 30 0H80C91.046 0 100 8.954 100 20V50C100 61.046 91.046 70 80 70H35L15 85V70C12 70 10 68 10 65V20Z"
          fill="#E6F4EA"
          stroke="#121317"
          strokeWidth="1.8"
        />
        {/* Chat text lines */}
        <line x1="26" y1="22" x2="84" y2="22" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
        <line x1="26" y1="34" x2="70" y2="34" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
        <line x1="26" y1="46" x2="55" y2="46" stroke="#4285F4" strokeWidth="2" strokeLinecap="round" />
        {/* Unread exclamation badge */}
        <circle cx="88" cy="14" r="8" fill="#EA4335" stroke="#121317" strokeWidth="1.5" />
        <text x="88" y="18" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">!</text>
      </g>

      {/* Comic stress / scatter marks */}
      <path d="M12 110L22 120" stroke="#121317" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M228 95L216 102" stroke="#121317" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M150 115L160 128" stroke="#121317" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Magnifying search glass looking for lost scope */}
      <g transform="translate(130, 85) rotate(-15)">
        <circle cx="20" cy="20" r="16" fill="#FFFFFF" stroke="#121317" strokeWidth="2" />
        <line x1="32" y1="32" x2="48" y2="48" stroke="#121317" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M12 16Q16 12 24 14" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function ComicInvoiceMathIllustration({ className }: ComicIllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-auto max-h-36 object-contain select-none", className)}
      aria-hidden="true"
    >
      {/* Spreadsheet / Paper Sheet */}
      <g transform="translate(25, 12)">
        <rect x="0" y="0" width="120" height="135" rx="3" fill="#FFFFFF" stroke="#121317" strokeWidth="1.8" />
        {/* Grid lines */}
        <line x1="0" y1="28" x2="120" y2="28" stroke="#121317" strokeWidth="1.5" />
        <line x1="45" y1="0" x2="45" y2="135" stroke="#121317" strokeWidth="1.2" strokeDasharray="3 3" />
        <line x1="85" y1="0" x2="85" y2="135" stroke="#121317" strokeWidth="1.2" strokeDasharray="3 3" />

        {/* Row data */}
        <line x1="8" y1="42" x2="38" y2="42" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
        <line x1="52" y1="42" x2="78" y2="42" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
        <line x1="92" y1="42" x2="112" y2="42" stroke="#121317" strokeWidth="2" strokeLinecap="round" />

        <line x1="8" y1="62" x2="38" y2="62" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
        <line x1="52" y1="62" x2="78" y2="62" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
        <line x1="92" y1="62" x2="112" y2="62" stroke="#121317" strokeWidth="2" strokeLinecap="round" />

        {/* Crossed out error row with red pen */}
        <line x1="8" y1="82" x2="38" y2="82" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
        <line x1="52" y1="82" x2="78" y2="82" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
        <line x1="92" y1="82" x2="112" y2="82" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />
        <path d="M4 80L116 84" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" />

        {/* Question mark on total */}
        <rect x="55" y="105" width="55" height="20" rx="2" fill="#FCE8E6" stroke="#EA4335" strokeWidth="1.5" />
        <text x="82" y="119" fill="#EA4335" fontSize="12" fontWeight="bold" textAnchor="middle">???</text>
      </g>

      {/* Pocket Calculator Overlapping */}
      <g transform="translate(130, 35) rotate(8)">
        <rect x="0" y="0" width="80" height="105" rx="6" fill="#EDF2FA" stroke="#121317" strokeWidth="1.8" />
        {/* LCD Screen */}
        <rect x="8" y="10" width="64" height="22" rx="2" fill="#FEF7E0" stroke="#121317" strokeWidth="1.2" />
        <text x="64" y="26" fill="#121317" fontSize="13" fontFamily="monospace" fontWeight="bold" textAnchor="end">#ERR!</text>
        {/* Buttons Grid */}
        <circle cx="20" cy="46" r="5" fill="#FFFFFF" stroke="#121317" strokeWidth="1.2" />
        <circle cx="40" cy="46" r="5" fill="#FFFFFF" stroke="#121317" strokeWidth="1.2" />
        <circle cx="60" cy="46" r="5" fill="#4285F4" stroke="#121317" strokeWidth="1.2" />

        <circle cx="20" cy="62" r="5" fill="#FFFFFF" stroke="#121317" strokeWidth="1.2" />
        <circle cx="40" cy="62" r="5" fill="#FFFFFF" stroke="#121317" strokeWidth="1.2" />
        <circle cx="60" cy="62" r="5" fill="#4285F4" stroke="#121317" strokeWidth="1.2" />

        <circle cx="20" cy="78" r="5" fill="#FFFFFF" stroke="#121317" strokeWidth="1.2" />
        <circle cx="40" cy="78" r="5" fill="#FFFFFF" stroke="#121317" strokeWidth="1.2" />
        <circle cx="60" cy="86" r="6" fill="#EA4335" stroke="#121317" strokeWidth="1.4" />
      </g>
    </svg>
  );
}

export function ComicUntrackedPaymentIllustration({ className }: ComicIllustrationProps) {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-full h-auto max-h-36 object-contain select-none", className)}
      aria-hidden="true"
    >
      {/* Bank Cheque / Slip */}
      <g transform="translate(18, 25) rotate(-4)">
        <rect x="0" y="0" width="145" height="85" rx="4" fill="#FFFFFF" stroke="#121317" strokeWidth="1.8" />
        {/* Cheque headers */}
        <line x1="12" y1="18" x2="60" y2="18" stroke="#121317" strokeWidth="1.5" />
        <rect x="95" y="10" width="40" height="14" rx="2" fill="#F8F8FB" stroke="#121317" strokeWidth="1" />
        {/* Pay line */}
        <line x1="12" y1="38" x2="135" y2="38" stroke="#121317" strokeWidth="1.2" strokeDasharray="3 2" />
        {/* Amount Box */}
        <rect x="90" y="48" width="45" height="22" rx="2" fill="#F8F8FB" stroke="#121317" strokeWidth="1.5" />
        <text x="112" y="64" fill="#121317" fontSize="11" fontFamily="monospace" fontWeight="bold" textAnchor="middle">₹ ???</text>
        {/* Signature squiggle */}
        <path d="M20 72Q28 62 36 74T50 68" stroke="#4285F4" strokeWidth="1.5" fill="none" />
      </g>

      {/* Floating Hourglass (Waiting for payment) */}
      <g transform="translate(155, 30)">
        <path
          d="M10 0H50L35 30L50 60H10L25 30L10 0Z"
          fill="#FEF7E0"
          stroke="#121317"
          strokeWidth="2"
        />
        {/* Sand falling */}
        <path d="M28 32V48" stroke="#F4B400" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="2 3" />
        <path d="M18 56Q30 48 42 56" fill="#F4B400" />
      </g>

      {/* Confusion Marks */}
      <path d="M140 115Q145 105 152 110T160 120" stroke="#121317" strokeWidth="2" fill="none" />
      <circle cx="162" cy="128" r="1.5" fill="#121317" />

      {/* Question Badge */}
      <g transform="translate(75, 95)">
        <rect x="0" y="0" width="85" height="28" rx="14" fill="#FCE8E6" stroke="#EA4335" strokeWidth="1.5" />
        <text x="42" y="18" fill="#A50E0E" fontSize="10" fontWeight="bold" textAnchor="middle">Did they pay?</text>
      </g>
    </svg>
  );
}
