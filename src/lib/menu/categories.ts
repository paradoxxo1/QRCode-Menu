import { prisma } from "@/lib/prisma";
import { ValidationError } from "@/lib/menu/errors";
import { categoryInputSchema, type CategoryInput } from "@/lib/menu/schemas";

export async function createCategory(input: CategoryInput) {
  const parsed = categoryInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues[0]?.message ?? "Geçersiz kategori.");
  }
  const { nameTr, nameEn, displayOrder } = parsed.data;

  return prisma.category.create({
    data: {
      nameTr,
      nameEn: nameEn || null,
      displayOrder: displayOrder ?? 0,
    },
  });
}

export async function updateCategory(id: string, input: CategoryInput) {
  const parsed = categoryInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues[0]?.message ?? "Geçersiz kategori.");
  }
  const { nameTr, nameEn, displayOrder } = parsed.data;

  return prisma.category.update({
    where: { id },
    data: {
      nameTr,
      nameEn: nameEn || null,
      ...(displayOrder !== undefined ? { displayOrder } : {}),
    },
  });
}

export async function setCategoryActive(id: string, isActive: boolean) {
  return prisma.category.update({ where: { id }, data: { isActive } });
}

export async function listCategories() {
  return prisma.category.findMany({ orderBy: { displayOrder: "asc" } });
}

export async function getCategoryById(id: string) {
  return prisma.category.findUnique({ where: { id } });
}
