import Link from "next/link";
import { Card } from "@/components/ui/Card";

export default function BranchMenuNotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-bg px-6 text-center">
      <h1 className="font-display text-2xl font-semibold text-coffee">
        Menü bulunamadı
      </h1>
      <Card className="max-w-sm p-6">
        <p className="text-[15px] text-fg">
          Bu QR koda ait bir menü bulunamadı. Şube kaldırılmış veya adres
          hatalı olabilir.
        </p>
      </Card>
      <Link
        href="/"
        className="text-[13px] font-medium text-accent hover:text-accent-hover"
      >
        Ana sayfaya dön
      </Link>
    </main>
  );
}
