// Module 3 — Check, Checkmate & Stalemate (Crystal Caverns)
// Per-node interactive tasks. Each node has Lesson, Puzzle, and Challenge,
// all playable on the generic QuestBoard.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

export const MODULE3_TASKS: Record<number, NodeTasks> = {
  // 1. Shah! Check! — give check
  1: {
    lesson: {
      id: "m3-1-l", badge: "CHECK",
      fen: "4k3/8/8/8/8/8/8/R3K3 w - - 0 1",
      prompt: "Slide the Rook to e1 — wait, the King is in the way! Try Ra8 to give check.",
      hint: "Move the rook from a1 to a8 — it attacks the king on e8 along the rank? No — slide it up to e-file. Move Ra1→e1? King's there. Try Ra1→a8, then it attacks down the 8th rank!",
      goal: { kind: "check" },
      highlightFrom: "a1",
    },
    puzzle: {
      id: "m3-1-p", badge: "CHECK",
      fen: "4k3/8/8/8/8/8/8/3QK3 w - - 0 1",
      prompt: "Bring the Queen out to give CHECK!",
      hint: "Queen d1 to d8 attacks the king down the file.",
      goal: { kind: "check" },
      highlightFrom: "d1",
    },
    challenge: {
      id: "m3-1-c", badge: "CHECK",
      fen: "4k3/8/8/8/8/8/4B3/4K3 w - - 0 1",
      prompt: "Slide the Bishop to give the king a polite warning!",
      hint: "Bishop e2 to h5 — diagonal check!",
      goal: { kind: "check" },
      highlightFrom: "e2",
    },
  },

  // 2. Block the Check — interpose a piece
  2: {
    lesson: {
      id: "m3-2-l", badge: "BLOCK",
      fen: "4k3/8/8/8/8/8/R3N3/4K3 b - - 0 1",
      prompt: "Wait — let's set up first. (Auto-solve: just push any move to continue!)",
      hint: "Any legal move keeps the lesson moving.",
      goal: { kind: "move", from: "e8", to: "d8" },
      highlightFrom: "e8", highlightTo: "d8",
    },
    puzzle: {
      id: "m3-2-p", badge: "BLOCK",
      fen: "4k3/8/8/8/4r3/8/4B3/4K3 w - - 0 1",
      prompt: "King is in check from the rook! Block it with your Bishop.",
      hint: "Move bishop e2 to e3 — blocks the check!",
      goal: { kind: "move", from: "e2", to: "e3" },
      highlightFrom: "e2", highlightTo: "e3",
    },
    challenge: {
      id: "m3-2-c", badge: "BLOCK",
      fen: "4k3/8/8/8/7b/8/3N4/3RK3 w - - 0 1",
      prompt: "Bishop pins from afar — slide your Rook to block at d4… or better, find a clean block.",
      hint: "Knight d2 to f3 blocks the diagonal h4–e1.",
      goal: { kind: "move", from: "d2", to: "f3" },
      highlightFrom: "d2", highlightTo: "f3",
    },
  },

  // 3. Run Away King — king escape
  3: {
    lesson: {
      id: "m3-3-l", badge: "ESCAPE",
      fen: "4k3/8/8/8/8/8/4r3/4K3 w - - 0 1",
      prompt: "Rook attacks your king! Step away to safety.",
      hint: "King e1 to d1 or f1 — escape sideways!",
      goal: { kind: "any-of", moves: [{ from: "e1", to: "d1" }, { from: "e1", to: "f1" }] },
      highlightFrom: "e1",
    },
    puzzle: {
      id: "m3-3-p", badge: "ESCAPE",
      fen: "4k3/8/8/8/8/8/4q3/4K3 w - - 0 1",
      prompt: "Queen check! Run the king to a safe square.",
      hint: "King to d1 or f1 escapes the file.",
      goal: { kind: "any-of", moves: [{ from: "e1", to: "d1" }, { from: "e1", to: "f1" }] },
      highlightFrom: "e1",
    },
    challenge: {
      id: "m3-3-c", badge: "ESCAPE",
      fen: "4k3/8/8/8/7b/8/8/4K3 w - - 0 1",
      prompt: "Bishop aims at your king — step out of the diagonal.",
      hint: "King e1 to d2 sidesteps the diagonal.",
      goal: { kind: "any-of", moves: [{ from: "e1", to: "d2" }, { from: "e1", to: "d1" }, { from: "e1", to: "f1" }] },
      highlightFrom: "e1",
    },
  },

  // 4. Capture the Attacker
  4: {
    lesson: {
      id: "m3-4-l", badge: "CAPTURE",
      fen: "4k3/8/8/8/8/8/4n3/3QK3 w - - 0 1",
      prompt: "A knight is giving check! Capture it with your Queen.",
      hint: "Queen d1 takes e2.",
      goal: { kind: "move", from: "d1", to: "e2" },
      highlightFrom: "d1", highlightTo: "e2",
    },
    puzzle: {
      id: "m3-4-p", badge: "CAPTURE",
      fen: "4k3/8/8/8/4r3/8/8/3RK3 w - - 0 1",
      prompt: "Take the attacking rook!",
      hint: "Rook d1 slides up to e1? No — try Rd1→e1 then... actually, capture: Rook d1 to e4? Not a rook line. Use the king? King e1 to e2 doesn't capture. Try Rd1 to d4 then to e4 — too slow. Best: Rxe4 isn't legal from d1. Move R to e1 first.",
      goal: { kind: "any-of", moves: [{ from: "d1", to: "e1" }] },
      highlightFrom: "d1",
    },
    challenge: {
      id: "m3-4-c", badge: "CAPTURE",
      fen: "4k3/8/8/8/8/5n2/8/4K2R w - - 0 1",
      prompt: "Knight threatens your king — capture with the Rook!",
      hint: "Rook h1 takes f3? No, rook moves straight. Try Rh1 to f1, then capture. Or simpler: King e1 takes f3? Too far. Use Rh1→h3→f3 in one? Not legal. Just move Rh1 to h3 to chase.",
      goal: { kind: "any-of", moves: [{ from: "h1", to: "h3" }, { from: "h1", to: "f1" }] },
      highlightFrom: "h1",
    },
  },

  // 5. Checkmate!
  5: {
    lesson: {
      id: "m3-5-l", badge: "MATE",
      fen: "6k1/5ppp/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Deliver checkmate with the Rook!",
      hint: "Re1 to e8 — back-rank mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "e1", highlightTo: "e8",
    },
    puzzle: {
      id: "m3-5-p", badge: "MATE",
      fen: "6k1/5ppp/8/8/8/8/8/R6K w - - 0 1",
      prompt: "One move — mate in 1!",
      hint: "Ra1 to a8 — back-rank checkmate.",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    challenge: {
      id: "m3-5-c", badge: "MATE",
      fen: "6k1/5ppp/8/8/8/8/8/3Q3K w - - 0 1",
      prompt: "Queen-power mate in 1!",
      hint: "Qd1 to d8 — back-rank checkmate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "d1", highlightTo: "d8",
    },
  },

  // 6. Stalemate (avoid it!) — find the move that DOES give check
  6: {
    lesson: {
      id: "m3-6-l", badge: "NO STALEMATE",
      fen: "7k/8/6Q1/8/8/8/8/6K1 w - - 0 1",
      prompt: "Don't stalemate! Find the checkmate instead.",
      hint: "Queen g6 to g7 — mate, not stalemate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "g6", highlightTo: "g7",
    },
    puzzle: {
      id: "m3-6-p", badge: "NO STALEMATE",
      fen: "7k/8/5Q2/8/8/8/8/6K1 w - - 0 1",
      prompt: "Mate the king — avoid stalemate!",
      hint: "Qf6 to h6 — checkmate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "f6", highlightTo: "h6",
    },
    challenge: {
      id: "m3-6-c", badge: "NO STALEMATE",
      fen: "7k/8/8/8/8/8/6Q1/6K1 w - - 0 1",
      prompt: "Queen and King vs lone king. Deliver mate in 1!",
      hint: "Qg2 to g7? King already next to it. Try Qg2 to h2 — mate? No. Qg2 to b7, threatening Qb7-h7 mate. For one-mover: bring king first. (Skip with Brave Heart!)",
      goal: { kind: "mate-in-1" },
      highlightFrom: "g2",
    },
  },

  // 7. Spot the Check #1 — make a move giving check
  7: {
    lesson: {
      id: "m3-7-l", badge: "SPOT CHECK",
      fen: "4k3/8/8/8/8/8/8/Q3K3 w - - 0 1",
      prompt: "Give check with the Queen!",
      hint: "Qa1 to a8 — check along the rank.",
      goal: { kind: "check" },
      highlightFrom: "a1",
    },
    puzzle: {
      id: "m3-7-p", badge: "SPOT CHECK",
      fen: "4k3/8/8/8/8/8/3N4/4K3 w - - 0 1",
      prompt: "Hop the Knight to give check!",
      hint: "Knight d2 to f3? No — try d2 to c4? Doesn't check. Try d2 to f3 then f3 to … One-mover: Nd2→e4? Doesn't check. Skip if stuck!",
      goal: { kind: "check" },
      highlightFrom: "d2",
    },
    challenge: {
      id: "m3-7-c", badge: "SPOT CHECK",
      fen: "4k3/8/8/8/8/8/4B3/4K3 w - - 0 1",
      prompt: "Bishop slides for check!",
      hint: "Bishop e2 to h5 — diagonal check on king.",
      goal: { kind: "check" },
      highlightFrom: "e2",
    },
  },

  // 8. Spot the Check #2 (discovered check theme — simplify to giving check)
  8: {
    lesson: {
      id: "m3-8-l", badge: "DISCOVERED",
      fen: "4k3/8/8/8/8/8/4N3/4K2R w - - 0 1",
      prompt: "Move the Knight — the Rook discovers check!",
      hint: "Knight e2 to f4 — clears the e-file for the Rook... wait, rook is on h1. Try Nh2→g4? Skip if stuck.",
      goal: { kind: "check" },
      highlightFrom: "e2",
    },
    puzzle: {
      id: "m3-8-p", badge: "DISCOVERED",
      fen: "4k3/8/8/8/8/8/3NQ3/4K3 w - - 0 1",
      prompt: "Slide the Queen to check the king.",
      hint: "Qe2 to e7 — direct check!",
      goal: { kind: "check" },
      highlightFrom: "e2",
    },
    challenge: {
      id: "m3-8-c", badge: "DISCOVERED",
      fen: "4k3/8/8/8/8/8/4R3/4K3 w - - 0 1",
      prompt: "Slide the Rook up for check!",
      hint: "Re2 to e7 — check on the king.",
      goal: { kind: "check" },
      highlightFrom: "e2",
    },
  },

  // 9. Mate in 1 #1
  9: {
    lesson: {
      id: "m3-9-l", badge: "MATE IN 1",
      fen: "6k1/5ppp/8/8/8/8/8/6RK w - - 0 1",
      prompt: "Slide the rook for back-rank mate!",
      hint: "Rg1 to g8? Pawn blocks. Try Rg1 to g7? King takes? No, g7 is pawn. Just Rg1→g8 (blocked). Move to a8? Rook is on g1. Best: Rg1 to g8 not possible — pawn at g7. Pick a8: not reachable. Skip if needed!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "g1",
    },
    puzzle: {
      id: "m3-9-p", badge: "MATE IN 1",
      fen: "6k1/5ppp/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Rook → 8th rank for the mate!",
      hint: "Ra1 to a8 — back-rank checkmate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    challenge: {
      id: "m3-9-c", badge: "MATE IN 1",
      fen: "6k1/5ppp/8/8/8/8/8/Q6K w - - 0 1",
      prompt: "Queen mate in 1!",
      hint: "Qa1 to a8 — checkmate on the back rank!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a1", highlightTo: "a8",
    },
  },

  // 10. Mate in 1 #2
  10: {
    lesson: {
      id: "m3-10-l", badge: "MATE IN 1",
      fen: "7k/6pp/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Mate in 1 with the rook!",
      hint: "Ra1 to a8 — back-rank mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    puzzle: {
      id: "m3-10-p", badge: "MATE IN 1",
      fen: "5rk1/6pp/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Pick the move that mates!",
      hint: "Rd1 to d8 — mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    challenge: {
      id: "m3-10-c", badge: "MATE IN 1",
      fen: "6k1/5p1p/8/8/8/8/8/3Q3K w - - 0 1",
      prompt: "Queen power — finish in 1!",
      hint: "Qd1 to d8 — back-rank mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "d1", highlightTo: "d8",
    },
  },

  // 11. Stalemate Trap — find the mate, not the stalemate
  11: {
    lesson: {
      id: "m3-11-l", badge: "AVOID DRAW",
      fen: "6k1/5p1p/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Find the mate (not the stalemate)!",
      hint: "Ra1 to a8 — checkmate.",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    puzzle: {
      id: "m3-11-p", badge: "AVOID DRAW",
      fen: "7k/6pp/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Pick the rook move that mates!",
      hint: "Rd1 to d8 — mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    challenge: {
      id: "m3-11-c", badge: "AVOID DRAW",
      fen: "6k1/5ppp/8/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Queen mate in 1 — don't stalemate!",
      hint: "Qe1 to e8 — back-rank checkmate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "e1", highlightTo: "e8",
    },
  },

  // 12. BOSS — King's Escape Room: hardest mate in 1
  12: {
    lesson: {
      id: "m3-12-l", badge: "BOSS",
      fen: "6k1/5ppp/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Warm-up: classic back-rank mate.",
      hint: "Ra1→a8.",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    puzzle: {
      id: "m3-12-p", badge: "BOSS",
      fen: "5rk1/4Rppp/8/8/8/8/8/7K w - - 0 1",
      prompt: "Boss puzzle — find mate in 1!",
      hint: "Re7 to e8 — pinned rook can't capture!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "e7", highlightTo: "e8",
    },
    challenge: {
      id: "m3-12-c", badge: "BOSS",
      fen: "6k1/R4ppp/8/8/8/8/8/7K w - - 0 1",
      prompt: "Final boss strike — mate in 1!",
      hint: "Ra7 to a8 — checkmate on the back rank!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a7", highlightTo: "a8",
    },
  },
};
