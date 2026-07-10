import type { Locale } from "@/lib/constants";

// Small TR/EN dictionary for UI chrome text (product/category names and
// descriptions come from the database and use resolveLocalizedText instead).
const dictionary = {
  soldOut: { tr: "Tükendi", en: "Sold out" },
  emptyMenu: {
    tr: "Bu şube için henüz menü öğesi eklenmedi.",
    en: "No menu items have been added for this branch yet.",
  },
} as const;

export function t(key: keyof typeof dictionary, locale: Locale): string {
  return dictionary[key][locale];
}
