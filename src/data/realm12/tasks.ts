// Module 12 — Endgame Mastery: Passed Pawns & King Activity (Endgame Desert)
// 12 nodes: passed pawns, key squares, opposition, Lucena & Philidor basics.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

export const MODULE12_TASKS: Record<number, NodeTasks> = {
  // 1. Promote the pawn — march to the crown
  1: {
    lesson: {
      id: "m12-1-l", badge: "PROMOTE",
      fen: "4k3/P7/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Promote! a8=Q crowns your pawn!",
      hint: "Push to the 8th rank.",
      goal: { kind: "move", from: "a7", to: "a8" },
      highlightFrom: "a7", highlightTo: "a8",
    },
    puzzle: {
      id: "m12-1-p", badge: "PROMOTE",
      fen: "4k3/3P4/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "d8=Q with check — crown and check!",
      hint: "Push d7 to d8.",
      goal: { kind: "move", from: "d7", to: "d8" },
      highlightFrom: "d7", highlightTo: "d8",
    },
    challenge: {
      id: "m12-1-c", badge: "PROMOTE",
      fen: "4k3/7P/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "h8=Q — promote to a queen!",
      hint: "Pawn h7 to h8.",
      goal: { kind: "move", from: "h7", to: "h8" },
      highlightFrom: "h7", highlightTo: "h8",
    },
  },

  // 2. King activity — march your king up
  2: {
    lesson: {
      id: "m12-2-l", badge: "KING MARCH",
      fen: "4k3/8/8/8/8/8/4K3/8 w - - 0 1",
      prompt: "Endgame! March the king up — Ke3.",
      hint: "King steps to e3.",
      goal: { kind: "move", from: "e2", to: "e3" },
      highlightFrom: "e2", highlightTo: "e3",
    },
    puzzle: {
      id: "m12-2-p", badge: "KING MARCH",
      fen: "4k3/8/8/8/8/4K3/8/8 w - - 0 1",
      prompt: "Step up — Ke4!",
      hint: "King forward one square.",
      goal: { kind: "move", from: "e3", to: "e4" },
      highlightFrom: "e3", highlightTo: "e4",
    },
    challenge: {
      id: "m12-2-c", badge: "KING MARCH",
      fen: "4k3/8/8/8/4K3/8/8/8 w - - 0 1",
      prompt: "Ke5 — claim the center!",
      hint: "King to the heart of the board.",
      goal: { kind: "move", from: "e4", to: "e5" },
      highlightFrom: "e4", highlightTo: "e5",
    },
  },

  // 3. Opposition — face off
  3: {
    lesson: {
      id: "m12-3-l", badge: "OPPOSITION",
      fen: "4k3/8/8/8/8/8/8/3K4 w - - 0 1",
      prompt: "Take the opposition — Ke2!",
      hint: "Move toward the enemy king.",
      goal: { kind: "move", from: "d1", to: "e2" },
      highlightFrom: "d1", highlightTo: "e2",
    },
    puzzle: {
      id: "m12-3-p", badge: "OPPOSITION",
      fen: "4k3/8/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Ke2 — step toward the king!",
      hint: "Direct opposition march.",
      goal: { kind: "move", from: "e1", to: "e2" },
      highlightFrom: "e1", highlightTo: "e2",
    },
    challenge: {
      id: "m12-3-c", badge: "OPPOSITION",
      fen: "4k3/8/8/8/8/8/4K3/8 w - - 0 1",
      prompt: "Ke3 — push the king back!",
      hint: "Same file — opposition.",
      goal: { kind: "move", from: "e2", to: "e3" },
      highlightFrom: "e2", highlightTo: "e3",
    },
  },

  // 4. Passed pawn — push it!
  4: {
    lesson: {
      id: "m12-4-l", badge: "PASSED PAWN",
      fen: "4k3/8/8/3P4/8/8/8/4K3 w - - 0 1",
      prompt: "Passed pawn! Push d5→d6!",
      hint: "Nothing stops this pawn.",
      goal: { kind: "move", from: "d5", to: "d6" },
      highlightFrom: "d5", highlightTo: "d6",
    },
    puzzle: {
      id: "m12-4-p", badge: "PASSED PAWN",
      fen: "4k3/8/8/8/3P4/8/8/4K3 w - - 0 1",
      prompt: "d4→d5 — march toward the crown!",
      hint: "Push the passed pawn.",
      goal: { kind: "move", from: "d4", to: "d5" },
      highlightFrom: "d4", highlightTo: "d5",
    },
    challenge: {
      id: "m12-4-c", badge: "PASSED PAWN",
      fen: "4k3/8/3P4/8/8/8/8/4K3 w - - 0 1",
      prompt: "d6→d7 — almost there!",
      hint: "One step from promotion.",
      goal: { kind: "move", from: "d6", to: "d7" },
      highlightFrom: "d6", highlightTo: "d7",
    },
  },

  // 5. King escorts the pawn
  5: {
    lesson: {
      id: "m12-5-l", badge: "ESCORT",
      fen: "4k3/8/8/3P4/3K4/8/8/8 w - - 0 1",
      prompt: "Push the pawn — d6!",
      hint: "King guards from behind.",
      goal: { kind: "move", from: "d5", to: "d6" },
      highlightFrom: "d5", highlightTo: "d6",
    },
    puzzle: {
      id: "m12-5-p", badge: "ESCORT",
      fen: "4k3/8/3P4/3K4/8/8/8/8 w - - 0 1",
      prompt: "d7 — escort the pawn home!",
      hint: "One step closer.",
      goal: { kind: "move", from: "d6", to: "d7" },
      highlightFrom: "d6", highlightTo: "d7",
    },
    challenge: {
      id: "m12-5-c", badge: "ESCORT",
      fen: "4k3/3P4/3K4/8/8/8/8/8 w - - 0 1",
      prompt: "d8=Q — promote with king support!",
      hint: "Crown the pawn!",
      goal: { kind: "move", from: "d7", to: "d8" },
      highlightFrom: "d7", highlightTo: "d8",
    },
  },

  // 6. Lucena setup — promote with a rook
  6: {
    lesson: {
      id: "m12-6-l", badge: "LUCENA",
      fen: "4k3/3P4/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Crown it — d8=Q!",
      hint: "Pawn becomes a queen.",
      goal: { kind: "move", from: "d7", to: "d8" },
      highlightFrom: "d7", highlightTo: "d8",
    },
    puzzle: {
      id: "m12-6-p", badge: "LUCENA",
      fen: "4k3/P7/8/8/8/8/8/R6K w - - 0 1",
      prompt: "a8=Q — rook supports the promotion!",
      hint: "Pawn to a8.",
      goal: { kind: "move", from: "a7", to: "a8" },
      highlightFrom: "a7", highlightTo: "a8",
    },
    challenge: {
      id: "m12-6-c", badge: "LUCENA",
      fen: "4k3/7P/8/8/8/8/8/R6K w - - 0 1",
      prompt: "h8=Q — promote with rook backup!",
      hint: "Push to h8.",
      goal: { kind: "move", from: "h7", to: "h8" },
      highlightFrom: "h7", highlightTo: "h8",
    },
  },

  // 7. Pawn race — first to promote
  7: {
    lesson: {
      id: "m12-7-l", badge: "RACE",
      fen: "4k3/8/8/8/8/8/P7/4K3 w - - 0 1",
      prompt: "Race! Push a2→a4 (two squares first move).",
      hint: "Pawn's first move can be 2 squares.",
      goal: { kind: "move", from: "a2", to: "a4" },
      highlightFrom: "a2", highlightTo: "a4",
    },
    puzzle: {
      id: "m12-7-p", badge: "RACE",
      fen: "4k3/8/8/P7/8/8/8/4K3 w - - 0 1",
      prompt: "a6 — keep racing!",
      hint: "March the pawn.",
      goal: { kind: "move", from: "a5", to: "a6" },
      highlightFrom: "a5", highlightTo: "a6",
    },
    challenge: {
      id: "m12-7-c", badge: "RACE",
      fen: "4k3/P7/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "a8=Q — you won the race!",
      hint: "Promote.",
      goal: { kind: "move", from: "a7", to: "a8" },
      highlightFrom: "a7", highlightTo: "a8",
    },
  },

  // 8. Key squares — control them
  8: {
    lesson: {
      id: "m12-8-l", badge: "KEY SQUARE",
      fen: "4k3/8/8/8/3P4/3K4/8/8 w - - 0 1",
      prompt: "King to d5 — key square!",
      hint: "King leads the pawn.",
      goal: { kind: "move", from: "d3", to: "d4" },
      highlightFrom: "d3", highlightTo: "d4",
    },
    puzzle: {
      id: "m12-8-p", badge: "KEY SQUARE",
      fen: "4k3/8/8/3K4/3P4/8/8/8 w - - 0 1",
      prompt: "King in front — Kd6 controls the key square!",
      hint: "Step up to d6.",
      goal: { kind: "move", from: "d5", to: "d6" },
      highlightFrom: "d5", highlightTo: "d6",
    },
    challenge: {
      id: "m12-8-c", badge: "KEY SQUARE",
      fen: "4k3/8/3K4/3P4/8/8/8/8 w - - 0 1",
      prompt: "Kd7 — clear the way to promote!",
      hint: "King to d7.",
      goal: { kind: "move", from: "d6", to: "d7" },
      highlightFrom: "d6", highlightTo: "d7",
    },
  },

  // 9. Philidor — defensive third rank
  9: {
    lesson: {
      id: "m12-9-l", badge: "PHILIDOR",
      fen: "4k3/8/8/8/8/3r4/8/3K3R w - - 0 1",
      prompt: "Trade rooks — Rxd3+!",
      hint: "Take the rook with check.",
      goal: { kind: "move", from: "h1", to: "d1" },
      highlightFrom: "h1", highlightTo: "d1",
    },
    puzzle: {
      id: "m12-9-p", badge: "PHILIDOR",
      fen: "4k3/8/8/8/3r4/8/8/3R3K w - - 0 1",
      prompt: "Rxd4 — clean rook trade!",
      hint: "Take the rook.",
      goal: { kind: "move", from: "d1", to: "d4" },
      highlightFrom: "d1", highlightTo: "d4",
    },
    challenge: {
      id: "m12-9-c", badge: "PHILIDOR",
      fen: "4k3/8/3r4/8/8/8/8/3R3K w - - 0 1",
      prompt: "Rxd6 — Philidor defense busted!",
      hint: "Take the rook on d6.",
      goal: { kind: "move", from: "d1", to: "d6" },
      highlightFrom: "d1", highlightTo: "d6",
    },
  },

  // 10. Treasure — promote in style
  10: {
    lesson: {
      id: "m12-10-l", badge: "TREASURE",
      fen: "4k3/3P4/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Treasure! d8=Q+ — promote with check!",
      hint: "Crown the pawn.",
      goal: { kind: "move", from: "d7", to: "d8" },
      highlightFrom: "d7", highlightTo: "d8",
    },
    puzzle: {
      id: "m12-10-p", badge: "TREASURE",
      fen: "4k3/P7/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "a8=Q — the treasure crown!",
      hint: "Push to the 8th rank.",
      goal: { kind: "move", from: "a7", to: "a8" },
      highlightFrom: "a7", highlightTo: "a8",
    },
    challenge: {
      id: "m12-10-c", badge: "TREASURE",
      fen: "4k3/5P2/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "f8=Q+ — promote with check!",
      hint: "Pawn f7 to f8.",
      goal: { kind: "move", from: "f7", to: "f8" },
      highlightFrom: "f7", highlightTo: "f8",
    },
  },

  // 11. King + pawn vs king finish
  11: {
    lesson: {
      id: "m12-11-l", badge: "FINISH",
      fen: "4k3/8/3K4/3P4/8/8/8/8 w - - 0 1",
      prompt: "Push! d6 — pawn marches!",
      hint: "Pawn forward.",
      goal: { kind: "move", from: "d5", to: "d6" },
      highlightFrom: "d5", highlightTo: "d6",
    },
    puzzle: {
      id: "m12-11-p", badge: "FINISH",
      fen: "4k3/8/3KP3/8/8/8/8/8 w - - 0 1",
      prompt: "e7 — almost there!",
      hint: "Push the pawn to e7.",
      goal: { kind: "move", from: "e6", to: "e7" },
      highlightFrom: "e6", highlightTo: "e7",
    },
    challenge: {
      id: "m12-11-c", badge: "FINISH",
      fen: "4k3/4P3/3K4/8/8/8/8/8 w - - 0 1",
      prompt: "e8=Q+ — promote and win!",
      hint: "Crown the pawn.",
      goal: { kind: "move", from: "e7", to: "e8" },
      highlightFrom: "e7", highlightTo: "e8",
    },
  },

  // 12. BOSS — Race to the Crown
  12: {
    lesson: {
      id: "m12-12-l", badge: "BOSS",
      fen: "4k3/3P4/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Boss 1 — d8=Q+!",
      hint: "Promote with check.",
      goal: { kind: "move", from: "d7", to: "d8" },
      highlightFrom: "d7", highlightTo: "d8",
    },
    puzzle: {
      id: "m12-12-p", badge: "BOSS",
      fen: "4k3/8/3K4/3P4/8/8/8/8 w - - 0 1",
      prompt: "Boss 2 — Kd7 escorts the pawn!",
      hint: "King to d7.",
      goal: { kind: "move", from: "d6", to: "d7" },
      highlightFrom: "d6", highlightTo: "d7",
    },
    challenge: {
      id: "m12-12-c", badge: "BOSS",
      fen: "4k3/P7/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Boss finale — a8=Q crowns victory!",
      hint: "Promote!",
      goal: { kind: "move", from: "a7", to: "a8" },
      highlightFrom: "a7", highlightTo: "a8",
    },
  },
};
