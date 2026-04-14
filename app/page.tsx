import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import AddNewRecord from "@/components/AddNewRecord";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const user = await currentUser();

  if (!user) {
    return <Guest />;
  }

  return (
    <main className="min-h-screen bg-[#a1bcce] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-6">
          <section className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-[#ecf2f2] shadow-sm dark:border-slate-400 dark:bg-slate-900">
            <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-start lg:p-10">
              <div>
                <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Welcome Back
                </div>
                <h1 className="mt-5 max-w-3xl text-3xl font-bold leading-[1.08] text-slate-900 dark:text-white sm:text-4xl lg:text-[3.2rem]">
                  Hi {user.firstName || "there"}, keep your sleep routine clear,
                  steady, and easy to manage.
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg">
                  Track each night, review your progress, and keep your healthy
                  routine visible in one place.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    href="/records"
                    className="inline-flex min-w-[180px] items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500"
                  >
                    View My Records
                  </Link>
                  <Link
                    href="/exercise"
                    className="inline-flex min-w-[180px] items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-300"
                  >
                    Go to Exercise
                  </Link>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="interactive-card rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/70">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                      Joined
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="interactive-card rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/70">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                      Last Active
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      {user.lastActiveAt
                        ? new Date(user.lastActiveAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  <div className="interactive-card rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-800/70">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                      Focus
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                      Better sleep daily
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="interactive-card w-full max-w-[320px] rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 shadow-sm dark:border-slate-800 dark:bg-[linear-gradient(180deg,#0f172a_0%,#111827_100%)]">
                  <div className="rounded-[1.5rem] border border-sky-100 bg-sky-50/70 px-4 py-3 dark:border-sky-900 dark:bg-sky-950/40">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                      Profile Snapshot
                    </p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                      Your routine looks better when it stays visible every day.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-col items-center text-center">
                    <Image
                      src={user.imageUrl}
                      alt={`${user.firstName || "User"} profile`}
                      width={128}
                      height={128}
                      unoptimized
                      className="h-28 w-28 rounded-full object-cover shadow-md ring-4 ring-white dark:ring-slate-800 sm:h-32 sm:w-32"
                    />
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white">
                        {user.firstName || "SleepTracker User"}
                      </p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Keep showing up for better rest.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                        Routine Goal
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                        Build steady, healthier nights
                      </p>
                    </div>
                    <div className="rounded-[1.25rem] border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
                        Next Step
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                        Add today&apos;s sleep record below
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full">
            <AddNewRecord />
          </section>
        </div>
      </section>
    </main>
  );
}
