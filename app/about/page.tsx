import Link from "next/link";

const stats = [
  {
    value: "Simple",
    label: "Sleep tracking that stays easy to keep up with",
  },
  {
    value: "Clear",
    label: "Insights that turn nightly data into useful patterns",
  },
  {
    value: "Better",
    label: "Healthier routines built from small consistent changes",
  },
];

const benefits = [
  {
    title: "Comprehensive Tracking",
    description:
      "Log your sleep consistently and understand how your routine changes over time.",
  },
  {
    title: "Helpful Insights",
    description:
      "See patterns more clearly and make decisions based on useful daily information.",
  },
  {
    title: "Clean Experience",
    description:
      "Navigate a simple interface that stays approachable on both desktop and mobile.",
  },
];

const AboutPage = () => {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#eaf4fb_0%,#d7e9f5_45%,#c7dceb_100%)] text-slate-900 dark:bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14)_0%,_transparent_32%),linear-gradient(180deg,#030712_0%,#071224_42%,#0a1730_100%)] dark:text-slate-100">
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-sky-100 bg-white/80 p-8 shadow-[0_30px_100px_rgba(148,163,184,0.16)] backdrop-blur dark:border-sky-900/55 dark:bg-[linear-gradient(180deg,rgba(8,18,38,0.94)_0%,rgba(12,24,46,0.9)_100%)] dark:shadow-[0_30px_100px_rgba(2,12,27,0.45)] sm:p-10 lg:p-14">
          <div className="absolute -left-16 top-8 h-40 w-40 rounded-full bg-sky-100/70 blur-3xl dark:bg-sky-900/25" />
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-emerald-100/60 blur-3xl dark:bg-cyan-900/15" />

          <div className="relative grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="inline-flex rounded-full border border-sky-200 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-sky-700 shadow-sm dark:border-sky-900/70 dark:bg-sky-950/40 dark:text-sky-300">
                About SleepTracker
              </span>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight text-slate-950 sm:text-5xl lg:text-6xl dark:text-white">
                Better sleep starts with understanding your nights more clearly.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-200/90">
                SleepTracker helps you build healthier habits by turning sleep
                records into patterns, insight, and simple actions you can keep
                using every day.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/sign-up"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500"
                >
                  Get Started
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700 dark:border-sky-900/55 dark:bg-[#091120] dark:text-slate-100 dark:hover:border-sky-500 dark:hover:text-sky-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {stats.map((item) => (
                <div
                  key={item.value}
                  className="interactive-card rounded-[1.75rem] border border-white/80 bg-[linear-gradient(135deg,#ffffff_0%,#f8fbff_100%)] p-5 shadow-[0_18px_50px_rgba(148,163,184,0.14)] dark:border-sky-900/45 dark:bg-[linear-gradient(135deg,rgba(7,18,38,0.94)_0%,rgba(11,23,45,0.9)_100%)]"
                >
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-200/80">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="interactive-card rounded-[2.25rem] border border-sky-100 bg-white p-8 text-gray-900 shadow-[0_24px_80px_rgba(15,23,42,0.12)] dark:border-sky-900/45 dark:bg-[linear-gradient(135deg,rgba(7,18,38,0.95)_0%,rgba(14,50,78,0.92)_100%)] dark:text-white dark:shadow-[0_24px_80px_rgba(2,12,27,0.4)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-emerald-600 dark:text-cyan-300">
              Our mission
            </p>
            <h2 className="mt-4 text-3xl font-bold">
              Make better sleep feel practical and achievable.
            </h2>
            <p className="mt-5 text-base leading-8 text-gray-700 dark:text-slate-100">
              We built SleepTracker to help people improve their well-being with
              small, consistent changes. When sleep data becomes easier to
              understand, it becomes easier to take action.
            </p>
            <p className="mt-4 text-base leading-8 text-gray-600 dark:text-slate-200/85">
              Our goal is to create a calm, useful experience that supports
              healthier routines without overwhelming the user.
            </p>
          </div>

          <div className="interactive-card rounded-[2.25rem] border border-[#687884] bg-white p-8 shadow-[0_22px_70px_rgba(245,158,11,0.1)] dark:border-sky-900/50 dark:bg-[linear-gradient(135deg,rgba(10,24,45,0.96)_0%,rgba(21,48,77,0.92)_100%)] dark:shadow-[0_24px_80px_rgba(2,12,27,0.4)] sm:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-sky-700 dark:text-sky-300">
              Our story
            </p>
            <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
              Created for people who want clearer mornings and healthier habits.
            </h2>
            <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-200/85">
              SleepTracker was created in response to a growing need for better
              sleep management tools. We wanted to combine a user-friendly
              design with practical insight so people could understand their
              routines more easily.
            </p>
            <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-200/80">
              Since launch, the focus has stayed the same: keep tracking simple,
              make insights useful, and help users move toward better sleep over
              time.
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(148,163,184,0.12)] dark:border-sky-900/45 dark:bg-[linear-gradient(180deg,rgba(7,18,38,0.95)_0%,rgba(10,22,42,0.92)_100%)] dark:shadow-[0_24px_80px_rgba(2,12,27,0.38)] sm:p-10 lg:p-12">
          <div className="flex flex-col gap-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-400">
              Why Choose SleepTracker
            </p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              A sleep tool designed to stay useful every day.
            </h2>
            <p className="mx-auto max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-200/85">
              Everything is built to help you understand your sleep without
              making the experience feel complicated or heavy.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="interactive-card rounded-[1.75rem] border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-[0_18px_45px_rgba(148,163,184,0.1)] dark:border-sky-900/40 dark:bg-[linear-gradient(180deg,rgba(7,18,38,0.92)_0%,rgba(9,20,38,0.88)_100%)]"
              >
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-200/78">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[2.5rem] border border-sky-100 bg-[linear-gradient(135deg,#eff8ff_0%,#f0fdf4_100%)] px-6 py-10 text-center shadow-[0_20px_70px_rgba(125,211,252,0.16)] dark:border-sky-900/55 dark:bg-[linear-gradient(135deg,rgba(8,31,73,0.96)_0%,rgba(7,49,78,0.92)_55%,rgba(5,40,67,0.95)_100%)] dark:shadow-[0_24px_80px_rgba(2,12,27,0.42)] sm:px-10 lg:px-16">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300">
            Ready to sleep better?
          </p>
          <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
            Start building a healthier routine today.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-100/90">
            Join SleepTracker and take the next step toward better rest, clearer
            insight, and more consistent sleep habits.
          </p>
          <div className="mt-8">
            <Link
              href="/sign-up"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500"
            >
              Get Started
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
};

export default AboutPage;
