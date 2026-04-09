import { DarkCtaLink } from "@/components/dark-cta-link";

type SupportButtonProps = {
  className?: string;
};

export function SupportButton({ className = "" }: SupportButtonProps) {
  return (
    <DarkCtaLink
      href="https://buymeacoffee.com/sleepingbeautytravels"
      external
      className={className}
    >
      Support this project
    </DarkCtaLink>
  );
}
