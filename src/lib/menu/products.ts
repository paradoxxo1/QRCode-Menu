import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { ValidationError } from "@/lib/menu/errors";
import { productInputSchema, type ProductInput } from "@/lib/menu/schemas";

/** Prisma's raw "foreign key constraint failed" (P2003) is not something a user can act on. */
function rethrowAsCategoryNotFound(error: unknown): never {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
    throw new ValidationError(
      "Seçilen kategori artık mevcut değil. Sayfayı yenileyip tekrar deneyin.",
    );
  }
  throw error;
}

export async function createProduct(input: ProductInput) {
  const parsed = productInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues[0]?.message ?? "Geçersiz ürün.");
  }
  const {
    nameTr,
    nameEn,
    descTr,
    descEn,
    imagePath,
    defaultPrice,
    calories,
    categoryId,
    displayOrder,
  } = parsed.data;

  try {
    return await prisma.product.create({
      data: {
        nameTr,
        nameEn: nameEn || null,
        descTr: descTr || null,
        descEn: descEn || null,
        imagePath: imagePath || null,
        defaultPrice,
        calories: calories ?? null,
        categoryId,
        displayOrder: displayOrder ?? 0,
      },
    });
  } catch (error) {
    rethrowAsCategoryNotFound(error);
  }
}

export async function updateProduct(id: string, input: ProductInput) {
  const parsed = productInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues[0]?.message ?? "Geçersiz ürün.");
  }
  const {
    nameTr,
    nameEn,
    descTr,
    descEn,
    imagePath,
    defaultPrice,
    calories,
    categoryId,
    displayOrder,
  } = parsed.data;

  try {
    return await prisma.product.update({
      where: { id },
      data: {
        nameTr,
        nameEn: nameEn || null,
        descTr: descTr || null,
        descEn: descEn || null,
        imagePath: imagePath || null,
        defaultPrice,
        calories: calories ?? null,
        categoryId,
        ...(displayOrder !== undefined ? { displayOrder } : {}),
      },
    });
  } catch (error) {
    rethrowAsCategoryNotFound(error);
  }
}

export async function setProductPublished(id: string, isActive: boolean) {
  return prisma.product.update({ where: { id }, data: { isActive } });
}

export async function listProducts() {
  return prisma.product.findMany({
    orderBy: [{ categoryId: "asc" }, { displayOrder: "asc" }],
    include: { category: true },
  });
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({ where: { id } });
}
