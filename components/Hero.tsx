"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import PlatformDownload from "@/components/PlatformDownload";
import DeviceConstellation from "@/components/DeviceConstellation";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background glows */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 50% -20%, rgba(14,165,233,0.12), transparent),
            radial-gradient(ellipse 50% 40% at 80% 50%, rgba(34,197,94,0.05), transparent)
          `,
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 py-20 md:py-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column - Copy */}
          <div>
            {/* Tagline badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: 0.1, ease }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-sm text-brand-300 font-medium">
                <Zap size={14} className="text-amber-400" />
                No internet required
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25, ease }}
              className="mt-8 text-[clamp(40px,6vw,80px)] font-extrabold tracking-[-0.035em] leading-[1.0] text-text-primary"
            >
              The event timer that never drops out.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.5, ease }}
              className="mt-6 text-[clamp(16px,2vw,20px)] leading-relaxed text-text-secondary max-w-lg"
            >
              Professional countdown timer that runs entirely on your laptop and
              shares a live display to every screen in the room. No internet. No
              accounts. No cost.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.7, ease }}
              className="mt-8"
            >
              <PlatformDownload />
            </motion.div>
          </div>

          {/* Right column - Device constellation */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="hidden lg:block"
          >
            <DeviceConstellation />
          </motion.div>

          {/* Mobile: simplified constellation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease }}
            className="lg:hidden"
          >
            <DeviceConstellation />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
