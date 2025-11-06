// src/components/Header.jsx
import Link from "next/link";

const NAV = [
  { href: "/materials", label: "Материалы" },
  { href: "/about", label: "О нас" },
  { href: "/redaktsiya", label: "Редакция" },
];

export default function Header({ sticky = true }) {
  return (
    <div
      className={[
        sticky ? "sticky top-0 z-40" : "",
        "mb-8 border-b border-zinc-200/80 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60",
        "dark:border-zinc-800/80 dark:bg-zinc-900/80 dark:supports-[backdrop-filter]:bg-zinc-900/60",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        {/* Лого (всегда белый квадрат, в тёмной теме тоже) */}
        <Link href="/" className="flex items-center gap-3" aria-label="На главную">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 dark:bg-white dark:ring-zinc-200">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="PRIX" className="h-6 w-auto" />
          </div>
          <span className="hidden text-sm font-medium text-zinc-900 dark:text-zinc-50 sm:block">
            PRIX — первое СМИ в сфере PR
          </span>
        </Link>

        {/* Десктоп-меню */}
        <nav className="hidden items-center gap-2 sm:flex" aria-label="Главное меню">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-zinc-300/70 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Мобайл-меню без JS (через <details>) */}
        <details className="relative sm:hidden">
          <summary
            className="flex cursor-pointer list-none items-center rounded-xl border border-zinc-300/70 bg-white px-3 py-1.5 text-sm font-medium text-zinc-800 shadow-sm hover:bg-zinc-50 dark:border-zinc-700/70 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            aria-label="Открыть меню"
          >
            <span className="sr-only">Меню</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </summary>
          <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1.5 shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
}
