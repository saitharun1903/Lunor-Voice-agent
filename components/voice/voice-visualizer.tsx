"use client";

import React, { useEffect, useRef, memo } from "react";
import { VoiceAgentState } from "./provider-types";

interface VoiceVisualizerProps {
  getAudioData: () => Uint8Array | null;
  state: VoiceAgentState;
  className?: string;
}

export const VoiceVisualizer = memo(function VoiceVisualizer({
  getAudioData,
  state,
  className = "",
}: VoiceVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const numBars = 24;
    const barWidth = 3;
    const gap = (width - numBars * barWidth) / (numBars + 1);

    // If ready or ending, draw a static baseline once and do NOT run requestAnimationFrame
    if (state === "ready" || state === "ending") {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(140, 140, 150, 0.35)";
      for (let i = 0; i < numBars; i++) {
        const x = gap + i * (barWidth + gap);
        const y = (height - 4) / 2;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, 4, barWidth / 2);
        ctx.fill();
      }
      return;
    }

    let phase = 0;

    const render = () => {
      if (document.visibilityState === "hidden") {
        animFrameId.current = requestAnimationFrame(render);
        return;
      }

      phase += 0.05;
      ctx.clearRect(0, 0, width, height);

      const audioData = getAudioData();

      let baseAmplitude = 4;
      if (state === "speaking") {
        baseAmplitude = 22;
      } else if (state === "listening") {
        baseAmplitude = 14;
      } else if (state === "thinking") {
        baseAmplitude = 8;
      }

      ctx.fillStyle =
        state === "speaking" ? "#3b82f6" : state === "listening" ? "#10b981" : "#818cf8";

      for (let i = 0; i < numBars; i++) {
        let barHeight = 4;

        if (audioData && audioData.length > 0 && (state === "listening" || state === "speaking")) {
          const dataIndex = Math.floor((i / numBars) * (audioData.length / 2));
          const val = audioData[dataIndex] || 0;
          barHeight = Math.max(4, (val / 255) * height * 0.85);
        } else {
          const wave = Math.sin(phase + i * 0.45) * 0.5 + 0.5;
          const secondary = Math.cos(phase * 1.3 + i * 0.3) * 0.3 + 0.5;
          barHeight = Math.max(4, wave * secondary * baseAmplitude + 4);
        }

        const x = gap + i * (barWidth + gap);
        const y = (height - barHeight) / 2;
        const radius = barWidth / 2;

        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, radius);
        ctx.fill();
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
        animFrameId.current = null;
      }
    };
  }, [getAudioData, state]);

  return (
    <canvas
      ref={canvasRef}
      width={180}
      height={44}
      className={`w-full max-w-[180px] h-10 ${className}`}
    />
  );
});
