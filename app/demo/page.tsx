import { Card } from "@/components/card";
import { MonthlyNoteCard } from "@/components/monthly-note-card";
import { PaidVsGiftedCard } from "@/components/paid-vs-gifted-card";
import { SummaryCard } from "@/components/summary-card";
import { SupportButton } from "@/components/support-button";

const demoSummary = {
  income: 3200,
  expense: 450,
  gifted: 1100,
  netPosition: 3850
};

const brandSummaries = [
  { source: "Chanel", income: "$1,600", gifted: "$400", overall: "$2,000" },
  { source: "Mejuri", income: "$900", gifted: "$500", overall: "$1,400" },
  { source: "Travel partner", income: "$700", gifted: "$200", overall: "$900" }
];

const categorySummaries = [
  { category: "Beauty", income: "$1,600", gifted: "$400", expenses: "$120" },
  { category: "Jewellery", income: "$900", gifted: "$500", expenses: "$80" },
  { category: "Travel", income: "$700", gifted: "$200", expenses: "$250" }
];

export default function DemoPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
      <div className="space-y-12 sm:space-y-14">
        <section className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
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
            </div>
          </div>

          <div className="space-y-2 pt-1 sm:pt-2 sm:text-right">
            <SupportButton className="min-w-[116px]" />
            <p className="text-xs text-[var(--muted)]/80">
              Completely optional — if you find this helpful.
            </p>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Total income" value={demoSummary.income} />
          <SummaryCard label="Total expenses" value={demoSummary.expense} />
          <SummaryCard label="Total gifted value" value={demoSummary.gifted} />
          <SummaryCard
            label="Net position"
            value={demoSummary.netPosition}
            helperText="Income minus expenses, plus gifted value."
          />
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <PaidVsGiftedCard income={3200} gifted={1100} />
          <MonthlyNoteCard
            income={demoSummary.income}
            expense={demoSummary.expense}
            gifted={demoSummary.gifted}
            netPosition={demoSummary.netPosition}
          />
        </section>

        <Card className="space-y-3.5">
          <p className="text-sm font-normal tracking-[0.01em] text-[var(--muted)]/85">Period insight</p>
          <p className="max-w-2xl text-[15px] leading-7 text-[color:rgba(32,28,26,0.82)]">
            Income led this period, with Chanel contributing the highest paid value and Jewellery
            adding meaningful gifted context.
          </p>
        </Card>

        <Card className="space-y-6">
          <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">
            Source insights
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["Top income source", "Chanel", "$1,600"],
              ["Top gifted source", "Mejuri", "$500"],
              ["Top overall source", "Chanel", "$2,000"]
            ].map(([label, source, value]) => (
              <div key={label} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
                <p className="text-sm text-[var(--muted)]">{label}</p>
                <p className="mt-3 text-xl font-semibold text-[var(--foreground)]">{source}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">{value}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">
              Brand/source summary
            </h2>
            <p className="text-sm text-[var(--muted)]">
              A simple view of which collaborations are carrying the selected period.
            </p>
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[rgba(120,104,90,0.1)] text-left text-sm">
                <thead className="bg-[rgba(246,241,234,0.72)] text-[var(--muted)]">
                  <tr>
                    <th className="px-5 py-4 font-medium">Brand / Source</th>
                    <th className="px-5 py-4 font-medium">Income</th>
                    <th className="px-5 py-4 font-medium">Gifted value</th>
                    <th className="px-5 py-4 font-medium">Overall value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(120,104,90,0.08)]">
                  {brandSummaries.map((summary) => (
                    <tr key={summary.source} className="text-[var(--foreground)]">
                      <td className="px-5 py-4 font-medium">{summary.source}</td>
                      <td className="px-5 py-4">{summary.income}</td>
                      <td className="px-5 py-4">{summary.gifted}</td>
                      <td className="px-5 py-4 font-medium">{summary.overall}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>

        <Card className="space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">
              Category breakdown
            </h2>
            <p className="text-sm text-[var(--muted)]">
              See how paid, gifted, and operational activity gathers by creator category.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {categorySummaries.map((summary) => (
              <div key={summary.category} className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
                <p className="text-lg font-semibold text-[var(--foreground)]">{summary.category}</p>
                <p className="mt-3 text-sm text-[var(--muted)]">Income {summary.income}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Gifted {summary.gifted}</p>
                <p className="mt-1 text-sm text-[var(--muted)]">Expenses {summary.expenses}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">
            Selected period, at a glance
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--muted)]/88">
            A calm overview of what came in, what went out, and what arrived in kind — across the
            period you choose.
          </p>
        </Card>
      </div>
    </main>
  );
}
