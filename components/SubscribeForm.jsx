// src/components/SubscribeForm.jsx
"use client";
import { useState } from "react";

export default function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | ok | error
  const [message, setMessage] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Ошибка подписки");
      setStatus("ok");
      setMessage("Готово! Мы получили ваш e-mail.");
      setEmail("");
    } catch (e) {
      setStatus("error");
      setMessage(e.message || "Не удалось отправить. Попробуйте позже.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Ваш e-mail"
        className="flex-1 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {status === "loading" ? "Отправка..." : "Подписаться"}
      </button>
      {message && (
        <span
          className={
            "ml-2 self-center text-sm " +
            (status === "error" ? "text-red-600" : "text-emerald-600")
          }
        >
          {message}
        </span>
      )}
    </form>
  );
}
