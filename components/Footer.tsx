import Link from "next/link";

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-[#f8fbfd]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="max-w-md">
            <div className="inline-flex rounded-full border border-sky-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
              SleepTracker
            </div>
            <h2 className="mt-5 text-2xl font-bold text-slate-900">
              Better sleep starts with better awareness.
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              Track your sleep, understand your habits, and build healthier
              routines with a calmer and clearer experience.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                Navigation
              </p>
              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/"
                  className="text-sm font-medium text-slate-600 transition hover:text-sky-700"
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-medium text-slate-600 transition hover:text-sky-700"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-medium text-slate-600 transition hover:text-sky-700"
                >
                  Contact
                </Link>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-sky-700">
                Quick Note
              </p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Designed to make sleep tracking feel simple, helpful, and easy
                to return to every day.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} SleepTracker. All rights reserved.</p>
          <p>Track sleep. Build better routines. Feel more rested.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
