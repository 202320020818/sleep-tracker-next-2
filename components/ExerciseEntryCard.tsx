"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import deleteExerciseRecord from "@/app/actions/deleteExerciseRecord";
import updateExerciseRecord from "@/app/actions/updateExerciseRecord";

const progressOptions = [
  "Easy Start",
  "On Track",
  "Strong Day",
  "Recovery Focus",
  "Completed",
];

const progressColors: Record<string, string> = {
  "Easy Start": "border-amber-200 bg-amber-50 text-amber-700",
  "On Track": "border-sky-200 bg-sky-50 text-sky-700",
  "Strong Day": "border-emerald-200 bg-emerald-50 text-emerald-700",
  "Recovery Focus": "border-violet-200 bg-violet-50 text-violet-700",
  Completed: "border-slate-200 bg-slate-100 text-slate-700",
};

type ExerciseEntryCardProps = {
  exercise: {
    id: string;
    title: string;
    description: string;
    duration: string;
    progress: string;
    imageUrl: string;
    date: Date;
  };
};

export default function ExerciseEntryCard({
  exercise,
}: ExerciseEntryCardProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState(exercise.imageUrl);
  const [formValues, setFormValues] = useState({
    title: exercise.title,
    description: exercise.description,
    duration: exercise.duration,
    progress: exercise.progress,
    date: new Date(exercise.date).toISOString().split("T")[0],
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result?.toString() ?? exercise.imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.set("title", formValues.title);
    formData.set("description", formValues.description);
    formData.set("duration", formValues.duration);
    formData.set("progress", formValues.progress);
    formData.set("date", formValues.date);
    formData.set("imageUrl", imagePreview);

    const { error } = await updateExerciseRecord(exercise.id, formData);

    if (error) {
      setErrorMessage(error);
      setIsSaving(false);
      return;
    }

    setIsEditing(false);
    setIsSaving(false);
    router.refresh();
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this exercise entry? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage(null);

    const { error } = await deleteExerciseRecord(exercise.id);

    if (error) {
      setErrorMessage(error);
      setIsDeleting(false);
      return;
    }

    router.refresh();
  };

  return (
    <article className="overflow-hidden rounded-[1.1rem] border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(148,163,184,0.14)]">
      <div className="relative aspect-[4/3.7] bg-slate-100">
        <img
          src={imagePreview}
          alt={formValues.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-2.5">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              value={formValues.title}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  title: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <input
                type="date"
                value={formValues.date}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    date: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              />
              <input
                type="text"
                value={formValues.duration}
                onChange={(event) =>
                  setFormValues((current) => ({
                    ...current,
                    duration: event.target.value,
                  }))
                }
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
              />
            </div>

            <select
              value={formValues.progress}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  progress: event.target.value,
                }))
              }
              className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            >
              {progressOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-sky-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-sky-800"
              />
            </div>

            <textarea
              rows={4}
              value={formValues.description}
              onChange={(event) =>
                setFormValues((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              className="w-full rounded-[1.5rem] border border-slate-300 px-4 py-3 text-slate-900 outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />

            <div className="grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="inline-flex items-center justify-center rounded-full bg-sky-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:bg-sky-400"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setErrorMessage(null);
                  setImagePreview(exercise.imageUrl);
                  setFormValues({
                    title: exercise.title,
                    description: exercise.description,
                    duration: exercise.duration,
                    progress: exercise.progress,
                    date: new Date(exercise.date).toISOString().split("T")[0],
                  });
                }}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                  {new Date(exercise.date).toLocaleDateString()}
                </p>
                <h3 className="mt-1 text-base font-bold leading-tight text-slate-900">
                  {exercise.title}
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

            <div className="mt-2.5 flex items-center justify-between rounded-[0.9rem] bg-slate-50 px-2.5 py-2 ring-1 ring-slate-200">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                Duration
              </span>
              <span className="text-sm font-semibold text-slate-900">
                {exercise.duration}
              </span>
            </div>

            <p className="mt-2 text-xs leading-5 text-slate-600 line-clamp-1">
              {exercise.description}
            </p>

            <div className="mt-2.5 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(true);
                  setErrorMessage(null);
                }}
                className="inline-flex h-8 items-center justify-center rounded-full border border-slate-300 bg-white px-2.5 text-xs font-semibold leading-none text-slate-700 transition hover:border-sky-300 hover:text-sky-700"
              >
                Edit Entry
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="inline-flex h-8 items-center justify-center rounded-full border border-red-200 bg-red-50 px-2.5 text-xs font-semibold leading-none text-red-600 transition hover:bg-red-100 disabled:opacity-70"
              >
                {isDeleting ? "Deleting..." : "Delete Entry"}
              </button>
            </div>
          </>
        )}

        {errorMessage ? (
          <div className="mt-4 rounded-[1.25rem] border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {errorMessage}
          </div>
        ) : null}
      </div>
    </article>
  );
}
