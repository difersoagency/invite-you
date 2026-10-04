"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const LOGIN_FLAG = "justLoggedIn";

const ease = [0.65, 0, 0.35, 1] as const;

// "cover": di halaman login, panel hitam naik menutup layar.
// "reveal": di dashboard, panel yang sama turun membuka halaman.
export default function LoginTransition({ mode, onDone }: { mode: "cover" | "reveal"; onDone?: () => void }) {
  const isCover = mode === "cover";
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink"
      initial={{ y: isCover ? "100%" : "0%" }}
      animate={{ y: isCover ? "0%" : "-100%" }}
      transition={{ duration: 0.6, delay: isCover ? 0 : 0.2, ease }}
      onAnimationComplete={onDone}
      style={{ pointerEvents: isCover ? "auto" : "none" }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: isCover ? 0 : 1 }}
        animate={{ opacity: isCover ? 1 : 0 }}
        transition={{ duration: 0.3, delay: isCover ? 0.3 : 0 }}
      >
        <Image src="/logo.png" alt="Invite You" width={500} height={142} className="h-12 w-auto brightness-0 invert" priority />
        <motion.div
          className="mt-5 h-px bg-gold"
          initial={{ width: isCover ? 0 : 64 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.4, delay: 0.35, ease }}
        />
      </motion.div>
    </motion.div>
  );
}
