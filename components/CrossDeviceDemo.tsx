"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, Pause, RotateCcw, FastForward } from "lucide-react";
import Image from "next/image";
import DeviceMockup from "@/components/ui/DeviceMockup";
import ScreenshotFrame from "@/components/ui/ScreenshotFrame";
import SectionHeading from "@/components/ui/SectionHeading";

type TimerStatus = "idle" | "running" | "paused" | "expired";

function getPhase(percentRemaining: number) {
  if (percentRemaining > 50) return "green" as const;
  if (percentRemaining > 25) return "warning" as const;
  if (percentRemaining > 10) return "danger" as const;
  return "critical" as const;
}

const phaseBarGradient = {
  green: "linear-gradient(90deg, #059669, #10b981)",
  warning: "linear-gradient(90deg, #d97706, #f59e0b)",
  danger: "linear-gradient(90deg, #ea580c, #f97316)",
  critical: "linear-gradient(90deg, #b91c1c, #ef4444)",
};

const phaseDigitColor = {
  green: "#f0f0f0",
  warning: "#fef3c7",
  danger: "#fed7aa",
  critical: "#fca5a5",
};

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

const DURATIONS = [60, 180, 300];

export default function CrossDeviceDemo() {
  const [title, setTitle] = useState("Opening Keynote");
  const [speaker, setSpeaker] = useState("Dr. Sarah Chen");
  const [totalSeconds, setTotalSeconds] = useState(180);
  const [remaining, setRemaining] = useState(180);
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setHydrated(true);
  }, []);

  // Intersection observer for auto-start
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Auto-start when in view
  useEffect(() => {
    if (isInView && status === "idle" && !hasInteracted) {
      setStatus("running");
      setShowPrompt(true);
      const timer = setTimeout(() => setShowPrompt(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isInView, status, hasInteracted]);

  // Timer interval
  useEffect(() => {
    if (status === "running") {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            setStatus("expired");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [status]);

  const handleStart = useCallback(() => {
    setHasInteracted(true);
    if (status === "expired") {
      setRemaining(totalSeconds);
    }
    setStatus("running");
  }, [status, totalSeconds]);

  const handlePause = useCallback(() => {
    setHasInteracted(true);
    setStatus("paused");
  }, []);

  const handleReset = useCallback(() => {
    setHasInteracted(true);
    setStatus("idle");
    setRemaining(totalSeconds);
  }, [totalSeconds]);

  const handleSkipTo10 = useCallback(() => {
    setHasInteracted(true);
    setRemaining(10);
    if (status !== "running") {
      setStatus("running");
    }
  }, [status]);

  const handleDuration = useCallback((secs: number) => {
    setHasInteracted(true);
    setTotalSeconds(secs);
    setRemaining(secs);
    setStatus("idle");
  }, []);

  const percent = totalSeconds > 0 ? (remaining / totalSeconds) * 100 : 0;
  const phase = status === "expired" ? "critical" : getPhase(percent);

  // SSG fallback
  if (!hydrated) {
    return (
      <section ref={sectionRef} className="relative py-20 md:py-28">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
          <SectionHeading
            title="Control from here. See it everywhere."
            subtitle="This is a real timer. Start it from the admin panel on the left. Watch it update on the display on the right — the same way it works on every screen at your event."
          />
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <ScreenshotFrame
              src="/screenshots/admin-preview.webp"
              alt="Admin control panel"
              width={1400}
              height={918}
              url="localhost:4000"
            />
            <ScreenshotFrame
              src="/screenshots/display-with-notes.webp"
              alt="Display screen"
              width={1400}
              height={784}
              url="localhost:4000/display"
            />
          </div>
          <p className="text-center text-text-secondary italic mt-8">
            Control from one screen. See it on every other.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="relative py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
        <SectionHeading
          title="Control from here. See it everywhere."
          subtitle="This is a real timer. Start it from the admin panel on the left. Watch it update on the display on the right — the same way it works on every screen at your event."
        />

        <div className="grid lg:grid-cols-[45%_55%] gap-6 lg:gap-8 items-start">
          {/* Admin mini-panel */}
          <div>
            <DeviceMockup type="laptop">
              <div className="p-4 md:p-6 space-y-4 min-h-[320px]">
                {/* Title input */}
                <div>
                  <label className="text-[11px] font-medium uppercase tracking-widest text-text-muted block mb-1.5">
                    Event Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      setHasInteracted(true);
                    }}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-400/50"
                    placeholder="Event name"
                  />
                </div>

                {/* Speaker input */}
                <div>
                  <label className="text-[11px] font-medium uppercase tracking-widest text-text-muted block mb-1.5">
                    Speaker
                  </label>
                  <input
                    type="text"
                    value={speaker}
                    onChange={(e) => {
                      setSpeaker(e.target.value);
                      setHasInteracted(true);
                    }}
                    className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/20 focus:outline-none focus:border-brand-400/50"
                    placeholder="Speaker name"
                  />
                </div>

                {/* Duration presets */}
                <div>
                  <label className="text-[11px] font-medium uppercase tracking-widest text-text-muted block mb-1.5">
                    Duration
                  </label>
                  <div className="flex gap-2">
                    {DURATIONS.map((d) => (
                      <button
                        key={d}
                        onClick={() => handleDuration(d)}
                        className={`flex-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                          totalSeconds === d
                            ? "bg-brand-500/30 border border-brand-400/50 text-brand-300"
                            : "bg-white/[0.05] border border-white/10 text-white/50 hover:text-white/80"
                        }`}
                      >
                        {d / 60}:00
                      </button>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex gap-2 pt-1">
                  {status === "running" ? (
                    <button
                      onClick={handlePause}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-300 text-sm font-medium hover:bg-amber-500/30 transition-colors"
                    >
                      <Pause size={14} />
                      Pause
                    </button>
                  ) : (
                    <button
                      onClick={handleStart}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-cta-green/20 border border-cta-green/30 text-green-300 text-sm font-medium hover:bg-cta-green/30 transition-colors"
                    >
                      <Play size={14} fill="currentColor" />
                      Start
                    </button>
                  )}
                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white/50 text-sm font-medium hover:text-white/80 hover:border-white/20 transition-colors"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                {/* Skip to 10s */}
                <button
                  onClick={handleSkipTo10}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/40 text-xs hover:text-white/60 hover:border-white/10 transition-colors"
                >
                  <FastForward size={12} />
                  Skip to last 10s
                </button>
              </div>
            </DeviceMockup>
            <p className="text-sm text-text-muted text-center mt-3">
              Your control panel.
            </p>
          </div>

          {/* Display side */}
          <div>
            {/* Projector display */}
            <DeviceMockup type="projector">
              <div
                className="relative flex flex-col items-center justify-center py-10 md:py-14 px-6 min-h-[280px] transition-colors duration-500"
                style={{
                  background:
                    status === "expired"
                      ? "rgba(185, 28, 28, 0.15)"
                      : "transparent",
                }}
              >
                {status === "expired" ? (
                  /* TIME'S UP overlay */
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center"
                  >
                    <div className="text-[clamp(36px,8vw,72px)] font-bold font-mono tabular-nums text-red-400 tracking-tight"
                      style={{
                        textShadow:
                          "0 0 40px rgba(239,68,68,0.6), 0 0 80px rgba(239,68,68,0.3)",
                      }}
                    >
                      TIME&apos;S UP
                    </div>
                    <div className="text-3xl font-mono tabular-nums text-red-400/60 mt-2">
                      00:00
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {/* Timer digits */}
                    <div
                      className={`text-[clamp(48px,10vw,100px)] font-mono font-bold tabular-nums leading-none ${
                        phase === "critical" ? "animate-pulse" : ""
                      }`}
                      style={{
                        color: phaseDigitColor[phase],
                        textShadow:
                          "0 0 40px rgba(255,255,255,0.6), 0 0 80px rgba(255,255,255,0.3)",
                      }}
                    >
                      {formatTime(remaining)}
                    </div>

                    {/* Progress bar */}
                    <div className="w-full max-w-sm mt-6 h-2 rounded-full bg-white/[0.08] overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: phaseBarGradient[phase],
                          width: `${percent}%`,
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>

                    {/* Event info */}
                    <div className="mt-6 text-center">
                      {title && (
                        <div className="text-sm md:text-base text-white/80 font-medium">
                          {title}
                        </div>
                      )}
                      {speaker && (
                        <div className="text-xs md:text-sm text-white/40 mt-0.5">
                          &mdash; {speaker}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </DeviceMockup>
            <p className="text-sm text-text-muted text-center mt-3">
              What your audience sees.
            </p>

            {/* Phone mockup showing same timer */}
            <div className="mt-6 flex justify-center">
              <div className="w-28">
                <DeviceMockup type="phone">
                  <div className="py-5 px-2 flex flex-col items-center">
                    <div
                      className="text-xl font-mono font-bold tabular-nums"
                      style={{ color: phaseDigitColor[phase] }}
                    >
                      {status === "expired" ? "00:00" : formatTime(remaining)}
                    </div>
                    <div className="w-full mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          background: phaseBarGradient[phase],
                          width: `${percent}%`,
                        }}
                      />
                    </div>
                  </div>
                </DeviceMockup>
                <p className="text-[10px] text-text-muted text-center mt-1">
                  Same timer, any device
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* LIVE badge */}
        <div className="flex justify-center mt-10">
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-sm text-green-400 font-medium">LIVE</span>
            <span className="text-sm text-text-secondary">
              &mdash; Both screens share the same state
            </span>
          </div>
        </div>

        {/* Kicker lines */}
        <p className="text-center text-text-secondary italic mt-8 text-base">
          Imagine this on a projector at the back of a 500-person room.
        </p>
        <p className="text-center text-text-muted text-sm mt-2">
          Now imagine controlling it from the sound booth, your phone, or your
          seat.
        </p>

        {/* Prompt for non-interacted users */}
        {showPrompt && !hasInteracted && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center text-brand-300/60 text-sm mt-4"
          >
            Try it &mdash; tap the controls
          </motion.p>
        )}
      </div>
    </section>
  );
}
