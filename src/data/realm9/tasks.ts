// Module 9 — Game Phases & Planning (Tactical Mountains)
// 12 nodes covering Opening / Middlegame / Endgame and the CCT
// (Checks, Captures, Threats) thought process. All single-move tasks.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

export const MODULE9_TASKS: Record<number, NodeTasks> = {
  // 1. Opening — claim the center with e4
  1: {
    lesson: {
      id: "m9-1-l", badge: "OPENING",
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      prompt: "Opening Phase: push e2 to e4 — plant a flag in the center!",
      hint: "Pawn e2 marches two squares to e4.",
      goal: { kind: "move", from: "e2", to: "e4" },
      highlightFrom: "e2", highlightTo: "e4",
    },
    puzzle: {
      id: "m9-1-p", badge: "OPENING",
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      prompt: "Take the other center square — push d2 to d4!",
      hint: "Pawn d2 to d4.",
      goal: { kind: "move", from: "d2", to: "d4" },
      highlightFrom: "d2", highlightTo: "d4",
    },
    challenge: {
      id: "m9-1-c", badge: "OPENING",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      prompt: "Develop your Knight — g1 to f3 attacks e5!",
      hint: "Knight to a strong center square.",
      goal: { kind: "move", from: "g1", to: "f3" },
      highlightFrom: "g1", highlightTo: "f3",
    },
  },

  // 2. Opening — develop pieces
  2: {
    lesson: {
      id: "m9-2-l", badge: "DEVELOP",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 0 1",
      prompt: "Bring out the Bishop — f1 to c4 aims at f7!",
      hint: "Bishop slides to c4.",
      goal: { kind: "move", from: "f1", to: "c4" },
      highlightFrom: "f1", highlightTo: "c4",
    },
    puzzle: {
      id: "m9-2-p", badge: "DEVELOP",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/2N5/PPPP1PPP/R1BQKBNR w KQkq - 0 1",
      prompt: "Knight g1 to f3 — develop with tempo!",
      hint: "Two knights out before bishops.",
      goal: { kind: "move", from: "g1", to: "f3" },
      highlightFrom: "g1", highlightTo: "f3",
    },
    challenge: {
      id: "m9-2-c", badge: "DEVELOP",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
      prompt: "Castle kingside! King e1 to g1 — tuck the King away.",
      hint: "King e1 to g1 (short castle).",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
  },

  // 3. Opening — castle for king safety
  3: {
    lesson: {
      id: "m9-3-l", badge: "CASTLE",
      fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1",
      prompt: "Castle short — King e1 to g1!",
      hint: "Drag King two squares right.",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
    puzzle: {
      id: "m9-3-p", badge: "CASTLE",
      fen: "r3kbnr/pppqpppp/2np4/8/3PP1b1/2N1BN2/PPPQ1PPP/R3KB1R w KQkq - 0 1",
      prompt: "Long castle! King e1 to c1 — safe on the queenside.",
      hint: "King jumps two squares left.",
      goal: { kind: "move", from: "e1", to: "c1" },
      highlightFrom: "e1", highlightTo: "c1",
    },
    challenge: {
      id: "m9-3-c", badge: "CASTLE",
      fen: "rnbqk2r/ppp2ppp/3p1n2/2b1p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R w KQkq - 0 1",
      prompt: "Castle short before trouble arrives — King e1 to g1!",
      hint: "Safety first — castle now.",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
  },

  // 4. Middlegame — CHECKS first
  4: {
    lesson: {
      id: "m9-4-l", badge: "CHECK",
      fen: "4k3/8/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "CCT step 1 — Checks! Rook e1 to e8 — give check!",
      hint: "Rook slides up the e-file.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
    puzzle: {
      id: "m9-4-p", badge: "CHECK",
      fen: "7k/8/8/8/8/8/8/Q6K w - - 0 1",
      prompt: "Find the check — Queen a1 to a8!",
      hint: "Queen owns the a-file then turns the corner.",
      goal: { kind: "any-of", moves: [
        { from: "a1", to: "a8" }, { from: "a1", to: "h8" },
      ]},
      highlightFrom: "a1",
    },
    challenge: {
      id: "m9-4-c", badge: "CHECK",
      fen: "6k1/8/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Ra1 to a8 — back-rank check!",
      hint: "Rook to a8 checks the King.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
  },

  // 5. Middlegame — CAPTURES second
  5: {
    lesson: {
      id: "m9-5-l", badge: "CAPTURE",
      fen: "4k3/8/4n3/8/8/8/8/4R2K w - - 0 1",
      prompt: "CCT step 2 — Captures! Rxe6 wins the Knight!",
      hint: "Rook on e1 slides to e6 and takes.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
    puzzle: {
      id: "m9-5-p", badge: "CAPTURE",
      fen: "4k3/8/8/3q4/8/8/8/3R3K w - - 0 1",
      prompt: "Rxd5 — take the Queen for free!",
      hint: "Rook d1 captures on d5.",
      goal: { kind: "move", from: "d1", to: "d5" },
      highlightFrom: "d1", highlightTo: "d5",
    },
    challenge: {
      id: "m9-5-c", badge: "CAPTURE",
      fen: "4k3/8/8/8/4b3/8/8/B6K w - - 0 1",
      prompt: "Bxe4! Sweep the long diagonal!",
      hint: "Bishop a1 to e4 captures.",
      goal: { kind: "move", from: "a1", to: "e4" },
      highlightFrom: "a1", highlightTo: "e4",
    },
  },

  // 6. Middlegame — THREATS third
  6: {
    lesson: {
      id: "m9-6-l", badge: "THREAT",
      fen: "4k3/4q3/8/8/8/8/8/4R2K w - - 0 1",
      prompt: "CCT step 3 — Threats! Re1 to e6 attacks the Queen.",
      hint: "Rook moves up to e6.",
      goal: { kind: "move", from: "e1", to: "e6" },
      highlightFrom: "e1", highlightTo: "e6",
    },
    puzzle: {
      id: "m9-6-p", badge: "THREAT",
      fen: "3qk3/8/8/8/3R4/8/8/4K3 w - - 0 1",
      prompt: "Pin and threat — Rd4 to d7 attacks the Queen!",
      hint: "Rook slides to d7.",
      goal: { kind: "move", from: "d4", to: "d7" },
      highlightFrom: "d4", highlightTo: "d7",
    },
    challenge: {
      id: "m9-6-c", badge: "THREAT",
      fen: "4k3/8/8/4n3/8/8/8/4Q2K w - - 0 1",
      prompt: "Queen e1 to e5 — threaten the Knight and pin to the King!",
      hint: "Qe1 to e5 captures the Knight.",
      goal: { kind: "move", from: "e1", to: "e5" },
      highlightFrom: "e1", highlightTo: "e5",
    },
  },

  // 7. Middlegame — find the active plan
  7: {
    lesson: {
      id: "m9-7-l", badge: "PLAN",
      fen: "r3k2r/pppq1ppp/2np1n2/2b1p3/2B1P3/2NP1N2/PPPQ1PPP/R3K2R w KQkq - 0 1",
      prompt: "Develop and centralize — Castle short! Ke1 to g1.",
      hint: "King safety first.",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
    puzzle: {
      id: "m9-7-p", badge: "PLAN",
      fen: "r1bq1rk1/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R w KQ - 0 1",
      prompt: "Get your King safe — castle short, Ke1 to g1!",
      hint: "Always castle when you can.",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
    challenge: {
      id: "m9-7-c", badge: "PLAN",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 1",
      prompt: "Castle now — Ke1 to g1 before any tactics fly!",
      hint: "Tuck the King in.",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
  },

  // 8. Endgame — King is a fighter
  8: {
    lesson: {
      id: "m9-8-l", badge: "ENDGAME",
      fen: "8/8/8/4k3/8/8/4K3/8 w - - 0 1",
      prompt: "Endgame Phase: activate the King! Ke2 to e3 — march forward.",
      hint: "King steps up the board.",
      goal: { kind: "move", from: "e2", to: "e3" },
      highlightFrom: "e2", highlightTo: "e3",
    },
    puzzle: {
      id: "m9-8-p", badge: "ENDGAME",
      fen: "4k3/8/8/8/8/8/8/4K3 w - - 0 1",
      prompt: "Take the opposition — Ke1 to e2!",
      hint: "Move toward the enemy King.",
      goal: { kind: "move", from: "e1", to: "e2" },
      highlightFrom: "e1", highlightTo: "e2",
    },
    challenge: {
      id: "m9-8-c", badge: "ENDGAME",
      fen: "8/8/4k3/8/8/4K3/8/8 w - - 0 1",
      prompt: "Step up — Ke3 to e4 to grab the opposition!",
      hint: "Kings face off one square apart.",
      goal: { kind: "move", from: "e3", to: "e4" },
      highlightFrom: "e3", highlightTo: "e4",
    },
  },

  // 9. Endgame — passed pawn race
  9: {
    lesson: {
      id: "m9-9-l", badge: "PASSED PAWN",
      fen: "8/4P3/8/8/8/8/8/4K2k w - - 0 1",
      prompt: "Promote! Push e7 to e8 — pick a Queen!",
      hint: "Pawn marches to e8 and promotes.",
      goal: { kind: "move", from: "e7", to: "e8", promotion: "q" },
      highlightFrom: "e7", highlightTo: "e8",
    },
    puzzle: {
      id: "m9-9-p", badge: "PASSED PAWN",
      fen: "8/3P4/8/8/8/8/8/3K3k w - - 0 1",
      prompt: "Queen it — d7 to d8!",
      hint: "Promote the passed pawn.",
      goal: { kind: "move", from: "d7", to: "d8", promotion: "q" },
      highlightFrom: "d7", highlightTo: "d8",
    },
    challenge: {
      id: "m9-9-c", badge: "PASSED PAWN",
      fen: "8/P7/8/8/8/8/8/k6K w - - 0 1",
      prompt: "Race won — a7 to a8 = Queen!",
      hint: "Promote the a-pawn.",
      goal: { kind: "move", from: "a7", to: "a8", promotion: "q" },
      highlightFrom: "a7", highlightTo: "a8",
    },
  },

  // 10. Phase recognition — quick mate
  10: {
    lesson: {
      id: "m9-10-l", badge: "FINISH",
      fen: "k7/8/1K6/8/8/8/8/Q7 w - - 0 1",
      prompt: "Endgame finish — Qa1 to a7 is checkmate!",
      hint: "Queen to a7 is defended by your King on b6.",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a1",
    },
    puzzle: {
      id: "m9-10-p", badge: "FINISH",
      fen: "7k/8/6K1/8/8/8/8/Q7 w - - 0 1",
      prompt: "Mate in 1 — sweep the Queen to deliver the finish!",
      hint: "Try Qa8 — check on the back rank.",
      goal: { kind: "mate-in-1" },
      highlightFrom: "a1",
    },
    challenge: {
      id: "m9-10-c", badge: "FINISH",
      fen: "k7/8/1K6/8/8/8/8/7Q w - - 0 1",
      prompt: "Land the mate — bring the Queen across!",
      hint: "Qh1 to a8 is mate? No — try Qh1 to h8 then mate. Or look for Qa1 lines.",
      goal: { kind: "mate-in-1" },
      highlightFrom: "h1",
    },
  },

  // 11. CCT speed drill
  11: {
    lesson: {
      id: "m9-11-l", badge: "CCT",
      fen: "4k3/8/8/8/4q3/8/8/4R2K w - - 0 1",
      prompt: "Rxe4 — best Capture wins the Queen!",
      hint: "Rook e1 takes on e4.",
      goal: { kind: "move", from: "e1", to: "e4" },
      highlightFrom: "e1", highlightTo: "e4",
    },
    puzzle: {
      id: "m9-11-p", badge: "CCT",
      fen: "k7/8/8/q7/8/8/8/R6K w - - 0 1",
      prompt: "Ra1 to a5 — capture the Queen with a pin!",
      hint: "Rook climbs the a-file.",
      goal: { kind: "move", from: "a1", to: "a5" },
      highlightFrom: "a1", highlightTo: "a5",
    },
    challenge: {
      id: "m9-11-c", badge: "CCT",
      fen: "7k/8/8/8/3n4/8/8/3R3K w - - 0 1",
      prompt: "Rxd4 — scoop the Knight!",
      hint: "Rook d1 to d4 takes the Knight.",
      goal: { kind: "move", from: "d1", to: "d4" },
      highlightFrom: "d1", highlightTo: "d4",
    },
  },

  // 12. BOSS — Phase Navigator
  12: {
    lesson: {
      id: "m9-12-l", badge: "BOSS",
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      prompt: "Boss Phase 1 — Opening: claim the center with e2 to e4!",
      hint: "Push the king pawn two squares.",
      goal: { kind: "move", from: "e2", to: "e4" },
      highlightFrom: "e2", highlightTo: "e4",
    },
    puzzle: {
      id: "m9-12-p", badge: "BOSS",
      fen: "4k3/8/8/3q4/8/8/8/3R3K w - - 0 1",
      prompt: "Boss Phase 2 — Middlegame Capture! Rxd5 wins the Queen!",
      hint: "Rook d1 takes on d5.",
      goal: { kind: "move", from: "d1", to: "d5" },
      highlightFrom: "d1", highlightTo: "d5",
    },
    challenge: {
      id: "m9-12-c", badge: "BOSS",
      fen: "8/4P3/8/8/8/8/8/4K2k w - - 0 1",
      prompt: "Boss Phase 3 — Endgame Promotion! Push e7 to e8 = Queen!",
      hint: "Promote the passed pawn.",
      goal: { kind: "move", from: "e7", to: "e8", promotion: "q" },
      highlightFrom: "e7", highlightTo: "e8",
    },
  },
};
