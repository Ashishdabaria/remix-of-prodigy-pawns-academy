// Module 5 — Opening Principles (Floating Islands)
// Starting positions + canonical opening moves. Each task asks for one
// specific developing move, controlled center push, or castle.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

const START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const MODULE5_TASKS: Record<number, NodeTasks> = {
  // 1. Control the Center — e4 or d4
  1: {
    lesson: {
      id: "m5-1-l", badge: "CENTER",
      fen: START,
      prompt: "Push your King's pawn to e4 — claim the center!",
      hint: "Pawn e2 leaps to e4.",
      goal: { kind: "move", from: "e2", to: "e4" },
      highlightFrom: "e2", highlightTo: "e4",
    },
    puzzle: {
      id: "m5-1-p", badge: "CENTER",
      fen: START,
      prompt: "Try the Queen's pawn — d2 to d4!",
      hint: "Pawn d2 leaps to d4.",
      goal: { kind: "move", from: "d2", to: "d4" },
      highlightFrom: "d2", highlightTo: "d4",
    },
    challenge: {
      id: "m5-1-c", badge: "CENTER",
      fen: START,
      prompt: "Center grab — pick e4 or d4!",
      hint: "Both work — push e2-e4 or d2-d4.",
      goal: { kind: "any-of", moves: [{ from: "e2", to: "e4" }, { from: "d2", to: "d4" }] },
      highlightFrom: "e2",
    },
  },

  // 2. Develop Knights — Nf3, Nc3
  2: {
    lesson: {
      id: "m5-2-l", badge: "KNIGHTS",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      prompt: "Develop your King's Knight — Ng1 to f3!",
      hint: "Knights before bishops! Nf3 attacks the e5 pawn too.",
      goal: { kind: "move", from: "g1", to: "f3" },
      highlightFrom: "g1", highlightTo: "f3",
    },
    puzzle: {
      id: "m5-2-p", badge: "KNIGHTS",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
      prompt: "Black to move — develop your Knight to c6!",
      hint: "Nb8 to c6 defends e5 and develops.",
      goal: { kind: "move", from: "b8", to: "c6" },
      highlightFrom: "b8", highlightTo: "c6",
    },
    challenge: {
      id: "m5-2-c", badge: "KNIGHTS",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
      prompt: "Develop the Queen's Knight — Nb1 to c3!",
      hint: "Nb1 to c3 — knights out first!",
      goal: { kind: "move", from: "b1", to: "c3" },
      highlightFrom: "b1", highlightTo: "c3",
    },
  },

  // 3. Develop Bishops — Bc4, Bb5
  3: {
    lesson: {
      id: "m5-3-l", badge: "BISHOPS",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4",
      prompt: "Develop your light Bishop — Bf1 to c4!",
      hint: "Bf1 to c4 — aims at f7!",
      goal: { kind: "move", from: "f1", to: "c4" },
      highlightFrom: "f1", highlightTo: "c4",
    },
    puzzle: {
      id: "m5-3-p", badge: "BISHOPS",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
      prompt: "Develop the bishop — Bf1 to b5!",
      hint: "Bf1 to b5 — Spanish Opening style!",
      goal: { kind: "move", from: "f1", to: "b5" },
      highlightFrom: "f1", highlightTo: "b5",
    },
    challenge: {
      id: "m5-3-c", badge: "BISHOPS",
      fen: "r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3",
      prompt: "Black: develop your bishop — Bf8 to c5!",
      hint: "Bf8 to c5 — Italian setup.",
      goal: { kind: "any-of", moves: [{ from: "f8", to: "c5" }, { from: "f8", to: "e7" }, { from: "f8", to: "d6" }] },
      highlightFrom: "f8",
    },
  },

  // 4. Castle Early — King's-side castling
  4: {
    lesson: {
      id: "m5-4-l", badge: "CASTLE",
      fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5",
      prompt: "Tuck the King away — castle kingside!",
      hint: "Drag King e1 to g1 — that's castling!",
      goal: { kind: "any-of", moves: [{ from: "e1", to: "g1" }] },
      highlightFrom: "e1", highlightTo: "g1",
    },
    puzzle: {
      id: "m5-4-p", badge: "CASTLE",
      fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQ1RK1 b kq - 5 5",
      prompt: "Black to castle — King e8 to g8!",
      hint: "Drag king e8 to g8 — short castle!",
      goal: { kind: "move", from: "e8", to: "g8" },
      highlightFrom: "e8", highlightTo: "g8",
    },
    challenge: {
      id: "m5-4-c", badge: "CASTLE",
      fen: "rnbqk2r/ppp2ppp/3bpn2/3p4/3P4/2N1PN2/PPP1BPPP/R1BQK2R w KQkq - 0 5",
      prompt: "Time to castle — King e1 to g1!",
      hint: "Castle kingside — keep your king safe!",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
  },

  // 5. One Move Per Piece — develop a NEW piece
  5: {
    lesson: {
      id: "m5-5-l", badge: "DEVELOP",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      prompt: "Don't move e4 again — develop a new piece! Nf3 is great.",
      hint: "Knight g1 to f3.",
      goal: { kind: "move", from: "g1", to: "f3" },
      highlightFrom: "g1", highlightTo: "f3",
    },
    puzzle: {
      id: "m5-5-p", badge: "DEVELOP",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
      prompt: "Black: bring out a new piece — Nb8 to c6!",
      hint: "Knight b8 to c6.",
      goal: { kind: "move", from: "b8", to: "c6" },
      highlightFrom: "b8", highlightTo: "c6",
    },
    challenge: {
      id: "m5-5-c", badge: "DEVELOP",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
      prompt: "Bring out the bishop — Bf1 to c4!",
      hint: "Develop a NEW piece — bishop to c4.",
      goal: { kind: "any-of", moves: [{ from: "f1", to: "c4" }, { from: "f1", to: "b5" }, { from: "f1", to: "e2" }] },
      highlightFrom: "f1",
    },
  },

  // 6. Connect the Rooks — castle so the rooks see each other
  6: {
    lesson: {
      id: "m5-6-l", badge: "CONNECT",
      fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 4 5",
      prompt: "Castle to connect the rooks!",
      hint: "King e1 to g1 — castle short.",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
    puzzle: {
      id: "m5-6-p", badge: "CONNECT",
      fen: "r2qk2r/pppb1ppp/2n2n2/2bpp3/2B1P3/2NP1N2/PPP2PPP/R1BQ1RK1 b kq - 0 7",
      prompt: "Black: castle to connect your rooks!",
      hint: "King e8 to g8.",
      goal: { kind: "move", from: "e8", to: "g8" },
      highlightFrom: "e8", highlightTo: "g8",
    },
    challenge: {
      id: "m5-6-c", badge: "CONNECT",
      fen: "rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      prompt: "Castle — connect rooks first!",
      hint: "King e1 to g1.",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
  },

  // 7. Best 1st Move — only center pawn pushes accepted
  7: {
    lesson: {
      id: "m5-7-l", badge: "1st MOVE",
      fen: START,
      prompt: "Pick the best opening move!",
      hint: "Centre pawns: e2-e4 or d2-d4.",
      goal: { kind: "any-of", moves: [{ from: "e2", to: "e4" }, { from: "d2", to: "d4" }] },
      highlightFrom: "e2",
    },
    puzzle: {
      id: "m5-7-p", badge: "1st MOVE",
      fen: START,
      prompt: "Try the King's pawn opening — e2 to e4!",
      hint: "e2 to e4.",
      goal: { kind: "move", from: "e2", to: "e4" },
      highlightFrom: "e2", highlightTo: "e4",
    },
    challenge: {
      id: "m5-7-c", badge: "1st MOVE",
      fen: START,
      prompt: "Knight's first move (Réti-style) — Nf3!",
      hint: "Knight g1 to f3.",
      goal: { kind: "any-of", moves: [{ from: "g1", to: "f3" }, { from: "e2", to: "e4" }, { from: "d2", to: "d4" }] },
      highlightFrom: "g1",
    },
  },

  // 8. Best 2nd Move — develop knight
  8: {
    lesson: {
      id: "m5-8-l", badge: "2nd MOVE",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      prompt: "Best 2nd move — Nf3 develops AND attacks!",
      hint: "Knight g1 to f3.",
      goal: { kind: "move", from: "g1", to: "f3" },
      highlightFrom: "g1", highlightTo: "f3",
    },
    puzzle: {
      id: "m5-8-p", badge: "2nd MOVE",
      fen: "rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2",
      prompt: "After 1.d4 d5 — best is Nf3 or c4!",
      hint: "Knight g1 to f3, or pawn c2 to c4.",
      goal: { kind: "any-of", moves: [{ from: "g1", to: "f3" }, { from: "c2", to: "c4" }] },
      highlightFrom: "g1",
    },
    challenge: {
      id: "m5-8-c", badge: "2nd MOVE",
      fen: "rnbqkb1r/pppp1ppp/5n2/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
      prompt: "Develop the bishop — Bc4!",
      hint: "Bishop f1 to c4 (Italian opening).",
      goal: { kind: "move", from: "f1", to: "c4" },
      highlightFrom: "f1", highlightTo: "c4",
    },
  },

  // 9. Castle Now!
  9: {
    lesson: {
      id: "m5-9-l", badge: "CASTLE",
      fen: "rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      prompt: "It's time — castle kingside!",
      hint: "King e1 to g1.",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
    puzzle: {
      id: "m5-9-p", badge: "CASTLE",
      fen: "rnbqk2r/pppp1ppp/5n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQ1RK1 b kq - 5 4",
      prompt: "Black to castle!",
      hint: "King e8 to g8.",
      goal: { kind: "move", from: "e8", to: "g8" },
      highlightFrom: "e8", highlightTo: "g8",
    },
    challenge: {
      id: "m5-9-c", badge: "CASTLE",
      fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 6 5",
      prompt: "Castle now — both sides developed!",
      hint: "King e1 to g1.",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
  },

  // 10. Rule the Center — central pawn push
  10: {
    lesson: {
      id: "m5-10-l", badge: "RULE",
      fen: "rnbqkb1r/pppp1ppp/5n2/4p3/2P5/8/PP1PPPPP/RNBQKBNR w KQkq - 1 2",
      prompt: "Stake the center — push d2 to d4!",
      hint: "Pawn d2 to d4 — strong center!",
      goal: { kind: "move", from: "d2", to: "d4" },
      highlightFrom: "d2", highlightTo: "d4",
    },
    puzzle: {
      id: "m5-10-p", badge: "RULE",
      fen: "rnbqkbnr/ppp1pppp/8/3p4/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 2",
      prompt: "Challenge the center — c4!",
      hint: "Pawn c2 to c4 (Queen's Gambit).",
      goal: { kind: "any-of", moves: [{ from: "c2", to: "c4" }, { from: "d2", to: "d4" }] },
      highlightFrom: "c2",
    },
    challenge: {
      id: "m5-10-c", badge: "RULE",
      fen: "rnbqkbnr/pp1p1ppp/8/2p1p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3",
      prompt: "Center master — push d2 to d4!",
      hint: "Pawn d2 to d4 — break the center wide open.",
      goal: { kind: "move", from: "d2", to: "d4" },
      highlightFrom: "d2", highlightTo: "d4",
    },
  },

  // 11. Spot the Mistake — pick the GOOD move
  11: {
    lesson: {
      id: "m5-11-l", badge: "SPOT",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      prompt: "Don't move the queen out early — develop Nf3 instead!",
      hint: "Knight g1 to f3.",
      goal: { kind: "move", from: "g1", to: "f3" },
      highlightFrom: "g1", highlightTo: "f3",
    },
    puzzle: {
      id: "m5-11-p", badge: "SPOT",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
      prompt: "Don't move pawn h-side — develop Knight c6!",
      hint: "Knight b8 to c6.",
      goal: { kind: "move", from: "b8", to: "c6" },
      highlightFrom: "b8", highlightTo: "c6",
    },
    challenge: {
      id: "m5-11-c", badge: "SPOT",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3",
      prompt: "Right plan: develop bishop — Bc4!",
      hint: "Bishop f1 to c4 (or b5).",
      goal: { kind: "any-of", moves: [{ from: "f1", to: "c4" }, { from: "f1", to: "b5" }] },
      highlightFrom: "f1",
    },
  },

  // 12. BOSS — Opening Speedrun
  12: {
    lesson: {
      id: "m5-12-l", badge: "BOSS",
      fen: START,
      prompt: "Boss warm-up — best opening move!",
      hint: "e2 to e4 or d2 to d4.",
      goal: { kind: "any-of", moves: [{ from: "e2", to: "e4" }, { from: "d2", to: "d4" }] },
      highlightFrom: "e2",
    },
    puzzle: {
      id: "m5-12-p", badge: "BOSS",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
      prompt: "Boss puzzle — best 2nd move!",
      hint: "Knight g1 to f3 — develop AND attack.",
      goal: { kind: "move", from: "g1", to: "f3" },
      highlightFrom: "g1", highlightTo: "f3",
    },
    challenge: {
      id: "m5-12-c", badge: "BOSS",
      fen: "r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 6 5",
      prompt: "Boss finisher — castle kingside!",
      hint: "King e1 to g1 — Opening Scholar badge unlocked!",
      goal: { kind: "move", from: "e1", to: "g1" },
      highlightFrom: "e1", highlightTo: "g1",
    },
  },
};
