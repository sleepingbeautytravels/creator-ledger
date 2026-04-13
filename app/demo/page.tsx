import Link from "next/link";
import { Card } from "@/components/card";
import { DarkCtaLink } from "@/components/dark-cta-link";
import { MonthlyNoteCard } from "@/components/monthly-note-card";
import { PaidVsGiftedCard } from "@/components/paid-vs-gifted-card";
import { SummaryCard } from "@/components/summary-card";

const demoSummary = {
  income: 3200,
  expense: 450,
  gifted: 1100,
  netPosition: 3850
};

const brandSummaries = [
  { source: "Chanel", platform: "Instagram", income: "$1,600", gifted: "$400", expenses: "$120", overall: "$1,880" },
  { source: "Mejuri", platform: "Instagram", income: "$900", gifted: "$500", expenses: "$80", overall: "$1,320" },
  { source: "Travel partner", platform: "Website", income: "$700", gifted: "$200", expenses: "$150", overall: "$750" },
  { source: "Tools & hosting", platform: "Website", income: "$0", gifted: "$0", expenses: "$100", overall: "-$100" }
];

const categorySummaries = [
  { category: "Beauty", income: "$1,600", gifted: "$400", expenses: "$120", overall: "$1,880" },
  { category: "Jewellery", income: "$900", gifted: "$500", expenses: "$80", overall: "$1,320" },
  { category: "Travel", income: "$700", gifted: "$200", expenses: "$150", overall: "$750" },
  { category: "Software", income: "$0", gifted: "$0", expenses: "$100", overall: "-$100" }
];

const platformSummaries = [
  { platform: "Instagram", income: "$2,500", gifted: "$900", expenses: "$200", overall: "$3,200" },
  { platform: "Website", income: "$700", gifted: "$200", expenses: "$250", overall: "$650" }
];

