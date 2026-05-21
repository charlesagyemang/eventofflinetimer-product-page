import Image from "next/image";

export default function Footer() {
  return (
    <footer className="relative bg-[#050810] border-t border-white/[0.04]">
      {/* Gradient divider */}
      <div className="absolute -top-px left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(56,189,248,0.2), transparent)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-12 sm:py-16">
        <div className="flex flex-col items-center text-center gap-5">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt="Offline Event Timer"
              width={24}
              height={24}
              className="rounded"
            />
            <span className="font-semibold text-sm text-white/80">
              Offline Event Timer
            </span>
          </div>

          <p className="text-sm text-text-muted">Built by Possitech</p>

          <p className="text-sm text-text-secondary italic max-w-md">
            &ldquo;Offline-first is not a feature. It is the founding
            principle.&rdquo;
          </p>

          <p className="text-xs text-text-muted/60 mt-2">
            &copy; {new Date().getFullYear()} Possitech. Free and open source.
          </p>
        </div>
      </div>
    </footer>
  );
}
