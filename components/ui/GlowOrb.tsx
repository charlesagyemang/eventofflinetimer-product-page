interface GlowOrbProps {
  color: string;
  size?: number;
  className?: string;
}

export default function GlowOrb({
  color,
  size = 200,
  className = "",
}: GlowOrbProps) {
  return (
    <div
      className={`absolute rounded-full pointer-events-none blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
      }}
    />
  );
}
