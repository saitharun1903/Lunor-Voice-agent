"use client";

import React, { memo } from "react";
import { Phone, ArrowRight, UserCheck, CalendarCheck, Shield } from "lucide-react";

export const SystemDiagram = memo(function SystemDiagram() {
  const layers = [
    {
      number: "01",
      title: "Inbound Caller",
      description: "A prospective customer, patient, or client calls your normal business phone number.",
      role: "Incoming Question / Booking Need",
    },
    {
      number: "02",
      title: "VoiceOps First Layer",
      description: "Answers in under a second. Listens naturally, understands context, and conducts a friendly, helpful dialogue.",
      role: "Conversational Understanding & Action",
      highlight: true,
    },
    {
      number: "03",
      title: "Business Outcome / Handoff",
      description: "Locks the appointment in your calendar, logs details into your CRM, or warm-transfers complex requests to staff.",
      role: "Verified Action or Human Transfer",
    },
  ];

  return (
    <section id="architecture" className="py-24 md:py-36 relative overflow-hidden chapter-stone border-t border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="max-w-2xl mb-16 text-left space-y-3">
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            THE SIGNATURE CONCEPT
          </p>

          <h2 className="type-serif-h1 text-zinc-950 dark:text-white font-normal">
            The First Layer.
          </h2>

          <p className="type-sans-body-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            VoiceOps sits quietly in front of your phones, taking care of initial conversations before they interrupt your operational team.
          </p>
        </div>

        {/* Elegant 3-Stage Conceptual Visual Flow (Not a Boxy Flowchart) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 relative">
          {layers.map((layer, idx) => (
            <div
              key={layer.number}
              className={`relative p-8 rounded-2xl transition-all duration-200 ${
                layer.highlight
                  ? "bg-white dark:bg-[#111420] border-2 border-blue-600/30 shadow-xl"
                  : "bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.07]"
              }`}
            >
              {/* Layer Number & Role */}
              <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-4 mb-5">
                <span className={`font-mono text-xs font-bold ${layer.highlight ? "text-blue-600 dark:text-blue-400" : "text-zinc-400"}`}>
                  STAGE {layer.number}
                </span>
                <span className="type-editorial-eyebrow text-zinc-500">
                  {layer.role}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-serif text-2xl text-zinc-950 dark:text-white font-normal mb-3">
                {layer.title}
              </h3>

              {/* Description */}
              <p className="type-sans-body-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {layer.description}
              </p>
            </div>
          ))}
        </div>

        {/* Quiet Bottom Editorial Note */}
        <div className="mt-12 pt-8 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-baseline justify-between gap-4 text-xs text-zinc-500 font-sans">
          <span>Works with your existing phone carriers, Twilio, SIP trunks, or simple conditional call forwarding.</span>
          <span className="font-mono text-zinc-400">Zero hardware installation required</span>
        </div>
      </div>
    </section>
  );
});
