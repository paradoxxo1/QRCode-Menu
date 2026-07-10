"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { FormError } from "@/components/ui/FormError";

type CategoryFormAction = (
  prevState: string | undefined,
  formData: FormData,
) => Promise<string | undefined>;

export function CategoryForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: CategoryFormAction;
  defaultValues?: { nameTr: string; nameEn: string | null; displayOrder: number };
  submitLabel: string;
}) {
  const [error, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="nameTr">Kategori adı (Türkçe)</Label>
        <Input
          id="nameTr"
          name="nameTr"
          required
          defaultValue={defaultValues?.nameTr}
        />
      </div>
      <div>
        <Label htmlFor="nameEn">Category name (English)</Label>
        <Input id="nameEn" name="nameEn" defaultValue={defaultValues?.nameEn ?? ""} />
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
      <FormError message={error} />
      <Button type="submit" disabled={isPending} className="self-start">
        {isPending ? "Kaydediliyor…" : submitLabel}
      </Button>
    </form>
  );
}
