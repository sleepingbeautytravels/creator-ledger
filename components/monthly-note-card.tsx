import { Card } from "@/components/card";

type MonthlyNoteCardProps = {
  income: number;
  expense: number;
  gifted: number;
  netProfit: number;
};

function getMonthlyNote({ income, expense, gifted, netProfit }: MonthlyNoteCardProps) {
  const hasTransactions = income > 0 || expense > 0 || gifted > 0;
  const giftedShare = income + gifted > 0 ? gifted / (income + gifted) : 0;
  const expenseRatio = income > 0 ? expense / income : expense > 0 ? Infinity : 0;

  if (!hasTransactions) {
    return "Once you add transactions, your monthly note will appear here.";
  }

  if (income === 0) {
    if (gifted > 0) {
      return "You are in an early tracking phase this month, with activity currently leaning toward gifted work. Continue logging outcomes to build a clearer picture.";
    }

    return "You are in an early tracking phase this month. Continue logging activity to build a clearer picture.";
  }

  if (giftedShare >= 0.6 && gifted > 0) {
    return "This month leans toward gifted collaborations. Tracking outcomes alongside value will help you assess long-term impact.";
  }

  if (expenseRatio >= 0.8 && expenseRatio <= 1.1) {
    return "Costs are currently close to income. Keeping an eye on spend may help maintain a stronger margin.";
  }

  if (expenseRatio > 1.1) {
    if (gifted > 0) {
      return "Costs are currently running ahead of paid work, while gifted value is adding context to the month. A close read on spend may help clarify your overall margin.";
    }

    return "Costs are currently running ahead of income. Keeping a close eye on spend may help steady your margin as the month unfolds.";
  }

  if (netProfit > 0 && gifted > 0) {
    return "A balanced month so far. Income is comfortably ahead of expenses, with gifted work complementing your overall activity.";
  }

  if (netProfit > 0) {
    return "The month is currently in positive balance, with income ahead of costs. Continued tracking will help keep that picture clear.";
  }

  return "The month is still taking shape, with activity spread across several entry types. Continued tracking will help the picture become clearer.";
}

export function MonthlyNoteCard(props: MonthlyNoteCardProps) {
  const note = getMonthlyNote(props);

  return (
    <Card className="space-y-3.5">
      <p className="text-sm font-normal tracking-[0.01em] text-[var(--muted)]/85">Monthly note</p>
      <p className="max-w-2xl text-[15px] leading-7 text-[color:rgba(32,28,26,0.82)]">{note}</p>
    </Card>
  );
}
