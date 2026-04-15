// components/ui/FeatureCard.tsx
import React from "react";
import { cn } from "@/lib/utils";
import Badge from "./Badge";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
  className?: string;
  premium?: boolean;
}

export default function FeatureCard({ icon, title, description, comingSoon = false, className, premium = false }: FeatureCardProps) {
  return (
    <div className={cn(
      "group relative p-7 rounded-2xl border transition-all duration-400 hover-lift",
      premium
        ? "bg-gradient-to-br from-[#38226C] to-[#2D1A56] border-[#6A4DFB]/30 hover:border-[#6A4DFB]/60 shadow-lg"
        : "bg-[#F9F8F6] border-[#1A1A2E]/8 hover:bg-white hover:border-[#6A4DFB]/30 hover:shadow-xl",
      className
    )}>
      {/* Icon */}
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110",
        premium ? "bg-white/15 text-white" : "bg-[#38226C]/10 text-[#38226C] group-hover:bg-[#6A4DFB]/15 group-hover:text-[#6A4DFB]"
      )}>
        {icon}
      </div>

      {/* Title row */}
      <div className="flex items-start gap-2 mb-2 flex-wrap">
        <h3 className={cn("font-bold text-lg leading-snug", premium ? "text-white" : "text-[#1A1A2E]")}>
          {title}
        </h3>
        {comingSoon && <Badge variant="coming-soon">Coming Soon</Badge>}
        {premium && !comingSoon && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FFB252]/20 text-[#FFB252] uppercase tracking-wider">Premium</span>
        )}
      </div>

      <p className={cn("text-sm leading-relaxed", premium ? "text-white/65" : "text-[#1A1A2E]/55")}>
        {description}
      </p>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-[#38226C] via-[#6A4DFB] to-[#FFB252] scale-x-0 group-hover:scale-x-100 transition-transform duration-400 rounded-full" />
    </div>
  );
}