# RealmPath — Pawn Village "Climb to the Pearl Shard"

A storybook quest-path screen styled to match the Kingdom of 64 Realms theme. The hub's **Begin your quest** button opens it; tapping the current level clears it (placeholder for now) and the hero climbs upward.

## Route

You asked for `/realm/pawn-village`, but that path already renders the Realm Hub (the "What you'll learn" screen with the **Begin your quest** button). To keep both, the new screen will live at:

```
/realm/pawn-village/path   →  src/routes/realm.$realmId_.path.tsx
```

The existing `path` route is a Supabase-backed winding map; it will be **replaced** with the new "floating platforms" design described here. The Hub's `Begin your quest` button already points to `/realm/$realmId/path` — no hub change needed beyond verifying that link.

If you actually want the hub gone and `/realm/pawn-village` to land directly on the climb, say so and I'll fold the hub's reward/back chrome into the new screen instead.

## Screen anatomy

```text
┌─────────────────────────────────────────┐  sticky parchment banner + gold border
│  ‹  THE PAWN VILLAGE          🔊       │  Cinzel Decorative title
│     Climb all 12 quests to win…         │  subtitle
│  [Quests 0/12] [★ 0] [☾ Pearl Shard +   │  pill row
│                  Apprentice Cape]       │
├─────────────────────────────────────────┤
│   ☾  GRAND PRIZE platform (spinning)    │  top of scroll
│        ╲                                │
│         ●  12  Board Guardian (Boss)    │  red ring
│        ╱                                │
│       ●  11  Setting up the board       │
│        ╲                                │
│        ●  10  Treasure: piece values    │  gold ring
│         …                               │  zig-zag continues
│        ●   2  Meet the King             │
│         ╲                               │
│          ●  1  Meet the board   ◀ PLAY  │  glowing, bobbing
│         🦋  Mariposa at the base        │
└─────────────────────────────────────────┘  initial scroll position
```

