import { useMemo } from "react";

// Gentle falling snow. Hidden for visitors who prefer reduced motion.
export function Snowfall({ count = 28 }: { count?: number }) {
  const flakes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        // Deterministic spread so it looks random but is stable between renders
        const seed = (i * 9301 + 49297) % 233280;
        const r = (n: number) => ((seed * (n + 3)) % 1000) / 1000;
        return {
          left: `${Math.round(r(1) * 100)}%`,
          size: 4 + Math.round(r(2) * 8),
          duration: 9 + Math.round(r(3) * 10),
          delay: -Math.round(r(4) * 18),
          drift: `${Math.round((r(5) - 0.5) * 80)}px`,
          opacity: 0.45 + r(6) * 0.45,
        };
      }),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {flakes.map((f, i) => (
        <span
          key={i}
          className="snowflake"
          style={{
            left: f.left,
            width: f.size,
            height: f.size,
            opacity: f.opacity,
            animationDuration: `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            ["--drift" as string]: f.drift,
          }}
        />
      ))}
    </div>
  );
}
