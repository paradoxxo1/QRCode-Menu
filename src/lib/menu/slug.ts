import { prisma } from "@/lib/prisma";

const TURKISH_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",
};

export function slugify(name: string): string {
  const transliterated = name
    .split("")
    .map((char) => TURKISH_MAP[char] ?? char)
    .join("");

  return transliterated
    .normalize("NFD")
    .replace(/\p{Mark}/gu, "") // strip remaining accents
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Appends -2, -3, … until the slug is unique among branches (optionally excluding one branch, for updates). */
export async function generateUniqueBranchSlug(
  name: string,
  excludeBranchId?: string,
): Promise<string> {
  const base = slugify(name) || "sube";
  let candidate = base;
  let suffix = 2;

  while (
    await prisma.branch.findFirst({
      where: { slug: candidate, ...(excludeBranchId ? { id: { not: excludeBranchId } } : {}) },
    })
  ) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }

  return candidate;
}
