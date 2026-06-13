import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "gold" | "outline" | "outlineDark" | "dark";
  className?: string;
};

export function Button({
  children,
  variant = "gold",
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    gold:
      "border-[var(--gold)] bg-[var(--gold)] text-white hover:bg-[#96763d] hover:shadow-[0_12px_30px_rgba(168,135,74,0.24)]",
    outline:
      "border-[var(--gold)] bg-transparent text-[var(--text)] hover:bg-[var(--card)] hover:text-[var(--gold)]",
    outlineDark:
      "border-[var(--text)] bg-transparent text-[var(--text)] hover:border-[var(--green)] hover:bg-[var(--green)] hover:text-white",
    dark:
      "border-[var(--green)] bg-[var(--green)] text-white hover:border-[var(--gold)] hover:bg-[#10271f]",
  };

  return (
    <button
      className={`button-shimmer min-h-12 border px-7 text-[0.68rem] font-bold uppercase tracking-[0.24em] transition-all duration-300 ease-out active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
