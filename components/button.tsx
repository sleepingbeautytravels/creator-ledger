import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium tracking-[0.01em] transition duration-200 focus:outline-none focus:ring-2 focus:ring-stone-300 disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary"
          ? "bg-[#000000] text-[#ffffff] shadow-[0_1px_2px_rgba(32,28,26,0.06)] hover:bg-[#1a1a1a]"
          : "bg-[var(--surface-strong)] text-[var(--foreground)] ring-1 ring-[var(--border)] hover:bg-white",
        className
      )}
      {...props}
    />
  );
}
