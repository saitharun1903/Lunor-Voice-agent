"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
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
    <section id="demo" className="py-24 md:py-36 relative overflow-hidden bg-[#faf8f5] dark:bg-[#07090e] border-t border-black/[0.06] dark:border-white/[0.08] transition-colors">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Editorial Heading Block with Smooth Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto mb-12 sm:mb-16 text-center space-y-3"
        >
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            LIVE VOICE PRODUCT EXPERIENCE
          </p>

          <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal">
            {title}
          </h2>

          <p className="type-sans-body text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* Premier Voice Console */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 16 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <LunoVoiceDemo />
        </motion.div>
      </div>
    </section>
  );
});
