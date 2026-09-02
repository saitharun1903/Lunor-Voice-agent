"use client";

import React, { memo } from "react";
import { LunoVoiceDemo } from "./voice/luno-voice-demo";
import { Radio } from "lucide-react";

interface LiveDemoSectionProps {
  title?: string;
  description?: string;
}

export const LiveDemoSection = memo(function LiveDemoSection({
  title = "Talk to Lunor.",
  description = "Experience how an AI voice system handles the first layer of a real business conversation with sub-second response times.",
}: LiveDemoSectionProps) {
  return (
    <section id="demo" className="py-20 md:py-28 relative overflow-hidden border-y border-black/[0.05] dark:border-white/[0.05] bg-black/[0.015] dark:bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full type-eyebrow text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Live Voice Demo</span>
          </div>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-4">
            {title}
          </h2>

          <p className="type-body-lg text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto">
            {description}
          </p>
        </div>

        {/* Central Voice Product Console */}
        <LunoVoiceDemo />
      </div>
    </section>
  );
});
