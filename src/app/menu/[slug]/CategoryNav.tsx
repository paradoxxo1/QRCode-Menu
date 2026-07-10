"use client";

import { useEffect, useRef, useState } from "react";
import { CategoryPill } from "@/components/ui/CategoryPill";

export function CategoryNav({
  categories,
}: {
  categories: { id: string; name: string }[];
}) {
  const [activeId, setActiveId] = useState(categories[0]?.id);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) {
          setActiveId(visible.target.id.replace("cat-", ""));
        }
      },
      { rootMargin: "-120px 0px -70% 0px", threshold: 0 },
    );

    categories.forEach((category) => {
      const el = document.getElementById(`cat-${category.id}`);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [categories]);

  function scrollToCategory(id: string) {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document.getElementById(`cat-${id}`)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  return (
    <nav className="scrollbar-hidden sticky top-14 z-10 flex gap-2 overflow-x-auto border-b border-border bg-bg px-4 py-2">
      {categories.map((category) => (
        <CategoryPill
          key={category.id}
          active={category.id === activeId}
          onClick={() => scrollToCategory(category.id)}
        >
          {category.name}
        </CategoryPill>
      ))}
    </nav>
  );
}
