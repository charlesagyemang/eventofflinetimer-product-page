"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Monitor, Terminal, Play, ShieldAlert, ChevronDown, Copy, Check } from "lucide-react";
import { detectPlatform } from "@/lib/detectPlatform";
import {
  downloads,
  availableDownloads,
  appVersion,
  githubUrl,
} from "@/lib/downloads";
import type { Platform } from "@/lib/downloads";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import Button from "@/components/ui/Button";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

function PlatformIcon({
  icon,
  className,
}: {
  icon: string;
  className?: string;
}) {
  switch (icon) {
    case "Apple":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className={className}
          aria-hidden="true"
        >
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
      );
    case "Monitor":
      return <Monitor className={className} />;
    case "Terminal":
      return <Terminal className={className} />;
    default:
      return <Download className={className} />;
  }
}

export default function DownloadSection() {
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [macTipOpen, setMacTipOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recommended = platform
    ? downloads.find((d) => d.platform === platform && d.url)
    : null;

  return (
    <section id="download" className="relative py-20 md:py-28 bg-brand-800/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        <SectionHeading
          title="Ready to run your next event like a professional?"
          subtitle="Download free. No account. No trial. No strings."
        />

        {/* Recommended download */}
        {recommended?.url && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease }}
            className="max-w-xl mx-auto mb-12"
          >
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-8 text-center">
              <PlatformIcon
                icon={recommended.icon}
                className="w-10 h-10 text-text-secondary mx-auto mb-4"
              />
              <p className="text-sm text-text-muted mb-4">
                Recommended for your system:
              </p>
              <Button href={recommended.url} variant="cta" size="lg">
                <Play size={16} fill="currentColor" />
                Download for {recommended.label} ({recommended.arch})
              </Button>
              <p className="mt-3 text-xs text-text-muted">
                {recommended.format} · v{appVersion}
              </p>
              {platform === "mac-arm64" && (
                <p className="mt-2 text-xs text-text-muted">
                  Looking for{" "}
                  <a
                    href={
                      downloads.find((d) => d.platform === "mac-x64")?.url ||
                      "#"
                    }
                    className="text-brand-300 hover:underline"
                  >
                    macOS Intel
                  </a>
                  ?
                </p>
              )}
            </div>
          </motion.div>
        )}

        {/* All platforms */}
        <div className="text-center mb-6">
          <span className="text-sm text-text-muted uppercase tracking-widest font-medium">
            All platforms
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {availableDownloads.map((dl, i) => (
            <GlowCard
              key={dl.platform}
              delay={i * 0.1}
              className={
                platform === dl.platform
                  ? "border-brand-400/40"
                  : ""
              }
            >
              <div className="text-center">
                <motion.div
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                  className="inline-block mb-3"
                >
                  <PlatformIcon
                    icon={dl.icon}
                    className="w-8 h-8 text-text-secondary"
                  />
                </motion.div>
                <h3 className="text-base font-semibold text-text-primary">
                  {dl.label}
                </h3>
                <p className="text-sm text-text-muted mb-4">
                  {dl.arch} · {dl.format}
                </p>
                <a
                  href={dl.url}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-cta-green hover:bg-cta-green-hover text-white text-sm font-medium rounded-full transition-colors"
                >
                  <Download size={14} />
                  Download
                </a>
              </div>
            </GlowCard>
          ))}
        </div>

        {/* macOS Gatekeeper note */}
        {(platform === "mac-arm64" || platform === "mac-x64") && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease }}
            className="max-w-2xl mx-auto mt-10"
          >
            <button
              onClick={() => setMacTipOpen(!macTipOpen)}
              className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl bg-amber-500/[0.06] border border-amber-400/15 text-left hover:bg-amber-500/[0.08] transition-colors"
            >
              <ShieldAlert size={18} className="text-amber-400 shrink-0" />
              <span className="text-sm text-amber-200/80 flex-1">
                macOS says the app is damaged?
              </span>
              <ChevronDown
                size={16}
                className={`text-amber-400/60 transition-transform duration-200 ${macTipOpen ? "rotate-180" : ""}`}
              />
            </button>
            <AnimatePresence>
              {macTipOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 py-4 mt-1 rounded-xl bg-white/[0.03] border border-white/[0.06] space-y-3">
                    <p className="text-sm text-text-secondary leading-relaxed">
                      macOS quarantines apps downloaded from the internet. Since this app
                      isn&apos;t signed with an Apple Developer certificate, you&apos;ll need to
                      remove the quarantine flag. Open <strong className="text-text-primary">Terminal</strong> and run:
                    </p>
                    <div className="relative group">
                      <pre className="bg-black/40 rounded-lg px-4 py-3 text-sm font-mono text-amber-200/90 overflow-x-auto">
                        xattr -cr /Applications/Offline\ Event\ Timer.app
                      </pre>
                      <button
                        onClick={() => handleCopy("xattr -cr /Applications/Offline\\ Event\\ Timer.app")}
                        className="absolute top-2 right-2 p-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.12] transition-colors"
                        aria-label="Copy command"
                      >
                        {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} className="text-white/40" />}
                      </button>
                    </div>
                    <p className="text-xs text-text-muted leading-relaxed">
                      Then open the app normally. You only need to do this once.
                      If you installed it somewhere else, replace the path with wherever the app is located.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        <p className="text-center text-sm text-text-muted mt-8">
          v{appVersion} · Free and open source · No account required
        </p>
      </div>
    </section>
  );
}
