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
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
      <div className="grid w-full gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="flex flex-col justify-center space-y-6">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Creator Ledger</p>
          <h1 className="max-w-xl text-5xl font-semibold leading-tight tracking-tight text-slate-900">
            A calm home for creator income, expenses, and gifted value.
          </h1>
          <p className="max-w-lg text-lg leading-8 text-slate-600">
            Track the money behind brand work in a simple ledger designed for focus, not clutter.
          </p>
        </section>

        <Card className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-900">Welcome back</h2>
            <p className="text-sm leading-6 text-slate-500">
              Sign in to continue, or create an account to start tracking your creator finances.
            </p>
          </div>

          {params.message ? (
            <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600">
              {params.message}
            </div>
          ) : null}

          <form action={signIn} className="space-y-4">
            <label className="block space-y-2 text-sm text-slate-600">
              <span>Email</span>
              <input
                required
                type="email"
                name="email"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
              />
            </label>

            <label className="block space-y-2 text-sm text-slate-600">
              <span>Password</span>
              <input
                required
                type="password"
                name="password"
                minLength={6}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" className="flex-1">
                Log in
              </Button>
              <Button formAction={signUp} variant="secondary" className="flex-1">
                Sign up
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
