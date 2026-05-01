import type { ReactNode } from "react";

type BadgeProps = {
  children: ReactNode;
  className?: string;
};

export function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`px-3 py-1 text-xs rounded-full bg-white/10 border border-white/10 ${className}`}
    >
      {children}
    </span>
  );
}