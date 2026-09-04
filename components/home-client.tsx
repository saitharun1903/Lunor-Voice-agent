"use client";

import React, { memo, useCallback, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { AboutSection } from "./about";
import { LiveDemoSection } from "./live-demo-section";
import { SystemDiagram } from "./ui/system-diagram";
import { UseCasesSection } from "./use-cases";
import { WorkflowSection } from "./workflow-section";
import { IndustriesSection } from "./industries";
import { IntegrationsSection } from "./integrations";
import { PortfolioSection } from "./portfolio";
import { HowItWorksSection } from "./how-it-works";
import { FaqSection } from "./faq";
import { ContactSection } from "./contact-section";
import { Footer } from "./footer";
import { SignalSpine } from "./ui/signal-spine";
import { SiteData } from "@/lib/types";

interface HomeClientProps {
  initialData?: SiteData;
}

export const HomeClient = memo(function HomeClient({ initialData }: HomeClientProps) {
  const settings = initialData?.settings || {
    companyName: "VOICEOPS",
    tagline: "Voice automation for the first layer of business calls.",
    email: "conversations@voiceops.in",
    phone: "+1 (888) 586-6240",
    whatsapp: "+18885866240",
    meetingUrl: "https://meet.google.com",
    heroEyebrow: "VOICE AUTOMATION FOR BUSINESS",
    heroHeadline: "Automate the first layer of every call.",
    heroSubheadline:
      "VoiceOps builds AI voice systems that handle repetitive business conversations — from enquiries and bookings to lead qualification, support, follow-ups and more.",
    googleSheetsWebhookUrl: "",
    voiceDemoEnabled: true,
    voiceDemoTitle: "Talk to VoiceOps.",
    voiceDemoDescription:
      "Experience how an AI voice system handles the first layer of a real business conversation with sub-second response times.",
  };

  const stats = initialData?.stats || {
    companiesBuilt: 12,
    voiceAgents: 24,
    useCasesAutomated: 40,
    uptime: "99.98%",
    avgResponseLatency: "<400ms",
  };

  const projects = initialData?.projects || [];
  const industries = initialData?.industries || [];
  const useCases = initialData?.useCases || [];

  const scrollToDemo = useCallback(() => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      if (y > 450 && y < lastY) {
        setShowScrollTop(true);
      } else if (y <= 450 || y > lastY + 15) {
        setShowScrollTop(false);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-blue-600 selection:text-white transition-colors duration-200 overflow-x-hidden">
      {/* Continuous Acoustic Signal Thread (Visual Spine) */}
      <SignalSpine />

      {/* Dynamic Scroll-Reactive Navigation */}
      <Navbar navigation={initialData?.navigation} />

      {/* Main Experience Flow: 13-Chapter Seamless Continuous Architecture */}
      <main className="relative">
        {/* Chapter 01: Hero (Cinematic Dark Opening with Flowing VoiceOps Signal) */}
        <Hero
          eyebrow={settings.heroEyebrow}
          headline={settings.heroHeadline}
          subheadline={settings.heroSubheadline}
          onTalkToVoiceOps={scrollToDemo}
        />

        {/* Chapter 02: Editorial Statement (The Calls Your Team Shouldn't Have to Answer) */}
        <AboutSection />

        {/* Chapter 03: Live Voice Demo (Hardware-Grade VoiceOps Product Moment) */}
        <LiveDemoSection
          title={settings.voiceDemoTitle || "Talk to VoiceOps."}
          description={
            settings.voiceDemoDescription ||
            "Experience how an AI voice system handles the first layer of a real business conversation with sub-second turn cadence."
          }
        />

        {/* Chapter 04: First-Layer Experience (Customer → VoiceOps → Understand → Act → Resolution) */}
        <SystemDiagram />

        {/* Chapter 05: Capabilities Matrix (01-06 3D Flip Card System) */}
        <UseCasesSection useCases={useCases} capabilities={initialData?.capabilities} />

        {/* Chapter 06: Workflow (Calls Should End in Actions: 4-Stage Execution Pipeline) */}
        <WorkflowSection />

        {/* Chapter 07: Industry World (Voice Automation for the Way Your Business Works) */}
        <IndustriesSection industries={industries} industryStories={initialData?.industryStories} />

        {/* Chapter 08: Integrations & Connectivity (Phone, Calendar, CRM, Business Systems) */}
        <IntegrationsSection />

        {/* Chapter 09: Case Studies (Magazine Feature Spread for Noor Modern Doors) */}
        <PortfolioSection projects={projects} stats={stats} />

        {/* Chapter 10: Process (01 Understand → 02 Design → 03 Build → 04 Launch) */}
        <HowItWorksSection processSteps={initialData?.processSteps} />

        {/* Chapter 11: FAQ (Reference-Style 2-Column Editorial Questions) */}
        <FaqSection faqs={initialData?.faqs} />

        {/* Chapter 12: Contact (Cinematic Closing: Let's Automate Your First Layer) */}
        <ContactSection settings={settings} />
      </main>

      {/* Chapter 13: Quiet Editorial Footer */}
      <Footer settings={settings} />

      {/* Floating Quick Return Control on Scroll-Up */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 16, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            aria-label="Return to top"
            className="fixed bottom-6 right-6 z-40 px-3.5 py-2 rounded-full bg-[#0e121d]/90 dark:bg-white/95 text-white dark:text-zinc-950 text-xs font-medium backdrop-blur-md border border-white/10 dark:border-black/10 shadow-xl flex items-center gap-1.5 hover:scale-105 active:scale-95 transition-transform"
          >
            <ArrowUp className="w-3.5 h-3.5 text-blue-400 dark:text-blue-600" />
            <span className="tracking-wide">Top</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
});
