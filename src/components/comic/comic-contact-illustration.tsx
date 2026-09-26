"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ComicIllustrationProps {
  className?: string;
}

/**
 * Editorial comic vignette featuring a classic desk telephone with sound ripples,
 * an airmail letter with wax seal, open laptop screen, and friendly coffee mug.
 */
export function ComicContactHeroVignette({ className }: ComicIllustrationProps) {
  return (
    <div className={cn("relative w-full max-w-md mx-auto select-none", className)}>
      <svg
        viewBox="0 0 420 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-md"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="contactGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4285F4" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#4285F4" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Halo behind desk */}
        <circle cx="210" cy="110" r="100" fill="url(#contactGlow)" />

        {/* Desk Surface Baseline */}
        <line x1="20" y1="185" x2="400" y2="185" stroke="#121317" strokeWidth="2.5" strokeLinecap="round" />
        <rect x="30" y="185" width="360" height="8" fill="#F8F8FB" stroke="#121317" strokeWidth="1.6" className="dark:fill-[#1F222A]" />

        {/* ------------------------------------------------------------- */}
        {/* 1. Open Laptop (Center-Left) */}
        {/* ------------------------------------------------------------- */}
        <g transform="translate(60, 80)">
          {/* Laptop Screen */}
          <rect x="0" y="0" width="130" height="85" rx="5" fill="#121317" stroke="#121317" strokeWidth="2" />
          <rect x="5" y="5" width="120" height="75" rx="3" fill="#FFFFFF" className="dark:fill-[#1A1D24]" />
          
          {/* Comic Chat Bubbles on Screen */}
          <rect x="15" y="16" width="60" height="18" rx="4" fill="#E8F0FE" stroke="#121317" strokeWidth="1.2" />
          <line x1="22" y1="23" x2="62" y2="23" stroke="#4285F4" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="22" y1="28" x2="50" y2="28" stroke="#121317" strokeWidth="1.4" strokeLinecap="round" />

          <rect x="55" y="42" width="60" height="18" rx="4" fill="#E6F4EA" stroke="#121317" strokeWidth="1.2" />
          <line x1="62" y1="49" x2="102" y2="49" stroke="#34A853" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="62" y1="54" x2="90" y2="54" stroke="#121317" strokeWidth="1.4" strokeLinecap="round" />

          {/* Laptop Base */}
          <path d="M-15 85H145L138 98H-8L-15 85Z" fill="#E4E7EB" stroke="#121317" strokeWidth="2" className="dark:fill-[#2A2E39]" />
          <line x1="50" y1="90" x2="80" y2="90" stroke="#121317" strokeWidth="1.5" strokeLinecap="round" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* 2. Classic Desk Telephone with Ring Waves (Right) */}
        {/* ------------------------------------------------------------- */}
        <g transform="translate(245, 95)">
          {/* Phone Base */}
          <path d="M10 50L25 25H75L90 50L85 70H15L10 50Z" fill="#FEF7E0" stroke="#121317" strokeWidth="2" />
          
          {/* Keypad Buttons */}
          <rect x="35" y="38" width="30" height="24" rx="2" fill="#FFFFFF" stroke="#121317" strokeWidth="1.2" />
          <circle cx="42" cy="44" r="2" fill="#4285F4" />
          <circle cx="50" cy="44" r="2" fill="#121317" />
          <circle cx="58" cy="44" r="2" fill="#121317" />
          <circle cx="42" cy="50" r="2" fill="#121317" />
          <circle cx="50" cy="50" r="2" fill="#34A853" />
          <circle cx="58" cy="50" r="2" fill="#121317" />
          <circle cx="50" cy="56" r="2" fill="#EA4335" />

          {/* Handset Receiver (tilted up as if ringing/answering) */}
          <g transform="rotate(-12 50 15)">
            <rect x="8" y="2" width="84" height="18" rx="8" fill="#4285F4" stroke="#121317" strokeWidth="2" />
            <circle cx="18" cy="11" r="8" fill="#3367D6" stroke="#121317" strokeWidth="1.6" />
            <circle cx="82" cy="11" r="8" fill="#3367D6" stroke="#121317" strokeWidth="1.6" />
            {/* Handset grip highlight */}
            <line x1="34" y1="11" x2="66" y2="11" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Curled Telephone Cord */}
          <path
            d="M20 70Q10 76 18 82T26 84Q34 82 28 72"
            fill="none"
            stroke="#121317"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Comic Ring / Vibration Soundwaves */}
          <path d="M-6 8Q-14 18 -6 28" fill="none" stroke="#EA4335" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M-14 2Q-24 18 -14 34" fill="none" stroke="#EA4335" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M106 2Q116 18 106 34" fill="none" stroke="#EA4335" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M114 -4Q126 18 114 40" fill="none" stroke="#EA4335" strokeWidth="1.8" strokeLinecap="round" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* 3. Airmail Envelope with Red/Blue Border & Stamp */}
        {/* ------------------------------------------------------------- */}
        <g transform="translate(160, 130) rotate(8)">
          <rect x="0" y="0" width="80" height="50" rx="3" fill="#FFFFFF" stroke="#121317" strokeWidth="1.8" />
          {/* Airmail stripes */}
          <path d="M0 0L12 10H4L0 6V0Z" fill="#EA4335" />
          <path d="M16 0L28 10H20L8 0H16Z" fill="#4285F4" />
          <path d="M32 0L44 10H36L24 0H32Z" fill="#EA4335" />
          <path d="M48 0L60 10H52L40 0H48Z" fill="#4285F4" />
          <path d="M64 0L76 10H68L56 0H64Z" fill="#EA4335" />
          <path d="M80 3L80 10H78L68 0H77L80 3Z" fill="#4285F4" />
          
          {/* Flap lines */}
          <path d="M0 0L40 28L80 0" stroke="#121317" strokeWidth="1.6" fill="none" />
          <path d="M0 50L30 24" stroke="#121317" strokeWidth="1.2" strokeDasharray="3 2" />
          <path d="M80 50L50 24" stroke="#121317" strokeWidth="1.2" strokeDasharray="3 2" />
          
          {/* Postage Stamp */}
          <rect x="58" y="6" width="16" height="18" fill="#FCE8E6" stroke="#EA4335" strokeWidth="1.2" />
          <circle cx="66" cy="15" r="4" fill="#EA4335" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* 4. Steaming Coffee Cup on Left */}
        {/* ------------------------------------------------------------- */}
        <g transform="translate(25, 140)">
          <rect x="6" y="16" width="24" height="26" rx="3" fill="#FFFFFF" stroke="#121317" strokeWidth="1.8" />
          <path d="M30 22H36C38 22 40 24 40 27V30C40 33 38 35 36 35H30" fill="none" stroke="#121317" strokeWidth="1.8" />
          <ellipse cx="18" cy="16" rx="12" ry="4" fill="#3A2010" stroke="#121317" strokeWidth="1.4" />
          {/* Steam Swirls */}
          <path d="M14 10Q12 4 16 0" fill="none" stroke="#4285F4" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M22 8Q24 2 20 -2" fill="none" stroke="#4285F4" strokeWidth="1.6" strokeLinecap="round" />
        </g>

        {/* ------------------------------------------------------------- */}
        {/* 5. Speech Bubble Top Right: "We're here!" */}
        {/* ------------------------------------------------------------- */}
        <g transform="translate(260, 20)">
          <path
            d="M10 0H125C132 0 138 6 138 14V42C138 50 132 56 125 56H40L22 70V56H10C3 56 -2 50 -2 42V14C-2 6 3 0 10 0Z"
            fill="#FFFFFF"
            stroke="#121317"
            strokeWidth="2"
            className="dark:fill-[#20242E]"
          />
          <text x="68" y="24" fill="#121317" className="dark:fill-white" fontSize="12" fontWeight="bold" textAnchor="middle">
            Direct Line
          </text>
          <text x="68" y="42" fill="#4285F4" fontSize="11" fontWeight="bold" textAnchor="middle">
            No bots. Just humans.
          </text>
          {/* Comic sparkles */}
          <path d="M146 16L150 10L154 16L160 20L154 24L150 30L146 24L140 20L146 16Z" fill="#FBBC05" stroke="#121317" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}

