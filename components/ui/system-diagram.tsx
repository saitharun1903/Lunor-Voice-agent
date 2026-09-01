"use client";

import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import {
  PhoneCall,
  Cpu,
  Database,
  UserCheck,
  Calendar,
  MessageSquare,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2,
  Sparkles,
  GitBranch,
} from "lucide-react";

export const SystemDiagram = memo(function SystemDiagram() {
  const [activeNode, setActiveNode] = useState<number>(1);

  const steps = [
    {
      id: 0,
      title: "Inbound Customer Call",
      badge: "Step 01 • Telephony Intake",
      icon: PhoneCall,
      color: "from-blue-600 to-cyan-500",
      description:
        "Customer dials your existing business phone number. The call connects instantly with sub-400ms response time via SIP trunking.",
      details: ["Sub-400ms connection", "No hold music or IVR maze", "Zero dropped calls"],
    },
    {
      id: 1,
      title: "Lunor Neural Voice Engine",
      badge: "Step 02 • Conversational Logic",
      icon: Cpu,
      color: "from-blue-600 via-indigo-600 to-purple-600",
      description:
        "Understands caller intent in real time, answers business questions from your verified knowledge base, and qualifies requirements conversationally.",
      details: ["Real-time intent analysis", "Verified business knowledge", "Multi-turn context memory"],
    },
    {
      id: 2,
      title: "Autonomous Action Execution",
      badge: "Step 03 • Operational Backend",
      icon: Database,
      color: "from-indigo-600 to-blue-500",
      description:
        "Executes business actions directly: books calendar slots, verifies buyer criteria, updates CRM records, and sends SMS confirmation links.",
      details: ["Calendar slot booking", "Instant CRM record creation", "Automated SMS/Email dispatch"],
    },
    {
      id: 3,
      title: "Warm Human Escalation",
      badge: "Step 04 • Smart Hand-off",
      icon: UserCheck,
      color: "from-emerald-600 to-teal-500",
      description:
        "When an inquiry requires executive judgment, Lunor executes an immediate warm transfer to your team with full caller context and transcript.",
      details: ["Zero-wait warm SIP transfer", "Full transcript & context attached", "Custom escalation triggers"],
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-black/[0.015] dark:bg-white/[0.015] border-y border-black/[0.04] dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 mb-4 uppercase font-mono">
            <GitBranch className="w-3.5 h-3.5" />
            <span>The First Layer Concept</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-5">
            How Lunor automates the first layer.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto text-balance">
            AI handles the repetitive first layer of enquiries, qualification, and scheduling. Your human team handles what requires human expertise.
          </p>
        </div>

        {/* Visual Architecture Flow Diagram */}
        <div className="rounded-3xl p-6 sm:p-10 backdrop-blur-xl bg-white/90 dark:bg-zinc-900/80 border border-black/[0.08] dark:border-white/[0.12] shadow-2xl relative overflow-hidden">
          {/* Top Specular Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-400" />

          {/* 4 Connected Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeNode === step.id;

              return (
                <div
                  key={step.id}
                  onClick={() => setActiveNode(step.id)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-200 border flex flex-col justify-between relative group ${
                    isActive
                      ? "bg-blue-50/70 dark:bg-blue-950/30 border-blue-500/40 dark:border-blue-400/40 shadow-lg scale-[1.02]"
                      : "bg-black/[0.02] dark:bg-white/[0.03] border-black/[0.05] dark:border-white/[0.06] hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                  }`}
                >
                  <div>
                    {/* Step Badge & Indicator */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full">
                        {step.badge.split("•")[0].trim()}
                      </span>
                      {idx < 3 && (
                        <ArrowRight className="w-4 h-4 text-zinc-400 hidden lg:block -mr-3" />
                      )}
                    </div>

                    {/* Icon */}
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-md bg-gradient-to-tr ${step.color} transition-transform duration-200 group-hover:scale-105`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-base font-bold text-zinc-950 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="mt-5 pt-3 border-t border-black/[0.05] dark:border-white/[0.06] space-y-1.5">
                    {step.details.map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Clarifying Statement */}
          <div className="mt-8 pt-6 border-t border-black/[0.06] dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>
                <strong>Zero Disruption:</strong> Plugs directly into your existing PBX, Twilio, or carrier SIP trunk.
              </span>
            </div>

            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold font-mono">
              <Zap className="w-3.5 h-3.5" />
              <span>Sub-400ms Total Latency Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
