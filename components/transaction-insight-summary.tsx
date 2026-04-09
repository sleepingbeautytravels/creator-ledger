import { Card } from "@/components/card";
import { getSmartSummary, TransactionRow } from "@/lib/transactions/insights";

type TransactionInsightSummaryProps = {
  transactions: TransactionRow[];
};

export function TransactionInsightSummary({ transactions }: TransactionInsightSummaryProps) {
  return (
    <Card className="space-y-3.5">
      <p className="text-sm font-normal tracking-[0.01em] text-[var(--muted)]/85">Period insight</p>
      <p className="max-w-2xl text-[15px] leading-7 text-[color:rgba(32,28,26,0.82)]">
        {getSmartSummary(transactions)}
      </p>
    </Card>
  );
}
