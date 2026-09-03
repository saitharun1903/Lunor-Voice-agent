"use client";

import React from "react";
import { Sliders, ShieldCheck, HeartHandshake } from "lucide-react";

export function AboutSection() {
  const pillars = [
    {
      title: "Engineered around your actual operations",
      description:
        "We don't deploy rigid scripts. We map your team's real decision trees, exceptions, and terminology into tailored conversational models.",
      icon: Sliders,
    },
    {
      title: "Human-centric phone experience",
      description:
        "Every agent is designed to listen with empathy, provide clear and concise answers, and gracefully transfer to human team members whenever necessary.",
      icon: HeartHandshake,
    },
    {
      title: "Continuous optimization & supervision",
      description:
        "We audit call logs, refine conversational pathways, and ensure your voice layer gets smarter with every interaction.",
      icon: ShieldCheck,
    },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl p-8 sm:p-12 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/[0.08] shadow-lg">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 font-mono">
              Our Studio Philosophy
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white mb-6">
              We build voice systems around how businesses actually work.
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed mb-8">
              Most automated phone menus and generic bots fail because they force callers into unnatural numbered menus. VoiceOps takes the opposite approach: we build conversational agents that understand colloquial speech, adapt to interruptions, and execute real actions across your business software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-black/[0.06] dark:border-white/[0.08]">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-3">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
