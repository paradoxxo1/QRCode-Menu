import { notFound } from "next/navigation";
import { requireSuperAdminSession } from "@/lib/admin/guards";
import { getBranchById } from "@/lib/menu/branches";
import { listUsersByBranch } from "@/lib/admin/users";
import { getQrPreviewDataUrl, buildMenuUrl } from "@/lib/qr";
import { Card } from "@/components/ui/Card";
import { BranchForm } from "../BranchForm";
import { updateBranchAction } from "../actions";
import { ManagerSection } from "./ManagerSection";

export default async function EditBranchPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireSuperAdminSession();
  const { id } = await params;
  const branch = await getBranchById(id);
  if (!branch) {
    notFound();
  }

  const [qrDataUrl, managers] = await Promise.all([
    getQrPreviewDataUrl(branch.slug),
    listUsersByBranch(branch.id),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-display text-2xl font-semibold text-coffee">
        Şubeyi düzenle
      </h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="mb-4 text-[17px] font-semibold text-fg">Şube bilgileri</h2>
          <BranchForm
            action={updateBranchAction.bind(null, branch.id)}
            defaultValues={branch}
            submitLabel="Kaydet"
          />
        </Card>

        <Card className="flex flex-col items-start gap-3 p-6">
          <h2 className="text-[17px] font-semibold text-fg">QR kod</h2>
          <p className="font-mono text-[13px] text-muted">{buildMenuUrl(branch.slug)}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrDataUrl}
            alt={`${branch.name} menü QR kodu`}
            className="h-40 w-40 rounded-md border border-border bg-surface p-2"
          />
          <div className="flex gap-3">
            <a
              href={`/api/branches/${branch.id}/qr?format=png`}
              className="rounded-md border border-border px-3 py-1.5 text-[13px] font-medium text-fg hover:bg-surface-2"
            >
              PNG indir
            </a>
            <a
              href={`/api/branches/${branch.id}/qr?format=svg`}
              className="rounded-md border border-border px-3 py-1.5 text-[13px] font-medium text-fg hover:bg-surface-2"
            >
              SVG indir
            </a>
          </div>
        </Card>

        <Card className="p-6 lg:col-span-2">
          <h2 className="mb-4 text-[17px] font-semibold text-fg">Şube yöneticileri</h2>
          <ManagerSection branchId={branch.id} managers={managers} />
        </Card>
      </div>
    </div>
  );
}
