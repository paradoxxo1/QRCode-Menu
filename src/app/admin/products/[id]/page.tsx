import { notFound } from "next/navigation";
import { requireSuperAdminSession } from "@/lib/admin/guards";
import { getProductById } from "@/lib/menu/products";
import { listCategories } from "@/lib/menu/categories";
import { Card } from "@/components/ui/Card";
import { ProductForm } from "../ProductForm";
import { updateProductAction } from "../actions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSuperAdminSession();
  const { id } = await params;
  const [product, categories] = await Promise.all([getProductById(id), listCategories()]);
  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-2xl font-semibold text-coffee">Ürünü düzenle</h1>
      <Card className="max-w-2xl p-6">
        <ProductForm
          action={updateProductAction.bind(null, id)}
          categories={categories}
          defaultValues={{ ...product, defaultPrice: product.defaultPrice.toNumber() }}
          submitLabel="Kaydet"
        />
      </Card>
    </div>
  );
}
