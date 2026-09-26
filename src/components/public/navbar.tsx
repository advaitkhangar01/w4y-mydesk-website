"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/how-it-works", label: "How It Works" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-w4y-border/70 bg-white/90 backdrop-blur-md dark:border-w4y-dark-border dark:bg-w4y-dark-bg/90">
      <div className="mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand / Logo Lockup */}
        <Link href="/" className="flex items-center gap-3 group select-none py-1">
          <Image
            src="/logo.png"
            alt="W4Y"
            width={88}
            height={27}
            className="h-6 w-auto object-contain transition-opacity group-hover:opacity-85 dark:brightness-0 dark:invert"
            priority
          />
          <span
            className="h-4 w-[1px] bg-w4y-border dark:bg-w4y-dark-border"
            aria-hidden="true"
          />
          <span className="text-base font-bold tracking-tight text-w4y-dark dark:text-white group-hover:text-w4y-blue dark:group-hover:text-w4y-blue transition-colors">
            MyDesk
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-w4y-secondary hover:text-w4y-dark dark:text-w4y-dark-muted dark:hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link href="/buy">
            <Button size="sm" className="gap-1.5">
              Get MyDesk
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-w4y-secondary dark:text-w4y-dark-muted"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-w4y-border bg-white px-4 py-4 dark:border-w4y-dark-border dark:bg-w4y-dark-surface">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-w4y-secondary hover:text-w4y-dark dark:text-w4y-dark-muted dark:hover:text-white py-1.5"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link href="/buy" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center">Get MyDesk — ₹5,000</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
