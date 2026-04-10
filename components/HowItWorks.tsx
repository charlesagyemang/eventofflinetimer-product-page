"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";
import DeviceMockup from "@/components/ui/DeviceMockup";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const steps = [
  {
    number: 1,
    title: "Open the app",
    description:
      "Download and double-click. No accounts. No sign-up. No config.",
    screenshot: "/screenshots/admin-full.webp",
    screenshotAlt: "Admin panel",
    width: 1400,
    height: 994,
    frameType: "screenshot" as const,
  },
  {
    number: 2,
    title: "Set your timer",
    description:
      "Enter event title, speaker, duration. Hit Start. That's the whole workflow.",
    screenshot: "/screenshots/admin-preview.webp",
    screenshotAlt: "Admin preview",
    width: 1400,
    height: 918,
    frameType: "screenshot" as const,
  },
  {
    number: 3,
    title: "Share the link",
    description:
      "The app shows a LAN URL. Open it on any screen in the room.",
    screenshot: "/screenshots/display-with-notes.webp",
    screenshotAlt: "Display with notes",
    width: 1400,
    height: 784,
    frameType: "screenshot" as const,
  },
  {
    number: 4,
    title: "Scan & go",
    description:
      "Any phone can scan the QR code and see the countdown live. No app needed.",
    screenshot: "/screenshots/network-qr.webp",
    screenshotAlt: "QR code sharing",
    width: 1400,
    height: 738,
    frameType: "phone" as const,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-28 bg-brand-800/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        <SectionHeading title="Up and running in 30 seconds." />

        {/* Desktop: horizontal layout */}
        <div className="hidden lg:block">
          {/* Connecting line */}
          <div className="relative mb-12">
            <div className="flex justify-between items-center relative">
              {/* SVG line */}
              <svg
                className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 w-full pointer-events-none"
                preserveAspectRatio="none"
              >
                <motion.line
                  x1="5%"
                  y1="50%"
                  x2="95%"
                  y2="50%"
                  stroke="rgba(56,189,248,0.3)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, ease }}
                />
              </svg>

              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0.3 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.4, delay: i * 0.3, ease }}
                  className="relative z-10 w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(14,165,233,0.25)]"
                >
                  {step.number}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Steps grid */}
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: i * 0.15, ease }}
                className="text-center"
              >
                <h3 className="text-base font-semibold text-text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed mb-4">
                  {step.description}
                </p>
                {step.frameType === "phone" ? (
                  <div className="flex justify-center">
                    <div className="w-32">
                      <DeviceMockup type="phone">
                        <Image
                          src={step.screenshot}
                          alt={step.screenshotAlt}
                          width={step.width}
                          height={step.height}
                          className="w-full h-auto"
                        />
                      </DeviceMockup>
                    </div>
                  </div>
                ) : (
                  <ScreenshotFrame
                    src={step.screenshot}
                    alt={step.screenshotAlt}
                    width={step.width}
                    height={step.height}
                    compact
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile/Tablet: vertical layout */}
        <div className="lg:hidden space-y-10 relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-brand-500/20" />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: i * 0.1, ease }}
              className="pl-14 relative"
            >
              {/* Step number */}
              <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_20px_rgba(14,165,233,0.25)]">
                {step.number}
              </div>

              <h3 className="text-lg font-semibold text-text-primary mb-1">
                {step.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">
                {step.description}
              </p>
              {step.frameType === "phone" ? (
                <div className="w-32">
                  <DeviceMockup type="phone">
                    <Image
                      src={step.screenshot}
                      alt={step.screenshotAlt}
                      width={step.width}
                      height={step.height}
                      className="w-full h-auto"
                    />
                  </DeviceMockup>
                </div>
              ) : (
                <ScreenshotFrame
                  src={step.screenshot}
                  alt={step.screenshotAlt}
                  width={step.width}
                  height={step.height}
                  compact
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
