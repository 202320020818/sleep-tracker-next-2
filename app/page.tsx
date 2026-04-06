import Guest from "@/components/Guest";
import { currentUser } from "@clerk/nextjs/server";
import AddNewRecord from "@/components/AddNewRecord";
import Link from "next/link";

export default async function HomePage() {
  const user = await currentUser();

  if (!user) {
    return <Guest />;
  }

  return (
    <main className="min-h-screen bg-[#f6f9fc] text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-6">
          <section className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Welcome Back
                </div>
                <h1 className="mt-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                  Hi {user.firstName || "there"}, let&apos;s keep your sleep
                  routine on track.
                </h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                  Log how you slept, keep your routine visible, and build
                  better nights with steady progress over time.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-[1.5rem] bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                      Joined
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                      Last Active
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      {user.lastActiveAt
                        ? new Date(user.lastActiveAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>

                  <div className="rounded-[1.5rem] bg-slate-50 p-4 ring-1 ring-slate-200">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                      Focus
                    </p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">
                      Better sleep daily
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/records"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
                  >
                    View My Records
                  </Link>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="flex flex-col items-center rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-6 text-center shadow-sm">
                  <img
                    src={user.imageUrl}
                    alt={`${user.firstName || "User"} profile`}
                    className="h-32 w-32 rounded-full object-cover shadow-md ring-4 ring-white sm:h-40 sm:w-40"
                  />
                  <div className="mt-4">
                    <p className="text-xl font-bold text-slate-900">
                      {user.firstName || "SleepTracker User"}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Keep showing up for better rest.
                    </p>
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
