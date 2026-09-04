"use client";

import React, { memo, useCallback } from "react";
import { ArrowUpRight, RotateCcw, Check, Sparkles } from "lucide-react";

export interface FlipCardProps {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  explanation: string;
  workflow: string[];
  outcome: string;
  tiltClass?: string;
  isFlipped: boolean;
  onToggle: () => void;
}

export const FlipCard = memo(function FlipCard({
  id,
  index,
  title,
  subtitle,
  explanation,
  workflow,
  outcome,
  tiltClass = "",
  isFlipped,
  onToggle,
}: FlipCardProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onToggle();
      } else if (e.key === "Escape" && isFlipped) {
        e.preventDefault();
        onToggle();
      }
    },
    [isFlipped, onToggle]
  );

  return (
    <div
      className={`w-full h-[390px] ${tiltClass} select-none outline-none cursor-pointer group touch-manipulation`}
      style={{ perspective: "1400px" }}
      role="button"
      tabIndex={0}
      aria-expanded={isFlipped}
      aria-label={`${title} capability card. Click or press enter to view detailed workflow.`}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
    >
      {/* 3D Rotating Inner Container */}
      <div
        className="w-full h-full relative will-change-transform rounded-2xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          boxShadow: isFlipped
            ? "0 20px 35px -10px rgba(0, 0, 0, 0.12), 0 0 1px 1px rgba(0, 0, 0, 0.08)"
            : "0 4px 16px -4px rgba(0, 0, 0, 0.04), 0 0 1px 1px rgba(0, 0, 0, 0.06)",
        }}
      >
        {/* =========================================================
            FRONT FACE: Pure Editorial Minimalism (WHAT IT DOES)
            ========================================================= */}
        <div
          className="absolute inset-0 rounded-2xl bg-white dark:bg-[#11141E] border border-slate-200/80 dark:border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between text-left overflow-hidden transition-all duration-200 group-hover:border-blue-500/30 group-hover:-translate-y-1"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)",
          }}
        >
          {/* Top: Index & Signal Bead */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider">
              {index}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-white/20 group-hover:bg-blue-500 transition-colors" />
          </div>

          {/* Middle: Title & One-Line Value Proposition */}
          <div className="space-y-3 my-auto">
            <h3 className="font-serif text-2xl sm:text-[1.65rem] text-zinc-950 dark:text-white font-normal leading-snug tracking-tight">
              {title}
            </h3>
            <p className="font-sans text-[13.5px] sm:text-sm text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
              {subtitle}
            </p>
          </div>

          {/* Bottom: Tactile Exploration Cue */}
          <div className="pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between text-xs font-sans text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
            <span className="text-[11px] font-medium tracking-wide">View execution flow</span>
            <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-white/[0.06] group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* =========================================================
            BACK FACE: Concise Operational Architecture (HOW IT WORKS + RESULT)
            ========================================================= */}
        <div
          className="absolute inset-0 rounded-2xl bg-slate-50 dark:bg-[#0B0E17] border border-slate-200/90 dark:border-white/[0.09] p-6 sm:p-7 flex flex-col justify-between text-left overflow-hidden shadow-sm"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Top: Header with Return Control */}
          <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.07] pb-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="font-bold text-blue-600 dark:text-blue-400">{index}</span>
              <span className="text-zinc-400">·</span>
              <span className="uppercase text-zinc-900 dark:text-zinc-100 tracking-wider font-semibold">
                {title}
              </span>
            </div>

            <button
              type="button"
              aria-label="Flip card back"
              className="w-7 h-7 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white flex items-center justify-center transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Middle: Concise Explanation & 4-Step Pathway */}
          <div className="space-y-3.5 my-auto">
            <p className="font-sans text-[13px] sm:text-[13.5px] text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              {explanation}
            </p>

            {/* Workflow Steps (Zero Truncation) */}
            <div className="space-y-1.5 pt-1">
              <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block font-semibold">
                EXECUTION PATHWAY
              </span>
              <div className="grid grid-cols-2 gap-2">
                {workflow.slice(0, 4).map((step, idx) => (
                  <div
                    key={idx}
                    className="h-8 px-2.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06] flex items-center gap-2 text-left"
                  >
                    <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-sans text-xs font-medium text-zinc-800 dark:text-zinc-200">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: Verified Operational Result */}
          <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.07] flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-sans text-xs text-zinc-800 dark:text-zinc-200 font-medium">
              {outcome}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
