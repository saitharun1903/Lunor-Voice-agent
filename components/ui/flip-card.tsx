"use client";

import React, { memo, useCallback } from "react";
import { ArrowUpRight, ArrowLeft } from "lucide-react";

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
      className={`perspective-1400 w-full h-[370px] ${tiltClass} select-none outline-none cursor-pointer group transition-transform duration-200 ease-out hover:-translate-y-1`}
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
          className="backface-hidden absolute inset-0 rounded-2xl bg-white dark:bg-[#0e121d] border border-black/[0.07] dark:border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between text-left overflow-hidden transition-colors pointer-events-auto"
          style={{ transform: "rotateY(0deg)" }}
        >
          {/* Top: Index */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider">
              {index}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20" />
          </div>

          {/* Middle: Title & One-Line Purpose */}
          <div className="space-y-2.5 my-auto">
            <h3 className="font-serif text-2xl sm:text-[1.7rem] text-zinc-950 dark:text-white font-normal leading-snug tracking-tight">
              {title}
            </h3>
            <p className="type-sans-body-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Bottom: Subtle Interactive Exploration Cue */}
          <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06] flex items-center justify-between text-xs font-sans text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200 transition-colors">
            <span className="text-[11px] font-medium tracking-wide">Explore workflow</span>
            <div className="w-6 h-6 rounded-full bg-black/[0.04] dark:bg-white/[0.06] flex items-center justify-center text-zinc-500 dark:text-zinc-400">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>

        {/* =========================================================
            BACK FACE: Detailed Operational Discovery (Matte Architectural Surface)
            ========================================================= */}
        <div
          className="backface-hidden absolute inset-0 rounded-2xl bg-[#faf9f6] dark:bg-[#090c15] border border-black/[0.07] dark:border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between text-left overflow-hidden shadow-lg pointer-events-auto"
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* Top: Header & Close Trigger */}
          <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.07] pb-3">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="font-bold text-blue-600 dark:text-blue-400">{index}</span>
              <span className="text-zinc-400">·</span>
              <span className="uppercase text-zinc-700 dark:text-zinc-300 tracking-wider font-semibold">
                {title}
              </span>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 text-[11px] font-sans text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              <ArrowLeft className="w-3 h-3" />
              <span>Flip back</span>
            </button>
          </div>

          {/* Middle: Explanation & Workflow Pathway */}
          <div className="space-y-4 my-auto">
            <p className="type-sans-body-sm text-zinc-700 dark:text-zinc-300 leading-relaxed text-xs">
              {explanation}
            </p>

            {/* Workflow Pathway */}
            <div className="space-y-2">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">
                EXECUTION FLOW
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono">
                {workflow.map((step, idx) => (
                  <div
                    key={idx}
                    className="px-2.5 py-2 rounded-lg bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.05] text-zinc-800 dark:text-zinc-200 flex items-center gap-2"
                  >
                    <span className="text-[9px] text-blue-600 dark:text-blue-400 font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="font-sans text-[11px] truncate leading-tight font-medium">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom: Verified Outcome */}
          <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.07] flex items-center justify-between text-xs">
            <span className="font-sans text-[11px] text-emerald-700 dark:text-emerald-400 font-medium truncate max-w-[200px]">
              {outcome}
            </span>
            <span className="font-mono text-[9px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider shrink-0">
              VERIFIED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
