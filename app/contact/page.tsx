"use client";

const contactDetails = [
  {
    title: "Email",
    value: "harshanaeshan2023@gmail.com",
    note: "Best for bug reports, longer questions, and thoughtful feedback.",
  },
  {
    title: "Phone",
    value: "+94 761 541 638",
    note: "Useful when you want a faster conversation during working hours.",
  },
  {
    title: "Location",
    value: "Ambalangoda, Sri Lanka",
    note: "Built to support better rest and healthier routines every day.",
  },
];

const supportPoints = [
  "Product feedback and improvement ideas",
  "Help with sign-in or tracking issues",
  "General support about sleep records",
];

const ContactPage = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name")?.toString().trim() ?? "";
    const email = formData.get("email")?.toString().trim() ?? "";
    const message = formData.get("message")?.toString().trim() ?? "";

    const subject = encodeURIComponent(`Message from ${name}`);
    const body = encodeURIComponent(`Email: ${email}\n\n${message}`);

    window.location.href = `mailto:harshanaeshan2002@outlook.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eaf4fb_0%,#d7e9f5_45%,#c7dceb_100%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18)_0%,_transparent_34%),linear-gradient(180deg,#030712_0%,#081226_38%,#0a1930_100%)] dark:text-slate-100">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 lg:py-20">
        <div className="mb-10 max-w-3xl">
          <span className="inline-flex rounded-full border border-sky-200 bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 shadow-sm dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-300">
            Contact SleepTracker
          </span>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-950 sm:text-5xl dark:text-white">
            We&apos;re here to help with your sleep tracking experience.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 dark:text-slate-200/90">
            Reach out for support, feedback, or questions. Everything on this
            page is designed to make contacting us feel simple and clear.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="space-y-6">
            <div className="grid gap-4">
              {contactDetails.map((detail) => (
                <div
                  key={detail.title}
                  className="interactive-card accent-card rounded-[1.75rem] border p-6 dark:border-sky-900/45 dark:bg-[linear-gradient(180deg,rgba(7,18,38,0.96)_0%,rgba(10,23,45,0.92)_100%)] dark:shadow-[0_24px_70px_rgba(2,12,27,0.45)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-400">
                    {detail.title}
                  </p>
                  <h2 className="mt-3 text-2xl font-bold leading-tight text-slate-900 dark:text-white">
                    {detail.value}
                  </h2>
                  <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                    {detail.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="interactive-card accent-card rounded-[2rem] border p-6 dark:border-sky-900/45 dark:bg-[linear-gradient(180deg,rgba(7,18,38,0.96)_0%,rgba(10,23,45,0.92)_100%)] sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-400">
                What we can help with
              </p>
              <h2 className="mt-3 text-2xl font-bold text-slate-900 dark:text-white">
                Common reasons people contact us.
              </h2>
              <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">
                Choose the topic that matches your issue or idea, then send us
                a message with a little context.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                {supportPoints.map((point, index) => (
                  <div
                    key={point}
                    className="interactive-card accent-panel rounded-[1.5rem] border p-5 dark:border-sky-900/45 dark:bg-slate-950/55"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-100 text-sm font-semibold text-sky-700 dark:bg-sky-950/80 dark:text-sky-300">
                      {index + 1}
                    </div>
                    <p className="mt-4 text-sm font-semibold leading-6 text-slate-900 dark:text-white">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="interactive-card accent-card-strong rounded-[2rem] border p-6 shadow-sm dark:border-sky-900/50 dark:bg-[linear-gradient(180deg,rgba(7,18,38,0.98)_0%,rgba(11,27,51,0.96)_100%)] dark:shadow-[0_28px_80px_rgba(2,12,27,0.55)] sm:p-8 lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-400">
                Send a message
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                Start your email draft here.
              </h2>
              <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-200/90">
                Fill in your details below. When you submit, your default email
                app will open with your message ready to send.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Name
                  </span>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="w-full rounded-2xl border border-[var(--border)] bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-sky-900/60 dark:bg-[#050b18] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-950"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                    Email
                  </span>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-2xl border border-[var(--border)] bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-sky-900/60 dark:bg-[#050b18] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-950"
                  />
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">
                  Message
                </span>
                <textarea
                  id="message"
                  name="message"
                  rows={8}
                  placeholder="Tell us what you need help with."
                  required
                  className="w-full rounded-[1.5rem] border border-[var(--border)] bg-white/80 px-4 py-3 text-slate-900 outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-sky-900/60 dark:bg-[#050b18] dark:text-white dark:placeholder:text-slate-500 dark:focus:border-sky-500 dark:focus:ring-sky-950"
                />
              </label>

              <div className="accent-panel rounded-[1.5rem] border px-5 py-4 text-sm leading-6 text-slate-600 dark:border-sky-900/45 dark:bg-slate-950/55 dark:text-slate-200/85">
                When you submit, your default email app opens with the subject
                and message already prepared.
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-sky-700 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-sky-800 focus:outline-none focus:ring-4 focus:ring-sky-200"
              >
                Open Email Draft
              </button>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
