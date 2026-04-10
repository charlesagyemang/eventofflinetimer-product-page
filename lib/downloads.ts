export type Platform = "mac-arm64" | "mac-x64" | "windows" | "linux";

export interface DownloadOption {
  platform: Platform;
  label: string;
  arch: string;
  format: string;
  url: string | undefined;
  icon: string;
}

export const downloads: DownloadOption[] = [
  {
    platform: "mac-arm64",
    label: "macOS",
    arch: "Apple Silicon",
    format: ".dmg",
    url: process.env.NEXT_PUBLIC_DOWNLOAD_MAC_DMG,
    icon: "Apple",
  },
  {
    platform: "mac-x64",
    label: "macOS",
    arch: "Intel",
    format: ".dmg",
    url: process.env.NEXT_PUBLIC_DOWNLOAD_MAC_INTEL_DMG,
    icon: "Apple",
  },
  {
    platform: "windows",
    label: "Windows",
    arch: "64-bit",
    format: ".exe",
    url: process.env.NEXT_PUBLIC_DOWNLOAD_WINDOWS_EXE,
    icon: "Monitor",
  },
  {
    platform: "linux",
    label: "Linux",
    arch: "x64",
    format: ".AppImage",
    url: process.env.NEXT_PUBLIC_DOWNLOAD_LINUX_APPIMAGE,
    icon: "Terminal",
  },
];

export const availableDownloads = downloads.filter((d) => d.url);

export const appVersion = process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0";
export const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL || "";
