import { ReactNode } from "react";

export function Card({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 shadow-lg">
      {children}
    </div>
  );
}

export function CardContent({ children }: { children: ReactNode }) {
  return <div className="p-4">{children}</div>;
}