import { Card } from "@/components/card";
import { TransactionFilters } from "@/components/transaction-filters";
import { TransactionForm } from "@/components/transaction-form";
import { TransactionsTable } from "@/components/transactions-table";
import { getTransactions } from "@/lib/transactions/queries";
import { formatMonthLabel, getCurrentMonthValue } from "@/lib/utils";

type TransactionsPageProps = {
  searchParams: Promise<{
    month?: string;
    type?: "income" | "expense" | "gifted" | "all";
    error?: string;
    success?: string;
  }>;
};

export default async function TransactionsPage({ searchParams }: TransactionsPageProps) {
  const params = await searchParams;
  const month = params.month ?? getCurrentMonthValue();
  const type = params.type ?? "all";
  const transactions = await getTransactions({ month, type });

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Transactions</p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          {formatMonthLabel(month)}
        </h1>
        <p className="max-w-2xl text-slate-600">
          Add and review every creator transaction in one place, with month and type filters to
          keep things easy to scan.
        </p>
      </section>

      <Card className="space-y-5">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900">Add a transaction</h2>
          <p className="text-sm text-slate-500">New entries appear in your dashboard automatically.</p>
        </div>

        {params.error ? (
          <div className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{params.error}</div>
        ) : null}

        {params.success ? (
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {params.success}
          </div>
        ) : null}

        <TransactionForm />
      </Card>

      <Card className="space-y-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-slate-900">Ledger entries</h2>
            <p className="text-sm text-slate-500">Filter by month and transaction type.</p>
          </div>
          <TransactionFilters month={month} type={type} />
        </div>

        <TransactionsTable transactions={transactions} />
      </Card>
    </div>
  );
}
