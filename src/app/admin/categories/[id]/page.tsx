import { notFound } from "next/navigation";
import { requireSuperAdminSession } from "@/lib/admin/guards";
import { getCategoryById } from "@/lib/menu/categories";
import { Card } from "@/components/ui/Card";
import { CategoryForm } from "../CategoryForm";
import { updateCategoryAction } from "../actions";

export default async function EditCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSuperAdminSession();
  const { id } = await params;
  const category = await getCategoryById(id);
  if (!category) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-2xl font-semibold text-coffee">
        Kategoriyi düzenle
      </h1>
      <Card className="max-w-md p-6">
        <CategoryForm
          action={updateCategoryAction.bind(null, id)}
          defaultValues={category}
          submitLabel="Kaydet"
        />
      </Card>
    </div>
  );
}
