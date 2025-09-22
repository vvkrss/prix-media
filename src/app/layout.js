// src/app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"], // кириллица (если субсет поддерживается)
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata = {
  title: {
    default: "PRIX — СМИ о PR, GR, IT и продакшне",
    template: "%s — PRIX",
  },
  description:
    "PRIX — медиа и платформа для экспертов и брендов: PR, GR, IT и продакшн.",
  metadataBase: new URL("https://prix.media"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "PRIX — медиа о PR",
    description: "Публикуем аналитику, кейсы и комментарии экспертов.",
    type: "website",
    url: "https://prix.media",
    siteName: "PRIX",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50`}
      >
        {/* Колонка на всю высоту, чтобы футер прилипал к низу */}
        <div className="flex min-h-screen flex-col">
          <Header /> {/* шапка на всех страницах */}
          <main className="mx-auto max-w-[1200px] flex-1 px-4 sm:px-6 lg:px-8">
            {children}
          </main>
          <Footer /> {/* футер на всех страницах */}
        </div>
      </body>
    </html>
  );
}
