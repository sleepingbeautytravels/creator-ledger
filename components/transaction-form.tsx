"use client";

import { useFormStatus } from "react-dom";
import { createTransaction } from "@/app/(app)/transactions/actions";
import { Button } from "@/components/button";
import { categoryPresets } from "@/lib/transactions/categories";
import { platformOptions } from "@/lib/transactions/platforms";
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
  const fieldClassName =
    "w-full rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3.5 text-[15px] text-[var(--foreground)] outline-none transition focus:border-[#8b7868]";

  return (
    <form action={createTransaction} className="grid gap-5 md:grid-cols-2">
      <label className="space-y-2.5 text-sm text-[var(--muted)]">
        <span>Date</span>
        <input
          required
          type="date"
          name="date"
          defaultValue={today}
          className={fieldClassName}
        />
      </label>

      <label className="space-y-2.5 text-sm text-[var(--muted)]">
        <span>Amount</span>
        <input
          required
          min="0"
          step="0.01"
          type="number"
          name="amount"
          placeholder="0.00"
          className={fieldClassName}
        />
      </label>

      <label className="space-y-2.5 text-sm text-[var(--muted)]">
        <span>Type</span>
        <select
          name="type"
          defaultValue="income"
          className={fieldClassName}
        >
          {transactionTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2.5 text-sm text-[var(--muted)]">
        <span>Category</span>
        <input
          required
          type="text"
          name="category"
          list="category-presets"
          placeholder="Campaign, software, travel..."
          className={fieldClassName}
        />
        <datalist id="category-presets">
          {categoryPresets.map((category) => (
            <option key={category} value={category} />
          ))}
        </datalist>
      </label>

      <label className="space-y-2.5 text-sm text-[var(--muted)]">
        <span>Platform</span>
        <select name="platform" defaultValue="" className={fieldClassName}>
          <option value="">Optional</option>
          {platformOptions.map((platform) => (
            <option key={platform} value={platform}>
              {platform}
            </option>
          ))}
        </select>
      </label>

      <label className="space-y-2.5 text-sm text-[var(--muted)]">
        <span>Brand or source</span>
        <input
          required
          type="text"
          name="brand_or_source"
          placeholder="Brand, client, platform..."
          className={fieldClassName}
        />
      </label>

      <label className="space-y-2.5 text-sm text-[var(--muted)] md:col-span-2">
        <span>Notes</span>
        <textarea
          name="notes"
          rows={4}
          placeholder="Optional context"
          className={fieldClassName}
        />
      </label>

      <div className="pt-1 md:col-span-2">
        <SubmitButton />
      </div>
    </form>
  );
}
