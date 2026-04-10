"use client";

import { motion } from "framer-motion";
import {
  Mic,
  Church,
  Building2,
  GraduationCap,
  Laptop,
  Drama,
} from "lucide-react";

const useCases = [
  { icon: Mic, label: "Conferences" },
  { icon: Church, label: "Church Services" },
  { icon: Building2, label: "Corporate" },
  { icon: GraduationCap, label: "Graduations" },
  { icon: Laptop, label: "Hackathons" },
  { icon: Drama, label: "Performances" },
];

export default function UseCasesStrip() {
  return (
    <section className="relative py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-center text-text-secondary text-sm md:text-base mb-8"
        >
          Trusted at conferences, churches, hackathons, graduations, corporate
          workshops, and performances worldwide.
        </motion.p>

        {/* Desktop: centered row */}
        <div className="hidden md:flex justify-center gap-3 flex-wrap">
          {useCases.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.3,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-text-secondary"
            >
              <uc.icon size={14} className="text-text-muted" />
              {uc.label}
            </motion.div>
          ))}
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="md:hidden relative">
          <div className="flex gap-3 overflow-x-auto hide-scrollbar pb-2">
            {useCases.map((uc, i) => (
              <div
                key={i}
                className="flex-shrink-0 flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-text-secondary"
              >
                <uc.icon size={14} className="text-text-muted" />
                {uc.label}
              </div>
            ))}
          </div>
          {/* Fade edges */}
          <div className="absolute top-0 left-0 bottom-0 w-6 bg-gradient-to-r from-[#07090f] to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-0 w-6 bg-gradient-to-l from-[#07090f] to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
