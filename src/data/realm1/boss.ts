// Board Guardian boss quiz — 5 friendly questions.

export interface BossQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explain: string;
}

export const BOSS_QUESTIONS: BossQuestion[] = [
  {
    id: "b1",
    prompt: "Which piece jumps in an L-shape?",
    options: ["Bishop", "Knight", "Rook", "Pawn"],
    correctIndex: 1,
    explain: "The Knight! It hops like the letter L.",
  },
  {
    id: "b2",
    prompt: "How many points is a Queen worth?",
    options: ["3", "5", "9", "1"],
    correctIndex: 2,
    explain: "The Queen is worth 9 — the most of any piece!",
  },
  {
    id: "b3",
    prompt: "Which piece can only move diagonally?",
    options: ["Rook", "Bishop", "Queen", "King"],
    correctIndex: 1,
    explain: "Bishops glide on diagonals — same color squares forever!",
  },
  {
    id: "b4",
    prompt: "What does 'checkmate' mean?",
    options: [
      "The king is captured",
      "The king is attacked with no escape",
      "You take the queen",
      "You castle",
    ],
    correctIndex: 1,
    explain: "Checkmate = the king is in check AND has no legal move. Game over!",
  },
  {
    id: "b5",
    prompt: "Which is worth more: a Rook or a Bishop?",
    options: ["Rook (5)", "Bishop (3)", "They are equal", "Bishop (5)"],
    correctIndex: 0,
    explain: "Rook = 5 points. Bishop = 3 points. Rooks are heavier!",
  },
];
