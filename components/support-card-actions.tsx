import { SupportButton } from "@/components/support-button";

export function SupportCardActions() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <SupportButton className="min-w-[116px]" />

      <a
        href="/demo"
        className="inline-flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--foreground)] no-underline transition duration-200 hover:bg-white"
      >
        View demo
      </a>
    </div>
  );
}
