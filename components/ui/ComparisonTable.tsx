// components/ui/ComparisonTable.tsx
import React from "react";
import { Check, Minus, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface ComparisonRow {
  feature: string;
  columns: (boolean | "partial" | string)[];
}

interface ComparisonTableProps {
  headers: string[];
  rows: ComparisonRow[];
  highlightColumn?: number;
  className?: string;
}

export default function ComparisonTable({ headers, rows, highlightColumn, className }: ComparisonTableProps) {
  const renderCell = (value: boolean | "partial" | string, isHighlighted: boolean) => {
    if (typeof value === "boolean") {
      return value
        ? <Check className={cn("w-5 h-5 mx-auto", isHighlighted ? "text-[#FFB252]" : "text-emerald-500")} />
        : <Minus className="w-5 h-5 mx-auto text-[#1A1A2E]/20" />;
    }
    if (value === "partial") {
      return <span className={cn("text-xs font-semibold", isHighlighted ? "text-[#FFB252]" : "text-amber-600")}>Partial</span>;
    }
    return <span className={cn("text-sm font-semibold", isHighlighted ? "text-white" : "text-[#1A1A2E]/70")}>{value}</span>;
  };

  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-[#1A1A2E]/8 shadow-xl bg-white", className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={header} className={cn(
                "px-6 py-5 text-sm font-bold text-left",
                i === 0
                  ? "bg-[#F9F8F6] text-[#1A1A2E]/60 w-1/3"
                  : highlightColumn === i
                  ? "bg-gradient-to-r from-[#38226C] to-[#2D1A56] text-white text-center"
                  : "bg-[#F9F8F6] text-[#1A1A2E]/50 text-center"
              )}>
                {i === highlightColumn && (
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex items-center gap-1 text-[#FFB252] text-xs font-bold tracking-widest uppercase">
                      <Sparkles className="w-3 h-3" />
                      <span>Best Choice</span>
                    </div>
                    <span>{header}</span>
                  </div>
                )}
                {i !== highlightColumn && header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIdx) => (
            <tr key={row.feature} className={cn("border-t border-[#1A1A2E]/5", rowIdx % 2 === 0 ? "bg-white" : "bg-[#F9F8F6]/50")}>
              <td className="px-6 py-4 text-sm font-medium text-[#1A1A2E]/70">{row.feature}</td>
              {row.columns.map((cell, colIdx) => (
                <td key={colIdx} className={cn("px-6 py-4 text-center", highlightColumn === colIdx + 1 ? "bg-[#38226C]/5" : "")}>
                  {renderCell(cell, highlightColumn === colIdx + 1)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
       </table>
    </div>
  );
}