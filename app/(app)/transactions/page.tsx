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
    <div className="space-y-10 sm:space-y-12">
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">TRANSACTIONS</p>
        <h1 className="text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">
          {formatMonthLabel(month)}
        </h1>
        <p className="max-w-3xl leading-7 text-[var(--muted)]">
          Add and review every creator transaction in one place, with simple filters to keep
          things easy to scan.
        </p>
      </section>

      <Card className="space-y-6">
        <div className="space-y-1.5">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Add a transaction</h2>
          <p className="text-sm text-[var(--muted)]">New entries appear in your dashboard automatically.</p>
        </div>

        {params.error ? (
          <div className="rounded-[1.25rem] bg-rose-50/80 px-4 py-3 text-sm text-rose-700">{params.error}</div>
        ) : null}

        {params.success ? (
          <div className="rounded-[1.25rem] bg-emerald-50/80 px-4 py-3 text-sm text-emerald-700">
            {params.success}
          </div>
        ) : null}

        <TransactionForm />
      </Card>

      <Card className="space-y-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1.5">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Ledger entries</h2>
            <p className="text-sm text-[var(--muted)]">Filter by month and transaction type.</p>
          </div>
          <TransactionFilters month={month} type={type} />
        </div>

        <TransactionsTable transactions={transactions} />
      </Card>
    </div>
  );
}
