import type { ButtonHTMLAttributes } from "react";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline";
};

export function Button({
  className = "",
  variant = "default",
  ...props
}: ButtonProps) {
  const base =
    "px-4 py-2 rounded-xl transition font-medium";

  const styles =
    variant === "outline"
      ? "border border-white/20 bg-white/5 text-white"
      : "bg-white text-black";

  return <button className={`${base} ${styles} ${className}`} {...props} />;
}