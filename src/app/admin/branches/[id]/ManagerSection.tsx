"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { FormError } from "@/components/ui/FormError";
import { createManagerAction, toggleManagerActiveAction, deleteManagerAction } from "../actions";

export interface BranchManagerUser {
  id: string;
  email: string;
  isActive: boolean;
}

export function ManagerSection({
  branchId,
  managers,
}: {
  branchId: string;
  managers: BranchManagerUser[];
}) {
  const action = createManagerAction.bind(null, branchId);
  const [error, formAction, isPending] = useActionState(action, undefined);

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {managers.map((manager) => (
          <li
            key={manager.id}
            className="flex items-center justify-between rounded-md border border-border px-3 py-2"
          >
            <span className="text-[14px] text-fg">{manager.email}</span>
            <div className="flex items-center gap-3">
              <Badge variant={manager.isActive ? "success" : "danger"}>
                {manager.isActive ? "Aktif" : "Pasif"}
              </Badge>
              <form
                action={toggleManagerActiveAction.bind(
                  null,
                  manager.id,
                  branchId,
                  !manager.isActive,
                )}
              >
                <button
                  type="submit"
                  className="text-[13px] font-medium text-muted hover:text-fg"
                >
                  {manager.isActive ? "Devre dışı bırak" : "Etkinleştir"}
                </button>
              </form>
              <form
                action={deleteManagerAction.bind(null, manager.id, branchId)}
                onSubmit={(event) => {
                  if (
                    !window.confirm(
                      `"${manager.email}" hesabını kalıcı olarak silmek istediğinize emin misiniz?`,
                    )
                  ) {
                    event.preventDefault();
                  }
                }}
              >
                <button
                  type="submit"
                  className="text-[13px] font-medium text-danger hover:text-danger/80"
                >
                  Sil
                </button>
              </form>
            </div>
          </li>
        ))}
        {managers.length === 0 && (
          <li className="text-[13px] text-muted">Bu şubeye atanmış yönetici yok.</li>
        )}
      </ul>

      <form action={formAction} className="flex flex-col gap-3 border-t border-border pt-4">
        <div>
          <Label htmlFor="managerEmail">Yeni yönetici e-postası</Label>
          <Input id="managerEmail" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="managerPassword">Geçici şifre</Label>
          <Input id="managerPassword" name="password" type="password" required minLength={8} />
        </div>
        <FormError message={error} />
        <Button type="submit" disabled={isPending} className="self-start">
          {isPending ? "Ekleniyor…" : "Yönetici ekle"}
        </Button>
      </form>
    </div>
  );
}
