import type { Platform } from "./downloads";

export function detectPlatform(): Platform | null {
  if (typeof navigator === "undefined") return null;
  const ua = navigator.userAgent.toLowerCase();
  const p = (navigator.platform ?? "").toLowerCase();
  if (ua.includes("mac") || p.includes("mac")) return "mac-arm64";
  if (ua.includes("win") || p.includes("win")) return "windows";
  if (ua.includes("linux") || p.includes("linux")) return "linux";
  return null;
}
