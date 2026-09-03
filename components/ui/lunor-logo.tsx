"use client";

import React, { memo } from "react";

interface LunorLogoProps {
  size?: number;
  className?: string;
  variant?: "full" | "symbol" | "monochrome";
  monochromeColor?: string;
}

/**
 * LUNOR Brand Mark (Continuous Acoustic Flow & L Monogram)
 * An iconic, precision-sculpted vector brand mark inspired by:
 * VOICE SIGNAL + CONTINUOUS FLOW + LETTER 'L' + INTELLIGENCE + CONNECTION.
 */
export const LunorSymbol = memo(function LunorSymbol({
  size = 32,
  className = "",
  variant = "full",
  monochromeColor,
}: {
  size?: number;
  className?: string;
  variant?: "full" | "monochrome";
  monochromeColor?: string;
}) {
  const isMonochrome = variant === "monochrome" || Boolean(monochromeColor);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="VoiceOps Brand Mark"
    >
      <defs>
        {/* Primary Sapphire Stream Gradient */}
        <linearGradient id="voiceops-grad-primary" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="40%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        {/* Secondary Harmonic Wave Gradient */}
        <linearGradient id="voiceops-grad-secondary" x1="18" y1="12" x2="44" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#1e40af" stopOpacity="0.95" />
        </linearGradient>

        {/* Specular Edge Highlight Gradient */}
        <linearGradient id="voiceops-specular" x1="8" y1="4" x2="28" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#ffffff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>

        {/* Subtle Ambient Drop Glow */}
        <filter id="voiceops-drop-glow" x="-20%" y="-20%" width="140%" height="140%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#2563eb" floodOpacity="0.35" />
        </filter>
      </defs>

      {isMonochrome ? (
        /* Monochrome Single Color Path for Print / Favicon / High Contrast */
        <g fill={monochromeColor || "currentColor"}>
          {/* Main L Flow Trunk */}
          <path
            d="M 12 6 C 12 4.895 12.895 4 14 4 L 20 4 C 21.105 4 22 4.895 22 6 L 22 26 C 22 29.314 24.686 32 28 32 L 38 32 C 39.105 32 40 32.895 40 34 L 40 40 C 40 41.105 39.105 42 38 42 L 24 42 C 17.373 42 12 36.627 12 30 Z"
          />
          {/* Harmonic Signal Accent Wave */}
          <path
            d="M 28 12 C 28 10.895 28.895 10 30 10 L 36 10 C 37.105 10 38 10.895 38 12 L 38 20 C 38 21.105 37.105 22 36 22 L 30 22 C 28.895 22 28 21.105 28 20 Z"
          />
        </g>
      ) : (
        /* Full Luxury 3D-Styled Vector Mark */
        <g filter="url(#voiceops-drop-glow)">
          {/* Secondary Resonance Signal Wave */}
          <path
            d="M 27 12 C 27 9.791 28.791 8 31 8 L 35 8 C 37.209 8 39 9.791 39 12 L 39 20 C 39 22.209 37.209 24 35 24 L 31 24 C 28.791 24 27 22.209 27 20 Z"
            fill="url(#voiceops-grad-secondary)"
          />

          {/* Core Flowing Continuous Ribbon */}
          <path
            d="M 11 8 C 11 5.791 12.791 4 15 4 L 19 4 C 21.209 4 23 5.791 23 8 L 23 26 C 23 28.761 25.239 31 28 31 L 37 31 C 39.209 31 41 32.791 41 35 L 41 39 C 41 41.209 39.209 43 37 43 L 23 43 C 16.373 43 11 37.627 11 31 Z"
            fill="url(#voiceops-grad-primary)"
          />

          {/* Specular Edge Highlight Overlay */}
          <path
            d="M 12 7 C 12 5.5 13 4.5 15 4.5 L 19 4.5 C 20.5 4.5 21.5 5.5 21.5 7 L 21.5 26 C 21.5 30 24.5 32.5 28 32.5 L 37 32.5 C 38.5 32.5 39.5 33.5 39.5 35 L 39.5 37 C 39.5 35.5 38.5 34.5 37 34.5 L 28 34.5 C 24 34.5 20 31 20 26 L 20 7 C 20 5.8 19 5.2 18 5.2 L 15 5.2 C 13.5 5.2 12.5 6 12 7 Z"
            fill="url(#voiceops-specular)"
          />

          {/* Precision Core Signal Node */}
          <circle cx="33" cy="16" r="2.5" fill="#ffffff" opacity="0.95" />
        </g>
      )}
    </svg>
  );
});

/**
 * Complete VOICEOPS Logo Component with Precision Wordmark
 */
export const LunorLogo = memo(function LunorLogo({
  size = 32,
  showWordmark = true,
  className = "",
}: {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2 group cursor-pointer ${className}`}>
      {/* Precision Brand Symbol */}
      <div className="relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <LunorSymbol size={size} />
      </div>

      {/* Modern Refined Wordmark */}
      {showWordmark && (
        <span className="font-extrabold text-base sm:text-lg tracking-[-0.03em] text-zinc-950 dark:text-white font-sans transition-colors">
          VOICEOPS
        </span>
      )}
    </div>
  );
});

export const VoiceOpsLogo = LunorLogo;
export const VoiceOpsSymbol = LunorSymbol;
