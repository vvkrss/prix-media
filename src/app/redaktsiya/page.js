// src/app/redaktsiya/page.jsx — Страница «Редакция» (команда PRIX)
// Фото положите в /public/team/*.jpg или используйте внешние URL. Верстка адаптивная, без клиентского JS; стили — Tailwind.

import Link from "next/link";

export const revalidate = 1800; // 30 минут

export const metadata = {
  title: "Редакция PRIX — команда медиа",
  description:
    "Команда PRIX: учредитель, главный редактор, редакторы направлений, корреспондентский пул и фотокорр.",
  openGraph: {
    title: "Редакция PRIX — команда медиа",
    description:
      "Команда PRIX: учредитель, главный редактор, редакторы направлений, корреспондентский пул и фотокорр.",
    type: "website",
  },
};

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300/70 bg-white/60 px-3 py-1 text-[10px] uppercase tracking-widest text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-700/70 dark:bg-zinc-900/60 dark:text-zinc-300 sm:text-xs">
      {children}
    </span>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <section className="mb-10 sm:mb-14">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 sm:text-xl">{title}</h2>
        {subtitle ? (
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300 sm:text-base">{subtitle}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function Social({ href, children }) {
  if (!href) return null;
  return (
    <Link
      href={href}
      className="text-[13px] text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline dark:text-zinc-300 dark:hover:text-zinc-50"
    >
      {children}
    </Link>
  );
}

function MemberCard({ person }) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={person.photo}
        alt={person.name}
        className="aspect-square w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
        loading="lazy"
        decoding="async"
        sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
      />
      <div className="flex flex-col gap-2 p-4 sm:p-5">
        <div className="flex items-center gap-2">
          <Pill>{person.tag || "редакция"}</Pill>
        </div>
        <h3 className="text-base font-semibold leading-snug text-zinc-900 dark:text-zinc-50 sm:text-lg">
          {person.name}
        </h3>
        {person.role ? (
          <p className="text-sm text-zinc-600 dark:text-zinc-300">{person.role}</p>
        ) : null}
        {person.bio ? (
          <p className="text-sm text-zinc-600/90 dark:text-zinc-300/90">{person.bio}</p>
        ) : null}
        {(person.email || person.telegram || person.site) && (
          <div className="mt-1 flex flex-wrap gap-3">
            {person.telegram ? (
              <Social href={person.telegram}>Telegram</Social>
            ) : null}
            {person.email ? (
              <Social href={`mailto:${person.email}`}>{person.email}</Social>
            ) : null}
            {person.site ? <Social href={person.site}>Сайт</Social> : null}
          </div>
        )}
      </div>
    </article>
  );
}

// ===== Данные (замените плейсхолдеры фото на реальные пути) =====
const FOUNDER = [
  {
    name: "Кривошеев Александр Андреевич",
    role: "Учредитель",
    tag: "учредитель",
    photo: "/team/founder.jpg",
    email: "founder@prix.press",
    bio: "Определяет стратегию развития медиа и ключевые партнёрства.",
  },
];

const CHIEF_EDITOR = [
  {
    name: "Мильченко Ангелина Романовна",
    role: "Главный редактор",
    tag: "главный редактор",
    photo: "/team/chief-editor.jpg",
    email: "editor@prix.press",
    bio: "Отвечает за редакционную политику и качество материалов.",
  },
];

const SECTION_EDITORS = [
  {
    name: "Мартиросов Георгий Романович",
    role: "Редактор направления: GR",
    tag: "редактор направления",
    photo: "/team/gr-editor.jpg",
    bio: "Курирует материалы на стыке госуправления и корпоративных коммуникаций.",
  },
  {
    name: "Димова Мария Валерьевна",
    role: "Редактор направления: SMM",
    tag: "редактор направления",
    photo: "/team/smm-editor.jpg",
    bio: "Практики контент‑маркетинга, методики, инструменты и прикладные кейсы.",
  },
  {
    name: "Красников Владимир Михайлович",
    role: "Редактор направления: IT",
    tag: "редактор направления",
    photo: "/team/it-editor.jpg",
    bio: "Технологии для бизнеса, аналитика и автоматизация.",
  },
];

const PROOFREADER = {
  name: "Мочалова Ольга Борисовна",
  role: "Корректор",
  tag: "редакция",
  photo: "/team/proofreader.jpg",
  bio: "Единый стиль, факт‑чекинг и языковая нормировка материалов.",
};

const CORRESPONDENTS = [
  {
    name: "Ежова Надежда Михайловна",
    role: "Корреспондент",
    tag: "корреспондент",
    photo: "/team/ezhova.jpg",
    bio: "Репортажи, интервью и тексты с площадок отраслевых событий.",
  },
  {
    name: "Кондращук Полина Александровна",
    role: "Корреспондент",
    tag: "корреспондент",
    photo: "/team/kondrashchuk.jpg",
    bio: "Практические кейсы и полевые заметки для PR‑сообщества.",
  },
];

export default function Page() {
  return (
    <main className="mx-auto max-w-[1200px] px-4 pb-16 pt-6 sm:px-6 lg:px-8 sm:pt-8">
      {/* Hero */}
      <header className="mb-10 overflow-hidden rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-white p-5 shadow-sm ring-1 ring-inset ring-white/50 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/60 sm:p-8">
        <div className="mb-5 flex justify-center sm:mb-6">
          <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-white shadow-md ring-1 ring-zinc-200 dark:bg-white dark:ring-zinc-700 sm:h-32 sm:w-32">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="PRIX" className="h-12 w-auto sm:h-14" />
          </div>
        </div>

        <Pill>команда медиа</Pill>
        <h1 className="mt-3 text-[28px] font-bold leading-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Редакция PRIX
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] text-zinc-600 dark:text-zinc-300 sm:text-base">
          Учредитель и главред — рядом. Ниже — редакторы направлений, отдельным блоком корректор и корреспонденты.
        </p>
      </header>

      {/* Founder + Chief Editor */}
      <Section title="Учредитель и главный редактор">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 sm:gap-6">
          {FOUNDER.map((p) => (
            <MemberCard key={p.name} person={p} />
          ))}
          {CHIEF_EDITOR.map((p) => (
            <MemberCard key={p.name} person={p} />
          ))}
        </div>
      </Section>

      {/* Section editors */}
      <Section
        title="Редакторы направлений"
        subtitle="Курируют тематические блоки и отвечают за качество контента в своих рубриках."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 sm:gap-6">
          {SECTION_EDITORS.map((p) => (
            <MemberCard key={p.name} person={p} />
          ))}
        </div>
      </Section>

      {/* Proofreader separate */}
      <Section title="Корректор">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          <MemberCard person={PROOFREADER} />
        </div>
      </Section>

      {/* Correspondents */}
      <Section
        title="Корреспонденты"
        subtitle="Полевые репортажи, интервью и фотоматериалы с площадок."
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
          {CORRESPONDENTS.map((p) => (
            <MemberCard key={p.name} person={p} />
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div className="mt-10 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50 sm:text-lg">
              Хотите сотрудничать с редакцией?
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              Пишите на <Link href="mailto:pitch@prix.press" className="underline underline-offset-4">pitch@prix.press</Link>. Рассматриваем пичи, репортажные заявки и лонгриды.
            </p>
          </div>
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
            <Link
              href="/materials"
              className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Читать материалы
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-800"
            >
              О медиа
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
