import { Card } from "@/components/card";
import { formatCurrency } from "@/lib/utils";
import { Database } from "@/types/database";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];

type BrandSourceSummaryProps = {
  transactions: Transaction[];
  returnTo?: string;
};

type BrandSummary = {
  brandOrSource: string;
  income: number;
  gifted: number;
  expenses: number;
  overallValue: number;
};

function getBrandSummaries(transactions: Transaction[]) {
  const summaries = transactions.reduce<Record<string, BrandSummary>>((accumulator, transaction) => {
    const brandOrSource = transaction.brand_or_source.trim() || "Unspecified";

    if (!accumulator[brandOrSource]) {
      accumulator[brandOrSource] = {
        brandOrSource,
        income: 0,
        gifted: 0,
        expenses: 0,
        overallValue: 0
      };
    }

    const amount = Number(transaction.amount);

    if (transaction.type === "income") {
      accumulator[brandOrSource].income += amount;
    }

    if (transaction.type === "gifted") {
      accumulator[brandOrSource].gifted += amount;
    }

    if (transaction.type === "expense") {
      accumulator[brandOrSource].expenses += amount;
    }

    accumulator[brandOrSource].overallValue =
      accumulator[brandOrSource].income + accumulator[brandOrSource].gifted;

    return accumulator;
  }, {});

  return Object.values(summaries).sort((a, b) => b.overallValue - a.overallValue);
}

export function BrandSourceSummary({ transactions, returnTo = "/transactions" }: BrandSourceSummaryProps) {
  const summaries = getBrandSummaries(transactions);

  return (
    <Card className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Brand/source summary</h2>
        <p className="text-sm text-[var(--muted)]">
          A filtered view of where paid and gifted value is coming from.
        </p>
      </div>

      {summaries.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-500">
          No brand/source totals to show for this filter yet.
        </div>
      ) : (
        <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[rgba(120,104,90,0.1)] text-left text-sm">
              <thead className="bg-[rgba(246,241,234,0.72)] text-[var(--muted)]">
                <tr>
                  <th className="px-5 py-4 font-medium">Brand / Source</th>
                  <th className="px-5 py-4 font-medium">Income</th>
                  <th className="px-5 py-4 font-medium">Gifted value</th>
                  <th className="px-5 py-4 font-medium">Expenses</th>
                  <th className="px-5 py-4 font-medium">Overall value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[rgba(120,104,90,0.08)]">
                {summaries.map((summary) => (
                  <tr key={summary.brandOrSource} className="text-[var(--foreground)]">
                    <td className="px-5 py-4 font-medium">
                      <a
                        href={`${returnTo}&brand=${encodeURIComponent(summary.brandOrSource)}`}
                        className="underline decoration-[rgba(120,104,90,0.25)] underline-offset-4 transition hover:decoration-[rgba(120,104,90,0.7)]"
                      >
                        {summary.brandOrSource}
                      </a>
                    </td>
                    <td className="px-5 py-4">{formatCurrency(summary.income)}</td>
                    <td className="px-5 py-4">{formatCurrency(summary.gifted)}</td>
                    <td className="px-5 py-4 text-[var(--muted)]">{formatCurrency(summary.expenses)}</td>
                    <td className="px-5 py-4 font-medium">{formatCurrency(summary.overallValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}
