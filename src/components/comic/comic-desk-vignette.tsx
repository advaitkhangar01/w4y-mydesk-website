"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ComicDeskVignetteProps {
  className?: string;
}

export function ComicDeskVignette({ className }: ComicDeskVignetteProps) {
  return (
    <div className={cn("relative w-full max-w-lg mx-auto select-none", className)}>
      <svg
        viewBox="0 0 460 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-md"
        aria-hidden="true"
      >
        {/* Soft Ambient Sunlight Gradient Triangle */}
        <polygon
          points="80,0 380,0 460,240 0,240"
          fill="url(#sunlightGradient)"
          opacity="0.25"
        />

        {/* Desk Surface */}
        <line x1="20" y1="210" x2="440" y2="210" stroke="#121317" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="30" y="210" width="400" height="12" fill="#F8F8FB" stroke="#121317" strokeWidth="1.8" />

        {/* Desk Lamp on Left */}
        <g transform="translate(45, 95)">
          <ellipse cx="25" cy="115" rx="18" ry="4" fill="#EDF2FA" stroke="#121317" strokeWidth="1.5" />
          <path d="M25 115V60L15 40" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
          <path d="M5 45L30 30L25 20L0 35Z" fill="#FEF7E0" stroke="#121317" strokeWidth="1.8" />
          {/* Light beam */}
          <polygon points="12,42 45,120 -5,120" fill="#FEF7E0" opacity="0.3" />
        </g>

        {/* Main Laptop / Workstation Display */}
        <g transform="translate(130, 45)">
          {/* Screen Frame */}
          <rect x="0" y="0" width="200" height="135" rx="6" fill="#121317" stroke="#121317" strokeWidth="2" />
          {/* Display Glass */}
          <rect x="6" y="6" width="188" height="123" rx="3" fill="#FFFFFF" />
          
          {/* MyDesk Clean UI Inside Screen */}
          {/* Top window bar */}
          <rect x="6" y="6" width="188" height="16" fill="#EDF2FA" />
          <circle cx="16" cy="14" r="2.5" fill="#EA4335" />
          <circle cx="24" cy="14" r="2.5" fill="#FBBC05" />
          <circle cx="32" cy="14" r="2.5" fill="#34A853" />
          <text x="100" y="17" fill="#555861" fontSize="8" fontWeight="600" textAnchor="middle">W4Y MyDesk — All in one place</text>

          {/* Metric cards inside UI */}
          <rect x="14" y="30" width="40" height="24" rx="2" fill="#E8F0FE" stroke="#4285F4" strokeWidth="0.8" />
          <text x="18" y="42" fill="#4285F4" fontSize="7" fontWeight="bold">Clients: 14</text>
          <text x="18" y="49" fill="#121317" fontSize="6">✓ Synced</text>

          <rect x="60" y="30" width="40" height="24" rx="2" fill="#E6F4EA" stroke="#0F9D58" strokeWidth="0.8" />
          <text x="64" y="42" fill="#0F9D58" fontSize="7" fontWeight="bold">Revenue</text>
          <text x="64" y="49" fill="#121317" fontSize="6">₹3.8L Paid</text>

          <rect x="106" y="30" width="80" height="24" rx="2" fill="#F8F8FB" stroke="#E2E5EA" strokeWidth="0.8" />
          <text x="110" y="42" fill="#555861" fontSize="7" fontWeight="bold">Connected Flow</text>
          <text x="110" y="49" fill="#4285F4" fontSize="6">Quote → Invoice → Pay</text>

          {/* Table representation inside screen */}
          <rect x="14" y="62" width="172" height="58" rx="2" fill="#F8F8FB" stroke="#E2E5EA" strokeWidth="0.8" />
          <line x1="14" y1="74" x2="186" y2="74" stroke="#E2E5EA" strokeWidth="0.8" />
          <line x1="14" y1="88" x2="186" y2="88" stroke="#E2E5EA" strokeWidth="0.8" />
          <line x1="14" y1="102" x2="186" y2="102" stroke="#E2E5EA" strokeWidth="0.8" />
          {/* Row entries */}
          <circle cx="22" cy="81" r="3" fill="#4285F4" />
          <line x1="30" y1="81" x2="90" y2="81" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
          <rect x="145" y="77" width="32" height="8" rx="4" fill="#E6F4EA" />
          <text x="161" y="83" fill="#0D652D" fontSize="6" fontWeight="bold" textAnchor="middle">PAID</text>

          {/* Laptop Base */}
          <path d="M-15 135L-3 150H203L215 135Z" fill="#EDF2FA" stroke="#121317" strokeWidth="1.8" />
          <line x1="75" y1="148" x2="125" y2="148" stroke="#121317" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* Steaming Coffee Mug on Right */}
        <g transform="translate(365, 160)">
          <rect x="0" y="10" width="28" height="38" rx="3" fill="#FFFFFF" stroke="#121317" strokeWidth="1.8" />
          {/* Mug handle */}
          <path d="M28 18C36 18 36 34 28 34" stroke="#121317" strokeWidth="1.8" fill="none" />
          {/* Steam curls */}
          <path d="M6 4Q9 -4 14 0T20 -4" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
          <path d="M12 2Q15 -6 20 -2" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.4" />
        </g>

        {/* Succulent Plant on Left */}
        <g transform="translate(100, 165)">
          <polygon points="5,45 25,45 22,25 8,25" fill="#FEF7E0" stroke="#121317" strokeWidth="1.6" />
          {/* Plant leaves */}
          <ellipse cx="15" cy="20" rx="8" ry="12" fill="#34A853" stroke="#121317" strokeWidth="1.5" />
          <ellipse cx="10" cy="22" rx="6" ry="10" transform="rotate(-25 10 22)" fill="#81C995" stroke="#121317" strokeWidth="1.4" />
          <ellipse cx="20" cy="22" rx="6" ry="10" transform="rotate(25 20 22)" fill="#81C995" stroke="#121317" strokeWidth="1.4" />
        </g>

        {/* Sparkle of calmness */}
        <path d="M375 75L378 82L385 85L378 88L375 95L372 88L365 85L372 82Z" fill="#F4B400" stroke="#121317" strokeWidth="1.2" />

        <defs>
          <linearGradient id="sunlightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FEF7E0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
