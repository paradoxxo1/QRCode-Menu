import { prisma } from "@/lib/prisma";
import { ValidationError } from "@/lib/menu/errors";
import { overrideInputSchema, type OverrideInput } from "@/lib/menu/schemas";
import type { StockStatus } from "@/lib/constants";

/**
 * Creates or updates a branch's override for a product. Only the fields
 * present in `input` are changed; omitted fields keep their current value
 * (or the schema default) when the override row is first created.
 */
export async function setBranchOverride(input: OverrideInput) {
  const parsed = overrideInputSchema.safeParse(input);
  if (!parsed.success) {
    throw new ValidationError(parsed.error.issues[0]?.message ?? "Geçersiz fiyat/stok bilgisi.");
  }
  const { productId, branchId, price, stockStatus } = parsed.data;

  return prisma.productBranchOverride.upsert({
    where: { productId_branchId: { productId, branchId } },
    create: {
      productId,
      branchId,
      price: price ?? null,
      stockStatus: stockStatus ?? "available",
    },
    update: {
      ...(price !== undefined ? { price } : {}),
      ...(stockStatus !== undefined ? { stockStatus } : {}),
    },
  });
}

/** Removes the branch's override entirely — price and stock both revert to the central default. */
export async function clearBranchOverride(productId: string, branchId: string) {
  await prisma.productBranchOverride
    .delete({ where: { productId_branchId: { productId, branchId } } })
    .catch(() => {
      // Already absent — clearing a non-existent override is a no-op.
    });
}

export async function setStockStatus(
  productId: string,
  branchId: string,
  stockStatus: StockStatus,
) {
  return setBranchOverride({ productId, branchId, stockStatus });
}

export async function listBranchOverrides(branchId: string) {
  return prisma.productBranchOverride.findMany({ where: { branchId } });
}
