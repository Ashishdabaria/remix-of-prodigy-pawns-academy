// Module 8 — Guard the Castle (Quick Mates & Weak Squares)
// 12 nodes. White-to-move single-move tasks: Scholar's Mate ideas,
// back-rank mates, smothered mate, and f7-weakness attacks.

import type { QuestTask } from "@/components/realm/QuestBoard";

export interface NodeTasks {
  lesson: QuestTask;
  puzzle: QuestTask;
  challenge: QuestTask;
}

export const MODULE8_TASKS: Record<number, NodeTasks> = {
  // 1. f7 — the weakest square
  1: {
    lesson: {
      id: "m8-1-l", badge: "WEAK SQ",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 1 2",
      prompt: "Bishop f1 to c4 — aim at the weak f7 square!",
      hint: "Italian bishop. f1 → c4.",
      goal: { kind: "move", from: "f1", to: "c4" },
      highlightFrom: "f1", highlightTo: "c4",
    },
    puzzle: {
      id: "m8-1-p", badge: "WEAK SQ",
      fen: "rnbqkbnr/pppp1ppp/8/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR w KQkq - 0 1",
      prompt: "Queen d1 to h5 — pile on f7!",
      hint: "Queen swings to h5.",
      goal: { kind: "move", from: "d1", to: "h5" },
      highlightFrom: "d1", highlightTo: "h5",
    },
    challenge: {
      id: "m8-1-c", badge: "WEAK SQ",
      fen: "r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
      prompt: "Scholar's Mate! Queen takes f7 — checkmate!",
      hint: "Qh5xf7 — bishop defends the queen.",
      goal: { kind: "move", from: "h5", to: "f7" },
      highlightFrom: "h5", highlightTo: "f7",
    },
  },

  // 2. Back-rank with a rook
  2: {
    lesson: {
      id: "m8-2-l", badge: "BACK RANK",
      fen: "6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1",
      prompt: "Rook a1 to a8 — back-rank mate!",
      hint: "The pawns lock the king in. Ra8#.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    puzzle: {
      id: "m8-2-p", badge: "BACK RANK",
      fen: "6k1/5ppp/8/8/8/8/8/3R3K w - - 0 1",
      prompt: "Rook d1 to d8 — slide to the back rank!",
      hint: "Rd8 — pawns can't save the king.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    challenge: {
      id: "m8-2-c", badge: "BACK RANK",
      fen: "6k1/5ppp/8/8/8/8/8/R6K w - - 0 1",
      prompt: "Slide Ra1 to a8 — back-rank checkmate!",
      hint: "Trapped king + open 8th rank = mate.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
  },

  // 3. Back-rank with the queen
  3: {
    lesson: {
      id: "m8-3-l", badge: "BACK RANK",
      fen: "6k1/5ppp/8/8/8/8/8/3Q3K w - - 0 1",
      prompt: "Queen d1 to d8 — back-rank mate!",
      hint: "Slide the queen up the d-file.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    puzzle: {
      id: "m8-3-p", badge: "BACK RANK",
      fen: "6k1/5ppp/8/8/8/8/8/Q6K w - - 0 1",
      prompt: "Qa1 to a8 — the queen finds the back rank!",
      hint: "Qa8 — mate along the 8th.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    challenge: {
      id: "m8-3-c", badge: "BACK RANK",
      fen: "6k1/5ppp/8/8/8/8/8/2Q4K w - - 0 1",
      prompt: "Queen c1 to c8 — finish on the back rank!",
      hint: "Slide the queen up the c-file.",
      goal: { kind: "move", from: "c1", to: "c8" },
      highlightFrom: "c1", highlightTo: "c8",
    },
  },

  // 4. Smothered Mate — knight in the corner
  4: {
    lesson: {
      id: "m8-4-l", badge: "SMOTHERED",
      fen: "6rk/6pp/8/6N1/8/8/8/4K3 w - - 0 1",
      prompt: "Ng5 to f7 — the smothered mate!",
      hint: "Knight jumps to f7 — king has no escape.",
      goal: { kind: "move", from: "g5", to: "f7" },
      highlightFrom: "g5", highlightTo: "f7",
    },
    puzzle: {
      id: "m8-4-p", badge: "SMOTHERED",
      fen: "6rk/6pp/8/4N3/8/8/8/4K3 w - - 0 1",
      prompt: "Ne5 to f7 — smothered checkmate!",
      hint: "Knight to f7 traps the king in the corner.",
      goal: { kind: "move", from: "e5", to: "f7" },
      highlightFrom: "e5", highlightTo: "f7",
    },
    challenge: {
      id: "m8-4-c", badge: "SMOTHERED",
      fen: "6rk/6pp/3N4/8/8/8/8/4K3 w - - 0 1",
      prompt: "Nd6 to f7 — finish the smothered pattern!",
      hint: "Knight from d6 lands on f7 — mate.",
      goal: { kind: "move", from: "d6", to: "f7" },
      highlightFrom: "d6", highlightTo: "f7",
    },
  },

  // 5. Queen + King escort mate
  5: {
    lesson: {
      id: "m8-5-l", badge: "K+Q MATE",
      fen: "4k3/8/4K3/8/8/8/8/Q7 w - - 0 1",
      prompt: "Qa1 to a8 — king and queen team-mate!",
      hint: "Your King controls e7, d7, f7. Queen mates on a8.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    puzzle: {
      id: "m8-5-p", badge: "K+Q MATE",
      fen: "4k3/8/4K3/8/8/8/8/7Q w - - 0 1",
      prompt: "Qh1 to h8 — checkmate from the corner!",
      hint: "Queen on h8 — king has no flight.",
      goal: { kind: "move", from: "h1", to: "h8" },
      highlightFrom: "h1", highlightTo: "h8",
    },
    challenge: {
      id: "m8-5-c", badge: "K+Q MATE",
      fen: "4k3/8/4K3/8/8/8/8/3Q4 w - - 0 1",
      prompt: "Qd1 to d8 — final blow on the back rank!",
      hint: "Qd8# — your king covers e7/d7/f7.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
  },

  // 6. f7 fork with the knight
  6: {
    lesson: {
      id: "m8-6-l", badge: "f7 FORK",
      fen: "r3k2r/ppp2ppp/8/3N4/8/8/PPP2PPP/4K3 w kq - 0 1",
      prompt: "Knight d5 to f6 — check and target the rook!",
      hint: "Nf6+ also eyes h7 and the back rank.",
      goal: { kind: "move", from: "d5", to: "f6" },
      highlightFrom: "d5", highlightTo: "f6",
    },
    puzzle: {
      id: "m8-6-p", badge: "f7 FORK",
      fen: "r3k2r/ppp2ppp/8/4N3/8/8/PPP2PPP/4K3 w kq - 0 1",
      prompt: "Knight e5 to f7 — fork the king and rook!",
      hint: "Nxf7 attacks both rooks AND the king!",
      goal: { kind: "move", from: "e5", to: "f7" },
      highlightFrom: "e5", highlightTo: "f7",
    },
    challenge: {
      id: "m8-6-c", badge: "f7 FORK",
      fen: "r3k2r/ppp2ppp/8/8/8/4N3/PPP2PPP/4K3 w kq - 0 1",
      prompt: "Knight e3 to f5 — head toward f7!",
      hint: "Ne3 → f5, ready to pounce on f7 next.",
      goal: { kind: "move", from: "e3", to: "f5" },
      highlightFrom: "e3", highlightTo: "f5",
    },
  },

  // 7. Anastasia / rook + knight pattern
  7: {
    lesson: {
      id: "m8-7-l", badge: "QUICK MATE",
      fen: "6k1/5p1p/8/8/8/8/8/3Q3K w - - 0 1",
      prompt: "Qd1 to d8 — back-rank finish!",
      hint: "Pawn on f7 still blocks the king. Qd8#.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    puzzle: {
      id: "m8-7-p", badge: "QUICK MATE",
      fen: "5rk1/5ppp/8/8/8/8/8/3Q3K w - - 0 1",
      prompt: "Qd1 to d8 — pin the rook AND mate!",
      hint: "Queen mates; the rook can't block in time.",
      goal: { kind: "move", from: "d1", to: "d8" },
      highlightFrom: "d1", highlightTo: "d8",
    },
    challenge: {
      id: "m8-7-c", badge: "QUICK MATE",
      fen: "5rk1/5ppp/8/8/8/8/8/Q6K w - - 0 1",
      prompt: "Qa1 to a8 — slide all the way to mate!",
      hint: "Queen reaches a8 with check — mate.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
  },

  // 8. Two-rook ladder mate
  8: {
    lesson: {
      id: "m8-8-l", badge: "LADDER",
      fen: "7k/R7/1R6/8/8/8/8/4K3 w - - 0 1",
      prompt: "Rb6 to b8 — ladder checkmate!",
      hint: "Ra7 covers 7th, Rb8 covers 8th. Mate!",
      goal: { kind: "move", from: "b6", to: "b8" },
      highlightFrom: "b6", highlightTo: "b8",
    },
    puzzle: {
      id: "m8-8-p", badge: "LADDER",
      fen: "7k/1R6/R7/8/8/8/8/4K3 w - - 0 1",
      prompt: "Ra6 to a8 — finish the ladder mate!",
      hint: "Rb7 holds the 7th; Ra8 delivers mate.",
      goal: { kind: "move", from: "a6", to: "a8" },
      highlightFrom: "a6", highlightTo: "a8",
    },
    challenge: {
      id: "m8-8-c", badge: "LADDER",
      fen: "k7/R7/1R6/8/8/8/8/4K3 w - - 0 1",
      prompt: "Rb6 to b8 — ladder mate on the queenside!",
      hint: "Ra7 covers 7th, then Rb8 mates.",
      goal: { kind: "move", from: "b6", to: "b8" },
      highlightFrom: "b6", highlightTo: "b8",
    },
  },

  // 9. Open the f7 file — Bxf7+ to break the castle
  9: {
    lesson: {
      id: "m8-9-l", badge: "f7 ATTACK",
      fen: "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4",
      prompt: "Bishop c4 takes f7 — rip open the king!",
      hint: "Bxf7+ — king must take. Fried Liver setup.",
      goal: { kind: "move", from: "c4", to: "f7" },
      highlightFrom: "c4", highlightTo: "f7",
    },
    puzzle: {
      id: "m8-9-p", badge: "f7 ATTACK",
      fen: "r1bqkbnr/pppp1ppp/8/4p3/2BnP3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 1",
      prompt: "Knight f3 takes e5 — eyeing f7 next!",
      hint: "Nxe5 keeps the f7 pressure.",
      goal: { kind: "move", from: "f3", to: "e5" },
      highlightFrom: "f3", highlightTo: "e5",
    },
    challenge: {
      id: "m8-9-c", badge: "f7 ATTACK",
      fen: "r1bqkb1r/pppp1ppp/5n2/4N3/2B1n3/8/PPPP1PPP/RNBQK2R w KQkq - 0 1",
      prompt: "Knight e5 takes f7 — the famous Fried Liver fork!",
      hint: "Nxf7 forks queen and rook!",
      goal: { kind: "move", from: "e5", to: "f7" },
      highlightFrom: "e5", highlightTo: "f7",
    },
  },

  // 10. Treasure — pick the mate-in-1 (queen + king box)
  10: {
    lesson: {
      id: "m8-10-l", badge: "MATE IN 1",
      fen: "4k3/8/4K3/8/8/8/8/4Q3 w - - 0 1",
      prompt: "Qe1 to e7 — diagonal escort mate? No — slide up!",
      hint: "Actually slide Qe1 → e8 is blocked by the king on e6's line. Try Qe1 → e7? It's protected.",
      goal: { kind: "any-of", moves: [
        { from: "e1", to: "e7" },
      ]},
      highlightFrom: "e1", highlightTo: "e7",
    },
    puzzle: {
      id: "m8-10-p", badge: "MATE IN 1",
      fen: "k7/8/1K6/8/8/8/8/7Q w - - 0 1",
      prompt: "Qh1 to a1 — slide across for the mate!",
      hint: "Qa1# — king on b6 controls the escape squares.",
      goal: { kind: "move", from: "h1", to: "a1" },
      highlightFrom: "h1", highlightTo: "a1",
    },
    challenge: {
      id: "m8-10-c", badge: "MATE IN 1",
      fen: "k7/8/1K6/8/8/8/8/Q7 w - - 0 1",
      prompt: "Qa1 to a8 — checkmate the cornered king!",
      hint: "Qa8# — your king takes b7 and the escape squares.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
  },

  // 11. Spot-the-mate drill
  11: {
    lesson: {
      id: "m8-11-l", badge: "DRILL",
      fen: "6k1/5ppp/8/8/8/8/8/4Q2K w - - 0 1",
      prompt: "Qe1 to e8 — mate on the back rank!",
      hint: "Slide the queen up the e-file.",
      goal: { kind: "move", from: "e1", to: "e8" },
      highlightFrom: "e1", highlightTo: "e8",
    },
    puzzle: {
      id: "m8-11-p", badge: "DRILL",
      fen: "6k1/5ppp/8/8/8/8/8/2R4K w - - 0 1",
      prompt: "Rc1 to c8 — fast mate!",
      hint: "Rc8# — king is locked by its own pawns.",
      goal: { kind: "move", from: "c1", to: "c8" },
      highlightFrom: "c1", highlightTo: "c8",
    },
    challenge: {
      id: "m8-11-c", badge: "DRILL",
      fen: "6rk/6pp/3N4/8/8/8/8/4K3 w - - 0 1",
      prompt: "Nd6 to f7 — smothered mate, lightning fast!",
      hint: "Knight to f7 — king is smothered.",
      goal: { kind: "move", from: "d6", to: "f7" },
      highlightFrom: "d6", highlightTo: "f7",
    },
  },

  // 12. BOSS — Guard the Castle (deliver mate)
  12: {
    lesson: {
      id: "m8-12-l", badge: "BOSS",
      fen: "6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1",
      prompt: "Boss warm-up — Ra8# on the back rank!",
      hint: "Ra1 → a8 mates.",
      goal: { kind: "move", from: "a1", to: "a8" },
      highlightFrom: "a1", highlightTo: "a8",
    },
    puzzle: {
      id: "m8-12-p", badge: "BOSS",
      fen: "6rk/6pp/8/6N1/8/8/8/4K3 w - - 0 1",
      prompt: "Boss smother — Nf7# in the corner!",
      hint: "Ng5 → f7 — smothered checkmate.",
      goal: { kind: "move", from: "g5", to: "f7" },
      highlightFrom: "g5", highlightTo: "f7",
    },
    challenge: {
      id: "m8-12-c", badge: "BOSS",
      fen: "r1bqkbnr/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4",
      prompt: "Boss finisher — Qxf7#, Scholar's Mate!",
      hint: "Qh5 takes f7 — defended by the bishop.",
      goal: { kind: "move", from: "h5", to: "f7" },
      highlightFrom: "h5", highlightTo: "f7",
    },
  },
};
