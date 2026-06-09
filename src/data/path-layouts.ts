// Per-realm hand-tuned PATH_COORDINATES for the Quest Path view.
// Each layout has exactly 12 node points (level 1 -> level 12),
// plus a Start marker and a Prize marker.
// Coordinates are in percentages of the path container (x: 0-100, y: 0-100).

export type PathPoint = { x: number; y: number };

export interface RealmPathLayout {
  nodes: PathPoint[]; // length 12
  start: PathPoint;
  prize: PathPoint;
}

// Default: original serpentine (kept as fallback for any unknown realm id).
export const DEFAULT_PATH_LAYOUT: RealmPathLayout = {
  start: { x: 12, y: 98 },
  nodes: [
    { x: 12, y: 92 },
    { x: 36, y: 88 },
    { x: 62, y: 84 },
    { x: 86, y: 76 },
    { x: 88, y: 64 },
    { x: 66, y: 60 },
    { x: 40, y: 56 },
    { x: 14, y: 50 },
    { x: 16, y: 38 },
    { x: 40, y: 34 },
    { x: 66, y: 28 },
    { x: 50, y: 14 },
  ],
  prize: { x: 86, y: 10 },
};

// Realm 1 — Pawn Village (meadow): gentle stone S-curve through the grass.
const PAWN_VILLAGE: RealmPathLayout = {
  start: { x: 10, y: 96 },
  nodes: [
    { x: 14, y: 90 },
    { x: 34, y: 86 },
    { x: 56, y: 82 },
    { x: 78, y: 74 },
    { x: 84, y: 60 },
    { x: 64, y: 56 },
    { x: 42, y: 54 },
    { x: 20, y: 48 },
    { x: 22, y: 36 },
    { x: 44, y: 30 },
    { x: 66, y: 24 },
    { x: 50, y: 12 },
  ],
  prize: { x: 84, y: 10 },
};

// Realm 2 — Castle of Kings: zig-zag up the keep, tight turns near the top.
const CASTLE: RealmPathLayout = {
  start: { x: 12, y: 96 },
  nodes: [
    { x: 18, y: 88 },
    { x: 50, y: 86 },
    { x: 82, y: 80 },
    { x: 78, y: 68 },
    { x: 46, y: 64 },
    { x: 18, y: 58 },
    { x: 22, y: 46 },
    { x: 50, y: 42 },
    { x: 78, y: 36 },
    { x: 70, y: 24 },
    { x: 40, y: 20 },
    { x: 50, y: 10 },
  ],
  prize: { x: 78, y: 8 },
};

// Realm 3 — Centerland Plains: wide flowing sweep across the open field.
const PLAINS: RealmPathLayout = {
  start: { x: 8, y: 92 },
  nodes: [
    { x: 14, y: 84 },
    { x: 30, y: 78 },
    { x: 50, y: 80 },
    { x: 70, y: 76 },
    { x: 86, y: 66 },
    { x: 78, y: 54 },
    { x: 58, y: 50 },
    { x: 36, y: 48 },
    { x: 16, y: 42 },
    { x: 28, y: 28 },
    { x: 52, y: 22 },
    { x: 76, y: 14 },
  ],
  prize: { x: 88, y: 8 },
};

// Realm 4 — Detective Forest: winding clue-trail, kinks between trees.
const FOREST: RealmPathLayout = {
  start: { x: 14, y: 96 },
  nodes: [
    { x: 22, y: 90 },
    { x: 42, y: 86 },
    { x: 30, y: 76 },
    { x: 58, y: 72 },
    { x: 80, y: 66 },
    { x: 66, y: 56 },
    { x: 40, y: 52 },
    { x: 18, y: 46 },
    { x: 32, y: 36 },
    { x: 56, y: 32 },
    { x: 78, y: 24 },
    { x: 52, y: 14 },
  ],
  prize: { x: 22, y: 10 },
};

// Realm 5 — Tactical Mountains: steep zig-zag switchback climb.
const MOUNTAINS: RealmPathLayout = {
  start: { x: 10, y: 96 },
  nodes: [
    { x: 18, y: 90 },
    { x: 80, y: 86 },
    { x: 20, y: 78 },
    { x: 78, y: 72 },
    { x: 22, y: 64 },
    { x: 76, y: 58 },
    { x: 26, y: 50 },
    { x: 74, y: 44 },
    { x: 30, y: 36 },
    { x: 70, y: 28 },
    { x: 38, y: 20 },
    { x: 56, y: 10 },
  ],
  prize: { x: 80, y: 6 },
};

// Realm 6 — Crystal Labyrinth: tight switchbacks like a maze of mirrors.
const LABYRINTH: RealmPathLayout = {
  start: { x: 14, y: 94 },
  nodes: [
    { x: 20, y: 88 },
    { x: 48, y: 88 },
    { x: 76, y: 84 },
    { x: 76, y: 72 },
    { x: 48, y: 72 },
    { x: 20, y: 68 },
    { x: 20, y: 54 },
    { x: 48, y: 52 },
    { x: 76, y: 50 },
    { x: 76, y: 36 },
    { x: 44, y: 32 },
    { x: 50, y: 14 },
  ],
  prize: { x: 80, y: 10 },
};

// Realm 7 — Endgame Desert: long flowing dune sweep, wide spacing.
const DESERT: RealmPathLayout = {
  start: { x: 8, y: 92 },
  nodes: [
    { x: 14, y: 86 },
    { x: 34, y: 82 },
    { x: 58, y: 84 },
    { x: 80, y: 76 },
    { x: 72, y: 64 },
    { x: 48, y: 62 },
    { x: 22, y: 56 },
    { x: 16, y: 44 },
    { x: 38, y: 38 },
    { x: 64, y: 34 },
    { x: 84, y: 24 },
    { x: 56, y: 14 },
  ],
  prize: { x: 24, y: 10 },
};

// Realm 8 — Citadel of Checkmate: dramatic spiral up to King Obsidian's throne.
const CITADEL: RealmPathLayout = {
  start: { x: 12, y: 96 },
  nodes: [
    { x: 20, y: 90 },
    { x: 50, y: 92 },
    { x: 80, y: 86 },
    { x: 86, y: 72 },
    { x: 70, y: 64 },
    { x: 44, y: 66 },
    { x: 22, y: 60 },
    { x: 16, y: 46 },
    { x: 34, y: 38 },
    { x: 58, y: 38 },
    { x: 76, y: 30 },
    { x: 50, y: 14 },
  ],
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

// Smooth Catmull-Rom-ish curve through points (returns an SVG path "d").
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

// Interpolate N intermediate points between each pair of consecutive points.
// Used to render stepping-stones along the trail.
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
