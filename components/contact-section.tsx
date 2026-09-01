"use client";

import React, { useState, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MessageSquare,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ArrowRight,
  PhoneCall,
  ShieldCheck,
  X,
  Video,
} from "lucide-react";
import confetti from "canvas-confetti";
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
    monthlyCallVolume: "",
    requirements: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Video Consultation Booking Modal State
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [meetingData, setMeetingData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    sessionType: "Technical Voice Architecture Review (30 min)",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    timeSlot: "10:00 AM EST",
    notes: "",
  });
  const [meetingLoading, setMeetingLoading] = useState(false);
  const [meetingStatus, setMeetingStatus] = useState<"idle" | "success" | "error">("idle");
  const [meetingError, setMeetingError] = useState("");

  const scrollToDemo = useCallback(() => {
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.requirements.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in your name, work email, and automation requirements.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit message");
      }

      setStatus("success");
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#2563eb", "#3b82f6", "#60a5fa", "#ffffff"],
        });
      } catch (e) {}

      // Clear form
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        industry: "",
        monthlyCallVolume: "",
        requirements: "",
      });
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Something went wrong. Please try again or contact Lunor directly.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookMeeting = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!meetingData.name.trim() || !meetingData.email.trim()) {
      setMeetingStatus("error");
      setMeetingError("Please provide your name and work email.");
      return;
    }

    setMeetingLoading(true);
    setMeetingStatus("idle");
    setMeetingError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: meetingData.name,
          email: meetingData.email,
          company: meetingData.company || "Not specified",
          phone: meetingData.phone || "",
          industry: "Video Consultation",
          requirements: `Scheduled ${meetingData.sessionType} on ${meetingData.date} at ${meetingData.timeSlot}. Notes: ${meetingData.notes || "None"}`,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to book session");

      setMeetingStatus("success");
      try {
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#2563eb", "#3b82f6", "#10b981", "#ffffff"],
        });
      } catch (e) {}
    } catch (err: any) {
      setMeetingStatus("error");
      setMeetingError(err.message || "Could not schedule consultation. Please try again.");
    } finally {
      setMeetingLoading(false);
    }
  };

  return (
    <>
      <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Direct Contact Touchpoints */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 dark:bg-blue-400/10 border border-blue-500/20 mb-4 uppercase font-mono">
                  <span>Inbound Deployment Request</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-950 dark:text-white mb-5 leading-tight">
                  Let&apos;s automate your first layer.
                </h2>

                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  Tell us which calls your business receives and what you&apos;d like to automate.
                </p>
              </div>

              {/* Quick Action Button */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={scrollToDemo}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold glass-button-secondary"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-blue-500" />
                  <span>Talk to Lunor</span>
                </button>
              </div>

              {/* Direct Contact Channels */}
              <div className="space-y-3.5 pt-2">
                {/* 1. Email */}
                <a
                  href={`mailto:${settings.email || "conversations@lunor.co.in"}`}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/[0.08] hover:border-blue-500/30 transition-all group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-zinc-500 font-medium">Direct Engineering Inquiries</p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {settings.email || "conversations@lunor.co.in"}
                    </p>
                  </div>
                </a>

                {/* 2. Phone */}
                <a
                  href={`tel:${settings.phone || "+18885866240"}`}
                  className="flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/[0.08] hover:border-blue-500/30 transition-all group shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[11px] text-zinc-500 font-medium">Studio Phone Line</p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {settings.phone || "+1 (888) 586-6240"}
                    </p>
                  </div>
                </a>

                {/* 3. Book Video Consultation (Interactive Modal) */}
                <button
                  onClick={() => setIsMeetingModalOpen(true)}
                  className="w-full flex items-center gap-3.5 p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-black/[0.06] dark:border-white/[0.08] hover:border-purple-500/40 transition-all group shadow-sm text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] text-zinc-500 font-medium">Discovery Session</p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                      Book a Video Consultation
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors" />
                </button>
              </div>
            </div>

            {/* Right Column: Glossy Liquid Glass Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl p-8 sm:p-10 backdrop-blur-xl bg-white/85 dark:bg-zinc-900/75 border border-black/[0.08] dark:border-white/[0.12] shadow-2xl relative overflow-hidden">
                {/* Top Specular Line Accent */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/25 to-transparent" />

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center space-y-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                        Inquiry Received.
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-sm mx-auto leading-relaxed">
                        Lunor engineering will review your workflow requirements and provide a custom conversational blueprint within 24 hours.
                      </p>
                      <div className="pt-4">
                        <button
                          onClick={() => setStatus("idle")}
                          className="px-6 py-2.5 rounded-full text-xs font-semibold glass-button-secondary"
                        >
                          Submit another inquiry
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="border-b border-black/[0.05] dark:border-white/[0.06] pb-4 mb-6">
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                          Start the Conversation
                        </h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                          Tell us about the phone friction your company wants to eliminate.
                        </p>
                      </div>

                      {status === "error" && (
                        <div className="flex items-center gap-2.5 p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400">
                          <AlertCircle className="w-4 h-4 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                            Your Name <span className="text-blue-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Alex Morgan"
                            className="w-full px-4 py-3 rounded-2xl text-xs sm:text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>

                        {/* Company */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="e.g. Acme Hospitality"
                            className="w-full px-4 py-3 rounded-2xl text-xs sm:text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Email */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                            Work Email <span className="text-blue-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="alex@company.com"
                            className="w-full px-4 py-3 rounded-2xl text-xs sm:text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>

                        {/* Phone */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-4 py-3 rounded-2xl text-xs sm:text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Industry Dropdown */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                            Industry
                          </label>
                          <select
                            value={formData.industry}
                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                            className="w-full px-4 py-3 rounded-2xl text-xs sm:text-sm bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          >
                            <option value="">Select industry</option>
                            <option value="Real Estate & Leasing">Real Estate & Leasing</option>
                            <option value="Restaurant & Hospitality">Restaurant & Hospitality</option>
                            <option value="Healthcare & Medical Clinics">Healthcare & Medical Clinics</option>
                            <option value="Hotel & Boutique Stays">Hotel & Boutique Stays</option>
                            <option value="Automotive & Dealerships">Automotive & Dealerships</option>
                            <option value="Professional & Legal Services">Professional & Legal Services</option>
                            <option value="Other">Other Custom Industry</option>
                          </select>
                        </div>

                        {/* Monthly Call Volume */}
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                            Monthly Inbound Call Volume (Optional)
                          </label>
                          <select
                            value={formData.monthlyCallVolume}
                            onChange={(e) =>
                              setFormData({ ...formData, monthlyCallVolume: e.target.value })
                            }
                            className="w-full px-4 py-3 rounded-2xl text-xs sm:text-sm bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          >
                            <option value="">Select approximate volume</option>
                            <option value="Under 500 calls / month">Under 500 calls / month</option>
                            <option value="500 - 1,000 calls / month">500 - 1,000 calls / month</option>
                            <option value="1,000 - 5,000 calls / month">1,000 - 5,000 calls / month</option>
                            <option value="5,000+ calls / month">5,000+ calls / month</option>
                          </select>
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                          What would you like to automate? <span className="text-blue-500">*</span>
                        </label>
                        <textarea
                          required
                          rows={4}
                          value={formData.requirements}
                          onChange={(e) =>
                            setFormData({ ...formData, requirements: e.target.value })
                          }
                          placeholder="Tell us what callers typically ask, what scheduling or intake is needed, and any systems you use..."
                          className="w-full px-4 py-3 rounded-2xl text-xs sm:text-sm bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-full text-sm font-semibold glass-button-primary shadow-xl disabled:opacity-50"
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                          <>
                            <span>Build My Voice Agent</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Video Consultation Booking Modal */}
      <AnimatePresence>
        {isMeetingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMeetingModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg rounded-3xl backdrop-blur-2xl bg-white dark:bg-zinc-950 border border-black/10 dark:border-white/15 p-6 sm:p-8 shadow-2xl z-10 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-black/[0.06] dark:border-white/[0.08] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      Book Video Consultation
                    </h3>
                    <p className="text-[11px] text-zinc-500">Live Engineering & Scoping Session</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsMeetingModalOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-black/[0.04] dark:bg-white/[0.08] text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {meetingStatus === "success" ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-2">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white">
                    Consultation Requested!
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-sm mx-auto leading-relaxed">
                    We have reserved your slot for <strong>{meetingData.date}</strong> at <strong>{meetingData.timeSlot}</strong>. A calendar invite and Google Meet link have been dispatched to <strong>{meetingData.email}</strong>.
                  </p>
                  <div className="pt-3">
                    <button
                      onClick={() => {
                        setMeetingStatus("idle");
                        setIsMeetingModalOpen(false);
                      }}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold glass-button-primary"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleBookMeeting} className="space-y-4 text-xs">
                  {meetingStatus === "error" && (
                    <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 text-[11px] flex items-center gap-2">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{meetingError}</span>
                    </div>
                  )}

                  {/* Session Type */}
                  <div className="space-y-1">
                    <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                      Consultation Type
                    </label>
                    <select
                      value={meetingData.sessionType}
                      onChange={(e) =>
                        setMeetingData({ ...meetingData, sessionType: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                    >
                      <option value="Technical Voice Architecture Review (30 min)">
                        Technical Voice Architecture Review (30 min)
                      </option>
                      <option value="Telephony & CRM Integration Scoping (45 min)">
                        Telephony & CRM Integration Scoping (45 min)
                      </option>
                      <option value="Live Custom Prototype Demo (20 min)">
                        Live Custom Prototype Demo (20 min)
                      </option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Date */}
                    <div className="space-y-1">
                      <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={meetingData.date}
                        onChange={(e) =>
                          setMeetingData({ ...meetingData, date: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white font-mono"
                      />
                    </div>

                    {/* Time Slot */}
                    <div className="space-y-1">
                      <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                        Time Slot
                      </label>
                      <select
                        value={meetingData.timeSlot}
                        onChange={(e) =>
                          setMeetingData({ ...meetingData, timeSlot: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white font-mono"
                      >
                        <option value="10:00 AM EST">10:00 AM EST</option>
                        <option value="11:30 AM EST">11:30 AM EST</option>
                        <option value="01:00 PM EST">01:00 PM EST</option>
                        <option value="02:30 PM EST">02:30 PM EST</option>
                        <option value="04:00 PM EST">04:00 PM EST</option>
                        <option value="05:30 PM EST">05:30 PM EST</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {/* Name */}
                    <div className="space-y-1">
                      <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                        Your Name <span className="text-blue-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Alex Morgan"
                        value={meetingData.name}
                        onChange={(e) =>
                          setMeetingData({ ...meetingData, name: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1">
                      <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                        Work Email <span className="text-blue-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alex@company.com"
                        value={meetingData.email}
                        onChange={(e) =>
                          setMeetingData({ ...meetingData, email: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Company & Phone */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                        Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Acme Inc."
                        value={meetingData.company}
                        onChange={(e) =>
                          setMeetingData({ ...meetingData, company: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-zinc-700 dark:text-zinc-300">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={meetingData.phone}
                        onChange={(e) =>
                          setMeetingData({ ...meetingData, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded-xl bg-black/[0.03] dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.1] text-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsMeetingModalOpen(false)}
                      className="px-4 py-2 rounded-full text-xs font-semibold text-zinc-500 hover:text-zinc-800 dark:hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={meetingLoading}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold glass-button-primary disabled:opacity-50"
                    >
                      {meetingLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Confirm Video Consultation</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});
