"use server";

import { cookies } from "next/headers";
import { LOCALES, type Locale } from "@/lib/constants";

const LOCALE_COOKIE = "locale";

export async function setLocale(locale: Locale) {
  if (!LOCALES.includes(locale)) {
    return;
  }
  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
