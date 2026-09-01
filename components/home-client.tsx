"use client";

import React, { memo, useCallback } from "react";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { LiveDemoSection } from "./live-demo-section";
import { SystemDiagram } from "./ui/system-diagram";
import { UseCasesSection } from "./use-cases";
import { IndustriesSection } from "./industries";
import { IntegrationsSection } from "./integrations";
import { HowItWorksSection } from "./how-it-works";
import { ResultsValueSection } from "./results-value";
import { PortfolioSection } from "./portfolio";
import { TrustSection } from "./trust";
import { FaqSection } from "./faq";
import { AboutSection } from "./about";
import { ContactSection } from "./contact-section";
import { Footer } from "./footer";
import { AmbientBackground } from "./ui/ambient-background";
import { CursorGlow } from "./ui/cursor-glow";
import { SiteData } from "@/lib/types";

interface HomeClientProps {
  initialData: SiteData;
}

export const HomeClient = memo(function HomeClient({ initialData }: HomeClientProps) {
  const { settings, stats, projects, industries, useCases } = initialData;

  const scrollToDemo = useCallback(() => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#fafafc] dark:bg-[#030305] text-[#1d1d1f] dark:text-[#f5f5f7] selection:bg-blue-600 selection:text-white transition-colors duration-200 overflow-x-hidden">
      {/* Subtle Ambient Background Mesh & Desktop Cursor Proximity Glow */}
      <AmbientBackground />
      <CursorGlow />

      {/* Floating Liquid Glass Navigation */}
      <Navbar />

      {/* Main Experience Flow */}
      <main className="relative">
        {/* Chapter 1: Hero with Dominant Typography & Autonomous Telephony Console */}
        <Hero
          eyebrow={settings.heroEyebrow}
          headline={settings.heroHeadline}
          subheadline={settings.heroSubheadline}
          onTalkToLuno={scrollToDemo}
        />

        {/* Chapter 2: Central Live Voice Product Deck (EXACTLY ONE Demonstration) */}
        <LiveDemoSection
          title={settings.voiceDemoTitle || "Talk to Luno"}
          description={
            settings.voiceDemoDescription ||
            "Experience how an AI voice system handles the first layer of a real business conversation."
          }
        />

        {/* Chapter 3: Visual System Architecture (The First Layer Workflow) */}
        <SystemDiagram />

        {/* Chapter 4: Universal Use Cases & Operational Dialogue Simulations */}
        <UseCasesSection useCases={useCases} />

        {/* Chapter 5: Tailored Industry Architecture (Featured Real Estate + Workflows) */}
        <IndustriesSection industries={industries} />

        {/* Chapter 6: Enterprise Carrier, SIP & CRM Integrations */}
        <IntegrationsSection />

        {/* Chapter 7: Operational 4-Step Deployment Pipeline */}
        <HowItWorksSection />

        {/* Chapter 8: Measurable Operational Return */}
        <ResultsValueSection />

        {/* Chapter 9: Proven Client Deployments & Case Studies */}
        <PortfolioSection projects={projects} stats={stats} />

        {/* Chapter 10: Enterprise Reliability & Security */}
        <TrustSection />

        {/* Chapter 11: Frequently Asked Technical Questions */}
        <FaqSection />

        {/* Chapter 12: Studio Philosophy */}
        <AboutSection />

        {/* Chapter 13: Product Launch-Grade Contact & Conversion Inbound Deck */}
        <ContactSection settings={settings} />
      </main>

      {/* Footer */}
      <Footer settings={settings} />
    </div>
  );
});
