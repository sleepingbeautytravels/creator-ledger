import { Card } from "@/components/card";
import { formatCurrency } from "@/lib/utils";

type SummaryCardProps = {
  label: string;
  value: number;
};

export function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <Card className="space-y-3">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-3xl font-semibold tracking-tight text-slate-900">
        {formatCurrency(value)}
      </p>
    </Card>
  );
}
