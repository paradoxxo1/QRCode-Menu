import Link from "next/link";
import { requireSuperAdminSession } from "@/lib/admin/guards";
import { listBranches } from "@/lib/menu/branches";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { toggleBranchStatusAction, deleteBranchAction } from "./actions";
import { DeleteBranchButton } from "./DeleteBranchButton";

export default async function BranchesPage() {
  await requireSuperAdminSession();
  const branches = await listBranches();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-coffee">Şubeler</h1>
        <Link href="/admin/branches/new">
          <Button>Yeni şube</Button>
        </Link>
      </div>

      <Card className="p-0">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-border text-[13px] text-muted">
              <th className="px-4 py-3 font-medium">Şube</th>
              <th className="px-4 py-3 font-medium">Menü URL</th>
              <th className="px-4 py-3 font-medium">Durum</th>
              <th className="px-4 py-3 font-medium">QR kod</th>
              <th className="px-4 py-3 font-medium"></th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch) => (
              <tr key={branch.id} className="h-14 border-b border-border last:border-0">
                <td className="px-4 py-3">
                  <div className="font-medium text-fg">{branch.name}</div>
                  {branch.address && (
                    <div className="text-[13px] text-muted">{branch.address}</div>
                  )}
                </td>
                <td className="px-4 py-3 font-mono text-[13px] text-muted">
                  /menu/{branch.slug}
                </td>
                <td className="px-4 py-3">
                  <Badge variant={branch.status === "active" ? "success" : "danger"}>
                    {branch.status === "active" ? "Aktif" : "Pasif"}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-3 text-[13px] font-medium">
                    <a
                      href={`/api/branches/${branch.id}/qr?format=png`}
                      className="text-accent hover:text-accent-hover"
                    >
                      PNG
                    </a>
                    <a
                      href={`/api/branches/${branch.id}/qr?format=svg`}
                      className="text-accent hover:text-accent-hover"
                    >
                      SVG
                    </a>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3">
                    <Link
                      href={`/admin/branches/${branch.id}`}
                      className="text-[13px] font-medium text-accent hover:text-accent-hover"
                    >
                      Düzenle
                    </Link>
                    <form
                      action={toggleBranchStatusAction.bind(
                        null,
                        branch.id,
                        branch.status === "active" ? "inactive" : "active",
                      )}
                    >
                      <button
                        type="submit"
                        className="text-[13px] font-medium text-muted hover:text-fg"
                      >
                        {branch.status === "active" ? "Pasife al" : "Aktifleştir"}
                      </button>
                    </form>
                    <DeleteBranchButton
                      action={deleteBranchAction.bind(null, branch.id)}
                      branchName={branch.name}
                    />
                  </div>
                </td>
              </tr>
            ))}
            {branches.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-muted">
                  Henüz şube yok.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
