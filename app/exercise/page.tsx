import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import AddExerciseRecord from "@/components/AddExerciseRecord";
import deleteExerciseRecord from "@/app/actions/deleteExerciseRecord";
import { db } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";

const progressColors: Record<string, string> = {
  "Easy Start": "border-amber-200 bg-amber-50 text-amber-700",
  "On Track": "border-sky-200 bg-sky-50 text-sky-700",
  "Strong Day": "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Recovery Focus": "border-violet-200 bg-violet-50 text-violet-700",
  Completed: "border-slate-200 bg-slate-100 text-slate-700",
};

export default async function ExercisePage() {
  const user = await checkUser();

  if (!user) {
    redirect("/sign-in");
  }

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

  const totalEntries = exercises?.length ?? 0;

  return (
    <main className="min-h-screen bg-[#f6f9fc] text-slate-900">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-6">
          <section className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm">
            <div className="grid gap-6 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Exercise Progress
                </div>
                <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
                  Keep your movement routine visible and motivating.
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                  Add exercise entries with images, track your daily effort, and
                  build a routine that supports better recovery and better sleep.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    Total Entries
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {totalEntries}
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    Focus
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    Daily progress
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    Benefit
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    Better recovery
                  </p>
                </div>
              </div>
            </div>
          </section>

          <AddExerciseRecord />

          <section className="rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-6">
              <div className="inline-flex w-fit rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                Saved Exercises
              </div>
              <h2 className="text-3xl font-bold text-slate-900">
                Your exercise activity feed
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                Every saved entry appears here with its image, progress label,
                duration, and description.
              </p>
            </div>

            {exercises === null ? (
              <div className="mt-6 rounded-[1.75rem] border border-amber-200 bg-amber-50 p-8 text-center">
                <h3 className="text-2xl font-bold text-amber-800">
                  Exercise database is not ready yet
                </h3>
                <p className="mt-3 text-base leading-7 text-amber-700">
                  The Exercise table is still missing in the database. Run
                  `npx prisma db push`, then restart the dev server and refresh
                  this page.
                </p>
              </div>
            ) : exercises.length === 0 ? (
              <div className="mt-6 rounded-[1.75rem] bg-slate-50 p-8 text-center ring-1 ring-slate-200">
                <h3 className="text-2xl font-bold text-slate-900">
                  No exercise entries yet
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600">
                  Add your first exercise entry above and it will appear here as
                  a visual progress card.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {exercises.map((exercise) => (
                  <article
                    key={exercise.id}
                    className="overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(148,163,184,0.18)]"
                  >
                    <div className="relative aspect-[4/3] bg-slate-100">
                      <img
                        src={exercise.imageUrl}
                        alt={exercise.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                            {new Date(exercise.date).toLocaleDateString()}
                          </p>
                          <h3 className="mt-2 text-2xl font-bold leading-tight text-slate-900">
                            {exercise.title}
                          </h3>
                        </div>
                        <span
                          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                            progressColors[exercise.progress] ||
                            "border-slate-200 bg-slate-50 text-slate-700"
                          }`}
                        >
                          {exercise.progress}
                        </span>
                      </div>

                      <div className="mt-5 flex items-center justify-between rounded-[1.25rem] bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
                        <span className="text-sm font-medium text-slate-500">
                          Duration
                        </span>
                        <span className="text-lg font-semibold text-slate-900">
                          {exercise.duration}
                        </span>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {exercise.description}
                      </p>

                      <form
                        action={async () => {
                          "use server";
                          await deleteExerciseRecord(exercise.id);
                        }}
                        className="mt-5"
                      >
                        <button
                          type="submit"
                          className="inline-flex w-full items-center justify-center rounded-full border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                        >
                          Delete Entry
                        </button>
                      </form>
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
