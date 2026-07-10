"use client";

import { useActionState, useState, type ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Label, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FormError } from "@/components/ui/FormError";

type ProductFormAction = (
  prevState: string | undefined,
  formData: FormData,
) => Promise<string | undefined>;

export interface ProductFormDefaults {
  nameTr: string;
  nameEn: string | null;
  descTr: string | null;
  descEn: string | null;
  imagePath: string | null;
  defaultPrice: number;
  calories: number | null;
  categoryId: string;
  displayOrder: number;
}

export function ProductForm({
  action,
  categories,
  defaultValues,
  submitLabel,
}: {
  action: ProductFormAction;
  categories: { id: string; nameTr: string }[];
  defaultValues?: ProductFormDefaults;
  submitLabel: string;
}) {
  const [error, formAction, isPending] = useActionState(action, undefined);
  const [preview, setPreview] = useState<string | null>(defaultValues?.imagePath ?? null);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setPreview(file ? URL.createObjectURL(file) : (defaultValues?.imagePath ?? null));
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nameTr">Ürün adı (Türkçe)</Label>
          <Input id="nameTr" name="nameTr" required defaultValue={defaultValues?.nameTr} />
        </div>
        <div>
          <Label htmlFor="nameEn">Product name (English)</Label>
          <Input id="nameEn" name="nameEn" defaultValue={defaultValues?.nameEn ?? ""} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="descTr">Açıklama (Türkçe)</Label>
          <Textarea id="descTr" name="descTr" defaultValue={defaultValues?.descTr ?? ""} />
        </div>
        <div>
          <Label htmlFor="descEn">Description (English)</Label>
          <Textarea id="descEn" name="descEn" defaultValue={defaultValues?.descEn ?? ""} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="defaultPrice">Varsayılan fiyat (₺)</Label>
          <Input
            id="defaultPrice"
            name="defaultPrice"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={defaultValues?.defaultPrice}
          />
        </div>
        <div>
          <Label htmlFor="calories">Kalori (kcal)</Label>
          <Input
            id="calories"
            name="calories"
            type="number"
            step="1"
            min="0"
            placeholder="İsteğe bağlı"
            defaultValue={defaultValues?.calories ?? ""}
          />
        </div>
        <div>
          <Label htmlFor="categoryId">Kategori</Label>
          <Select
            id="categoryId"
            name="categoryId"
            required
            defaultValue={defaultValues?.categoryId}
          >
            <option value="" disabled>
              Kategori seçin
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nameTr}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="image">Ürün fotoğrafı</Label>
          {preview && (
            // Blob preview URLs can't go through next/image's optimizer.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt=""
              className="mb-2 h-20 w-20 rounded-sm border border-border object-cover"
            />
          )}
          <input
            id="image"
            name="image"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="block w-full text-[13px] text-muted file:mr-3 file:h-9 file:rounded-md file:border file:border-border file:bg-surface file:px-3 file:text-[13px] file:font-medium file:text-fg file:hover:bg-surface-2"
          />
          <input type="hidden" name="currentImagePath" value={defaultValues?.imagePath ?? ""} />
          <p className="mt-1 text-[13px] text-muted">JPG, PNG veya WEBP · en fazla 5MB.</p>
        </div>
        <div>
          <Label htmlFor="displayOrder">Sıra</Label>
          <Input
            id="displayOrder"
            name="displayOrder"
            type="number"
            defaultValue={defaultValues?.displayOrder ?? 0}
          />
        </div>
      </div>

      <FormError message={error} />
      <Button type="submit" disabled={isPending} className="self-start">
        {isPending ? "Kaydediliyor…" : submitLabel}
      </Button>
    </form>
  );
}
