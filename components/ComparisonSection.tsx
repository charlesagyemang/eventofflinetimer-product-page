"use client";

import { motion } from "framer-motion";
import { Check, X, AlertTriangle } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";

const ease = [0.16, 1, 0.3, 1];

interface ComparisonItem {
  text: string;
  status: "check" | "cross" | "warning";
}

interface ComparisonCard {
  title: string;
  items: ComparisonItem[];
  price: string;
  elevated?: boolean;
  badge?: string;
}

const cards: ComparisonCard[] = [
  {
    title: "Phone Timer",
    items: [
      { text: "Can't share to projector", status: "cross" },
      { text: "Tiny screen", status: "cross" },
      { text: "No event details", status: "cross" },
      { text: "No multi-screen sync", status: "cross" },
      { text: "No color phases", status: "cross" },
    ],
    price: "Free",
  },
  {
    title: "This App",
    elevated: true,
    badge: "RECOMMENDED",
    items: [
      { text: "Works offline", status: "check" },
      { text: "Any screen on LAN", status: "check" },
      { text: "< 10ms latency", status: "check" },
      { text: "Reads at 20m", status: "check" },
      { text: "Event title + speaker name", status: "check" },
      { text: "Multi-screen sync", status: "check" },
      { text: "Phase colors", status: "check" },
      { text: "Audio chime", status: "check" },
      { text: "QR code sharing", status: "check" },
      { text: "Free forever", status: "check" },
      { text: "No account needed", status: "check" },
    ],
    price: "Free",
  },
  {
    title: "Web Timers",
    items: [
      { text: "Needs internet", status: "cross" },
      { text: "100-500ms latency", status: "cross" },
      { text: "Account required", status: "cross" },
      { text: "May cost $", status: "warning" },
      { text: "Unreliable at events", status: "warning" },
    ],
    price: "Free \u2013 $$$",
  },
];

function StatusIcon({ status }: { status: ComparisonItem["status"] }) {
  switch (status) {
    case "check":
      return <Check size={14} className="text-green-400 shrink-0" />;
    case "cross":
      return <X size={14} className="text-white/25 shrink-0" />;
    case "warning":
      return <AlertTriangle size={14} className="text-amber-400 shrink-0" />;
  }
}

export default function ComparisonSection() {
  return (
    <section className="relative py-12 sm:py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16">
        <SectionHeading
          title="Why not just use a phone timer?"
          subtitle="Because a phone timer can't do any of this."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 items-start">
          {cards.map((card, i) => (
            <GlowCard
              key={i}
              elevated={card.elevated}
              delay={i * 0.1}
              className={card.elevated ? "md:-translate-y-3" : ""}
            >
              {/* Badge */}
              {card.badge && (
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-cta-green/20 text-green-300 text-xs font-semibold uppercase tracking-wider rounded-full">
                    {card.badge}
                  </span>
                </div>
              )}

              <h3 className="text-lg font-semibold text-text-primary mb-4">
                {card.title}
              </h3>

              <ul className="space-y-2.5 mb-6">
                {card.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <StatusIcon status={item.status} />
                    <span
                      className={`text-sm leading-snug ${
                        item.status === "check"
                          ? "text-text-secondary"
                          : item.status === "warning"
                            ? "text-text-secondary"
                            : "text-text-muted"
                      }`}
                    >
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-sm text-text-muted">{card.price}</span>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
}
