"use client";

import React, { memo } from "react";
import { LunoVoiceDemo } from "./voice/luno-voice-demo";

interface LiveDemoSectionProps {
  title?: string;
  description?: string;
}

export const LiveDemoSection = memo(function LiveDemoSection({
  title = "Talk to Lunor.",
  description = "Experience how an AI voice system handles the first layer of a real business conversation.",
}: LiveDemoSectionProps) {
  return (
    <section id="demo" className="py-20 md:py-28 relative overflow-hidden border-y border-black/[0.05] dark:border-white/[0.05] bg-black/[0.015] dark:bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Restrained left-aligned header — the console is the visual anchor */}
        <div className="max-w-2xl mb-10 md:mb-14">
          <p className="type-eyebrow text-zinc-400 mb-3">Live Demo</p>
          <h2 className="type-h1 text-zinc-950 dark:text-white mb-3">
            {title}
          </h2>
          <p className="type-body text-zinc-500 dark:text-zinc-400">
            {description}
          </p>
        </div>

        {/* Central Voice Product Console */}
        <LunoVoiceDemo />
      </div>
    </section>
  );
});
