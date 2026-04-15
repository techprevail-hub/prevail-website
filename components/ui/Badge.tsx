import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "accent" | "coming-soon" | "outline";
  className?: string;
}

export default function Badge({ children, variant = "accent", className }: BadgeProps) {
  const variants = {
    accent:       "bg-brand-indigo/10 text-brand-indigo border border-brand-indigo/20",
    "coming-soon":"bg-brand-orange/15 text-[#B8701A] border border-brand-orange/30",
    outline:      "bg-transparent text-brand-navy/50 border border-brand-navy/20",
  };
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase", variants[variant], className)}>
      {children}
    </span>
  );
}
