"use client";

import { useState } from "react";
import {
  WifiOff,
  Radio,
  Monitor,
  Palette,
  SlidersHorizontal,
  Globe,
} from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import GlowCard from "@/components/ui/GlowCard";
import SectionHeading from "@/components/ui/SectionHeading";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";

const features = [
  {
    icon: WifiOff,
    title: "Offline-first",
    body: "Your laptop is the server. No internet needed to run, share, or sync. The room's router is the only infrastructure required.",
  },
  {
    icon: Radio,
    title: "Under 10ms sync",
    body: "Every display updates in under 10 milliseconds. Direct WebSocket \u2014 no cloud relay, no polling, no lag.",
  },
  {
    icon: Monitor,
    title: "Any screen, any device",
    body: "Projectors, TVs, phones, tablets, second laptops. If it has a browser, it's a display. No app to install.",
  },
  {
    icon: Palette,
    title: "Designed for distance",
    body: "Huge glowing digits readable from 20 meters. Color phases shift from green to red as time runs out. Unmissable.",
  },
  {
    icon: SlidersHorizontal,
    title: "Total control",
    body: "Presets from 1 minute to 3 hours. Custom durations. Add or subtract time mid-session. Start, pause, reset.",
  },
  {
    icon: Globe,
    title: "Go online (when you want)",
    body: "One click creates a public HTTPS link for remote viewers. No account. No setup. Off by default \u2014 your timer, your choice.",
    expandable: true,
  },
];

export default function FeatureGrid() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  return (
    <section id="features" className="relative py-12 sm:py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <SectionHeading
          title="Built for the moments that matter most."
          subtitle="When a speaker has 5 minutes left, that information needs to be there. Always. On every screen. Without question."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {features.map((feature, i) => (
            <GlowCard key={i} delay={i * 0.1}>
              <div
                className={feature.expandable ? "cursor-pointer" : ""}
                onClick={
                  feature.expandable
                    ? () =>
                        setExpandedCard(expandedCard === i ? null : i)
                    : undefined
                }
                onMouseEnter={
                  feature.expandable
                    ? () => setExpandedCard(i)
                    : undefined
                }
                onMouseLeave={
                  feature.expandable
                    ? () => setExpandedCard(null)
                    : undefined
                }
              >
                <feature.icon
                  size={24}
                  className="text-brand-300 mb-4"
                  strokeWidth={1.5}
                />
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  {feature.body}
                </p>

                {/* Expandable tunnel screenshot */}
                {feature.expandable && (
                  <AnimatePresence>
                    {expandedCard === i && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: 10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="mt-4 overflow-hidden"
                      >
                        <ScreenshotFrame
                          src="/screenshots/tunnel-online.webp"
                          alt="Tunnel online feature"
                          width={1400}
                          height={983}
                          compact
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
