// Realm 1 lesson configurations.
// Each "step" sets up a tiny board and a goal.

export type LessonGoal =
  | { kind: "any-legal-move"; allowedSquares?: string[] } // child makes any legal move with the highlighted piece
  | { kind: "capture-target"; targetSquare: string } // child must capture the piece on this square
  | { kind: "best-value" }; // handled outside the board (button-based)

export interface LessonStep {
  id: string;
  title: string;
  instruction: string;
  fen: string;
  goal: LessonGoal;
  /** square to visually highlight as "the piece you're learning about" */
  spotlightSquare?: string;
  pieceName: string;
}

export interface Lesson {
  id: string;
  name: string;
  blurb: string;
  steps: LessonStep[];
}

// FEN cheat sheet — kings must both be on the board so chess.js accepts the position.
// White to move. The "interesting" piece is the spotlight.

export const LESSONS: Lesson[] = [
  {
    id: "moves",
    name: "Lesson 1 — How pieces move",
    blurb: "Meet each piece and try one move.",
    steps: [
      {
        id: "pawn",
        pieceName: "Pawn",
        title: "The Pawn",
        instruction: "Pawns step forward one square (or two from their start). Move your pawn!",
        fen: "4k3/8/8/8/8/8/4P3/4K3 w - - 0 1",
        goal: { kind: "any-legal-move" },
        spotlightSquare: "e2",
      },
      {
        id: "knight",
        pieceName: "Knight",
        title: "The Knight",
        instruction: "Knights jump in an L-shape and can leap over pieces. Try a hop!",
        fen: "4k3/8/8/8/8/8/8/3NK3 w - - 0 1",
        goal: { kind: "any-legal-move" },
        spotlightSquare: "d1",
      },
      {
        id: "bishop",
        pieceName: "Bishop",
        title: "The Bishop",
        instruction: "Bishops glide on diagonals. Slide your bishop anywhere!",
        fen: "4k3/8/8/8/8/8/8/2B1K3 w - - 0 1",
        goal: { kind: "any-legal-move" },
        spotlightSquare: "c1",
      },
      {
        id: "rook",
        pieceName: "Rook",
        title: "The Rook",
        instruction: "Rooks roll in straight lines — up, down, or sideways.",
        fen: "4k3/8/8/8/8/8/8/R3K3 w - - 0 1",
        goal: { kind: "any-legal-move" },
        spotlightSquare: "a1",
      },
      {
        id: "queen",
        pieceName: "Queen",
        title: "The Queen",
        instruction: "The Queen does it all — lines AND diagonals. Powerful!",
        fen: "4k3/8/8/8/8/8/8/3QK3 w - - 0 1",
        goal: { kind: "any-legal-move" },
        spotlightSquare: "d1",
      },
    ],
  },
  {
    id: "captures",
    name: "Lesson 2 — Safe captures",
    blurb: "Grab a free piece.",
    steps: [
      {
        id: "cap1",
        pieceName: "Knight",
        title: "Free Knight!",
        instruction: "Your knight can hop onto a free enemy bishop. Capture it!",
        // White knight on c3, black bishop on b5 (legal knight capture c3→b5)
        fen: "4k3/8/8/1b6/8/2N5/8/4K3 w - - 0 1",
        goal: { kind: "capture-target", targetSquare: "b5" },
        spotlightSquare: "c3",
      },
      {
        id: "cap2",
        pieceName: "Rook",
        title: "Roll for it!",
        instruction: "Roll the rook across to capture the enemy pawn.",
        fen: "4k3/8/8/8/8/8/4p3/R3K3 w - - 0 1",
        goal: { kind: "capture-target", targetSquare: "e2" },
        spotlightSquare: "a1",
      },
      {
        id: "cap3",
        pieceName: "Bishop",
        title: "Diagonal snack",
        instruction: "Slide your bishop along the diagonal to capture.",
        fen: "4k3/8/8/8/6n1/8/8/2B1K3 w - - 0 1",
        goal: { kind: "capture-target", targetSquare: "g4" },
        spotlightSquare: "c1",
      },
    ],
  },
  {
    id: "values",
    name: "Lesson 3 — Piece values",
    blurb: "Which capture is worth more?",
    steps: [
      // handled by ValueLesson component (multiple-choice)
    ],
  },
];

export interface ValueQuestion {
  id: string;
  prompt: string;
  options: { label: string; piece: string; value: number }[];
}

export const VALUE_QUESTIONS: ValueQuestion[] = [
  {
    id: "v1",
    prompt: "Which enemy piece is worth more?",
    options: [
      { label: "Knight", piece: "♞", value: 3 },
      { label: "Pawn", piece: "♟", value: 1 },
    ],
  },
  {
    id: "v2",
    prompt: "Tap the bigger prize!",
    options: [
      { label: "Bishop", piece: "♝", value: 3 },
      { label: "Rook", piece: "♜", value: 5 },
    ],
  },
  {
    id: "v3",
    prompt: "Choose wisely, hero.",
    options: [
      { label: "Queen", piece: "♛", value: 9 },
      { label: "Rook", piece: "♜", value: 5 },
    ],
  },
];

export const PIECE_VALUES: { piece: string; name: string; value: number }[] = [
  { piece: "♙", name: "Pawn", value: 1 },
  { piece: "♘", name: "Knight", value: 3 },
  { piece: "♗", name: "Bishop", value: 3 },
  { piece: "♖", name: "Rook", value: 5 },
  { piece: "♕", name: "Queen", value: 9 },
];
