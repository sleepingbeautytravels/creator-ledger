import { Card } from "@/components/card";
import { DarkCtaLink } from "@/components/dark-cta-link";

type OnboardingEmptyStateProps = {
  heading: string;
  body: string;
  secondaryLine?: string;
  ctaLabel: string;
  href: string;
  helperLine?: string;
  className?: string;
};

export function OnboardingEmptyState({
  heading,
  body,
  secondaryLine,
  ctaLabel,
  href,
  helperLine,
  className = ""
}: OnboardingEmptyStateProps) {
  return (
    <Card className={`space-y-5 ${className}`.trim()}>
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold text-[var(--foreground)]">{heading}</h2>
        <p className="max-w-2xl text-[15px] leading-7 text-[var(--muted)]">{body}</p>
        {secondaryLine ? (
          <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]/80">{secondaryLine}</p>
        ) : null}
      </div>

      <DarkCtaLink href={href}>{ctaLabel}</DarkCtaLink>
      {helperLine ? (
        <p className="text-sm leading-6 text-[var(--muted)]/80">{helperLine}</p>
      ) : null}
    </Card>
  );
}