- Background: vertical gradient — sky blue at top → warm meadow gold at bottom; 3–4 slow drifting cloud SVGs with `prefers-reduced-motion` respected.
- Scroll container starts at the bottom on mount (`scrollTo({ top: maxScroll })`).
- Trail: single SVG `<path>` connecting node centers; rendered twice — faint dashed (full path) + bright gold (stroke-dasharray reveal up to the current level's index).
- Platforms: reusable grassy stepping-stone SVG component, zig-zag x positions `[50, 30, 65, 28, 70, 35, 60, 25, 72, 40, 58, 50]` (% of width).
- Grand prize platform at the very top: larger, with the Pearl Shard crescent (`☾`) inside a slowly rotating glow ring.

## The 12 levels

Hard-coded array in `src/data/realm1/climb-levels.ts`:

| # | Name | Type | Ring color |
|---|---|---|---|
| 1 | Meet the board | Lesson | green |
| 2 | Meet the King | Lesson | green |
| 3 | The Pawn & Rook | Lesson | green |
| 4 | The Bishop & Queen | Lesson | green |
| 5 | The Knight's hop | Lesson | green |
| 6 | Move-it challenge | Challenge | blue |
| 7 | Catch the Lost Knight | Mini-boss | orange |
| 8 | Capturing safely | Lesson | green |
| 9 | Capture 3 targets | Challenge | blue |
| 10 | Treasure: piece values | Treasure | gold |
| 11 | Setting up the board | Lesson | green |
| 12 | The Board Guardian | Boss | deep red (crown ♛) |

## Node states

- **locked** — grey medallion, padlock, level number badge, not interactive.
- **current** — gold medallion w/ glow + gentle bob (framer-motion `y: [0,-6,0]` loop), small parchment "PLAY" tag (crown ♛ on Boss), tappable.
- **done** — green medallion, checkmark, 1–3 stars below.

Each node has a parchment name-tag floating above with the level name in Cinzel.

## Interaction

- Tap **current** node →
  1. Award random 2–3 stars.
  2. Medallion "pop" (scale 1 → 1.25 → 1) + sparkles.
  3. Trail dash-offset animates forward to the next node.
  4. Smooth-scroll the container so the next node sits roughly center-screen.
  5. Next node becomes `current` (unlocks + starts pulse/bob).
  6. Header `Quests x/12` and `★` count update.
  7. Mariposa speaks a random cheer.
- Tap **locked** node → Mariposa says *"Not yet — climb the glowing step first."*
- Clearing Level 12 → full-screen celebration overlay (confetti + spinning Pearl Shard) and Mariposa says *"WE DID IT! The Pearl Shard is yours!"* (No Supabase / no rank-up wiring yet — just the overlay with a "Back to realm" button.)

## Mariposa voice

Reuse the existing `MariposaSay` / SpeechSynthesis pattern from `MariposaSay.tsx` (respects the `pp.voice.muted` localStorage flag, pitch 1.15, rate 1.0). Cheer pool (random):

```
"Yes! You cleared it!"  "Brilliant climbing, hero!"  "One more step up!"
"Star power!"  "You're flying now!"  "Onward and upward!"
```

Locked-tap line pool: `"Not yet — climb the glowing step first."` / `"Finish the bright one first, hero."`.

Header voice toggle reuses the existing `MuteToggle`.

## State (local only, no Supabase)

```ts
// inside the route component
const [cleared, setCleared] = useState<Record<number, number>>({}); // levelId → stars
const currentId = useMemo(() => {
  for (const l of LEVELS) if (cleared[l.id] === undefined) return l.id;
  return null; // all done
}, [cleared]);
```

Persist to `localStorage["pp.pawn-village.climb"]` so reloads keep progress.

## Files

**New**
- `src/data/realm1/climb-levels.ts` — the 12-level array + types + `RING_COLORS` map.
- `src/components/realm/climb/ClimbBackground.tsx` — gradient sky + drifting clouds.
- `src/components/realm/climb/ClimbTrail.tsx` — SVG dashed + gold-reveal trail.
- `src/components/realm/climb/Platform.tsx` — grassy floating platform SVG.
- `src/components/realm/climb/LevelMedallion.tsx` — locked/current/done states + ring color + stars + PLAY/♛ tag.
- `src/components/realm/climb/GrandPrize.tsx` — top treasure platform with spinning Pearl Shard.
- `src/components/realm/climb/ClimbVictory.tsx` — full-screen win overlay.

**Replaced**
- `src/routes/realm.$realmId_.path.tsx` — rewritten as `RealmPath`. The current Supabase-backed implementation (uses `fetchLevels`, `fetchProgress`, `NodeClearAnimation`) is removed in favor of the local-state climb. `progress.ts` and the DB tables are left untouched and can be re-wired later.

**Unchanged**
- `src/routes/realm.$realmId.tsx` — hub already links to `/realm/$realmId/path`; verify the button label says **Begin your quest**.

## Theme tokens

Reuse existing tokens from `src/styles.css`: `--parchment`, `--ink`, `--shard-sun`, `--shard-emerald`, `font-display` (Cinzel Decorative). Ring colors map to:

```
lesson    → var(--shard-emerald)
challenge → oklch(0.70 0.16 240)   // sky blue
miniboss  → oklch(0.72 0.18 50)    // orange
treasure  → var(--shard-sun)
boss      → oklch(0.55 0.22 25)    // deep red
```

(New ring colors added as `--ring-challenge`, `--ring-miniboss`, `--ring-boss` so components stay token-based.)

## Accessibility

- Each node is a `<button>` with `aria-label="Level 3: The Pawn & Rook — locked"` etc.; locked/done nodes get `aria-disabled`.
- Respect `prefers-reduced-motion` — no bobbing, no cloud drift, instant scroll instead of smooth.
- Voice off toggle persists across sessions (existing key).

## Out of scope

- Real lesson/puzzle screens behind each node (clearing is a placeholder).
- Supabase persistence.
- Rank-up / Shard-award flow wiring (just the local victory overlay).
