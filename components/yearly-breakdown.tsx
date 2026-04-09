import { Card } from "@/components/card";
import { TransactionRow } from "@/lib/transactions/insights";
import { formatCurrency } from "@/lib/utils";

type YearlyBreakdownProps = {
  year: string;
  transactions: TransactionRow[];
};

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function YearlyBreakdown({ year, transactions }: YearlyBreakdownProps) {
  const rows = monthLabels.map((label, index) => {
    const month = String(index + 1).padStart(2, "0");
    const monthTransactions = transactions.filter((transaction) => transaction.date.startsWith(`${year}-${month}`));
    const income = monthTransactions.filter((transaction) => transaction.type === "income").reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    const expenses = monthTransactions.filter((transaction) => transaction.type === "expense").reduce((sum, transaction) => sum + Number(transaction.amount), 0);
    const gifted = monthTransactions.filter((transaction) => transaction.type === "gifted").reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    return {
      label,
      income,
      expenses,
      gifted,
      netPosition: income - expenses + gifted
    };
  });

  return (
    <Card className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">Yearly view</h2>
        <p className="text-sm text-[var(--muted)]">A month-by-month view for {year}.</p>
      </div>

      <div className="overflow-hidden rounded-[1.75rem] border border-[var(--border)] bg-[var(--surface-strong)]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[rgba(120,104,90,0.1)] text-left text-sm">
            <thead className="bg-[rgba(246,241,234,0.72)] text-[var(--muted)]">
              <tr>
                <th className="px-5 py-4 font-medium">Month</th>
                <th className="px-5 py-4 font-medium">Income</th>
                <th className="px-5 py-4 font-medium">Expenses</th>
                <th className="px-5 py-4 font-medium">Gifted value</th>
                <th className="px-5 py-4 font-medium">Net position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[rgba(120,104,90,0.08)]">
              {rows.map((row) => (
                <tr key={row.label} className="text-[var(--foreground)]">
                  <td className="px-5 py-4 font-medium">{row.label}</td>
                  <td className="px-5 py-4">{formatCurrency(row.income)}</td>
                  <td className="px-5 py-4 text-[var(--muted)]">{formatCurrency(row.expenses)}</td>
                  <td className="px-5 py-4">{formatCurrency(row.gifted)}</td>
                  <td className="px-5 py-4 font-medium">{formatCurrency(row.netPosition)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
