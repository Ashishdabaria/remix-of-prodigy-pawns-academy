import { buildSmoothPath, interpolateStones, type PathPoint } from "@/data/path-layouts";

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
 * StonePath renders the winding stepping-stone trail underneath the quest nodes.
 *
 * Layer order (bottom → top):
 *   1. Sandstone ellipses (the physical "stones") interpolated between every pair of points.
 *   2. Dark halo stroke for legibility on any background.
 *   3. Themed dim dashed trail.
 *   4. Bright lit dashed trail covering completed segments.
 *
 * Lives in a percent-based SVG so it scales perfectly with its parent container —
 * works from 375px phones up to large desktops without re-layout.
 */
export function StonePath({ points, litCount, trackStyle, animateLit = false }: StonePathProps) {
  const pathD = buildSmoothPath(points);
  const litD = litCount >= 2 ? buildSmoothPath(points.slice(0, litCount)) : "";
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

      {/* 1) Stones */}
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

      {/* 2) Dark halo for contrast */}
      <path
        d={pathD}
        fill="none"
        stroke={trackStyle.halo}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={{ strokeWidth: "10px", opacity: 0.55 } as React.CSSProperties}
      />

      {/* 3) Themed dim dashed trail */}
      <path
        d={pathD}
        fill="none"
        stroke={trackStyle.dim}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.9}
        vectorEffect="non-scaling-stroke"
        style={{ strokeWidth: "5px", filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.28))" } as React.CSSProperties}
      />
      <path
        d={pathD}
        fill="none"
        stroke="rgba(255,255,245,0.95)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={trackStyle.dash}
        vectorEffect="non-scaling-stroke"
        style={{ strokeWidth: trackStyle.dimWidth } as React.CSSProperties}
      />

      {/* 4) Bright themed lit portion */}
      {litD && (
        <path
          d={litD}
          fill="none"
          stroke={trackStyle.lit}
          strokeLinecap="round"
          strokeDasharray={trackStyle.dash}
          vectorEffect="non-scaling-stroke"
          style={{
            strokeWidth: trackStyle.litWidth,
            filter: `drop-shadow(0 0 6px ${trackStyle.glow})`,
          } as React.CSSProperties}
        >
          {animateLit ? (
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-8"
              dur="1.6s"
              repeatCount="indefinite"
            />
          ) : null}
        </path>
      )}
    </svg>
  );
}
