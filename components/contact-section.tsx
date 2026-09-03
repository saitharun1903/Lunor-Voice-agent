"use client";

import React, { useState, memo, useCallback } from "react";
import { ArrowRight, CheckCircle2, AlertCircle, PhoneCall } from "lucide-react";
import { SiteSettings } from "@/lib/types";

interface ContactSectionProps {
  settings: SiteSettings;
}

export const ContactSection = memo(function ContactSection({ settings }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    industry: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.requirements.trim()) {
      setStatus("error");
      setErrorMessage("Please provide your name, work email, and what you would like to automate.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company || "Not specified",
          email: formData.email,
          phone: formData.phone || "",
          industry: formData.industry || "General",
          requirements: formData.requirements,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit request");
      }

      setStatus("success");
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        industry: "",
        requirements: "",
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again or contact VoiceOps directly.");
    } finally {
      setLoading(false);
    }
  };

  const scrollToDemo = useCallback(() => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section id="contact" className="py-24 md:py-36 relative overflow-hidden chapter-midnight border-t border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Editorial Statement */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <p className="type-editorial-eyebrow text-blue-400">
              COMMENCE DEPLOYMENT
            </p>

            <h2 className="type-serif-display text-white font-normal leading-[1.08]">
              Let&apos;s automate
              <br />
              <span className="italic font-light text-zinc-400">
                your first layer.
              </span>
            </h2>

            <p className="type-sans-body-lg text-zinc-400 leading-relaxed font-normal">
              Tell us which calls your business receives and what you&apos;d like to automate. Our engineering team audits your requirements and configures a tailored voice blueprint.
            </p>

            <div className="pt-4 space-y-2 text-xs font-mono text-zinc-500">
              <p>Email: {settings.email || "conversations@voiceops.in"}</p>
              <p>Turnaround: 24h technical blueprint review</p>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToDemo}
                className="btn-matte-secondary text-zinc-300 hover:text-white"
              >
                <PhoneCall className="w-3.5 h-3.5 text-blue-400" />
                <span>Talk to VoiceOps Live Demo ↑</span>
              </button>
            </div>
          </div>

          {/* Right Column: Clean Editorial Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0c101c] border border-white/[0.07] shadow-xl space-y-6">
              {status === "success" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-2xl text-white font-normal">
                    Requirement Received.
                  </h3>
                  <p className="type-sans-body text-zinc-400 max-w-md mx-auto leading-relaxed text-sm">
                    VoiceOps engineering will review your workflow and reach out directly at {formData.email || "your email"} to schedule your voice architecture walkthrough.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-compact-secondary text-xs text-zinc-300 border-white/20 mt-4"
                  >
                    Submit another requirement
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-sans text-zinc-400 block">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Marcus Vance"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-sans text-zinc-400 block">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Vance Realty Group"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-sans text-zinc-400 block">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marcus@vancerealty.com"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5 text-left">
                      <label className="text-xs font-sans text-zinc-400 block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-sans text-zinc-400 block">
                      Industry / Sector
                    </label>
                    <input
                      type="text"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      placeholder="e.g. Real Estate, Clinic, Restaurant, Trade Services"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label className="text-xs font-sans text-zinc-400 block">
                      What calls would you like to automate? *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                      placeholder="Describe your current call flow, questions asked by callers, or booking systems..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-zinc-600 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  {status === "error" && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-all shadow-md active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Build My Voice Agent</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
