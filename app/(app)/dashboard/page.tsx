import { Card } from "@/components/card";
import { MonthlyNoteCard } from "@/components/monthly-note-card";
import { PaidVsGiftedCard } from "@/components/paid-vs-gifted-card";
import { RangeShortcuts } from "@/components/range-shortcuts";
import { SummaryCard } from "@/components/summary-card";
import { OnboardingEmptyState } from "@/components/onboarding-empty-state";
import { getDashboardSummary, hasTransactions } from "@/lib/transactions/queries";
import { formatRangeHeading } from "@/lib/transactions/periods";
import { getCurrentMonthValue } from "@/lib/utils";

type DashboardPageProps = {
  searchParams: Promise<{
    from?: string;
    to?: string;
    range?: string;
  }>;
};

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const params = await searchParams;
  const summary = await getDashboardSummary({
    month: getCurrentMonthValue(),
    from: params.from,
    to: params.to
  });
  const hasAnyTransactions = await hasTransactions();
  const heading = formatRangeHeading(summary.start, summary.end, params.range);

  return (
    <div className="space-y-12 sm:space-y-14">
      <section className="space-y-5">
        <p className="text-xs font-normal uppercase tracking-[0.28em] text-[var(--muted)]/75">OVERVIEW</p>
        <h1 className="text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">
          {heading}
        </h1>
        <p className="max-w-3xl text-[15px] leading-7 text-[var(--muted)]/88">
          A clear snapshot of paid work, operational costs, gifted value, and net position for the selected period.
        </p>
        <RangeShortcuts basePath="/dashboard" from={summary.start} to={summary.end} />
      </section>

      {!hasAnyTransactions ? (
        <OnboardingEmptyState
          heading="You haven’t added any entries yet."
          body="Start by logging your first paid, gifted, or expense entry to begin building a clearer picture of your work."
          ctaLabel="Add your first transaction"
          href="/transactions"
        />
      ) : (
        <>
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <SummaryCard label="Total income" value={summary.income} />
            <SummaryCard label="Total expenses" value={summary.expense} />
            <SummaryCard label="Total gifted value" value={summary.gifted} />
            <SummaryCard
              label="Net position"
              value={summary.netPosition}
              helperText="Income minus expenses, plus gifted value."
            />
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            <PaidVsGiftedCard income={summary.income} gifted={summary.gifted} />
            <MonthlyNoteCard
              income={summary.income}
              expense={summary.expense}
              gifted={summary.gifted}
              netPosition={summary.netPosition}
            />
          </section>

          <Card>
            <h2 className="text-xl font-medium text-[color:rgba(32,28,26,0.92)]">This month, at a glance</h2>
            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--muted)]/88">
              A calm overview of your work this month — what came in, what went out, and what arrived
              in kind. Use this space to stay aware, not overwhelmed.
            </p>
          </Card>
        </>
      )}
    </div>
  );
}
