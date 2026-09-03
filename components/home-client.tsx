"use client";

import React, { memo, useCallback } from "react";
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
    heroHeadline: "AUTOMATE THE FIRST LAYER OF EVERY CALL.",
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

  return (
    <div className="relative min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] selection:bg-blue-600 selection:text-white transition-colors duration-200 overflow-x-hidden">
      {/* Continuous Acoustic Signal Thread (Visual Spine) */}
      <SignalSpine />

      {/* Dynamic Scroll-Reactive Navigation */}
      <Navbar />

      {/* Main Experience Flow: 13-Chapter Seamless Continuous Architecture */}
      <main className="relative">
        {/* Chapter 01: Hero (Cinematic Dark Opening with Flowing VoiceOps Signal) */}
        <Hero
          eyebrow={settings.heroEyebrow}
          headline={settings.heroHeadline}
          subheadline={settings.heroSubheadline}
          onTalkToLuno={scrollToDemo}
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

        {/* Seamless Transition Bridge: Midnight → Neutral Zone */}
        <div className="bridge-midnight-to-ivory" aria-hidden="true" />

        {/* Chapter 04: First-Layer Experience (Customer → VoiceOps → Understand → Act → Resolution) */}
        <SystemDiagram />

        {/* Chapter 05: Capabilities Matrix (01-06 3D Flip Card System) */}
        <UseCasesSection useCases={useCases} />

        {/* Seamless Transition Bridge: Neutral Zone → Midnight */}
        <div className="bridge-ivory-to-midnight" aria-hidden="true" />

        {/* Chapter 06: Workflow (Calls Should End in Actions: 4-Stage Execution Pipeline) */}
        <WorkflowSection />

        {/* Seamless Transition Bridge: Midnight → Neutral Zone */}
        <div className="bridge-midnight-to-ivory" aria-hidden="true" />

        {/* Chapter 07: Industry World (Voice Automation for the Way Your Business Works) */}
        <IndustriesSection industries={industries} />

        {/* Seamless Transition Bridge: Neutral Zone → Midnight */}
        <div className="bridge-ivory-to-midnight" aria-hidden="true" />

        {/* Chapter 08: Integrations & Connectivity (Phone, Calendar, CRM, Business Systems) */}
        <IntegrationsSection />

        {/* Chapter 09: Case Studies (Magazine Feature Spread for Noor Modern Doors) */}
        <PortfolioSection projects={projects} stats={stats} />

        {/* Chapter 10: Process (01 Understand → 02 Design → 03 Build → 04 Launch) */}
        <HowItWorksSection />

        {/* Chapter 11: FAQ (Reference-Style 2-Column Editorial Questions) */}
        <FaqSection />

        {/* Chapter 12: Contact (Cinematic Closing: Let's Automate Your First Layer) */}
        <ContactSection settings={settings} />
      </main>

      {/* Chapter 13: Quiet Editorial Footer */}
      <Footer settings={settings} />
    </div>
  );
});
