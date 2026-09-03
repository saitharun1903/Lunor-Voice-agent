"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";

export const IntegrationsSection = memo(function IntegrationsSection() {
  const categories = [
    {
      category: "Telephony & Carriers",
      items: ["Twilio SIP", "Vonage", "RingCentral", "Telnyx", "Direct Carrier Forwarding"],
    },
    {
      category: "Calendars & Scheduling",
      items: ["Google Calendar", "Outlook 365", "Cal.com", "Calendly", "Acuity"],
    },
    {
      category: "CRM & Pipelines",
      items: ["HubSpot", "Salesforce", "Zoho CRM", "Pipedrive", "Close"],
    },
    {
      category: "Business Tools & Dispatch",
      items: ["Google Sheets", "Slack", "Zapier", "Make.com", "Custom Webhooks"],
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden chapter-ivory border-t border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-14 text-left space-y-2"
        >
          <p className="type-editorial-eyebrow text-blue-600 dark:text-blue-400">
            CONNECTIVITY
          </p>
          <h2 className="type-serif-h2 text-zinc-950 dark:text-white font-normal">
            Works with the software your business already runs.
          </h2>
          <p className="type-sans-body-sm text-zinc-600 dark:text-zinc-400">
            VoiceOps connects cleanly with your existing carriers, booking tools, and databases with zero disruption to current phone numbers.
          </p>
        </motion.div>

        {/* Clean Editorial Columns with Staggered Fade */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 text-left"
            >
              <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-white tracking-wider block border-b border-black/[0.08] dark:border-white/[0.1] pb-2">
                {cat.category}
              </span>
              <ul className="space-y-2 font-sans text-xs text-zinc-600 dark:text-zinc-400">
                {cat.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 hover:text-zinc-950 dark:hover:text-white transition-colors">
                    <span className="w-1 h-1 rounded-full bg-blue-600/60 dark:bg-blue-400/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});
