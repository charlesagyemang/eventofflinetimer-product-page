interface DeviceMockupProps {
  type: "phone" | "tablet" | "laptop" | "projector";
  children: React.ReactNode;
  className?: string;
}

export default function DeviceMockup({
  type,
  children,
  className = "",
}: DeviceMockupProps) {
  if (type === "phone") {
    return (
      <div className={`relative ${className}`}>
        <div className="rounded-[20px] border-2 border-white/10 bg-black/40 p-1.5 shadow-lg">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-b-lg z-10" />
          <div className="rounded-[16px] overflow-hidden bg-[#07090f]">
            {children}
          </div>
        </div>
      </div>
    );
  }

  if (type === "tablet") {
    return (
      <div className={`relative ${className}`}>
        <div className="rounded-[16px] border-2 border-white/10 bg-black/40 p-2 shadow-lg">
          <div className="rounded-[12px] overflow-hidden bg-[#07090f]">
            {children}
          </div>
        </div>
      </div>
    );
  }

  if (type === "laptop") {
    return (
      <div className={`relative ${className}`}>
        {/* Screen */}
        <div className="rounded-t-xl border-2 border-b-0 border-white/10 bg-black/40 p-1.5">
          <div className="rounded-t-lg overflow-hidden bg-[#07090f]">
            {children}
          </div>
        </div>
        {/* Base/hinge */}
        <div className="h-3 bg-white/[0.07] rounded-b-lg border-2 border-t-0 border-white/10 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/10 rounded-b" />
        </div>
      </div>
    );
  }

  // Projector
  return (
    <div className={`relative ${className}`}>
      <div className="rounded-lg border-2 border-white/10 bg-black/40 p-1">
        <div className="rounded overflow-hidden bg-[#07090f]">{children}</div>
      </div>
      {/* "Screen" label */}
      <div className="text-[10px] text-white/20 uppercase tracking-widest text-center mt-1">
        Display
      </div>
    </div>
  );
}
