// app/materials/page.js — список материалов с пагинацией, поиском и фильтром по рубрике
import Image from 'next/image';
import Link from 'next/link';
import { getPosts, getCategories, pickFeaturedImage, pickCategories, stripHtml, formatDate } from '@/lib/wp';

export const revalidate = 300; // 5 минут ISR

function Pill({ children, href, active }) {
  const base = 'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium shadow-sm backdrop-blur-sm';
  const theme = active
    ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900'
    : 'border-zinc-200 bg-white/70 text-zinc-700 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 hover:opacity-90';
  const Comp = href ? Link : 'span';
  return <Comp href={href} className={`${base} ${theme}`}>{children}</Comp>;
}

function PostCard({ post }) {
  const href = `/materials/${post.slug}`;
  const img = pickFeaturedImage(post);
  const cats = pickCategories(post);
  const excerpt = post.excerpt?.rendered ? stripHtml(post.excerpt.rendered) : stripHtml(post.content?.rendered)?.slice(0, 180) + '…';

  return (
    <article className="group overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {img ? (
        <Link href={href} className="block aspect-[16/9] relative">
          <Image src={img} alt={post.title?.rendered || ''} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
        </Link>
      ) : (
        <Link href={href} className="block aspect-[16/9] bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900" />
      )}
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {cats.slice(0, 2).map(c => (
            <Pill key={c.id} href={`/materials?category=${c.id}`}>{c.name}</Pill>
          ))}
        </div>
        <h3 className="mt-3 text-xl font-semibold leading-snug">
          <Link href={href} className="hover:underline underline-offset-4">{stripHtml(post.title?.rendered)}</Link>
        </h3>
        <p className="mt-2 line-clamp-3 text-sm text-zinc-600 dark:text-zinc-300">{excerpt}</p>
        <time className="mt-3 block text-xs text-zinc-500 dark:text-zinc-400">{formatDate(post.date)}</time>
      </div>
    </article>
  );
}

export default async function MaterialsPage({ searchParams }) {
  const page = Number(searchParams?.page || 1);
  const category = searchParams?.category ? Number(searchParams.category) : undefined;
  const q = searchParams?.q || '';

  const [{ posts, totalPages, total }, categories] = await Promise.all([
    getPosts({ page, perPage: 9, category, search: q }),
    getCategories(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">Материалы</span>
            <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">Публикации</h1>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">Редакционные и авторские тексты из сфер PR · GR · IT · Продакшн.</p>
          </div>
          <form method="get" className="w-full max-w-md">
            <label className="sr-only" htmlFor="q">Поиск</label>
            <div className="flex overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <input id="q" name="q" defaultValue={q} placeholder="Поиск материалов…" className="w-full bg-transparent px-4 py-2 outline-none" />
              {/* сохраняем выбранную категорию при поиске */}
              {category ? <input type="hidden" name="category" value={category} /> : null}
              <button className="px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800" type="submit">Найти</button>
            </div>
          </form>
        </div>
      </header>

      {/* Рубрики */}
      <section className="mb-6 flex flex-wrap gap-2">
        <Pill href="/materials" active={!category}>Все</Pill>
        {categories?.filter(c => c.count > 0).map(c => (
          <Pill key={c.id} href={`/materials?category=${c.id}${q ? `&q=${encodeURIComponent(q)}` : ''}`} active={category === c.id}>{c.name}</Pill>
        ))}
      </section>

      {/* Сетка материалов */}
      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed p-10 text-center text-zinc-600 dark:border-zinc-800 dark:text-zinc-300">
          По вашему запросу материалов не найдено.
        </div>
      ) : (
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(p => <PostCard key={p.id} post={p} />)}
        </section>
      )}

      {/* Пагинация */}
      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-between">
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Всего материалов: {total}</div>
          <div className="flex items-center gap-2">
            <Link aria-disabled={page <= 1} className={`rounded-full border px-3 py-1.5 text-sm ${page <= 1 ? 'pointer-events-none opacity-40' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'} border-zinc-200 dark:border-zinc-800`} href={`/materials?${new URLSearchParams({ ...(category && { category: String(category) }), ...(q && { q }), page: String(Math.max(1, page - 1)) }).toString()}`}>Назад</Link>
            <span className="text-sm">{page} / {totalPages}</span>
            <Link aria-disabled={page >= totalPages} className={`rounded-full border px-3 py-1.5 text-sm ${page >= totalPages ? 'pointer-events-none opacity-40' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800'} border-zinc-200 dark:border-zinc-800`} href={`/materials?${new URLSearchParams({ ...(category && { category: String(category) }), ...(q && { q }), page: String(Math.min(totalPages, page + 1)) }).toString()}`}>Вперёд</Link>
          </div>
        </nav>
      )}
    </main>
  );
}