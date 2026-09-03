"use client";

import React, { memo } from "react";
import { LunoVoiceDemo } from "./voice/luno-voice-demo";

interface LiveDemoSectionProps {
  title?: string;
  description?: string;
}

export const LiveDemoSection = memo(function LiveDemoSection({
  title = "Talk to VoiceOps.",
  description = "Experience how an AI voice system handles the first layer of a real business conversation with sub-second turn cadence.",
}: LiveDemoSectionProps) {
  return (
    <section id="demo" className="py-24 md:py-36 relative overflow-hidden chapter-midnight border-t border-white/[0.08]">
      {/* Subtle Atmospheric Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] ambient-glow-midnight pointer-events-none -z-10 blur-3xl opacity-75" />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Editorial Heading Block */}
        <div className="max-w-2xl mx-auto mb-12 sm:mb-16 text-center space-y-4">
          <p className="type-editorial-eyebrow text-blue-400">
            LIVE VOICE PRODUCT EXPERIENCE
          </p>

          <h2 className="type-serif-h1 text-white font-normal">
            {title}
          </h2>

          <p className="type-sans-body text-zinc-400 max-w-lg mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Premier Voice Console */}
        <LunoVoiceDemo />
      </div>
    </section>
  );
});
