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
    <section id="demo" className="py-24 md:py-36 relative overflow-hidden chapter-midnight border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Editorial Heading Block with Smooth Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto mb-12 sm:mb-16 text-center space-y-4"
        >
          <p className="type-editorial-eyebrow text-blue-400">
            LIVE VOICE PRODUCT EXPERIENCE
          </p>

          <h2 className="type-serif-h1 text-white font-normal">
            {title}
          </h2>

          <p className="type-sans-body text-zinc-400 max-w-lg mx-auto leading-relaxed">
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
