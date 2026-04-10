import Image from "next/image";

interface ScreenshotFrameProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  url?: string;
  priority?: boolean;
  className?: string;
  compact?: boolean;
}

export default function ScreenshotFrame({
  src,
  alt,
  width,
  height,
  url,
  priority = false,
  className = "",
  compact = false,
}: ScreenshotFrameProps) {
  return (
    <div
      className={`rounded-xl border border-white/[0.08] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* Title bar */}
      <div
        className={`flex items-center gap-2 ${compact ? "px-3 py-2" : "px-4 py-3"} bg-white/[0.05]`}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/60" />
        </div>
        {url && (
          <div className="ml-4 flex-1 flex justify-center">
            <span className="text-xs text-white/25 font-mono">{url}</span>
          </div>
        )}
      </div>
      {/* Screenshot */}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="w-full h-auto block"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
      />
    </div>
  );
}
