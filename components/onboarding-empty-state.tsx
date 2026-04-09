import { Card } from "@/components/card";
import { DarkCtaLink } from "@/components/dark-cta-link";

type OnboardingEmptyStateProps = {
  heading: string;
  body: string;
  ctaLabel: string;
  href: string;
};

export function OnboardingEmptyState({ heading, body, ctaLabel, href }: OnboardingEmptyStateProps) {
  return (
    <Card className="space-y-5">
      <div className="space-y-3">
        <h2 className="text-3xl font-semibold text-[var(--foreground)]">{heading}</h2>
        <p className="max-w-2xl text-[15px] leading-7 text-[var(--muted)]">{body}</p>
      </div>

      <DarkCtaLink href={href}>{ctaLabel}</DarkCtaLink>
    </Card>
  );
}
