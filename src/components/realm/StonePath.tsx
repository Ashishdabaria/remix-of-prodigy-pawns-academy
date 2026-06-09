import { interpolateStones, type PathPoint } from "@/data/path-layouts";

export interface TrackStyle {
  dim: string;
  lit: string;
  glow: string;
  dash: string;
  litWidth: string;
  dimWidth: string;
  halo: string;
}

interface StonePathProps {
  /** Full ordered list of points along the trail: [start, ...nodes, prize]. */
  points: PathPoint[];
  /** How many points (from the start) are "lit" / completed — drives the bright overlay. */
  litCount: number;
  trackStyle: TrackStyle;
  /** When true, the lit portion gently animates its dash offset for a "magical" feel. */
  animateLit?: boolean;
}

/**
 * StonePath renders only the winding stepping-stone trail underneath the quest nodes.
 * No connecting lines — just discrete stones so the path feels like a trail you hop along.
 *
 * Lives in a percent-based SVG so it scales perfectly with its parent container.
 */
export function StonePath({ points, trackStyle }: StonePathProps) {
  const stones = interpolateStones(points, 3);

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
      aria-hidden
    >
      <defs>
        <radialGradient id="stone-grad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="rgba(255,245,220,0.95)" />
          <stop offset="55%" stopColor="rgba(220,200,165,0.9)" />
          <stop offset="100%" stopColor="rgba(120,95,65,0.85)" />
        </radialGradient>
        <filter id="stone-shadow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.35" />
          <feOffset dy="0.45" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.55" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#stone-shadow)">
        {stones.map((s, i) => (
          <ellipse
            key={i}
            cx={s.x}
            cy={s.y}
            rx={2.2}
            ry={1.4}
            fill="url(#stone-grad)"
            stroke={trackStyle.halo}
            strokeWidth={0.25}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}

