"use client";

import { Database } from "@/types/database";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];

type CsvExportButtonProps = {
  transactions: Transaction[];
  from: string;
  to: string;
  range?: string;
};

function escapeCsvValue(value: string | number | null) {
  const normalized = value === null ? "" : String(value);
  return `"${normalized.replaceAll('"', '""')}"`;
}

function formatExportDate(date: string) {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(`${date}T00:00:00`));
}

function getSignedAmount(transaction: Transaction) {
  const amount = Number(transaction.amount);

  return transaction.type === "expense" ? -amount : amount;
}

function getExportFileSuffix(from: string, to: string, range?: string) {
  return range === "all-time" ? "all-time" : `${from}-to-${to}`;
}

function createCsv(transactions: Transaction[]) {
  const headers = [
    "Date",
    "Type",
    "Category",
    "Platform",
    "Brand / Source",
    "Notes",
    "Amount",
    "Running overall position"
  ];
  let runningOverallPosition = 0;
  const rows = transactions.map((transaction) => {
    const signedAmount = getSignedAmount(transaction);
    runningOverallPosition += signedAmount;

    return [
      formatExportDate(transaction.date),
      transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1),
      transaction.category,
      transaction.platform ?? "",
      transaction.brand_or_source,
      transaction.notes ?? "",
      signedAmount.toFixed(2),
      runningOverallPosition.toFixed(2)
    ];
  });

  return [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\n");
}

export function CsvExportButton({ transactions, from, to, range }: CsvExportButtonProps) {
  function handleExport() {
    const csv = createCsv(transactions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `creator-ledger-transactions-${getExportFileSuffix(from, to, range)}.csv`;
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
      Export CSV
    </button>
  );
}
