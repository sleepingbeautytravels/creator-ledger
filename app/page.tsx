import Link from "next/link";
import { Card } from "@/components/card";
import { DarkCtaLink } from "@/components/dark-cta-link";
import { SupportButton } from "@/components/support-button";

const proofPoints = [
  "Track paid, gifted, and operational costs",
  "Review value by brand, category, or period",
  "Export clean summaries when needed"
];

const valueCards = [
  {
    title: "Paid vs gifted clarity",
    body: "See how paid work and gifted value sit together across a selected period."
  },
  {
    title: "Brand-by-brand visibility",
    body: "Understand which sources are creating meaningful value for your work."
  },
  {
    title: "Flexible date ranges",
    body: "Review any period, from year to date to all time or a custom window."
  },
  {
    title: "Clean exports",
    body: "Download simple CSVs and summaries when you need to share the picture."
  }
];

const steps = [
  {
    label: "Step 1",
    title: "Log your activity"
  },
  {
    label: "Step 2",
    title: "Review the period"
  },
  {
    label: "Step 3",
    title: "Make clearer decisions"
  }
];

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
      <header className="mb-10 flex items-center justify-between gap-4">
        <Link href="/" className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
          CREATOR LEDGER
        </Link>
        <nav className="flex items-center gap-4 text-sm text-[var(--muted)]">
          <Link href="/about" className="transition hover:text-[var(--foreground)]">
            About
          </Link>
          <Link href="/demo" className="transition hover:text-[var(--foreground)]">
            Demo
          </Link>
        </nav>
      </header>

      <section className="grid min-h-[78vh] items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">CREATOR LEDGER</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] text-[var(--foreground)] sm:text-7xl">
              A calm financial lens for creators.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
              Creator Ledger brings quiet clarity to your income, expenses, and gifted work — so
              you can understand what your work is truly worth.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <DarkCtaLink href="/auth">Start tracking</DarkCtaLink>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-5 py-3 text-sm text-[var(--foreground)] no-underline transition hover:bg-white"
            >
              View demo
            </Link>
          </div>
        </div>

        <Card className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-[var(--muted)]">Selected period</p>
            <h2 className="text-3xl font-semibold text-[var(--foreground)]">Year to date</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              ["Income", "$8,420"],
              ["Expenses", "$1,240"],
              ["Gifted value", "$2,850"],
              ["Net position", "$10,030"]
            ].map(([label, value]) => (
              <div key={label} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
                <p className="text-sm text-[var(--muted)]">{label}</p>
                <p className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-[1.5rem] border border-[var(--border)] bg-[rgba(246,241,234,0.72)] p-5">
            <p className="text-sm leading-6 text-[var(--muted)]">
              Income led this period, with brand work and gifted value sitting clearly beside the
              costs behind it.
            </p>
          </div>
        </Card>
      </section>

      <section className="grid gap-3 border-y border-[var(--border)] py-6 md:grid-cols-3">
        {proofPoints.map((point) => (
          <p key={point} className="text-sm leading-6 text-[var(--muted)]">
            {point}
          </p>
        ))}
      </section>

      <section className="grid gap-8 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
        <div className="space-y-4">
          <h2 className="text-4xl font-semibold text-[var(--foreground)]">See the full picture, quietly.</h2>
          <p className="max-w-xl leading-7 text-[var(--muted)]">
            Track what came in, what went out, and what arrived in kind — in one clear private
            space.
          </p>
        </div>

        <Card className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4 text-sm text-[var(--muted)]">
            <span>Brand/source summary</span>
            <span>Filtered view</span>
          </div>
          {[
            ["Chanel", "$3,200", "$740"],
            ["Mejuri", "$1,450", "$1,100"],
            ["Travel partner", "$2,000", "$0"]
          ].map(([source, income, gifted]) => (
            <div key={source} className="grid grid-cols-3 gap-4 rounded-[1.25rem] bg-[var(--surface-strong)] p-4 text-sm">
              <span className="font-medium text-[var(--foreground)]">{source}</span>
              <span className="text-[var(--muted)]">Income {income}</span>
              <span className="text-[var(--muted)]">Gifted {gifted}</span>
            </div>
          ))}
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {valueCards.map((card) => (
          <Card key={card.title} className="space-y-3">
            <h3 className="text-xl font-medium text-[var(--foreground)]">{card.title}</h3>
            <p className="text-sm leading-6 text-[var(--muted)]">{card.body}</p>
          </Card>
        ))}
      </section>

      <section className="py-16 lg:py-20">
        <Card className="space-y-4">
          <h2 className="text-4xl font-semibold text-[var(--foreground)]">Not accounting software. Creator clarity.</h2>
          <p className="max-w-3xl leading-7 text-[var(--muted)]">
            A quieter way to understand what your work is actually worth — across paid work,
            gifted value, and the costs behind it.
          </p>
        </Card>
      </section>

      <section className="space-y-6">
        <h2 className="text-4xl font-semibold text-[var(--foreground)]">How it works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.label} className="space-y-3">
              <p className="text-xs uppercase tracking-[0.22em] text-[var(--muted)]">{step.label}</p>
              <h3 className="text-2xl font-medium text-[var(--foreground)]">{step.title}</h3>
            </Card>
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <Card className="mx-auto max-w-2xl space-y-4 text-center">
          <h2 className="text-3xl font-semibold text-[var(--foreground)]">Support this project</h2>
          <p className="mx-auto max-w-xl text-sm leading-6 text-[var(--muted)]">
            If Creator Ledger has been helpful, you’re welcome to support its continued development.
          </p>
          <div className="flex justify-center">
            <SupportButton />
          </div>
          <p className="text-xs text-[var(--muted)]/75">Built slowly, and shared openly.</p>
          <p className="text-xs text-[var(--muted)]/80">
            Free to use. If it’s helpful, you can support the project.
          </p>
        </Card>
      </section>

      <section className="space-y-6 pb-8 text-center">
        <h2 className="text-4xl font-semibold text-[var(--foreground)]">A calmer way to track creator finances.</h2>
        <p className="mx-auto max-w-2xl text-[15px] leading-7 text-[var(--muted)]">
          A simple record of your work — kept clearly, carried with you, and ready when needed.
        </p>
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <DarkCtaLink href="/auth">Start tracking</DarkCtaLink>
          <Link
            href="/demo"
            className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-5 py-3 text-sm text-[var(--foreground)] no-underline transition hover:bg-white"
          >
            View demo
          </Link>
        </div>
      </section>

      <footer className="space-y-3 border-t border-[var(--border)] pt-6 text-center text-sm text-[var(--muted)]">
        <nav className="flex justify-center gap-5">
          <Link href="/about" className="transition hover:text-[var(--foreground)]">
            About
          </Link>
          <Link href="/demo" className="transition hover:text-[var(--foreground)]">
            Demo
          </Link>
          <a
            href="https://buymeacoffee.com/sleepingbeautytravels"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-[var(--foreground)]"
          >
            Support
          </a>
        </nav>
        <p className="text-xs text-[var(--muted)]/80">
          Built with care for creators. Designed for clarity, not complexity. For tax and
          compliance matters, please consult a professional.
        </p>
      </footer>
    </main>
  );
}
