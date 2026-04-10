"use server";

import { revalidatePath } from "next/cache";
import type { Route } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Database, Platform, TransactionType } from "@/types/database";
import { platformOptions } from "@/lib/transactions/platforms";

const allowedTypes: TransactionType[] = ["income", "expense", "gifted"];
const allowedPlatforms = [...platformOptions];
type InsertTransaction = Database["public"]["Tables"]["transactions"]["Insert"];
type UpdateTransaction = Database["public"]["Tables"]["transactions"]["Update"];

function getString(formData: FormData, key: string) {
  return String(formData.get(key) ?? "");
}

function getReturnPath(formData: FormData, fallback = "/transactions") {
  const returnTo = getString(formData, "returnTo");
  return returnTo.startsWith("/transactions") ? returnTo : fallback;
}

function redirectWithMessage(path: string, key: "success" | "error", message: string): never {
  const separator = path.includes("?") ? "&" : "?";
  redirect(`${path}${separator}${key}=${encodeURIComponent(message)}` as Route);
}

export async function createTransaction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const type = getString(formData, "type") as TransactionType;
  const amount = Number(formData.get("amount") ?? 0);
  const category = getString(formData, "category");
  const platform = getString(formData, "platform") as Platform | "";
  const brand_or_source = getString(formData, "brand_or_source");
  const notes = getString(formData, "notes") || null;

  if (
    !allowedTypes.includes(type) ||
    Number.isNaN(amount) ||
    amount < 0 ||
    (platform && !allowedPlatforms.includes(platform as Platform))
  ) {
    redirect("/transactions?error=Invalid%20transaction%20details");
  }

  const transactionPayload: InsertTransaction = {
    user_id: user.id!,
    date: getString(formData, "date"),
    amount,
    type,
    category,
    platform: platform || null,
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

export async function updateTransaction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const returnTo = getReturnPath(formData);

  if (!user) {
    redirect("/auth");
  }

  const id = getString(formData, "id");
  const type = getString(formData, "type") as TransactionType;
  const amount = Number(formData.get("amount") ?? 0);
  const category = getString(formData, "category");
  const platform = getString(formData, "platform") as Platform | "";
  const brand_or_source = getString(formData, "brand_or_source");
  const notes = getString(formData, "notes") || null;

  if (
    !id ||
    !allowedTypes.includes(type) ||
    Number.isNaN(amount) ||
    amount < 0 ||
    (platform && !allowedPlatforms.includes(platform as Platform))
  ) {
    redirectWithMessage(returnTo, "error", "Invalid transaction details");
  }

  const transactionPayload: UpdateTransaction = {
    date: getString(formData, "date"),
    amount,
    type,
    category,
    platform: platform || null,
    brand_or_source,
    notes: notes ?? null
  };

  const { error } = await supabase
    .from("transactions")
    // @ts-expect-error Supabase generated types resolve this update to never in this workspace, but runtime payload is valid
    .update(transactionPayload)
    .eq("id", id)
    .eq("user_id", user.id!);

  if (error) {
    redirectWithMessage(returnTo, "error", error.message);
  }

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
  redirectWithMessage(returnTo, "success", "Transaction updated");
}

export async function deleteTransaction(formData: FormData) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  const returnTo = getReturnPath(formData);

  if (!user) {
    redirect("/auth");
  }

  const id = getString(formData, "id");

  if (!id) {
    redirectWithMessage(returnTo, "error", "Invalid transaction");
  }

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id!);

  if (error) {
    redirectWithMessage(returnTo, "error", error.message);
  }

  revalidatePath("/dashboard");
  revalidatePath("/transactions");
  redirectWithMessage(returnTo, "success", "Transaction deleted");
}
