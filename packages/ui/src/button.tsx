"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="
         bg-accent
        hover:bg-[#009FD1]
        text-white
        font-semibold
        rounded-lg
        px-6
        py-2.5
        focus:ring-4
        focus:ring-accent/30
        transition
        px-5 py-2.5 me-2 mb-2
        border
        border-border
        transition-colors
      "
    >
      {children}
    </button>
  );
};
