import { BrandSourceSummary } from "@/components/brand-source-summary";
import { BrandSourceDetail } from "@/components/brand-source-detail";
import { Card } from "@/components/card";
import { CategoryBreakdown } from "@/components/category-breakdown";
import { CsvExportButton } from "@/components/csv-export-button";
import { PreviousPeriodComparison } from "@/components/previous-period-comparison";
import { SummaryExportButton } from "@/components/summary-export-button";
import { OnboardingEmptyState } from "@/components/onboarding-empty-state";
import { TransactionFilters } from "@/components/transaction-filters";
import { TransactionInsightSummary } from "@/components/transaction-insight-summary";
import { TransactionForm } from "@/components/transaction-form";
import { TransactionsTable } from "@/components/transactions-table";
import { TopSourceInsights } from "@/components/top-source-insights";
import { getTransactionDateRange, getTransactions, hasTransactions } from "@/lib/transactions/queries";
import { formatRangeHeading, getPreviousPeriodRange } from "@/lib/transactions/periods";
import { getCurrentMonthValue } from "@/lib/utils";
import { Platform } from "@/types/database";
import { YearlyBreakdown } from "@/components/yearly-breakdown";

type TransactionsPageProps = {
  searchParams: Promise<{
    month?: string;
    from?: string;
    to?: string;
    year?: string;
    brand?: string;
    type?: "income" | "expense" | "gifted" | "all";
    platform?: Platform | "all";
    range?: string;
    error?: string;
    success?: string;
  }>;
};

export default async function TransactionsPage({ searchParams }: TransactionsPageProps) {
  const params = await searchParams;
  const month = params.month ?? getCurrentMonthValue();
  const yearRange =
    params.year && !params.from && !params.to
      ? { from: `${params.year}-01-01`, to: `${params.year}-12-31` }
      : {};
  const { start, end } = getTransactionDateRange({
    month,
    from: params.from ?? yearRange.from,
    to: params.to ?? yearRange.to
  });
  const type = params.type ?? "all";
  const platform = params.platform ?? "all";
  const transactions = await getTransactions({ from: start, to: end, type, platform });
  const hasAnyTransactions = await hasTransactions();
  const previousRange = getPreviousPeriodRange(start, end);
  const previousTransactions = await getTransactions({
    from: previousRange.start,
    to: previousRange.end,
    type,
    platform
  });
  const selectedYear = params.year ?? start.slice(0, 4);
  const filterParams = new URLSearchParams();
  filterParams.set("from", start);
  filterParams.set("to", end);
  filterParams.set("type", type);
  if (platform !== "all") {
    filterParams.set("platform", platform);
  }
  if (params.range) {
    filterParams.set("range", params.range);
  }
  if (params.year) {
    filterParams.set("year", params.year);
  }
  const returnToBase = `/transactions?${filterParams.toString()}`;
  const returnTo = `${returnToBase}#ledger-entries`;
  const displayFrom = params.range === "all-time" && start === "1900-01-01" ? "" : start;
  const heading = params.range === "all-time" ? "All time" : formatRangeHeading(start, end, params.range);
  const currentTotals = getTotalsForComparison(transactions);
  const previousTotals = getTotalsForComparison(previousTransactions);

  return (
    <div className="space-y-10 sm:space-y-12">
      <section className="space-y-4">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">TRANSACTIONS</p>
        <h1 className="text-4xl font-semibold text-[var(--foreground)] sm:text-5xl">
          {heading}
        </h1>
        <p className="max-w-3xl leading-7 text-[var(--muted)]">
          Add and review every creator transaction in one place, with simple filters to keep
          things easy to scan.
        </p>
      </section>

      <Card id="add-transaction" className="space-y-6">
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

      <Card id="ledger-entries" className="scroll-mt-24 space-y-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-1.5">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Ledger entries</h2>
            <p className="text-sm text-[var(--muted)]">Filter by date range, type, and platform.</p>
          </div>
          <div className="flex flex-col gap-3 xl:items-end">
            <TransactionFilters
              from={displayFrom}
              to={end}
              type={type}
              platform={platform}
              range={params.range}
              year={params.year}
            />
            <div className="flex flex-col gap-3 sm:flex-row">
              <CsvExportButton transactions={transactions} from={start} to={end} range={params.range} />
              <SummaryExportButton transactions={transactions} from={start} to={end} range={params.range} />
            </div>
          </div>
        </div>

        {!hasAnyTransactions ? (
          <OnboardingEmptyState
            heading="No entries yet."
            body="Add your first transaction to start building a calmer, clearer view of your creator finances."
            ctaLabel="Add transaction"
            href="#add-transaction"
          />
        ) : (
          <TransactionsTable transactions={transactions} returnTo={returnTo} />
        )}
      </Card>

      {hasAnyTransactions ? (
        <>
          <TransactionInsightSummary transactions={transactions} />

          <PreviousPeriodComparison current={currentTotals} previous={previousTotals} />

          <TopSourceInsights transactions={transactions} />

          <BrandSourceSummary transactions={transactions} returnTo={returnToBase} />

          <BrandSourceDetail brand={params.brand} transactions={transactions} />

          <CategoryBreakdown transactions={transactions} />

          <YearlyBreakdown year={selectedYear} transactions={transactions} />
        </>
      ) : null}
    </div>
  );
}

function getTotalsForComparison(transactions: Awaited<ReturnType<typeof getTransactions>>) {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);
  const gifted = transactions
    .filter((transaction) => transaction.type === "gifted")
    .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

  return {
    income,
    expense,
    gifted,
    netPosition: income - expense + gifted
  };
}
