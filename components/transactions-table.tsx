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
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-5 py-4 font-medium">Date</th>
              <th className="px-5 py-4 font-medium">Type</th>
              <th className="px-5 py-4 font-medium">Category</th>
              <th className="px-5 py-4 font-medium">Brand / Source</th>
              <th className="px-5 py-4 font-medium">Notes</th>
              <th className="px-5 py-4 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="text-slate-700">
                <td className="px-5 py-4">
                  {new Intl.DateTimeFormat("en-AU", { dateStyle: "medium" }).format(
                    new Date(`${transaction.date}T00:00:00`)
                  )}
                </td>
                <td className="px-5 py-4 capitalize">{transaction.type}</td>
                <td className="px-5 py-4">{transaction.category}</td>
                <td className="px-5 py-4">{transaction.brand_or_source}</td>
                <td className="px-5 py-4 text-slate-500">{transaction.notes || "—"}</td>
                <td className="px-5 py-4 font-medium text-slate-900">
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
