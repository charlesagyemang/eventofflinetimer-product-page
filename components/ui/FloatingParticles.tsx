const PARTICLES_DESKTOP = 35;
const PARTICLES_MOBILE = 18;

function generateParticles(count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    const isTinted = Math.random() > 0.7;
    particles.push({
      id: i,
      x: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 2}px`,
      opacity: 0.06 + Math.random() * 0.06,
      duration: `${20 + Math.random() * 20}s`,
      delay: `${-Math.random() * 40}s`,
      drift: `${-20 + Math.random() * 40}px`,
      color: isTinted
        ? "rgba(125, 211, 252, 0.6)"
        : "rgba(226, 232, 240, 0.5)",
    });
  }
  return particles;
}

const desktopParticles = generateParticles(PARTICLES_DESKTOP);
const mobileParticles = generateParticles(PARTICLES_MOBILE);

export default function FloatingParticles() {
  return (
    <>
      {/* Desktop particles */}
      <div className="hidden md:block fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {desktopParticles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              ["--particle-x" as string]: p.x,
              ["--particle-size" as string]: p.size,
              ["--particle-opacity" as string]: p.opacity,
              ["--particle-duration" as string]: p.duration,
              ["--particle-delay" as string]: p.delay,
              ["--particle-drift" as string]: p.drift,
              ["--particle-color" as string]: p.color,
            }}
          />
        ))}
      </div>
      {/* Mobile particles (fewer) */}
      <div className="md:hidden fixed inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {mobileParticles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              ["--particle-x" as string]: p.x,
              ["--particle-size" as string]: p.size,
              ["--particle-opacity" as string]: p.opacity,
              ["--particle-duration" as string]: p.duration,
              ["--particle-delay" as string]: p.delay,
              ["--particle-drift" as string]: p.drift,
              ["--particle-color" as string]: p.color,
            }}
          />
        ))}
      </div>
    </>
  );
}
