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
                April 2026
              </h1>
              <p className="max-w-3xl text-[15px] leading-7 text-[var(--muted)]/88">
                A clear snapshot of paid work, operational costs, gifted value, and net profit for
                the current month.
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

        <Card>
          <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">
            This month, at a glance
          </h2>
          <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--muted)]/88">
            A calm overview of your work this month — what came in, what went out, and what
            arrived in kind. Use this space to stay aware, not overwhelmed.
          </p>
        </Card>
      </div>
    </main>
  );
}
