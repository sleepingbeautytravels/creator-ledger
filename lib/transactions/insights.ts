import { Database } from "@/types/database";

export type TransactionRow = Database["public"]["Tables"]["transactions"]["Row"];

export type ValueSummary = {
  label: string;
  income: number;
  gifted: number;
  expenses: number;
  overallValue: number;
};

type SummaryKey = "brand_or_source" | "category" | "platform";

export function summarizeBy(transactions: TransactionRow[], key: SummaryKey) {
  const summaries = transactions.reduce<Record<string, ValueSummary>>((accumulator, transaction) => {
    const rawValue = transaction[key];
    const label = typeof rawValue === "string" ? rawValue.trim() : "";

    if (!accumulator[label]) {
      accumulator[label] = {
        label,
        income: 0,
        gifted: 0,
        expenses: 0,
        overallValue: 0
      };
    }

    const amount = Number(transaction.amount);

    if (transaction.type === "income") {
      accumulator[label].income += amount;
    }

    if (transaction.type === "gifted") {
      accumulator[label].gifted += amount;
    }

    if (transaction.type === "expense") {
      accumulator[label].expenses += amount;
    }

    accumulator[label].overallValue = accumulator[label].income + accumulator[label].gifted;

    return accumulator;
  }, {});

  return Object.values(summaries).sort((a, b) => b.overallValue - a.overallValue);
}

export function getTopBy(summaries: ValueSummary[], metric: "income" | "gifted" | "overallValue") {
  return summaries
    .filter((summary) => summary[metric] > 0)
    .sort((a, b) => b[metric] - a[metric])[0];
}

export function getSmartSummary(transactions: TransactionRow[]) {
  if (transactions.length === 0) {
    return "Once this period has activity, a short insight will appear here.";
  }

  const sourceSummaries = summarizeBy(transactions, "brand_or_source");
  const categorySummaries = summarizeBy(transactions, "category");
  const topIncomeSource = getTopBy(sourceSummaries, "income");
  const topGiftedSource = getTopBy(sourceSummaries, "gifted");
  const topCategory = getTopBy(categorySummaries, "overallValue");
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);
  const totalGifted = transactions
    .filter((transaction) => transaction.type === "gifted")
    .reduce((total, transaction) => total + Number(transaction.amount), 0);

  if (totalIncome > totalGifted && topIncomeSource) {
    return `Income led this period, with ${topIncomeSource.label} contributing the highest paid value.`;
  }

  if (totalGifted > totalIncome && topCategory) {
    return `Gifted value was concentrated in ${topCategory.label} collaborations.`;
  }

  const topCategories = categorySummaries
    .filter((summary) => summary.overallValue > 0)
    .slice(0, 2)
    .map((summary) => summary.label);

  if (topCategories.length === 2) {
    return `Most activity came from ${topCategories[0]} and ${topCategories[1]}.`;
  }

  if (topGiftedSource) {
    return `${topGiftedSource.label} contributed the strongest gifted value this period.`;
  }

  return "This period has a light mix of activity across your ledger.";
}
