import { AuthFormCard } from "@/components/auth-form-card";
import { Card } from "@/components/card";
import { SupportCardActions } from "@/components/support-card-actions";

type AuthPageProps = {
  searchParams: Promise<{
    message?: string;
  }>;
};

export default async function AuthPage({ searchParams }: AuthPageProps) {
  const params = await searchParams;

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 sm:py-16">
      <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <section className="flex flex-col justify-center space-y-7 py-4 lg:py-10">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">CREATOR LEDGER</p>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] text-[var(--foreground)] sm:text-6xl">
            A calm financial lens for creators.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">
            Creator Ledger brings quiet clarity to your income, expenses, and gifted work — so you
            can understand what your work is truly worth.
          </p>
        </section>

        <div className="space-y-4 self-center">
          <AuthFormCard initialMessage={params.message} />

          <Card className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">
                Support this project
              </h2>
              <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
                If Creator Ledger has been helpful, you’re welcome to support its continued development.
              </p>
            </div>

            <SupportCardActions />

            <p className="text-center text-xs text-[var(--muted)]/80">Completely optional.</p>
          </Card>
        </div>
      </div>
    </main>
  );
}
