"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const LOGIN_FLAG = "justLoggedIn";

const ease = [0.65, 0, 0.35, 1] as const;

// "cover": shown on the login page, a gold circle grows to fill the screen.
// "reveal": shown on the dashboard, the same full screen fades away.
export default function LoginTransition({ mode, onDone }: { mode: "cover" | "reveal"; onDone?: () => void }) {
  const isCover = mode === "cover";
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-gold-300 via-gold to-gold-600"
      initial={isCover ? { clipPath: "circle(0% at 50% 50%)" } : { opacity: 1 }}
      animate={isCover ? { clipPath: "circle(150% at 50% 50%)" } : { opacity: 0 }}
      transition={isCover ? { duration: 0.6, ease } : { duration: 0.5, delay: 0.15, ease }}
      onAnimationComplete={onDone}
      style={{ pointerEvents: isCover ? "auto" : "none" }}
    >
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={isCover ? { opacity: 0, y: 12, scale: 0.9 } : { opacity: 1, scale: 1 }}
        animate={isCover ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, scale: 1.08 }}
        transition={isCover ? { duration: 0.45, delay: 0.25, ease } : { duration: 0.45, ease }}
      >
        <Image src="/logo.png" alt="Invite You" width={500} height={142} className="h-16 w-auto brightness-0 invert" priority />
        <p className="font-display text-lg text-white/90">Selamat datang kembali</p>
      </motion.div>
    </motion.div>
  );
}
