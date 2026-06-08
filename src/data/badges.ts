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

  // ───────── Curriculum milestone badges (Modules 1–15) ─────────
  { id: "army-commander",          name: "Army Commander",          icon: "🎖️", blurb: "Module 1 — demonstrated every piece in the Kingdom Parade.", earned: false },
  { id: "pawn-champion",           name: "Pawn Champion",           icon: "🎖️", blurb: "Module 2 — completed all four farm levels.",                 earned: false },
  { id: "escape-artist",           name: "Escape Artist",           icon: "🎖️", blurb: "Module 3 — mastered the three king-escape methods.",         earned: false },
  { id: "endgame-executioner",     name: "Endgame Executioner",     icon: "🎖️", blurb: "Module 4 — delivered K+Q and two-rook mates cleanly.",       earned: false },
  { id: "opening-scholar",         name: "Opening Scholar",         icon: "🎖️", blurb: "Module 5 — connected the rooks in ≤ 3 moves.",               earned: false },
  { id: "tactical-chef",           name: "Tactical Chef",           icon: "🎖️", blurb: "Module 6 — sorted Knives, Forks, and Spoons.",               earned: false },
  { id: "chain-master",            name: "Chain Master",            icon: "🎖️", blurb: "Module 7 — won at the Pin & Skewer factories.",              earned: false },
  { id: "pattern-hunter",          name: "Pattern Hunter",          icon: "🎖️", blurb: "Module 8 — spotted every famous mating pattern.",            earned: false },
  { id: "phase-commander",         name: "Phase Commander",         icon: "🎖️", blurb: "Module 9 — navigated Opening → Middle → Endgame.",          earned: false },
  { id: "material-master",         name: "Material Master",         icon: "🎖️", blurb: "Module 10 — 90% on Trade Calculator & Who's Hanging.",      earned: false },
  { id: "shadow-striker",          name: "Shadow Striker",          icon: "🎖️", blurb: "Module 11 — landed discovered checks & deflections.",       earned: false },
  { id: "endgame-royalty",         name: "Endgame Royalty",         icon: "🎖️", blurb: "Module 12 — won pawn races & seized opposition.",           earned: false },
  { id: "position-architect",      name: "Position Architect",      icon: "🎖️", blurb: "Module 13 — built winning positions from scratch.",         earned: false },
  { id: "combination-grandmaster", name: "Combination Grandmaster", icon: "🎖️", blurb: "Module 14 — solved 3-move combos & Greek Gift sacs.",       earned: false },
  { id: "tournament-champion",     name: "Tournament Champion",     icon: "🎖️", blurb: "Module 15 — cleared the Tournament Simulator.",             earned: false },
];
