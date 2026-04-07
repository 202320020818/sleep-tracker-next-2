import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import AddExerciseRecord from "@/components/AddExerciseRecord";
import ExerciseEntryCard from "@/components/ExerciseEntryCard";
import { db } from "@/lib/db";
import { checkUser } from "@/lib/checkUser";

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
    <main className="min-h-screen bg-[#f6f9fc] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-8 lg:py-16">
        <div className="grid gap-6">
          <section className="overflow-hidden rounded-[2.5rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="grid gap-6 p-8 sm:p-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <div className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                  Exercise Progress
                </div>
                <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">
                  Keep your movement routine visible and motivating.
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                  Add exercise entries with images, track your daily effort, and
                  build a routine that supports better recovery and better sleep.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    Total Entries
                  </p>
                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                    {totalEntries}
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    Focus
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    Daily progress
                  </p>
                </div>
                <div className="rounded-[1.5rem] bg-slate-50 p-5 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
                    Benefit
                  </p>
                  <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">
                    Better recovery
                  </p>
                </div>
              </div>
            </div>
          </section>

          <AddExerciseRecord />

          <section
            id="saved-exercises"
            className="scroll-mt-28 rounded-[2.25rem] border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-8"
          >
            <div className="flex flex-col gap-3 border-b border-slate-100 pb-6 dark:border-slate-800">
              <div className="inline-flex w-fit rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
                Saved Exercises
              </div>
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                Your exercise activity feed
              </h2>
              <p className="max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                Every saved entry appears here with its image, progress label,
                duration, and description.
              </p>
            </div>

            {exercises === null ? (
              <div className="mt-6 rounded-[1.75rem] border border-amber-200 bg-amber-50 p-8 text-center">
                <h3 className="text-2xl font-bold text-amber-800">
                  Exercise database is not ready yet
                </h3>
                
              </div>
            ) : exercises.length === 0 ? (
              <div className="mt-6 rounded-[1.75rem] bg-slate-50 p-8 text-center ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                  No exercise entries yet
                </h3>
                <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                  Add your first exercise entry above and it will appear here as
                  a visual progress card.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {exercises.map((exercise) => (
                  <ExerciseEntryCard key={exercise.id} exercise={exercise} />
                ))}
              </div>
            )}
          </section>
        </div>
      </section>
    </main>
  );
}
