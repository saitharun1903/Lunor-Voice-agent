"use client";

import React, { memo, useCallback, useState, useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Volume2,
  Sparkles,
} from "lucide-react";
import { MOTION_EASINGS } from "@/lib/motion-config";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToVoiceOps?: () => void;
  onTalkToLuno?: () => void;
}

export const Hero = memo(function Hero({
  eyebrow = "VOICE AUTOMATION FOR BUSINESS",
  headline = "Automate the first layer of every call.",
  subheadline = "VoiceOps builds AI voice systems that handle repetitive business conversations — from enquiries and bookings to lead qualification, support, and follow-ups.",
  onTalkToVoiceOps,
  onTalkToLuno,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const mousePosRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  // Scroll transformation conduit linking Hero signal to subsequent chapters
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const visualOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0.6]);
  const conduitHeight = useTransform(scrollYProgress, [0, 0.6], [40, 100]);
  const conduitPulse = useTransform(scrollYProgress, [0, 0.5], [0.6, 1]);

  const handleTalkToVoiceOps = useCallback(() => {
    const trigger = onTalkToVoiceOps || onTalkToLuno;
    if (trigger) {
      trigger();
    } else {
      document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
    }
  }, [onTalkToLuno, onTalkToVoiceOps]);

  const scrollToContact = useCallback(() => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Subtle spatial pointer tilt (clamped, GPU transform)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (shouldReduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mousePosRef.current.targetX = x;
      mousePosRef.current.targetY = y;
      setTilt({
        rotateX: -(y - 0.5) * 6,
        rotateY: (x - 0.5) * 6,
      });
    },
    [shouldReduceMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
    mousePosRef.current.targetX = 0.5;
    mousePosRef.current.targetY = 0.5;
  }, []);

  // Living Multi-Harmonic Acoustic Waveform Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let phase = 0;
    let currentX = 0.5;
    let currentY = 0.5;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation
      currentX += (mousePosRef.current.targetX - currentX) * 0.05;
      currentY += (mousePosRef.current.targetY - currentY) * 0.05;

      const midY = height * 0.5;
      const isDark = document.documentElement.classList.contains("dark");

      // Draw subtle ambient glow behind the wave
      const glowGrad = ctx.createRadialGradient(
        width * currentX,
        midY + (currentY - 0.5) * 40,
        10,
        width * 0.5,
        midY,
        width * 0.45
      );
      if (isDark) {
        glowGrad.addColorStop(0, "rgba(59, 130, 246, 0.12)");
        glowGrad.addColorStop(0.5, "rgba(37, 99, 235, 0.04)");
        glowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      } else {
        glowGrad.addColorStop(0, "rgba(37, 99, 235, 0.08)");
        glowGrad.addColorStop(0.5, "rgba(59, 130, 246, 0.03)");
        glowGrad.addColorStop(1, "rgba(255, 255, 255, 0)");
      }
      ctx.fillStyle = glowGrad;
      ctx.fillRect(0, 0, width, height);

      // Central reference baseline (faint)
      ctx.beginPath();
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.moveTo(30, midY);
      ctx.lineTo(width - 30, midY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Harmonic Waves Configuration: 4 interrelated harmonics
      const waves = [
        {
          amplitude: 36 + (currentY - 0.5) * 20,
          frequency: 0.012 + (currentX - 0.5) * 0.004,
          speed: 0.024,
          color: isDark ? "rgba(59, 130, 246, 0.85)" : "rgba(37, 99, 235, 0.9)",
          lineWidth: 2.5,
          phaseOffset: 0,
        },
        {
          amplitude: 24 - (currentY - 0.5) * 15,
          frequency: 0.018,
          speed: -0.018,
          color: isDark ? "rgba(96, 165, 250, 0.5)" : "rgba(59, 130, 246, 0.45)",
          lineWidth: 1.8,
          phaseOffset: Math.PI * 0.35,
        },
        {
          amplitude: 16 + (currentY - 0.5) * 10,
          frequency: 0.026,
          speed: 0.032,
          color: isDark ? "rgba(147, 197, 253, 0.35)" : "rgba(30, 64, 175, 0.3)",
          lineWidth: 1.2,
          phaseOffset: Math.PI * 0.7,
        },
        {
          amplitude: 10,
          frequency: 0.008,
          speed: -0.012,
          color: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.15)",
          lineWidth: 1,
          phaseOffset: Math.PI,
        },
      ];

      waves.forEach((w) => {
        ctx.beginPath();
        ctx.lineWidth = w.lineWidth;
        ctx.strokeStyle = w.color;

        for (let x = 30; x <= width - 30; x += 2) {
          const progress = (x - 30) / (width - 60);
          const envelope = Math.sin(progress * Math.PI);
          const y =
            midY +
            Math.sin(x * w.frequency + phase * w.speed * 60 + w.phaseOffset) *
              w.amplitude *
              envelope;

          if (x === 30) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Luminous acoustic nodes at peak focal points
      const focalProgresses = [0.28, 0.5, 0.72];
      focalProgresses.forEach((p) => {
        const fx = 30 + p * (width - 60);
        const envelope = Math.sin(p * Math.PI);
        const fy =
          midY +
          Math.sin(fx * waves[0].frequency + phase * waves[0].speed * 60) *
            waves[0].amplitude *
            envelope;

        ctx.beginPath();
        ctx.arc(fx, fy, 4, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "#60A5FA" : "#2563EB";
        ctx.shadowColor = isDark ? "rgba(96, 165, 250, 0.6)" : "rgba(37, 99, 235, 0.4)";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Traveling Inbound Call Signal Pulse (Call enters -> travels -> pulses through nodes)
      const callProgress = (phase * 0.22) % 1.0;
      const pulseX = 30 + callProgress * (width - 60);
      const pulseEnv = Math.sin(callProgress * Math.PI);
      const pulseY =
        midY +
        Math.sin(pulseX * waves[0].frequency + phase * waves[0].speed * 60) *
          waves[0].amplitude *
          pulseEnv;

      // Glow halo around traveling signal
      const pulseGlow = ctx.createRadialGradient(pulseX, pulseY, 2, pulseX, pulseY, 18);
      pulseGlow.addColorStop(0, isDark ? "rgba(147, 197, 253, 0.9)" : "rgba(37, 99, 235, 0.85)");
      pulseGlow.addColorStop(0.5, isDark ? "rgba(59, 130, 246, 0.3)" : "rgba(59, 130, 246, 0.25)");
      pulseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = pulseGlow;
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 18, 0, Math.PI * 2);
      ctx.fill();

      // Sharp central photon bead
      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowColor = isDark ? "#60A5FA" : "#2563EB";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.shadowBlur = 0;

      phase += 0.016;
      if (!shouldReduceMotion) {
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [shouldReduceMotion]);

  // Refined editorial line-break rendering with mask reveal
  const renderHeadline = () => {
    const lower = headline.toLowerCase();
    if (lower.includes("of every call")) {
      return (
        <div className="space-y-1">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.18, ease: MOTION_EASINGS.editorial }}
              className="block text-zinc-950 dark:text-white font-semibold tracking-tight"
            >
              Automate the first layer
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.28, ease: MOTION_EASINGS.editorial }}
              className="block text-zinc-500 dark:text-zinc-400 font-normal tracking-tight"
            >
              of every call.
            </motion.span>
          </div>
        </div>
      );
    }
    return (
      <div className="overflow-hidden">
        <motion.span
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: MOTION_EASINGS.editorial }}
          className="block text-zinc-950 dark:text-white font-semibold tracking-tight"
        >
          {headline}
        </motion.span>
      </div>
    );
  };

  return (
    <section
      ref={heroRef}
      aria-label="VoiceOps Introduction & Inbound Telephony System"
      className="relative min-h-[90vh] lg:min-h-[94vh] flex flex-col justify-between pt-24 sm:pt-28 pb-12 sm:pb-16 px-5 sm:px-8 lg:px-12 xl:px-16 overflow-hidden bg-white dark:bg-[#0D0F14] transition-colors duration-300"
    >
      {/* Background Architectural Grid & Soft Ambient Light */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:56px_56px]" />
        <div className="absolute top-1/3 right-1/4 w-[550px] h-[380px] rounded-full bg-gradient-to-br from-blue-500/[0.05] via-indigo-500/[0.02] to-transparent dark:from-blue-500/[0.08] dark:via-blue-600/[0.03] dark:to-transparent blur-3xl" />
      </div>

      {/* =========================================================================
          MAIN ASYMMETRIC STAGE
          Left: Confident Editorial Anchor + Immediate Tactile CTAs
          Right: ONE Living Acoustic Voice Sculpture (Pure Art Direction)
          ========================================================================= */}
      <div className="w-full max-w-7xl mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-16 items-center py-8 sm:py-12">
        
        {/* -----------------------------------------------------------------------
            LEFT COLUMN: Editorial Brand & Intent Framing (lg:col-span-5)
            ----------------------------------------------------------------------- */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-7 text-left">
          
          {/* Restrained Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1, ease: MOTION_EASINGS.editorial }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.08] w-fit"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="font-mono text-[11px] font-semibold tracking-wider text-slate-800 dark:text-slate-200 uppercase">
              {eyebrow}
            </span>
          </motion.div>

          {/* Controlled Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.25, ease: MOTION_EASINGS.editorial }}
            className="font-sans text-3.5xl sm:text-4.5xl md:text-5xl lg:text-[3.35rem] leading-[1.12] tracking-tight"
          >
            {renderHeadline()}
          </motion.h1>

          {/* Supporting Product Thesis Statement */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4, ease: MOTION_EASINGS.editorial }}
            className="font-sans text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-lg"
          >
            {subheadline}
          </motion.p>

          {/* Immediate-Response Tactile CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.55, ease: MOTION_EASINGS.editorial }}
            className="pt-1 flex flex-wrap items-center gap-3.5"
          >
            <button
              onClick={handleTalkToVoiceOps}
              className="inline-flex items-center gap-2.5 min-h-[48px] px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-sans text-xs sm:text-[13px] font-semibold tracking-tight shadow-md hover:shadow-lg transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
              </span>
              <span>Talk to VoiceOps</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 min-h-[48px] px-5 py-2.5 rounded-xl bg-transparent text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white border border-slate-300 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 font-sans text-xs sm:text-[13px] font-medium transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 touch-manipulation outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              <span>Build My Voice Agent</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            </button>
          </motion.div>

          {/* Quiet Reassurance Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.7, ease: MOTION_EASINGS.editorial }}
            className="pt-2 flex items-center gap-2.5 text-xs font-sans text-slate-500 dark:text-slate-400"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Answers in &lt;1s · Zero hold queues · Works with existing phone numbers</span>
          </motion.div>
        </div>

        {/* -----------------------------------------------------------------------
            RIGHT COLUMN: ONE LIVING ACOUSTIC SCULPTURE (lg:col-span-7)
            Pure Art Direction: Organic, breathing harmonic waveform
            ----------------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 14 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: MOTION_EASINGS.editorial }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1000px" }}
          className="lg:col-span-7 relative w-full select-none"
        >
          <div
            className="w-full rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#10131B] border border-slate-200/80 dark:border-white/[0.08] shadow-[0_12px_40px_-12px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden transition-all duration-200 ease-out flex flex-col space-y-6"
            style={{
              transform: shouldReduceMotion
                ? undefined
                : `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Top Control Bar: Quiet Minimalist Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/[0.06] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Volume2 className="w-4 h-4" />
                </div>
                <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200 tracking-wider">
                  VOICEOPS ACOUSTIC SIGNAL
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Live Telephony Synthesis</span>
              </div>
            </div>

            {/* Central Living Acoustic Signal Waveform Canvas */}
            <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-slate-50/60 dark:bg-black/40 border border-slate-100 dark:border-white/[0.04] overflow-hidden flex items-center justify-center">
              <canvas
                ref={canvasRef}
                width={700}
                height={280}
                className="w-full h-full object-contain pointer-events-none"
              />

              {/* Dynamic Wave Interaction Hint */}
              <div className="absolute bottom-3 left-4 flex items-center gap-1.5 font-mono text-[10px] text-slate-400 dark:text-slate-500">
                <Sparkles className="w-3 h-3 text-blue-500" />
                <span>Harmonic Voice Spectrum · Realtime Responsive</span>
              </div>
            </div>

            {/* Bottom Spectrum Visualization Bars */}
            <div className="pt-1 flex items-center justify-between gap-4 text-xs font-mono text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-1.5">
                {[40, 65, 25, 80, 50, 90, 35, 75, 45, 60, 85, 30, 70, 55, 95, 40, 60, 30].map(
                  (height, i) => (
                    <motion.div
                      key={i}
                      className="w-1 rounded-full bg-blue-600/30 dark:bg-blue-400/40"
                      animate={
                        shouldReduceMotion
                          ? undefined
                          : {
                              height: [`${height * 0.25}px`, `${height * 0.45}px`, `${height * 0.2}px`],
                            }
                      }
                      transition={{
                        repeat: Infinity,
                        duration: 1.4 + (i % 5) * 0.25,
                        ease: "easeInOut",
                      }}
                      style={{ height: `${height * 0.3}px` }}
                    />
                  )
                )}
              </div>

              <div className="text-right">
                <span className="text-slate-700 dark:text-slate-300 font-medium">
                  Direct Inbound Telephony
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Downward Continuity Anchor */}
      <div className="relative max-w-7xl mx-auto w-full pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 dark:border-white/[0.08] text-xs text-slate-500 font-sans">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-slate-600 dark:text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            TELEPHONY SIGNAL: CONTINUOUS
          </span>
          <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700">·</span>
          <span className="hidden sm:inline-block text-slate-600 dark:text-slate-400">
            Automating the first layer of inbound operations
          </span>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 dark:text-slate-500">
          <span>voiceops.in</span>
          <span>·</span>
          <span>Sub-second Business OS</span>
        </div>
      </div>

      {/* Downward Physical Signal Conduit Bridge into Operational Problem */}
      <motion.div
        style={{ height: conduitHeight, opacity: conduitPulse }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-blue-500/20 via-blue-500 to-blue-600 pointer-events-none z-10 shadow-[0_0_12px_rgba(37,99,235,0.8)]"
      />
    </section>
  );
});
