
# Prodigy Pawns: The Kingdom of 64 Realms

A magical, kid-safe chess academy quest map with student & parent dashboards. No auth, no backend — all mock data so the experience can be reviewed end-to-end now and wired to real progress later.

## Routes

```
/                     Quest Map (the hero experience)
/realm/$realmId       Realm detail (theme, mini-boss, boss, shard, side quests)
/poster               Printable wall-poster version (large canvas, no UI chrome)
/student              Student dashboard (current shard, XP, gold, gems, Brave Hearts, badges, daily quests)
/parent               Parent dashboard (progress summary, weekly activity, encouragement)
/codex                Mariposa & lore codex (story, ranks, badges, Mariposa transformations)
```

Each route gets its own `head()` meta (title, description, og:title/description). Leaf realm and codex routes get an `og:image` derived from the hero illustration.

## The Quest Map (`/`)

- Single illustrated world with a winding hero's path connecting all 8 realms in order: Pawn Village → Castle of Kings → Centerland Plains → Detective Forest → Tactical Mountains → Crystal Labyrinth → Endgame Desert → Citadel of Checkmate.
- AI-generated full map background illustration (warm, bright, RPG world-map look — Pokémon/Zelda/Mario inflected, no scary motifs).
- SVG overlay on top of the illustration carries the interactive layer:
  - 8 realm nodes, each with name plate + Shard gem **+ unique shape icon** (☾ ☀ ▲ ♣ ❄ ★ ◆ ♛) so rank reads without color.
  - Mini-boss + boss markers per realm, side-quest pins, treasure-chest pins.
  - Hidden markers: Mariposa's Secret Mate Garden gates (glowing), secret tactical caves, and the Astral Academy floating above the Citadel.
  - Mariposa butterfly appearing beside several realms (pointing, perched on signposts), and a larger Mariposa hero portrait near the title banner.
  - Title banner area reserved for "Prodigy Pawns: The Kingdom of 64 Realms" with academy-logo space.
- Clicking a realm node → `/realm/$realmId`. Hover/tap shows a friendly tooltip card with shard, rank, mini-boss, boss.
- A small persistent HUD shows the mock student's progress (current rank, shards collected as a row of 8 shape icons — filled/unfilled).

## Realm Detail (`/realm/$realmId`)

For each of the 8 realms:
- Hero illustration of the realm (AI-generated, themed).
- Shard card (gem + shape + name + the hero rank it grants).
- "What you learn here" list (the chess curriculum from the spec).
- Mini-boss card with friendly character art + name + 1-line description.
- Boss card with friendly character art + name + 1-line description.
- Side-quest list and treasure-chest reward.
- Mariposa appearance for that realm with her transformation note (wings gain that shard's gem glow).
- Prev/next realm navigation along the path.

## Rank System — The 8 Crown Shards

Reusable `<ShardBadge>` component renders gem color + **shape icon + label** together. Used in the map HUD, realm cards, dashboards, codex, and poster. Never color-only. A "Crown Progress" strip shows all 8 shapes; collected ones glow, uncollected are outlined.

## Codex (`/codex`)

- The softened main story.
- Mariposa character sheet with her 8 transformations (one per shard).
- Full rank table (shape, shard, hero rank, realm).
- Badge gallery: First Checkmate, Double Trouble Master, Freeze Master, Rook Commander, Endgame Hero, Puzzle Ninja, Tournament Warrior, Grandmaster Explorer, Square Detective, Brave Heart, Mariposa's Friend.
- Diverse hero cast portraits (varied skin tones, hair, abilities, including a child using a wheelchair).
- Hidden areas explainer: Mate Garden, Astral Academy, secret caves.

## Student Dashboard (`/student`)

Mock data only. Sections:
- Greeting with Mariposa + current rank shape badge.
- Crown Progress strip (8 shape icons).
- XP bar to next rank, Gold Coins, Gems, Brave Heart Points (with a "Great try!" banner motif explaining the anti-frustration mechanic).
- Daily Quests (3), Weekly Quests (2), Side Quests, next Boss Battle card.
- Recent badges earned + locked badges preview.
- Avatar shop preview (capes, crowns, pet companions — visual only).

## Parent Dashboard (`/parent`)

Mock data only. Sections:
- Child summary (name, current rank with shape badge, shards collected).
- This week: quests completed, puzzles solved, time spent, Brave Hearts earned.
- Curriculum coverage so far (which realms' learning goals are in progress / done).
- Encouragement panel explaining the kid-safe tone, Brave Heart mechanic, and what's next.
- Simple printable summary button.

## Printable Poster (`/poster`)

- Large fixed canvas (e.g. 2400×3200 viewport) with no app chrome, white margins, the full illustrated map, all 8 realms labeled with shard shapes, Mariposa appearances, hidden markers, rank legend, badge legend, and academy title banner. Optimized for "print to PDF" / large-format printing.

## Art & Assets (AI-generated)

Generate as 16:9 / portrait / square as appropriate, saved into `src/assets/`:
- 1 full quest-map background (large, landscape).
- 8 realm hero illustrations (one per realm).
- 8 mini-boss + 9 boss character cards (friendly, rounded, big-eyed; final boss King Obsidian = mischievous Bowser-energy, never scary).
- Mariposa hero portrait + 8 transformation variants (caterpillar → butterfly with shard-colored wing glow).
- Diverse hero kids cast illustration for the codex.
- Badge icons (11) and shard gems (8) — vector/SVG hand-built for crispness, not AI.

All illustrations use a bright warm palette and rounded shapes per the spec.

## Design System

- Tailwind v4 tokens in `src/styles.css` only (no hardcoded colors in components). Add semantic tokens for: parchment background, ink, royal-gold accent, sky, leaf, and one accent per shard (pearl, sun, amber, emerald, sapphire, amethyst, topaz, crown-gold). Color is decorative; shape carries the meaning.
- Typography: a friendly display font for titles (e.g. Fraunces or Cabin Sketch via @fontsource) and a clean rounded body font (e.g. Nunito). Installed via `bun add @fontsource/...` and imported once.
- Subtle Motion-style animations: Mariposa gentle hover/float, sparkle pulses on hidden markers, soft scale on realm hover. Restrained — no constant motion.

## Mock Data

`src/data/realms.ts`, `src/data/student.ts`, `src/data/parent.ts`, `src/data/badges.ts` — typed, single source of truth used by every route. Structured so a future Lovable Cloud + auth pass can swap mock for real.

## Out of Scope (deliberately, for v1)

- No login, no per-user persistence, no real XP economy logic — all numbers are mock.
- No real puzzle/game play inside realms — realm pages describe the curriculum and quests, they don't run chess.
- No payments, no email, no AI tutor.

These are clean follow-ups once you approve the look and structure.

## Technical Notes

- TanStack Start file-based routing under `src/routes/` (`index.tsx`, `realm.$realmId.tsx`, `poster.tsx`, `student.tsx`, `parent.tsx`, `codex.tsx`). Every route sets its own `head()` meta.
- Shared header/nav in `__root.tsx` (hidden on `/poster`).
- Map interactive layer is an SVG positioned over the illustrated background, with realm node coordinates defined in `realms.ts` as percentages so it scales responsively and reuses on the poster.
- Accessibility: every shard reference renders shape + label, all nodes are real `<button>`/`<Link>` with aria-labels, focus rings visible, color contrast checked in both light and dark.
