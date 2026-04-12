import type { PropsWithChildren } from "react";

export function Badge({
  children,
  variant = "neutral",
}: PropsWithChildren<{
  variant?: "neutral" | "success" | "warning" | "danger" | "gold";
}>) {
  return <span className={`badge badge-${variant}`}>{children}</span>;
}
