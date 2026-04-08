import { Card } from "@/components/card";
import { MonthlyNoteCard } from "@/components/monthly-note-card";
import { PaidVsGiftedCard } from "@/components/paid-vs-gifted-card";
import { SummaryCard } from "@/components/summary-card";
import { getDashboardSummary } from "@/lib/transactions/queries";
import { formatMonthLabel } from "@/lib/utils";

export default async function DashboardPage() {
  const summary = await getDashboardSummary();

  return (
    <div className="space-y-12 sm:space-y-14">
      <section className="space-y-5">
        <p className="text-xs font-normal uppercase tracking-[0.28em] text-[var(--muted)]/75">OVERVIEW</p>
        <h1 className="text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">
          {formatMonthLabel(summary.month)}
        </h1>
        <p className="max-w-3xl text-[15px] leading-7 text-[var(--muted)]/88">
          A clear snapshot of paid work, operational costs, gifted value, and net profit for the current month.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total income" value={summary.income} />
        <SummaryCard label="Total expenses" value={summary.expense} />
        <SummaryCard label="Total gifted value" value={summary.gifted} />
        <SummaryCard label="Net profit" value={summary.netProfit} />
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <PaidVsGiftedCard income={summary.income} gifted={summary.gifted} />
        <MonthlyNoteCard
          income={summary.income}
          expense={summary.expense}
          gifted={summary.gifted}
          netProfit={summary.netProfit}
        />
      </section>

      <Card>
        <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">This month, at a glance</h2>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--muted)]/88">
          A calm overview of your work this month — what came in, what went out, and what arrived
          in kind. Use this space to stay aware, not overwhelmed.
        </p>
      </Card>
    </div>
  );
}
