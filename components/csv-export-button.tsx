"use client";

import { Database } from "@/types/database";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];

type CsvExportButtonProps = {
  transactions: Transaction[];
  from: string;
  to: string;
};

function escapeCsvValue(value: string | number | null) {
  const normalized = value === null ? "" : String(value);
  return `"${normalized.replaceAll('"', '""')}"`;
}

function createCsv(transactions: Transaction[]) {
  const headers = ["date", "type", "category", "platform", "brand/source", "notes", "amount"];
  const rows = transactions.map((transaction) => [
    transaction.date,
    transaction.type,
    transaction.category,
    transaction.platform ?? "",
    transaction.brand_or_source,
    transaction.notes ?? "",
    Number(transaction.amount).toFixed(2)
  ]);

  return [headers, ...rows]
    .map((row) => row.map(escapeCsvValue).join(","))
    .join("\n");
}

export function CsvExportButton({ transactions, from, to }: CsvExportButtonProps) {
  function handleExport() {
    const csv = createCsv(transactions);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `creator-ledger-${from}-to-${to}.csv`;
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
