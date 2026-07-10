import Link from "next/link";
import { auth } from "@/auth";
import { Card } from "@/components/ui/Card";

export default async function AdminHomePage() {
  const session = await auth();
  const isSuperAdmin = session?.user.role === "super_admin";

  const links = isSuperAdmin
    ? [
        { href: "/admin/categories", label: "Kategoriler", desc: "Kategori ekle, düzenle, sırala." },
        { href: "/admin/products", label: "Ürünler", desc: "Ürün ekle, düzenle, yayından kaldır." },
        { href: "/admin/overrides", label: "Fiyat & Stok", desc: "Şube bazlı fiyat ve stok yönetimi." },
        { href: "/admin/branches", label: "Şubeler", desc: "Şube ekle, QR kod üret ve indir." },
      ]
    : [
        { href: "/admin/overrides", label: "Fiyat & Stok", desc: "Şubenizin fiyat ve stok bilgisini güncelleyin." },
      ];

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-display text-2xl font-semibold text-coffee">Hoş geldiniz</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            <Card className="h-full transition-colors hover:bg-surface-2">
              <h2 className="text-[17px] font-semibold text-fg">{link.label}</h2>
              <p className="mt-1 text-[13px] text-muted">{link.desc}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
