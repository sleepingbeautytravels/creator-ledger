import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-[var(--border)] bg-[var(--surface)] p-7 shadow-[0_8px_24px_rgba(32,24,16,0.03)] backdrop-blur-sm transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(32,24,16,0.06)] sm:p-8",
        className
      )}
    >
      {children}
    </div>
  );
}
