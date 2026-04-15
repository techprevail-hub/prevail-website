"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  variant?: "primary" | "ghost" | "white" | "link";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  external?: boolean;
}

export default function Button({
  variant = "primary",
  size = "md",
  href,
  onClick,
  children,
  className,
  type = "button",
  disabled = false,
  external = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-brand-purple text-white hover:bg-brand-purple-dark hover:-translate-y-0.5 hover:shadow-lg shadow-brand-purple/20",
    ghost:
      "bg-transparent text-brand-purple border-2 border-brand-purple hover:bg-brand-purple hover:text-white hover:-translate-y-0.5",
    white:
      "bg-white text-brand-navy hover:bg-neutral-100 hover:-translate-y-0.5 hover:shadow-lg",
    link: "bg-transparent text-brand-purple hover:text-brand-purple-dark underline-offset-2 hover:underline p-0",
  };

  const sizes = {
    sm: "text-sm px-4 py-2",
    md: "text-base px-6 py-3",
    lg: "text-lg px-8 py-4",
  };

  const classes = cn(
    base,
    variants[variant],
    variant !== "link" ? sizes[size] : "",
    className
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
