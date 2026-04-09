type SupportButtonProps = {
  className?: string;
};

export function SupportButton({ className = "" }: SupportButtonProps) {
  return (
    <a
      href="https://buymeacoffee.com/sleepingbeautytravels"
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-stone-900 px-4 py-2.5 text-sm font-medium text-white no-underline shadow-[0_1px_2px_rgba(32,28,26,0.05)] transition-[background-color,box-shadow] duration-300 ease-out hover:bg-stone-800 hover:shadow-[0_6px_16px_rgba(32,24,16,0.06)] ${className}`.trim()}
      style={{ color: "#ffffff" }}
    >
      Support
    </a>
  );
}
