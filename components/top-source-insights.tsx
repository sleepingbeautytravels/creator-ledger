import { Card } from "@/components/card";
import { formatCurrency } from "@/lib/utils";
import { getTopBy, summarizeBy, TransactionRow, ValueSummary } from "@/lib/transactions/insights";

type TopSourceInsightsProps = {
  transactions: TransactionRow[];
};

function InsightMetric({ label, summary, value }: { label: string; summary?: ValueSummary; value?: number }) {
  return (
    <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-3 text-xl font-semibold text-[var(--foreground)]">{summary?.label ?? "Not enough data"}</p>
      <p className="mt-1 text-sm text-[var(--muted)]">{summary ? formatCurrency(value ?? 0) : "Add more entries to see this."}</p>
    </div>
  );
}

export function TopSourceInsights({ transactions }: TopSourceInsightsProps) {
  const summaries = summarizeBy(transactions, "brand_or_source");
  const topIncome = getTopBy(summaries, "income");
  const topGifted = getTopBy(summaries, "gifted");
  const topOverall = getTopBy(summaries, "overallValue");

  return (
    <Card className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Source insights</h2>
        <p className="text-sm text-[var(--muted)]">A quick view of the brands and sources carrying this period.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <InsightMetric label="Top income source" summary={topIncome} value={topIncome?.income} />
        <InsightMetric label="Top gifted source" summary={topGifted} value={topGifted?.gifted} />
        <InsightMetric label="Top overall source" summary={topOverall} value={topOverall?.overallValue} />
      </div>
    </Card>
  );
}
