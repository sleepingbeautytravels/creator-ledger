import { signIn, signUp } from "@/app/(auth)/auth/actions";
import { Button } from "@/components/button";
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
          <Card className="space-y-7">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-[var(--foreground)]">Welcome back</h2>
              <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
                Sign in to continue, or create an account to start tracking your creator finances.
              </p>
            </div>

            {params.message ? (
              <div className="rounded-[1.25rem] bg-[rgba(246,241,234,0.88)] px-4 py-3 text-sm text-[var(--muted)]">
                {params.message}
              </div>
            ) : null}

            <form action={signIn} className="space-y-5">
              <label className="block space-y-2.5 text-sm text-[var(--muted)]">
                <span>Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  className="w-full rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3.5 text-[var(--foreground)] outline-none transition focus:border-[#8b7868]"
                />
              </label>

              <label className="block space-y-2.5 text-sm text-[var(--muted)]">
                <span>Password</span>
                <input
                  required
                  type="password"
                  name="password"
                  minLength={6}
                  className="w-full rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3.5 text-[var(--foreground)] outline-none transition focus:border-[#8b7868]"
                />
              </label>

              <div className="flex flex-col gap-3 pt-1 sm:flex-row">
                <Button type="submit" className="flex-1">
                  Log in
                </Button>
                <Button formAction={signUp} variant="secondary" className="flex-1">
                  Sign up
                </Button>
              </div>

              <p className="pt-1 text-center text-sm text-[var(--muted)]/85">
                Already purchased? Sign in above.
              </p>
            </form>
          </Card>

          <Card className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">Get access</h2>
              <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
                Purchase Creator Ledger for $9 and start using the dashboard.
              </p>
            </div>

            <a
              href="https://buy.stripe.com/28E9AT0143GneVn43J2VG00"
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#000000",
                color: "#ffffff",
                padding: "12px 20px",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none"
              }}
            >
              Get access for $9
            </a>

            <a
              href="/demo"
              className="inline-flex items-center justify-center self-start rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--foreground)] no-underline transition duration-200 hover:bg-white"
            >
              View demo
            </a>

            <p className="text-center text-xs text-[var(--muted)]/80">Secure checkout via Stripe.</p>
          </Card>
        </div>
      </div>
    </main>
  );
}
