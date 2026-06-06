// Hand-authored mate-in-1 puzzles for the Pawn Village.
// White to move and mate in 1.

export interface Puzzle {
  id: string;
  fen: string;
  /** Expected move from→to (e.g. "h5h7"). Promotion adds suffix like "e7e8q". */
  solution: { from: string; to: string; promotion?: "q" | "r" | "b" | "n" };
  theme: string;
  hint: string;
}

export const PUZZLES: Puzzle[] = [
  {
    // Back-rank mate: White Rook a1 → a8#. Black king trapped on g8 by own pawns f7,g7,h7.
    id: "p1",
    fen: "6k1/5ppp/8/8/8/8/8/R3K3 w - - 0 1",
    solution: { from: "a1", to: "a8" },
    theme: "Back-rank mate",
    hint: "The black king has no escape squares — roll a rook all the way down!",
  },
  {
    // Queen mate with king support: Wk d6, Wq g5 → Qg7#.
    // Black king e8, walled in by white queen and king.
    id: "p2",
    fen: "4k3/8/3K4/6Q1/8/8/8/8 w - - 0 1",
    solution: { from: "g5", to: "g7" },
    theme: "Queen mate, king support",
    hint: "Bring the queen right next to the king — your king has its back!",
  },
  {
    // Two-rook ladder finish: Wk e1, Wr a7, Wr b1; Bk e8 → Ra8#.
    id: "p3",
    fen: "4k3/R7/8/8/8/8/8/1R2K3 w - - 0 1",
    solution: { from: "a7", to: "a8" },
    theme: "Rook ladder mate",
    hint: "One rook traps the king on the back rank — finish with the other!",
  },
];
