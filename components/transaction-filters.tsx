import { Button } from "@/components/button";
import { RangeShortcuts } from "@/components/range-shortcuts";

type TransactionFiltersProps = {
  from?: string;
  to?: string;
  type?: string;
  year?: string;
};

export function TransactionFilters({ from, to, type, year }: TransactionFiltersProps) {
  const fieldClassName =
    "w-full rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[#8b7868]";

  return (
    <div className="space-y-3">
      <RangeShortcuts basePath="/transactions" from={from ?? ""} to={to ?? ""} type={type} />

      <form action="/transactions" method="get" className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
        <label className="space-y-2 text-sm text-[var(--muted)]">
          <span>From date</span>
          <input
            type="date"
            name="from"
            defaultValue={from}
            className={fieldClassName}
          />
        </label>

        <label className="space-y-2 text-sm text-[var(--muted)]">
          <span>To date</span>
          <input
            type="date"
            name="to"
            defaultValue={to}
            className={fieldClassName}
          />
        </label>

        <label className="space-y-2 text-sm text-[var(--muted)]">
          <span>Type</span>
          <select
            name="type"
            defaultValue={type ?? "all"}
            className={fieldClassName}
          >
            <option value="all">All types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="gifted">Gifted</option>
          </select>
        </label>

        <label className="space-y-2 text-sm text-[var(--muted)]">
          <span>Year</span>
          <input
            type="number"
            name="year"
            min="2000"
            max="2100"
            placeholder="2026"
            defaultValue={year}
            className={fieldClassName}
          />
        </label>

        <Button type="submit" variant="secondary" className="h-[46px] px-5">
          Apply filters
        </Button>
      </form>
    </div>
  );
}
