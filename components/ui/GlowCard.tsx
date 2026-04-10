"use client";

import { motion } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
  elevated?: boolean;
  delay?: number;
}

export default function GlowCard({
  children,
  className = "",
  elevated = false,
  delay = 0,
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{
        scale: 1.02,
        borderColor: "rgba(56, 189, 248, 0.25)",
        boxShadow: "0 0 40px rgba(56, 189, 248, 0.06)",
      }}
      className={`rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-xl p-8 md:p-6 transition-colors duration-200 ${
        elevated
          ? "border-brand-500 shadow-[0_0_40px_rgba(14,165,233,0.10)] -translate-y-3"
          : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