export default function DemoPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
      <div className="space-y-12 sm:space-y-14">
        <section className="demo-fade-in flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-5">
            <p className="text-xs font-normal uppercase tracking-[0.28em] text-[var(--muted)]/75">
              OVERVIEW
            </p>
            <div className="space-y-3">
              <p className="inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs tracking-[0.02em] text-[var(--muted)]">
                Demo view — sample data
              </p>
              <h1 className="text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">
                Jan-Apr 2026
              </h1>
              <p className="max-w-3xl text-[15px] leading-7 text-[var(--muted)]/88">
                A range-aware preview of paid work, operational costs, gifted value, and net
                position.
              </p>
              <p className="max-w-3xl text-[15px] leading-7 text-[var(--muted)]/88">
                This sample period shows how paid work, gifted value, and costs sit together in
                one clear view.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-stretch gap-2 pt-8 sm:items-end sm:pt-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <DarkCtaLink href="/auth" className="min-w-[126px]">
                Start tracking
              </DarkCtaLink>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2.5 text-sm text-[var(--foreground)] transition hover:bg-white"
              >
                Back to home
              </Link>
            </div>
            <p className="text-center text-xs text-[var(--muted)]/78 sm:text-right">
              Try it with your own data
            </p>
          </div>
        </section>

        <section className="demo-fade-in grid gap-4 md:grid-cols-2 xl:grid-cols-4" style={{ animationDelay: "80ms" }}>
          <SummaryCard label="Total income" value={demoSummary.income} />
          <SummaryCard label="Total expenses" value={demoSummary.expense} />
          <SummaryCard label="Total gifted value" value={demoSummary.gifted} />
          <SummaryCard
            label="Net position"
            value={demoSummary.netPosition}
            helperText="Income minus expenses, plus gifted value."
          />
        </section>

        <section className="demo-fade-in grid gap-4 md:grid-cols-2" style={{ animationDelay: "140ms" }}>
          <PaidVsGiftedCard income={3200} gifted={1100} />
          <MonthlyNoteCard
            income={demoSummary.income}
            expense={demoSummary.expense}
            gifted={demoSummary.gifted}
            netPosition={demoSummary.netPosition}
          />
        </section>

        <Card className="demo-fade-in space-y-3.5" style={{ animationDelay: "200ms" }}>
          <p className="text-sm font-normal tracking-[0.01em] text-[var(--muted)]/85">Period insight</p>
          <p className="max-w-2xl text-[15px] leading-7 text-[color:rgba(32,28,26,0.82)]">
            Income led this period, with Instagram carrying most paid value and Chanel contributing
            the strongest paid source performance.
          </p>
        </Card>

        <Card className="demo-fade-in space-y-6" style={{ animationDelay: "260ms" }}>
          <div className="space-y-1.5">
            <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">
              Source insights
            </h2>
            <p className="text-sm text-[var(--muted)]">
              A simple read on which sources are shaping the selected period most clearly.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Top income source", "Chanel", "Instagram", "$1,600"],
              ["Top gifted source", "Mejuri", "Instagram", "$500"],
              ["Top overall source", "Chanel", "Instagram", "$2,000"]
            ].map(([label, source, platform, value]) => (
              <div key={label} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
                <p className="text-sm text-[var(--muted)]">{label}</p>
                <p className="mt-3 text-xl font-semibold text-[var(--foreground)]">{source}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{platform}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="demo-fade-in space-y-6" style={{ animationDelay: "320ms" }}>
          <div className="space-y-1.5">
            <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">
              Brand/source summary
            </h2>
            <p className="text-sm text-[var(--muted)]">
              A filtered view of how each source contributes across paid work, gifted value, and costs.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[rgba(120,104,90,0.1)] text-left text-sm">
                <thead className="bg-[rgba(246,241,234,0.72)] text-[var(--muted)]">
                  <tr>
                    <th className="px-5 py-4 font-medium">Brand / Source</th>
                    <th className="px-5 py-4 font-medium">Platform</th>
                    <th className="px-5 py-4 font-medium">Income</th>
                    <th className="px-5 py-4 font-medium">Gifted value</th>
                    <th className="px-5 py-4 font-medium">Expenses</th>
                    <th className="px-5 py-4 font-medium">Overall value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(120,104,90,0.08)]">
                  {brandSummaries.map((summary) => (
                    <tr key={summary.source} className="text-[var(--foreground)]">
                      <td className="px-5 py-4 font-medium">{summary.source}</td>
                      <td className="px-5 py-4 text-[var(--muted)]">{summary.platform}</td>
                      <td className="px-5 py-4">{summary.income}</td>
                      <td className="px-5 py-4">{summary.gifted}</td>
                      <td className="px-5 py-4 text-[var(--muted)]">{summary.expenses}</td>
                      <td className="px-5 py-4 font-medium">{summary.overall}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card className="demo-fade-in space-y-6" style={{ animationDelay: "380ms" }}>
          <div className="space-y-1.5">
            <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">
              Category breakdown
            </h2>
            <p className="text-sm text-[var(--muted)]">
              See how the selected period gathers by creator category, including both value and spend.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {categorySummaries.map((summary) => (
              <div key={summary.category} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
                <p className="text-lg font-semibold text-[var(--foreground)]">{summary.category}</p>
                <p className="mt-3 text-sm text-[var(--muted)]">Income {summary.income}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Gifted {summary.gifted}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Expenses {summary.expenses}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Overall {summary.overall}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="demo-fade-in space-y-6" style={{ animationDelay: "440ms" }}>
          <div className="space-y-1.5">
            <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">
              Platform summary
            </h2>
            <p className="text-sm text-[var(--muted)]">
              A filtered view of how value and costs are distributed across platforms.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[rgba(120,104,90,0.1)] text-left text-sm">
                <thead className="bg-[rgba(246,241,234,0.72)] text-[var(--muted)]">
                  <tr>
                    <th className="px-5 py-4 font-medium">Platform</th>
                    <th className="px-5 py-4 font-medium">Income</th>
                    <th className="px-5 py-4 font-medium">Gifted value</th>
                    <th className="px-5 py-4 font-medium">Expenses</th>
                    <th className="px-5 py-4 font-medium">Overall value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(120,104,90,0.08)]">
                  {platformSummaries.map((summary) => (
                    <tr key={summary.platform} className="text-[var(--foreground)]">
                      <td className="px-5 py-4 font-medium">{summary.platform}</td>
                      <td className="px-5 py-4">{summary.income}</td>
                      <td className="px-5 py-4">{summary.gifted}</td>
                      <td className="px-5 py-4 text-[var(--muted)]">{summary.expenses}</td>
                      <td className="px-5 py-4 font-medium">{summary.overall}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card className="demo-fade-in space-y-4" style={{ animationDelay: "500ms" }}>
          <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">
            Selected period, at a glance
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--muted)]/88">
            This sample period is led by paid work, with gifted value adding useful context rather
            than overshadowing the overall picture. Instagram is doing most of the value-carrying
            work here, while Website activity shows how costs and smaller returns still belong in
            the same view.
          </p>
          <p className="max-w-2xl text-[15px] leading-7 text-[var(--muted)]/88">
            Together, the sections above show how Creator Ledger helps creators read a period more
            clearly without turning it into a heavy report.
          </p>
        </Card>

        <Card className="demo-fade-in mx-auto max-w-2xl space-y-4 text-center" style={{ animationDelay: "560ms" }}>
          <h2 className="text-2xl font-medium text-[color:rgba(32,28,26,0.92)]">
            Support this project
          </h2>
          <p className="mx-auto max-w-xl text-sm leading-6 text-[var(--muted)]">
            If Creator Ledger has been helpful, you’re welcome to support its continued development.
          </p>
          <div className="flex justify-center">
            <SupportButton />
          </div>
          <p className="text-xs text-[var(--muted)]/78">Completely optional.</p>
        </Card>
      </div>
    </main>
  );
}
