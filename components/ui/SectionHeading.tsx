"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`text-center mb-10 sm:mb-16 px-1 ${className}`}
    >
      <h2
        className="text-[clamp(24px,5vw,48px)] font-bold tracking-[-0.02em] leading-[1.15] text-text-primary"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 sm:mt-4 text-[clamp(14px,2.5vw,20px)] font-normal leading-relaxed text-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
