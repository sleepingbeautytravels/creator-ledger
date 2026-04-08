"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Database, TransactionType } from "@/types/database";

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
  const category = String(formData.get("category") ?? "");
  const brand_or_source = String(formData.get("brand_or_source") ?? "");
  const notes = String(formData.get("notes") ?? "") || null;

  if (!allowedTypes.includes(type) || Number.isNaN(amount) || amount < 0) {
    redirect("/transactions?error=Invalid%20transaction%20details");
  }

  type InsertTransaction = Database["public"]["Tables"]["transactions"]["Insert"];

  const transactionPayload: InsertTransaction = {
    user_id: user.id!,
    date: String(formData.get("date") ?? ""),
    amount,
    type,
    category,
    brand_or_source,
    notes: notes ?? null,
  };

  const { error } = await supabase
    .from("transactions")
    // @ts-expect-error Supabase generated types resolve this insert to never in this workspace, but runtime payload is valid
    .insert([transactionPayload]);

  if (error) {
    redirect(`/transactions?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
  redirect("/transactions?success=Transaction%20saved");
}
