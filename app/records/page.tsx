import { Prisma } from "@prisma/client";
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

const progressColors: Record<string, string> = {
  "Easy Start": "border-amber-200 bg-amber-50 text-amber-700",
  "On Track": "border-sky-200 bg-sky-50 text-sky-700",
  "Strong Day": "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Recovery Focus": "border-violet-200 bg-violet-50 text-violet-700",
  Completed: "border-slate-200 bg-slate-100 text-slate-700",
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

  const exerciseModel = (db as typeof db & {
    exercise?: {
      findMany: typeof db.record.findMany;
    };
  }).exercise;

  let exercises = null;

  if (exerciseModel) {
    try {
      exercises = await exerciseModel.findMany({
        where: {
          userId: user.clerkUserId,
        },
        orderBy: {
          date: "desc",
        },
      });
    } catch (error) {
      if (
        !(
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2021"
        )
      ) {
        throw error;
      }
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f9fc] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-6">
          <section className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                  My Records
                </div>
                <h1 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                  View both sleep and exercise records in one place
                </h1>
                <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
                  Review your saved sleep entries and your exercise activity
                  feed together from this page.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="inline-flex min-w-[190px] items-center justify-center rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
                >
                  Add Sleep Record
                </Link>
                <Link
                  href="/exercise#saved-exercises"
                  className="inline-flex min-w-[190px] items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-300"
                >
                  Go to Exercise
                </Link>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="border-b border-slate-100 pb-6 dark:border-slate-800">
              <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                Sleep Records
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
                Your sleep history
              </h2>
            </div>

            {records.length === 0 ? (
              <div className="mt-6 rounded-[1.75rem] bg-slate-50 p-8 text-center ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  No sleep records yet
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                  Start by adding your first sleep record from the home page.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {records.map((record) => (
                  <article
                    key={record.id}
                    className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                          Sleep Date
                        </p>
                        <h3 className="mt-2 text-xl font-bold text-slate-900 dark:text-white">
                          {new Date(record.date).toLocaleDateString()}
                        </h3>
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

                    <div className="mt-6 rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                        Hours Slept
                      </p>
                      <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                        {record.amount}h
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                      <span>Record saved</span>
                      <span>
                        {new Date(record.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8">
            <div className="border-b border-slate-100 pb-6 dark:border-slate-800">
              <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                Exercise Records
              </div>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
                Your exercise activity
              </h2>
            </div>

            {exercises === null ? (
              <div className="mt-6 rounded-[1.75rem] border border-amber-200 bg-amber-50 p-8 text-center">
                <h3 className="text-2xl font-bold text-amber-800">
                  Exercise table is not ready yet
                </h3>
                <p className="mt-3 text-base leading-7 text-amber-700">
                  Run `npx prisma db push`, restart the dev server, and refresh
                  this page.
                </p>
              </div>
            ) : exercises.length === 0 ? (
              <div className="mt-6 rounded-[1.75rem] bg-slate-50 p-8 text-center ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  No exercise records yet
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                  Add your first exercise entry from the Exercise page.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {exercises.map((exercise) => (
                  <article
                    key={exercise.id}
                    className="overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    <div className="relative aspect-[4/4.2] bg-slate-100 dark:bg-slate-800">
                      <img
                        src={exercise.imageUrl}
                        alt={exercise.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-3">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                            Date
                          </p>
                          <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                            {new Date(exercise.date).toLocaleDateString()}
                          </h3>
                        </div>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                            progressColors[exercise.progress] ||
                            "border-slate-200 bg-slate-50 text-slate-700"
                          }`}
                        >
                          {exercise.progress}
                        </span>
                      </div>

                      <div className="mt-2 rounded-[0.95rem] bg-slate-50 px-3 py-2.5 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                          Time
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">
                          {exercise.duration}
                        </p>
                      </div>

                      <h4 className="mt-2 line-clamp-1 text-[15px] font-semibold text-slate-900 dark:text-white">
                        {exercise.title}
                      </h4>
                      <p className="mt-1 line-clamp-1 text-sm leading-5 text-slate-600 dark:text-slate-300">
                        {exercise.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
