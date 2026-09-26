"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ComicPersonaProps {
  className?: string;
}

export function ComicSoloFounderIcon({ className }: ComicPersonaProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-12 h-12 select-none", className)} aria-hidden="true">
      {/* Background circle */}
      <circle cx="40" cy="40" r="36" fill="#E8F0FE" stroke="#121317" strokeWidth="1.8" />
      {/* Torso */}
      <path d="M22 68C22 56 30 52 40 52C50 52 58 56 58 68" fill="#4285F4" stroke="#121317" strokeWidth="1.8" />
      {/* Head */}
      <circle cx="40" cy="34" r="14" fill="#FFFFFF" stroke="#121317" strokeWidth="1.8" />
      {/* Glasses */}
      <rect x="30" y="30" width="8" height="6" rx="2" stroke="#121317" strokeWidth="1.6" />
      <rect x="42" y="30" width="8" height="6" rx="2" stroke="#121317" strokeWidth="1.6" />
      <line x1="38" y1="33" x2="42" y2="33" stroke="#121317" strokeWidth="1.6" />
      {/* Hair */}
      <path d="M26 30C26 22 32 18 40 18C48 18 54 22 54 30" fill="#121317" />
      {/* Smile */}
      <path d="M36 41Q40 44 44 41" stroke="#121317" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ComicFreelancerIcon({ className }: ComicPersonaProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-12 h-12 select-none", className)} aria-hidden="true">
      <circle cx="40" cy="40" r="36" fill="#FEF7E0" stroke="#121317" strokeWidth="1.8" />
      {/* Torso */}
      <path d="M22 68C22 56 30 52 40 52C50 52 58 56 58 68" fill="#FBBC05" stroke="#121317" strokeWidth="1.8" />
      {/* Head */}
      <circle cx="40" cy="34" r="14" fill="#FFFFFF" stroke="#121317" strokeWidth="1.8" />
      {/* Hair with bun */}
      <path d="M26 30C26 22 34 18 40 18C48 18 54 24 54 34" fill="#121317" />
      <circle cx="40" cy="14" r="6" fill="#121317" />
      {/* Eyes & smile */}
      <circle cx="34" cy="32" r="1.5" fill="#121317" />
      <circle cx="46" cy="32" r="1.5" fill="#121317" />
      <path d="M37 40Q40 43 43 40" stroke="#121317" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function ComicDesignerIcon({ className }: ComicPersonaProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-12 h-12 select-none", className)} aria-hidden="true">
      <circle cx="40" cy="40" r="36" fill="#E6F4EA" stroke="#121317" strokeWidth="1.8" />
      {/* Torso with pencil behind ear */}
      <path d="M22 68C22 56 30 52 40 52C50 52 58 56 58 68" fill="#34A853" stroke="#121317" strokeWidth="1.8" />
      <circle cx="40" cy="34" r="14" fill="#FFFFFF" stroke="#121317" strokeWidth="1.8" />
      {/* Beanie cap */}
      <path d="M26 28C26 20 32 16 40 16C48 16 54 20 54 28" fill="#555861" stroke="#121317" strokeWidth="1.5" />
      <rect x="25" y="27" width="30" height="4" rx="2" fill="#333" />
      {/* Eyes */}
      <circle cx="35" cy="34" r="1.5" fill="#121317" />
      <circle cx="45" cy="34" r="1.5" fill="#121317" />
      <path d="M37 41Q40 44 43 41" stroke="#121317" strokeWidth="1.5" strokeLinecap="round" />
      {/* Yellow Drafting Triangle on shoulder */}
      <polygon points="56,48 68,48 68,36" fill="#F4B400" stroke="#121317" strokeWidth="1.4" />
    </svg>
  );
}

export function ComicAgencyLeadIcon({ className }: ComicPersonaProps) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-12 h-12 select-none", className)} aria-hidden="true">
      <circle cx="40" cy="40" r="36" fill="#F3E8FD" stroke="#121317" strokeWidth="1.8" />
      {/* Torso Blazer */}
      <path d="M22 68C22 56 30 52 40 52C50 52 58 56 58 68" fill="#6200EE" stroke="#121317" strokeWidth="1.8" />
      <polygon points="40,52 35,62 45,62" fill="#FFFFFF" />
      <circle cx="40" cy="34" r="14" fill="#FFFFFF" stroke="#121317" strokeWidth="1.8" />
      {/* Short neat hair */}
      <path d="M27 30C27 20 34 18 40 18C46 18 53 20 53 30" fill="#121317" />
      <circle cx="34" cy="33" r="1.5" fill="#121317" />
      <circle cx="46" cy="33" r="1.5" fill="#121317" />
      <path d="M36 41Q40 44 44 41" stroke="#121317" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
