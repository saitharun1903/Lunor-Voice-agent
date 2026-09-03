"use client";

import React, { memo, useCallback } from "react";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { LiveDemoSection } from "./live-demo-section";
import { AboutSection } from "./about";
import { SystemDiagram } from "./ui/system-diagram";
import { UseCasesSection } from "./use-cases";
import { IndustriesSection } from "./industries";
import { IntegrationsSection } from "./integrations";
import { HowItWorksSection } from "./how-it-works";
import { PortfolioSection } from "./portfolio";
import { FaqSection } from "./faq";
import { ContactSection } from "./contact-section";
import { Footer } from "./footer";
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
      "VoiceOps builds custom AI voice systems that handle repetitive conversations — from customer enquiries and bookings to lead qualification, support, and warm staff handoffs.",
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
      {/* Quiet Minimal Navigation */}
      <Navbar />

      {/* Main Experience Flow: Visual Chapters & Narrative Journey */}
      <main className="relative">
        {/* Chapter 1: Cinematic Full-Width Opening (Deep Midnight) */}
        <Hero
          eyebrow={settings.heroEyebrow}
          headline={settings.heroHeadline}
          subheadline={settings.heroSubheadline}
          onTalkToLuno={scrollToDemo}
        />

        {/* Chapter 2: Hardware-Grade Live Voice Product Moment (Deep Midnight) */}
        <LiveDemoSection
          title={settings.voiceDemoTitle || "Talk to VoiceOps."}
          description={
            settings.voiceDemoDescription ||
            "Experience how an AI voice system handles the first layer of a real business conversation with sub-second turn cadence."
          }
        />

        {/* Chapter 3: The Operational Problem (Warm Ivory Editorial) */}
        <AboutSection />

        {/* Chapter 4: The Signature Concept: The First Layer (Soft Stone Transition) */}
        <SystemDiagram />

        {/* Chapter 5: What VoiceOps Automates: Editorial Capabilities (Warm Ivory) */}
        <UseCasesSection useCases={useCases} />

        {/* Chapter 6: Industry World Blueprint (Deep Midnight Atmosphere) */}
        <IndustriesSection industries={industries} />

        {/* Chapter 7: Connectivity & Ecosystem (Editorial Columns) */}
        <IntegrationsSection />

        {/* Chapter 8: Verified Client Case Studies (Magazine Spread Publication) */}
        <PortfolioSection projects={projects} stats={stats} />

        {/* Chapter 9: 4-Phase Deployment Methodology (Continuous Journey Line) */}
        <HowItWorksSection />

        {/* Chapter 10: Minimalist Editorial FAQ */}
        <FaqSection />

        {/* Chapter 11: Cinematic Closing Scene & Consultation Form (Deep Midnight) */}
        <ContactSection settings={settings} />
      </main>

      {/* Quiet Editorial Footer */}
      <Footer settings={settings} />
    </div>
  );
});
