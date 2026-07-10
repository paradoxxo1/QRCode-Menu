import { describe, it, expect, beforeEach } from "vitest";
import { prisma } from "@/lib/prisma";
import { createCategory, updateCategory } from "@/lib/menu/categories";
import { ValidationError } from "@/lib/menu/errors";
import { resetDb } from "./testUtils";

describe("category management", () => {
  beforeEach(resetDb);

  it("creates a category with valid fields", async () => {
    const category = await createCategory({
      nameTr: "Kahveler",
      nameEn: "Coffee",
      displayOrder: 1,
    });

    expect(category.nameTr).toBe("Kahveler");
    expect(category.nameEn).toBe("Coffee");
    expect(category.displayOrder).toBe(1);

    const stored = await prisma.category.findUnique({ where: { id: category.id } });
    expect(stored?.nameTr).toBe("Kahveler");
  });

  it("rejects a blank Turkish name", async () => {
    await expect(createCategory({ nameTr: "   " })).rejects.toThrow(ValidationError);
  });

  it("updates a category's name and translation", async () => {
    const category = await createCategory({ nameTr: "Kahveler" });

    const updated = await updateCategory(category.id, {
      nameTr: "Sıcak İçecekler",
      nameEn: "Hot Drinks",
    });

    expect(updated.nameTr).toBe("Sıcak İçecekler");
    expect(updated.nameEn).toBe("Hot Drinks");
  });
});
