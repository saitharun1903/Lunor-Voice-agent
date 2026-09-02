"use client";

import React, { memo } from "react";
import { PhoneCall, Calendar, Layers, ShieldCheck, CheckCircle2 } from "lucide-react";

export const IntegrationsSection = memo(function IntegrationsSection() {
  const categories = [
    {
      title: "Telephony & Carrier Networks",
      description: "Keep your existing business phone number. Connect via conditional call forwarding or direct SIP trunking.",
      items: ["Twilio", "RingCentral", "Telnyx", "Vonage", "8x8", "FreePBX / Asterisk", "Direct SIP Trunking"],
      icon: PhoneCall,
      highlight: "Keep Existing Number",
    },
    {
      title: "Calendar & Scheduling APIs",
      description: "Real-time bi-directional slot verification, conflict prevention, and instant booking dispatch.",
      items: ["Google Calendar", "Outlook 365", "Calendly", "OpenTable", "Resy", "JaneApp", "Mindbody"],
      icon: Calendar,
      highlight: "Zero Double Booking",
    },
    {
      title: "CRMs & Operational Databases",
      description: "Automatically log caller transcripts, qualified lead attributes, and booking confirmations into your database.",
      items: ["Salesforce", "HubSpot", "GoHighLevel", "Zoho CRM", "Zendesk", "Zapier", "Custom Webhooks"],
      icon: Layers,
      highlight: "Instant Lead Sync",
    },
    {
      title: "Enterprise Governance & Security",
      description: "Strict isolation ensuring zero caller audio or transcripts are ever used to train foundation models.",
      items: ["SOC2 Type II Ready", "HIPAA PHI Safeguards", "TLS 1.3 / SRTP", "Zero Model Retention", "Role-Based Access"],
      icon: ShieldCheck,
      highlight: "Zero Data Retention",
    },
  ];

  return (
    <section id="integrations" className="py-24 md:py-32 relative overflow-hidden bg-black/[0.015] dark:bg-white/[0.015] border-y border-black/[0.04] dark:border-white/[0.04]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 md:mb-20 text-left">
          <p className="type-eyebrow text-zinc-400 mb-4">Integrations</p>

          <h2 className="type-h1 text-zinc-950 dark:text-white mb-5">
            Integrates natively into your existing phone stack.
          </h2>

          <p className="type-body text-zinc-600 dark:text-zinc-400 max-w-2xl">
            No complex phone system rip-and-replace. Lunor sits seamlessly in front of your carriers, booking tools, and CRMs.
          </p>
        </div>

        {/* Integration Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="p-8 rounded-3xl structured-card flex flex-col justify-between space-y-6 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-black/[0.05] dark:border-white/[0.06] pb-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-black/[0.03] dark:bg-white/[0.05] text-zinc-800 dark:text-zinc-200 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="type-h3 text-zinc-950 dark:text-white">
                        {cat.title}
                      </h3>
                    </div>
                    <span className="type-eyebrow px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-zinc-600 dark:text-zinc-300">
                      {cat.highlight}
                    </span>
                  </div>

                  <p className="type-body-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                    {cat.description}
                  </p>

                  {/* Pills Grid */}
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg type-body-sm bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.06] text-zinc-800 dark:text-zinc-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/[0.04] dark:border-white/[0.06] flex items-center justify-between type-body-sm text-zinc-500">
                  <span>Direct Integration</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Zero Lock-In</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});
