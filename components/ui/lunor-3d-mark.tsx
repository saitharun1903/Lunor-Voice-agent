"use client";

import React, { useRef, useState, memo, useCallback } from "react";
import { motion } from "framer-motion";

interface Lunor3DMarkProps {
  size?: number;
  className?: string;
  interactive?: boolean;
}

export const Lunor3DMark = memo(function Lunor3DMark({
  size = 76,
  className = "",
  interactive = true,
}: Lunor3DMarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    // Restrained 1–3 degree physics tilt
    const normX = (e.clientX - centerX) / (rect.width / 2);
    const normY = (e.clientY - centerY) / (rect.height / 2);
    setTilt({
      x: -normY * 4,
      y: normX * 4,
    });
  }, [interactive]);

  const handlePointerLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  }, []);

  const handlePointerEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      style={{
        width: size,
        height: size,
        perspective: 800,
      }}
      className={`relative inline-flex items-center justify-center select-none cursor-pointer ${className}`}
    >
      <motion.div
        style={{
          width: size,
          height: size,
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformStyle: "preserve-3d",
        }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* Ambient Radial Resonance Glow */}
        <div
          className={`absolute -inset-2 rounded-full blur-xl transition-opacity duration-500 pointer-events-none ${
            isHovered ? "opacity-75 bg-blue-500/25" : "opacity-35 bg-blue-500/15"
          }`}
        />

        {/* Physical 3D Acoustic Chamber */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_4px_16px_rgba(37,99,235,0.25)]"
        >
          <defs>
            {/* Outer Rim Graphite Gradient */}
            <linearGradient id="chamberRim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#27272a" />
              <stop offset="50%" stopColor="#18181b" />
              <stop offset="100%" stopColor="#09090b" />
            </linearGradient>

            {/* Specular Rim Highlight */}
            <linearGradient id="rimSpecular" x1="20%" y1="0%" x2="80%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
              <stop offset="40%" stopColor="#2563eb" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.1" />
            </linearGradient>

            {/* Core Acoustic Signal Waveform Gradient */}
            <linearGradient id="signalFlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="45%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>

            {/* Precision Micro Shadow Filter */}
            <filter id="coreGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563eb" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* 1. Outer Physical Bezel Base */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="26"
            fill="url(#chamberRim)"
            stroke="url(#rimSpecular)"
            strokeWidth="1.5"
          />

          {/* 2. Inner Recessed Acoustic Chamber */}
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            rx="20"
            fill="#08080a"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="1"
          />

          {/* 3. Subtle Concentric Telephony Orbit Rings */}
          <circle cx="50" cy="50" r="32" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="50" cy="50" r="22" stroke="rgba(37,99,235,0.1)" strokeWidth="1" />

          {/* 4. The Iconic LUNOR Acoustic 'L' Signal Ribbon (Voice -> Understand -> Action) */}
          <g filter="url(#coreGlow)">
            {/* Primary Signal Ribbon Stem */}
            <path
              d="M 33 26
                 C 33 24, 35 22, 38 22
                 L 44 22
                 C 47 22, 49 24, 49 27
                 L 49 57
                 C 49 61, 52 64, 56 64
                 L 70 64
                 C 73 64, 75 66, 75 69
                 C 75 72, 73 74, 70 74
                 L 45 74
                 C 38 74, 33 69, 33 62
                 Z"
              fill="url(#signalFlow)"
            />

            {/* Specular Edge Refraction on the Ribbon */}
            <path
              d="M 36 24 L 43 24 C 45 24, 46 25, 46 27 L 46 59 C 46 64, 49 67, 54 67 L 70 67"
              stroke="rgba(255, 255, 255, 0.65)"
              strokeWidth="1.2"
              strokeLinecap="round"
              fill="none"
            />

            {/* Acoustic Resonance Signal Node */}
            <circle cx="68" cy="40" r="4.5" fill="#38bdf8" />
            <circle cx="68" cy="40" r="8" stroke="#38bdf8" strokeWidth="1" strokeOpacity="0.4" />
          </g>

          {/* 5. Physical Glass Reflection Angle Line */}
          <line
            x1="18"
            y1="14"
            x2="82"
            y2="30"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>
    </div>
  );
});
