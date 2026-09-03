"use client";

import React, { memo, useCallback } from "react";
import { ArrowUpRight, RotateCcw, Check } from "lucide-react";

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
      className={`perspective-1400 w-full h-[370px] ${tiltClass} select-none outline-none cursor-pointer group transition-transform duration-200 ease-out hover:-translate-y-1 touch-manipulation`}
      role="button"
      tabIndex={0}
      aria-expanded={isFlipped}
      aria-label={`${title} capability card. Click or press enter to view detailed workflow.`}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
    >
      {/* 3D Rotating Inner Object (Strict GPU Transform, 500ms Instant Response) */}
      <div
        className={`w-full h-full relative transform-style-3d will-change-transform ${
          isFlipped ? "shadow-2xl" : "shadow-md group-hover:shadow-lg"
        }`}
        style={{
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transformOrigin: "center center",
          transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 500ms ease",
        }}
      >
        {/* =========================================================
            FRONT FACE: Pure Editorial Minimalism with Tactile Matte Material
            ========================================================= */}
        <div
          className="backface-hidden absolute inset-0 rounded-2xl bg-[#FAF8F2] dark:bg-[#0e121d] border border-[rgba(36,33,26,0.08)] dark:border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between text-left overflow-hidden transition-colors pointer-events-auto"
          style={{ transform: "rotateY(0deg)" }}
        >
          {/* Top: Index */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider">
              {index}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[rgba(36,33,26,0.2)] dark:bg-white/20" />
          </div>

          {/* Middle: Title & One-Line Purpose */}
          <div className="space-y-2.5 my-auto">
            <h3 className="font-serif text-2xl sm:text-[1.7rem] text-zinc-950 dark:text-white font-normal leading-snug tracking-tight">
              {title}
            </h3>
            <p className="type-sans-body-sm text-[#58534C] dark:text-zinc-400 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Bottom: Subtle Interactive Exploration Cue */}
          <div className="pt-3 border-t border-[rgba(36,33,26,0.06)] dark:border-white/[0.06] flex items-center justify-between text-xs font-sans text-[#888278] group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
            <span className="text-[11px] font-medium tracking-wide">Explore workflow</span>
            <div className="w-6 h-6 rounded-full bg-[rgba(36,33,26,0.04)] dark:bg-white/[0.06] flex items-center justify-center text-[#58534C] dark:text-zinc-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* =========================================================
            BACK FACE: Concise Operational Architecture (Matte Architectural Surface)
            ========================================================= */}
        <div
          className="backface-hidden absolute inset-0 rounded-2xl bg-[#FFFDF8] dark:bg-[#090c15] border border-[rgba(36,33,26,0.09)] dark:border-white/[0.08] p-6 sm:p-7 flex flex-col justify-between text-left overflow-hidden shadow-sm pointer-events-auto"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* Top: Header with Icon-Only Flip-Back Control */}
          <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.07] pb-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="font-bold text-blue-600 dark:text-blue-400">{index}</span>
              <span className="text-zinc-400">·</span>
              <span className="uppercase text-zinc-800 dark:text-zinc-200 tracking-wider font-semibold">
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

          {/* Middle: Concise Explanation & Compact Workflow */}
          <div className="space-y-4 my-auto">
            <p className="font-sans text-[13.5px] sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
              {explanation}
            </p>

            {/* Workflow Pathway */}
            <div className="space-y-2">
              <span className="font-mono text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider block font-medium">
                WORKFLOW
              </span>
              <div className="space-y-1.5">
                {/* Step 01 -> Step 02 */}
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 h-8 px-2.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06] flex items-center justify-center gap-1.5 text-center min-w-0">
                    <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">01</span>
                    <span className="font-sans text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate">{workflow[0]}</span>
                  </div>
                  <span className="text-zinc-400 dark:text-zinc-600 text-xs shrink-0 select-none">→</span>
                  <div className="flex-1 h-8 px-2.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06] flex items-center justify-center gap-1.5 text-center min-w-0">
                    <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">02</span>
                    <span className="font-sans text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate">{workflow[1]}</span>
                  </div>
                </div>
                {/* Step 03 -> Step 04 */}
                <div className="flex items-center gap-1.5">
                  <div className="flex-1 h-8 px-2.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06] flex items-center justify-center gap-1.5 text-center min-w-0">
                    <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">03</span>
                    <span className="font-sans text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate">{workflow[2]}</span>
                  </div>
                  <span className="text-zinc-400 dark:text-zinc-600 text-xs shrink-0 select-none">→</span>
                  <div className="flex-1 h-8 px-2.5 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.05] dark:border-white/[0.06] flex items-center justify-center gap-1.5 text-center min-w-0">
                    <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">04</span>
                    <span className="font-sans text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate">{workflow[3]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Verified Outcome (Clean Unclipped Row) */}
          <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.07] flex items-center gap-2">
            <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="font-sans text-xs text-zinc-800 dark:text-zinc-200 font-medium truncate">
              {outcome}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
