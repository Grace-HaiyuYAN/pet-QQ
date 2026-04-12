import type { HTMLAttributes, PropsWithChildren } from "react";

type CardProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    tone?: "default" | "soft" | "highlight";
  }
>;

export function Card({
  children,
  className = "",
  tone = "default",
  ...props
}: CardProps) {
  const toneClass =
    tone === "highlight"
      ? "card card-highlight"
      : tone === "soft"
        ? "card card-soft"
        : "card";

  return (
    <div className={`${toneClass} ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
