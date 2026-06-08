// Module 15 — Tournament Preparation & Game Analysis (Citadel of Checkmate)
// 12 nodes: notation, opening repertoire, clock management, blunder spotting.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

export const MODULE15_TASKS: Record<number, NodeTasks> = {
  // 1. Notation — e4 opening move
  1: {
    lesson: {
      id: "m15-1-l", badge: "NOTATION",
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      prompt: "1.e4 — the king's pawn opening!",
      hint: "Pawn e2 to e4.",
      goal: { kind: "move", from: "e2", to: "e4" },
      highlightFrom: "e2", highlightTo: "e4",
    },
    puzzle: {
      id: "m15-1-p", badge: "NOTATION",
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      prompt: "1.d4 — the queen's pawn opening!",
      hint: "Pawn d2 to d4.",
      goal: { kind: "move", from: "d2", to: "d4" },
      highlightFrom: "d2", highlightTo: "d4",
    },
    challenge: {
      id: "m15-1-c", badge: "NOTATION",
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      prompt: "1.c4 — the English opening!",
      hint: "Pawn c2 to c4.",
      goal: { kind: "move", from: "c2", to: "c4" },
      highlightFrom: "c2", highlightTo: "c4",
    },
  },

  // 2. Develop knight — Nf3
  2: {
    lesson: {
      id: "m15-2-l", badge: "DEVELOP",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      prompt: "Develop! Nf3 attacks the e5 pawn.",
      hint: "Knight g1 to f3.",
      goal: { kind: "move", from: "g1", to: "f3" },
      highlightFrom: "g1", highlightTo: "f3",
    },
    puzzle: {
      id: "m15-2-p", badge: "DEVELOP",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      prompt: "Nc3 — develop the queenside knight!",
      hint: "Knight b1 to c3.",
      goal: { kind: "move", from: "b1", to: "c3" },
      highlightFrom: "b1", highlightTo: "c3",
    },
    challenge: {
      id: "m15-2-c", badge: "DEVELOP",
      fen: "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
      prompt: "Bc4 — Italian game!",
      hint: "Bishop f1 to c4.",
      goal: { kind: "move", from: "f1", to: "c4" },
      highlightFrom: "f1", highlightTo: "c4",
    },
  },

  // 3. Castle — king safety
  3: {
    lesson: {
      id: "m15-3-l", badge: "CASTLE",
      fen: "rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      prompt: "Castle short — O-O! (king to g1)",
      hint: "King e1 to g1.",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
    puzzle: {
      id: "m15-3-p", badge: "CASTLE",
      fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 6 5",
      prompt: "O-O — get the king to safety!",
      hint: "King e1 to g1.",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
    challenge: {
      id: "m15-3-c", badge: "CASTLE",
      fen: "rnbqk2r/ppppbppp/5n2/4p3/4P3/3B1N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      prompt: "O-O — castle kingside!",
      hint: "King e1 to g1.",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
  },

  // 4. CCT — find the check
  4: {
    lesson: {
      id: "m15-4-l", badge: "CHECK",
      fen: "4k3/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Re8+ — find the check!",
      hint: "Rook climbs the e-file.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
    puzzle: {
      id: "m15-4-p", badge: "CHECK",
      fen: "4k3/8/8/8/8/8/8/3Q3K w - - 0 1",
      prompt: "Qd8+ — check from the d-file!",
      hint: "Queen to d8.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    challenge: {
      id: "m15-4-c", badge: "CHECK",
      fen: "4k3/8/8/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Qe8+ — direct check!",
      hint: "Queen to e8.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
  },

  // 5. Best capture — count first
  5: {
    lesson: {
      id: "m15-5-l", badge: "CAPTURE",
      fen: "4k3/8/3q4/8/8/8/8/3R3K w - - 0 1",
      prompt: "Rxd6+ — best capture!",
      hint: "Rook takes queen.",
      goal: { kind: "move", from: "d1", to: "d6" },
      highlightFrom: "d1", highlightTo: "d6",
    },
    puzzle: {
      id: "m15-5-p", badge: "CAPTURE",
      fen: "4k3/8/4r3/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Qxe6+ — best capture wins material!",
      hint: "Queen up the e-file.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
    challenge: {
      id: "m15-5-c", badge: "CAPTURE",
      fen: "4k3/8/8/3q4/8/8/8/3Q3K w - - 0 1",
      prompt: "Qxd5 — clean queen swap when ahead!",
      hint: "Queen to d5.",
      goal: { kind: "move", from: "d1", to: "d5" },
      highlightFrom: "d1", highlightTo: "d5",
    },
  },

  // 6. Threats — block them
  6: {
    lesson: {
      id: "m15-6-l", badge: "THREAT",
      fen: "4k3/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Re8+ — make your own threat first!",
      hint: "Rook to e8.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
    puzzle: {
      id: "m15-6-p", badge: "THREAT",
      fen: "4k3/8/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Rd8+ — strongest threat first!",
      hint: "Rook to d8.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    challenge: {
      id: "m15-6-c", badge: "THREAT",
      fen: "4k3/8/8/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Qe8+ — big threat!",
      hint: "Queen to e8.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
  },

  // 7. Spot the blunder — find the saving move
  7: {
    lesson: {
      id: "m15-7-l", badge: "BLUNDER",
      fen: "4k3/8/4q3/8/8/8/8/4R2K w - - 0 1",
      prompt: "Take the hanging queen — Rxe6!",
      hint: "Punish the blunder.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
    puzzle: {
      id: "m15-7-p", badge: "BLUNDER",
      fen: "4k3/8/8/3q4/8/8/8/3R3K w - - 0 1",
      prompt: "Rxd5 — punish the blunder!",
      hint: "Rook takes queen.",
      goal: { kind: "move", from: "d1", to: "d5" },
      highlightFrom: "d1", highlightTo: "d5",
    },
    challenge: {
      id: "m15-7-c", badge: "BLUNDER",
      fen: "4k3/4q3/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Rxe7+ — claim the dropped queen!",
      hint: "Rook climbs all the way.",
      goal: { kind: "move", from: "e1", to: "e7" },
      highlightFrom: "e1", highlightTo: "e7",
    },
  },

  // 8. Clock pressure — find a fast move
  8: {
    lesson: {
      id: "m15-8-l", badge: "TIME",
      fen: "4k3/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Quick! Re8+ — easy check!",
      hint: "Rook to e8 — fast and safe.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
    puzzle: {
      id: "m15-8-p", badge: "TIME",
      fen: "4k3/8/8/8/8/8/8/3Q3K w - - 0 1",
      prompt: "Qd8+ — fast and forcing!",
      hint: "Queen to d8.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    challenge: {
      id: "m15-8-c", badge: "TIME",
      fen: "4k3/8/8/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Qe8+ — instant check!",
      hint: "Queen to e8.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
  },

  // 9. Endgame technique — promote
  9: {
    lesson: {
      id: "m15-9-l", badge: "ENDGAME",
      fen: "4k3/3P4/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "d8=Q+ — clean endgame technique!",
      hint: "Promote the pawn.",
      goal: { kind: "move", from: "d7", to: "d8" },
      highlightFrom: "d7", highlightTo: "d8",
    },
    puzzle: {
      id: "m15-9-p", badge: "ENDGAME",
      fen: "4k3/P7/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "a8=Q — promote and win!",
      hint: "Push to a8.",
      goal: { kind: "move", from: "a7", to: "a8" },
      highlightFrom: "a7", highlightTo: "a8",
    },
    challenge: {
      id: "m15-9-c", badge: "ENDGAME",
      fen: "4k3/7P/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "h8=Q — secure the win!",
      hint: "Pawn h7 to h8.",
      goal: { kind: "move", from: "h7", to: "h8" },
      highlightFrom: "h7", highlightTo: "h8",
    },
  },

  // 10. Treasure — the winning move
  10: {
    lesson: {
      id: "m15-10-l", badge: "TREASURE",
      fen: "3qk3/8/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Treasure! Rxd8+ — winning combo!",
      hint: "Rook takes queen.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    puzzle: {
      id: "m15-10-p", badge: "TREASURE",
      fen: "4kq2/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Re8+ — skewer the queen!",
      hint: "Rook climbs to e8.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
    challenge: {
      id: "m15-10-c", badge: "TREASURE",
      fen: "3q4/8/3k4/8/3N4/8/8/3R3K w - - 0 1",
      prompt: "Nb5+ — golden tactic!",
      hint: "Knight check + discovery.",
      goal: { kind: "move", from: "d4", to: "b5" },
      highlightFrom: "d4", highlightTo: "b5",
    },
  },

  // 11. Tournament drill — checks first
  11: {
    lesson: {
      id: "m15-11-l", badge: "DRILL",
      fen: "4k3/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "Re8+ — find the check!",
      hint: "Rook to e8.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
    puzzle: {
      id: "m15-11-p", badge: "DRILL",
      fen: "4k3/8/8/8/8/8/8/3Q3K w - - 0 1",
      prompt: "Qd8+ — drill complete!",
      hint: "Queen to d8.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    challenge: {
      id: "m15-11-c", badge: "DRILL",
      fen: "4k3/8/4q3/8/8/8/8/4R2K w - - 0 1",
      prompt: "Rxe6 — best move!",
      hint: "Take the queen.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
  },

  // 12. BOSS — The Tournament Simulator
  12: {
    lesson: {
      id: "m15-12-l", badge: "BOSS",
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      prompt: "Boss round 1 — open with 1.e4!",
      hint: "Best opening move.",
      goal: { kind: "move", from: "e2", to: "e4" },
      highlightFrom: "e2", highlightTo: "e4",
    },
    puzzle: {
      id: "m15-12-p", badge: "BOSS",
      fen: "rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      prompt: "Boss round 2 — O-O, get king safe!",
      hint: "Castle kingside.",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
    challenge: {
      id: "m15-12-c", badge: "BOSS",
      fen: "3qk3/8/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Boss finale — Rxd8+ — TOURNAMENT CHAMPION!",
      hint: "Take the queen with check.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
  },
};
