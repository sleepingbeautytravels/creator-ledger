import { formatCurrency } from "@/lib/utils";
import { Database } from "@/types/database";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];

type TransactionsTableProps = {
  transactions: Transaction[];
};

export function TransactionsTable({ transactions }: TransactionsTableProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-500">
        No transactions found for this filter yet.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)] shadow-[0_8px_20px_rgba(32,24,16,0.025)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[rgba(120,104,90,0.1)] text-left text-sm">
          <thead className="bg-[rgba(246,241,234,0.72)] text-[var(--muted)]">
            <tr>
              <th className="px-5 py-4 font-medium">Date</th>
              <th className="px-5 py-4 font-medium">Type</th>
              <th className="px-5 py-4 font-medium">Category</th>
              <th className="px-5 py-4 font-medium">Brand / Source</th>
              <th className="px-5 py-4 font-medium">Notes</th>
              <th className="px-5 py-4 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(120,104,90,0.08)]">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="text-[var(--foreground)]">
                <td className="px-5 py-4">
                  {new Intl.DateTimeFormat("en-AU", { dateStyle: "medium" }).format(
                    new Date(`${transaction.date}T00:00:00`)
                  )}
                </td>
                <td className="px-5 py-4 capitalize">{transaction.type}</td>
                <td className="px-5 py-4">{transaction.category}</td>
                <td className="px-5 py-4">{transaction.brand_or_source}</td>
                <td className="px-5 py-4 text-[var(--muted)]">{transaction.notes || "—"}</td>
                <td className="px-5 py-4 font-medium text-[var(--foreground)]">
                  {formatCurrency(Number(transaction.amount))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
