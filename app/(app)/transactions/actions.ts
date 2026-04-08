"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { TransactionType } from "@/types/database";

const allowedTypes: TransactionType[] = ["income", "expense", "gifted"];

export async function createTransaction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const type = String(formData.get("type") ?? "") as TransactionType;
  const amount = Number(formData.get("amount") ?? 0);

  if (!allowedTypes.includes(type) || Number.isNaN(amount) || amount < 0) {
    redirect("/transactions?error=Invalid%20transaction%20details");
  }

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    date: String(formData.get("date") ?? ""),
    amount,
    type,
    category: String(formData.get("category") ?? ""),
    brand_or_source: String(formData.get("brand_or_source") ?? ""),
    notes: String(formData.get("notes") ?? "") || null
  });

  if (error) {
    redirect(`/transactions?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
  redirect("/transactions?success=Transaction%20saved");
}
