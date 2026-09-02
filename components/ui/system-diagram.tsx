"use client";

import React, { memo } from "react";
import { Phone, Brain, Database, UserCheck, Cpu, ArrowRight, Activity } from "lucide-react";

export const SystemDiagram = memo(function SystemDiagram() {
  const steps = [
    {
      num: "01",
      title: "Inbound Carrier Signal",
      subtitle: "Direct SIP trunking or conditional call forwarding from your existing carrier",
      icon: Phone,
      tag: "VOICE STREAM",
      detail: "Sub-400ms direct audio stream ingested via carrier SIP trunk.",
    },
    {
      num: "02",
      title: "Acoustic Intent Parsing",
      subtitle: "Dynamic speech-to-text, entity recognition, and multi-variable extraction",
      icon: Brain,
      tag: "NEURAL ENGINE",
      detail: "Colloquial language normalized into structured data fields.",
    },
    {
      num: "03",
      title: "Autonomous API Action",
      subtitle: "Query calendar, hold booking slot, and update CRM records in real time",
      icon: Database,
      tag: "SYSTEM API",
      detail: "Direct API dispatch to Google Calendar, Salesforce, EHR, etc.",
    },
    {
      num: "04",
      title: "Resolution or Warm Handoff",
      subtitle: "Instant SMS confirmation or warm SIP transfer with live transcript notes",
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full type-eyebrow text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>Neural Telephony Pipeline</span>
          </div>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-5">
            How Lunor turns conversation into action.
          </h2>

          <p className="type-body-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
            A deterministic, enterprise-grade telephony pipeline that converts caller speech into validated business actions with zero delay.
          </p>
        </div>

        {/* 4-Step Architecture Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-6 rounded-3xl structured-card flex flex-col justify-between space-y-6 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.06] pb-4 mb-5">
                    <span className="type-label-tech font-bold text-blue-600 dark:text-blue-400">
                      STEP {step.num}
                    </span>
                    <span className="type-label-tech px-2 py-0.5 rounded bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-400">
                      {step.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-black/[0.03] dark:bg-white/[0.05] text-zinc-800 dark:text-zinc-200 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3 className="type-h3 text-zinc-950 dark:text-white mb-2 leading-snug">
                    {step.title}
                  </h3>

                  <p className="type-body-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>

                <div className="pt-4 border-t border-black/[0.04] dark:border-white/[0.06] type-body-sm text-zinc-500">
                  {step.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Concrete Illustrative Architecture Trace Banner */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl structured-card space-y-4 shadow-lg">
          <div className="flex items-center justify-between type-label-tech text-zinc-500 border-b border-black/[0.05] dark:border-white/[0.06] pb-3">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-blue-500" />
              <span>LIVE TELEPHONY TRACE LOG</span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">280MS LATENCY</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
              <span className="type-label-tech text-zinc-400 block mb-1">INBOUND CALLER AUDIO:</span>
              <p className="type-body-sm text-zinc-800 dark:text-zinc-200 font-medium">
                “Do you have a 3BHK in Gachibowli with a ₹90L budget?”
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
              <span className="type-label-tech text-blue-600 dark:text-blue-400 block mb-1">
                NORMALIZED INTENT & ENTITIES:
              </span>
              <p className="type-body-sm text-zinc-800 dark:text-zinc-200 font-mono">
                Type: 3BHK | Loc: Gachibowli | Budget: ₹90L
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.05]">
              <span className="type-label-tech text-emerald-600 dark:text-emerald-400 block mb-1">
                EXECUTED BUSINESS ACTION:
              </span>
              <p className="type-body-sm text-zinc-800 dark:text-zinc-200 font-medium">
                Showing scheduled in Broker Calendar & CRM alert sent
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
