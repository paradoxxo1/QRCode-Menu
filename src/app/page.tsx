import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-display text-3xl font-semibold text-coffee">
        QR Menü
      </h1>
      <p className="max-w-sm text-base text-muted">
        Bu sayfa doğrudan görüntülenmek için değildir. Müşteriler şubedeki QR
        kodu okutarak menüye ulaşır.
      </p>
      <Link href="/admin/login">
        <Button>Yönetim paneline git</Button>
      </Link>
    </main>
  );
}
