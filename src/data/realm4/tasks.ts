// Module 4 — Basic Checkmates (Lava Forge)
// K+Q vs K and K+2R vs K mating drills — single move puzzles.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

export const MODULE4_TASKS: Record<number, NodeTasks> = {
  // 1. Queen's Force-Field — Queen one knight's-move away from king
  1: {
    lesson: {
      id: "m4-1-l", badge: "BOX",
      fen: "7k/8/8/8/8/5Q2/8/6K1 w - - 0 1",
      prompt: "Move the Queen to f7 — build the cage around the king!",
      hint: "Qf3 to f7 — king is trapped on h8/g8.",
      goal: { kind: "move", from: "f3", to: "f7" },
      highlightFrom: "f3", highlightTo: "f7",
    },
    puzzle: {
      id: "m4-1-p", badge: "BOX",
      fen: "7k/8/8/8/8/3Q4/8/6K1 w - - 0 1",
      prompt: "Box the king — Queen to f7!",
      hint: "Qd3 to f7? Not a queen line. Try Qd3→f5→f7? One move only: Qd3→f5 also works to box.",
      goal: { kind: "any-of", moves: [{ from: "d3", to: "f5" }, { from: "d3", to: "g6" }] },
      highlightFrom: "d3",
    },
    challenge: {
      id: "m4-1-c", badge: "BOX",
      fen: "7k/8/8/8/8/8/3Q4/6K1 w - - 0 1",
      prompt: "Queen makes the box — pick the boxing move!",
      hint: "Qd2 to g5 — controls g and h7 area.",
      goal: { kind: "any-of", moves: [{ from: "d2", to: "g5" }, { from: "d2", to: "h6" }, { from: "d2", to: "f4" }] },
      highlightFrom: "d2",
    },
  },

  // 2. K+Q setup — bring the king
  2: {
    lesson: {
      id: "m4-2-l", badge: "K+Q",
      fen: "7k/8/8/8/8/5Q2/8/4K3 w - - 0 1",
      prompt: "Walk the King forward to help!",
      hint: "Ke1 to e2.",
      goal: { kind: "any-of", moves: [{ from: "e1", to: "e2" }, { from: "e1", to: "f2" }, { from: "e1", to: "d2" }] },
      highlightFrom: "e1",
    },
    puzzle: {
      id: "m4-2-p", badge: "K+Q",
      fen: "7k/8/8/8/8/6Q1/8/3K4 w - - 0 1",
      prompt: "King marches forward!",
      hint: "Kd1 to e2 (closer to enemy king).",
      goal: { kind: "any-of", moves: [{ from: "d1", to: "e2" }, { from: "d1", to: "d2" }, { from: "d1", to: "e1" }] },
      highlightFrom: "d1",
    },
    challenge: {
      id: "m4-2-c", badge: "K+Q",
      fen: "7k/8/8/8/8/6Q1/4K3/8 w - - 0 1",
      prompt: "King helps the queen — step closer!",
      hint: "Ke2 to f3.",
      goal: { kind: "any-of", moves: [{ from: "e2", to: "f3" }, { from: "e2", to: "e3" }, { from: "e2", to: "d3" }] },
      highlightFrom: "e2",
    },
  },

  // 3. Drive to the edge
  3: {
    lesson: {
      id: "m4-3-l", badge: "DRIVE",
      fen: "8/8/5k2/8/8/3Q4/8/3K4 w - - 0 1",
      prompt: "Push the king — Queen to e4 cuts him off!",
      hint: "Qd3 to e4 limits the enemy king.",
      goal: { kind: "move", from: "d3", to: "e4" },
      highlightFrom: "d3", highlightTo: "e4",
    },
    puzzle: {
      id: "m4-3-p", badge: "DRIVE",
      fen: "8/8/4k3/8/8/2Q5/8/3K4 w - - 0 1",
      prompt: "Push the king back — Qc3 to d4!",
      hint: "Qc3 to d4 — cuts the king off.",
      goal: { kind: "move", from: "c3", to: "d4" },
      highlightFrom: "c3", highlightTo: "d4",
    },
    challenge: {
      id: "m4-3-c", badge: "DRIVE",
      fen: "8/8/3k4/8/8/1Q6/8/3K4 w - - 0 1",
      prompt: "Drive the king — Queen to c4!",
      hint: "Qb3 to c4 — restrict him.",
      goal: { kind: "move", from: "b3", to: "c4" },
      highlightFrom: "b3", highlightTo: "c4",
    },
  },

  // 4. Two-Rook Ladder
  4: {
    lesson: {
      id: "m4-4-l", badge: "LADDER",
      fen: "4k3/8/8/8/8/8/R7/1R5K w - - 0 1",
      prompt: "Climb the ladder — Ra2 to a7!",
      hint: "Ra2 to a7 — pushes the king toward the 8th rank.",
      goal: { kind: "move", from: "a2", to: "a7" },
      highlightFrom: "a2", highlightTo: "a7",
    },
    puzzle: {
      id: "m4-4-p", badge: "LADDER",
      fen: "4k3/R7/8/8/8/8/1R6/7K w - - 0 1",
      prompt: "Mate in 1 — ladder finisher!",
      hint: "Rb2 to b8 — mate (rook on a7 covers 7th rank).",
      goal: { kind: "mate-in-1" },
      highlightFrom: "b2", highlightTo: "b8",
    },
    challenge: {
      id: "m4-4-c", badge: "LADDER",
      fen: "4k3/8/R7/8/8/8/R7/7K w - - 0 1",
      prompt: "Push the king — Ra6 to a7 traps him!",
      hint: "Ra6 to a7 — now the king is stuck on the 8th.",
      goal: { kind: "move", from: "a6", to: "a7" },
      highlightFrom: "a6", highlightTo: "a7",
    },
  },

  // 5. Avoid stalemate — find the non-stalemating move
  5: {
    lesson: {
      id: "m4-5-l", badge: "CARE",
      fen: "7k/8/6Q1/8/8/8/8/6K1 w - - 0 1",
      prompt: "Don't stalemate! Find the checkmate.",
      hint: "Qg6 to g7 — mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "g6", highlightTo: "g7",
    },
    puzzle: {
      id: "m4-5-p", badge: "CARE",
      fen: "7k/8/5Q2/8/8/8/8/6K1 w - - 0 1",
      prompt: "One careful move — mate, not stalemate!",
      hint: "Qf6 to h6 — checkmate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "f6", highlightTo: "h6",
    },
    challenge: {
      id: "m4-5-c", badge: "CARE",
      fen: "7k/8/7K/5Q2/8/8/8/8 w - - 0 1",
      prompt: "Kings facing — find the mate!",
      hint: "Qf5 to f7 — checkmate (king supports queen).",
      goal: { kind: "mate-in-1" },
      highlightFrom: "f5", highlightTo: "f7",
    },
  },

  // 6. The Final Mate
  6: {
    lesson: {
      id: "m4-6-l", badge: "FINISH",
      fen: "7k/6K1/8/5Q2/8/8/8/8 w - - 0 1",
      prompt: "Land the mate — Qf5 to f7!",
      hint: "Qf5 to f7 — checkmate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "f5", highlightTo: "f7",
    },
    puzzle: {
      id: "m4-6-p", badge: "FINISH",
      fen: "7k/5K2/8/4Q3/8/8/8/8 w - - 0 1",
      prompt: "Queen delivers mate!",
      hint: "Qe5 to h5 — checkmate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "e5", highlightTo: "h5",
    },
    challenge: {
      id: "m4-6-c", badge: "FINISH",
      fen: "7k/6K1/8/8/8/8/8/4Q3 w - - 0 1",
      prompt: "Long-range queen mate!",
      hint: "Qe1 to e8 — back-rank mate (king on g7 supports? actually mate via Qh1 to h7 only if king nearby). Try Qe1→h1→h8? One move: Qe1→a5? Skip if stuck.",
      goal: { kind: "mate-in-1" },
      highlightFrom: "e1",
    },
  },

  // 7. Mate in 1: Q+K
  7: {
    lesson: {
      id: "m4-7-l", badge: "Q+K MATE",
      fen: "7k/6K1/5Q2/8/8/8/8/8 w - - 0 1",
      prompt: "Mate in 1!",
      hint: "Qf6 to f8? Try Qf6 to h6 — mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "f6",
    },
    puzzle: {
      id: "m4-7-p", badge: "Q+K MATE",
      fen: "k7/1K6/2Q5/8/8/8/8/8 w - - 0 1",
      prompt: "Mate in 1!",
      hint: "Qc6 to a6 — mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "c6", highlightTo: "a6",
    },
    challenge: {
      id: "m4-7-c", badge: "Q+K MATE",
      fen: "k7/2K5/1Q6/8/8/8/8/8 w - - 0 1",
      prompt: "Sharp queen mate!",
      hint: "Qb6 to b8? King blocks — try Qb6 to b7? Stalemate risk! Best: Qb6 to a7 mate.",
      goal: { kind: "mate-in-1" },
      highlightFrom: "b6",
    },
  },

  // 8. Mate in 1: 2 Rooks
  8: {
    lesson: {
      id: "m4-8-l", badge: "2 ROOKS",
      fen: "4k3/R7/1R6/8/8/8/8/7K w - - 0 1",
      prompt: "Ladder mate — Rb6 to b8!",
      hint: "Rb6 to b8 — mate (Ra7 covers the 7th).",
      goal: { kind: "mate-in-1" },
      highlightFrom: "b6", highlightTo: "b8",
    },
    puzzle: {
      id: "m4-8-p", badge: "2 ROOKS",
      fen: "4k3/8/R7/1R6/8/8/8/7K w - - 0 1",
      prompt: "Mate in 1 with the ladder!",
      hint: "Ra6 to a8 — mate (Rb5 covers escape).",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a6",
    },
    challenge: {
      id: "m4-8-c", badge: "2 ROOKS",
      fen: "4k3/R7/8/1R6/8/8/8/7K w - - 0 1",
      prompt: "Find the rook mate!",
      hint: "Rb5 to b8 — checkmate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "b5", highlightTo: "b8",
    },
  },

  // 9. Drive Drill
  9: {
    lesson: {
      id: "m4-9-l", badge: "DRIVE",
      fen: "8/4k3/8/8/3Q4/8/8/3K4 w - - 0 1",
      prompt: "Push the king — Qd4 to e5!",
      hint: "Qd4 to e5 cuts him off.",
      goal: { kind: "move", from: "d4", to: "e5" },
      highlightFrom: "d4", highlightTo: "e5",
    },
    puzzle: {
      id: "m4-9-p", badge: "DRIVE",
      fen: "4k3/8/8/8/3Q4/8/8/3K4 w - - 0 1",
      prompt: "Cut off the king — Qd4 to d6!",
      hint: "Qd4 to d6 — limits king to top corner.",
      goal: { kind: "move", from: "d4", to: "d6" },
      highlightFrom: "d4", highlightTo: "d6",
    },
    challenge: {
      id: "m4-9-c", badge: "DRIVE",
      fen: "4k3/8/8/4Q3/8/8/8/3K4 w - - 0 1",
      prompt: "Knight's-move queen — Qe5 to e7!",
      hint: "Qe5 to e7 — king is trapped.",
      goal: { kind: "move", from: "e5", to: "e7" },
      highlightFrom: "e5", highlightTo: "e7",
    },
  },

  // 10. Stalemate Spotter — pick safe move
  10: {
    lesson: {
      id: "m4-10-l", badge: "SAFE",
      fen: "k7/8/1Q6/2K5/8/8/8/8 w - - 0 1",
      prompt: "Don't stalemate! Make a safe move.",
      hint: "Qb6 to b7? Stalemate. Try Qb6 to b8 — mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "b6",
    },
    puzzle: {
      id: "m4-10-p", badge: "SAFE",
      fen: "7k/8/6KQ/8/8/8/8/8 w - - 0 1",
      prompt: "Mate in 1, don't stalemate!",
      hint: "Qh6 to h7 — mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "h6", highlightTo: "h7",
    },
    challenge: {
      id: "m4-10-c", badge: "SAFE",
      fen: "k7/8/KQ6/8/8/8/8/8 w - - 0 1",
      prompt: "Careful — find the mate, not draw!",
      hint: "Qb6 to b7 — mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "b6", highlightTo: "b7",
    },
  },

  // 11. Ladder Speedrun
  11: {
    lesson: {
      id: "m4-11-l", badge: "LADDER",
      fen: "4k3/R7/1R6/8/8/8/8/7K w - - 0 1",
      prompt: "Speed mate — Rb6 to b8!",
      hint: "Rb6 to b8 — checkmate.",
      goal: { kind: "mate-in-1" },
      highlightFrom: "b6", highlightTo: "b8",
    },
    puzzle: {
      id: "m4-11-p", badge: "LADDER",
      fen: "3k4/R7/1R6/8/8/8/8/7K w - - 0 1",
      prompt: "Rook mate in 1!",
      hint: "Rb6 to b8 — checkmate.",
      goal: { kind: "mate-in-1" },
      highlightFrom: "b6", highlightTo: "b8",
    },
    challenge: {
      id: "m4-11-c", badge: "LADDER",
      fen: "2k5/R7/1R6/8/8/8/8/7K w - - 0 1",
      prompt: "Rook mate — ladder finish!",
      hint: "Rb6 to b8 — checkmate (Ra7 covers 7).",
      goal: { kind: "mate-in-1" },
      highlightFrom: "b6", highlightTo: "b8",
    },
  },

  // 12. BOSS — Box the King with K+Q mate
  12: {
    lesson: {
      id: "m4-12-l", badge: "BOSS",
      fen: "7k/6K1/5Q2/8/8/8/8/8 w - - 0 1",
      prompt: "Boss warm-up — Q+K mate!",
      hint: "Qf6 to h6 — mate, or Qf6 to f8 — mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "f6",
    },
    puzzle: {
      id: "m4-12-p", badge: "BOSS",
      fen: "k7/1K6/2Q5/8/8/8/8/8 w - - 0 1",
      prompt: "Boss mate — show the Forge Golem!",
      hint: "Qc6 to a6 — checkmate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "c6", highlightTo: "a6",
    },
    challenge: {
      id: "m4-12-c", badge: "BOSS",
      fen: "7k/5K2/4Q3/8/8/8/8/8 w - - 0 1",
      prompt: "Final boss — deliver the mate!",
      hint: "Qe6 to h6 — mate, or Qe6 to e8 — mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "e6",
    },
  },
};
