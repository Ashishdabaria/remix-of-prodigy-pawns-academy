// Module 13 — Positional Chess: Pawn Structure & Coordination (Endgame Desert)
// 12 nodes: open files, outposts, good/bad bishops, rook on 7th.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

export const MODULE13_TASKS: Record<number, NodeTasks> = {
  // 1. Rook on the open file
  1: {
    lesson: {
      id: "m13-1-l", badge: "OPEN FILE",
      fen: "4k3/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Rook loves open files — Re5!",
      hint: "Slide the rook to the center.",
      goal: { kind: "move", from: "e1", to: "e5" },
      highlightFrom: "e1", highlightTo: "e5",
    },
    puzzle: {
      id: "m13-1-p", badge: "OPEN FILE",
      fen: "4k3/8/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Rd5 — control the open file!",
      hint: "Rook to d5.",
      goal: { kind: "move", from: "d1", to: "d5" },
      highlightFrom: "d1", highlightTo: "d5",
    },
    challenge: {
      id: "m13-1-c", badge: "OPEN FILE",
      fen: "4k3/8/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Ra5 — claim the a-file!",
      hint: "Rook to a5.",
      goal: { kind: "move", from: "a1", to: "a5" },
      highlightFrom: "a1", highlightTo: "a5",
    },
  },

  // 2. Rook on the 7th rank
  2: {
    lesson: {
      id: "m13-2-l", badge: "7TH RANK",
      fen: "4k3/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Re7+ — rook on the 7th!",
      hint: "Slide to e7 with check.",
      goal: { kind: "move", from: "e1", to: "e7" },
      highlightFrom: "e1", highlightTo: "e7",
    },
    puzzle: {
      id: "m13-2-p", badge: "7TH RANK",
      fen: "4k3/8/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Rd7+ — the 7th rank rocks!",
      hint: "Rook to d7.",
      goal: { kind: "move", from: "d1", to: "d7" },
      highlightFrom: "d1", highlightTo: "d7",
    },
    challenge: {
      id: "m13-2-c", badge: "7TH RANK",
      fen: "4k3/8/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Ra7 — pigs on the 7th!",
      hint: "Climb to a7.",
      goal: { kind: "move", from: "a1", to: "a7" },
      highlightFrom: "a1", highlightTo: "a7",
    },
  },

  // 3. Knight outpost
  3: {
    lesson: {
      id: "m13-3-l", badge: "OUTPOST",
      fen: "4k3/8/8/8/8/3N4/8/4K3 w - - 0 1",
      prompt: "Plant a knight outpost — Ne5!",
      hint: "Knight leaps to e5.",
      goal: { kind: "move", from: "d3", to: "e5" },
      highlightFrom: "d3", highlightTo: "e5",
    },
    puzzle: {
      id: "m13-3-p", badge: "OUTPOST",
      fen: "4k3/8/8/8/4N3/8/8/4K3 w - - 0 1",
      prompt: "Nd6+ — strong outpost with check!",
      hint: "Knight to d6.",
      goal: { kind: "move", from: "e4", to: "d6" },
      highlightFrom: "e4", highlightTo: "d6",
    },
    challenge: {
      id: "m13-3-c", badge: "OUTPOST",
      fen: "4k3/8/8/8/3N4/8/8/4K3 w - - 0 1",
      prompt: "Nf5 — deep outpost!",
      hint: "Knight d4 to f5.",
      goal: { kind: "move", from: "d4", to: "f5" },
      highlightFrom: "d4", highlightTo: "f5",
    },
  },

  // 4. Good bishop — long diagonal
  4: {
    lesson: {
      id: "m13-4-l", badge: "GOOD BISHOP",
      fen: "4k3/8/8/8/8/8/8/B3K3 w - - 0 1",
      prompt: "Long diagonal — Bh8!",
      hint: "Bishop sweeps a1-h8.",
      goal: { kind: "move", from: "a1", to: "h8" },
      highlightFrom: "a1", highlightTo: "h8",
    },
    puzzle: {
      id: "m13-4-p", badge: "GOOD BISHOP",
      fen: "4k3/8/8/8/8/8/8/4K2B w - - 0 1",
      prompt: "Ba8 — long diagonal sweep!",
      hint: "Bishop h1 to a8.",
      goal: { kind: "move", from: "h1", to: "a8" },
      highlightFrom: "h1", highlightTo: "a8",
    },
    challenge: {
      id: "m13-4-c", badge: "GOOD BISHOP",
      fen: "4k3/8/8/8/8/8/8/2B1K3 w - - 0 1",
      prompt: "Bh6 — control the diagonal!",
      hint: "Bishop c1 to h6.",
      goal: { kind: "move", from: "c1", to: "h6" },
      highlightFrom: "c1", highlightTo: "h6",
    },
  },

  // 5. Centralize the queen
  5: {
    lesson: {
      id: "m13-5-l", badge: "CENTRAL",
      fen: "4k3/8/8/8/8/8/8/3Q3K w - - 0 1",
      prompt: "Qd5 — centralize the queen!",
      hint: "Queen to the center.",
      goal: { kind: "move", from: "d1", to: "d5" },
      highlightFrom: "d1", highlightTo: "d5",
    },
    puzzle: {
      id: "m13-5-p", badge: "CENTRAL",
      fen: "4k3/8/8/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Qe4 — strong central post!",
      hint: "Queen to e4.",
      goal: { kind: "move", from: "e1", to: "e4" },
      highlightFrom: "e1", highlightTo: "e4",
    },
    challenge: {
      id: "m13-5-c", badge: "CENTRAL",
      fen: "4k3/8/8/8/8/8/8/3Q3K w - - 0 1",
      prompt: "Qd4 — heart of the board!",
      hint: "Queen to d4.",
      goal: { kind: "move", from: "d1", to: "d4" },
      highlightFrom: "d1", highlightTo: "d4",
    },
  },

  // 6. Doubled rooks
  6: {
    lesson: {
      id: "m13-6-l", badge: "DOUBLED",
      fen: "4k3/8/8/8/8/8/4R3/4R2K w - - 0 1",
      prompt: "Double up — Re4!",
      hint: "Stack rooks on the e-file.",
      goal: { kind: "move", from: "e2", to: "e4" },
      highlightFrom: "e2", highlightTo: "e4",
    },
    puzzle: {
      id: "m13-6-p", badge: "DOUBLED",
      fen: "4k3/8/8/8/8/4R3/8/4R2K w - - 0 1",
      prompt: "Re5 — doubled rooks dominate!",
      hint: "Rook climbs e-file.",
      goal: { kind: "move", from: "e3", to: "e5" },
      highlightFrom: "e3", highlightTo: "e5",
    },
    challenge: {
      id: "m13-6-c", badge: "DOUBLED",
      fen: "4k3/8/8/8/4R3/8/8/4R2K w - - 0 1",
      prompt: "Re3 — battery on the e-file!",
      hint: "Doubled rooks ready.",
      goal: { kind: "move", from: "e1", to: "e3" },
      highlightFrom: "e1", highlightTo: "e3",
    },
  },

  // 7. Bishop pair sweep
  7: {
    lesson: {
      id: "m13-7-l", badge: "BISHOP PAIR",
      fen: "4k3/8/8/8/8/8/8/2B1KB2 w - - 0 1",
      prompt: "Bishop pair — Bh6 sweeps!",
      hint: "Bishop c1 to h6.",
      goal: { kind: "move", from: "c1", to: "h6" },
      highlightFrom: "c1", highlightTo: "h6",
    },
    puzzle: {
      id: "m13-7-p", badge: "BISHOP PAIR",
      fen: "4k3/8/8/8/8/8/8/B2K3B w - - 0 1",
      prompt: "Bh8 — the long sweep!",
      hint: "Bishop a1 to h8.",
      goal: { kind: "move", from: "a1", to: "h8" },
      highlightFrom: "a1", highlightTo: "h8",
    },
    challenge: {
      id: "m13-7-c", badge: "BISHOP PAIR",
      fen: "4k3/8/8/8/8/8/8/4KB1B w - - 0 1",
      prompt: "Ba8 — light squares conquered!",
      hint: "Bishop h1 to a8.",
      goal: { kind: "move", from: "h1", to: "a8" },
      highlightFrom: "h1", highlightTo: "a8",
    },
  },

  // 8. Weak pawn target
  8: {
    lesson: {
      id: "m13-8-l", badge: "WEAK PAWN",
      fen: "4k3/8/3p4/8/8/8/8/3R3K w - - 0 1",
      prompt: "Attack the weak pawn — Rxd6!",
      hint: "Rook climbs d-file.",
      goal: { kind: "move", from: "d1", to: "d6" },
      highlightFrom: "d1", highlightTo: "d6",
    },
    puzzle: {
      id: "m13-8-p", badge: "WEAK PAWN",
      fen: "4k3/8/8/3p4/8/8/8/3R3K w - - 0 1",
      prompt: "Rxd5 — pawn falls!",
      hint: "Rook to d5.",
      goal: { kind: "move", from: "d1", to: "d5" },
      highlightFrom: "d1", highlightTo: "d5",
    },
    challenge: {
      id: "m13-8-c", badge: "WEAK PAWN",
      fen: "4k3/3p4/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Rxd7+ — isolated pawn captured!",
      hint: "Rook all the way up.",
      goal: { kind: "move", from: "d1", to: "d7" },
      highlightFrom: "d1", highlightTo: "d7",
    },
  },

  // 9. Coordinate pieces — bring the king
  9: {
    lesson: {
      id: "m13-9-l", badge: "COORDINATE",
      fen: "4k3/8/8/8/8/8/4K3/8 w - - 0 1",
      prompt: "Bring the king up — Ke3!",
      hint: "King centralizes.",
      goal: { kind: "move", from: "e2", to: "e3" },
      highlightFrom: "e2", highlightTo: "e3",
    },
    puzzle: {
      id: "m13-9-p", badge: "COORDINATE",
      fen: "4k3/8/8/8/8/4K3/8/8 w - - 0 1",
      prompt: "Ke4 — central king is king!",
      hint: "Step up to e4.",
      goal: { kind: "move", from: "e3", to: "e4" },
      highlightFrom: "e3", highlightTo: "e4",
    },
    challenge: {
      id: "m13-9-c", badge: "COORDINATE",
      fen: "4k3/8/8/8/4K3/8/8/8 w - - 0 1",
      prompt: "Ke5 — face off in the center!",
      hint: "King to e5.",
      goal: { kind: "move", from: "e4", to: "e5" },
      highlightFrom: "e4", highlightTo: "e5",
    },
  },

  // 10. Treasure — perfect outpost
  10: {
    lesson: {
      id: "m13-10-l", badge: "TREASURE",
      fen: "4k3/8/8/8/4N3/8/8/4K3 w - - 0 1",
      prompt: "Treasure outpost — Nd6+!",
      hint: "Knight to d6 with check.",
      goal: { kind: "move", from: "e4", to: "d6" },
      highlightFrom: "e4", highlightTo: "d6",
    },
    puzzle: {
      id: "m13-10-p", badge: "TREASURE",
      fen: "4k3/8/8/3N4/8/8/8/4K3 w - - 0 1",
      prompt: "Nf6+ — golden outpost!",
      hint: "Knight to f6.",
      goal: { kind: "move", from: "d5", to: "f6" },
      highlightFrom: "d5", highlightTo: "f6",
    },
    challenge: {
      id: "m13-10-c", badge: "TREASURE",
      fen: "4k3/8/8/8/3N4/8/8/4K3 w - - 0 1",
      prompt: "Nc6+ — outpost gold!",
      hint: "Knight to c6.",
      goal: { kind: "move", from: "d4", to: "c6" },
      highlightFrom: "d4", highlightTo: "c6",
    },
  },

  // 11. Rook lift / activity
  11: {
    lesson: {
      id: "m13-11-l", badge: "ROOK LIFT",
      fen: "4k3/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Lift the rook — Re3!",
      hint: "Activate the rook.",
      goal: { kind: "move", from: "e1", to: "e3" },
      highlightFrom: "e1", highlightTo: "e3",
    },
    puzzle: {
      id: "m13-11-p", badge: "ROOK LIFT",
      fen: "4k3/8/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Rd4 — rook on rank 4!",
      hint: "Lift to d4.",
      goal: { kind: "move", from: "d1", to: "d4" },
      highlightFrom: "d1", highlightTo: "d4",
    },
    challenge: {
      id: "m13-11-c", badge: "ROOK LIFT",
      fen: "4k3/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Re6+ — lifted rook checks!",
      hint: "Climb to e6.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
  },

  // 12. BOSS — Architect's Blueprint
  12: {
    lesson: {
      id: "m13-12-l", badge: "BOSS",
      fen: "4k3/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Boss 1 — Re7+ on the 7th rank!",
      hint: "Rook to e7.",
      goal: { kind: "move", from: "e1", to: "e7" },
      highlightFrom: "e1", highlightTo: "e7",
    },
    puzzle: {
      id: "m13-12-p", badge: "BOSS",
      fen: "4k3/8/8/8/4N3/8/8/4K3 w - - 0 1",
      prompt: "Boss 2 — Nd6+ outpost!",
      hint: "Knight to d6.",
      goal: { kind: "move", from: "e4", to: "d6" },
      highlightFrom: "e4", highlightTo: "d6",
    },
    challenge: {
      id: "m13-12-c", badge: "BOSS",
      fen: "4k3/8/8/8/8/8/8/B3K3 w - - 0 1",
      prompt: "Boss finale — Bh8 long diagonal!",
      hint: "Bishop sweeps a1-h8.",
      goal: { kind: "move", from: "a1", to: "h8" },
      highlightFrom: "a1", highlightTo: "h8",
    },
  },
};
