// app/(site)/about/page.js (или app/about/page.js)
export const metadata = {
  title: "О нас",
  description: "PRIX — первое профильное медиа о PR: миссия, политика публикаций и контакты."
};

function Pill({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-sm font-medium text-zinc-700 shadow-sm backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300">
      {children}
    </span>
  );
}

function Stat({ kpi, label }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="text-2xl font-semibold leading-none tracking-tight">{kpi}</div>
      <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{label}</div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Hero */}
      <header className="mb-10">
        <Pill>PRIX — медиа и платформа</Pill>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">О нас</h1>
        <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-300">
          Мы публикуем аналитические материалы, колонки, кейсы и комментарии экспертов из сфер PR, GR, IT и продакшна. Наша цель — соединять бизнес и аудиторию через сильные истории и проверенные факты.
        </p>
      </header>

      {/* KPI */}
      <section className="mb-10">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat kpi="24/7" label="редакционная работа и выпуск материалов" />
          <Stat kpi="> 50" label="экспертов и авторов в пуле" />
          <Stat kpi="4 направления" label="PR · GR · IT · Продакшн" />
        </div>
      </section>

      {/* Политика */}
      <section className="mb-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="text-xl font-semibold">Редакционная политика</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-zinc-700 marker:text-zinc-400 dark:text-zinc-300">
          <li>Факты первичны: проверка источников, ссылки на данные и методологию.</li>
          <li>Экспертность авторов подтверждается кейсами, релевантными ролями и публичной деятельностью.</li>
          <li>Конфликт интересов раскрывается в явном виде.</li>
          <li>Материалы, созданные при поддержке партнёров, маркируются как спецпроекты.</li>
        </ul>
      </section>

      {/* Что мы публикуем */}
      <section className="mb-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold">Что мы публикуем</h3>
        <ol className="mt-4 list-decimal space-y-2 pl-5 text-zinc-700 marker:text-zinc-400 dark:text-zinc-300">
          <li>Аналитику рынков, трендов и коммуникационных стратегий.</li>
          <li>Кейсы и разборы: цели, гипотезы, процессы, метрики, выводы.</li>
          <li>Авторские колонки лидеров индустрии и приглашённых экспертов.</li>
          <li>Новости и дайджесты с ценностью для практиков.</li>
        </ol>
      </section>

      {/* Как попасть в медиа */}
      <section className="mb-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold">Как отправить материал</h3>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-zinc-700 marker:text-zinc-400 dark:text-zinc-300">
          <li>
            <span className="font-medium">Тема и ценность:</span> кратко объясните, какую практическую проблему решает материал и для кого.
          </li>
          <li>
            <span className="font-medium">Фактура и источники:</span> приложите данные, графики, ссылки и права на медиа.
          </li>
          <li>
            <span className="font-medium">Формат:</span> колонка (6–8 тыс. знаков) · кейс (структура: вводные — гипотезы — процесс — метрики — выводы) · аналитика.
          </li>
          <li>
            <span className="font-medium">Дистрибуция:</span> OG/TG-превью, рассылка, социальные сети и партнёрские площадки.
          </li>
        </ol>
      </section>

      {/* Контакты */}
      <section className="mb-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="text-lg font-semibold">Контакты</h3>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300">
          Партнёрства и спецпроекты: <a className="underline underline-offset-4 hover:opacity-80" href="mailto:hello@prix.media">hello@prix.media</a>
        </p>
      </section>
    </main>
  );
}