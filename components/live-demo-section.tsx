"use client";

import React from "react";
import { LunoVoiceDemo } from "./voice/luno-voice-demo";

interface LiveDemoSectionProps {
  title?: string;
  description?: string;
}

export function LiveDemoSection({
  title = "Talk to Luno",
  description = "Experience how an AI voice system can handle the first layer of a real business conversation.",
}: LiveDemoSectionProps) {
  return (
    <section id="demo" className="py-20 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3">
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
}
