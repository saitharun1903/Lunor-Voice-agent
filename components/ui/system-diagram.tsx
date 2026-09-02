"use client";

import React, { memo } from "react";
import { Phone, Brain, Database, UserCheck, Cpu } from "lucide-react";

export const SystemDiagram = memo(function SystemDiagram() {
  const steps = [
    {
      num: "01",
      title: "Call Received",
      subtitle: "Answers instantly on your existing business phone number via call forwarding or SIP",
      icon: Phone,
      tag: "Inbound Call",
      detail: "Immediate answer with zero hold times.",
    },
    {
      num: "02",
      title: "Understanding Intent",
      subtitle: "Listens naturally to questions, understands context, and collects required information",
      icon: Brain,
      tag: "Conversation",
      detail: "Natural dialogue without robotic phone trees.",
    },
    {
      num: "03",
      title: "Taking Action",
      subtitle: "Checks calendar availability, holds appointments, and updates CRM records in real time",
      icon: Database,
      tag: "Business Systems",
      detail: "Direct sync with Google Calendar, Salesforce, etc.",
    },
    {
      num: "04",
      title: "Resolution or Handoff",
      subtitle: "Sends SMS confirmation or executes a warm phone transfer to your staff with notes",
      icon: UserCheck,
      tag: "Outcome",
      detail: "Instant confirmation or warm transfer with notes.",
    },
  ];

  return (
    <section id="architecture" className="py-20 md:py-28 relative overflow-hidden bg-black/[0.012] dark:bg-white/[0.012] border-y border-black/[0.04] dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full type-eyebrow text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-3.5">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture</span>
          </div>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-4">
            How Lunor turns conversation into action.
          </h2>

          <p className="type-body text-zinc-600 dark:text-zinc-400">
            A reliable, direct pipeline that turns customer voice calls into completed business outcomes with zero delay.
          </p>
        </div>

        {/* 4-Step Architecture Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded-3xl structured-card flex flex-col justify-between space-y-5 shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-black/[0.04] dark:border-white/[0.06] pb-3 mb-4">
                    <span className="type-eyebrow font-bold text-blue-600 dark:text-blue-400">
                      STEP {step.num}
                    </span>
                    <span className="type-eyebrow px-2 py-0.5 rounded bg-black/[0.03] dark:bg-white/[0.05] text-zinc-500">
                      {step.tag}
                    </span>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] text-zinc-700 dark:text-zinc-300 flex items-center justify-center mb-3.5">
                    <Icon className="w-4 h-4" />
                  </div>

                  <h3 className="type-h3 text-zinc-950 dark:text-white mb-1.5 leading-snug">
                    {step.title}
                  </h3>

                  <p className="type-body-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {step.subtitle}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/[0.04] dark:border-white/[0.06] text-xs text-zinc-500">
                  {step.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Concrete Trace Banner */}
        <div className="mt-8 p-6 sm:p-7 rounded-3xl structured-card space-y-3.5 shadow-md">
          <div className="flex items-center justify-between type-eyebrow text-zinc-500 border-b border-black/[0.04] dark:border-white/[0.06] pb-2.5">
            <span>Example Call Execution</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Sub-Second Response</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.03] dark:border-white/[0.04]">
              <span className="type-eyebrow text-zinc-400 block mb-0.5">Caller Question</span>
              <p className="type-body-sm text-zinc-800 dark:text-zinc-200">
                “Do you have a 3BHK in Gachibowli with a ₹90L budget?”
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.03] dark:border-white/[0.04]">
              <span className="type-eyebrow text-blue-600 dark:text-blue-400 block mb-0.5">
                Details Understood
              </span>
              <p className="type-body-sm text-zinc-800 dark:text-zinc-200">
                3BHK · Gachibowli · ₹90L Budget
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.03] dark:border-white/[0.04]">
              <span className="type-eyebrow text-emerald-600 dark:text-emerald-400 block mb-0.5">
                Action Taken
              </span>
              <p className="type-body-sm text-zinc-800 dark:text-zinc-200">
                Showing scheduled in Broker Calendar & CRM alert sent
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
