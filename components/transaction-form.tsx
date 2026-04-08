"use client";

import { useFormStatus } from "react-dom";
import { createTransaction } from "@/app/(app)/transactions/actions";
import { Button } from "@/components/button";
import { getTodayValue } from "@/lib/utils";

const transactionTypes = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
  { label: "Gifted", value: "gifted" }
] as const;

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Saving..." : "Add transaction"}
    </Button>
  );
}

export function TransactionForm() {
  const today = getTodayValue();

  return (
    <form action={createTransaction} className="grid gap-4 md:grid-cols-2">
      <label className="space-y-2 text-sm text-slate-600">
        <span>Date</span>
        <input
          required
          type="date"
          name="date"
          defaultValue={today}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition focus:border-slate-400"
        />
      </label>

      <label className="space-y-2 text-sm text-slate-600">
        <span>Amount</span>
        <input
          required
          min="0"
          step="0.01"
          type="number"
          name="amount"
          placeholder="0.00"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-0 transition focus:border-slate-400"
        />
      </label>

      <label className="space-y-2 text-sm text-slate-600">
        <span>Type</span>
        <select
          name="type"
          defaultValue="income"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
        >
          {transactionTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2 text-sm text-slate-600">
        <span>Category</span>
        <input
          required
          type="text"
          name="category"
          placeholder="Campaign, software, travel..."
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
        />
      </label>

      <label className="space-y-2 text-sm text-slate-600">
        <span>Brand or source</span>
        <input
          required
          type="text"
          name="brand_or_source"
          placeholder="Brand, client, platform..."
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
        />
      </label>

      <label className="space-y-2 text-sm text-slate-600 md:col-span-2">
        <span>Notes</span>
        <textarea
          name="notes"
          rows={4}
          placeholder="Optional context"
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
        />
      </label>

      <div className="md:col-span-2">
        <SubmitButton />
      </div>
    </form>
  );
}
