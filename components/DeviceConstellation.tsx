"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import DeviceMockup from "@/components/ui/DeviceMockup";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function DeviceConstellation() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto">
      {/* Laptop - center */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease }}
      >
        <DeviceMockup type="laptop">
          <Image
            src="/screenshots/admin-full.webp"
            alt="Admin control panel"
            width={1400}
            height={994}
            priority
            className="w-full h-auto"
          />
        </DeviceMockup>
      </motion.div>

      {/* Connection lines + devices */}
      <div className="mt-4 sm:mt-6 flex items-start justify-center gap-2 sm:gap-4 md:gap-8 relative">
        {/* SVG connection lines */}
        <svg
          className="absolute -top-6 left-0 right-0 h-8 pointer-events-none"
          viewBox="0 0 500 30"
          fill="none"
          preserveAspectRatio="none"
        >
          {[100, 250, 400].map((x, i) => (
            <motion.line
              key={i}
              x1="250"
              y1="0"
              x2={x}
              y2="30"
              stroke="rgba(34,197,94,0.4)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 1.2 + i * 0.2,
                ease,
              }}
              style={{
                filter: "drop-shadow(0 0 4px rgba(34,197,94,0.3))",
              }}
            />
          ))}
        </svg>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4, ease }}
          className="w-16 sm:w-20 md:w-24"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <DeviceMockup type="phone">
              <Image
                src="/screenshots/display-raw.webp"
                alt="Timer on phone"
                width={200}
                height={112}
                className="w-full h-auto"
              />
            </DeviceMockup>
          </motion.div>
          <p className="text-[10px] text-text-muted text-center mt-1.5">
            Phone
          </p>
        </motion.div>

        {/* Tablet */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.6, ease }}
          className="w-20 sm:w-28 md:w-36"
        >
          <motion.div
            animate={{ y: [0, -3, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            <DeviceMockup type="tablet">
              <Image
                src="/screenshots/display-raw.webp"
                alt="Timer on tablet"
                width={300}
                height={168}
                className="w-full h-auto"
              />
            </DeviceMockup>
          </motion.div>
          <p className="text-[10px] text-text-muted text-center mt-1.5">
            Tablet
          </p>
        </motion.div>

        {/* Projector */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.8, ease }}
          className="w-24 sm:w-32 md:w-40"
        >
          <DeviceMockup type="projector">
            <Image
              src="/screenshots/display-raw.webp"
              alt="Timer on projector"
              width={400}
              height={224}
              className="w-full h-auto"
            />
          </DeviceMockup>
        </motion.div>
      </div>
    </div>
  );
}
