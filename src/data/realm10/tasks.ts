// Module 10 — Counting Material and Trades (Crystal Labyrinth)
// 12 nodes teaching piece values, hanging pieces, winning trades.
// All tasks are single-move captures so feedback is instant for kids.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

export const MODULE10_TASKS: Record<number, NodeTasks> = {
  // 1. Pawn = 1 — diagonal pawn captures
  1: {
    lesson: {
      id: "m10-1-l", badge: "PAWN = 1",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1",
      prompt: "Pawns are worth 1. Take the black pawn — d4 captures e5!",
      hint: "Pawns capture diagonally. d4 grabs e5.",
      goal: { kind: "move", from: "d4", to: "e5" },
      highlightFrom: "d4", highlightTo: "e5",
    },
    puzzle: {
      id: "m10-1-p", badge: "PAWN = 1",
      fen: "rnbqkbnr/ppp1pppp/8/3p4/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 0 1",
      prompt: "Pawn snack! c4 takes d5.",
      hint: "Pawn captures one square diagonally forward.",
      goal: { kind: "move", from: "c4", to: "d5" },
      highlightFrom: "c4", highlightTo: "d5",
    },
    challenge: {
      id: "m10-1-c", badge: "PAWN = 1",
      fen: "rnbqkbnr/ppp1pppp/8/3p4/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1",
      prompt: "Two captures look possible — pick e4 takes d5!",
      hint: "exd5 — open the e-file.",
      goal: { kind: "move", from: "e4", to: "d5" },
      highlightFrom: "e4", highlightTo: "d5",
    },
  },

  // 2. Knight = 3
  2: {
    lesson: {
      id: "m10-2-l", badge: "KNIGHT = 3",
      fen: "4k3/8/3n4/8/4N3/8/8/4K3 w - - 0 1",
      prompt: "Knights are worth 3. Knight e4 leaps to d6 — Nxd6!",
      hint: "Knight L-shape: two up, one left.",
      goal: { kind: "move", from: "e4", to: "d6" },
      highlightFrom: "e4", highlightTo: "d6",
    },
    puzzle: {
      id: "m10-2-p", badge: "KNIGHT = 3",
      fen: "4k3/8/2n5/8/3N4/8/8/4K3 w - - 0 1",
      prompt: "Nxc6 — capture the enemy knight!",
      hint: "Knight d4 jumps to c6.",
      goal: { kind: "move", from: "d4", to: "c6" },
      highlightFrom: "d4", highlightTo: "c6",
    },
    challenge: {
      id: "m10-2-c", badge: "KNIGHT = 3",
      fen: "4k3/8/8/3n4/5N2/8/8/4K3 w - - 0 1",
      prompt: "Nxd5 — leap and capture!",
      hint: "Knight f4 to d5.",
      goal: { kind: "move", from: "f4", to: "d5" },
      highlightFrom: "f4", highlightTo: "d5",
    },
  },

  // 3. Bishop = 3
  3: {
    lesson: {
      id: "m10-3-l", badge: "BISHOP = 3",
      fen: "4k3/8/8/8/4b3/8/8/B3K3 w - - 0 1",
      prompt: "Bishops are worth 3. Long diagonal — Bxe4!",
      hint: "Bishop a1 slides up the a1-h8 diagonal.",
      goal: { kind: "move", from: "a1", to: "e4" },
      highlightFrom: "a1", highlightTo: "e4",
    },
    puzzle: {
      id: "m10-3-p", badge: "BISHOP = 3",
      fen: "4k3/8/4b3/8/8/8/B7/4K3 w - - 0 1",
      prompt: "Sweep the diagonal — Ba2 takes e6!",
      hint: "Bishop on a2 to e6 (a2-b3-c4-d5-e6).",
      goal: { kind: "move", from: "a2", to: "e6" },
      highlightFrom: "a2", highlightTo: "e6",
    },
    challenge: {
      id: "m10-3-c", badge: "BISHOP = 3",
      fen: "b3k3/8/8/8/8/8/8/4K2B w - - 0 1",
      prompt: "Trade bishops — Bh1 zooms to a8!",
      hint: "Long diagonal h1-a8.",
      goal: { kind: "move", from: "h1", to: "a8" },
      highlightFrom: "h1", highlightTo: "a8",
    },
  },

  // 4. Rook = 5
  4: {
    lesson: {
      id: "m10-4-l", badge: "ROOK = 5",
      fen: "4k3/8/4r3/8/8/8/8/4R2K w - - 0 1",
      prompt: "Rooks are worth 5. Rxe6 — straight up the file!",
      hint: "Rook e1 slides up to e6.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
    puzzle: {
      id: "m10-4-p", badge: "ROOK = 5",
      fen: "4k3/8/8/4r3/8/8/8/4R2K w - - 0 1",
      prompt: "Take the rook — Rxe5!",
      hint: "File is clear.",
      goal: { kind: "move", from: "e1", to: "e5" },
      highlightFrom: "e1", highlightTo: "e5",
    },
    challenge: {
      id: "m10-4-c", badge: "ROOK = 5",
      fen: "r3k3/8/8/8/8/8/8/R3K3 w - - 0 1",
      prompt: "Rxa8+ — back-rank rook trade!",
      hint: "A-file is wide open.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
  },

  // 5. Queen = 9
  5: {
    lesson: {
      id: "m10-5-l", badge: "QUEEN = 9",
      fen: "3qk3/8/8/8/8/8/8/3QK3 w - - 0 1",
      prompt: "Queens are worth 9 — the most! Qxd8+ trade queens.",
      hint: "Queen owns the d-file.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    puzzle: {
      id: "m10-5-p", badge: "QUEEN = 9",
      fen: "4k3/8/4q3/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Qxe6 — biggest trade on the board!",
      hint: "Queen e1 to e6.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
    challenge: {
      id: "m10-5-c", badge: "QUEEN = 9",
      fen: "4k3/8/8/q7/8/8/8/Q3K3 w - - 0 1",
      prompt: "Qxa5 — claim the enemy queen!",
      hint: "A-file all the way up.",
      goal: { kind: "move", from: "a1", to: "a5" },
      highlightFrom: "a1", highlightTo: "a5",
    },
  },

  // 6. Hanging pieces — free!
  6: {
    lesson: {
      id: "m10-6-l", badge: "HANGING",
      fen: "4k3/8/3n4/8/8/3Q4/8/4K3 w - - 0 1",
      prompt: "The knight is undefended — Qxd6 for free!",
      hint: "Queen slides up the d-file.",
      goal: { kind: "move", from: "d3", to: "d6" },
      highlightFrom: "d3", highlightTo: "d6",
    },
    puzzle: {
      id: "m10-6-p", badge: "HANGING",
      fen: "5k2/8/8/3r4/8/8/8/3Q3K w - - 0 1",
      prompt: "Free rook! Qxd5 — nobody is defending it.",
      hint: "Queen d1 to d5.",
      goal: { kind: "move", from: "d1", to: "d5" },
      highlightFrom: "d1", highlightTo: "d5",
    },
    challenge: {
      id: "m10-6-c", badge: "HANGING",
      fen: "k7/8/3b4/8/8/3R4/8/4K3 w - - 0 1",
      prompt: "Hanging bishop — Rxd6!",
      hint: "Rook climbs the d-file.",
      goal: { kind: "move", from: "d3", to: "d6" },
      highlightFrom: "d3", highlightTo: "d6",
    },
  },

  // 7. Don't trade down — pick the biggest target
  7: {
    lesson: {
      id: "m10-7-l", badge: "BIGGER IS BETTER",
      fen: "4k3/8/8/3q4/8/3R4/8/4K3 w - - 0 1",
      prompt: "Take the QUEEN, not a pawn — Rxd5!",
      hint: "9 > 1. Always grab the bigger piece.",
      goal: { kind: "move", from: "d3", to: "d5" },
      highlightFrom: "d3", highlightTo: "d5",
    },
    puzzle: {
      id: "m10-7-p", badge: "BIGGER IS BETTER",
      fen: "4k3/8/2p1q3/8/3N4/8/8/4K3 w - - 0 1",
      prompt: "Knight can take pawn (1) or QUEEN (9) — choose wisely!",
      hint: "Knight d4 leaps to e6.",
      goal: { kind: "move", from: "d4", to: "e6" },
      highlightFrom: "d4", highlightTo: "e6",
    },
    challenge: {
      id: "m10-7-c", badge: "BIGGER IS BETTER",
      fen: "4k3/8/2n1r3/8/8/4Q3/8/4K3 w - - 0 1",
      prompt: "Rook (5) beats Knight (3) — Qxe6!",
      hint: "Queen e3 up the e-file.",
      goal: { kind: "move", from: "e3", to: "e6" },
      highlightFrom: "e3", highlightTo: "e6",
    },
  },

  // 8. Attackers vs Defenders
  8: {
    lesson: {
      id: "m10-8-l", badge: "ATTACKERS",
      fen: "4k3/3p4/8/8/8/3R4/3R4/4K3 w - - 0 1",
      prompt: "Two attackers vs one defender — Rxd7 wins!",
      hint: "Rook d3 captures first.",
      goal: { kind: "move", from: "d3", to: "d7" },
      highlightFrom: "d3", highlightTo: "d7",
    },
    puzzle: {
      id: "m10-8-p", badge: "ATTACKERS",
      fen: "4k3/4b3/8/8/8/4R3/4R3/4K3 w - - 0 1",
      prompt: "Stack the attack — Rxe7 wins the bishop!",
      hint: "Rook on e3 fires first.",
      goal: { kind: "move", from: "e3", to: "e7" },
      highlightFrom: "e3", highlightTo: "e7",
    },
    challenge: {
      id: "m10-8-c", badge: "ATTACKERS",
      fen: "4k3/8/3r4/3p4/3R4/3R4/8/4K3 w - - 0 1",
      prompt: "Rxd5 — start the winning trade!",
      hint: "Pawn defended once, you attack twice.",
      goal: { kind: "move", from: "d4", to: "d5" },
      highlightFrom: "d4", highlightTo: "d5",
    },
  },

  // 9. Trade Queens (when you're winning, simplify)
  9: {
    lesson: {
      id: "m10-9-l", badge: "TRADE QUEENS",
      fen: "3qk3/8/3Q4/8/8/8/8/4K3 w - - 0 1",
      prompt: "Up material? Trade queens! Qxd8+.",
      hint: "Queen d6 to d8 — even swap.",
      goal: { kind: "move", from: "d6", to: "d8" },
      highlightFrom: "d6", highlightTo: "d8",
    },
    puzzle: {
      id: "m10-9-p", badge: "TRADE QUEENS",
      fen: "4k3/8/8/3q4/8/3Q4/8/4K3 w - - 0 1",
      prompt: "Qxd5 — clean queen swap!",
      hint: "D-file is open.",
      goal: { kind: "move", from: "d3", to: "d5" },
      highlightFrom: "d3", highlightTo: "d5",
    },
    challenge: {
      id: "m10-9-c", badge: "TRADE QUEENS",
      fen: "4k3/4q3/8/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Qxe7+ — trade and simplify!",
      hint: "Queen e1 fires up the e-file.",
      goal: { kind: "move", from: "e1", to: "e7" },
      highlightFrom: "e1", highlightTo: "e7",
    },
  },

  // 10. Treasure — spot the hanging piece
  10: {
    lesson: {
      id: "m10-10-l", badge: "TREASURE",
      fen: "4k3/8/3n4/8/8/3R4/8/4K3 w - - 0 1",
      prompt: "Treasure! The knight is hanging — Rxd6!",
      hint: "Rook d3 up the d-file.",
      goal: { kind: "move", from: "d3", to: "d6" },
      highlightFrom: "d3", highlightTo: "d6",
    },
    puzzle: {
      id: "m10-10-p", badge: "TREASURE",
      fen: "4k3/3r4/8/8/8/8/8/3Q3K w - - 0 1",
      prompt: "Free rook with check — Qxd7+!",
      hint: "Queen d1 to d7.",
      goal: { kind: "move", from: "d1", to: "d7" },
      highlightFrom: "d1", highlightTo: "d7",
    },
    challenge: {
      id: "m10-10-c", badge: "TREASURE",
      fen: "4k3/8/8/4b3/8/8/8/B3K3 w - - 0 1",
      prompt: "Hanging bishop on e5 — Bxe5!",
      hint: "Long diagonal a1-h8.",
      goal: { kind: "move", from: "a1", to: "e5" },
      highlightFrom: "a1", highlightTo: "e5",
    },
  },

  // 11. Best capture drill
  11: {
    lesson: {
      id: "m10-11-l", badge: "BEST CAPTURE",
      fen: "4k3/3q4/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Best capture wins material — Rxd7!",
      hint: "Rook d1 to d7.",
      goal: { kind: "move", from: "d1", to: "d7" },
      highlightFrom: "d1", highlightTo: "d7",
    },
    puzzle: {
      id: "m10-11-p", badge: "BEST CAPTURE",
      fen: "4k3/8/8/3r4/8/8/8/3Q3K w - - 0 1",
      prompt: "Pick up the rook — Qxd5!",
      hint: "Queen d1 to d5.",
      goal: { kind: "move", from: "d1", to: "d5" },
      highlightFrom: "d1", highlightTo: "d5",
    },
    challenge: {
      id: "m10-11-c", badge: "BEST CAPTURE",
      fen: "4k3/4r3/8/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Win the rook — Qxe7+!",
      hint: "Queen e1 up the e-file.",
      goal: { kind: "move", from: "e1", to: "e7" },
      highlightFrom: "e1", highlightTo: "e7",
    },
  },

  // 12. BOSS — Trade or Fade?
  12: {
    lesson: {
      id: "m10-12-l", badge: "BOSS",
      fen: "3qk3/8/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Boss round 1 — Hanging queen! Rxd8+.",
      hint: "Rook d1 to d8.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    puzzle: {
      id: "m10-12-p", badge: "BOSS",
      fen: "r3k3/8/8/8/8/8/8/R3K3 w - - 0 1",
      prompt: "Boss round 2 — Rook trade! Rxa8+.",
      hint: "A-file is wide open.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    challenge: {
      id: "m10-12-c", badge: "BOSS",
      fen: "4k3/8/8/3q4/8/3Q4/8/4K3 w - - 0 1",
      prompt: "Boss finale — Trade queens to win! Qxd5.",
      hint: "Queen d3 to d5.",
      goal: { kind: "move", from: "d3", to: "d5" },
      highlightFrom: "d3", highlightTo: "d5",
    },
  },
};
