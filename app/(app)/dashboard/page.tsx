import { Card } from "@/components/card";
import { SummaryCard } from "@/components/summary-card";
import { getDashboardSummary } from "@/lib/transactions/queries";
import { formatMonthLabel } from "@/lib/utils";

export default async function DashboardPage() {
  const summary = await getDashboardSummary();

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Overview</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          {formatMonthLabel(summary.month)}
        </h1>
        <p className="max-w-2xl text-slate-600">
          A quick snapshot of income, costs, gifted value, and profit for the current month.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Total income" value={summary.income} />
        <SummaryCard label="Total expenses" value={summary.expense} />
        <SummaryCard label="Total gifted value" value={summary.gifted} />
        <SummaryCard label="Net profit" value={summary.netProfit} />
      </section>

      <Card>
        <h2 className="text-xl font-semibold text-slate-900">How to use this month</h2>
        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Use the transactions page to log paid work, operational costs, and gifted items. The
          dashboard updates automatically from your entries and stays scoped to your account.
        </p>
      </Card>
    </div>
  );
}
