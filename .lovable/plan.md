
# Module 2 — Farmer & Piggies: real gameplay

Module 2 already has a themed map (Sunlit Farmlands), 12 nodes, finish prize, and frosted UI from the previous pass. What's missing: the stage modal still shows click-through placeholders for **video → puzzle → challenge** instead of real chess interactions. This plan makes every Module 2 node genuinely playable, in the same proven style as Module 1.

## Player experience

For each of the 12 nodes, the stage modal will render:

1. **Tutorial step** — Mariposa explains the rule in 1–2 sentences over a tiny demo board with the highlighted square the rule is about (e.g. pawn capture diagonal lit emerald). Tap "Got it ✓" to clear.
2. **Practice puzzle** — a small `PuzzleBoard` with one correct move. Wrong moves cost a Brave Heart 💖 (no fail). Correct move auto-advances.
3. **Quest challenge** — a second harder position from the same theme.
4. *(optional)* **Friendly duel** — only on nodes 7, 11, 12 (which already have `critter` data). Same one-move challenge framed as a duel with Pinky Piggy / Farmer Fenn.

Boss node 12 ("March to the Barn") replaces stages with the existing `PawnPromotionRun` mini-game (set to 4 pawns vs lone king variant), reusing what Module 1 already ships.

## Per-node content

| # | Name | Lesson board | Puzzle FEN goal | Challenge FEN goal |
|---|---|---|---|---|
| 1 | Pawn Push | Single white pawn e2, arrow to e3/e4 | Push pawn to e4 | Push two different pawns to rank 4 |
| 2 | Two-Square Start | e2 pawn with both options lit | Play e2-e4 | Play d2-d4 then c2-c4 in 2 moves |
| 3 | Diagonal Snack | Pawn e4, enemy pawn d5 lit | exd5 capture | Choose between two captures, pick higher value |
| 4 | Pawn Chain | Show chain b2-c3-d4 | Defend hanging pawn by adding a pawn | Find the move that links the chain |
| 5 | En Passant Magic | Show e5 pawn, black d7-d5 just played | Play exd6 en passant | Spot the only legal en passant in 3 options |
| 6 | Promotion Day | Pawn on a7, empty a8 | a8=Q promotion | Promote and immediately give check |
| 7 | Eat the Snack (vs Piggy) | — | Capture the floating apple piece (knight on d5) | Pick the only winning capture |
| 8 | Race to Barn 1 | — | Reach rank 5 in fewest pushes | Same, with one blocker pawn |
| 9 | En Passant Catch | — | Find en passant in mid-position | Decline the en passant — find the better move |
| 10 | Promote Now | — | Choose Q vs N promotion (N gives mate) | Pick correct underpromotion to avoid stalemate |
| 11 | Pawn Wars Mini (vs Farmer) | — | First to promote — auto-play vs scripted opponent | Find the fastest promotion line |
| 12 | March to the Barn (BOSS) | — | `PawnPromotionRun` 4-pawns-vs-king mode | — |

All puzzle FENs and goals live in a new `src/data/realm2/puzzles.ts`, mirroring `src/data/realm1/puzzles.ts` shape so `PuzzleBoard` works without changes.

## Technical changes

**New data**
- `src/data/realm2/puzzles.ts` — exports `MODULE2_NODES: Record<number, { lesson?: LessonStep; puzzle: PuzzleSpec; challenge: PuzzleSpec }>`. Reuses existing `LessonStep` and `PuzzleSpec` types from `src/data/realm1/lessons.ts` / `puzzles.ts`.
- `src/data/realm2/mariposa-lines.ts` — 2–3 cheer/hint variants per stage kind, farm-flavored ("Wheat-tastic!", "Oink yes!", etc.).

**Modified**
- `src/routes/realm.$realmId_.path.tsx` — `StageBody` becomes module-aware:
  - If `mod.id === "meet-the-army"` → keep current Module 1 wiring (Catch the Star, Promotion Run).
  - If `mod.id === "farmer-and-piggies"` → render `ChessboardLesson` for tutorial, `PuzzleBoard` for puzzle + challenge, looking up the FEN by `level.id` from `MODULE2_NODES`. Boss node 12 renders `PawnPromotionRun` directly.
  - Otherwise → unchanged placeholder for Modules 3–5 (out of scope this pass).
- `stagesFor(level)` adjusts copy for Module 2 (tutorial instead of "video").

**Reused as-is**
- `ChessboardLesson`, `PuzzleBoard`, `PawnPromotionRun`, `MariposaSay`, click sounds, stage stepper, progress persistence.

**New boss variant flag**
- `ClimbLevel` already has `promotionRun?: boolean`. Module 2 node 12 sets it `true`; component check in the modal renders `PawnPromotionRun` with a new `variant="march-to-barn"` prop that spawns 4 pawns vs a lone king (small addition inside `PawnPromotionRun.tsx`).

## Out of scope

- Modules 3, 4, 5 keep their placeholder stages — wired in a follow-up.
- No new chess engine work; all positions use existing `chess.js`/`PuzzleBoard` flow.
- No backend changes; progress still per-module in localStorage.

## Acceptance

- Opening any Module 2 node shows a real interactive board for tutorial, puzzle, and challenge — not generic placeholders.
- Correct moves auto-clear the step; wrong moves give a gentle Mariposa miss line and add a Brave Heart.
- Node 12 plays the `PawnPromotionRun` mini-game; winning clears the module and awards the Pawn Champion finish prize.
- Modules 1, 3, 4, 5 continue to work exactly as before.
