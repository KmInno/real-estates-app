import { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10 text-white/80">
      {children}
    </span>
  );
}