import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline";
};

export function Button({ variant = "primary", className = "", ...props }: Props) {
  const base = "px-4 py-2 rounded-full font-medium transition";

  const styles =
    variant === "outline"
      ? "border border-white/20 hover:bg-white/10"
      : "bg-white text-black hover:opacity-80";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}