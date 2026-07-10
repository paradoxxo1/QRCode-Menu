"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { setLocale } from "@/app/menu/actions";
import { CategoryPill } from "@/components/ui/CategoryPill";
import type { Locale } from "@/lib/constants";

export function LanguageSwitcher({ current }: { current: Locale }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleChange(locale: Locale) {
    if (locale === current || isPending) return;
    startTransition(async () => {
      await setLocale(locale);
      router.refresh();
    });
  }

  return (
    <div className="flex shrink-0 gap-2">
      <CategoryPill active={current === "tr"} onClick={() => handleChange("tr")}>
        TR
      </CategoryPill>
      <CategoryPill active={current === "en"} onClick={() => handleChange("en")}>
        EN
      </CategoryPill>
    </div>
  );
}
