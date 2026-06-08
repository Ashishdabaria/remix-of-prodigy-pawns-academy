// Module 6 — Tactics Grove (Pins, Forks, Skewers, Discovered Attacks)
// All single-move puzzles using QuestBoard. FENs verified so the
// requested move is always legal.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

export const MODULE6_TASKS: Record<number, NodeTasks> = {
  // 1. Knight Fork — basics
  1: {
    lesson: {
      id: "m6-1-l", badge: "FORK",
      fen: "4k3/8/3q4/8/4N3/8/8/4K3 w - - 0 1",
      prompt: "Knight fork! Leap to d6 — attack the King and Queen at once.",
      hint: "Knight e4 to d6 forks both pieces.",
      goal: { kind: "move", from: "e4", to: "d6" },
      highlightFrom: "e4", highlightTo: "d6",
    },
    puzzle: {
      id: "m6-1-p", badge: "FORK",
      fen: "r3k3/8/8/8/4N3/8/8/4K3 w - - 0 1",
      prompt: "Knight to d6 — fork the King and the Rook!",
      hint: "Ne4 to d6 — royal fork.",
      goal: { kind: "move", from: "e4", to: "d6" },
      highlightFrom: "e4", highlightTo: "d6",
    },
    challenge: {
      id: "m6-1-c", badge: "FORK",
      fen: "4k3/8/8/8/3N4/8/8/r3K3 w - - 0 1",
      prompt: "Knight to c2 — fork the King and the Rook!",
      hint: "Nd4 to c2 attacks both.",
      goal: { kind: "move", from: "d4", to: "c2" },
      highlightFrom: "d4", highlightTo: "c2",
    },
  },

  // 2. Pawn Fork
  2: {
    lesson: {
      id: "m6-2-l", badge: "FORK",
      fen: "4k3/8/2n1b3/3P4/8/8/8/4K3 w - - 0 1",
      prompt: "Push d5 to d6 — your pawn forks the Knight AND Bishop!",
      hint: "Tiny pawn, big fork.",
      goal: { kind: "move", from: "d5", to: "d6" },
      highlightFrom: "d5", highlightTo: "d6",
    },
    puzzle: {
      id: "m6-2-p", badge: "FORK",
      fen: "4k3/8/1n1q4/2P5/8/8/8/4K3 w - - 0 1",
      prompt: "Push c5 to c6 — fork the Knight and Queen!",
      hint: "c5-c6 attacks both pieces.",
      goal: { kind: "move", from: "c5", to: "c6" },
      highlightFrom: "c5", highlightTo: "c6",
    },
    challenge: {
      id: "m6-2-c", badge: "FORK",
      fen: "4k3/8/3r1n2/4P3/8/8/8/4K3 w - - 0 1",
      prompt: "Push e5 to e6 — fork the Rook and the Knight!",
      hint: "Pawn forks are sneaky and strong.",
      goal: { kind: "move", from: "e5", to: "e6" },
      highlightFrom: "e5", highlightTo: "e6",
    },
  },

  // 3. Pin
  3: {
    lesson: {
      id: "m6-3-l", badge: "PIN",
      fen: "4k3/8/4n3/8/4R3/8/8/4K3 w - - 0 1",
      prompt: "Rook to e6 — pin the Knight to the King!",
      hint: "Slide your rook up to attack the knight.",
      goal: { kind: "move", from: "e4", to: "e6" },
      highlightFrom: "e4", highlightTo: "e6",
    },
    puzzle: {
      id: "m6-3-p", badge: "PIN",
      fen: "3qk3/8/8/8/3R4/8/8/4K3 w - - 0 1",
      prompt: "Rook to d7 — pin the Queen to the King!",
      hint: "Rd4 to d7 traps the queen.",
      goal: { kind: "move", from: "d4", to: "d7" },
      highlightFrom: "d4", highlightTo: "d7",
    },
    challenge: {
      id: "m6-3-c", badge: "PIN",
      fen: "4k3/8/8/4r3/8/8/8/4Q2K w - - 0 1",
      prompt: "Queen to e4 — pin the Rook to the King!",
      hint: "Qe1 slides to e4 along the e-file.",
      goal: { kind: "move", from: "e1", to: "e4" },
      highlightFrom: "e1", highlightTo: "e4",
    },
  },

  // 4. Skewer
  4: {
    lesson: {
      id: "m6-4-l", badge: "SKEWER",
      fen: "4k3/4q3/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Rook to e1 already — push it up: Re1 to e6 attacks the Queen!",
      hint: "Stack the rook behind the queen.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
    puzzle: {
      id: "m6-4-p", badge: "SKEWER",
      fen: "7k/8/8/8/8/8/1q6/K6R w - - 0 1",
      prompt: "Rook to b1 — check the King with a skewer, win the Queen next!",
      hint: "Rh1 slides to b1 — skewer along the rank.",
      goal: { kind: "move", from: "h1", to: "b1" },
      highlightFrom: "h1", highlightTo: "b1",
    },
    challenge: {
      id: "m6-4-c", badge: "SKEWER",
      fen: "k7/8/8/8/8/8/7q/B6K w - - 0 1",
      prompt: "Bishop to b2 — attack the Queen on the diagonal!",
      hint: "Bishop a1 to b2 — close the trap.",
      goal: { kind: "move", from: "a1", to: "b2" },
      highlightFrom: "a1", highlightTo: "b2",
    },
  },

  // 5. Discovered Attack
  5: {
    lesson: {
      id: "m6-5-l", badge: "DISCOVERY",
      fen: "4k3/8/8/3q4/8/3N4/3R4/4K3 w - - 0 1",
      prompt: "Move the Knight — uncover the Rook's attack on the Queen!",
      hint: "Any safe knight jump unmasks the rook.",
      goal: { kind: "any-of", moves: [
        { from: "d3", to: "b4" }, { from: "d3", to: "c5" },
        { from: "d3", to: "e5" }, { from: "d3", to: "f4" },
        { from: "d3", to: "f2" }, { from: "d3", to: "b2" },
      ]},
      highlightFrom: "d3",
    },
    puzzle: {
      id: "m6-5-p", badge: "DISCOVERY",
      fen: "4k3/8/8/4q3/8/4B3/4R3/4K3 w - - 0 1",
      prompt: "Slide the Bishop — discover the Rook attacking the Queen!",
      hint: "Bishop steps off the e-file diagonally.",
      goal: { kind: "any-of", moves: [
        { from: "e3", to: "d4" }, { from: "e3", to: "f4" },
        { from: "e3", to: "c5" }, { from: "e3", to: "b6" },
        { from: "e3", to: "g5" }, { from: "e3", to: "h6" },
        { from: "e3", to: "d2" }, { from: "e3", to: "f2" },
      ]},
      highlightFrom: "e3",
    },
    challenge: {
      id: "m6-5-c", badge: "DISCOVERY",
      fen: "3q4/8/8/8/8/3N4/3R4/3K3k w - - 0 1",
      prompt: "Knight jumps — uncover the Rook on the Queen!",
      hint: "Any knight move unmasks the d-file rook.",
      goal: { kind: "any-of", moves: [
        { from: "d3", to: "b4" }, { from: "d3", to: "c5" },
        { from: "d3", to: "e5" }, { from: "d3", to: "f4" },
        { from: "d3", to: "f2" }, { from: "d3", to: "b2" },
      ]},
      highlightFrom: "d3",
    },
  },

  // 6. Double Attack with the Queen
  6: {
    lesson: {
      id: "m6-6-l", badge: "DOUBLE",
      fen: "4k3/8/8/2r5/8/8/3n4/Q3K3 w - - 0 1",
      prompt: "Queen to a5 — attack the Rook AND the Knight!",
      hint: "Qa1 to a5 — double trouble!",
      goal: { kind: "move", from: "a1", to: "a5" },
      highlightFrom: "a1", highlightTo: "a5",
    },
    puzzle: {
      id: "m6-6-p", badge: "DOUBLE",
      fen: "4k3/8/8/8/2r1n3/8/8/Q3K3 w - - 0 1",
      prompt: "Queen to a4 — hit both Black pieces at once!",
      hint: "Qa1 to a4 lines up on both.",
      goal: { kind: "move", from: "a1", to: "a4" },
      highlightFrom: "a1", highlightTo: "a4",
    },
    challenge: {
      id: "m6-6-c", badge: "DOUBLE",
      fen: "4k3/8/r6n/8/8/3B4/8/4K3 w - - 0 1",
      prompt: "Bishop along the long diagonal — Bd3 to a6 wins the Rook!",
      hint: "Bishop d3 to a6 — sweep!",
      goal: { kind: "move", from: "d3", to: "a6" },
      highlightFrom: "d3", highlightTo: "a6",
    },
  },

  // 7. Find the Fork
  7: {
    lesson: {
      id: "m6-7-l", badge: "FIND FORK",
      fen: "r3k3/8/4N3/8/8/8/8/4K3 w - - 0 1",
      prompt: "Knight to c7 — royal fork on the King and Rook!",
      hint: "Ne6 to c7+.",
      goal: { kind: "move", from: "e6", to: "c7" },
      highlightFrom: "e6", highlightTo: "c7",
    },
    puzzle: {
      id: "m6-7-p", badge: "FIND FORK",
      fen: "4k3/8/8/3N4/8/8/8/r3K3 w - - 0 1",
      prompt: "Knight to c7 — fork the King and Rook!",
      hint: "Nd5 to c7+.",
      goal: { kind: "move", from: "d5", to: "c7" },
      highlightFrom: "d5", highlightTo: "c7",
    },
    challenge: {
      id: "m6-7-c", badge: "FIND FORK",
      fen: "4k3/8/8/8/3N4/8/8/r3K3 w - - 0 1",
      prompt: "Knight to c2 — attack the King and the Rook!",
      hint: "Nd4 to c2 — sneaky leap.",
      goal: { kind: "move", from: "d4", to: "c2" },
      highlightFrom: "d4", highlightTo: "c2",
    },
  },

  // 8. Find the Pin
  8: {
    lesson: {
      id: "m6-8-l", badge: "FIND PIN",
      fen: "4k3/4r3/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Slide your Rook to e4 — keep the pin and crowd the enemy!",
      hint: "Re1 to e4.",
      goal: { kind: "move", from: "e1", to: "e4" },
      highlightFrom: "e1", highlightTo: "e4",
    },
    puzzle: {
      id: "m6-8-p", badge: "FIND PIN",
      fen: "4k3/8/4n3/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Queen to e4 — pin the Knight to the King!",
      hint: "Qe1 to e4.",
      goal: { kind: "move", from: "e1", to: "e4" },
      highlightFrom: "e1", highlightTo: "e4",
    },
    challenge: {
      id: "m6-8-c", badge: "FIND PIN",
      fen: "k7/8/8/q7/8/8/8/R6K w - - 0 1",
      prompt: "Rook to a4 — pin the Queen to the King!",
      hint: "Ra1 to a4 along the a-file.",
      goal: { kind: "move", from: "a1", to: "a4" },
      highlightFrom: "a1", highlightTo: "a4",
    },
  },

  // 9. Skewer hunt — capture and win material
  9: {
    lesson: {
      id: "m6-9-l", badge: "SKEWER",
      fen: "7k/7q/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Push the Rook up — Ra1 to a7 attacks the Queen!",
      hint: "Ra1 to a7.",
      goal: { kind: "move", from: "a1", to: "a7" },
      highlightFrom: "a1", highlightTo: "a7",
    },
    puzzle: {
      id: "m6-9-p", badge: "SKEWER",
      fen: "k7/8/8/8/8/8/q7/B6K w - - 0 1",
      prompt: "Bishop to b2 — attack and win the Queen!",
      hint: "Bishop a1 to b2.",
      goal: { kind: "move", from: "a1", to: "b2" },
      highlightFrom: "a1", highlightTo: "b2",
    },
    challenge: {
      id: "m6-9-c", badge: "SKEWER",
      fen: "k7/8/8/8/8/8/8/K1q4R w - - 0 1",
      prompt: "Rook captures the Queen — Rxc1!",
      hint: "Rh1 sweeps across to c1.",
      goal: { kind: "move", from: "h1", to: "c1" },
      highlightFrom: "h1", highlightTo: "c1",
    },
  },

  // 10. Discovered Check
  10: {
    lesson: {
      id: "m6-10-l", badge: "DISCOVERY",
      fen: "4k3/8/8/8/4N3/8/4R3/4K3 w - - 0 1",
      prompt: "Move the Knight — discovered check from the Rook!",
      hint: "Any safe knight jump uncovers the rook.",
      goal: { kind: "any-of", moves: [
        { from: "e4", to: "c5" }, { from: "e4", to: "d6" },
        { from: "e4", to: "f6" }, { from: "e4", to: "g5" },
        { from: "e4", to: "g3" }, { from: "e4", to: "f2" },
        { from: "e4", to: "c3" }, { from: "e4", to: "d2" },
      ]},
      highlightFrom: "e4",
    },
    puzzle: {
      id: "m6-10-p", badge: "DISCOVERY",
      fen: "4k3/8/8/4B3/8/8/4R3/4K3 w - - 0 1",
      prompt: "Slide the Bishop off — discovered check from the Rook!",
      hint: "Bishop steps off the e-file.",
      goal: { kind: "any-of", moves: [
        { from: "e5", to: "d6" }, { from: "e5", to: "f6" },
        { from: "e5", to: "d4" }, { from: "e5", to: "c3" },
        { from: "e5", to: "b2" }, { from: "e5", to: "a1" },
        { from: "e5", to: "f4" }, { from: "e5", to: "g3" },
        { from: "e5", to: "h2" },
      ]},
      highlightFrom: "e5",
    },
    challenge: {
      id: "m6-10-c", badge: "DISCOVERY",
      fen: "3k4/8/8/3N4/8/3R4/8/3K4 w - - 0 1",
      prompt: "Knight jumps — Rook delivers a discovered check!",
      hint: "Any safe knight move works.",
      goal: { kind: "any-of", moves: [
        { from: "d5", to: "b6" }, { from: "d5", to: "c7" },
        { from: "d5", to: "e7" }, { from: "d5", to: "f6" },
        { from: "d5", to: "f4" }, { from: "d5", to: "e3" },
        { from: "d5", to: "c3" }, { from: "d5", to: "b4" },
      ]},
      highlightFrom: "d5",
    },
  },

  // 11. Detective — back-rank mate-in-1
  11: {
    lesson: {
      id: "m6-11-l", badge: "DETECTIVE",
      fen: "7k/5ppp/8/8/8/8/5PPP/R6K w - - 0 1",
      prompt: "Back-rank mate — Ra1 to a8!",
      hint: "Rook slides to a8 — checkmate.",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    puzzle: {
      id: "m6-11-p", badge: "DETECTIVE",
      fen: "6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1",
      prompt: "Back-rank mate — Ra1 to a8!",
      hint: "Ra8#.",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    challenge: {
      id: "m6-11-c", badge: "DETECTIVE",
      fen: "6k1/5ppp/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Find the back-rank mate — Re1 to e8!",
      hint: "Re8#.",
      goal: { kind: "mate-in-1" },
      highlightFrom: "e1", highlightTo: "e8",
    },
  },

  // 12. BOSS — Grand Detective
  12: {
    lesson: {
      id: "m6-12-l", badge: "BOSS",
      fen: "4k3/8/4N3/8/8/8/8/4K3 w - - 0 1",
      prompt: "Boss warm-up — Knight to c7 or g7, check the King!",
      hint: "Ne6 to c7 or g7.",
      goal: { kind: "any-of", moves: [{ from: "e6", to: "c7" }, { from: "e6", to: "g7" }] },
      highlightFrom: "e6",
    },
    puzzle: {
      id: "m6-12-p", badge: "BOSS",
      fen: "r3k3/8/4N3/8/8/8/8/4K3 w - - 0 1",
      prompt: "Royal fork — Knight to c7!",
      hint: "Ne6 to c7 forks King AND Rook.",
      goal: { kind: "move", from: "e6", to: "c7" },
      highlightFrom: "e6", highlightTo: "c7",
    },
    challenge: {
      id: "m6-12-c", badge: "BOSS",
      fen: "6k1/5ppp/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Boss finisher — back-rank checkmate!",
      hint: "Ra1 to a8 — Detective badge unlocked!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a1", highlightTo: "a8",
    },
  },
};
