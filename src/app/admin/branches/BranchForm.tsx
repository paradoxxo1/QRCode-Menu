"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { FormError } from "@/components/ui/FormError";

type BranchFormAction = (
  prevState: string | undefined,
  formData: FormData,
) => Promise<string | undefined>;

export function BranchForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: BranchFormAction;
  defaultValues?: { name: string; address: string | null; phone: string | null };
  submitLabel: string;
}) {
  const [error, formAction, isPending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <Label htmlFor="name">Şube adı</Label>
        <Input id="name" name="name" required defaultValue={defaultValues?.name} />
      </div>
      <div>
        <Label htmlFor="address">Adres</Label>
        <Input id="address" name="address" defaultValue={defaultValues?.address ?? ""} />
      </div>
      <div>
        <Label htmlFor="phone">Telefon</Label>
        <Input id="phone" name="phone" defaultValue={defaultValues?.phone ?? ""} />
      </div>
      <FormError message={error} />
      <Button type="submit" disabled={isPending} className="self-start">
        {isPending ? "Kaydediliyor…" : submitLabel}
      </Button>
    </form>
  );
}
