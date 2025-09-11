// app/materials/[slug]/page.js (создай: /app/materials/[slug]/page.js)
// ================================
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, pickFeaturedImage, pickCategories, stripHtml, formatDate } from '@/lib/wp';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: 'Материал не найден' };
  const title = stripHtml(post.title?.rendered);
  const description = stripHtml(post.excerpt?.rendered || post.content?.rendered)?.slice(0, 160);
  const img = pickFeaturedImage(post);
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: img ? [{ url: img }] : [],
      type: 'article',
    },
  };
}

export default async function PostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold">Материал не найден</h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-300">Возможно, он был удалён или ещё не опубликован.</p>
        <Link className="mt-6 inline-flex rounded-full border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800" href="/materials">← Ко всем материалам</Link>
      </main>
    );
  }

  const title = stripHtml(post.title?.rendered);
  const img = pickFeaturedImage(post);
  const cats = pickCategories(post);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
        <Link href="/materials" className="hover:underline">Материалы</Link>
        <span className="mx-2">/</span>
        {cats[0] ? <Link href={`/materials?category=${cats[0].id}`} className="hover:underline">{cats[0].name}</Link> : 'Материал'}
      </nav>

      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
        <time>{formatDate(post.date)}</time>
        {cats.map(c => (
          <Link key={c.id} href={`/materials?category=${c.id}`} className="rounded-full border border-zinc-200 px-2 py-0.5 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800">{c.name}</Link>
        ))}
      </div>

      {img ? (
        <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <Image src={img} alt={title} fill className="object-cover" sizes="(max-width:768px) 100vw, 768px" />
        </div>
      ) : null}

      <article className="prose prose-zinc mt-8 max-w-none dark:prose-invert prose-img:rounded-xl prose-a:underline-offset-4">
        <div dangerouslySetInnerHTML={{ __html: post.content?.rendered || '' }} />
      </article>

      <div className="mt-10">
        <Link className="inline-flex rounded-full border border-zinc-200 px-4 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800" href="/materials">← Ко всем материалам</Link>
      </div>
    </main>
  );
}
