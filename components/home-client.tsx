"use client";

import React, { memo, useCallback } from "react";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { LiveDemoSection } from "./live-demo-section";
import { UseCasesSection } from "./use-cases";
import { SystemDiagram } from "./ui/system-diagram";
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
    companyName: "Lunor",
    tagline: "Voice automation for the first layer of business calls.",
    email: "conversations@lunor.co.in",
    phone: "+1 (888) 586-6240",
    whatsapp: "+18885866240",
    meetingUrl: "https://meet.google.com",
    heroEyebrow: "VOICE AUTOMATION FOR BUSINESS",
    heroHeadline: "AUTOMATE THE FIRST LAYER OF EVERY CALL.",
    heroSubheadline:
      "Lunor builds AI voice systems that handle repetitive business conversations — from enquiries and bookings to lead qualification, support, follow-ups and more.",
    googleSheetsWebhookUrl: "",
    voiceDemoEnabled: true,
    voiceDemoTitle: "Talk to Lunor.",
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
      {/* Floating Navigation */}
      <Navbar />

      {/* Main Experience Flow: Product-First Storytelling */}
      <main className="relative">
        {/* Chapter 1: Hero with Asymmetric Editorial Layout & Acoustic Ribbon */}
        <Hero
          eyebrow={settings.heroEyebrow}
          headline={settings.heroHeadline}
          subheadline={settings.heroSubheadline}
          onTalkToLuno={scrollToDemo}
        />

        {/* Chapter 2: Live Voice Product Demo (Directly Below Hero) */}
        <LiveDemoSection
          title={settings.voiceDemoTitle || "Talk to Lunor."}
          description={
            settings.voiceDemoDescription ||
            "Experience how an AI voice system handles the first layer of a real business conversation with sub-second response times."
          }
        />

        {/* Chapter 3: What Lunor Does (01-06 Editorial Index & Interactive Action Visualizer) */}
        <UseCasesSection useCases={useCases} />

        {/* Chapter 4: Product Architecture & Telephony Flow */}
        <SystemDiagram />

        {/* Chapter 5: Industry Solutions (Featured Real Estate + Modular Switchers) */}
        <IndustriesSection industries={industries} />

        {/* Chapter 6: Carrier, SIP & CRM Ecosystem */}
        <IntegrationsSection />

        {/* Chapter 7: 4-Phase Implementation Methodology */}
        <HowItWorksSection />

        {/* Chapter 8: Verified Client Case Studies */}
        <PortfolioSection projects={projects} stats={stats} />

        {/* Chapter 9: Technical & Operational FAQ */}
        <FaqSection />

        {/* Chapter 10: Inbound Closing & Consultation Request Deck */}
        <ContactSection settings={settings} />
      </main>

      {/* Footer */}
      <Footer settings={settings} />
    </div>
  );
});
