"use client";

import React, { memo } from "react";

interface LunorLogoProps {
  size?: number;
  className?: string;
  variant?: "full" | "symbol" | "monochrome";
  monochromeColor?: string;
}

/**
 * Official VOICEOPS Brand Emblem (V-shaped Acoustic Waveform)
 */
export const VoiceOpsSymbol = memo(function VoiceOpsSymbol({
  size = 32,
  className = "",
}: {
  size?: number;
  className?: string;
  variant?: "full" | "monochrome";
  monochromeColor?: string;
}) {
  return (
    <img
      src="/icon.svg"
      width={size}
      height={size}
      alt="VoiceOps Emblem"
      className={`shrink-0 select-none object-contain ${className}`}
      style={{ width: size, height: size }}
    />
  );
});

export const LunorSymbol = VoiceOpsSymbol;

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
