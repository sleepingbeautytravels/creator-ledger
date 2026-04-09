type DarkCtaLinkProps = {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
};

const darkCtaClassName =
  "inline-flex items-center justify-center rounded-full bg-black px-4 py-2.5 text-[14px] font-medium text-white no-underline transition-[background-color] duration-300 ease-out hover:bg-[#222222] hover:text-white";

const darkCtaStyle = {
  color: "#ffffff",
  fontWeight: 500,
  fontSize: "14px",
  padding: "10px 16px",
  borderRadius: "9999px"
};

export function DarkCtaLink({ href, children, external = false, className = "" }: DarkCtaLinkProps) {
  const combinedClassName = `${darkCtaClassName} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={combinedClassName}
        style={darkCtaStyle}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={combinedClassName} style={darkCtaStyle}>
      {children}
    </a>
  );
}
