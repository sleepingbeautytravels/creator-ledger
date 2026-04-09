import { Card } from "@/components/card";
import { formatCurrency } from "@/lib/utils";

type ComparisonSummary = {
  income: number;
  expense: number;
  gifted: number;
  netPosition: number;
};

type PreviousPeriodComparisonProps = {
  current: ComparisonSummary;
  previous: ComparisonSummary;
};

function ComparisonItem({ label, current, previous }: { label: string; current: number; previous: number }) {
  const difference = current - previous;
  const direction = difference === 0 ? "No change" : difference > 0 ? "Increase" : "Decrease";

  return (
    <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-3 text-xl font-semibold text-[var(--foreground)]">{formatCurrency(current)}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">
        {direction}: {formatCurrency(Math.abs(difference))}
      </p>
    </div>
  );
}

export function PreviousPeriodComparison({ current, previous }: PreviousPeriodComparisonProps) {
  const hasPrevious = previous.income > 0 || previous.expense > 0 || previous.gifted > 0;

  return (
    <Card className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Previous-period comparison</h2>
        <p className="text-sm text-[var(--muted)]">
          Compared with the immediately previous equivalent date range.
        </p>
      </div>

      {!hasPrevious ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-500">
          No previous-period entries to compare yet.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <ComparisonItem label="Income" current={current.income} previous={previous.income} />
          <ComparisonItem label="Expenses" current={current.expense} previous={previous.expense} />
          <ComparisonItem label="Gifted value" current={current.gifted} previous={previous.gifted} />
          <ComparisonItem label="Net position" current={current.netPosition} previous={previous.netPosition} />
        </div>
      )}
    </Card>
  );
}
