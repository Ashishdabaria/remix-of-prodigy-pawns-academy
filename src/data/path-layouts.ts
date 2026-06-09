// Per-realm hand-tuned PATH_COORDINATES for the Quest Path view.
// Each layout has exactly 12 node points (level 1 -> level 12),
// plus a Start marker and a Prize/Boss-Den marker.
//
// The story arc reads bottom-left to top-right: the hero begins on
// safe low ground, climbs terraced switchbacks, and finishes at the
// elevated boss den. Coordinates are percentages of the path container
// (x: 0-100, y: 0-100), so layouts scale to mobile without breaking.

export type PathPoint = { x: number; y: number };

export interface RealmPathLayout {
  nodes: PathPoint[]; // length 12
  start: PathPoint;
  prize: PathPoint;
}

/**
 * Build a smooth ascending serpentine of 12 points that reads as a
 * story journey: start bottom-left, switch back and forth while rising,
 * climax near the top. `amp` controls horizontal sweep, `bias` shifts
 * the whole path left/right, `topY` controls how high the final node sits.
 */
function serpentine(opts: {
  amp?: number;
  bias?: number;
  topY?: number;
  bottomY?: number;
  swirls?: number;
}): PathPoint[] {
  const amp = opts.amp ?? 32;
  const bias = opts.bias ?? 50;
  const topY = opts.topY ?? 18;
  const bottomY = opts.bottomY ?? 88;
  const swirls = opts.swirls ?? 2.25;
  const N = 12;

  // 1) Densely sample the parametric curve.
  const SAMPLES = 600;
  const curve: PathPoint[] = [];
  for (let i = 0; i <= SAMPLES; i++) {
    const t = i / SAMPLES;
    const y = bottomY + (topY - bottomY) * t;
    const x = bias + Math.sin(t * Math.PI * swirls) * amp * (1 - t * 0.15);
    curve.push({ x: Math.max(8, Math.min(92, x)), y });
  }

  // 2) Compute cumulative arc length.
  const cum: number[] = [0];
  for (let i = 1; i < curve.length; i++) {
    const dx = curve[i].x - curve[i - 1].x;
    const dy = curve[i].y - curve[i - 1].y;
    cum.push(cum[i - 1] + Math.hypot(dx, dy));
  }
  const total = cum[cum.length - 1];

  // 3) Pick N points at equal arc-length intervals so visual spacing is uniform.
  const out: PathPoint[] = [];
  for (let k = 0; k < N; k++) {
    const target = (total * k) / (N - 1);
    let lo = 0;
    let hi = cum.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cum[mid] < target) lo = mid + 1;
      else hi = mid;
    }
    out.push(curve[lo]);
  }
  return out;
}

export const DEFAULT_PATH_LAYOUT: RealmPathLayout = {
  start: { x: 14, y: 94 },
  nodes: serpentine({ amp: 30, bias: 50, topY: 20, bottomY: 86, swirls: 2.25 }),
  prize: { x: 50, y: 8 },
};

// Each realm gets a subtle variant of the serpentine so the trail
// matches its background's terrain (wider sweeps for plains, tight
// switchbacks for mountains, gentle curves for the meadow village…).
const PAWN_VILLAGE: RealmPathLayout = {
  start: { x: 14, y: 94 },
  nodes: serpentine({ amp: 26, bias: 50, topY: 22, bottomY: 86, swirls: 2 }),
  prize: { x: 50, y: 10 },
};
const CASTLE: RealmPathLayout = {
  start: { x: 16, y: 94 },
  nodes: serpentine({ amp: 30, bias: 50, topY: 20, bottomY: 86, swirls: 2.5 }),
  prize: { x: 50, y: 8 },
};
const PLAINS: RealmPathLayout = {
  start: { x: 10, y: 92 },
  nodes: serpentine({ amp: 36, bias: 52, topY: 22, bottomY: 84, swirls: 1.75 }),
  prize: { x: 78, y: 10 },
};
const FOREST: RealmPathLayout = {
  start: { x: 14, y: 94 },
  nodes: serpentine({ amp: 28, bias: 48, topY: 20, bottomY: 86, swirls: 2.75 }),
  prize: { x: 50, y: 8 },
};
const MOUNTAINS: RealmPathLayout = {
  start: { x: 14, y: 94 },
  nodes: serpentine({ amp: 34, bias: 50, topY: 18, bottomY: 86, swirls: 3 }),
  prize: { x: 56, y: 6 },
};
const LABYRINTH: RealmPathLayout = {
  start: { x: 16, y: 94 },
  nodes: serpentine({ amp: 32, bias: 50, topY: 20, bottomY: 86, swirls: 3.25 }),
  prize: { x: 50, y: 8 },
};
const DESERT: RealmPathLayout = {
  start: { x: 10, y: 92 },
  nodes: serpentine({ amp: 38, bias: 50, topY: 22, bottomY: 84, swirls: 1.85 }),
  prize: { x: 60, y: 10 },
};
const CITADEL: RealmPathLayout = {
  start: { x: 16, y: 94 },
  nodes: serpentine({ amp: 30, bias: 50, topY: 16, bottomY: 86, swirls: 2.5 }),
  prize: { x: 50, y: 4 },
};

export const PATH_LAYOUTS: Record<string, RealmPathLayout> = {
  "pawn-village": PAWN_VILLAGE,
  "castle-of-kings": CASTLE,
  "centerland-plains": PLAINS,
  "detective-forest": FOREST,
  "tactical-mountains": MOUNTAINS,
  "crystal-labyrinth": LABYRINTH,
  "endgame-desert": DESERT,
  "citadel-of-checkmate": CITADEL,
};

export function getPathLayout(realmId: string): RealmPathLayout {
  return PATH_LAYOUTS[realmId] ?? DEFAULT_PATH_LAYOUT;
}

// Per-track enemy creatures the hero must "defeat" at the current node.
// Mapped by TrackVariant so it matches the realm's theme automatically.
export const TRACK_ENEMIES: Record<string, { emoji: string; name: string }> = {
  meadow:    { emoji: "🐗", name: "Boar Cub" },
  farmlands: { emoji: "🐷", name: "Piggy Bandit" },
  caverns:   { emoji: "👻", name: "Whisper" },
  forge:     { emoji: "👹", name: "Forge Imp" },
  sky:       { emoji: "🦅", name: "Sky Raider" },
  grove:     { emoji: "🦊", name: "Sly Fox" },
  factory:   { emoji: "🤖", name: "Cog-Bot" },
  peaks:     { emoji: "🐻", name: "Crag Bear" },
  castle:    { emoji: "⚔️", name: "Knight Errant" },
  labyrinth: { emoji: "🦂", name: "Maze Stinger" },
  shadows:   { emoji: "🦇", name: "Shade Bat" },
  dunes:     { emoji: "🐍", name: "Dune Viper" },
  atrium:    { emoji: "🦉", name: "Stone Owl" },
  citadel:   { emoji: "🐉", name: "Dragonling" },
  arena:     { emoji: "🦁", name: "Arena Lion" },
};

// Smooth Catmull-Rom-ish curve through points (returns an SVG path "d").
// Kept for any future overlay; the active path screen does not draw a line.
export function buildSmoothPath(points: PathPoint[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

// Unused now (no stepping stones rendered); retained as a stable export.
export function interpolateStones(points: PathPoint[], perSegment = 3): PathPoint[] {
  const stones: PathPoint[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    for (let s = 1; s <= perSegment; s++) {
      const t = s / (perSegment + 1);
      stones.push({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });
    }
  }
  return stones;
}
