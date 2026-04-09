import { AuthFormCard } from "@/components/auth-form-card";
import { Card } from "@/components/card";

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
            A calm home for creator income, expenses, and gifted value.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">
            Track the money behind your content in one clear, private space.
          </p>
        </section>

        <div className="space-y-4 self-center">
          <AuthFormCard initialMessage={params.message} />

          <Card className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">
                Support Creator Ledger
              </h2>
              <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
                If Creator Ledger has been helpful, you can support its ongoing development here.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="https://buymeacoffee.com/sleepingbeautytravels"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-black px-5 py-3 text-sm font-medium text-white no-underline shadow-[0_1px_2px_rgba(32,28,26,0.06)] transition-[background-color,box-shadow] duration-300 ease-out hover:bg-[#1a1a1a] hover:shadow-[0_8px_20px_rgba(32,24,16,0.08)]"
              >
                Support
              </a>

              <a
                href="/demo"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--foreground)] no-underline transition duration-200 hover:bg-white"
              >
                View demo
              </a>
            </div>

            <p className="text-center text-xs text-[var(--muted)]/80">Completely optional.</p>
          </Card>
        </div>
      </div>
    </main>
  );
}
