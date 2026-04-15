// components/ui/SectionLabel.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}

export default function SectionLabel({ children, light = false, className }: SectionLabelProps) {
  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4",
      light
        ? "bg-white/10 backdrop-blur-sm border border-white/20"
        : "bg-[#38226C]/5 border border-[#38226C]/10",
      className
    )}>
      <div className={cn(
        "w-1.5 h-1.5 rounded-full",
        light ? "bg-[#FFB252]" : "bg-[#6A4DFB]"
      )} />
      <p className={cn(
        "text-xs font-bold tracking-[0.22em] uppercase",
        light ? "text-[#FFCD94]" : "text-[#38226C]"
      )}>
        {children}
      </p>
    </div>
  );
}