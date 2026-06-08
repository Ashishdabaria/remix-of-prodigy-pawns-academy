// Module 14 — Advanced Tactics: Combinations & Sacrifices (Citadel of Checkmate)
// 12 nodes: removing defenders, X-ray, Greek Gift, sac patterns.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

export const MODULE14_TASKS: Record<number, NodeTasks> = {
  // 1. Remove the defender
  1: {
    lesson: {
      id: "m14-1-l", badge: "REMOVE",
      fen: "4k3/8/8/8/3q4/8/8/3R3K w - - 0 1",
      prompt: "Capture the defender — Rxd4!",
      hint: "Rook takes the queen.",
      goal: { kind: "move", from: "d1", to: "d4" },
      highlightFrom: "d1", highlightTo: "d4",
    },
    puzzle: {
      id: "m14-1-p", badge: "REMOVE",
      fen: "4k3/8/8/3q4/8/8/8/3R3K w - - 0 1",
      prompt: "Rxd5 — remove the defender!",
      hint: "Rook climbs to d5.",
      goal: { kind: "move", from: "d1", to: "d5" },
      highlightFrom: "d1", highlightTo: "d5",
    },
    challenge: {
      id: "m14-1-c", badge: "REMOVE",
      fen: "4k3/8/3q4/8/8/8/8/3R3K w - - 0 1",
      prompt: "Rxd6+ — defender gone, check!",
      hint: "Rook to d6.",
      goal: { kind: "move", from: "d1", to: "d6" },
      highlightFrom: "d1", highlightTo: "d6",
    },
  },

  // 2. Sacrifice for mate-style — give a rook to win the queen
  2: {
    lesson: {
      id: "m14-2-l", badge: "SAC",
      fen: "3q4/8/3k4/8/3N4/8/8/3R3K w - - 0 1",
      prompt: "Nb5+ — knight check wins the queen!",
      hint: "Discovered double attack.",
      goal: { kind: "move", from: "d4", to: "b5" },
      highlightFrom: "d4", highlightTo: "b5",
    },
    puzzle: {
      id: "m14-2-p", badge: "SAC",
      fen: "3q4/8/4k3/8/3N4/8/8/3R3K w - - 0 1",
      prompt: "Nf5+ — fork-discovery wins the queen!",
      hint: "Knight check + discovery.",
      goal: { kind: "move", from: "d4", to: "f5" },
      highlightFrom: "d4", highlightTo: "f5",
    },
    challenge: {
      id: "m14-2-c", badge: "SAC",
      fen: "3q4/8/2k5/8/3N4/8/8/3R3K w - - 0 1",
      prompt: "Nb5+ — sacrifice nothing, win everything!",
      hint: "Knight to b5.",
      goal: { kind: "move", from: "d4", to: "b5" },
      highlightFrom: "d4", highlightTo: "b5",
    },
  },

  // 3. X-ray attack
  3: {
    lesson: {
      id: "m14-3-l", badge: "X-RAY",
      fen: "3r4/8/8/8/8/8/8/3RK3 w - - 0 1",
      prompt: "X-ray attack — Rxd8!",
      hint: "Rook straight up the file to win the rook.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    puzzle: {
      id: "m14-3-p", badge: "X-RAY",
      fen: "4r3/8/8/8/8/8/8/4R1K1 w - - 0 1",
      prompt: "Rxe8 — X-ray rook attack!",
      hint: "Rook to e8.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
    challenge: {
      id: "m14-3-c", badge: "X-RAY",
      fen: "r7/8/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Rxa8 — X-ray attack!",
      hint: "Rook climbs a-file.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
  },

  // 4. Greek Gift idea — bishop sac toward king
  4: {
    lesson: {
      id: "m14-4-l", badge: "GREEK GIFT",
      fen: "4k3/8/8/8/8/8/8/B3K3 w - - 0 1",
      prompt: "Bishop sweeps — Bh8!",
      hint: "Long diagonal sacrifice idea.",
      goal: { kind: "move", from: "a1", to: "h8" },
      highlightFrom: "a1", highlightTo: "h8",
    },
    puzzle: {
      id: "m14-4-p", badge: "GREEK GIFT",
      fen: "4k3/8/8/8/8/8/8/4K2B w - - 0 1",
      prompt: "Ba8 — bishop attacks!",
      hint: "Long diagonal.",
      goal: { kind: "move", from: "h1", to: "a8" },
      highlightFrom: "h1", highlightTo: "a8",
    },
    challenge: {
      id: "m14-4-c", badge: "GREEK GIFT",
      fen: "4k3/8/8/8/8/8/8/2B1K3 w - - 0 1",
      prompt: "Bh6 — control the dark squares!",
      hint: "Bishop c1 to h6.",
      goal: { kind: "move", from: "c1", to: "h6" },
      highlightFrom: "c1", highlightTo: "h6",
    },
  },

  // 5. Zugzwang vibe — force a bad move (we just win the piece)
  5: {
    lesson: {
      id: "m14-5-l", badge: "ZUGZWANG",
      fen: "4k3/8/8/8/8/3q4/8/3Q3K w - - 0 1",
      prompt: "Qxd3 — clean queen trade!",
      hint: "Take the queen.",
      goal: { kind: "move", from: "d1", to: "d3" },
      highlightFrom: "d1", highlightTo: "d3",
    },
    puzzle: {
      id: "m14-5-p", badge: "ZUGZWANG",
      fen: "4k3/8/8/8/3q4/8/8/3Q3K w - - 0 1",
      prompt: "Qxd4 — winning trade!",
      hint: "Queen to d4.",
      goal: { kind: "move", from: "d1", to: "d4" },
      highlightFrom: "d1", highlightTo: "d4",
    },
    challenge: {
      id: "m14-5-c", badge: "ZUGZWANG",
      fen: "4k3/8/4q3/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Qxe6+ — squeeze and capture!",
      hint: "Queen up the e-file.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
  },

  // 6. Combo — discovered + capture
  6: {
    lesson: {
      id: "m14-6-l", badge: "COMBO",
      fen: "4k3/8/8/8/4N3/8/8/4R2K w - - 0 1",
      prompt: "Nd6+ — knight + rook double check combo!",
      hint: "Knight to d6.",
      goal: { kind: "move", from: "e4", to: "d6" },
      highlightFrom: "e4", highlightTo: "d6",
    },
    puzzle: {
      id: "m14-6-p", badge: "COMBO",
      fen: "4k3/8/8/4N3/8/8/8/4Q2K w - - 0 1",
      prompt: "Nf7+ — combo discovered check!",
      hint: "Knight off e-file.",
      goal: { kind: "move", from: "e5", to: "f7" },
      highlightFrom: "e5", highlightTo: "f7",
    },
    challenge: {
      id: "m14-6-c", badge: "COMBO",
      fen: "4k3/8/4N3/8/8/8/8/4R2K w - - 0 1",
      prompt: "Nc7+ — discovered combo!",
      hint: "Knight to c7.",
      goal: { kind: "move", from: "e6", to: "c7" },
      highlightFrom: "e6", highlightTo: "c7",
    },
  },

  // 7. Decoy — lure the king
  7: {
    lesson: {
      id: "m14-7-l", badge: "DECOY",
      fen: "4k3/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Re8+ — decoy the king!",
      hint: "Rook to e8 with check.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
    puzzle: {
      id: "m14-7-p", badge: "DECOY",
      fen: "4k3/8/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Rd8+ — lure the king!",
      hint: "Rook to d8.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    challenge: {
      id: "m14-7-c", badge: "DECOY",
      fen: "4k3/8/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Ra8+ — decoy from the corner!",
      hint: "Rook climbs a-file.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
  },

  // 8. Battery attack
  8: {
    lesson: {
      id: "m14-8-l", badge: "BATTERY",
      fen: "4k3/8/8/8/8/4R3/8/4Q2K w - - 0 1",
      prompt: "Battery fire — Re8+!",
      hint: "Rook climbs from e3.",
      goal: { kind: "move", from: "e3", to: "e8" },
      highlightFrom: "e3", highlightTo: "e8",
    },
    puzzle: {
      id: "m14-8-p", badge: "BATTERY",
      fen: "4k3/8/8/8/4R3/8/8/4Q2K w - - 0 1",
      prompt: "Re8+ — battery checkmate idea!",
      hint: "Rook all the way up.",
      goal: { kind: "move", from: "e4", to: "e8" },
      highlightFrom: "e4", highlightTo: "e8",
    },
    challenge: {
      id: "m14-8-c", badge: "BATTERY",
      fen: "4k3/8/4R3/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Re8+ — battery wins!",
      hint: "Rook climbs.",
      goal: { kind: "move", from: "e6", to: "e8" },
      highlightFrom: "e6", highlightTo: "e8",
    },
  },

  // 9. Skewer combo
  9: {
    lesson: {
      id: "m14-9-l", badge: "SKEWER",
      fen: "3qk3/8/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Rd8+ — skewer the queen!",
      hint: "Rook to d8.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    puzzle: {
      id: "m14-9-p", badge: "SKEWER",
      fen: "4kq2/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Re8+ — skewer king to queen!",
      hint: "Rook climbs the e-file.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
    challenge: {
      id: "m14-9-c", badge: "SKEWER",
      fen: "7k/4q3/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Rxe7 — skewer wins the queen!",
      hint: "Rook climbs the e-file.",
      goal: { kind: "move", from: "e1", to: "e7" },
      highlightFrom: "e1", highlightTo: "e7",
    },
  },

  // 10. Treasure — big combo
  10: {
    lesson: {
      id: "m14-10-l", badge: "TREASURE",
      fen: "3q4/8/3k4/8/4N3/8/8/3R3K w - - 0 1",
      prompt: "Treasure! Nc5 — wins the queen!",
      hint: "Knight off the e-file.",
      goal: { kind: "move", from: "e4", to: "c5" },
      highlightFrom: "e4", highlightTo: "c5",
    },
    puzzle: {
      id: "m14-10-p", badge: "TREASURE",
      fen: "3q4/8/4k3/8/3N4/8/8/3R3K w - - 0 1",
      prompt: "Nf5+ — combo treasure!",
      hint: "Knight to f5.",
      goal: { kind: "move", from: "d4", to: "f5" },
      highlightFrom: "d4", highlightTo: "f5",
    },
    challenge: {
      id: "m14-10-c", badge: "TREASURE",
      fen: "3qk3/8/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Rxd8+ — golden tactic!",
      hint: "Take the queen with check.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
  },

  // 11. Mixed combo drill
  11: {
    lesson: {
      id: "m14-11-l", badge: "DRILL",
      fen: "4k3/8/8/8/4N3/8/8/4R2K w - - 0 1",
      prompt: "Nd6+ — combo drill!",
      hint: "Knight to d6.",
      goal: { kind: "move", from: "e4", to: "d6" },
      highlightFrom: "e4", highlightTo: "d6",
    },
    puzzle: {
      id: "m14-11-p", badge: "DRILL",
      fen: "4k3/8/8/3q4/8/3N4/8/3R2K1 w - - 0 1",
      prompt: "Nb4 — discovered combo!",
      hint: "Knight off the d-file.",
      goal: { kind: "move", from: "d3", to: "b4" },
      highlightFrom: "d3", highlightTo: "b4",
    },
    challenge: {
      id: "m14-11-c", badge: "DRILL",
      fen: "4k3/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Re8+ — finish the drill!",
      hint: "Rook climbs.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
  },

  // 12. BOSS — The Combination Engine
  12: {
    lesson: {
      id: "m14-12-l", badge: "BOSS",
      fen: "3qk3/8/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Boss 1 — Rxd8+!",
      hint: "Take queen with check.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    puzzle: {
      id: "m14-12-p", badge: "BOSS",
      fen: "3q4/8/3k4/8/3N4/8/8/3R3K w - - 0 1",
      prompt: "Boss 2 — Nb5+ wins queen!",
      hint: "Knight check + discovery.",
      goal: { kind: "move", from: "d4", to: "b5" },
      highlightFrom: "d4", highlightTo: "b5",
    },
    challenge: {
      id: "m14-12-c", badge: "BOSS",
      fen: "4k3/8/4q3/8/8/8/8/4R2K w - - 0 1",
      prompt: "Boss finale — Rxe6 combination!",
      hint: "Take the queen.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
  },
};
