export type LevelStatus = "locked" | "current" | "done";

export interface PathLevel {
  id: number;
  name: string;
  blurb: string;
  status: LevelStatus;
  stars?: 0 | 1 | 2 | 3; // only for "done"
  icon?: string;
}

// Placeholder data — 12 levels along the Pawn Village winding path.
export const PAWN_VILLAGE_LEVELS: PathLevel[] = [
  { id: 1,  name: "Welcome to the Village", blurb: "Meet Mariposa",       status: "done",    stars: 3, icon: "🦋" },
  { id: 2,  name: "Meet the King",          blurb: "One-square moves",    status: "done",    stars: 3, icon: "♔" },
  { id: 3,  name: "The Knight's Hop",        blurb: "L-shaped leaps",      status: "done",    stars: 2, icon: "♞" },
  { id: 4,  name: "Pawn Push",               blurb: "Forward one square",  status: "done",    stars: 3, icon: "♙" },
  { id: 5,  name: "Two-Square Start",        blurb: "First-move boost",    status: "done",    stars: 1, icon: "⏩" },
  { id: 6,  name: "Diagonal Snack",          blurb: "Pawn captures",       status: "current",            icon: "🍎" },
  { id: 7,  name: "Farmer & Piggies",        blurb: "Race to rank 8",      status: "locked",             icon: "🐷" },
  { id: 8,  name: "Meet the Rook",           blurb: "Straight lines",      status: "locked",             icon: "♜" },
  { id: 9,  name: "Bishop's Diagonals",      blurb: "Color-locked paths",  status: "locked",             icon: "♝" },
  { id: 10, name: "Hail the Queen",          blurb: "All directions",      status: "locked",             icon: "♛" },
  { id: 11, name: "Pawn Wars",               blurb: "8v8 mini-battle",     status: "locked",             icon: "⚔️" },
  { id: 12, name: "The Board Guardian",      blurb: "Boss of the Village", status: "locked",             icon: "🗿" },
];
