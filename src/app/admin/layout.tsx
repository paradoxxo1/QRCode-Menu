import Link from "next/link";
import { auth } from "@/auth";
import { logout } from "./actions";
import { AdminNav } from "./AdminNav";

const ROLE_LABELS: Record<string, string> = {
  super_admin: "Genel Admin",
  branch_manager: "Şube Yöneticisi",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-bg">
      <header className="flex h-16 items-center justify-between border-b border-border bg-coffee px-6">
        <Link href="/admin" className="font-display text-lg font-semibold text-surface">
          QR Menü — Yönetim
        </Link>
        {session?.user && (
          <div className="flex items-center gap-4">
            <span className="text-[13px] text-surface/80">
              {session.user.email} ·{" "}
              {ROLE_LABELS[session.user.role] ?? session.user.role}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="rounded-md border border-surface/30 px-3 py-1.5 text-[13px] font-medium text-surface transition-colors hover:bg-surface/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
              >
                Çıkış yap
              </button>
            </form>
          </div>
        )}
      </header>
      {session?.user && <AdminNav isSuperAdmin={session.user.role === "super_admin"} />}
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
    </div>
  );
}
