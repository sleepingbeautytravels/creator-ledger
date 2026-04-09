import { Card } from "@/components/card";

type PaidVsGiftedCardProps = {
  income: number;
  gifted: number;
};

function getSplit(income: number, gifted: number) {
  const total = income + gifted;

  if (total === 0) {
    return { paidPercent: 0, giftedPercent: 0 };
  }

  const paidPercent = Math.round((income / total) * 100);
  return {
    paidPercent,
    giftedPercent: 100 - paidPercent
  };
}

function getInsight(income: number, gifted: number) {
  if (income === 0 && gifted === 0) {
    return "Once you add paid or gifted work, the split will appear here.";
  }

  const total = income + gifted;
  const paidShare = total > 0 ? income / total : 0;

  if (paidShare >= 0.7) {
    return "Your work is primarily paid in this period.";
  }

  if (paidShare <= 0.3) {
    return "This period leans toward gifted collaborations.";
  }

  return "A balanced mix of paid and gifted work.";
}

export function PaidVsGiftedCard({ income, gifted }: PaidVsGiftedCardProps) {
  const { paidPercent, giftedPercent } = getSplit(income, gifted);
  const insight = getInsight(income, gifted);

  return (
    <Card className="flex min-h-44 flex-col justify-between space-y-9">
      <div className="space-y-3.5">
        <p className="text-sm font-normal tracking-[0.01em] text-[var(--muted)]/85">Paid vs Gifted</p>
        <p className="text-[2rem] font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-[2.2rem]">
          {paidPercent}% paid / {giftedPercent}% gifted
        </p>
      </div>
      <p className="text-sm leading-6 text-[var(--muted)]/85">{insight}</p>
    </Card>
  );
}
