// src/app/page.jsx — Главная PRIX: адаптивная верстка (desktop ↔ mobile)
// Требуется .env.local → NEXT_PUBLIC_WP_BASE_URL=https://<site>.wordpress.com
// Данные тянем через общий клиент из '@/lib/wp' (кэш-теги + ISR),
// чтобы ревайдейт из /api/revalidate обновлял и главную.

import Link from "next/link";
import SubscribeForm from "components/SubscribeForm";
import {
  getPosts,
  pickFeaturedImage,
  pickCategories,
  stripHtml,
  formatDate,
} from "@/lib/wp";

export const revalidate = 300; // 5 минут: синхронизировано с остальными страницами

export const metadata = {
  title: "PRIX — первое СМИ в сфере PR",
  description:
    "PRIX — первое медиа для PR-рынка: аналитика, кейсы и интервью от лидеров индустрии.",
  openGraph: {
    title: "PRIX — первое СМИ в сфере PR",
    description:
      "PRIX — первое медиа для PR-рынка: аналитика, кейсы и интервью от лидеров индустрии.",
    type: "website",
  },
};

// Мета-тег viewport для корректного масштабирования на мобилках
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

const PER_PAGE = 12; // показываем больше карточек на главной

// ——— UI атомы ———
function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300/70 bg-white/60 px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-700/70 dark:bg-zinc-900/60 dark:text-zinc-300 sm:text-xs">
      {children}
    </span>
  );
}

function StatCard({ kpi, label }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-5">
      <div className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-3xl">
        {kpi}
      </div>
      <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 sm:text-sm">
        {label}
      </div>
    </div>
  );
}

function Section({ title, action, children }) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 sm:text-xl">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function Card({ post }) {
  const title = stripHtml(post?.title?.rendered);
  const excerpt = stripHtml(post?.excerpt?.rendered);
  const img = pickFeaturedImage(post);
  const cats = pickCategories(post).map((c) => c.name).filter(Boolean);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {img ? (
        // Используем <img>, чтобы избежать ограничений next/image по внешним хостам (мы уже разрешили их в конфиге)
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={img}
          alt={title}
          className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] sm:h-52"
          loading="lazy"
          decoding="async"
          sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
        />
      ) : (
        <div className="h-44 w-full bg-zinc-100 dark:bg-zinc-800 sm:h-52" />
      )}
      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <div className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400 sm:text-xs">
          {formatDate(post.date)}
        </div>

        {cats.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {cats.slice(0, 3).map((c) => (
              <span
                key={c}
                className="rounded-full border border-zinc-200 px-2 py-0.5 text-[11px] text-zinc-600 dark:border-zinc-700 dark:text-zinc-300 sm:text-xs"
              >
                {c}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-base font-semibold leading-snug text-zinc-900 dark:text-zinc-50 sm:text-lg">
          <Link href={`/materials/${post.slug}`} className="after:absolute after:inset-0">
            {title}
          </Link>
        </h3>
        {excerpt && (
          <p className="line-clamp-3 text-sm text-zinc-600 dark:text-zinc-300">
            {excerpt}
          </p>
        )}
        <div className="mt-1">
          <Link
            href={`/materials/${post.slug}`}
            className="inline-flex items-center text-sm font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Читать материал →
          </Link>
        </div>
      </div>
    </article>
  );
}

// Адаптивный хедер без JS (через <details>) — работает и на серверных компонентах
function Header() {
}

export default async function Page() {
  // Берём посты через общий клиент (идут с cache tags → обновляются через /api/revalidate)
  const { posts, total } = await getPosts({ perPage: PER_PAGE });

  return (
    <main className="mx-auto max-w-[1200px] px-4 pb-16 pt-6 sm:px-6 lg:px-8 sm:pt-8">
      {/* Хедер */}
      <Header />

      {/* Hero */}
      <header className="mb-10 overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-5 shadow-sm ring-1 ring-inset ring-white/50 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/60 sm:p-8">
        <div className="mb-5 flex justify-center sm:mb-6">
          <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white shadow-md ring-1 ring-zinc-200 dark:bg-white dark:ring-zinc-700 sm:h-40 sm:w-40">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="PRIX" className="h-16 w-auto sm:h-24" />
          </div>
        </div>

        <Pill>медиа о PR и коммуникациях</Pill>
        <h1 className="mt-3 text-[28px] font-bold leading-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          PRIX — первое СМИ в сфере PR
        </h1>
        <p className="mt-3 max-w-2xl text-[15px] text-zinc-600 dark:text-zinc-300 sm:text-base">
          Публикации, кейсы и аналитика для руководителей PR, GR и маркетинга. Никаких
          «новостей» — только смысл и польза.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard kpi="∞" label="Идей и кейсов" />
          <StatCard kpi="24/7" label="Выходит экспертиза" />
          <StatCard kpi="> 10" label="Рубрик и форматов" />
          <StatCard kpi="100%" label="Проверенный факт-чек" />
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href="/about"
            className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            О медиа
          </Link>
          <Link
            href="/advertising"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
          >
            Реклама у нас
          </Link>
        </div>
      </header>

      {/* Лента */}
      <Section
        title="Последние публикации"
        action={
          <Link
            href="/materials"
            className="text-sm text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-300"
          >
            Все материалы{typeof total === "number" ? ` (${total})` : ""}
          </Link>
        }
      >
        {!posts || posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-300 sm:p-8">
            Пока нет опубликованных материалов. Добавьте публикации в WordPress —
            они появятся здесь автоматически.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {posts.map((p) => (
              <Card key={p.id} post={p} />
            ))}
          </div>
        )}
      </Section>

      {/* Подписка / CTA */}
      <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 sm:text-lg">
              Подписка на дайджест PRIX
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Лучшие кейсы и инструменты — раз в неделю.
            </p>
          </div>
          <div className="flex w-full max-w-md">
            <SubscribeForm />
          </div>
        </div>
      </div>

      <footer className="mt-14 border-t border-zinc-200 pt-6 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 sm:text-sm">
        © {new Date().getFullYear()} PRIX Media. Все права защищены.
      </footer>
    </main>
  );
}

