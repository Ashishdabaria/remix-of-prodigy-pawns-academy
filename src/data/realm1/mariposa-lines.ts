// Mariposa script bible — Realm 1 (Pawn Village).
// Each moment has 2–4 variations; play one at random.
// Sourced from the Launch Plan voice script bible.

export type MomentKey =
  | "PORTAL_INTRO"
  | "LESSON_START"
  | "PIECE_HINT"
  | "CORRECT"
  | "MISSED"
  | "PUZZLE_INTRO"
  | "PUZZLE_HINT"
  | "BOSS_INTRO"
  | "BOSS_CORRECT"
  | "BOSS_MISSED"
  | "SHARD_WON"
  | "SIGNOFF";

export const MARIPOSA_LINES: Record<MomentKey, string[]> = {
  PORTAL_INTRO: [
    "Welcome to the Pawn Village, brave hero! This is where every adventure begins.",
    "Ooh, the Pawn Village! The little pawns have been waiting for you.",
    "Let's start your quest right here. Follow me — the Pearl Shard is close!",
  ],
  LESSON_START: [
    "Let's meet the pieces. Move each one once and they'll cheer for you!",
    "Each piece has its own special dance. Try one and see!",
    "A short lesson, then puzzles. You've got this!",
  ],
  PIECE_HINT: [
    "Tip: tap a piece, then tap a glowing square.",
    "Look for the highlighted squares — those are safe moves.",
    "Any legal move works — there's no wrong adventure!",
  ],
  CORRECT: [
    "Yes! Beautiful move.",
    "That's it! You're a natural.",
    "Whoosh — perfect!",
    "Sparkly! Nicely done.",
  ],
  MISSED: [
    "Almost! Try again, brave hero.",
    "Close one — give it another go.",
    "No worries — that's a Brave Heart for trying!",
  ],
  PUZZLE_INTRO: [
    "Puzzle time! Find the one winning move.",
    "A tiny mystery to solve — I believe in you.",
    "Look for the checkmate in one move!",
  ],
  PUZZLE_HINT: [
    "Hint: look for a square the enemy king can't escape.",
    "Hint: which of your pieces is closest to the king?",
    "Hint: a check that has no answer is checkmate!",
  ],
  BOSS_INTRO: [
    "The Board Guardian is here! He just wants to know what you've learned. Stay calm.",
    "Boss time! Five friendly questions, then the Pearl Shard is yours.",
  ],
  BOSS_CORRECT: [
    "The Guardian smiles. One step closer!",
    "Boom! Correct.",
    "He nods — well played.",
  ],
  BOSS_MISSED: [
    "It's okay! Brave Heart earned. Keep going!",
    "Not quite — try the next one!",
  ],
  SHARD_WON: [
    "You did it!! The Pearl Shard is YOURS, hero!",
    "Whoosh! The first Crown Shard is back where it belongs — with you!",
  ],
  SIGNOFF: [
    "Heading off? Good adventuring today, hero. Come back soon!",
    "See you next time! I'll keep your Shards safe and shiny.",
  ],
};

export function pickLine(moment: MomentKey): string {
  const lines = MARIPOSA_LINES[moment];
  return lines[Math.floor(Math.random() * lines.length)];
}
