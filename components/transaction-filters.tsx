import { getCurrentMonthValue } from "@/lib/utils";
import { Button } from "@/components/button";

type TransactionFiltersProps = {
  month?: string;
  type?: string;
};

export function TransactionFilters({ month, type }: TransactionFiltersProps) {
  return (
    <form className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <label className="space-y-2 text-sm text-slate-600">
        <span>Month</span>
        <input
          type="month"
          name="month"
          defaultValue={month ?? getCurrentMonthValue()}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
        />
      </label>

      <label className="space-y-2 text-sm text-slate-600">
        <span>Type</span>
        <select
          name="type"
          defaultValue={type ?? "all"}
          className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-400"
        >
          <option value="all">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
          <option value="gifted">Gifted</option>
        </select>
      </label>

      <Button type="submit" variant="secondary" className="h-[46px]">
        Apply filters
      </Button>
    </form>
  );
}
