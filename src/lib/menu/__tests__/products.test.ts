import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { createProduct, updateProduct } from "@/lib/menu/products";
import { ValidationError } from "@/lib/menu/errors";
import { resetDb } from "./testUtils";

describe("product management", () => {
  let categoryId: string;

  beforeEach(async () => {
    await resetDb();
    const category = await prisma.category.create({
      data: { nameTr: "Kahveler", displayOrder: 1 },
    });
    categoryId = category.id;
  });

  it("creates a product with valid fields", async () => {
    const product = await createProduct({
      nameTr: "Latte",
      nameEn: "Latte",
      descTr: "Sütlü kahve",
      defaultPrice: 100,
      calories: 190,
      categoryId,
    });

    expect(product.nameTr).toBe("Latte");
    expect(product.defaultPrice.toNumber()).toBe(100);
    expect(product.calories).toBe(190);

    const stored = await prisma.product.findUnique({ where: { id: product.id } });
    expect(stored?.categoryId).toBe(categoryId);
  });

  it("creates a product with no calorie count (optional field)", async () => {
    const product = await createProduct({ nameTr: "Su", defaultPrice: 20, categoryId });
    expect(product.calories).toBeNull();
  });

  it("rejects a negative price", async () => {
    await expect(
      createProduct({ nameTr: "Latte", defaultPrice: -5, categoryId }),
    ).rejects.toThrow(ValidationError);
  });

  it("rejects a negative calorie count", async () => {
    await expect(
      createProduct({ nameTr: "Latte", defaultPrice: 100, calories: -5, categoryId }),
    ).rejects.toThrow(ValidationError);
  });

  it("rejects a blank product name", async () => {
    await expect(
      createProduct({ nameTr: "   ", defaultPrice: 10, categoryId }),
    ).rejects.toThrow(ValidationError);
  });

  it("updates name, description, photo, and translation", async () => {
    const product = await createProduct({ nameTr: "Latte", defaultPrice: 100, categoryId });

    const updated = await updateProduct(product.id, {
      nameTr: "Sütlü Latte",
      nameEn: "Milk Latte",
      descTr: "Yeni açıklama",
      imagePath: "/uploads/products/latte.jpg",
      defaultPrice: 110,
      calories: 200,
      categoryId,
    });

    expect(updated.nameTr).toBe("Sütlü Latte");
    expect(updated.nameEn).toBe("Milk Latte");
    expect(updated.descTr).toBe("Yeni açıklama");
    expect(updated.imagePath).toBe("/uploads/products/latte.jpg");
    expect(updated.defaultPrice.toNumber()).toBe(110);
    expect(updated.calories).toBe(200);
  });
});
