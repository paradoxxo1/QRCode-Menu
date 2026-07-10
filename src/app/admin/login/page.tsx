import { Card } from "@/components/ui/Card";
import { LoginForm } from "./LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const { callbackUrl } = await searchParams;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-bg px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center font-display text-2xl font-semibold text-coffee">
          Yönetim Paneli
        </h1>
        <Card className="p-6">
          <LoginForm callbackUrl={callbackUrl} />
        </Card>
      </div>
    </main>
  );
}
