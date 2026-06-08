# Magical Learning Quest Map — Modules 1-5

Expand the existing Pawn Village climb into a full **5-module Beginner journey**, each with its own themed environment, magical pathway style, and animated collectible nodes. Reuse the proven Module 1 stage flow (tutorial → practice → challenge → optional critter duel) so every sub-quest is genuinely playable, not a placeholder.

## What the player will see

**5 themed module paths**, each at its own route, with smooth gradient transitions when entering a module:

| # | Module | Realm | Environment | Track style |
|---|---|---|---|---|
| 1 | Meet the Army | Pawn Village | Opening Meadows — green hills, sunlight | Stepping stones with golden dashes (existing) |
| 2 | Farmer & Piggies | Pawn Village | Sunlit Farmlands — wheat fields, barns | Wooden plank bridge with hay-bale nodes |
| 3 | Check, Checkmate & Stalemate | Castle of Kings | Crystal Caverns — glowing blue/purple geodes | Glowing crystal-shard energy trail |
| 4 | Basic Checkmates | Castle of Kings | Lava Forge — orange/red hues, ember sparks | Molten lava-stone path with floating embers |
| 5 | Opening Principles | Centerland Plains | Floating Islands — sky blue, drifting clouds | Sky-rune arc connecting floating island nodes |

(The Castle realm hosts two module environments — Caverns and Forge — to honor both the "5 distinct backgrounds" request and the existing realm mapping.)

## Per sub-quest backdrops

Inside each module path, **every lesson node** gets its own scene illustration shown behind the lesson/puzzle/challenge screen (not just behind the map). For Module 1 that's 6 piece scenes already loosely themed via icons; we'll generate proper backgrounds for nodes in Modules 2–5 (3–4 lessons + challenge + boss per module ≈ **22 new scene images** plus **5 module map backgrounds = 27 generated images** total, premium-tier where text is in the scene, fast tier otherwise).

## The Fantastic Pathway

A new `<MagicalTrack/>` component replaces the plain SVG line:
- **Meadow** — golden dashed footprints (current look, polished)
- **Farmlands** — repeating wooden-plank texture along the curve
- **Caverns** — animated glowing gradient that pulses violet → cyan along the path
- **Forge** — pulsing ember dashes with subtle particle sparks (CSS keyframes)
- **Sky** — dashed sky-rune ribbon with twinkling stars

All variants reuse the same SVG path data, only the stroke/decoration changes — keeps perf cheap and gives instant visual variety.

## Interactive nodes

Each node renders as a **collectible icon** per its state:
- **Locked**: dimmed silver shape, no glow
- **Current**: bouncing + pulsing aura (Framer Motion `animate` loop)
- **Done**: bright shine with rotating sparkle ring + earned-stars badge

Node icon per module: gem (Module 1), wheat-bundle (2), crystal shard (3), shield (4), star (5). Boss nodes get a larger crowned variant.

## Frosted controls

Header bar inside each path (title, quest counter, stars, shard label) gets `bg-card/40 backdrop-blur-md border-white/20` so it floats over the new vibrant backgrounds while staying readable.

## Smooth scrolling transitions

The home Quest Map page becomes a **single scrollable spine**: each module section is full-viewport-height with its own background, separated by 96px gradient blending bands (`bg-gradient-to-b from-prev-tint/80 via-mix to-next-tint/80`). The page feels like one continuous magical journey from meadow → farmland → cavern → forge → sky.

## Gameplay built per module

Modules 2-5 reuse existing playable components — no new game engines needed:

- **Module 2 — Farmer & Piggies**: `ChessboardLesson` + `PuzzleBoard` (pawn captures, en passant, promotion). Boss = `PawnPromotionRun` variant "March to the Barn" with 4 pawns vs lone king.
- **Module 3 — Check / Mate / Stalemate**: `ChessboardLesson` for check patterns, `PuzzleBoard` with mate-in-1 positions, `BossQuiz` "King's Escape Room" identifying check vs mate vs stalemate.
- **Module 4 — Basic Checkmates**: `PuzzleBoard` with K+Q vs K and two-rook ladder positions, boss = `BossQuiz` "Box the King".
- **Module 5 — Opening Principles**: `ChessboardLesson` walkthrough of Ruy Lopez first 4 moves, `BossQuiz` "Connect the Rooks" on opening rule choices.

All puzzle FEN positions added to a new `src/data/realm{2,3,5}/puzzles.ts` set.

## Files (technical detail)

**New data**
- `src/data/modules/module2-farm.ts`, `module3-check.ts`, `module4-mates.ts`, `module5-openings.ts` — each exports `LEVELS: ClimbLevel[]` matching the existing Module 1 shape, plus per-node scene image refs.
- `src/data/modules/theme.ts` — central map: moduleId → { mapBg, trackVariant, nodeIcon, tintFrom, tintTo }.

**New components**
- `src/components/realm/MagicalTrack.tsx` — variant-driven SVG track (meadow/farm/cavern/forge/sky).
- `src/components/realm/MagicalNode.tsx` — animated collectible node (locked/current/done states, icon per module).
- `src/components/realm/ModuleHeader.tsx` — frosted-glass quest header.

**New route**
- `src/routes/realm.$realmId_.module.$moduleId.tsx` — generic module-path page driven by moduleId; replaces the hardcoded Module 1 logic in `realm.$realmId_.path.tsx`, which becomes a thin redirect to module 1.

**Home page update**
- `src/routes/index.tsx` — wrap content in scrollable themed sections with gradient blends between modules; add "Jump to module" anchor chips.

**Generated images** (≈27 total)
- 5 module map backgrounds (premium quality, 1536×1024)
- ~22 per-sub-quest scene backgrounds (fast quality, 1024×768)
- Stored under `src/assets/modules/{moduleSlug}/`

## Out of scope

- Modules 6–15 stay scaffolded placeholders (next pass).
- No new chess-engine features; reuse existing `chess.js`/`react-chessboard` wrappers.
- No backend persistence changes — node completion still uses existing local progress.

## Acceptance

- All 5 modules clickable from the home map and individually playable end-to-end.
- Each module's path page has a distinct background AND distinct track style.
- Each sub-quest within a module shows its own scene image in the lesson screen.
- Nodes animate per state (locked/current/done) with Framer Motion.
- Frosted-glass header floats cleanly over every background.
- Scrolling the home map feels continuous — no hard seams between environments.
