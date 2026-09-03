"use client";

import React, { memo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const SignalSpine = memo(function SignalSpine() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <div
      aria-hidden="true"
      className="hidden xl:flex fixed left-8 top-36 bottom-24 w-[1px] flex-col items-center pointer-events-none z-30 select-none"
    >
      {/* Background Track */}
      <div className="w-full h-full bg-black/[0.06] dark:bg-white/[0.07] relative overflow-hidden">
        {/* Continuous Traversing Signal Beam */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-600/40 via-blue-500 to-blue-400 origin-top"
          style={{ height: "100%", scaleY: smoothProgress }}
        />
      </div>

      {/* Floating Acoustic Signal Node */}
      <motion.div
        className="absolute w-2 h-2 -left-[3.5px] rounded-full bg-blue-500 signal-spine-glow"
        style={{
          top: "0%",
          translateY: useSpring(
            scrollYProgress,
            { stiffness: 100, damping: 20 }
          ),
        }}
      />
    </div>
  );
});
