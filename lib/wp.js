// /lib/wp.js
const SITE = process.env.NEXT_PUBLIC_WP_BASE_URL?.trim();

function assertEnv() {
  if (!SITE) {
    throw new Error(
      "[WP] NEXT_PUBLIC_WP_BASE_URL is missing. " +
      "Create .env.local in the project root and set e.g. " +
      "NEXT_PUBLIC_WP_BASE_URL=https://<your-site>.wordpress.com " +
      "Then restart the dev server."
    );
  }
}
assertEnv();

function getApiRoot() {
  const u = new URL(SITE);
  const host = u.hostname.toLowerCase();
  // WordPress.com → public-api.wordpress.com
  if (host.endsWith(".wordpress.com")) {
    return `https://public-api.wordpress.com/wp/v2/sites/${host}`;
  }
  // self-hosted → классический REST
  return `${u.origin}/wp-json/wp/v2`;
}

const API_ROOT = getApiRoot();

// на время отладки можно оставить лог:
if (process.env.NODE_ENV !== "production") {
  console.log("[WP] API_ROOT:", API_ROOT);
}

async function wpFetch(endpoint, { revalidate = 300 } = {}) {
  if (!endpoint.startsWith("/")) {
    throw new Error(`[WP] endpoint must start with '/': got "${endpoint}"`);
  }
  const url = `${API_ROOT}${endpoint}`;
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[WP] ${res.status} ${res.statusText}: ${text}`);
  }
  return res;
}

export async function getPosts({ page = 1, perPage = 9, category, search } = {}) {
  const params = new URLSearchParams({
    _embed: "1",
    per_page: String(perPage),
    page: String(page),
  });
  if (category) params.set("categories", String(category));
  if (search) params.set("search", search);

  const res = await wpFetch(`/posts?${params.toString()}`);
  const totalPages = Number(res.headers.get("X-WP-TotalPages") || 1);
  const total = Number(res.headers.get("X-WP-Total") || 0);
  const posts = await res.json();
  return { posts, totalPages, total };
}

export async function getPostBySlug(slug) {
  const params = new URLSearchParams({ _embed: "1", slug });
  const res = await wpFetch(`/posts?${params.toString()}`);
  const json = await res.json();
  return json?.[0] || null;
}

export async function getCategories() {
  const res = await wpFetch(`/categories?per_page=100&_fields=id,name,slug,count`);
  return await res.json();
}

export function pickFeaturedImage(post) {
  const media = post?._embedded?.["wp:featuredmedia"]?.[0];
  const jetpack = post?.jetpack_featured_media_url; // fallback для WP.com
  return media?.source_url || jetpack || null;
}

export function pickCategories(post) {
  const terms = post?._embedded?.["wp:term"]?.[0] || [];
  return terms.map((t) => ({ id: t.id, name: t.name, slug: t.slug }));
}

export function stripHtml(html = "") {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

export function formatDate(dateStr) {
  try {
    return new Intl.DateTimeFormat("ru-RU", { dateStyle: "long" }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}


