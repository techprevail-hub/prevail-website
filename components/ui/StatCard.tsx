import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  stat: string;
  label: string;
  description?: string;
  light?: boolean;
  className?: string;
}

export default function StatCard({ stat, label, description, light = false, className }: StatCardProps) {
  return (
    <div className={cn("text-center p-8", className)}>
      <div className={cn("text-5xl font-extrabold mb-2", light ? "text-brand-orange" : "text-brand-indigo")}>
        {stat}
      </div>
      <div className={cn("text-xs font-bold uppercase tracking-widest mb-2", light ? "text-brand-cream" : "text-brand-purple")}>
        {label}
      </div>
      {description && (
        <p className={cn("text-sm leading-relaxed", light ? "text-white/55" : "text-brand-navy/55")}>
          {description}
        </p>
      )}
    </div>
  );
}
