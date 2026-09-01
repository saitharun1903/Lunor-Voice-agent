"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";
import { Mic, Sparkles, Shield, Radio, Layers } from "lucide-react";

// Code-split voice demo SDK for instant initial page paint & 0 initial JS overhead
const LunoVoiceDemo = dynamic(
  () => import("./voice/luno-voice-demo").then((mod) => mod.LunoVoiceDemo),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-2xl mx-auto rounded-3xl p-10 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70 border border-black/[0.06] dark:border-white/[0.08] shadow-2xl flex flex-col items-center justify-center min-h-[380px] text-center">
        <div className="w-20 h-20 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 animate-pulse">
          <Mic className="w-8 h-8" />
        </div>
        <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          Initializing Lunor Voice Engine...
        </p>
        <p className="text-xs text-zinc-500 mt-1 font-mono">
          Ready for live low-latency conversation
        </p>
      </div>
    ),
  }
);

interface LiveDemoSectionProps {
  title?: string;
  description?: string;
}

export const LiveDemoSection = memo(function LiveDemoSection({
  title = "Talk to Lunor",
  description = "Experience how an AI voice system handles the first layer of a real business conversation with sub-second response times.",
}: LiveDemoSectionProps) {
  return (
    <section id="demo" className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 mb-4 uppercase font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Live Interactive Product Demonstration</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-4">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-balance">
            {description}
          </p>
        </div>

        {/* Central Dedicated Voice Terminal Console */}
        <div className="relative">
          <LunoVoiceDemo />
        </div>
      </div>
    </section>
  );
});
