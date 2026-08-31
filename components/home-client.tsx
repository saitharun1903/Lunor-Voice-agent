"use client";

import React from "react";
import { Navbar } from "./navbar";
import { Hero } from "./hero";
import { LiveDemoSection } from "./live-demo-section";
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

export function HomeClient({ initialData }: HomeClientProps) {
  const { settings, stats, projects, industries, useCases } = initialData;

  const scrollToDemo = () => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen bg-[#fbfbfd] dark:bg-[#030305] text-[#1d1d1f] dark:text-[#f5f5f7] selection:bg-blue-600 selection:text-white transition-colors duration-500 overflow-x-hidden">
      {/* Subtle Ambient Background Mesh & Desktop Cursor Proximity Glow */}
      <AmbientBackground />
      <CursorGlow />

      {/* Floating Liquid Glass Navigation */}
      <Navbar />

      {/* Main Experience Flow */}
      <main className="relative">
        {/* 1. Hero with Dominant Typography & Autonomous Telephony Console */}
        <Hero
          eyebrow={settings.heroEyebrow}
          headline={settings.heroHeadline}
          subheadline={settings.heroSubheadline}
          onTalkToLuno={scrollToDemo}
        />

        {/* 2. Central Live Voice Demo (EXACTLY ONE Demonstration) */}
        <LiveDemoSection
          title={settings.voiceDemoTitle || "Talk to Luno"}
          description={
            settings.voiceDemoDescription ||
            "Experience how an AI voice system can handle the first layer of a real business conversation."
          }
        />

        {/* 3. Universal Use Cases (Interactive Matrix with Live Dialogue Simulations) */}
        <UseCasesSection useCases={useCases} />

        {/* 4. Tailored Industry Architecture (Featured Real Estate + Workflows) */}
        <IndustriesSection industries={industries} />

        {/* 5. Enterprise Carrier, SIP & CRM Integrations */}
        <IntegrationsSection />

        {/* 6. Cinematic 4-Step Deployment Pipeline */}
        <HowItWorksSection />

        {/* 7. Measurable Operational Return */}
        <ResultsValueSection />

        {/* 8. Proven Deployments (Stats & Large Case Studies) */}
        <PortfolioSection projects={projects} stats={stats} />

        {/* 9. Enterprise Reliability & Security */}
        <TrustSection />

        {/* 10. Frequently Asked Technical Questions */}
        <FaqSection />

        {/* 11. Studio Philosophy */}
        <AboutSection />

        {/* 12. Product Launch-Grade Contact & Conversion Section */}
        <ContactSection settings={settings} />
      </main>

      {/* Footer */}
      <Footer settings={settings} />
    </div>
  );
}
