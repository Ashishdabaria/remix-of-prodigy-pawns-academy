// Module 2 — Farmer & Piggies: per-node interactive tasks.
// Each node has a Lesson, a Puzzle, and a Challenge — all single-move
// pawn tasks playable on the flexible FarmBoard.

import type { FarmTask } from "@/components/realm/FarmBoard";

export interface NodeTasks {
  lesson: FarmTask;
  puzzle: FarmTask;
  challenge: FarmTask;
}

export const MODULE2_TASKS: Record<number, NodeTasks> = {
  // 1. Pawn Push — pawns step forward one square
  1: {
    lesson: {
      id: "m2-1-l",
      fen: "4k3/8/8/8/8/8/4P3/4K3 w - - 0 1",
      prompt: "Drag the pawn one square forward.",
      hint: "Pull the white pawn from e2 up to e3.",
      goal: { kind: "any-pawn-move" },
      highlightFrom: "e2",
    },
    puzzle: {
      id: "m2-1-p",
      fen: "4k3/8/8/8/8/8/3P4/4K3 w - - 0 1",
      prompt: "Push the d-pawn one square.",
      hint: "From d2 up to d3.",
      goal: { kind: "reach", square: "d3" },
      highlightFrom: "d2",
      highlightTo: "d3",
    },
    challenge: {
      id: "m2-1-c",
      fen: "4k3/8/8/8/8/8/2P5/4K3 w - - 0 1",
      prompt: "Push the c-pawn to c3.",
      hint: "Step the pawn from c2 to c3.",
      goal: { kind: "reach", square: "c3" },
      highlightFrom: "c2",
      highlightTo: "c3",
    },
  },

  // 2. Two-Square Start — first move can leap two squares
  2: {
    lesson: {
      id: "m2-2-l",
      fen: "4k3/8/8/8/8/8/4P3/4K3 w - - 0 1",
      prompt: "Use the two-square leap — move to e4!",
      hint: "On its very first move, a pawn can jump two squares.",
      goal: { kind: "reach", square: "e4" },
      highlightFrom: "e2",
      highlightTo: "e4",
    },
    puzzle: {
      id: "m2-2-p",
      fen: "4k3/8/8/8/8/8/3P4/4K3 w - - 0 1",
      prompt: "Two-square push to d4.",
      hint: "From d2 leap to d4.",
      goal: { kind: "reach", square: "d4" },
      highlightFrom: "d2",
      highlightTo: "d4",
    },
    challenge: {
      id: "m2-2-c",
      fen: "4k3/8/8/8/8/8/P7/4K3 w - - 0 1",
      prompt: "Race the a-pawn to a4 in one move!",
      hint: "Two-square leap from a2.",
      goal: { kind: "reach", square: "a4" },
      highlightFrom: "a2",
      highlightTo: "a4",
    },
  },

  // 3. Diagonal Snack — pawns capture one square diagonally
  3: {
    lesson: {
      id: "m2-3-l",
      fen: "4k3/8/8/3p4/4P3/8/8/4K3 w - - 0 1",
      prompt: "Snack the black pawn diagonally!",
      hint: "Capture from e4 to d5.",
      goal: { kind: "capture", target: "d5" },
      highlightFrom: "e4",
      highlightTo: "d5",
    },
    puzzle: {
      id: "m2-3-p",
      fen: "4k3/8/8/5p2/4P3/8/8/4K3 w - - 0 1",
      prompt: "Capture diagonally to the right.",
      hint: "e4 takes f5.",
      goal: { kind: "capture", target: "f5" },
      highlightFrom: "e4",
      highlightTo: "f5",
    },
    challenge: {
      id: "m2-3-c",
      fen: "4k3/8/8/2p1p3/3P4/8/8/4K3 w - - 0 1",
      prompt: "Two snacks possible — grab the c-pawn!",
      hint: "From d4, capture to c5.",
      goal: { kind: "capture", target: "c5" },
      highlightFrom: "d4",
      highlightTo: "c5",
    },
  },

  // 4. Pawn Chain — pawns defending each other
  4: {
    lesson: {
      id: "m2-4-l",
      fen: "4k3/8/8/8/8/1P6/2P5/4K3 w - - 0 1",
      prompt: "Extend the chain — push d2 to d3!",
      hint: "Pawns protect each other diagonally.",
      goal: { kind: "any-pawn-move" },
      highlightFrom: "b3",
    },
    puzzle: {
      id: "m2-4-p",
      fen: "4k3/8/8/8/8/2P5/3P4/4K3 w - - 0 1",
      prompt: "Build the chain — move d2 to d3.",
      hint: "Now d3 protects c3 and c3 protects d3.",
      goal: { kind: "reach", square: "d3" },
      highlightFrom: "d2",
      highlightTo: "d3",
    },
    challenge: {
      id: "m2-4-c",
      fen: "4k3/8/8/8/8/3P4/4P3/4K3 w - - 0 1",
      prompt: "Add a link — push e2 to e3.",
      hint: "e3 will defend d3.",
      goal: { kind: "reach", square: "e3" },
      highlightFrom: "e2",
      highlightTo: "e3",
    },
  },

  // 5. En Passant Magic — special pawn capture
  5: {
    lesson: {
      id: "m2-5-l",
      fen: "4k3/8/8/3pP3/8/8/8/4K3 w - d6 0 1",
      prompt: "Magic capture! Take the d-pawn en passant.",
      hint: "Move your e5 pawn diagonally to d6 — it captures the d5 pawn!",
      goal: { kind: "enpassant", target: "d6" },
      highlightFrom: "e5",
      highlightTo: "d6",
    },
    puzzle: {
      id: "m2-5-p",
      fen: "4k3/8/8/4Pp2/8/8/8/4K3 w - f6 0 1",
      prompt: "En passant to f6.",
      hint: "e5 captures diagonally to f6.",
      goal: { kind: "enpassant", target: "f6" },
      highlightFrom: "e5",
      highlightTo: "f6",
    },
    challenge: {
      id: "m2-5-c",
      fen: "4k3/8/8/2pP4/8/8/8/4K3 w - c6 0 1",
      prompt: "Spot the en passant — capture to c6!",
      hint: "d5 pawn takes diagonally to c6.",
      goal: { kind: "enpassant", target: "c6" },
      highlightFrom: "d5",
      highlightTo: "c6",
    },
  },

  // 6. Promotion Day — pawn reaches the 8th rank!
  6: {
    lesson: {
      id: "m2-6-l",
      fen: "4k3/P7/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Push to a8 and crown your Queen! 👑",
      hint: "Move the a7 pawn to a8 — it becomes a Queen!",
      goal: { kind: "promote", to: "q" },
      highlightFrom: "a7",
      highlightTo: "a8",
    },
    puzzle: {
      id: "m2-6-p",
      fen: "4k3/4P3/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Promote on e8!",
      hint: "Drag e7 to e8.",
      goal: { kind: "promote", to: "q" },
      highlightFrom: "e7",
      highlightTo: "e8",
    },
    challenge: {
      id: "m2-6-c",
      fen: "4k3/7P/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Race to h8 — make a new Queen!",
      hint: "h7 to h8.",
      goal: { kind: "promote", to: "q" },
      highlightFrom: "h7",
      highlightTo: "h8",
    },
  },

  // 7. Eat the Snack (vs Pinky Piggy) — pawn captures a juicy piece
  7: {
    lesson: {
      id: "m2-7-l",
      fen: "4k3/8/3n4/4P3/8/8/8/4K3 w - - 0 1",
      prompt: "Pinky left a knight on d6 — snack time!",
      hint: "Pawn e5 captures diagonally to d6.",
      goal: { kind: "capture", target: "d6" },
      highlightFrom: "e5",
      highlightTo: "d6",
    },
    puzzle: {
      id: "m2-7-p",
      fen: "4k3/8/5b2/4P3/8/8/8/4K3 w - - 0 1",
      prompt: "Capture the bishop!",
      hint: "e5 takes f6.",
      goal: { kind: "capture", target: "f6" },
      highlightFrom: "e5",
      highlightTo: "f6",
    },
    challenge: {
      id: "m2-7-c",
      fen: "4k3/8/2q5/3P4/8/8/8/4K3 w - - 0 1",
      prompt: "Pinky's QUEEN is hanging! Munch it!",
      hint: "Pawn d5 captures diagonally to c6.",
      goal: { kind: "capture", target: "c6" },
      highlightFrom: "d5",
      highlightTo: "c6",
    },
  },

  // 8. Race to Barn 1 — push pawn deep into enemy territory
  8: {
    lesson: {
      id: "m2-8-l",
      fen: "4k3/8/8/8/4P3/8/8/4K3 w - - 0 1",
      prompt: "Push your scout to e5!",
      hint: "Single step from e4 to e5.",
      goal: { kind: "reach", square: "e5" },
      highlightFrom: "e4",
      highlightTo: "e5",
    },
    puzzle: {
      id: "m2-8-p",
      fen: "4k3/8/8/4P3/8/8/8/4K3 w - - 0 1",
      prompt: "March to e6!",
      hint: "e5 steps to e6.",
      goal: { kind: "reach", square: "e6" },
      highlightFrom: "e5",
      highlightTo: "e6",
    },
    challenge: {
      id: "m2-8-c",
      fen: "4k3/8/4P3/8/8/8/8/4K3 w - - 0 1",
      prompt: "Almost at the barn — reach e7!",
      hint: "e6 to e7 — one step from promotion.",
      goal: { kind: "reach", square: "e7" },
      highlightFrom: "e6",
      highlightTo: "e7",
    },
  },

  // 9. En Passant Catch — repeat the magic
  9: {
    lesson: {
      id: "m2-9-l",
      fen: "4k3/8/8/3pP3/8/8/8/4K3 w - d6 0 1",
      prompt: "There's the en passant window — grab d6!",
      hint: "e5 takes d6 en passant.",
      goal: { kind: "enpassant", target: "d6" },
      highlightFrom: "e5",
      highlightTo: "d6",
    },
    puzzle: {
      id: "m2-9-p",
      fen: "4k3/8/8/1pP5/8/8/8/4K3 w - b6 0 1",
      prompt: "Magic capture to b6!",
      hint: "c5 takes b6 en passant.",
      goal: { kind: "enpassant", target: "b6" },
      highlightFrom: "c5",
      highlightTo: "b6",
    },
    challenge: {
      id: "m2-9-c",
      fen: "4k3/8/8/4Pp2/8/8/8/4K3 w - f6 0 1",
      prompt: "Last chance — en passant to f6!",
      hint: "e5 takes diagonally to f6.",
      goal: { kind: "enpassant", target: "f6" },
      highlightFrom: "e5",
      highlightTo: "f6",
    },
  },

  // 10. Promote Now — make a fresh Queen
  10: {
    lesson: {
      id: "m2-10-l",
      fen: "4k3/3P4/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Promote on d8 — pick Queen!",
      hint: "d7 to d8 = Queen (the strongest!).",
      goal: { kind: "promote", to: "q" },
      highlightFrom: "d7",
      highlightTo: "d8",
    },
    puzzle: {
      id: "m2-10-p",
      fen: "4k3/2P5/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Crown your Queen on c8!",
      hint: "c7 to c8.",
      goal: { kind: "promote", to: "q" },
      highlightFrom: "c7",
      highlightTo: "c8",
    },
    challenge: {
      id: "m2-10-c",
      fen: "4k3/1P6/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Promote on b8 — a brand-new Queen!",
      hint: "b7 to b8.",
      goal: { kind: "promote", to: "q" },
      highlightFrom: "b7",
      highlightTo: "b8",
    },
  },

  // 11. Pawn Wars Mini (vs Farmer Fenn) — first to promote
  11: {
    lesson: {
      id: "m2-11-l",
      fen: "4k3/6P1/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Promote on g8 to win the race!",
      hint: "g7 leaps to g8 = Queen.",
      goal: { kind: "promote", to: "q" },
      highlightFrom: "g7",
      highlightTo: "g8",
    },
    puzzle: {
      id: "m2-11-p",
      fen: "4k3/5P2/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Race to f8 — promote first!",
      hint: "f7 to f8.",
      goal: { kind: "promote", to: "q" },
      highlightFrom: "f7",
      highlightTo: "f8",
    },
    challenge: {
      id: "m2-11-c",
      fen: "4k3/P7/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Beat Farmer Fenn — promote on a8!",
      hint: "a7 to a8.",
      goal: { kind: "promote", to: "q" },
      highlightFrom: "a7",
      highlightTo: "a8",
    },
  },
};
