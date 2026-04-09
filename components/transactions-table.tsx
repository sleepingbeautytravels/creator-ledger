"use client";

import { useState } from "react";
import { deleteTransaction, updateTransaction } from "@/app/(app)/transactions/actions";
import { categoryPresets } from "@/lib/transactions/categories";
import { formatCurrency } from "@/lib/utils";
import { Database } from "@/types/database";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];

type TransactionsTableProps = {
  transactions: Transaction[];
  returnTo: string;
};

const fieldClassName =
  "w-full min-w-32 rounded-[1rem] border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition focus:border-[#8b7868]";

export function TransactionsTable({ transactions, returnTo }: TransactionsTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);

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
              <th className="px-5 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(120,104,90,0.08)]">
            {transactions.map((transaction) => {
              const isEditing = editingId === transaction.id;

              if (isEditing) {
                return (
                  <tr key={transaction.id} className="align-top text-[var(--foreground)]">
                    <td colSpan={7} className="px-5 py-5">
                      <form action={updateTransaction} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        <input type="hidden" name="id" value={transaction.id} />
                        <input type="hidden" name="returnTo" value={returnTo} />

                        <label className="space-y-2 text-sm text-[var(--muted)]">
                          <span>Date</span>
                          <input required type="date" name="date" defaultValue={transaction.date} className={fieldClassName} />
                        </label>

                        <label className="space-y-2 text-sm text-[var(--muted)]">
                          <span>Amount</span>
                          <input
                            required
                            min="0"
                            step="0.01"
                            type="number"
                            name="amount"
                            defaultValue={Number(transaction.amount)}
                            className={fieldClassName}
                          />
                        </label>

                        <label className="space-y-2 text-sm text-[var(--muted)]">
                          <span>Type</span>
                          <select name="type" defaultValue={transaction.type} className={fieldClassName}>
                            <option value="income">Income</option>
                            <option value="expense">Expense</option>
                            <option value="gifted">Gifted</option>
                          </select>
                        </label>

                        <label className="space-y-2 text-sm text-[var(--muted)]">
                          <span>Category</span>
                          <input
                            required
                            type="text"
                            name="category"
                            list={`category-presets-${transaction.id}`}
                            defaultValue={transaction.category}
                            className={fieldClassName}
                          />
                          <datalist id={`category-presets-${transaction.id}`}>
                            {categoryPresets.map((category) => (
                              <option key={category} value={category} />
                            ))}
                          </datalist>
                        </label>

                        <label className="space-y-2 text-sm text-[var(--muted)]">
                          <span>Brand or source</span>
                          <input
                            required
                            type="text"
                            name="brand_or_source"
                            defaultValue={transaction.brand_or_source}
                            className={fieldClassName}
                          />
                        </label>

                        <label className="space-y-2 text-sm text-[var(--muted)] xl:col-span-3">
                          <span>Notes</span>
                          <textarea name="notes" rows={3} defaultValue={transaction.notes ?? ""} className={fieldClassName} />
                        </label>

                        <div className="flex flex-col gap-3 md:col-span-2 xl:col-span-3 sm:flex-row">
                          <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-full bg-black px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#222222]"
                          >
                            Save changes
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2.5 text-sm text-[var(--foreground)] transition hover:bg-white"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    </td>
                  </tr>
                );
              }

              return (
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
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingId(transaction.id)}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-3 py-1.5 text-xs text-[var(--foreground)] transition hover:bg-white"
                      >
                        Edit
                      </button>

                      <form
                        action={deleteTransaction}
                        onSubmit={(event) => {
                          if (!window.confirm("Delete this transaction?")) {
                            event.preventDefault();
                          }
                        }}
                      >
                        <input type="hidden" name="id" value={transaction.id} />
                        <input type="hidden" name="returnTo" value={returnTo} />
                        <button
                          type="submit"
                          className="rounded-full border border-[rgba(190,72,72,0.18)] bg-[rgba(190,72,72,0.06)] px-3 py-1.5 text-xs text-[rgba(128,43,43,0.95)] transition hover:bg-[rgba(190,72,72,0.1)]"
                        >
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
