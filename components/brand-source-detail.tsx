import { Card } from "@/components/card";
import { formatCurrency } from "@/lib/utils";
import { TransactionRow } from "@/lib/transactions/insights";

type BrandSourceDetailProps = {
  brand?: string;
  transactions: TransactionRow[];
};

export function BrandSourceDetail({ brand, transactions }: BrandSourceDetailProps) {
  if (!brand) {
    return null;
  }

  const brandTransactions = transactions.filter((transaction) => transaction.brand_or_source === brand);
  const income = brandTransactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  const gifted = brandTransactions
    .filter((transaction) => transaction.type === "gifted")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  const expenses = brandTransactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  const overallValue = income + gifted;

  return (
    <Card className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">{brand}</h2>
        <p className="text-sm text-[var(--muted)]">A focused view of this brand/source for the selected period.</p>
      </div>

      {brandTransactions.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-500">
          No transactions found for this brand/source in the selected period.
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <Metric label="Income" value={income} />
            <Metric label="Gifted value" value={gifted} />
            <Metric label="Expenses" value={expenses} />
            <Metric label="Overall value" value={overallValue} />
            <Metric label="Transactions" value={brandTransactions.length} isCount />
          </div>

          <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[rgba(120,104,90,0.1)] text-left text-sm">
                <thead className="bg-[rgba(246,241,234,0.72)] text-[var(--muted)]">
                  <tr>
                    <th className="px-5 py-4 font-medium">Date</th>
                    <th className="px-5 py-4 font-medium">Type</th>
                    <th className="px-5 py-4 font-medium">Category</th>
                    <th className="px-5 py-4 font-medium">Notes</th>
                    <th className="px-5 py-4 font-medium">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(120,104,90,0.08)]">
                  {brandTransactions.map((transaction) => (
                    <tr key={transaction.id} className="text-[var(--foreground)]">
                      <td className="px-5 py-4">{transaction.date}</td>
                      <td className="px-5 py-4 capitalize">{transaction.type}</td>
                      <td className="px-5 py-4">{transaction.category}</td>
                      <td className="px-5 py-4 text-[var(--muted)]">{transaction.notes || "-"}</td>
                      <td className="px-5 py-4 font-medium">{formatCurrency(Number(transaction.amount))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </Card>
  );
}

function Metric({ label, value, isCount = false }: { label: string; value: number; isCount?: boolean }) {
  return (
    <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--surface-strong)] p-5">
      <p className="text-sm text-[var(--muted)]">{label}</p>
      <p className="mt-3 text-xl font-semibold text-[var(--foreground)]">
        {isCount ? value : formatCurrency(value)}
      </p>
    </div>
  );
}
