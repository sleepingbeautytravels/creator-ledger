"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { createClient } from "@/lib/supabase/client";

type AuthFormCardProps = {
  initialMessage?: string;
};

export function AuthFormCard({ initialMessage }: AuthFormCardProps) {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.log("Login error:", error.message);
      alert(error.message);
      return;
    }

    console.log("Login successful");
    alert("Login successful");
    router.push("/dashboard");
    router.refresh();
  }

  async function handleSignup() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      console.log("Signup error:", error.message);
      alert(error.message);
      return;
    }

    console.log("Signup successful", data);
    alert("Signup successful. Check your email if confirmation is enabled.");

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <Card className="space-y-7">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">Welcome back</h2>
        <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
          Sign in to continue, or create an account to start tracking your creator finances.
        </p>
      </div>

      {initialMessage ? (
        <div className="rounded-[1.25rem] bg-[rgba(246,241,234,0.88)] px-4 py-3 text-sm text-[var(--muted)]">
          {initialMessage}
        </div>
      ) : null}

      <form className="space-y-5">
        <label className="block space-y-2.5 text-sm text-[var(--muted)]">
          <span>Email</span>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3.5 text-[var(--foreground)] outline-none transition focus:border-[#8b7868]"
          />
        </label>

        <label className="block space-y-2.5 text-sm text-[var(--muted)]">
          <span>Password</span>
          <input
            required
            type="password"
            name="password"
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3.5 text-[var(--foreground)] outline-none transition focus:border-[#8b7868]"
          />
        </label>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <Button type="button" className="flex-1" onClick={() => void handleLogin()}>
            Log in
          </Button>
          <Button type="button" variant="secondary" className="flex-1" onClick={() => void handleSignup()}>
            Sign up
          </Button>
        </div>

        <p className="pt-1 text-center text-sm text-[var(--muted)]/85">
          Already purchased? Sign in above.
        </p>
      </form>
    </Card>
  );
}
