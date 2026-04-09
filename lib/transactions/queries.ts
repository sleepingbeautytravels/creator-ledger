import { createClient } from "@/lib/supabase/server";
import { getCurrentMonthValue, getMonthRange } from "@/lib/utils";
import { Database, TransactionType } from "@/types/database";

type TransactionFilter = {
  month?: string;
  type?: TransactionType | "all";
};

type TransactionTotals = {
  income: number;
  expense: number;
  gifted: number;
};

type TransactionRow = Database["public"]["Tables"]["transactions"]["Row"];

function normalizeMonth(month?: string) {
  return /^\d{4}-\d{2}$/.test(month ?? "") ? month! : getCurrentMonthValue();
}

function normalizeType(type?: TransactionType | "all") {
  return type && ["income", "expense", "gifted", "all"].includes(type) ? type : "all";
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function getDashboardSummary(month = getCurrentMonthValue()) {
  const supabase = await createClient();
  const normalizedMonth = normalizeMonth(month);
  const { start, end } = getMonthRange(normalizedMonth);

  const { data, error } = await supabase
    .from("transactions")
    .select("amount, type")
    .gte("date", start)
    .lte("date", end);

  if (error) {
    throw new Error(error.message);
  }

  const transactions: TransactionRow[] = data ?? [];

  const totals = transactions.reduce(
    (summary: TransactionTotals, transaction) => {
      const transactionType = transaction.type as keyof TransactionTotals;
      summary[transactionType] += Number(transaction.amount);
      return summary;
    },
    { income: 0, expense: 0, gifted: 0 } as TransactionTotals
  );

  return {
    month: normalizedMonth,
    income: totals.income,
    expense: totals.expense,
    gifted: totals.gifted,
    netProfit: totals.income - totals.expense
  };
}

export async function getTransactions(filters: TransactionFilter = {}) {
  const supabase = await createClient();
  const month = normalizeMonth(filters.month);
  const type = normalizeType(filters.type);
  const { start, end } = getMonthRange(month);

  let query = supabase
    .from("transactions")
    .select("*")
    .gte("date", start)
    .lte("date", end)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (type !== "all") {
    query = query.eq("type", type);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as TransactionRow[];
}
