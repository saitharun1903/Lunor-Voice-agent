"use client";

import React, { memo } from "react";
import { LunoVoiceDemo } from "./voice/luno-voice-demo";

interface LiveDemoSectionProps {
  title?: string;
  description?: string;
}

export const LiveDemoSection = memo(function LiveDemoSection({
  title = "Talk to Lunor.",
  description = "Experience how an AI voice system handles the first layer of a real business conversation with sub-400ms latency.",
}: LiveDemoSectionProps) {
  return (
    <section id="demo" className="py-24 md:py-32 relative overflow-hidden border-y border-black/[0.05] dark:border-white/[0.05] bg-black/[0.015] dark:bg-white/[0.01]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Restrained Header */}
        <div className="max-w-3xl mb-12 md:mb-16 text-left">
          <p className="type-eyebrow text-blue-600 dark:text-blue-400 mb-3 tracking-wider">
            LIVE VOICE SESSION
          </p>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-4">
            {title}
          </h2>

          <p className="type-body-lg text-zinc-600 dark:text-zinc-400 max-w-xl">
            {description}
          </p>
        </div>

        {/* Central Voice Product Console */}
        <LunoVoiceDemo />
      </div>
    </section>
  );
});
