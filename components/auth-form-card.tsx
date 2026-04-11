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
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isStartingGoogleAuth, setIsStartingGoogleAuth] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(initialMessage ?? null);

  async function handleGoogleSignIn() {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsStartingGoogleAuth(true);

    const redirectTo = `${window.location.origin}/auth/callback`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo
      }
    });

    if (error) {
      console.log("Google auth error:", error.message);
      setErrorMessage(error.message);
      setIsStartingGoogleAuth(false);
    }
  }

  async function handleLogin() {
    setErrorMessage(null);
    setSuccessMessage(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.log("Login error:", error.message);
      setErrorMessage(error.message);
      return;
    }

    console.log("Login successful");
    router.push("/dashboard");
    router.refresh();
  }

  async function handleSignup() {
    setErrorMessage(null);
    setSuccessMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      console.log("Signup error:", error.message);
      setErrorMessage(error.message);
      return;
    }

    console.log("Signup successful", data);

    if (data.session) {
      router.push("/dashboard");
      router.refresh();
      return;
    }

    setSuccessMessage("Account created. Check your email to confirm your account.");
  }

  async function handleForgotPassword() {
    setErrorMessage(null);
    setSuccessMessage(null);

    const redirectTo = `${window.location.origin}/auth/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo
    });

    if (error) {
      console.log("Forgot password error:", error.message);
      setErrorMessage(error.message);
      return;
    }

    console.log("Password reset email sent");
    setSuccessMessage("A password reset link has been sent to your email.");
  }

  return (
    <Card className="space-y-7">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-[var(--foreground)]">Welcome back</h2>
        <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
          Sign in to continue, or create an account to start tracking your creator finances.
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

      <form className="space-y-5">
        {!showForgotPassword ? (
          <>
            <Button
              type="button"
              variant="secondary"
              className="w-full"
              disabled={isStartingGoogleAuth}
              onClick={() => void handleGoogleSignIn()}
            >
              {isStartingGoogleAuth ? "Opening Google..." : "Continue with Google"}
            </Button>

            <div className="flex items-center gap-3 pt-0.5">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]/75">or</span>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
          </>
        ) : null}

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

        {showForgotPassword ? (
          <div className="space-y-4">
            <p className="text-sm leading-6 text-[var(--muted)]">
              Enter your email and we&apos;ll send you a link to reset your password.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row">
              <Button type="button" className="flex-1" onClick={() => void handleForgotPassword()}>
                Send reset link
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  setShowForgotPassword(false);
                  setErrorMessage(null);
                  setSuccessMessage(initialMessage ?? null);
                }}
              >
                Back to sign in
              </Button>
            </div>
          </div>
        ) : (
          <>
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

            <div className="pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(true);
                  setErrorMessage(null);
                  setSuccessMessage(null);
                }}
                className="text-sm text-[var(--muted)]/85 transition hover:text-[var(--foreground)]"
              >
                Forgot password?
              </button>
            </div>

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
          </>
        )}
      </form>
    </Card>
  );
}
