import { Button } from "@/components/button";
import { getDateShortcuts } from "@/lib/transactions/date-shortcuts";

type TransactionFiltersProps = {
  from?: string;
  to?: string;
  type?: string;
};

export function TransactionFilters({ from, to, type }: TransactionFiltersProps) {
  const fieldClassName =
    "w-full rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3 text-sm text-[var(--foreground)] outline-none transition focus:border-[#8b7868]";
  const shortcuts = getDateShortcuts();

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {shortcuts.map((shortcut) => {
          const params = new URLSearchParams({
            from: shortcut.from,
            to: shortcut.to,
            type: type ?? "all"
          });
          const isActive = from === shortcut.from && to === shortcut.to;

          return (
            <a
              key={shortcut.label}
              href={`/transactions?${params.toString()}`}
              className={`rounded-full border border-[var(--border)] px-3 py-1.5 text-xs transition hover:bg-white ${
                isActive
                  ? "bg-[var(--surface-strong)] text-[var(--foreground)]"
                  : "bg-transparent text-[var(--muted)]"
              }`}
            >
              {shortcut.label}
            </a>
          );
        })}
      </div>

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

        <Button type="submit" variant="secondary" className="h-[46px] px-5">
          Apply filters
        </Button>
      </form>
    </div>
  );
}