/**
 * Comic mail envelope badge for direct email card
 */
export function ComicMailBadge({ className }: ComicIllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-10 h-10 select-none", className)} aria-hidden="true">
      <rect x="6" y="10" width="36" height="28" rx="4" fill="#E8F0FE" stroke="#121317" strokeWidth="2" />
      <path d="M6 14L24 28L42 14" stroke="#121317" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="27" r="5" fill="#4285F4" stroke="#121317" strokeWidth="1.5" />
      <path d="M22 27L23.5 28.5L26.5 25.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Comic telephone receiver badge for phone & whatsapp card
 */
export function ComicPhoneBadge({ className }: ComicIllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-10 h-10 select-none", className)} aria-hidden="true">
      <rect x="6" y="8" width="36" height="32" rx="6" fill="#E6F4EA" stroke="#121317" strokeWidth="2" />
      {/* Handset */}
      <path
        d="M17 16C17 14.5 18.5 13 20 14L23 17C23.8 17.8 23.8 19 23 19.8L21.5 21.3C22.8 23.9 24.1 25.2 26.7 26.5L28.2 25C29 24.2 30.2 24.2 31 25L34 28C35 29.5 33.5 31 32 31C24 31 17 24 17 16Z"
        fill="#34A853"
        stroke="#121317"
        strokeWidth="1.8"
      />
      {/* Soundwaves */}
      <path d="M29 15Q33 19 33 24" fill="none" stroke="#EA4335" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M33 12Q39 18 39 25" fill="none" stroke="#EA4335" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Comic map pin badge for registered location
 */
export function ComicLocationBadge({ className }: ComicIllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-10 h-10 select-none", className)} aria-hidden="true">
      <rect x="6" y="8" width="36" height="32" rx="6" fill="#FEF7E0" stroke="#121317" strokeWidth="2" />
      {/* Drafting grid crosslines */}
      <line x1="6" y1="24" x2="42" y2="24" stroke="#121317" strokeWidth="1" strokeDasharray="3 3" />
      <line x1="24" y1="8" x2="24" y2="40" stroke="#121317" strokeWidth="1" strokeDasharray="3 3" />
      {/* Map Pin */}
      <path
        d="M24 14C20.5 14 18 16.5 18 20C18 24.5 24 31 24 31C24 31 30 24.5 30 20C30 16.5 27.5 14 24 14Z"
        fill="#EA4335"
        stroke="#121317"
        strokeWidth="1.8"
      />
      <circle cx="24" cy="20" r="3" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * Comic speech bubble badge for quick questions
 */
export function ComicChatBadge({ className }: ComicIllustrationProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn("w-10 h-10 select-none", className)} aria-hidden="true">
      <path
        d="M8 12C8 7.58 11.58 4 16 4H32C36.42 4 40 7.58 40 12V28C40 32.42 36.42 36 32 36H20L12 43V36H16C11.58 36 8 32.42 8 28V12Z"
        fill="#F3E8FD"
        stroke="#121317"
        strokeWidth="2"
      />
      <circle cx="18" cy="20" r="2.5" fill="#6200EE" />
      <circle cx="24" cy="20" r="2.5" fill="#6200EE" />
      <circle cx="30" cy="20" r="2.5" fill="#6200EE" />
    </svg>
  );
}
