"use client";

import React, { memo, useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

interface HeroProps {
  eyebrow?: string;
  headline?: string;
  subheadline?: string;
  onTalkToLuno?: () => void;
  onTalkToVoiceOps?: () => void;
}

interface ParticleNode {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  phase: number;
  freq: number;
}

export const Hero = memo(function Hero({
  eyebrow = "VOICE AUTOMATION FOR BUSINESS",
  subheadline = "VoiceOps builds AI voice systems that handle repetitive business conversations — from enquiries and bookings to lead qualification, support, and follow-ups.",
  onTalkToLuno,
  onTalkToVoiceOps,
}: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });
  const animFrameRef = useRef<number>();
  const isVisibleRef = useRef(true);
  const [isClickPulsing, setIsClickPulsing] = useState(false);

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

  // Central Interactive VoiceOps Signal Canvas (Voice -> Understanding -> Action)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initNodes();
    };
    window.addEventListener("resize", handleResize);

    let nodes: ParticleNode[] = [];
    const NUM_ROWS = 7;
    const NODES_PER_ROW = 30;

    const initNodes = () => {
      nodes = [];
      const rowSpacing = height / (NUM_ROWS + 1);
      const colSpacing = width / (NODES_PER_ROW + 1);

      for (let r = 0; r < NUM_ROWS; r++) {
        const yBase = (r + 1) * rowSpacing;
        for (let c = 0; c < NODES_PER_ROW; c++) {
          const xBase = (c + 1) * colSpacing;
          const isCenter = Math.abs(r - NUM_ROWS / 2) < 2 && Math.abs(c - NODES_PER_ROW / 2) < 8;
          nodes.push({
            baseX: xBase,
            baseY: yBase,
            x: xBase,
            y: yBase,
            vx: 0,
            vy: 0,
            radius: isCenter ? 2 : 1.3,
            color: isCenter ? "#3b82f6" : "#64748b",
            alpha: isCenter ? 0.7 : 0.35,
            phase: Math.random() * Math.PI * 2,
            freq: 0.02 + Math.random() * 0.02,
          });
        }
      }
    };

    initNodes();

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    let time = 0;
    const render = () => {
      if (isVisibleRef.current) {
        ctx.clearRect(0, 0, width, height);
        time += 0.02;

        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const mouseActive = mouseRef.current.active;

        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          const harmonic = Math.sin(time + node.phase + node.baseX * 0.005) * 8;
          let targetY = node.baseY + harmonic;
          let targetX = node.baseX;

          if (mouseActive) {
            const dx = mx - node.x;
            const dy = my - node.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = 140;

            if (dist < maxDist) {
              const force = (1 - dist / maxDist) * 16;
              const angle = Math.atan2(dy, dx);
              targetX -= Math.cos(angle) * force;
              targetY -= Math.sin(angle) * force;
            }
          }

          node.vx += (targetX - node.x) * 0.08;
          node.vy += (targetY - node.y) * 0.08;
          node.vx *= 0.85;
          node.vy *= 0.85;
          node.x += node.vx;
          node.y += node.vy;

          ctx.fillStyle = node.color;
          ctx.globalAlpha = node.alpha;
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        // Connect adjacent horizontal nodes
        ctx.lineWidth = 1;
        for (let r = 0; r < NUM_ROWS; r++) {
          ctx.beginPath();
          let started = false;
          for (let c = 0; c < NODES_PER_ROW; c++) {
            const idx = r * NODES_PER_ROW + c;
            const node = nodes[idx];
            if (!started) {
              ctx.moveTo(node.x, node.y);
              started = true;
            } else {
              ctx.lineTo(node.x, node.y);
            }
          }
          const rowFromCenter = Math.abs(r - NUM_ROWS / 2);
          ctx.strokeStyle = rowFromCenter < 1.5 ? "rgba(59, 130, 246, 0.25)" : "rgba(100, 116, 139, 0.12)";
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const handleCanvasClick = () => {
    setIsClickPulsing(true);
    setTimeout(() => setIsClickPulsing(false), 500);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92svh] lg:min-h-[100svh] w-full bg-[#faf8f5] dark:bg-[#07090e] transition-colors duration-200 flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 px-5 sm:px-8 md:px-12 overflow-hidden select-none"
    >
      {/* Subtle Environmental Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none -z-10" />

      {/* Central Interactive VoiceOps Signal Visual (Voice -> Understanding -> Action) */}
      <div
        onClick={handleCanvasClick}
        className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-crosshair z-0"
        title="VoiceOps Signal Field — Move cursor to explore"
      >
        <canvas
          ref={canvasRef}
          className={`w-full h-full max-w-4xl max-h-[480px] transition-transform duration-500 ${
            isClickPulsing ? "scale-[1.02]" : "scale-100"
          }`}
        />
      </div>

      {/* Top Editorial Composition */}
      <div className="relative z-10 max-w-5xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-none">
        <div className="lg:col-span-8 space-y-5 sm:space-y-6 text-left pointer-events-auto">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="font-mono text-xs font-semibold tracking-wider text-zinc-600 dark:text-zinc-400 uppercase">
              {eyebrow}
            </span>
          </motion.div>

          {/* Headline (Sentence Case, Balanced Editorial Hierarchy) */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] text-zinc-950 dark:text-white tracking-tight"
          >
            Automate the first layer
            <br />
            <span className="text-zinc-500 dark:text-zinc-400 font-normal">
              of every call.
            </span>
          </motion.h1>

          {/* Supporting Statement (45-70 characters per line) */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed font-normal"
          >
            {subheadline}
          </motion.p>
        </div>

        <div className="hidden lg:block lg:col-span-4" />
      </div>

      {/* Bottom Editorial Actions & Architecture Status */}
      <div className="relative z-10 max-w-5xl mx-auto w-full pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-black/[0.06] dark:border-white/[0.08]">
        {/* Left Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-left space-y-1"
        >
          <p className="font-sans text-xs text-zinc-700 dark:text-zinc-300 font-medium">
            Autonomous first-layer phone automation.
          </p>
          <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-500">
            VoiceOps Architectural Pipeline · Sub-400ms Turn Cadence
          </p>
        </motion.div>

        {/* Right Actions */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 self-start sm:self-auto"
        >
          <button
            onClick={handleTalkToVoiceOps}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-zinc-950 font-sans text-xs font-semibold tracking-tight transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 shadow-sm"
          >
            <span>Talk to VoiceOps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-transparent text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white border border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 font-sans text-xs font-medium transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5"
          >
            <span>Build My Voice Agent</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-500" />
          </button>
        </motion.div>
      </div>
    </section>
  );
});
