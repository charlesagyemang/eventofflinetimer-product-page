"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";
import GlowOrb from "@/components/ui/GlowOrb";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const phases = [
  {
    label: "Plenty of time",
    range: "above 50%",
    screenshot: "/screenshots/display-raw.webp",
    alt: "Display with plenty of time",
    width: 1400,
    height: 783,
    dotColor: "#10b981",
    glowColor: "rgba(16, 185, 129, 0.15)",
  },
  {
    label: "Getting close",
    range: "25 \u2013 50%",
    screenshot: "/screenshots/display-warning.webp",
    alt: "Display getting close to end",
    width: 1400,
    height: 794,
    dotColor: "#f59e0b",
    glowColor: "rgba(245, 158, 11, 0.15)",
  },
  {
    label: "Almost there",
    range: "under 10%",
    screenshot: "/screenshots/display-critical.webp",
    alt: "Display almost out of time",
    width: 1400,
    height: 782,
    dotColor: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.15)",
  },
  {
    label: "Time's up",
    range: "0:00",
    screenshot: "/screenshots/display-expired.webp",
    alt: "Display when time is up",
    width: 1400,
    height: 787,
    dotColor: "#ef4444",
    glowColor: "rgba(239, 68, 68, 0.25)",
  },
];

export default function DisplayShowcase() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        <SectionHeading
          title="See what your audience sees."
          subtitle="The display adapts as time runs out — calm green when there's plenty of time, urgent red when there isn't."
        />

        {/* Phase indicators */}
        <div className="hidden md:flex justify-center gap-8 mb-10">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.4, ease }}
              className="flex items-center gap-2"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: phase.dotColor,
                  boxShadow: `0 0 8px ${phase.dotColor}60`,
                }}
              />
              <span className="text-sm text-text-secondary">
                {phase.label}
              </span>
              <span className="text-xs text-text-muted">{phase.range}</span>
            </motion.div>
          ))}
        </div>

        {/* Desktop: 4 across */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-5">
          {phases.map((phase, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.15, duration: 0.6, ease }}
              className="relative"
            >
              <GlowOrb
                color={phase.glowColor}
                size={200}
                className="-top-10 left-1/2 -translate-x-1/2 -z-10"
              />
              <ScreenshotFrame
                src={phase.screenshot}
                alt={phase.alt}
                width={phase.width}
                height={phase.height}
                compact
              />
              {/* Mobile phase label */}
              <div className="md:hidden flex items-center gap-2 mt-2 justify-center">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: phase.dotColor }}
                />
                <span className="text-xs text-text-secondary">
                  {phase.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: horizontal carousel */}
        <div className="md:hidden snap-carousel flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
          {phases.map((phase, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[80vw] max-w-[320px] relative"
            >
              <GlowOrb
                color={phase.glowColor}
                size={150}
                className="-top-8 left-1/2 -translate-x-1/2 -z-10"
              />
              <ScreenshotFrame
                src={phase.screenshot}
                alt={phase.alt}
                width={phase.width}
                height={phase.height}
                compact
              />
              <div className="flex items-center gap-2 mt-3 justify-center">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: phase.dotColor }}
                />
                <span className="text-xs text-text-secondary">
                  {phase.label}
                </span>
                <span className="text-[10px] text-text-muted">
                  {phase.range}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
