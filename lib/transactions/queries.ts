import { createClient } from "@/lib/supabase/server";
import { getCurrentMonthValue, getMonthRange } from "@/lib/utils";
import { TransactionType } from "@/types/database";

type TransactionFilter = {
  month?: string;
  type?: TransactionType | "all";
};

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function getDashboardSummary(month = getCurrentMonthValue()) {
  const supabase = await createClient();
  const { start, end } = getMonthRange(month);

  const { data, error } = await supabase
    .from("transactions")
    .select("amount, type")
    .gte("date", start)
    .lte("date", end);

  if (error) {
    throw new Error(error.message);
  }

  const totals = data.reduce(
    (summary, transaction) => {
      summary[transaction.type] += Number(transaction.amount);
      return summary;
    },
    { income: 0, expense: 0, gifted: 0 }
  );

  return {
    month,
    income: totals.income,
    expense: totals.expense,
    gifted: totals.gifted,
    netProfit: totals.income - totals.expense
  };
}

export async function getTransactions(filters: TransactionFilter = {}) {
  const supabase = await createClient();
  const month = filters.month ?? getCurrentMonthValue();
  const { start, end } = getMonthRange(month);

  let query = supabase
    .from("transactions")
    .select("*")
    .gte("date", start)
    .lte("date", end)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (filters.type && filters.type !== "all") {
    query = query.eq("type", filters.type);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
