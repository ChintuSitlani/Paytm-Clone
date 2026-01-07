"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
}

export const Button = ({
  onClick,
  children,
  disabled = false,
  type = "button",
  className = "",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-accent
        hover:bg-[#009FD1]
        disabled:bg-accent/60
        disabled:cursor-not-allowed
        text-white
        font-semibold
        rounded-lg
        px-6
        py-2.5
        focus:ring-4
        focus:ring-accent/30
        border
        border-border
        transition-colors
        ${className}
      `}
    >
      {children}
    </button>
  );
};
