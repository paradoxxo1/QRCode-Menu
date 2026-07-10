import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBranchMenu } from "@/lib/menu/read";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/lib/constants";
import { t } from "@/lib/i18n";
import { ProductCard } from "@/components/ui/ProductCard";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { CategoryNav } from "./CategoryNav";

async function resolveLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get("locale")?.value;
  return LOCALES.includes(value as Locale) ? (value as Locale) : DEFAULT_LOCALE;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const menu = await getBranchMenu(slug, DEFAULT_LOCALE);
  return { title: menu ? `${menu.branch.name} — Menü` : "Menü bulunamadı" };
}

export default async function BranchMenuPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await resolveLocale();
  const menu = await getBranchMenu(slug, locale);

  if (!menu) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-surface px-4">
        <h1 className="truncate font-display text-lg font-semibold text-coffee">
          {menu.branch.name}
        </h1>
        <LanguageSwitcher current={locale} />
      </header>

      {menu.categories.length > 0 && (
        <CategoryNav
          categories={menu.categories.map((c) => ({ id: c.id, name: c.name }))}
        />
      )}

      <main className="mx-auto flex max-w-xl flex-col gap-7 px-4 py-5">
        {menu.categories.length === 0 && (
          <p className="py-10 text-center text-[15px] text-muted">
            {t("emptyMenu", locale)}
          </p>
        )}
        {menu.categories.map((category) => (
          <section key={category.id} id={`cat-${category.id}`} className="scroll-mt-28">
            <div className="mb-3">
              <h2 className="font-display text-xl font-semibold text-coffee">
                {category.name}
              </h2>
              <span className="mt-1 block h-0.5 w-8 bg-accent" />
            </div>
            <div className="flex flex-col gap-3">
              {category.products.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  calories={product.calories}
                  imagePath={product.imagePath}
                  soldOut={product.stockStatus === "sold_out"}
                  soldOutLabel={t("soldOut", locale)}
                />
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
