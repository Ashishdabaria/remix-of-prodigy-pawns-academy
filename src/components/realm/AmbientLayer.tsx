/**
 * Decorative floating sparkles + drifting petals layer for the play view.
 * Pure CSS animation, pointer-events-none, no JS overhead.
 */
const SPARKLE_COUNT = 18;
const DRIFTER_COUNT = 6;

export function AmbientLayer() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {Array.from({ length: SPARKLE_COUNT }).map((_, i) => (
        <span
          key={`s-${i}`}
          className="absolute animate-sparkle text-shard-sun"
          style={{
            left: `${(i * 53) % 100}%`,
            top: `${(i * 37) % 100}%`,
            fontSize: 8 + (i % 4) * 4,
            animationDelay: `${(i % 6) * 0.4}s`,
            opacity: 0.45,
          }}
        >
          ✦
        </span>
      ))}
      {Array.from({ length: DRIFTER_COUNT }).map((_, i) => (
        <span
          key={`d-${i}`}
          className="absolute animate-drift"
          style={{
            top: `${10 + i * 14}%`,
            fontSize: 14 + (i % 3) * 6,
            animationDelay: `${i * 2.4}s`,
            animationDuration: `${12 + (i % 4) * 3}s`,
            color: ["var(--color-shard-amethyst)", "var(--color-shard-sun)", "var(--color-shard-emerald)"][i % 3],
            opacity: 0.55,
          }}
        >
          {i % 2 ? "❦" : "✿"}
        </span>
      ))}
    </div>
  );
}
