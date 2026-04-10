import { Card } from "@/components/card";
import { summarizeBy, TransactionRow } from "@/lib/transactions/insights";
import { formatCurrency } from "@/lib/utils";

type PlatformSummaryProps = {
  transactions: TransactionRow[];
};

export function PlatformSummary({ transactions }: PlatformSummaryProps) {
  const summaries = summarizeBy(transactions, "platform").map((summary) => ({
    ...summary,
    label: summary.label || "Not specified"
  }));

  return (
    <Card className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Platform summary</h2>
        <p className="text-sm text-[var(--muted)]">
          A filtered view of how value is distributed across platforms.
        </p>
      </div>

      {summaries.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-500">
          No platform totals to show for this filter yet.
        </div>
      ) : (
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
                {summaries.map((summary) => (
                  <tr key={summary.label} className="text-[var(--foreground)]">
                    <td className="px-5 py-4 font-medium">{summary.label}</td>
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
