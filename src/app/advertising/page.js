// src/app/advertising/page.jsx
import Link from "next/link";

export const metadata = {
  title: "Реклама — PRIX",
  description:
    "Здесь могла быть ваша реклама. Торопитесь: потом будет дороже 🤣",
  openGraph: {
    title: "Реклама — PRIX",
    description:
      "Здесь могла быть ваша реклама. Торопитесь: потом будет дороже 🤣",
    type: "website",
  },
};

export default function AdvertisingPage() {
  return (
    <div className="py-10">
      <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-block rounded-full border border-zinc-300/70 bg-white/60 px-3 py-1 text-xs uppercase tracking-widest text-zinc-700 dark:border-zinc-700/70 dark:bg-zinc-900/60 dark:text-zinc-300">
            реклама
          </span>

          <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Реклама в PRIX
          </h1>

          <p className="mt-4 text-lg text-zinc-700 dark:text-zinc-300">
            Здесь могла быть ваша реклама — и выглядела бы она великолепно.
            Торопитесь: потом будет дороже <span role="img" aria-label="lol">🤣</span>
          </p>

          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/about"
              className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Узнать условия
            </Link>
            <Link
              href="/materials"
              className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Посмотреть публикации
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
