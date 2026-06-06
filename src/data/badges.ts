export interface Badge {
  id: string;
  name: string;
  icon: string;
  blurb: string;
  earned: boolean;
}

export const BADGES: Badge[] = [
  { id: "first-mate",   name: "First Checkmate",      icon: "♚", blurb: "You delivered your first mate!", earned: true },
  { id: "double",       name: "Double Trouble Master", icon: "⚔", blurb: "Land 25 forks.",                  earned: true },
  { id: "freeze",       name: "Freeze Master",         icon: "❄", blurb: "Win 10 games with a pin.",         earned: true },
  { id: "rook",         name: "Rook Commander",        icon: "♜", blurb: "Win 5 rook endings.",              earned: false },
  { id: "endgame",      name: "Endgame Hero",          icon: "◆", blurb: "Convert 10 winning endings.",      earned: false },
  { id: "ninja",        name: "Puzzle Ninja",          icon: "★", blurb: "Solve 100 puzzles in a row.",      earned: true },
  { id: "tourney",      name: "Tournament Warrior",    icon: "♞", blurb: "Play in your first event.",        earned: false },
  { id: "explorer",     name: "Grandmaster Explorer",  icon: "✦", blurb: "Visit every realm at least once.", earned: true },
  { id: "detective",    name: "Square Detective",      icon: "♣", blurb: "Spot 50 threats.",                 earned: true },
  { id: "brave",        name: "Brave Heart",           icon: "♥", blurb: "Earn 10 Brave Hearts.",            earned: true },
  { id: "mariposa",     name: "Mariposa's Friend",     icon: "✿", blurb: "Find all secret garden gates.",    earned: false },
];
