import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Dev/test seed: wipe and reinsert, in FK-safe order.
  await prisma.productBranchOverride.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.branch.deleteMany();

  const [kadikoy, besiktas, moda] = await Promise.all([
    prisma.branch.create({
      data: { name: "Kadıköy", slug: "kadikoy", address: "Caferağa Mah., Kadıköy/İstanbul" },
    }),
    prisma.branch.create({
      data: { name: "Beşiktaş", slug: "besiktas", address: "Sinanpaşa Mah., Beşiktaş/İstanbul" },
    }),
    prisma.branch.create({
      data: { name: "Moda", slug: "moda", address: "Moda Cad., Kadıköy/İstanbul" },
    }),
  ]);

  const passwordHash = await bcrypt.hash("ChangeMe123!", 10);

  await prisma.user.create({
    data: {
      email: "admin@qrmenu.local",
      passwordHash,
      role: "super_admin",
      isActive: true,
    },
  });

  await prisma.user.create({
    data: {
      email: "kadikoy@qrmenu.local",
      passwordHash,
      role: "branch_manager",
      branchId: kadikoy.id,
      isActive: true,
    },
  });

  const kahveler = await prisma.category.create({
    data: { nameTr: "Kahveler", nameEn: "Coffee", displayOrder: 1 },
  });
  const tatlilar = await prisma.category.create({
    data: { nameTr: "Tatlılar", nameEn: "Desserts", displayOrder: 2 },
  });
  const sogukIcecekler = await prisma.category.create({
    data: { nameTr: "Soğuk İçecekler", nameEn: "Cold Drinks", displayOrder: 3 },
  });

  const filtreKahve = await prisma.product.create({
    data: {
      nameTr: "Filtre Kahve",
      nameEn: "Filter Coffee",
      descTr: "Günün özel çekirdeğiyle demlenir.",
      descEn: "Brewed with today's single-origin beans.",
      defaultPrice: 95,
      calories: 5,
      categoryId: kahveler.id,
      displayOrder: 1,
    },
  });
  const latte = await prisma.product.create({
    data: {
      nameTr: "Latte",
      nameEn: "Latte",
      descTr: "Espresso ve buharda ısıtılmış süt.",
      descEn: "Espresso with steamed milk.",
      defaultPrice: 120,
      calories: 190,
      categoryId: kahveler.id,
      displayOrder: 2,
    },
  });
  const espresso = await prisma.product.create({
    data: {
      nameTr: "Espresso",
      nameEn: "Espresso",
      descTr: "Yoğun ve aromatik tek shot.",
      descEn: "A bold, aromatic single shot.",
      defaultPrice: 80,
      calories: 5,
      categoryId: kahveler.id,
      displayOrder: 3,
    },
  });

  const cheesecake = await prisma.product.create({
    data: {
      nameTr: "Cheesecake",
      nameEn: "Cheesecake",
      descTr: "Bisküvi tabanlı, kırmızı meyve soslu.",
      descEn: "Biscuit base with red berry sauce.",
      defaultPrice: 150,
      calories: 420,
      categoryId: tatlilar.id,
      displayOrder: 1,
    },
  });
  await prisma.product.create({
    data: {
      nameTr: "Brownie",
      nameEn: "Brownie",
      descTr: "Sıcak servis edilir, isteğe bağlı dondurma ile.",
      descEn: "Served warm, ice cream on request.",
      defaultPrice: 130,
      calories: 380,
      categoryId: tatlilar.id,
      displayOrder: 2,
    },
  });

  // Deliberately no English translation, to exercise the TR fallback.
  await prisma.product.create({
    data: {
      nameTr: "Limonata",
      descTr: "Taze sıkılmış, nane yapraklı.",
      defaultPrice: 90,
      calories: 110,
      categoryId: sogukIcecekler.id,
      displayOrder: 1,
    },
  });

  // Kadıköy: Latte has a branch-specific price; Cheesecake is sold out here.
  await prisma.productBranchOverride.create({
    data: { productId: latte.id, branchId: kadikoy.id, price: 135 },
  });
  await prisma.productBranchOverride.create({
    data: { productId: cheesecake.id, branchId: kadikoy.id, stockStatus: "sold_out" },
  });

  // Beşiktaş: Espresso is sold out here (Kadıköy/Moda still show it available).
  await prisma.productBranchOverride.create({
    data: { productId: espresso.id, branchId: besiktas.id, stockStatus: "sold_out" },
  });

  // Moda intentionally has no overrides — every product falls back to the
  // central default price/stock status.
  void moda;

  console.log("Seed complete.");
  console.log("  super_admin: admin@qrmenu.local / ChangeMe123!");
  console.log("  branch_manager (Kadıköy): kadikoy@qrmenu.local / ChangeMe123!");
  console.log("  Branch menus: /menu/kadikoy, /menu/besiktas, /menu/moda");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
