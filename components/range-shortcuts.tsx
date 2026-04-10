import { getDateShortcuts } from "@/lib/transactions/date-shortcuts";

type RangeShortcutsProps = {
  basePath: "/dashboard" | "/transactions";
  from: string;
  to: string;
  type?: string;
  platform?: string;
};

export function RangeShortcuts({ basePath, from, to, type = "all", platform = "all" }: RangeShortcutsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {getDateShortcuts().map((shortcut) => {
        const params = new URLSearchParams({
          from: shortcut.from,
          to: shortcut.to,
          range: shortcut.slug
        });

        if (basePath === "/transactions") {
          params.set("type", type);

          if (platform && platform !== "all") {
            params.set("platform", platform);
          }
        }

        const isActive = from === shortcut.from && to === shortcut.to;

        return (
          <a
            key={shortcut.label}
            href={`${basePath}?${params.toString()}`}
            className={`rounded-full border border-[var(--border)] px-3 py-1.5 text-xs transition hover:bg-white ${
              isActive ? "bg-[var(--surface-strong)] text-[var(--foreground)]" : "bg-transparent text-[var(--muted)]"
            }`}
          >
            {shortcut.label}
          </a>
        );
      })}
    </div>
  );
}
