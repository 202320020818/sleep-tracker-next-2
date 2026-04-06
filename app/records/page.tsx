import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";

const qualityColors: Record<string, string> = {
  "Deep Sleep": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Good Sleep": "bg-sky-50 text-sky-700 border-sky-200",
  "Light Sleep": "bg-amber-50 text-amber-700 border-amber-200",
  "Restless Night": "bg-orange-50 text-orange-700 border-orange-200",
  Exhausted: "bg-red-50 text-red-700 border-red-200",
};

export default async function RecordsPage() {
  const user = await checkUser();

  if (!user) {
    redirect("/sign-in");
  }

  const records = await db.record.findMany({
    where: {
      userId: user.clerkUserId,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-[#f6f9fc] text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
        <div className="flex flex-col gap-4 rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                Your Sleep Records
              </div>
              <h1 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
                See every sleep entry in one place
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
                Review the sleep records you&apos;ve already added, including
                date, quality, and total hours slept.
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              Add New Record
            </Link>
          </div>
        </div>

        {records.length === 0 ? (
          <section className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              No records yet
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Start by adding your first sleep record from the home page.
            </p>
            <div className="mt-6">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
              >
                Go to Home
              </Link>
            </div>
          </section>
        ) : (
          <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {records.map((record) => (
              <article
                key={record.id}
                className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                      Sleep Date
                    </p>
                    <h2 className="mt-2 text-xl font-bold text-slate-900">
                      {new Date(record.date).toLocaleDateString()}
                    </h2>
                  </div>
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      qualityColors[record.text] ||
                      "border-slate-200 bg-slate-50 text-slate-700"
                    }`}
                  >
                    {record.text}
                  </span>
                </div>

                <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                    Hours Slept
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {record.amount}h
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                  <span>Record saved</span>
                  <span>{new Date(record.createdAt).toLocaleDateString()}</span>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>
    </main>
  );
}
