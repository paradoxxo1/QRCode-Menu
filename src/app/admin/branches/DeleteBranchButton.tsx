"use client";

import { useActionState } from "react";
import { FormError } from "@/components/ui/FormError";

type DeleteBranchAction = (
  prevState: string | undefined,
  formData: FormData,
) => Promise<string | undefined>;

export function DeleteBranchButton({
  action,
  branchName,
}: {
  action: DeleteBranchAction;
  branchName: string;
}) {
  const [error, formAction, isPending] = useActionState(action, undefined);

  return (
    <div className="flex flex-col items-end gap-1">
      <form
        action={formAction}
        onSubmit={(event) => {
          if (
            !window.confirm(
              `"${branchName}" şubesini silmek istediğinize emin misiniz? Bu şube bir daha listede görünmeyecek.`,
            )
          ) {
            event.preventDefault();
          }
        }}
      >
        <button
          type="submit"
          disabled={isPending}
          className="text-[13px] font-medium text-danger hover:text-danger/80 disabled:opacity-40"
        >
          Sil
        </button>
      </form>
      <FormError message={error} />
    </div>
  );
}
