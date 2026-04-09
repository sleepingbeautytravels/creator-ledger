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

export function SummaryExportButton({ transactions, from, to }: SummaryExportButtonProps) {
  function handleExport() {
    const income = transactions.filter((entry) => entry.type === "income").reduce((sum, entry) => sum + Number(entry.amount), 0);
    const expenses = transactions.filter((entry) => entry.type === "expense").reduce((sum, entry) => sum + Number(entry.amount), 0);
    const gifted = transactions.filter((entry) => entry.type === "gifted").reduce((sum, entry) => sum + Number(entry.amount), 0);
    const netPosition = income - expenses + gifted;
    const lines = [
      ["section", "label", "income", "expenses", "gifted_value", "net_position_or_overall_value"],
      ["totals", `${from} to ${to}`, income.toFixed(2), expenses.toFixed(2), gifted.toFixed(2), netPosition.toFixed(2)],
      ...summarizeBy(transactions, "brand_or_source").map((summary) => [
        "brand/source",
        summary.label,
        summary.income.toFixed(2),
        summary.expenses.toFixed(2),
        summary.gifted.toFixed(2),
        summary.overallValue.toFixed(2)
      ]),
      ...summarizeBy(transactions, "category").map((summary) => [
        "category",
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
