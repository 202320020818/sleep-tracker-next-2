import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";

const heroImages = [
  {
    src: "/983bd1eef748ff8cf5cfc1fc371c8988.jpg",
    alt: "Person sleeping peacefully",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/118e77f7e25a0aecb19acd493013da43.jpg",
    alt: "Relaxing sleep scene",
    className: "",
  },
  {
    src: "/1a37285c9c1e11d3b6d0c05928c62dae.jpg",
    alt: "Healthy rest lifestyle",
    className: "",
  },
];

const galleryImages = [
  {
    src: "/39926cec947327694bdfd2e58ec1bcae.jpg",
    alt: "Person resting comfortably",
  },
  {
    src: "/a56d7ce5901e0ad1e6f09dbd4b891f56.jpg",
    alt: "Night routine visual",
  },
  {
    src: "/ce87491892aee2f9116a0bbf6a5bef88.jpg",
    alt: "Sleep wellness illustration",
  },
  {
    src: "/f2739b1b643e3a32a0a407137d93b1d4.jpg",
    alt: "Calm sleeping atmosphere",
  },
];

const features = [
  {
    title: "Track Every Night",
    description:
      "Keep a simple record of your sleep and build a routine you can actually maintain.",
  },
  {
    title: "See What Changes",
    description:
      "Notice patterns in your sleep habits and understand what helps you rest better.",
  },
  {
    title: "Improve Step by Step",
    description:
      "Use your sleep data to make small changes that lead to healthier nights over time.",
  },
];

const Guest = () => {
  return (
    <main className="min-h-screen bg-[#d4e3ec] text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="max-w-2xl">
            <span className="inline-flex rounded-full border border-sky-200 bg-sky-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">
              Sleep Better With SleepTracker
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              A cleaner way to track your nights and improve your mornings.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
              SleepTracker helps you log your sleep, understand your habits,
              and build a healthier routine with clear insight and a calm
              experience.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <SignInButton>
                <button className="rounded-full bg-sky-700 px-7 py-3 text-sm font-semibold text-white transition hover:bg-sky-800">
                  Get Started
                </button>
              </SignInButton>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-sky-500 dark:hover:text-sky-300"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                >
                  <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                    {feature.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2.25rem] border border-slate-200 bg-white p-4 shadow-[0_24px_80px_rgba(148,163,184,0.16)] dark:border-slate-800 dark:bg-slate-900">
            <div className="grid auto-rows-[170px] gap-4 sm:grid-cols-2 md:auto-rows-[190px]">
              {heroImages.map((image) => (
                <div
                  key={image.src}
                  className={`relative overflow-hidden rounded-[1.5rem] ${image.className}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="mt-12 rounded-[2.25rem] border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                Sleep Inspiration
              </p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                A visual space built around calm, rest, and healthier routines.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-300">
                Your 7 uploaded images are now used across the home page to
                make the experience feel more alive and visually complete.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryImages.map((image) => (
              <div
                key={image.src}
                className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800"
              >
                <div className="relative aspect-[4/5]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
};

export default Guest;
