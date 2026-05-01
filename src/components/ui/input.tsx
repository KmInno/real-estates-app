import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", ...props }: InputProps) {
  return (
    <input
      className={`px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white ${className}`}
      {...props}
    />
  );
}