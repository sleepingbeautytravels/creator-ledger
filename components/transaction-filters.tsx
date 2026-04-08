import { getCurrentMonthValue } from "@/lib/utils";
import { Button } from "@/components/button";

type TransactionFiltersProps = {
  month?: string;
  type?: string;
};

export function TransactionFilters({ month, type }: TransactionFiltersProps) {
  const fieldClassName =
    "w-full rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[#8b7868]";

  return (
    <form className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
      <label className="space-y-2 text-sm text-[var(--muted)]">
        <span>Month</span>
        <input
          type="month"
          name="month"
          defaultValue={month ?? getCurrentMonthValue()}
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

      <Button type="submit" variant="secondary" className="h-[46px] px-5">
        Apply filters
      </Button>
    </form>
  );
}
