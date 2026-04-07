"use client";

import { useRef, useState } from "react";
import addSleepRecord from "@/app/actions/addSleepRecord";

const sleepOptions = [
  {
    value: "Deep Sleep",
    label: "Deep Sleep",
    note: "You woke up feeling fully rested and refreshed.",
  },
  {
    value: "Good Sleep",
    label: "Good Sleep",
    note: "You slept well and felt mostly comfortable overnight.",
  },
  {
    value: "Light Sleep",
    label: "Light Sleep",
    note: "You slept, but the quality felt lighter than usual.",
  },
  {
    value: "Restless Night",
    label: "Restless Night",
    note: "You woke up often or had trouble staying asleep.",
  },
  {
    value: "Exhausted",
    label: "Exhausted",
    note: "You feel drained and need better recovery.",
  },
];

const amountLabels = [
  { label: "Short", value: "0 - 4 hrs", min: 0, max: 4 },
  { label: "Average", value: "5 - 7 hrs", min: 5, max: 7 },
  { label: "Great", value: "8 - 12 hrs", min: 8, max: 12 },
];

const AddRecord = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState(6);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertType, setAlertType] = useState<"success" | "error" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sleepQuality, setSleepQuality] = useState("Good Sleep");
  const activeAmountLabel =
    amount <= 4 ? "Short" : amount <= 7 ? "Average" : "Great";

  const clientAction = async (formData: FormData) => {
    setIsLoading(true);
    setAlertMessage(null);

    formData.set("amount", amount.toString());
    formData.set("text", sleepQuality);

    const { error } = await addSleepRecord(formData);

    if (error) {
      setAlertMessage(`Error: ${error}`);
      setAlertType("error");
    } else {
      setAlertMessage("Sleep record added successfully.");
      setAlertType("success");
      formRef.current?.reset();
      setAmount(6);
      setSleepQuality("Good Sleep");
    }

    setIsLoading(false);
  };

  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-6">
        <div className="inline-flex w-fit rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
          New Sleep Record
        </div>
        <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Track tonight&apos;s sleep in a cleaner way
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Choose how your sleep felt, set the date, and log your hours in a
              few quick steps.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-slate-50 px-4 py-3 ring-1 ring-slate-200">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              Current hours
            </p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{amount}h</p>
          </div>
        </div>
      </div>

      <form
        ref={formRef}
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(formRef.current!);
          clientAction(formData);
        }}
        className="mt-6 space-y-8"
      >
        <div>
          <label className="block text-sm font-semibold text-slate-800">
            Sleep quality
          </label>
          <p className="mt-1 text-sm text-slate-500">
            Pick the option that best matches how you felt after sleeping.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {sleepOptions.map((option) => {
              const isSelected = sleepQuality === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setSleepQuality(option.value)}
                  className={`rounded-[1.5rem] border p-4 text-left transition ${
                    isSelected
                      ? "border-sky-500 bg-sky-50 shadow-[0_10px_30px_rgba(14,165,233,0.12)]"
                      : "border-slate-200 bg-white hover:border-sky-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-base font-semibold text-slate-900">
                      {option.label}
                    </p>
                    <span
                      className={`h-4 w-4 rounded-full border ${
                        isSelected
                          ? "border-sky-600 bg-sky-600 ring-4 ring-sky-100"
                          : "border-slate-300 bg-white"
                      }`}
                    />
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {option.note}
                  </p>
                </button>
              );
            })}
          </div>
          <input type="hidden" name="text" value={sleepQuality} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="rounded-[1.75rem] bg-slate-50 p-5 ring-1 ring-slate-200">
            <label
              htmlFor="date"
              className="block text-sm font-semibold text-slate-800"
            >
              Sleep date
            </label>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              Choose the date for the sleep entry you want to save.
            </p>
            <input
              type="date"
              name="date"
              id="date"
              required
              defaultValue={new Date().toISOString().split("T")[0]}
              onFocus={(event) => event.target.showPicker?.()}
              className="mt-4 block w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100"
            />
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#f1f6fc_100%)] p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-semibold text-slate-800"
                >
                  Hours slept
                </label>
                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Select between 0 and 12 hours in steps of 0.5.
                </p>
              </div>
              <div className="inline-flex items-center gap-2 self-start rounded-full border border-sky-200 bg-white px-4 py-2 text-sm font-semibold text-sky-700 shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                {amount} hours
              </div>
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-slate-200 bg-white px-4 py-5">
              <div className="mb-4 flex items-center justify-between text-xs font-medium text-slate-400">
                <span>0h</span>
                <span>12h</span>
              </div>

              <input
                type="range"
                name="amount"
                id="amount"
                min="0"
                max="12"
                step="0.5"
                value={amount}
                onChange={(event) => setAmount(parseFloat(event.target.value))}
                className="w-full cursor-pointer accent-slate-900"
              />

              <div className="mt-4 flex items-center justify-between rounded-full bg-sky-50 px-4 py-2 text-sm">
                <span className="font-medium text-slate-600">Selected range</span>
                <span className="font-semibold text-sky-700">
                  {activeAmountLabel}
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {amountLabels.map((item) => (
                <div
                  key={item.label}
                  className={`rounded-2xl px-4 py-3 text-center transition ${
                    amount >= item.min && amount <= item.max
                      ? "border border-sky-200 bg-sky-50 shadow-sm"
                      : "border border-slate-200 bg-white"
                  }`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.18em] ${
                      amount >= item.min && amount <= item.max
                        ? "text-sky-700"
                        : "text-slate-500"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex w-full items-center justify-center rounded-full bg-sky-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-sky-400"
          >
            {isLoading ? (
              <span className="flex items-center gap-3">
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Saving Record...
              </span>
            ) : (
              "Add Sleep Record"
            )}
          </button>

          {alertMessage ? (
            <div
              className={`rounded-[1.25rem] px-4 py-3 text-sm font-medium ${
                alertType === "success"
                  ? "border border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {alertMessage}
            </div>
          ) : null}
        </div>
      </form>
    </section>
  );
};

export default AddRecord;
