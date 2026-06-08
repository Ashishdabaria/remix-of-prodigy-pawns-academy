
# Chess Mastery Curriculum — integration plan

You skipped the scoping questions, so here are the defaults I'm going with. Tell me to adjust any of them before I build.

## Defaults I picked

1. **Scope** — Scaffold all 15 modules as real data, fully build **Module 1 (Meet the Army)** as the reference implementation. Modules 2–15 get lesson pages with the existing video → practice → challenge stage flow, marked "Coming soon" inside the challenge step until each one is built out.
2. **Realm mapping** — Distribute the 15 modules across the existing 8 Crown Shard realms (rank system stays intact).
3. **Badges** — Add all 15 milestone badges to `src/data/badges.ts` now, locked by default; they unlock as students clear modules.

## Realm ↔ module mapping

```text
Realm                              Shard      Modules
─────────────────────────────────  ─────────  ───────────────────────────────
1. Pawn Village                    Pearl  ☾   1  Meet the Army
                                              2  Farmer & Piggies
2. Castle of Kings                 Sun    ☀   3  Check, Checkmate & Stalemate
                                              4  Basic Checkmates
3. Centerland Plains               Amber  ▲   5  Opening Principles
4. Detective Forest                Emerald ♣  6  Double Attack
                                              7  Pins & Skewers
5. Tactical Mountains              Sapph. ❄   8  Quick Mates & Weak Squares
                                              9  Game Phases & Planning
6. Crystal Labyrinth               Amet.  ★  10  Counting Material & Trades
                                             11  Discovered Attacks & Deflection
7. Endgame Desert                  Topaz  ◆  12  Endgame Mastery
                                             13  Positional Chess
8. Citadel of Checkmate            Crown  ♛  14  Combinations & Sacrifices
                                             15  Tournament Preparation
```

Each module becomes a node-cluster on its realm's climb path. Pawn Village's current 12-node climb is replaced by Module 1's "Kingdom Parade" (6 piece-intro nodes) + "Catch the Star" challenges + "Pawn Promotion Run" boss = ~12 nodes, so the existing animation/sound/gating work carries over.

## What gets built fully (Module 1)

- **Kingdom Parade lessons** (6) — one per piece (King, Knight, Pawn, Rook, Bishop, Queen) with the storybook intro text from your spec; reuses the existing `LessonScreen` + Mariposa voice.
- **Catch the Star challenge** — for each piece, an empty board highlights every legal target square with a star; child drags the piece to each star. Built as a new `CatchTheStar.tsx` component on top of `react-chessboard` + `chess.js`.
- **Pawn Promotion Run** — pawn on 2nd rank, timer, advance to 8th rank choosing one/two-square moves; awards the **Army Commander** badge on completion.
- Stage gating, click sounds, and Mariposa flight animation between nodes are unchanged from the current Pawn Village climb.

## What gets scaffolded (Modules 2–15)

Each module gets:
- An entry in a new `src/data/curriculum.ts` (id, title, level, realmId, theme, lesson titles, challenge name, milestone badge id, status: `playable | placeholder`).
- A lesson page using the existing `video → practice → challenge` flow. The video and practice steps show the module's theme description from your spec; the challenge step shows a "Coming soon — Mariposa is preparing this quest" card with a back button.
- A locked milestone badge in `BADGES`.

## Curriculum surface

- **New route** `/curriculum` — a single page listing all 15 modules grouped by Beginner / Intermediate / Advanced, with status pills (Playable / Coming soon), realm chip, and the milestone badge. Links each module to its realm's climb path with the right node pre-selected.
- **Header nav** gains a "Curriculum" link next to "Settings".
- **Realm hub** (`realm.$realmId.tsx`) gets a small "Modules in this realm" list under the existing hero so students see what's covered.

## Files

**New**
- `src/data/curriculum.ts` — the 15-module dataset + types + realm mapping.
- `src/data/realm1/kingdom-parade.ts` — Module 1 lesson copy + Catch-the-Star target squares per piece.
- `src/components/realm/CatchTheStar.tsx` — star-collection chessboard mini-game.
- `src/components/realm/PawnPromotionRun.tsx` — timed promotion race.
- `src/routes/curriculum.tsx` — the curriculum index page.

**Edited**
- `src/data/badges.ts` — append the 15 milestone badges (locked).
- `src/data/realm1/path-levels.ts` — replace the 12 nodes with Module 1's parade + challenges.
- `src/routes/realm.$realmId_.path.tsx` — wire Module 1 nodes to the new components; keep gating/sound/animation.
- `src/routes/realm.$realmId.tsx` — add the "Modules in this realm" list.
- `src/components/Header.tsx` — add the Curriculum link.

**Unchanged**
- 8 realm/shard rank system, Mariposa voice, settings page, sound system, climb animations.

## Out of scope for this pass

- Building out Modules 2–15 challenges (Farm Battle, Cutlery Classification, Pin Factory, Tournament Simulator, etc.). Each lands behind its "Coming soon" card and gets implemented in follow-up turns — one or two modules per turn is a realistic pace.
- Persisting progress/badges to Supabase (still localStorage as today).
- The Grandmaster's Seal certificate (waits until all 15 are playable).

Approve this and I'll implement, or tell me which default to change (scope, mapping, badges).
