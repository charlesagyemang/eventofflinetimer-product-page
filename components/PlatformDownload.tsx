"use client";

import { useEffect, useState } from "react";
import { Play } from "lucide-react";
import { detectPlatform } from "@/lib/detectPlatform";
import { downloads, appVersion, githubUrl } from "@/lib/downloads";
import type { Platform } from "@/lib/downloads";
import Button from "@/components/ui/Button";

interface PlatformDownloadProps {
  className?: string;
}

export default function PlatformDownload({
  className = "",
}: PlatformDownloadProps) {
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const recommended = platform
    ? downloads.find((d) => d.platform === platform && d.url)
    : null;

  const label = recommended
    ? `Download for ${recommended.label} (${recommended.arch})`
    : "Download";

  return (
    <div className={className}>
      <div id="hero-cta" className="flex flex-col sm:flex-row gap-3">
        {recommended?.url ? (
          <Button href={recommended.url} variant="cta" size="lg">
            <Play size={16} fill="currentColor" className="shrink-0" />
            <span className="truncate">{label}</span>
          </Button>
        ) : (
          <Button href="#download" variant="cta" size="lg">
            <Play size={16} fill="currentColor" className="shrink-0" />
            Download
          </Button>
        )}
        {githubUrl && (
          <Button href={githubUrl} variant="ghost" size="lg">
            View on GitHub
          </Button>
        )}
      </div>
      <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-text-muted">
        Also available for Windows and Linux · v{appVersion} · Free and open
        source
      </p>
    </div>
  );
}
