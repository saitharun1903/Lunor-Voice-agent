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
  subheadline = "AI voice systems that handle the first layer of business calls — from enquiries and bookings to qualification, support and follow-ups.",
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

  // Central Interactive VoiceOps Signal Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Pause when offscreen for high performance
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

    // Generate VOICEOPS Signal Field Nodes along harmonious wave contours
    let nodes: ParticleNode[] = [];
    const NUM_ROWS = 7;
    const NODES_PER_ROW = 32;

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
            radius: isCenter ? 1.8 : 1.2,
            color: isCenter ? "#60a5fa" : "#94a3b8",
            alpha: isCenter ? 0.75 : 0.4,
            phase: Math.random() * Math.PI * 2,
            freq: 0.02 + Math.random() * 0.02,
          });
        }
      }
    };

    initNodes();

    // Mouse tracker inside container
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

    // Render loop with spring dynamics and wave propagation
    let time = 0;
    const render = () => {
      if (!isVisibleRef.current) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      time += 0.02;

      // Draw faint background frequency contours
      ctx.lineWidth = 0.75;
      for (let r = 0; r < NUM_ROWS; r++) {
        ctx.beginPath();
        ctx.strokeStyle = r % 2 === 0 ? "rgba(59, 130, 246, 0.12)" : "rgba(255, 255, 255, 0.04)";
        let first = true;
        for (let c = 0; c < NODES_PER_ROW; c++) {
          const node = nodes[r * NODES_PER_ROW + c];
          if (!node) continue;
          if (first) {
            ctx.moveTo(node.x, node.y);
            first = false;
          } else {
            ctx.lineTo(node.x, node.y);
          }
        }
        ctx.stroke();
      }

      // Update and draw signal points
      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];

        // 1. Idle organic acoustic breathing
        const idleWave = Math.sin(time * 1.5 + p.baseX * 0.01 + p.phase) * 5;
        const targetY = p.baseY + idleWave;
        const targetX = p.baseX + Math.cos(time + p.phase) * 2;

        // 2. Localized cursor displacement (Desktop exploration)
        if (mouseRef.current.active) {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 120;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 18;
            p.vx += (dx / dist) * force * 0.2;
            p.vy += (dy / dist) * force * 0.2;
          }
        }

        // Spring return to base target position
        const ax = (targetX - p.x) * 0.06;
        const ay = (targetY - p.y) * 0.06;

        p.vx = (p.vx + ax) * 0.88;
        p.vy = (p.vy + ay) * 0.88;

        p.x += p.vx;
        p.y += p.vy;

        // Draw node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1.0;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      observer.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleCanvasClick = () => {
    setIsClickPulsing(true);
    setTimeout(() => setIsClickPulsing(false), 600);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] w-full chapter-midnight flex flex-col justify-between pt-28 pb-10 sm:pb-12 px-5 sm:px-8 md:px-12 overflow-hidden select-none"
    >
      {/* 1. Atmospheric Deep Charcoal & Sapphire Light Fields */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[500px] ambient-glow-midnight pointer-events-none -z-10 blur-3xl opacity-60" />

      {/* 2. Low-Contrast Fine Environmental Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:28px_28px] opacity-20 pointer-events-none -z-10" />

      {/* 3. Central Ambient Interactive VoiceOps Signal Visual */}
      <div
        onClick={handleCanvasClick}
        className="absolute inset-0 flex items-center justify-center pointer-events-auto cursor-crosshair z-0"
        title="VoiceOps Signal Field — Move cursor to explore"
      >
        <canvas
          ref={canvasRef}
          className={`w-full h-full max-w-4xl max-h-[500px] transition-transform duration-500 ${
            isClickPulsing ? "scale-[1.02]" : "scale-100"
          }`}
        />
      </div>

      {/* 4. Top Asymmetric Editorial Composition (Left-Anchored Headline + Empty Negative Space) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pointer-events-none">
        {/* Left: Controlled Large Serif Headline + Concise Thesis */}
        <div className="lg:col-span-7 space-y-6 text-left pointer-events-auto">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-4xl sm:text-5xl lg:text-[3.75rem] font-normal leading-[1.06] text-white tracking-tight"
          >
            Automate the first layer
            <br />
            <span className="italic font-light text-zinc-400">
              of every call.
            </span>
          </motion.h1>

          {/* Short Supporting Copy (2-3 lines max, no large paragraph block) */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-sm sm:text-base text-zinc-400 max-w-md leading-relaxed font-normal"
          >
            {subheadline}
          </motion.p>
        </div>

        {/* Right: Pure Negative Space Creating Editorial Tension */}
        <div className="hidden lg:block lg:col-span-5" />
      </div>

      {/* 5. Small Bottom Information Areas & Compact Editorial Actions (Zero Containers) */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-t border-white/[0.06]">
        {/* Bottom Left: Quiet Typography */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-left space-y-1"
        >
          <p className="font-sans text-xs text-zinc-400 font-normal">
            Voice automation for real business conversations.
          </p>
          <p className="font-mono text-[11px] text-zinc-600">
            VoiceOps First Layer Architecture
          </p>
        </motion.div>

        {/* Bottom Right: Compact Editorial Controls (No giant pills) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 sm:gap-4 self-start sm:self-auto"
        >
          <button
            onClick={handleTalkToVoiceOps}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 font-sans text-xs font-medium transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5 shadow-sm"
          >
            <span>Talk to VoiceOps</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-zinc-300 hover:text-white border border-white/20 hover:border-white/40 font-sans text-xs font-medium transition-all duration-150 hover:-translate-y-0.5 active:translate-y-0.5"
          >
            <span>Build My Voice Agent</span>
            <ArrowUpRight className="w-3 h-3 text-zinc-400" />
          </button>
        </motion.div>
      </div>
    </section>
  );
});
