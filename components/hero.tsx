"use client";

import React, { memo, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToLuno?: () => void;
  onTalkToVoiceOps?: () => void;
}

interface FocalNode {
  u: number; // Normalized position along the primary signal spine [0..1]
  offsetY: number;
  radius: number;
  isAccent: boolean;
  phase: number;
  speed: number;
}

interface ClickRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const Hero = memo(function Hero({
  eyebrow = "VOICE AUTOMATION FOR BUSINESS",
  subheadline = "VoiceOps builds AI voice systems that handle repetitive business conversations — from enquiries and bookings to lead qualification, support, and follow-ups.",
  onTalkToLuno,
  onTalkToVoiceOps,
}: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    vx: 0,
    vy: 0,
    active: false,
  });
  const isVisibleRef = useRef(true);
  const animFrameRef = useRef<number>();

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

  // ---------------------------------------------------------------------------
  // The Living VoiceOps Signal Environment
  // Procedural, non-repeating acoustic bundle with organic harmonic strands,
  // intelligent typography safe-masking, and gentle physics-based cursor response.
  // ---------------------------------------------------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Viewport & DPR management
    let width = 0;
    let height = 0;
    let dpr = 1;

    const updateDimensions = () => {
      if (!canvas) return;
      const isTabletOrTouch = window.innerWidth <= 1024 || ("ontouchstart" in window);
      dpr = isTabletOrTouch ? Math.min(window.devicePixelRatio || 1, 1.5) : Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    updateDimensions();

    const handleResize = () => {
      updateDimensions();
    };
    window.addEventListener("resize", handleResize);

    // Pause offscreen or in background tab
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibility = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Discrete Acoustic Focal Nodes placed along the signal spine
    const NUM_NODES = 24;
    const focalNodes: FocalNode[] = [];
    for (let i = 0; i < NUM_NODES; i++) {
      const u = 0.15 + (i / (NUM_NODES - 1)) * 0.78; // Span across central 78% of width
      const isAccent = i === 5 || i === 11 || i === 16 || i === 20; // Strategic sparse accents
      focalNodes.push({
        u,
        offsetY: (Math.sin(i * 1.8) * 12),
        radius: isAccent ? 2.5 : 1.4,
        isAccent,
        phase: i * 0.45,
        speed: 0.015 + (i % 4) * 0.006,
      });
    }

    // Localized click ripples (subtle, non-explosive)
    const ripples: ClickRipple[] = [];

    // Continuous Procedural Time & State
    let time = 0;
    let entranceProgress = 0; // Soft 0 -> 1 fade-in on mount

    // Strand configuration for the single coherent acoustic signal bundle
    // Each strand represents an acoustic voice harmonic
    const STRAND_CONFIGS = [
      { freqMul: 1.0,  ampMul: 1.0,  speedMul: 1.0,  phase: 0.0,   alphaMul: 0.75, width: 1.4 },
      { freqMul: 1.45, ampMul: 0.7,  speedMul: 0.85, phase: 1.4,   alphaMul: 0.55, width: 1.1 },
      { freqMul: 0.72, ampMul: 1.25, speedMul: 0.7,  phase: 2.8,   alphaMul: 0.45, width: 1.0 },
      { freqMul: 2.1,  ampMul: 0.45, speedMul: 1.2,  phase: 4.1,   alphaMul: 0.35, width: 0.9 },
      { freqMul: 1.15, ampMul: 0.85, speedMul: 0.95, phase: 5.3,   alphaMul: 0.50, width: 1.1 },
      // Subtle background spatial filaments
      { freqMul: 0.55, ampMul: 1.5,  speedMul: 0.5,  phase: 0.8,   alphaMul: 0.22, width: 0.8 },
      { freqMul: 1.8,  ampMul: 0.35, speedMul: 1.35, phase: 3.2,   alphaMul: 0.18, width: 0.8 },
    ];

    // Main render frame
    const render = () => {
      if (isVisibleRef.current && width > 0 && height > 0) {
        ctx.clearRect(0, 0, width, height);

        // Check active theme
        const isDark = document.documentElement.classList.contains("dark");

        // Palette setup (Deep graphite & warm charcoal in Light Mode, soft silver in Dark Mode)
        const primaryColor = isDark ? "241, 245, 249" : "20, 20, 20";
        const secondaryColor = isDark ? "148, 163, 184" : "88, 83, 76";
        const accentColor = isDark ? "59, 130, 246" : "37, 99, 235"; // VoiceOps Cobalt

        // Time step (multi-harmonic non-repeating flow)
        if (!prefersReducedMotion) {
          time += 0.012;
          if (entranceProgress < 1) {
            entranceProgress = Math.min(1, entranceProgress + 0.035);
          }
        } else {
          time = 1.2;
          entranceProgress = 1;
        }

        // Smooth mouse position interpolation (damping spring)
        const mouse = mouseRef.current;
        if (mouse.active) {
          mouse.vx = (mouse.targetX - mouse.x) * 0.12;
          mouse.vy = (mouse.targetY - mouse.y) * 0.12;
          mouse.x += mouse.vx;
          mouse.y += mouse.vy;
        } else {
          // Gently drift out of active influence when cursor leaves
          mouse.x += (-1000 - mouse.x) * 0.05;
          mouse.y += (-1000 - mouse.y) * 0.05;
        }

        // Center spine baseline (placed in upper-middle of hero, behind typography)
        const centerY = height * 0.48;
        const baseAmplitude = Math.min(height * 0.13, 56);

        // Precompute sample points along the width (step every 6px for high precision curve)
        const NUM_SAMPLES = Math.ceil(width / 6) + 1;
        const stepX = width / (NUM_SAMPLES - 1);

        // Draw Strands
        for (let s = 0; s < STRAND_CONFIGS.length; s++) {
          const cfg = STRAND_CONFIGS[s];
          const strandTime = time * cfg.speedMul + cfg.phase;

          ctx.beginPath();
          let started = false;

          for (let i = 0; i < NUM_SAMPLES; i++) {
            const x = i * stepX;
            const u = x / width; // 0..1

            // Bell-envelope window: quiet on extreme edges, focalized in central 65%
            const windowEnvelope = Math.sin(u * Math.PI) * Math.sin(u * Math.PI);

            // Natural Voice Formants (Fundamental + Harmonic 1 + Harmonic 2)
            const f0 = Math.sin(u * 5.2 * cfg.freqMul + strandTime) * 0.65;
            const f1 = Math.sin(u * 9.8 * cfg.freqMul - strandTime * 0.7 + cfg.phase) * 0.28;
            const f2 = Math.cos(u * 14.5 * cfg.freqMul + strandTime * 0.4) * 0.15;
            const harmonic = (f0 + f1 + f2) * baseAmplitude * cfg.ampMul * windowEnvelope;

            let y = centerY + harmonic;

            // Cursor displacement: soft local deformation, strictly clamped
            if (mouse.active) {
              const dx = x - mouse.x;
              const dy = y - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const maxRadius = 140;

              if (dist < maxRadius) {
                const norm = 1 - dist / maxRadius;
                const force = Math.pow(norm, 2.2) * 16; // Clamped to 16px max
                // Deflect with acoustic wave response
                const angle = Math.atan2(dy, dx);
                y += Math.sin(angle) * force;
              }
            }

            // Ripple displacement
            for (let r = 0; r < ripples.length; r++) {
              const rip = ripples[r];
              const rdx = x - rip.x;
              const rdy = y - rip.y;
              const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
              const ripDelta = Math.abs(rdist - rip.radius);
              if (ripDelta < 32) {
                const wave = Math.cos((ripDelta / 32) * Math.PI * 0.5);
                y += wave * rip.alpha * 12;
              }
            }

            if (!started) {
              ctx.moveTo(x, y);
              started = true;
            } else {
              ctx.lineTo(x, y);
            }
          }

          // Text safe zone: create an intelligent gradient mask along the strand
          // so it softens smoothly behind left-hand typography and flourishes toward the right
          const gradient = ctx.createLinearGradient(0, 0, width, 0);
          const baseAlpha = cfg.alphaMul * entranceProgress;

          gradient.addColorStop(0.0, `rgba(${secondaryColor}, 0)`);
          gradient.addColorStop(0.18, `rgba(${secondaryColor}, ${baseAlpha * 0.25})`);
          gradient.addColorStop(0.45, `rgba(${secondaryColor}, ${baseAlpha * 0.45})`);
          gradient.addColorStop(0.72, `rgba(${primaryColor}, ${baseAlpha * 0.85})`);
          gradient.addColorStop(0.92, `rgba(${secondaryColor}, ${baseAlpha * 0.3})`);
          gradient.addColorStop(1.0, `rgba(${secondaryColor}, 0)`);

          ctx.strokeStyle = gradient;
          ctx.lineWidth = cfg.width;
          ctx.stroke();
        }

        // Draw Focal Nodes along the main signal spine
        for (let i = 0; i < focalNodes.length; i++) {
          const node = focalNodes[i];
          const x = node.u * width;

          // Compute exact Y on primary spine
          const nodeTime = time + node.phase;
          const u = node.u;
          const windowEnvelope = Math.sin(u * Math.PI) * Math.sin(u * Math.PI);
          const f0 = Math.sin(u * 5.2 + nodeTime) * 0.65;
          const f1 = Math.sin(u * 9.8 - nodeTime * 0.7) * 0.28;
          const harmonic = (f0 + f1) * baseAmplitude * windowEnvelope;

          let y = centerY + harmonic + node.offsetY * Math.sin(time * 0.8 + node.phase);

          // Cursor influence on node
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 130) {
              const force = Math.pow(1 - dist / 130, 2) * 14;
              y += (dy > 0 ? 1 : -1) * force;
            }
          }

          // Breathing opacity calculation
          const breath = 0.5 + 0.5 * Math.sin(time * 1.5 + node.phase);
          const nodeAlpha = (node.isAccent ? (0.45 + breath * 0.45) : (0.2 + breath * 0.25)) * entranceProgress;

          // Left typography attenuation
          const textZoneDim = u < 0.48 ? 0.35 : 1.0;
          const finalAlpha = nodeAlpha * textZoneDim;

          // Draw node
          ctx.beginPath();
          ctx.arc(x, y, node.radius, 0, Math.PI * 2);
          if (node.isAccent) {
            ctx.fillStyle = `rgba(${accentColor}, ${finalAlpha})`;
            ctx.fill();

            // Subtle concentric acoustic ring around accent nodes
            ctx.beginPath();
            ctx.arc(x, y, node.radius + 3.5 + breath * 1.5, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(${accentColor}, ${finalAlpha * 0.35})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          } else {
            ctx.fillStyle = `rgba(${primaryColor}, ${finalAlpha})`;
            ctx.fill();
          }
        }

        // Process & draw click ripples
        for (let r = ripples.length - 1; r >= 0; r--) {
          const rip = ripples[r];
          rip.radius += 2.2;
          rip.alpha *= 0.94;

          ctx.beginPath();
          ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${accentColor}, ${rip.alpha * 0.4 * entranceProgress})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          if (rip.alpha < 0.02 || rip.radius >= rip.maxRadius) {
            ripples.splice(r, 1);
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    // Mouse interaction handlers (attached to container so canvas has pointer-events: none)
    const container = containerRef.current;
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      const m = mouseRef.current;
      m.targetX = clientX;
      m.targetY = clientY;
      if (!m.active) {
        m.x = clientX;
        m.y = clientY;
        m.active = true;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      // Do not trigger ripples if clicking on a button or link
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a")) return;

      const rect = canvas.getBoundingClientRect();
      ripples.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 4,
        maxRadius: 90,
        alpha: 0.65,
      });
    };

    if (container) {
      container.addEventListener("mousemove", handleMouseMove, { passive: true });
      container.addEventListener("mouseleave", handleMouseLeave, { passive: true });
      container.addEventListener("click", handleClick);
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[580px] md:min-h-[640px] md:max-h-[850px] lg:min-h-[100svh] w-full bg-[#F5F1E8] dark:bg-[#07090e] transition-colors duration-200 flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 px-5 sm:px-8 md:px-10 lg:px-12 overflow-hidden select-none"
    >
      {/* Subtle Environmental Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(36,33,26,0.035)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none -z-10" />

      {/* Central Living VoiceOps Signal Canvas (Behind Typography, Pointer Events None) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full max-w-5xl max-h-[520px]"
        />
      </div>

      {/* Top Editorial Composition */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-none">
        <div className="lg:col-span-8 space-y-5 sm:space-y-6 text-left pointer-events-auto">
          {/* Eyebrow (100-250ms entrance) */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="font-mono text-xs font-semibold tracking-wider text-[#58534C] dark:text-zinc-400 uppercase">
              {eyebrow}
            </span>
          </motion.div>

          {/* Headline (350-650ms entrance, tuned 42-56px for tablet) */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-4xl sm:text-[2.75rem] md:text-[3.25rem] lg:text-[3.5rem] font-bold leading-[1.08] text-zinc-950 dark:text-white tracking-tight max-w-2xl"
          >
            Automate the first layer
            <br />
            <span className="text-[#6E685E] dark:text-zinc-400 font-normal">
              of every call.
            </span>
          </motion.h1>

          {/* Supporting Statement (500-750ms entrance, stable permanent position) */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="font-sans text-base sm:text-lg text-[#58534C] dark:text-zinc-300 max-w-xl leading-relaxed font-normal"
          >
            {subheadline}
          </motion.p>
        </div>

        <div className="hidden lg:block lg:col-span-4" />
      </div>

      {/* Bottom Editorial Actions & Clean System Anchor */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-[rgba(36,33,26,0.08)] dark:border-white/[0.08]">
        {/* Left Quiet Product Baseline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-left space-y-1"
        >
          <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 font-medium">
            Voice automation for real business conversations.
          </p>
          <p className="font-mono text-[11px] text-zinc-500">
            voiceops.in · Autonomous Phone Layer
          </p>
        </motion.div>

        {/* Right Actions (600-900ms entrance) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 self-start sm:self-auto"
        >
          <button
            onClick={handleTalkToVoiceOps}
            className="inline-flex items-center gap-1.5 min-h-[44px] px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 font-sans text-xs sm:text-[13px] font-semibold tracking-tight transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 shadow-sm touch-manipulation"
          >
            <span>Talk to VoiceOps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-1.5 min-h-[44px] px-5 py-2.5 rounded-xl bg-transparent text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white border border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 font-sans text-xs sm:text-[13px] font-medium transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 touch-manipulation"
          >
            <span>Build My Voice Agent</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </button>
        </motion.div>
      </div>
    </section>
  );
});
