"use client";

import { useRef, useState } from "react";
import addExerciseRecord from "@/app/actions/addExerciseRecord";

const progressOptions = [
  "Easy Start",
  "On Track",
  "Strong Day",
  "Recovery Focus",
  "Completed",
];

const AddExerciseRecord = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setImagePreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result?.toString() ?? "";
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setAlertMessage(null);

    if (!imagePreview) {
      setAlertMessage("Please choose an exercise image.");
      setAlertType("error");
      setIsLoading(false);
      return;
    }

    formData.set("imageUrl", imagePreview);

    const { error } = await addExerciseRecord(formData);

    if (error) {
      setAlertMessage(error);
      setAlertType("error");
    } else {
      setAlertMessage("Exercise entry added successfully.");
      setAlertType("success");
      formRef.current?.reset();
      setImagePreview(null);
    }

    setIsLoading(false);
  };

  return (
    <section className="overflow-hidden rounded-[2.25rem] border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-b border-slate-100 bg-[linear-gradient(180deg,#f8fbff_0%,#eef7ff_100%)] p-6 dark:border-slate-800 dark:bg-[linear-gradient(180deg,#0f172a_0%,#082f49_100%)] sm:p-8 lg:border-b-0 lg:border-r">
          <div className="inline-flex rounded-full border border-sky-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 dark:border-sky-900 dark:bg-slate-900">
            Add Exercise Entry
          </div>
          <h2 className="mt-5 text-3xl font-bold leading-tight text-slate-900 dark:text-white">
            Save your daily exercise with a clean visual preview.
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            Add your activity details, choose your progress state, and upload
            the image you want to display with the saved record.
          </p>

          <div className="interactive-card mt-8 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200">Image preview</p>
            <div className="mt-4 overflow-hidden rounded-[1.5rem] bg-slate-100 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Exercise preview"
                  className="interactive-media h-72 w-full object-cover"
                />
              ) : (
                <div className="flex h-72 items-center justify-center px-8 text-center text-sm leading-7 text-slate-400 dark:text-slate-500">
                  Upload an image to preview how your exercise card will look.
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <form
            ref={formRef}
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(formRef.current!);
              handleSubmit(formData);
            }}
            className="space-y-6"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Exercise title
                </span>
                <input
                  type="text"
                  name="title"
                  placeholder="Morning stretch"
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-900"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Duration
                </span>
                <input
                  type="text"
                  name="duration"
                  placeholder="20 mins"
                  required
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-900"
                />
              </label>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Exercise date
                </span>
                <input
                  type="date"
                  name="date"
                  required
                  defaultValue={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-900"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Progress
                </span>
                <select
                  name="progress"
                  required
                  defaultValue=""
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-900"
                >
                  <option value="" disabled>
                    Select progress...
                  </option>
                  {progressOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Exercise image
              </span>
              <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 p-5 transition hover:border-sky-300 hover:bg-sky-50/50 dark:border-slate-700 dark:bg-slate-800 dark:hover:border-sky-700 dark:hover:bg-sky-950/30">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-slate-600 dark:text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-sky-700 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-sky-800"
                />
                <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  Choose the image you want shown in the saved exercise card.
                </p>
              </div>
              <input type="hidden" name="imageUrl" value={imagePreview ?? ""} />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                Description
              </span>
              <textarea
                name="description"
                rows={5}
                placeholder="Describe what you did, how intense it felt, and how it supports your routine."
                required
                className="w-full rounded-[1.5rem] border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:focus:ring-sky-900"
              />
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex w-full items-center justify-center rounded-full bg-sky-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-sky-400"
            >
              {isLoading ? "Saving Exercise..." : "Add Exercise Entry"}
            </button>

            {alertMessage ? (
              <div
                className={`rounded-[1.25rem] px-4 py-3 text-sm font-medium ${
                  alertType === "success"
                    ? "border border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40"
                    : "border border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40"
                }`}
              >
                {alertMessage}
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddExerciseRecord;
