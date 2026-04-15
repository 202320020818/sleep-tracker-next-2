"use client";

import { useState } from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/records", label: "Records" },
  { href: "/exercise", label: "Exercise" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#ebeced] backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#e0f2fe_0%,#f8fafc_100%)] ring-1 ring-sky-200 dark:bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_100%)] dark:ring-sky-900">
            <div className="h-5 w-5 rotate-45 rounded-full border-2 border-sky-700 border-t-transparent dark:border-sky-300" />
            <div className="absolute h-1.5 w-1.5 rounded-full bg-sky-700 dark:bg-sky-300" />
          </div>
          <div className="leading-none">
            <p className="text-[1.2rem] font-bold tracking-tight text-slate-900 dark:text-white sm:text-[1.75rem]">
              Habit Tracker
            </p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.24em] text-sky-700 sm:text-[11px] sm:tracking-[0.28em]">
              Better Routines Daily
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <div className="flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-semibold text-slate-600 transition hover:text-sky-700 dark:text-slate-300 dark:hover:text-sky-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <ThemeToggle />

          <SignedOut>
            <SignInButton>
              <button className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <UserButton />
            </div>
          </SignedIn>
        </div>

        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle className="h-11 flex-shrink-0 gap-1.5 px-3 text-xs sm:text-sm" />

          <SignedOut>
            <SignInButton>
              <button className="h-11 min-w-[78px] flex-shrink-0 whitespace-nowrap rounded-full bg-slate-900 px-4 text-xs font-semibold leading-none text-white transition hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500 sm:text-sm">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900">
              <UserButton />
            </div>
          </SignedIn>

          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-300"
          >
            <span className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${mobileMenuOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${mobileMenuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
        </div>

        <div className={`${mobileMenuOpen ? "mt-4 grid" : "hidden"} gap-3 rounded-[1.75rem] border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 md:hidden`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-[1rem] border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-800 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-300"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
