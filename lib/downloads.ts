export type Platform = "mac-arm64" | "mac-x64" | "windows" | "linux";

export interface DownloadOption {
  platform: Platform;
  label: string;
  arch: string;
  format: string;
  url: string | undefined;
  icon: string;
}

const R2_BASE = "https://pub-fb653f2363e94b2ba12c307dd9f89ebb.r2.dev/latest";

export const downloads: DownloadOption[] = [
  {
    platform: "mac-arm64",
    label: "macOS",
    arch: "Apple Silicon",
    format: ".dmg",
    url: `${R2_BASE}/Event%20Timer-1.1.0-arm64.dmg`,
    icon: "Apple",
  },
  {
    platform: "mac-x64",
    label: "macOS",
    arch: "Intel",
    format: ".dmg",
    url: `${R2_BASE}/Event%20Timer-1.1.0.dmg`,
    icon: "Apple",
  },
  {
    platform: "windows",
    label: "Windows",
    arch: "64-bit",
    format: ".exe",
    url: `${R2_BASE}/Event%20Timer%20Setup%201.1.0.exe`,
    icon: "Monitor",
  },
  {
    platform: "linux",
    label: "Linux",
    arch: "x64",
    format: ".AppImage",
    url: `${R2_BASE}/Event%20Timer-1.1.0.AppImage`,
    icon: "Terminal",
  },
];

export const availableDownloads = downloads.filter((d) => d.url);

export const appVersion = "1.1.0";
