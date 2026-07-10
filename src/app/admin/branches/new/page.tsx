import { requireSuperAdminSession } from "@/lib/admin/guards";
import { Card } from "@/components/ui/Card";
import { BranchForm } from "../BranchForm";
import { createBranchAction } from "../actions";

export default async function NewBranchPage() {
  await requireSuperAdminSession();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-2xl font-semibold text-coffee">Yeni şube</h1>
      <Card className="max-w-md p-6">
        <BranchForm action={createBranchAction} submitLabel="Oluştur" />
      </Card>
      <p className="max-w-md text-[13px] text-muted">
        Şube oluşturulduğunda menü adresi ve QR kodu otomatik üretilir; QR
        kodunu şube listesinden indirebilirsiniz.
      </p>
    </div>
  );
}
