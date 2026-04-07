import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/records", label: "Records" },
  { href: "/exercise", label: "Exercise" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#e0f2fe_0%,#f8fafc_100%)] ring-1 ring-sky-200">
            <div className="h-5 w-5 rounded-full border-2 border-sky-700 border-t-transparent rotate-45" />
            <div className="absolute h-1.5 w-1.5 rounded-full bg-sky-700" />
          </div>
          <div className="leading-none">
            <p className="text-[1.75rem] font-bold tracking-tight text-slate-900">
              Habit Tracker
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700">
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
                className="text-sm font-semibold text-slate-600 transition hover:text-sky-700"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <SignedOut>
            <SignInButton>
              <button className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="rounded-full border border-slate-200 bg-white p-1 shadow-sm">
              <UserButton />
            </div>
          </SignedIn>
        </div>

        <div className="flex items-center md:hidden">
          <SignedOut>
            <SignInButton>
              <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="rounded-full border border-slate-200 bg-white p-1 shadow-sm">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
