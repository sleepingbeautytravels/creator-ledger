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
      <header className="border-b border-slate-200/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Creator Ledger</p>
            <p className="mt-1 text-sm text-slate-600">{user.email}</p>
          </div>

          <div className="flex items-center gap-3">
            <nav className="flex items-center gap-2 rounded-full bg-white/80 p-1 ring-1 ring-slate-200">
              <Link
                href="/dashboard"
                className="rounded-full px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
              >
                Dashboard
              </Link>
              <Link
                href="/transactions"
                className="rounded-full px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
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

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
