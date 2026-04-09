"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/button";
import { Card } from "@/components/card";
import { createClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const router = useRouter();
  const supabase = createClient();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isRecoveryReady, setIsRecoveryReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const initializeRecovery = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();

      if (session && isMounted) {
        setIsRecoveryReady(true);
      }
    };

    void initializeRecovery();

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event) => {
      if ((event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") && isMounted) {
        setIsRecoveryReady(true);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  async function handleResetPassword() {
    setErrorMessage(null);
    setSuccessMessage(null);

    if (password.length < 6) {
      setErrorMessage("Your new password should be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccessMessage("Your password has been updated. You can now sign in.");
    setPassword("");
    setConfirmPassword("");
    setTimeout(() => {
      router.push("/auth");
    }, 1200);
  }

  return (
    <Card className="space-y-7">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">Reset password</h1>
        <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
          Choose a new password to continue back into your account.
        </p>
      </div>

      {errorMessage ? (
        <div className="rounded-[1.25rem] bg-[rgba(190,72,72,0.08)] px-4 py-3 text-sm text-[rgba(128,43,43,0.95)]">
          {errorMessage}
        </div>
      ) : null}

      {successMessage ? (
        <div className="rounded-[1.25rem] bg-[rgba(246,241,234,0.88)] px-4 py-3 text-sm text-[var(--muted)]">
          {successMessage}
        </div>
      ) : null}

      {!isRecoveryReady ? (
        <div className="rounded-[1.25rem] bg-[rgba(246,241,234,0.88)] px-4 py-3 text-sm text-[var(--muted)]">
          Open the password reset link from your email to set a new password.
        </div>
      ) : (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            void handleResetPassword();
          }}
          className="space-y-5"
        >
          <label className="block space-y-2.5 text-sm text-[var(--muted)]">
            <span>New password</span>
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

          <label className="block space-y-2.5 text-sm text-[var(--muted)]">
            <span>Confirm new password</span>
            <input
              required
              type="password"
              name="confirmPassword"
              minLength={6}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded-[1.25rem] border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-3.5 text-[var(--foreground)] outline-none transition focus:border-[#8b7868]"
            />
          </label>

          <Button type="submit" className="w-full sm:w-auto">
            Update password
          </Button>
        </form>
      )}
    </Card>
  );
}
