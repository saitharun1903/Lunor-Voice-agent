"use client";

import React, { memo } from "react";
import { Phone, Brain, Database, ArrowRight, ShieldCheck, UserCheck } from "lucide-react";

export const SystemDiagram = memo(function SystemDiagram() {
  const steps = [
    {
      num: "01",
      title: "Inbound Carrier Signal",
      subtitle: "Customer dials your existing phone line via SIP or forwarding",
      icon: Phone,
      tag: "VOICE STREAM",
      detail: "Sub-400ms direct audio stream ingested via carrier SIP trunk.",
    },
    {
      num: "02",
      title: "Lunor Neural Understanding",
      subtitle: "Dynamic speech-to-intent parsing and entity extraction",
      icon: Brain,
      tag: "INTENT & ENTITY",
      detail: "Colloquial language normalized into structured schema.",
    },
    {
      num: "03",
      title: "Autonomous Business Action",
      subtitle: "Query calendar, hold booking slot, and update CRM database",
      icon: Database,
      tag: "SYSTEM API",
      detail: "Direct API dispatch to Google Calendar, Salesforce, EHR, etc.",
    },
    {
      num: "04",
      title: "Resolution or Warm Handoff",
      subtitle: "SMS confirmation dispatched or warm human SIP transfer executed",
      icon: UserCheck,
      tag: "COMPLETION",
      detail: "Instant confirmation SMS or live phone handoff with full transcript.",
    },
  ];

  return (
    <section id="architecture" className="py-24 md:py-32 relative overflow-hidden bg-black/[0.015] dark:bg-white/[0.015] border-y border-black/[0.04] dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4 uppercase">
            <span>Product Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.035em] text-zinc-950 dark:text-white mb-5">
            How Lunor turns conversation into action.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
            A deterministic, enterprise-grade telephony pipeline that converts caller speech into validated business actions with zero delay.
          </p>
        </div>

        {/* 4-Step Architecture Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-6 rounded-3xl structured-card flex flex-col justify-between space-y-6"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.06] pb-4 mb-5">
                    <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                      STEP {step.num}
                    </span>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400">
                      {step.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] text-zinc-800 dark:text-zinc-200 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] font-mono text-zinc-500">
                  {step.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Concrete Illustrative Architecture Trace Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl structured-card space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 border-b border-black/[0.05] dark:border-white/[0.06] pb-3">
            <span>LIVE TELEPHONY TRACE EXAMPLE</span>
            <span className="text-emerald-600 dark:text-emerald-400">280ms Total Latency</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
              <span className="text-[10px] font-mono text-zinc-400 block mb-1">CALLER AUDIO:</span>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium">
                “Do you have a 3BHK in Gachibowli with a ₹90L budget?”
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 block mb-1">
                EXTRACTED INTENT & DATA:
              </span>
              <p className="font-mono text-zinc-800 dark:text-zinc-200">
                Type: 3BHK | Loc: Gachibowli | Budget: ₹90L
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block mb-1">
                EXECUTED ACTION:
              </span>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium">
                Showing scheduled in Broker Calendar & CRM alert sent
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
