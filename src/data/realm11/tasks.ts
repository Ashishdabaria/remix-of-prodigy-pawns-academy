// Module 11 — Discovered Attacks & Deflection (Crystal Labyrinth)
// 12 nodes: discovered attacks, double check, deflection, overloading.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

export const MODULE11_TASKS: Record<number, NodeTasks> = {
  // 1. Unmask the weapon — knight moves, rook attacks
  1: {
    lesson: {
      id: "m11-1-l", badge: "DISCOVERED",
      fen: "4k3/8/8/8/8/4N3/8/4R2K w - - 0 1",
      prompt: "Move the knight to e3→f5 — your rook attacks the king!",
      hint: "Knight unmasks the rook on the e-file.",
      goal: { kind: "move", from: "e3", to: "f5" },
      highlightFrom: "e3", highlightTo: "f5",
    },
    puzzle: {
      id: "m11-1-p", badge: "DISCOVERED",
      fen: "4k3/8/8/4N3/8/8/8/4R2K w - - 0 1",
      prompt: "Ne5→c6 reveals a rook check!",
      hint: "Knight jumps off the e-file.",
      goal: { kind: "move", from: "e5", to: "c6" },
      highlightFrom: "e5", highlightTo: "c6",
    },
    challenge: {
      id: "m11-1-c", badge: "DISCOVERED",
      fen: "4k3/8/4N3/8/8/8/8/4R2K w - - 0 1",
      prompt: "Ne6→g7+ — discovered check!",
      hint: "Knight leaves the e-file open.",
      goal: { kind: "move", from: "e6", to: "g7" },
      highlightFrom: "e6", highlightTo: "g7",
    },
  },

  // 2. Discovered attack — win a piece
  2: {
    lesson: {
      id: "m11-2-l", badge: "DISCOVERED",
      fen: "4k3/8/4q3/8/4N3/8/8/4R2K w - - 0 1",
      prompt: "Move the knight to attack — and your rook hits the queen!",
      hint: "Ne4→f6 attacks queen via discovery? Actually Nf6+ even better — try Nc5.",
      goal: { kind: "move", from: "e4", to: "c5" },
      highlightFrom: "e4", highlightTo: "c5",
    },
    puzzle: {
      id: "m11-2-p", badge: "DISCOVERED",
      fen: "4k3/8/3q4/8/4N3/8/8/4R2K w - - 0 1",
      prompt: "Knight uncovers the rook — Nc5 wins the queen!",
      hint: "Move the knight off the e-file with tempo.",
      goal: { kind: "move", from: "e4", to: "c5" },
      highlightFrom: "e4", highlightTo: "c5",
    },
    challenge: {
      id: "m11-2-c", badge: "DISCOVERED",
      fen: "4k3/8/8/3q4/4N3/8/8/4R2K w - - 0 1",
      prompt: "Nc3 — discovered attack on the queen!",
      hint: "Open the e-file with the knight.",
      goal: { kind: "move", from: "e4", to: "c3" },
      highlightFrom: "e4", highlightTo: "c3",
    },
  },

  // 3. Double check — king must move
  3: {
    lesson: {
      id: "m11-3-l", badge: "DOUBLE CHECK",
      fen: "4k3/8/8/8/4B3/8/8/4R2K w - - 0 1",
      prompt: "Bishop moves and BOTH bishop + rook check — Bb7+!",
      hint: "Bishop e4 to b7 — double check.",
      goal: { kind: "move", from: "e4", to: "b7" },
      highlightFrom: "e4", highlightTo: "b7",
    },
    puzzle: {
      id: "m11-3-p", badge: "DOUBLE CHECK",
      fen: "4k3/8/8/8/4N3/8/8/4Q2K w - - 0 1",
      prompt: "Knight reveals queen + gives check — Nf6+!",
      hint: "Knight to f6 — double check the king.",
      goal: { kind: "move", from: "e4", to: "f6" },
      highlightFrom: "e4", highlightTo: "f6",
    },
    challenge: {
      id: "m11-3-c", badge: "DOUBLE CHECK",
      fen: "4k3/8/8/8/4N3/8/8/4R2K w - - 0 1",
      prompt: "Nd6+ — knight checks AND opens rook check!",
      hint: "Knight to d6.",
      goal: { kind: "move", from: "e4", to: "d6" },
      highlightFrom: "e4", highlightTo: "d6",
    },
  },

  // 4. Deflection — kick the defender away
  4: {
    lesson: {
      id: "m11-4-l", badge: "DEFLECTION",
      fen: "4k3/8/8/8/8/3q4/8/3R3K w - - 0 1",
      prompt: "Take the defender — Rxd3!",
      hint: "Rook captures the queen.",
      goal: { kind: "move", from: "d1", to: "d3" },
      highlightFrom: "d1", highlightTo: "d3",
    },
    puzzle: {
      id: "m11-4-p", badge: "DEFLECTION",
      fen: "4k3/8/8/8/4q3/8/8/4R2K w - - 0 1",
      prompt: "Rxe4 — remove the defender!",
      hint: "Rook climbs the e-file.",
      goal: { kind: "move", from: "e1", to: "e4" },
      highlightFrom: "e1", highlightTo: "e4",
    },
    challenge: {
      id: "m11-4-c", badge: "DEFLECTION",
      fen: "4k3/8/8/3q4/8/8/8/3R3K w - - 0 1",
      prompt: "Rxd5 — pull the queen off duty!",
      hint: "Rook all the way up.",
      goal: { kind: "move", from: "d1", to: "d5" },
      highlightFrom: "d1", highlightTo: "d5",
    },
  },

  // 5. Overloading — one defender, two jobs
  5: {
    lesson: {
      id: "m11-5-l", badge: "OVERLOAD",
      fen: "4k3/8/8/8/8/4q3/8/4R2K w - - 0 1",
      prompt: "Queen has too many jobs — Rxe3!",
      hint: "Rook captures the overworked queen.",
      goal: { kind: "move", from: "e1", to: "e3" },
      highlightFrom: "e1", highlightTo: "e3",
    },
    puzzle: {
      id: "m11-5-p", badge: "OVERLOAD",
      fen: "4k3/8/8/8/3q4/8/8/3R3K w - - 0 1",
      prompt: "Rxd4 — overworked defender falls!",
      hint: "Rook up the d-file.",
      goal: { kind: "move", from: "d1", to: "d4" },
      highlightFrom: "d1", highlightTo: "d4",
    },
    challenge: {
      id: "m11-5-c", badge: "OVERLOAD",
      fen: "4k3/8/4q3/8/8/8/8/4R2K w - - 0 1",
      prompt: "Rxe6 — overloaded queen drops!",
      hint: "Rook climbs all the way.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
  },

  // 6. Spot the discovered check
  6: {
    lesson: {
      id: "m11-6-l", badge: "SPOT IT",
      fen: "4k3/8/8/4N3/8/8/8/4Q2K w - - 0 1",
      prompt: "Nc6 opens the queen — discovered check!",
      hint: "Knight off the e-file.",
      goal: { kind: "move", from: "e5", to: "c6" },
      highlightFrom: "e5", highlightTo: "c6",
    },
    puzzle: {
      id: "m11-6-p", badge: "SPOT IT",
      fen: "4k3/8/4N3/8/8/8/8/4R2K w - - 0 1",
      prompt: "Nd4 — discovered rook check!",
      hint: "Move knight off e-file.",
      goal: { kind: "move", from: "e6", to: "d4" },
      highlightFrom: "e6", highlightTo: "d4",
    },
    challenge: {
      id: "m11-6-c", badge: "SPOT IT",
      fen: "4k3/8/8/4B3/8/8/8/4R2K w - - 0 1",
      prompt: "Bb8+ — bishop AND rook hit the king!",
      hint: "Bishop e5 sweeps to b8.",
      goal: { kind: "move", from: "e5", to: "b8" },
      highlightFrom: "e5", highlightTo: "b8",
    },
  },

  // 7. Discovered attack on queen
  7: {
    lesson: {
      id: "m11-7-l", badge: "WIN QUEEN",
      fen: "3q4/8/3k4/8/3N4/8/8/3R3K w - - 0 1",
      prompt: "Knight moves — rook hits the queen! Nb5+.",
      hint: "Knight check + discovered attack.",
      goal: { kind: "move", from: "d4", to: "b5" },
      highlightFrom: "d4", highlightTo: "b5",
    },
    puzzle: {
      id: "m11-7-p", badge: "WIN QUEEN",
      fen: "3q4/8/4k3/8/3N4/8/8/3R3K w - - 0 1",
      prompt: "Nf5+ uncovers the rook on the queen!",
      hint: "Knight checks with discovery.",
      goal: { kind: "move", from: "d4", to: "f5" },
      highlightFrom: "d4", highlightTo: "f5",
    },
    challenge: {
      id: "m11-7-c", badge: "WIN QUEEN",
      fen: "3q4/8/2k5/8/3N4/8/8/3R3K w - - 0 1",
      prompt: "Nb5+ — fork-discovery!",
      hint: "Knight check + open rook.",
      goal: { kind: "move", from: "d4", to: "b5" },
      highlightFrom: "d4", highlightTo: "b5",
    },
  },

  // 8. Double check forces king move
  8: {
    lesson: {
      id: "m11-8-l", badge: "FORCE MOVE",
      fen: "4k3/8/8/8/4N3/8/8/4R2K w - - 0 1",
      prompt: "Nd6+ — double check! King MUST move.",
      hint: "Knight to d6.",
      goal: { kind: "move", from: "e4", to: "d6" },
      highlightFrom: "e4", highlightTo: "d6",
    },
    puzzle: {
      id: "m11-8-p", badge: "FORCE MOVE",
      fen: "4k3/8/8/4N3/8/8/8/4Q2K w - - 0 1",
      prompt: "Nf7+ — knight + queen, double check!",
      hint: "Knight off e-file.",
      goal: { kind: "move", from: "e5", to: "f7" },
      highlightFrom: "e5", highlightTo: "f7",
    },
    challenge: {
      id: "m11-8-c", badge: "FORCE MOVE",
      fen: "4k3/8/4B3/8/8/8/8/4R2K w - - 0 1",
      prompt: "Bg8+ — bishop AND rook double check!",
      hint: "Bishop e6 to g8.",
      goal: { kind: "move", from: "e6", to: "g8" },
      highlightFrom: "e6", highlightTo: "g8",
    },
  },

  // 9. Deflection — remove the defender
  9: {
    lesson: {
      id: "m11-9-l", badge: "REMOVE",
      fen: "4k3/8/8/8/3q4/8/8/3Q3K w - - 0 1",
      prompt: "Qxd4 — eliminate the defender!",
      hint: "Queen swap clears the way.",
      goal: { kind: "move", from: "d1", to: "d4" },
      highlightFrom: "d1", highlightTo: "d4",
    },
    puzzle: {
      id: "m11-9-p", badge: "REMOVE",
      fen: "4k3/8/4q3/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Qxe6+ — remove the defender with check!",
      hint: "Queen up the e-file.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
    challenge: {
      id: "m11-9-c", badge: "REMOVE",
      fen: "4k3/4q3/8/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Qxe7+ — defender gone!",
      hint: "Open e-file.",
      goal: { kind: "move", from: "e1", to: "e7" },
      highlightFrom: "e1", highlightTo: "e7",
    },
  },

  // 10. Treasure — discovered double attack
  10: {
    lesson: {
      id: "m11-10-l", badge: "TREASURE",
      fen: "3q4/8/3k4/8/4N3/8/8/3R3K w - - 0 1",
      prompt: "Nc5 — uncovers rook, wins the queen!",
      hint: "Knight off the e-file.",
      goal: { kind: "move", from: "e4", to: "c5" },
      highlightFrom: "e4", highlightTo: "c5",
    },
    puzzle: {
      id: "m11-10-p", badge: "TREASURE",
      fen: "4k3/8/8/3q4/4N3/8/8/4R2K w - - 0 1",
      prompt: "Nc3 — rook attacks queen, treasure!",
      hint: "Knight clears the e-file.",
      goal: { kind: "move", from: "e4", to: "c3" },
      highlightFrom: "e4", highlightTo: "c3",
    },
    challenge: {
      id: "m11-10-c", badge: "TREASURE",
      fen: "3q4/8/4k3/8/3N4/8/8/3R3K w - - 0 1",
      prompt: "Nf5+ — wins the queen!",
      hint: "Discovered double attack.",
      goal: { kind: "move", from: "d4", to: "f5" },
      highlightFrom: "d4", highlightTo: "f5",
    },
  },

  // 11. Mixed drill
  11: {
    lesson: {
      id: "m11-11-l", badge: "DRILL",
      fen: "4k3/8/8/8/4N3/8/8/4R2K w - - 0 1",
      prompt: "Nd6+ — pattern: knight discovers rook!",
      hint: "Knight off the e-file with check.",
      goal: { kind: "move", from: "e4", to: "d6" },
      highlightFrom: "e4", highlightTo: "d6",
    },
    puzzle: {
      id: "m11-11-p", badge: "DRILL",
      fen: "4k3/8/8/4N3/8/8/8/4R2K w - - 0 1",
      prompt: "Nc6 — discovered rook check!",
      hint: "Knight leaves the e-file.",
      goal: { kind: "move", from: "e5", to: "c6" },
      highlightFrom: "e5", highlightTo: "c6",
    },
    challenge: {
      id: "m11-11-c", badge: "DRILL",
      fen: "4k3/8/4B3/8/8/8/8/4R2K w - - 0 1",
      prompt: "Bb8+ — bishop sweeps, rook reveals!",
      hint: "Bishop to b8.",
      goal: { kind: "move", from: "e6", to: "b8" },
      highlightFrom: "e6", highlightTo: "b8",
    },
  },

  // 12. BOSS — Unmask the Weapon
  12: {
    lesson: {
      id: "m11-12-l", badge: "BOSS",
      fen: "3q4/8/3k4/8/3N4/8/8/3R3K w - - 0 1",
      prompt: "Boss 1 — Nb5+ wins the queen!",
      hint: "Knight check + discovery.",
      goal: { kind: "move", from: "d4", to: "b5" },
      highlightFrom: "d4", highlightTo: "b5",
    },
    puzzle: {
      id: "m11-12-p", badge: "BOSS",
      fen: "4k3/8/8/4N3/8/8/8/4Q2K w - - 0 1",
      prompt: "Boss 2 — Nf7+ double check!",
      hint: "Knight + queen both attack.",
      goal: { kind: "move", from: "e5", to: "f7" },
      highlightFrom: "e5", highlightTo: "f7",
    },
    challenge: {
      id: "m11-12-c", badge: "BOSS",
      fen: "4k3/8/4q3/8/8/8/8/4R2K w - - 0 1",
      prompt: "Boss finale — Rxe6 deflects the defender!",
      hint: "Take the queen.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
  },
};
