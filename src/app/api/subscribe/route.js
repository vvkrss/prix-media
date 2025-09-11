// src/app/api/subscribe/route.js
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const last = new Map(); // простой rate-limit по IP

export async function POST(req) {
  try {
    let email = "";
    const contentType = req.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      email = body?.email || "";
    } else if (contentType.includes("application/x-www-form-urlencoded")) {
      const form = await req.formData();
      email = form.get("email") || "";
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Неверный e-mail" }, { status: 400 });
    }

    const ip = req.headers.get("x-forwarded-for") || "local";
    const now = Date.now();
    if (last.has(ip) && now - last.get(ip) < 10_000) {
      return NextResponse.json(
        { error: "Слишком часто. Попробуйте позже." },
        { status: 429 }
      );
    }
    last.set(ip, now);

    const {
      SMTP_HOST,
      SMTP_PORT = "587",
      SMTP_USER,
      SMTP_PASS,
      SMTP_SECURE = "false",
      TO_EMAIL = "media@prixclub.ru",
      FROM_EMAIL = "no-reply@prix.club",
    } = process.env;

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
      console.warn("SMTP env не заданы. Логирую подпись.");
      console.log(`[SUBSCRIBE] ${email} -> ${TO_EMAIL}`);
      return NextResponse.json({ ok: true });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: SMTP_SECURE === "true",
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: "Новая подписка на дайджест PRIX",
      text: `Подписчик: ${email}`,
      html: `<p><b>Подписчик:</b> ${email}</p>`,
    });

    return NextResponse.json({ ok: true, id: info.messageId || null });
  } catch (e) {
    console.error("Subscribe API error:", e);
    return NextResponse.json({ error: "Внутренняя ошибка" }, { status: 500 });
  }
}
