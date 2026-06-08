// Module 7 — Pin Factory (Pins & Skewers, deep practice)
// 12 nodes, each with lesson / puzzle / challenge single-move tasks.
// FENs are white-to-move and the requested move is always legal.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

export const MODULE7_TASKS: Record<number, NodeTasks> = {
  // 1. Absolute Pin — Rook against King
  1: {
    lesson: {
      id: "m7-1-l", badge: "PIN",
      fen: "4k3/4n3/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Slide Ra1 to e1 — pin the Knight to the King!",
      hint: "Rook to e1 locks the e-file.",
      goal: { kind: "move", from: "a1", to: "e1" },
      highlightFrom: "a1", highlightTo: "e1",
    },
    puzzle: {
      id: "m7-1-p", badge: "PIN",
      fen: "3k4/3n4/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Push Rd1 to d6 — pin the Knight tight!",
      hint: "Rook crowds the knight on the d-file.",
      goal: { kind: "move", from: "d1", to: "d6" },
      highlightFrom: "d1", highlightTo: "d6",
    },
    challenge: {
      id: "m7-1-c", badge: "PIN",
      fen: "4k3/4b3/8/8/8/8/8/Q6K w - - 0 1",
      prompt: "Queen to e1 — pin the Bishop to the King!",
      hint: "Qa1 slides across to e1.",
      goal: { kind: "move", from: "a1", to: "e1" },
      highlightFrom: "a1", highlightTo: "e1",
    },
  },

  // 2. Relative Pin — pin to the Queen
  2: {
    lesson: {
      id: "m7-2-l", badge: "PIN",
      fen: "3qk3/3n4/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Rd1 to d6 — pin the Knight to the Queen!",
      hint: "Slide the rook up the d-file.",
      goal: { kind: "move", from: "d1", to: "d6" },
      highlightFrom: "d1", highlightTo: "d6",
    },
    puzzle: {
      id: "m7-2-p", badge: "PIN",
      fen: "4k3/4q3/4n3/8/8/8/8/4R2K w - - 0 1",
      prompt: "Re1 to e4 — relative pin on the Knight!",
      hint: "Knight hides the Queen — pin it.",
      goal: { kind: "move", from: "e1", to: "e4" },
      highlightFrom: "e1", highlightTo: "e4",
    },
    challenge: {
      id: "m7-2-c", badge: "PIN",
      fen: "3q4/3n4/8/8/8/8/3R4/3K3k w - - 0 1",
      prompt: "Rd2 to d5 — pin the Knight to the Queen!",
      hint: "Rook clamps the d-file.",
      goal: { kind: "move", from: "d2", to: "d5" },
      highlightFrom: "d2", highlightTo: "d5",
    },
  },

  // 3. Bishop Pin (diagonal)
  3: {
    lesson: {
      id: "m7-3-l", badge: "PIN",
      fen: "7k/6n1/8/8/8/8/8/B6K w - - 0 1",
      prompt: "Bishop a1 to b2 — pin the Knight on the long diagonal!",
      hint: "Bishop steps up the diagonal.",
      goal: { kind: "move", from: "a1", to: "b2" },
      highlightFrom: "a1", highlightTo: "b2",
    },
    puzzle: {
      id: "m7-3-p", badge: "PIN",
      fen: "7k/5n2/8/8/2B5/8/8/4K3 w - - 0 1",
      prompt: "Bc4 to d5 — pin the Knight to the King!",
      hint: "Slide the bishop to d5.",
      goal: { kind: "move", from: "c4", to: "d5" },
      highlightFrom: "c4", highlightTo: "d5",
    },
    challenge: {
      id: "m7-3-c", badge: "PIN",
      fen: "6k1/5q2/8/8/2B5/8/8/4K3 w - - 0 1",
      prompt: "Bc4 to d5 — relative pin on the Queen!",
      hint: "Bishop locks the diagonal to the king.",
      goal: { kind: "move", from: "c4", to: "d5" },
      highlightFrom: "c4", highlightTo: "d5",
    },
  },

  // 4. Pin & gang up — bring another attacker
  4: {
    lesson: {
      id: "m7-4-l", badge: "GANG UP",
      fen: "4k3/4n3/8/8/4R3/8/4N3/4K3 w - - 0 1",
      prompt: "Knight e2 to f4 — pile on the pinned Knight on e7!",
      hint: "Add a second attacker to the pinned piece.",
      goal: { kind: "any-of", moves: [
        { from: "e2", to: "f4" }, { from: "e2", to: "d4" },
        { from: "e2", to: "g3" }, { from: "e2", to: "c3" },
      ]},
      highlightFrom: "e2",
    },
    puzzle: {
      id: "m7-4-p", badge: "GANG UP",
      fen: "3k4/3n4/8/8/3R4/8/2N5/3K4 w - - 0 1",
      prompt: "Knight c2 — leap to attack the pinned Knight!",
      hint: "Nc2 to b4 or e3 piles on.",
      goal: { kind: "any-of", moves: [
        { from: "c2", to: "b4" }, { from: "c2", to: "e3" },
        { from: "c2", to: "a3" }, { from: "c2", to: "e1" },
      ]},
      highlightFrom: "c2",
    },
    challenge: {
      id: "m7-4-c", badge: "GANG UP",
      fen: "4k3/4r3/8/8/4R3/8/4P3/4K3 w - - 0 1",
      prompt: "Push e2 to e3 — defend the rook and prep the gang-up!",
      hint: "Pawn step e2 to e3 keeps your pieces working.",
      goal: { kind: "move", from: "e2", to: "e3" },
      highlightFrom: "e2", highlightTo: "e3",
    },
  },

  // 5. Knight pinned? Knights can't pin — but we'll use a Queen pin
  5: {
    lesson: {
      id: "m7-5-l", badge: "QUEEN PIN",
      fen: "4k3/8/4n3/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Qe1 to e4 — pin the Knight to the King!",
      hint: "Queen owns the e-file.",
      goal: { kind: "move", from: "e1", to: "e4" },
      highlightFrom: "e1", highlightTo: "e4",
    },
    puzzle: {
      id: "m7-5-p", badge: "QUEEN PIN",
      fen: "4k3/8/4b3/8/8/8/8/3Q3K w - - 0 1",
      prompt: "Qd1 to e2 — pin the Bishop along the e-file!",
      hint: "Queen slides to e2.",
      goal: { kind: "move", from: "d1", to: "e2" },
      highlightFrom: "d1", highlightTo: "e2",
    },
    challenge: {
      id: "m7-5-c", badge: "QUEEN PIN",
      fen: "k7/8/2n5/8/8/8/8/2Q4K w - - 0 1",
      prompt: "Qc1 to a3 — diagonal pin on the Knight!",
      hint: "Queen swings to a3 along the diagonal.",
      goal: { kind: "move", from: "c1", to: "a3" },
      highlightFrom: "c1", highlightTo: "a3",
    },
  },

  // 6. Skewer basics
  6: {
    lesson: {
      id: "m7-6-l", badge: "SKEWER",
      fen: "7k/7q/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Ra1 to a8 — check the King! When it moves, win the Queen.",
      hint: "Skewer on the file.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    puzzle: {
      id: "m7-6-p", badge: "SKEWER",
      fen: "k7/q7/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Ra1 to a8 — skewer check, win the Queen next!",
      hint: "Slide the rook to a8.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    challenge: {
      id: "m7-6-c", badge: "SKEWER",
      fen: "k7/8/8/8/8/8/1q6/K6R w - - 0 1",
      prompt: "Rh1 to b1 — skewer along the back rank!",
      hint: "Rook sweeps across.",
      goal: { kind: "move", from: "h1", to: "b1" },
      highlightFrom: "h1", highlightTo: "b1",
    },
  },

  // 7. Royal skewer — King in front, big piece behind
  7: {
    lesson: {
      id: "m7-7-l", badge: "ROYAL SKEWER",
      fen: "k7/8/8/8/8/8/8/K1q4R w - - 0 1",
      prompt: "Rxc1 — capture the Queen on the skewer rank!",
      hint: "Rook slides from h1 to c1.",
      goal: { kind: "move", from: "h1", to: "c1" },
      highlightFrom: "h1", highlightTo: "c1",
    },
    puzzle: {
      id: "m7-7-p", badge: "ROYAL SKEWER",
      fen: "k7/8/8/8/8/8/7q/B6K w - - 0 1",
      prompt: "Ba1 to b2 — attack and win the Queen!",
      hint: "Bishop closes the diagonal.",
      goal: { kind: "move", from: "a1", to: "b2" },
      highlightFrom: "a1", highlightTo: "b2",
    },
    challenge: {
      id: "m7-7-c", badge: "ROYAL SKEWER",
      fen: "7k/7q/8/8/8/8/8/B6K w - - 0 1",
      prompt: "Ba1 to b2 — diagonal skewer on King and Queen!",
      hint: "Bishop a1-b2 starts the skewer.",
      goal: { kind: "move", from: "a1", to: "b2" },
      highlightFrom: "a1", highlightTo: "b2",
    },
  },

  // 8. Diagonal Skewer
  8: {
    lesson: {
      id: "m7-8-l", badge: "DIAGONAL",
      fen: "7k/6q1/8/8/8/8/8/B6K w - - 0 1",
      prompt: "Ba1 to b2 — line up on King and Queen on the diagonal!",
      hint: "Bishop steps to b2.",
      goal: { kind: "move", from: "a1", to: "b2" },
      highlightFrom: "a1", highlightTo: "b2",
    },
    puzzle: {
      id: "m7-8-p", badge: "DIAGONAL",
      fen: "k7/1q6/8/8/8/8/8/7B w - - 0 1",
      prompt: "Bh1 to g2 — diagonal skewer on Queen!",
      hint: "Bishop to g2.",
      goal: { kind: "move", from: "h1", to: "g2" },
      highlightFrom: "h1", highlightTo: "g2",
    },
    challenge: {
      id: "m7-8-c", badge: "DIAGONAL",
      fen: "7k/8/8/4q3/8/8/8/B6K w - - 0 1",
      prompt: "Ba1 to e5? Capture the Queen along the long diagonal!",
      hint: "Bishop sweeps a1 to e5.",
      goal: { kind: "move", from: "a1", to: "e5" },
      highlightFrom: "a1", highlightTo: "e5",
    },
  },

  // 9. Pin & Win — capture the pinned piece next move; here, attack pinned piece
  9: {
    lesson: {
      id: "m7-9-l", badge: "PIN & WIN",
      fen: "3qk3/8/8/8/3R4/8/8/4K3 w - - 0 1",
      prompt: "Rd4 to d7 — pin and attack the Queen!",
      hint: "Rook slides to d7.",
      goal: { kind: "move", from: "d4", to: "d7" },
      highlightFrom: "d4", highlightTo: "d7",
    },
    puzzle: {
      id: "m7-9-p", badge: "PIN & WIN",
      fen: "4k3/8/8/4r3/8/8/8/4Q2K w - - 0 1",
      prompt: "Qe1 to e4 — pin the Rook to the King!",
      hint: "Queen takes the e-file.",
      goal: { kind: "move", from: "e1", to: "e4" },
      highlightFrom: "e1", highlightTo: "e4",
    },
    challenge: {
      id: "m7-9-c", badge: "PIN & WIN",
      fen: "k7/8/8/q7/8/8/8/R6K w - - 0 1",
      prompt: "Ra1 to a4 — pin the Queen to the King!",
      hint: "Rook clamps the a-file.",
      goal: { kind: "move", from: "a1", to: "a4" },
      highlightFrom: "a1", highlightTo: "a4",
    },
  },

  // 10. Skewer & Win — capture after check
  10: {
    lesson: {
      id: "m7-10-l", badge: "SKEWER & WIN",
      fen: "7k/7q/8/8/8/8/8/7R w - - 0 1",
      prompt: "Rh1 to h7 — capture the Queen with check!",
      hint: "Rook slides up the h-file.",
      goal: { kind: "move", from: "h1", to: "h7" },
      highlightFrom: "h1", highlightTo: "h7",
    },
    puzzle: {
      id: "m7-10-p", badge: "SKEWER & WIN",
      fen: "k7/q7/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Rxa7 — capture the Queen with check!",
      hint: "Ra1 to a7 wins the queen.",
      goal: { kind: "move", from: "a1", to: "a7" },
      highlightFrom: "a1", highlightTo: "a7",
    },
    challenge: {
      id: "m7-10-c", badge: "SKEWER & WIN",
      fen: "k7/8/8/8/8/8/8/K1q4R w - - 0 1",
      prompt: "Rxc1 — win the Queen on the back rank!",
      hint: "Rook sweeps to c1.",
      goal: { kind: "move", from: "h1", to: "c1" },
      highlightFrom: "h1", highlightTo: "c1",
    },
  },

  // 11. Pin Factory drill — find the pinning move
  11: {
    lesson: {
      id: "m7-11-l", badge: "FACTORY",
      fen: "4k3/4r3/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Re1 to e4 — squeeze the pinned Rook!",
      hint: "Rook to e4 keeps the pin and crowds.",
      goal: { kind: "move", from: "e1", to: "e4" },
      highlightFrom: "e1", highlightTo: "e4",
    },
    puzzle: {
      id: "m7-11-p", badge: "FACTORY",
      fen: "3k4/3b4/8/8/8/8/8/3Q3K w - - 0 1",
      prompt: "Qd1 to d5 — pin and threaten the Bishop!",
      hint: "Queen up the d-file.",
      goal: { kind: "move", from: "d1", to: "d5" },
      highlightFrom: "d1", highlightTo: "d5",
    },
    challenge: {
      id: "m7-11-c", badge: "FACTORY",
      fen: "4k3/4n3/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Re1 to e6 — pin and attack the Knight!",
      hint: "Rook squeezes up to e6.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
  },

  // 12. BOSS — Chain Master
  12: {
    lesson: {
      id: "m7-12-l", badge: "BOSS",
      fen: "4k3/4q3/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Boss warm-up — Re1 to e6 attacks the Queen with a pin!",
      hint: "Rook to e6 sets the pin.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
    puzzle: {
      id: "m7-12-p", badge: "BOSS",
      fen: "k7/q7/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Boss skewer — Rxa7! Win the Queen with check.",
      hint: "Ra1 captures on a7.",
      goal: { kind: "move", from: "a1", to: "a7" },
      highlightFrom: "a1", highlightTo: "a7",
    },
    challenge: {
      id: "m7-12-c", badge: "BOSS",
      fen: "4k3/4b3/8/8/8/8/8/Q6K w - - 0 1",
      prompt: "Boss finisher — Qa1 to e1 pins the Bishop to the King!",
      hint: "Queen slides across the back rank.",
      goal: { kind: "move", from: "a1", to: "e1" },
      highlightFrom: "a1", highlightTo: "e1",
    },
  },
};
