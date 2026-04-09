"use client";

import { Button } from "@/components/button";

export function SupportCardActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        className="bg-neutral-900 text-white hover:bg-neutral-800 w-full"
        onClick={() => window.open("https://buymeacoffee.com/sleepingbeautytravels", "_blank")}
      >
        Support ☕
      </Button>

      <a
        href="/demo"
        className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--foreground)] no-underline transition duration-200 hover:bg-white"
      >
        View demo
      </a>
    </div>
  );
}
