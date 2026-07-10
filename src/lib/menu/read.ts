import { prisma } from "@/lib/prisma";
import type { Locale, StockStatus } from "@/lib/constants";
import { resolveLocalizedText } from "@/lib/menu/locale";
import type { BranchMenu, ResolvedCategory, ResolvedProduct } from "@/lib/menu/types";

/**
 * Resolves a branch's public menu: active categories/products only, ordered
 * by displayOrder, with each product's branch-specific price/stock override
 * applied over the central default, and TR-fallback text resolution.
 *
 * Returns null when the branch doesn't exist or is inactive — callers should
 * render a "menu not found" page in that case (never a broken page).
 */
export async function getBranchMenu(
  slug: string,
  locale: Locale,
): Promise<BranchMenu | null> {
  const branch = await prisma.branch.findUnique({ where: { slug } });
  if (!branch || branch.status !== "active") {
    return null;
  }

  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { displayOrder: "asc" },
    include: {
      products: {
        where: { isActive: true },
        orderBy: { displayOrder: "asc" },
        include: {
          overrides: {
            where: { branchId: branch.id },
            take: 1,
          },
        },
      },
    },
  });

  const resolvedCategories: ResolvedCategory[] = categories
    .map((category) => {
      const products: ResolvedProduct[] = category.products.map((product) => {
        const override = product.overrides[0];
        const price = override?.price ?? product.defaultPrice;
        const stockStatus = (override?.stockStatus ?? "available") as StockStatus;

        return {
          id: product.id,
          name: resolveLocalizedText(product.nameTr, product.nameEn, locale) as string,
          description: resolveLocalizedText(product.descTr, product.descEn, locale),
          imagePath: product.imagePath,
          price: price.toNumber(),
          calories: product.calories,
          hasBranchPrice: override?.price != null,
          stockStatus,
          displayOrder: product.displayOrder,
        };
      });

      return {
        id: category.id,
        name: resolveLocalizedText(category.nameTr, category.nameEn, locale) as string,
        displayOrder: category.displayOrder,
        products,
      };
    })
    // A category with every product filtered out (or none to begin with)
    // would just show an empty heading — leave it off the public menu.
    .filter((category) => category.products.length > 0);

  return {
    branch: { id: branch.id, name: branch.name, slug: branch.slug },
    categories: resolvedCategories,
  };
}
