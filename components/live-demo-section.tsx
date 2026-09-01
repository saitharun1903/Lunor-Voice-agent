"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";
import { Sparkles, Radio, Shield, Zap } from "lucide-react";

const LunoVoiceDemo = dynamic(
  () => import("./voice/luno-voice-demo").then((mod) => mod.LunoVoiceDemo),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-2xl mx-auto h-80 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center shadow-xl">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-zinc-500 font-medium font-mono">Initializing Acoustic Telephony Engine...</span>
        </div>
      </div>
    ),
  }
);

interface LiveDemoSectionProps {
  title?: string;
  description?: string;
}

export const LiveDemoSection = memo(function LiveDemoSection({
  title = "Talk to Luno",
  description = "Experience how an AI voice system handles the first layer of a real business conversation with sub-second response times.",
}: LiveDemoSectionProps) {
  return (
    <section id="demo" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 mb-4 uppercase font-mono">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Interactive Technology Proof</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-4">
            {title}
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed text-balance">
            {description}
          </p>
        </div>

        {/* Central Dedicated Acoustic Voice Deck */}
        <LunoVoiceDemo />
      </div>
    </section>
  );
});
