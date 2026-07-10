import type { Locale } from "@/lib/constants";

/** Falls back to the Turkish text whenever the requested locale has no translation. */
export function resolveLocalizedText(
  tr: string | null,
  en: string | null | undefined,
  locale: Locale,
): string | null {
  if (locale === "en" && en && en.trim().length > 0) {
    return en;
  }
  return tr;
}
