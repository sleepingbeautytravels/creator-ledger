import { Card } from "@/components/card";
import { formatCurrency } from "@/lib/utils";

type SummaryCardProps = {
  label: string;
  value: number;
  helperText?: string;
};

export function SummaryCard({ label, value, helperText }: SummaryCardProps) {
  return (
    <Card className="flex min-h-44 flex-col justify-between space-y-9">
      <div className="space-y-1">
        <p className="text-sm font-normal tracking-[0.01em] text-[var(--muted)]/85">{label}</p>
        {helperText ? <p className="text-xs leading-5 text-[var(--muted)]/75">{helperText}</p> : null}
      </div>
      <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-[2.2rem]">
        {formatCurrency(value)}
      </p>
    </Card>
  );
}
