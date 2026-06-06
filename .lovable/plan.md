
# Realm 1 — Pawn Village: Playable Loop

Turn the existing Pawn Village realm page into a full playable experience: portal intro → 3 mini-lessons → puzzle set → Board Guardian boss → Pearl Shard celebration. Mock progress only (no auth yet).

## Route structure

Add a nested play flow under the existing realm route. Keep the current realm detail page as the "lobby"; add a new playable sub-route.

```
src/routes/realm.$realmId.tsx         (existing — realm lobby, adds "Enter Realm" CTA)
src/routes/realm.$realmId.play.tsx    (NEW — playable loop host with stage state)
```

The play route is a single page that walks through stages in order (portal → lesson 1 → lesson 2 → lesson 3 → puzzles → boss → victory). Stage state lives in React state; a small top bar shows progress dots so a child sees where they are. "Skip" and "Back to map" always available.

Only Realm 1 (`pawn-village`) ships playable content in v1. Other realms render a friendly "Coming soon — Mariposa is still painting this realm!" panel from the same route, so the structure is in place for realms 2–8 later.

## The 7 stages

1. **Portal intro (4–6s, skippable)** — Pearl-shard colored swirl, Mariposa flutters in, speaks one of 2–3 random intro lines via SpeechSynthesis. Tap-to-skip.
2. **Lesson 1 — How pieces move.** Interactive `react-chessboard` with only one piece on the board at a time (pawn, then knight, then bishop, rook, queen, king). Legal target squares highlighted. Child must make one legal move per piece to advance. Mariposa says the piece name + a one-line tip.
3. **Lesson 2 — Safe captures.** Mini-positions (3 of them) where one of the child's pieces can capture a free enemy piece. Child taps the capture. Bad taps get a gentle Mariposa "almost! try again" + 1 Brave Heart.
4. **Lesson 3 — Piece values.** Visual values panel (♙1 ♘3 ♗3 ♜5 ♛9). 3 quick "which capture is better?" choices using two highlighted target pieces. Tap the higher-value piece.
5. **Puzzle set — 3 mate-in-1 puzzles.** Hand-authored FENs (no external fetch in v1) themed for beginners: back-rank, queen mate, rook ladder finish. Solve = +40 XP +5 gold. Miss = +1 Brave Heart, Mariposa hint, retry.
6. **Boss — The Board Guardian.** A friendly stone-guardian card with a 5-question rapid quiz (mix of move/value/capture questions drawn from lessons). 4 of 5 correct = victory. Any miss earns Brave Hearts, never a fail screen.
7. **Victory — Pearl Shard won.** Confetti + shard gem animation + Mariposa "shard won" line. Buttons: "Back to map" (updates mock student to include `pearl` shard + advance currentRealmId) and "Play again".

## Components (new, all in `src/components/realm/`)

- `PlayShell.tsx` — stage host: top progress bar, skip/back, transitions between stages.
- `PortalIntro.tsx` — CSS swirl + Mariposa float-in + speech, auto-advances or on tap.
- `ChessboardLesson.tsx` — wraps `react-chessboard` + `chess.js`, accepts a setup config (pieces to place, target behavior: "make any legal move" | "capture target" | "pick higher value").
- `PuzzleBoard.tsx` — loads a FEN, validates the single correct move, calls onSolve/onMiss.
- `BossQuiz.tsx` — 5-question multiple-choice/board-tap quiz.
- `VictoryShard.tsx` — celebration screen with Pearl Shard art and reward summary.
- `MariposaSay.tsx` — small util component: takes a `moment` key (INTRO/HINT/CORRECT/MISSED/BOSS/SHARD_WON/SIGNOFF), picks a random line, speaks via `window.speechSynthesis`, renders the line as on-screen caption (accessibility + sound-off devices).

## Data (new, in `src/data/realm1/`)

- `lessons.ts` — typed array of lesson configs (piece, starting square, instruction text, Mariposa moment key).
- `puzzles.ts` — 3 hand-authored mate-in-1 entries: `{ fen, solution: "e7e8q" | "h7h8", hint, theme }`.
- `boss.ts` — 5 quiz questions: `{ kind: "value" | "move" | "capture", prompt, options, correctIndex }`.
- `mariposa-lines.ts` — full script-bible map: `Record<MomentKey, string[]>` seeded from the launch plan (intro x3, hint x3, correct x4, missed x3, boss x2, shard-won x2, signoff x2).

## State (mock, in-memory for v1)

Extend `src/data/student.ts` with helpers `addShard(id)` and `setCurrentRealm(id)` that mutate the in-memory `STUDENT` object and use a small React context (`StudentProvider` in `__root.tsx`) so the map HUD and dashboards re-render after victory. No persistence yet — refresh resets. Structured so a future Lovable Cloud pass swaps the context's setter for a server-fn call.

## Mariposa voice

Use `window.speechSynthesis` with a friendly voice pick (prefer a female en-* voice if available, fall back to default). Wrap in a tiny `useMariposaVoice()` hook with a global mute toggle stored in `localStorage` (`pp.voice.muted`). Captions always render regardless of mute. Doc's "tap to skip" honored on the portal and any spoken line.

## Brave Hearts (anti-frustration)

A miss never blocks progress. Each miss bumps `STUDENT.braveHearts` and shows a small "+1 Brave Heart — great try!" toast. The boss always lets you finish; below 4/5 it shows "Great try! Let's practice once more" and replays the quiz with fresh question order.

## Dependencies to add

- `chess.js`
- `react-chessboard`
- `canvas-confetti` (tiny, for victory)

No backend, no auth, no external puzzle DB in v1 — all content is local and hand-authored so the loop is reliably delightful.

## Out of scope (deliberately)

- Real persistence / accounts (next pass with Lovable Cloud).
- Realms 2–8 playable content (same shell, content later).
- Voice-actor / ElevenLabs audio (SpeechSynthesis only for now; component is swap-ready).
- Rive/Lottie animations (CSS + Motion only for v1 portal).
- Stockfish opponent (boss is a quiz, not a full game, per MLP scope).

## Acceptance check

From `/` → click Pawn Village → "Enter Realm" → portal plays → 3 lessons complete → 3 puzzles solved (or skipped with Brave Hearts) → boss passed → Pearl Shard victory → "Back to map" shows the Pearl shard filled in the HUD and on `/student`.
