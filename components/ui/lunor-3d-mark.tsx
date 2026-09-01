"use client";

import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Lunor3DMarkProps {
  size?: number;
  className?: string;
  interactive?: boolean;
}

/**
 * LUNOR 3D Brand Mark
 * A sculpted, physical 3D interpretation of the LUNOR voice signal mark.
 * Features subtle inertia-damped pointer tilt (1-3 deg), specular light reflection,
 * and responsive hardware-accelerated transforms.
 */
export const Lunor3DMark = memo(function Lunor3DMark({
  size = 72,
  className = "",
  interactive = true,
}: Lunor3DMarkProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || prefersReducedMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Restrained subtle tilt (max 3 degrees)
    setRotation({ x: -y * 6, y: x * 6 });
  }, [interactive, prefersReducedMotion]);

  const handleMouseLeave = useCallback(() => {
    setRotation({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        width: size,
        height: size,
        perspective: 600,
      }}
      className={`relative inline-flex items-center justify-center select-none ${className}`}
    >
      {/* Outer Radiant Glow Aura */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.0,
          ease: "easeInOut",
        }}
        className="absolute -inset-3 rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 blur-2xl opacity-40 pointer-events-none"
      />

      {/* 3D Tilting Core Container */}
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          rotateX: prefersReducedMotion ? 0 : rotation.x,
          rotateY: prefersReducedMotion ? 0 : rotation.y,
        }}
        transition={{
          type: "spring",
          stiffness: 250,
          damping: 25,
        }}
        className="relative flex items-center justify-center rounded-3xl bg-gradient-to-tr from-[#09090b] via-[#18181b] to-[#27272a] dark:from-[#0a0a0f] dark:via-[#12121a] dark:to-[#1e1e2d] border border-white/20 dark:border-blue-500/30 shadow-2xl shadow-blue-500/20 overflow-hidden transform-gpu"
      >
        {/* Specular Light Sweep Reflection Beam */}
        <motion.div
          animate={{
            x: ["-140%", "240%"],
          }}
          transition={{
            repeat: Infinity,
            repeatDelay: 3.5,
            duration: 1.4,
            ease: "easeInOut",
          }}
          className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Top Glass Rim Light */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-3xl" />

        {/* Sculpted LUNOR Vector Geometry inside 3D Container */}
        <div className="relative z-10 p-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <svg
            width={size * 0.65}
            height={size * 0.65}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lunor-3d-grad-main" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
              <linearGradient id="lunor-3d-grad-accent" x1="26" y1="8" x2="42" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>

            {/* Secondary Acoustic Wave */}
            <path
              d="M 27 12 C 27 9.791 28.791 8 31 8 L 35 8 C 37.209 8 39 9.791 39 12 L 39 20 C 39 22.209 37.209 24 35 24 L 31 24 C 28.791 24 27 22.209 27 20 Z"
              fill="url(#lunor-3d-grad-accent)"
              opacity="0.9"
            />

            {/* Primary Continuous L Ribbon */}
            <path
              d="M 11 8 C 11 5.791 12.791 4 15 4 L 19 4 C 21.209 4 23 5.791 23 8 L 23 26 C 23 28.761 25.239 31 28 31 L 37 31 C 39.209 31 41 32.791 41 35 L 41 39 C 41 41.209 39.209 43 37 43 L 23 43 C 16.373 43 11 37.627 11 31 Z"
              fill="url(#lunor-3d-grad-main)"
            />

            {/* Glowing Specular Node */}
            <circle cx="33" cy="16" r="2.5" fill="#ffffff" />
          </svg>
        </div>

        {/* Ambient Bottom Waveform Equalizer Line */}
        <div className="absolute inset-x-3 bottom-2 flex items-end justify-center gap-0.5 sm:gap-1 h-2 opacity-50">
          {[0.4, 0.8, 1, 0.6, 0.9, 0.5, 0.7].map((s, idx) => (
            <motion.span
              key={idx}
              style={{ transformOrigin: "bottom" }}
              animate={{
                scaleY: [s * 0.3, s, s * 0.4],
              }}
              transition={{
                repeat: Infinity,
                duration: 0.8 + (idx % 3) * 0.2,
                ease: "easeInOut",
                repeatType: "mirror",
                delay: idx * 0.08,
              }}
              className="w-0.5 sm:w-1 h-full rounded-full bg-blue-400"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
});
