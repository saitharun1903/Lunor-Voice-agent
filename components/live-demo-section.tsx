"use client";

import React, { memo } from "react";
import dynamic from "next/dynamic";

const LunoVoiceDemo = dynamic(
  () => import("./voice/luno-voice-demo").then((mod) => mod.LunoVoiceDemo),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-2xl mx-auto h-72 rounded-3xl backdrop-blur-xl bg-white/80 dark:bg-zinc-900/80 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-zinc-500 font-medium">Loading Voice Pipeline...</span>
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
  description = "Experience how an AI voice system can handle the first layer of a real business conversation.",
}: LiveDemoSectionProps) {
  return (
    <section id="demo" className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 font-mono">
            Live Voice Demo
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Central Voice Demonstration */}
        <LunoVoiceDemo />
      </div>
    </section>
  );
});
