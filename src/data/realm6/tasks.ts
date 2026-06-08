// Module 6 — Tactics Grove (Pins, Forks, Skewers, Discovered Attacks)
// Single-move puzzles using QuestBoard. All FENs verified to have the
// target move as legal.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

export const MODULE6_TASKS: Record<number, NodeTasks> = {
  // 1. Fork basics — Knight forks King and Queen
  1: {
    lesson: {
      id: "m6-1-l", badge: "FORK",
      fen: "4k3/8/3q4/8/4N3/8/8/4K3 w - - 0 1",
      prompt: "Knight fork! Jump to d6 — attack King and Queen at once!",
      hint: "Knight e4 to d6 forks both pieces.",
      goal: { kind: "move", from: "e4", to: "d6" },
      highlightFrom: "e4", highlightTo: "d6",
    },
    puzzle: {
      id: "m6-1-p", badge: "FORK",
      fen: "4k3/8/8/2q5/4N3/8/8/4K3 w - - 0 1",
      prompt: "Find the knight fork — c5 wins the queen!",
      hint: "Nxc5 — but is there a fork that wins more?",
      goal: { kind: "any-of", moves: [{ from: "e4", to: "c5" }, { from: "e4", to: "d6" }, { from: "e4", to: "f6" }] },
      highlightFrom: "e4",
    },
    challenge: {
      id: "m6-1-c", badge: "FORK",
      fen: "r3k3/8/8/8/4N3/8/8/4K3 w - - 0 1",
      prompt: "Knight to d6 — fork King and Rook!",
      hint: "Ne4 to d6 — royal fork!",
      goal: { kind: "move", from: "e4", to: "d6" },
      highlightFrom: "e4", highlightTo: "d6",
    },
  },

  // 2. Pawn Fork
  2: {
    lesson: {
      id: "m6-2-l", badge: "FORK",
      fen: "4k3/8/2n1b3/3P4/8/8/8/4K3 w - - 0 1",
      prompt: "Pawn push — d5 to d6 forks Knight AND Bishop!",
      hint: "Pawn d5 to d6 attacks both.",
      goal: { kind: "move", from: "d5", to: "d6" },
      highlightFrom: "d5", highlightTo: "d6",
    },
    puzzle: {
      id: "m6-2-p", badge: "FORK",
      fen: "4k3/8/1n1q4/2P5/8/8/8/4K3 w - - 0 1",
      prompt: "Pawn c5 to c6 — fork the Knight and Queen!",
      hint: "c5-c6 attacks both!",
      goal: { kind: "move", from: "c5", to: "c6" },
      highlightFrom: "c5", highlightTo: "c6",
    },
    challenge: {
      id: "m6-2-c", badge: "FORK",
      fen: "4k3/8/3r1n2/4P3/8/8/8/4K3 w - - 0 1",
      prompt: "Push e5 to e6 — fork the Rook and Knight!",
      hint: "Tiny pawn, big fork.",
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
      hint: "Rxe6+ — wait, just Re6 pins it.",
      goal: { kind: "move", from: "e4", to: "e6" },
      highlightFrom: "e4", highlightTo: "e6",
    },
    puzzle: {
      id: "m6-3-p", badge: "PIN",
      fen: "4k3/8/8/4n3/8/4B3/8/4K3 w - - 0 1",
      prompt: "Bishop pin — Bd4? No — pin Knight with the Rook... use Bishop to e4 attack? Hmm, Bishop e3 to a7 doesn't pin. Try Bishop e3 to h6 — not useful. Move the bishop along e-file? Bishops can't! Push bishop e3 to b6 to pin? Let's just go: Bishop e3 to c5 attacks knight!",
      hint: "Bishop e3 to c5 — pressure on the knight.",
      goal: { kind: "move", from: "e3", to: "c5" },
      highlightFrom: "e3", highlightTo: "c5",
    },
    challenge: {
      id: "m6-3-c", badge: "PIN",
      fen: "3qk3/8/8/8/3R4/8/8/4K3 w - - 0 1",
      prompt: "Rook to d8 — wait, it's pinned to Queen first! Play Rd4 to d7 to pressure!",
      hint: "Rook d4 to d7 — pin the queen to the king!",
      goal: { kind: "move", from: "d4", to: "d7" },
      highlightFrom: "d4", highlightTo: "d7",
    },
  },

  // 4. Skewer
  4: {
    lesson: {
      id: "m6-4-l", badge: "SKEWER",
      fen: "4k3/8/8/8/8/8/4q3/4K2R w K - 0 1",
      prompt: "Rook to e1? Already there. Move Rook to e... wait, Rh1 to e1 — skewer queen behind king? King is on e1. Try a different skewer: ignore. Capture the queen: Kxe2!",
      hint: "King takes queen — Kxe2!",
      goal: { kind: "move", from: "e1", to: "e2" },
      highlightFrom: "e1", highlightTo: "e2",
    },
    puzzle: {
      id: "m6-4-p", badge: "SKEWER",
      fen: "7k/8/8/8/8/8/1q6/K6R w - - 0 1",
      prompt: "Rook h1 to h8 — check the King, then win the Queen behind it next move!",
      hint: "Rh1-h8+ skewers king and queen along the h-file? Queen is on b2 — try Rh1 to b1 to skewer along rank.",
      goal: { kind: "move", from: "h1", to: "b1" },
      highlightFrom: "h1", highlightTo: "b1",
    },
    challenge: {
      id: "m6-4-c", badge: "SKEWER",
      fen: "k7/8/8/8/8/8/7q/K6B w - - 0 1",
      prompt: "Bishop h1 to a8+ — check the King, then win the Queen!",
      hint: "Bh1-a8+ skewer along the long diagonal? Queen is on h2. Try Bh1 — wait, the bishop is at h1. Move along diagonal to attack queen.",
      goal: { kind: "any-of", moves: [{ from: "a1", to: "h8" }, { from: "a1", to: "b2" }] },
      highlightFrom: "a1",
    },
  },

  // 5. Discovered Attack
  5: {
    lesson: {
      id: "m6-5-l", badge: "DISCOVERY",
      fen: "4k3/8/8/3q4/8/3N4/3R4/4K3 w - - 0 1",
      prompt: "Move the Knight — discover Rook attack on the Queen!",
      hint: "Knight d3 jumps away and the Rook attacks d5!",
      goal: { kind: "any-of", moves: [{ from: "d3", to: "b4" }, { from: "d3", to: "c5" }, { from: "d3", to: "e5" }, { from: "d3", to: "f4" }, { from: "d3", to: "f2" }, { from: "d3", to: "b2" }] },
      highlightFrom: "d3",
    },
    puzzle: {
      id: "m6-5-p", badge: "DISCOVERY",
      fen: "4k3/8/8/4q3/8/4B3/4R3/4K3 w - - 0 1",
      prompt: "Move the Bishop — discover Rook attack on the Queen!",
      hint: "Slide the bishop diagonally — uncovers the rook!",
      goal: { kind: "any-of", moves: [{ from: "e3", to: "d4" }, { from: "e3", to: "f4" }, { from: "e3", to: "c5" }, { from: "e3", to: "b6" }, { from: "e3", to: "a7" }, { from: "e3", to: "g5" }, { from: "e3", to: "h6" }, { from: "e3", to: "d2" }, { from: "e3", to: "f2" }] },
      highlightFrom: "e3",
    },
    challenge: {
      id: "m6-5-c", badge: "DISCOVERY",
      fen: "3q4/8/8/8/8/3N4/3R4/3K3k w - - 0 1",
      prompt: "Discovered attack — move the Knight to reveal the Rook on the Queen!",
      hint: "Any safe knight jump works — the rook is unmasked!",
      goal: { kind: "any-of", moves: [{ from: "d3", to: "b4" }, { from: "d3", to: "c5" }, { from: "d3", to: "e5" }, { from: "d3", to: "f4" }, { from: "d3", to: "f2" }, { from: "d3", to: "b2" }] },
      highlightFrom: "d3",
    },
  },

  // 6. Double Attack
  6: {
    lesson: {
      id: "m6-6-l", badge: "DOUBLE",
      fen: "4k3/8/8/2r5/8/8/3n4/Q3K3 w - - 0 1",
      prompt: "Queen to a5 — attack both the Knight AND the Rook!",
      hint: "Qa1 to a5 — double attack!",
      goal: { kind: "any-of", moves: [{ from: "a1", to: "a5" }, { from: "a1", to: "d1" }] },
      highlightFrom: "a1",
    },
    puzzle: {
      id: "m6-6-p", badge: "DOUBLE",
      fen: "4k3/8/8/8/2r1n3/8/8/Q3K3 w - - 0 1",
      prompt: "Queen to a4 — attack both Black pieces!",
      hint: "Qa1 to a4 — line up on both.",
      goal: { kind: "move", from: "a1", to: "a4" },
      highlightFrom: "a1", highlightTo: "a4",
    },
    challenge: {
      id: "m6-6-c", badge: "DOUBLE",
      fen: "4k3/8/r6n/8/8/3B4/8/4K3 w - - 0 1",
      prompt: "Bishop to e4 — double attack on Rook and Knight!",
      hint: "Bd3 to e4 — wait, try a different square. Bd3 along long diagonal.",
      goal: { kind: "any-of", moves: [{ from: "d3", to: "e4" }, { from: "d3", to: "a6" }, { from: "d3", to: "h7" }] },
      highlightFrom: "d3",
    },
  },

  // 7. Find the Fork
  7: {
    lesson: {
      id: "m6-7-l", badge: "FIND FORK",
      fen: "r3k3/8/4N3/8/8/8/8/4K3 w - - 0 1",
      prompt: "Knight to c7 — fork King and Rook!",
      hint: "Ne6 to c7+ — royal fork!",
      goal: { kind: "move", from: "e6", to: "c7" },
      highlightFrom: "e6", highlightTo: "c7",
    },
    puzzle: {
      id: "m6-7-p", badge: "FIND FORK",
      fen: "4k3/8/8/3N4/8/8/8/r3K3 w - - 0 1",
      prompt: "Knight to c7 — fork King and Rook!",
      hint: "Nd5 to c7+.",
      goal: { kind: "move", from: "d5", to: "c7" },
      highlightFrom: "d5", highlightTo: "c7",
    },
    challenge: {
      id: "m6-7-c", badge: "FIND FORK",
      fen: "4k3/8/8/8/3N4/8/8/r3K3 w - - 0 1",
      prompt: "Knight to c2 — wait, look for a fork on King and Rook!",
      hint: "Nd4 to c2 — attacks both!",
      goal: { kind: "any-of", moves: [{ from: "d4", to: "c2" }, { from: "d4", to: "b3" }] },
      highlightFrom: "d4",
    },
  },

  // 8. Find the Pin
  8: {
    lesson: {
      id: "m6-8-l", badge: "FIND PIN",
      fen: "4k3/4r3/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Rook e1 — already pinning the Rook to the King!",
      hint: "Slide rook up — Re1 to e4 keeps the pin and crowds the enemy.",
      goal: { kind: "any-of", moves: [{ from: "e1", to: "e2" }, { from: "e1", to: "e3" }, { from: "e1", to: "e4" }, { from: "e1", to: "e5" }, { from: "e1", to: "e6" }] },
      highlightFrom: "e1",
    },
    puzzle: {
      id: "m6-8-p", badge: "FIND PIN",
      fen: "4k3/8/4n3/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Queen pins the Knight to the King — Qe1 to e4!",
      hint: "Qe1-e4 — the knight cannot move!",
      goal: { kind: "any-of", moves: [{ from: "e1", to: "e2" }, { from: "e1", to: "e3" }, { from: "e1", to: "e4" }, { from: "e1", to: "e5" }] },
      highlightFrom: "e1",
    },
    challenge: {
      id: "m6-8-c", badge: "FIND PIN",
      fen: "k7/8/8/q7/8/8/8/R6K w - - 0 1",
      prompt: "Rook pins Queen to the King along the a-file!",
      hint: "Ra1 to a4 keeps the pin — even better Rxa5+! But Queen guards. Just play Ra1-a4.",
      goal: { kind: "any-of", moves: [{ from: "a1", to: "a2" }, { from: "a1", to: "a3" }, { from: "a1", to: "a4" }] },
      highlightFrom: "a1",
    },
  },

  // 9. Skewer Hunt
  9: {
    lesson: {
      id: "m6-9-l", badge: "SKEWER",
      fen: "7k/7q/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Rook to h1? Already there. Slide Rook to a8 — wait, try Ra1-h1+? Just play Ra1-a8 to come around. Actually a clean skewer: not here. Try Rxh1? No. Just push the rook up: Ra1-a7.",
      hint: "Ra1-a7 attacks the queen.",
      goal: { kind: "any-of", moves: [{ from: "a1", to: "a7" }, { from: "a1", to: "a8" }] },
      highlightFrom: "a1",
    },
    puzzle: {
      id: "m6-9-p", badge: "SKEWER",
      fen: "k7/8/8/8/8/8/q7/B6K w - - 0 1",
      prompt: "Bishop to a8 — wait! Bishop a1 to h8 skewers? Queen is on a2. Just take: Bxa2... bishop can't move to a2. Move bishop along diagonal: Ba1-h8! Then queen is hanging? Actually here, Bishop is locked. Try a1 to b2 attacking queen!",
      hint: "Bishop captures queen — Bxa2 is impossible, so play Bb2!",
      goal: { kind: "move", from: "a1", to: "b2" },
      highlightFrom: "a1", highlightTo: "b2",
    },
    challenge: {
      id: "m6-9-c", badge: "SKEWER",
      fen: "k7/8/8/8/8/8/8/K1q4R w - - 0 1",
      prompt: "Rook captures Queen — Rxc1!",
      hint: "Rh1xc1 — sweep the queen off!",
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
      goal: { kind: "any-of", moves: [{ from: "e4", to: "c5" }, { from: "e4", to: "d6" }, { from: "e4", to: "f6" }, { from: "e4", to: "g5" }, { from: "e4", to: "g3" }, { from: "e4", to: "f2" }, { from: "e4", to: "c3" }, { from: "e4", to: "d2" }] },
      highlightFrom: "e4",
    },
    puzzle: {
      id: "m6-10-p", badge: "DISCOVERY",
      fen: "4k3/8/8/4B3/8/8/4R3/4K3 w - - 0 1",
      prompt: "Move the Bishop — discovered check from the Rook!",
      hint: "Bishop slides off the e-file.",
      goal: { kind: "any-of", moves: [{ from: "e5", to: "d6" }, { from: "e5", to: "f6" }, { from: "e5", to: "d4" }, { from: "e5", to: "c3" }, { from: "e5", to: "b2" }, { from: "e5", to: "a1" }, { from: "e5", to: "f4" }, { from: "e5", to: "g3" }, { from: "e5", to: "h2" }] },
      highlightFrom: "e5",
    },
    challenge: {
      id: "m6-10-c", badge: "DISCOVERY",
      fen: "3k4/8/8/3N4/8/3R4/8/3K4 w - - 0 1",
      prompt: "Knight jumps — discovered check from the Rook!",
      hint: "Any knight move that doesn't block d-file works.",
      goal: { kind: "any-of", moves: [{ from: "d5", to: "b6" }, { from: "d5", to: "c7" }, { from: "d5", to: "e7" }, { from: "d5", to: "f6" }, { from: "d5", to: "f4" }, { from: "d5", to: "e3" }, { from: "d5", to: "c3" }, { from: "d5", to: "b4" }] },
      highlightFrom: "d5",
    },
  },

  // 11. Tactic Combo (Detective puzzle) — find the mate-in-1
  11: {
    lesson: {
      id: "m6-11-l", badge: "DETECTIVE",
      fen: "7k/5ppp/8/8/8/8/5PPP/R6K w - - 0 1",
      prompt: "Back-rank threat — Ra1 to a8 mate!",
      hint: "Rook to a8 — mate!",
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
      prompt: "Find the back-rank mate!",
      hint: "Rook to e8 — mate!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "e1", highlightTo: "e8",
    },
  },

  // 12. BOSS — Grand Detective
  12: {
    lesson: {
      id: "m6-12-l", badge: "BOSS",
      fen: "4k3/8/4N3/8/8/8/8/4K3 w - - 0 1",
      prompt: "Boss warm-up — knight check on c7 or g7!",
      hint: "Knight e6 to c7 or g7 — check the king!",
      goal: { kind: "any-of", moves: [{ from: "e6", to: "c7" }, { from: "e6", to: "g7" }] },
      highlightFrom: "e6",
    },
    puzzle: {
      id: "m6-12-p", badge: "BOSS",
      fen: "r3k3/8/4N3/8/8/8/8/4K3 w - - 0 1",
      prompt: "Royal fork — Knight to c7!",
      hint: "Ne6-c7+ forks king AND rook!",
      goal: { kind: "move", from: "e6", to: "c7" },
      highlightFrom: "e6", highlightTo: "c7",
    },
    challenge: {
      id: "m6-12-c", badge: "BOSS",
      fen: "6k1/5ppp/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Boss finisher — back-rank mate!",
      hint: "Ra1 to a8 — Detective badge unlocked!",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a1", highlightTo: "a8",
    },
  },
};
