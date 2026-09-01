"use client";

import React, { memo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Utensils,
  Stethoscope,
  Building2,
  Briefcase,
  Check,
  ArrowRight,
  Sparkles,
  PhoneCall,
  Calendar,
  Filter,
  Layers,
  Send,
} from "lucide-react";
import { IndustryItem } from "@/lib/types";

interface IndustriesProps {
  industries: IndustryItem[];
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Home,
  Utensils,
  Stethoscope,
  Building2,
  Briefcase,
};

export const IndustriesSection = memo(function IndustriesSection({ industries }: IndustriesProps) {
  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const realEstate = industries.find((i) => i.id === "real-estate");
  const otherIndustries = industries.filter((i) => i.id !== "real-estate");

  return (
    <section id="industries" className="py-24 md:py-32 relative overflow-hidden bg-black/[0.015] dark:bg-white/[0.015] border-y border-black/[0.04] dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 mb-4 uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailored Industry Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-5">
            See what your business could automate.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto text-balance">
            Every phone conversation is structured into custom business logic, calendar scheduling, and backend operational synchronization.
          </p>
        </div>

        {/* 1. Large Editorial Featured Showcase: REAL ESTATE */}
        {realEstate && (
          <div className="mb-16 rounded-3xl p-8 sm:p-12 backdrop-blur-xl bg-white/90 dark:bg-zinc-900/80 border border-blue-500/30 dark:border-blue-400/30 shadow-2xl relative overflow-hidden">
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Column: Editorial Summary */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <Home className="w-3.5 h-3.5" />
                  <span>Featured Solution • Real Estate & Leasing</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white leading-tight">
                  Turn every property enquiry into an opportunity.
                </h3>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Prospective buyers and tenants call across varying hours. Luno provides an instant, knowledgeable conversational voice layer that qualifies buyer budgets, answers listing specifications, and schedules private showings directly into agent calendars.
                </p>

                <div className="pt-2">
                  <button
                    onClick={scrollToContact}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-full text-xs sm:text-sm font-semibold glass-button-primary shadow-lg"
                  >
                    <span>Discuss Your Real Estate Workflow</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Right Column: 5-Step Inbound Flow Visual */}
              <div className="lg:col-span-6 rounded-2xl p-6 sm:p-7 bg-black/[0.03] dark:bg-black/40 border border-black/[0.06] dark:border-white/[0.08] space-y-4">
                <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.06] pb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Real Estate Autonomous Workflow
                  </span>
                  <span className="text-[11px] text-zinc-400">0s Response Time</span>
                </div>

                <div className="space-y-3">
                  {[
                    { step: "01", title: "Incoming Call", sub: "Instant greeting & property listing recognition", icon: PhoneCall },
                    { step: "02", title: "Intent & Requirement", sub: "Collects bedroom count, location & move-in timeline", icon: Layers },
                    { step: "03", title: "Buyer Qualification", sub: "Pre-approval status & budget range verification", icon: Filter },
                    { step: "04", title: "Private Showing Schedule", sub: "Coordinates showing slot onto broker calendar", icon: Calendar },
                    { step: "05", title: "Instant Notification", sub: "SMS confirmation & CRM lead sync dispatched", icon: Send },
                  ].map((wf, idx) => {
                    const WfIcon = wf.icon;
                    return (
                      <div
                        key={idx}
                        className="flex items-center gap-3.5 p-3 rounded-xl bg-white/70 dark:bg-zinc-800/60 border border-black/[0.04] dark:border-white/[0.06] shadow-sm"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xs shrink-0">
                          <WfIcon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
                              {wf.title}
                            </h4>
                            <span className="text-[10px] font-mono text-zinc-400">Step {wf.step}</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 truncate">{wf.sub}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. Other Industry Cards (Restaurants, Clinics, Hotels, Service Businesses) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {otherIndustries.map((ind) => {
            const Icon = ICON_MAP[ind.icon] || Briefcase;

            return (
              <div
                key={ind.id}
                className="relative rounded-3xl p-7 backdrop-blur-md bg-white/70 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/[0.08] shadow-sm hover:shadow-xl hover:border-black/[0.12] dark:hover:border-white/[0.16] transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-2xl bg-blue-500/10 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1.5">
                    {ind.name}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3">
                    {ind.tagline}
                  </p>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {ind.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                      Workflows:
                    </p>
                    <div className="space-y-1.5">
                      {ind.workflows.map((wf, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                          <span>{wf}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.05] dark:border-white/[0.06]">
                  <button
                    onClick={scrollToContact}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-full text-xs font-semibold glass-button-secondary group-hover:border-blue-500/30 transition-all"
                  >
                    <span>Discuss This Workflow</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-500" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
