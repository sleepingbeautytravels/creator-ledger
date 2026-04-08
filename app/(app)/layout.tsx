import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "@/app/(auth)/auth/actions";
import { Button } from "@/components/button";
import { createClient } from "@/lib/supabase/server";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-[var(--border)] bg-[rgba(251,247,242,0.78)] backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">CREATOR LEDGER</p>
            <p className="mt-1 text-sm text-[var(--muted)]">{user.email}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <nav className="flex items-center gap-1.5 rounded-full bg-[var(--surface)] p-1.5 ring-1 ring-[var(--border)]">
              <Link
                href="/dashboard"
                className="rounded-full px-4 py-2 text-sm text-[var(--foreground)] transition hover:bg-white/80"
              >
                Dashboard
              </Link>
              <Link
                href="/transactions"
                className="rounded-full px-4 py-2 text-sm text-[var(--foreground)] transition hover:bg-white/80"
              >
                Transactions
              </Link>
            </nav>

            <form action={signOut}>
              <Button type="submit" variant="secondary">
                Log out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:py-12">{children}</main>
    </div>
  );
}
