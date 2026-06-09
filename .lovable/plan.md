# Path-Based Layout for the Per-Realm Quest Path

Refactor `src/routes/realm.$realmId_.path.tsx` (the 12-node "Opening Meadows" view at `/realm/:realmId/path`) so the nodes sit on a hand-authored stone path instead of a single shared serpentine.

## What changes

### 1. Per-realm `PATH_COORDINATES`

Create `src/data/path-layouts.ts` exporting:

```ts
export type PathPoint = { x: number; y: number }; // % of container
export type RealmPathLayout = {
  nodes: PathPoint[];   // exactly 12 points, node 1 → node 12
  start: PathPoint;     // Mariposa "Start" marker
  prize: PathPoint;     // Grand Prize at the end
};
export const PATH_LAYOUTS: Record<string, RealmPathLayout> = { /* one per realm id */ };
export const DEFAULT_PATH_LAYOUT: RealmPathLayout = { /* fallback serpentine */ };
```

- Hand-tune one layout per realm so each theme feels distinct (meadow gentle S, mountains steep zig-zag, labyrinth tight switchbacks, desert long sweep, etc.).
- Coordinates stay in `%` so the existing responsive container still scales for 375px.
- Spacing rules baked into authoring: min distance between consecutive nodes ≥ ~14% on the diagonal so 44px medallions never overlap on mobile.

### 2. Stone path visuals

Keep the existing themed SVG trail (halo + dashed + lit) — it's the "magic" overlay — and add a layer of stone assets underneath it so the path reads as physical stepping-stones:

- New component `src/components/realm/StonePath.tsx` that takes the layout + `trackStyle` and renders:
  - A `<svg>` Catmull-Rom-smoothed curve through `[start, ...nodes, prize]` (reuse current `buildSmoothPath`).
  - ~3 interpolated "stone" ellipses *between* each pair of consecutive points (so ~33 stones total) rendered as SVG `<ellipse>` with a warm sandstone gradient + soft drop-shadow. SVG (not bitmap) keeps it crisp at any size and re-themable per `TrackVariant` (meadow = mossy beige, dunes = sand, caverns = slate, etc.).
  - The themed dashed/lit overlay sits on top of the stones.

No new image assets needed.

### 3. Extract `QuestNode` component

Move the inline `TrackNode` into `src/components/realm/QuestNode.tsx`:

- Same props as today (`level, state, stars, popping, onTap`) plus `isCurrent: boolean`.
- Preserves existing hover/tap framer-motion animations, lock icon, star ring, type ring color, and ⭐ particles on done.
- When `isCurrent`, renders a small **"YOU"** chip pinned just above the medallion (currently the label below shows the level name; we add a dedicated `YOU` badge with `bg-shard-sun` + `text-ink`, animated with a gentle bob) so the player always sees where they are.
- Locked state visually unchanged (lock icon + opacity) but gets `aria-disabled` and a tooltip.

### 4. Wire it into the route

In `realm.$realmId_.path.tsx`:

- Replace the module-level `NODE_POS` / `PRIZE_POS` constants with `const layout = PATH_LAYOUTS[realm.id] ?? DEFAULT_PATH_LAYOUT;` inside the component.
- Derive `nodePositions = layout.nodes.slice(0, TOTAL)`, `prize = layout.prize`, `startPos = layout.start`.
- Render order inside the existing `max-w-5xl` container:
  1. `<StonePath layout={layout} trackStyle={trackStyle} litCount={litCount} />`
  2. Start marker at `layout.start`
  3. Grand Prize at `layout.prize`
  4. `LEVELS.map(...)` → `<QuestNode … isCurrent={lvl.id === currentId} />` positioned via `layout.nodes[i]`
  5. Flying Mariposa animation (unchanged, just reads from the new positions)

All `% / translate-x-1/2 / translate-y-1/2` positioning is preserved so the layout already scales fluidly down to 375px. Add a min-height on the path container (`min-h-[560px] sm:min-h-[640px]`) to guarantee enough vertical room for the curve on short phones.

### 5. Files touched

- **New** `src/data/path-layouts.ts` — `PATH_COORDINATES` per realm + default.
- **New** `src/components/realm/StonePath.tsx` — SVG stones + themed trail.
- **New** `src/components/realm/QuestNode.tsx` — extracted node with YOU badge.
- **Edit** `src/routes/realm.$realmId_.path.tsx` — remove `NODE_POS`/`PRIZE_POS`, remove inline `TrackNode`, wire in the three new modules.

## Out of scope

- The top-level kingdom `QuestMap` (the 8-realm world map) is untouched.
- No changes to module data, chess logic, progress storage, or routing.
- No new image assets — stones are SVG so they re-color per theme automatically.
