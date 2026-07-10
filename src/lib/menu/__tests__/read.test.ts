import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { getBranchMenu } from "@/lib/menu/read";
import { setBranchOverride, clearBranchOverride } from "@/lib/menu/overrides";
import { resetDb } from "./testUtils";

describe("getBranchMenu", () => {
  let branchAId: string;
  let branchBId: string;
  let categoryId: string;
  let productId: string;

  beforeEach(async () => {
    await resetDb();

    const [branchA, branchB] = await Promise.all([
      prisma.branch.create({ data: { name: "Şube A", slug: "sube-a" } }),
      prisma.branch.create({ data: { name: "Şube B", slug: "sube-b" } }),
    ]);
    branchAId = branchA.id;
    branchBId = branchB.id;

    const category = await prisma.category.create({
      data: { nameTr: "Kahveler", nameEn: "Coffee", displayOrder: 1 },
    });
    categoryId = category.id;

    const product = await prisma.product.create({
      data: {
        nameTr: "Filtre Kahve",
        nameEn: "Filter Coffee",
        defaultPrice: 100,
        calories: 5,
        categoryId,
        displayOrder: 1,
      },
    });
    productId = product.id;
  });

  it("returns the central default price and available stock when no override exists", async () => {
    const menu = await getBranchMenu("sube-a", "tr");
    const product = menu?.categories[0]?.products[0];

    expect(product?.price).toBe(100);
    expect(product?.stockStatus).toBe("available");
    expect(product?.hasBranchPrice).toBe(false);
    expect(product?.calories).toBe(5);
  });

  it("applies a branch override price without affecting other branches", async () => {
    await setBranchOverride({ productId, branchId: branchAId, price: 135 });

    const menuA = await getBranchMenu("sube-a", "tr");
    expect(menuA?.categories[0]?.products[0]?.price).toBe(135);
    expect(menuA?.categories[0]?.products[0]?.hasBranchPrice).toBe(true);

    const menuB = await getBranchMenu("sube-b", "tr");
    expect(menuB?.categories[0]?.products[0]?.price).toBe(100);
    expect(menuB?.categories[0]?.products[0]?.hasBranchPrice).toBe(false);
  });

  it("reflects a sold-out override on that branch's menu only", async () => {
    await setBranchOverride({ productId, branchId: branchAId, stockStatus: "sold_out" });

    const menuA = await getBranchMenu("sube-a", "tr");
    expect(menuA?.categories[0]?.products[0]?.stockStatus).toBe("sold_out");

    const menuB = await getBranchMenu("sube-b", "tr");
    expect(menuB?.categories[0]?.products[0]?.stockStatus).toBe("available");
  });

  it("reverts to the central default once an override is cleared", async () => {
    await setBranchOverride({ productId, branchId: branchAId, price: 135, stockStatus: "sold_out" });
    await clearBranchOverride(productId, branchAId);

    const menuA = await getBranchMenu("sube-a", "tr");
    expect(menuA?.categories[0]?.products[0]?.price).toBe(100);
    expect(menuA?.categories[0]?.products[0]?.stockStatus).toBe("available");
  });

  it("falls back to the Turkish name when the selected locale has no translation", async () => {
    await prisma.product.create({
      data: { nameTr: "Limonata", defaultPrice: 90, categoryId, displayOrder: 2 },
    });

    const menuEn = await getBranchMenu("sube-a", "en");
    const names = menuEn?.categories[0]?.products.map((p) => p.name) ?? [];

    expect(names).toContain("Filter Coffee"); // has an EN translation
    expect(names).toContain("Limonata"); // no EN translation -> TR fallback
  });

  it("returns null for an inactive branch or an unknown slug", async () => {
    await prisma.branch.update({ where: { id: branchAId }, data: { status: "inactive" } });

    expect(await getBranchMenu("sube-a", "tr")).toBeNull();
    expect(await getBranchMenu("does-not-exist", "tr")).toBeNull();
  });
});
