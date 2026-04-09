type SupportButtonProps = {
  className?: string;
};

export function SupportButton({ className = "" }: SupportButtonProps) {
  return (
    <a
      href="https://buymeacoffee.com/sleepingbeautytravels"
      target="_blank"
      rel="noreferrer"
      className={`inline-flex items-center justify-center rounded-full bg-black px-4 py-2.5 text-[14px] font-medium text-white no-underline transition-[background-color] duration-300 ease-out hover:bg-[#222222] hover:text-white ${className}`.trim()}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
        color: "#ffffff",
        fontWeight: 500,
        fontSize: "14px",
        padding: "10px 16px",
        borderRadius: "9999px"
      }}
    >
      Support this project
    </a>
  );
}
