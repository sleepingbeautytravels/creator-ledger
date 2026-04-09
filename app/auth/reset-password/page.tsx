import { ResetPasswordForm } from "@/components/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 sm:py-16">
      <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <section className="flex flex-col justify-center space-y-7 py-4 lg:py-10">
          <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">CREATOR LEDGER</p>
          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.02] text-[var(--foreground)] sm:text-6xl">
            A calm home for creator income, expenses, and gifted value.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">
            Reset your password and return to your account in one clear, private space.
          </p>
        </section>

        <div className="self-center">
          <ResetPasswordForm />
        </div>
      </div>
    </main>
  );
}
