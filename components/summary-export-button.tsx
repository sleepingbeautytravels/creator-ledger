"use client";

import { summarizeBy, TransactionRow } from "@/lib/transactions/insights";

type SummaryExportButtonProps = {
  transactions: TransactionRow[];
  from: string;
  to: string;
};

function escapeCsv(value: string | number) {
  return `"${String(value).replaceAll('"', '""')}"`;
}

function formatExportDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

function formatPeriodLabel(from: string, to: string) {
  return `${formatExportDate(from)} to ${formatExportDate(to)}`;
}

export function SummaryExportButton({ transactions, from, to }: SummaryExportButtonProps) {
  function handleExport() {
    const income = transactions.filter((entry) => entry.type === "income").reduce((sum, entry) => sum + Number(entry.amount), 0);
    const expenses = transactions.filter((entry) => entry.type === "expense").reduce((sum, entry) => sum + Number(entry.amount), 0);
    const gifted = transactions.filter((entry) => entry.type === "gifted").reduce((sum, entry) => sum + Number(entry.amount), 0);
    const netPosition = income - expenses + gifted;
    const brandSummaries = summarizeBy(transactions, "brand_or_source");
    const categorySummaries = summarizeBy(transactions, "category");
    const platformSummaries = summarizeBy(transactions, "platform");
    const lines = [
      ["section", "label", "platform", "income", "expenses", "gifted value", "overall value"],
      ["Totals", formatPeriodLabel(from, to), "", income.toFixed(2), expenses.toFixed(2), gifted.toFixed(2), netPosition.toFixed(2)],
      ...brandSummaries.map((summary) => [
        "Brand / Source",
        summary.label,
        "",
        summary.income.toFixed(2),
        summary.expenses.toFixed(2),
        summary.gifted.toFixed(2),
        summary.overallValue.toFixed(2)
      ]),
      ...categorySummaries.map((summary) => [
        "Category",
        summary.label,
        "",
        summary.income.toFixed(2),
        summary.expenses.toFixed(2),
        summary.gifted.toFixed(2),
        summary.overallValue.toFixed(2)
      ]),
      ...platformSummaries.map((summary) => [
        "Platform",
        "",
        summary.label,
        summary.income.toFixed(2),
        summary.expenses.toFixed(2),
        summary.gifted.toFixed(2),
        summary.overallValue.toFixed(2)
      ])
    ];
    const csv = lines.map((line) => line.map(escapeCsv).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `creator-ledger-summary-${from}-to-${to}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      disabled={transactions.length === 0}
      onClick={handleExport}
      className="inline-flex h-[46px] items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-5 text-sm text-[var(--foreground)] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
    >
      Export summary
    </button>
  );
}
