// Chess Mastery Curriculum — 15 modules across the 8 Crown Shard realms.
// Built on the ChessKid.com foundational curriculum (Lessons 1–10).

export type Level = "beginner" | "intermediate" | "advanced";

export interface CurriculumModule {
  /** 1-based module number, matches the curriculum spec. */
  number: number;
  id: string;
  title: string;
  level: Level;
  realmId: string;
  theme: string;
  lessons: string[];
  challenge: string;
  /** id matching an entry in src/data/badges.ts */
  badgeId: string;
  /** "playable" = a real challenge is wired up; "placeholder" = Coming soon card. */
  status: "playable" | "placeholder";
}

export const CURRICULUM: CurriculumModule[] = [
  // ───────── BEGINNER ─────────
  {
    number: 1,
    id: "meet-the-army",
    title: "Meet the Army",
    level: "beginner",
    realmId: "pawn-village",
    theme: "Piece movement — King, Knight, Pawn, Rook, Bishop, Queen.",
    lessons: [
      "The Kingdom Parade — each piece as a character",
      "Catch the Star — drag a piece to every legal square",
      "Pawn Promotion Run — race a pawn to the 8th rank",
    ],
    challenge: "Catch the Star + Pawn Promotion Run",
    badgeId: "army-commander",
    status: "playable",
  },
  {
    number: 2,
    id: "farmer-and-piggies",
    title: "The Farmer and the Piggies",
    level: "beginner",
    realmId: "pawn-village",
    theme: "Pawn structure, pawn captures, promotion, and en passant.",
    lessons: [
      "Farm Battle: 8 pawns vs lone King",
      "Pawn Wars — first to promote wins",
      "En passant unlocked",
    ],
    challenge: "March to the Barn",
    badgeId: "pawn-champion",
    status: "playable",
  },
  {
    number: 3,
    id: "check-checkmate-stalemate",
    title: "Check, Checkmate & Stalemate",
    level: "beginner",
    realmId: "castle-of-kings",
    theme: "Attacking the king, winning by checkmate, avoiding stalemate.",
    lessons: [
      "Shah! Schach! Check!",
      "Capture, Block, or Run",
      "Checkmate vs Stalemate",
    ],
    challenge: "King's Escape Room",
    badgeId: "escape-artist",
    status: "playable",
  },
  {
    number: 4,
    id: "basic-checkmates",
    title: "Basic Checkmates",
    level: "beginner",
    realmId: "castle-of-kings",
    theme: "King + Queen vs King; Two Rooks vs King; stalemate traps.",
    lessons: [
      "Queen's force-field box",
      "Two-Rook ladder",
      "Stalemate awareness",
    ],
    challenge: "Box the King",
    badgeId: "endgame-executioner",
    status: "playable",
  },
  {
    number: 5,
    id: "opening-principles",
    title: "Opening Principles",
    level: "beginner",
    realmId: "centerland-plains",
    theme: "Development, castling, center control, not moving the same piece twice.",
    lessons: [
      "The five opening rules",
      "Ruy Lopez walkthrough",
      "Connect the Rooks",
    ],
    challenge: "Connect the Rooks",
    badgeId: "opening-scholar",
    status: "playable",
  },
  // ───────── INTERMEDIATE ─────────
  {
    number: 6,
    id: "tactics-grove",
    title: "Tactics Grove — Forks, Pins & Skewers",
    level: "intermediate",
    realmId: "detective-forest",
    theme: "Forks, pins, skewers, discovered attacks, and double attacks.",
    lessons: [
      "Knight & pawn forks",
      "Pins and skewers",
      "Discovered & double attacks",
    ],
    challenge: "Grand Detective",
    badgeId: "tactical-chef",
    status: "playable",
  },
  {
    number: 7,
    id: "pins-and-skewers",
    title: "Pins and Skewers",
    level: "intermediate",
    realmId: "detective-forest",
    theme: "Absolute & relative pins, ganging up, skewers.",
    lessons: [
      "Absolute vs relative pins",
      "Ganging up on a pinned piece",
      "Skewers — the anti-pin",
    ],
    challenge: "Pin Factory & Skewer Factory",
    badgeId: "chain-master",
    status: "playable",
  },
  {
    number: 8,
    id: "quick-mates",
    title: "Quick Mates & Weak Squares",
    level: "intermediate",
    realmId: "tactical-mountains",
    theme: "Scholar's Mate, Fool's Mate, back-rank, smothered, defending f7/f2.",
    lessons: [
      "Famous mating patterns",
      "Attacking f7",
      "Defending against Scholar's Mate",
    ],
    challenge: "Guard the Castle",
    badgeId: "pattern-hunter",
    status: "playable",
  },
  {
    number: 9,
    id: "game-phases",
    title: "Game Phases and Planning",
    level: "intermediate",
    realmId: "tactical-mountains",
    theme: "Opening, Middlegame, Endgame structure; checks-captures-threats.",
    lessons: [
      "The Three Kingdoms",
      "CCT thought process",
      "Reading your opponent's plan",
    ],
    challenge: "Phase Navigator",
    badgeId: "phase-commander",
    status: "playable",
  },
  {
    number: 10,
    id: "counting-material",
    title: "Counting Material and Trades",
    level: "intermediate",
    realmId: "crystal-labyrinth",
    theme: "Piece values, attackers vs defenders, hanging pieces.",
    lessons: [
      "Piece point values",
      "Doggy-pile calculator",
      "Spotting hanging & trapped pieces",
    ],
    challenge: "Trade or Fade?",
    badgeId: "material-master",
    status: "playable",
  },
  // ───────── ADVANCED ─────────
  {
    number: 11,
    id: "discovered-attacks",
    title: "Discovered Attacks and Deflection",
    level: "advanced",
    realmId: "crystal-labyrinth",
    theme: "Discovered attacks, double check, deflection, overloading.",
    lessons: [
      "Unmask the weapon",
      "Double check — the king must run",
      "Deflection & overloading",
    ],
    challenge: "Unmask the Weapon",
    badgeId: "shadow-striker",
    status: "placeholder",
  },
  {
    number: 12,
    id: "endgame-mastery",
    title: "Endgame Mastery — Passed Pawns & King Activity",
    level: "advanced",
    realmId: "endgame-desert",
    theme: "Passed pawns, key squares, opposition, Lucena & Philidor.",
    lessons: [
      "March to the Crown",
      "King opposition",
      "Lucena & Philidor positions",
    ],
    challenge: "Race to the Crown",
    badgeId: "endgame-royalty",
    status: "placeholder",
  },
  {
    number: 13,
    id: "positional-chess",
    title: "Positional Chess — Pawn Structure & Coordination",
    level: "advanced",
    realmId: "endgame-desert",
    theme: "Weak pawns, good/bad bishops, open files, outposts.",
    lessons: [
      "The architecture of position",
      "Good vs bad bishops",
      "Rook on the 7th rank",
    ],
    challenge: "Architect's Blueprint",
    badgeId: "position-architect",
    status: "placeholder",
  },
  {
    number: 14,
    id: "combinations-sacrifices",
    title: "Advanced Tactics — Combinations & Sacrifices",
    level: "advanced",
    realmId: "citadel-of-checkmate",
    theme: "Combinations, sacrifices, removing the defender, Greek Gift.",
    lessons: [
      "Removing the defender",
      "X-ray attacks & zugzwang",
      "The Greek Gift sacrifice",
    ],
    challenge: "The Combination Engine",
    badgeId: "combination-grandmaster",
    status: "placeholder",
  },
  {
    number: 15,
    id: "tournament-prep",
    title: "Tournament Preparation & Game Analysis",
    level: "advanced",
    realmId: "citadel-of-checkmate",
    theme: "Notation, clock management, annotation, opening repertoire.",
    lessons: [
      "Algebraic notation mastery",
      "Tournament thought process",
      "Annotate your own game",
    ],
    challenge: "The Tournament Simulator",
    badgeId: "tournament-champion",
    status: "placeholder",
  },
];

export const LEVEL_LABEL: Record<Level, string> = {
  beginner: "🟢 Beginner",
  intermediate: "🟡 Intermediate",
  advanced: "🔴 Advanced",
};

export function modulesForRealm(realmId: string): CurriculumModule[] {
  return CURRICULUM.filter((m) => m.realmId === realmId);
}

export function modulesByLevel(level: Level): CurriculumModule[] {
  return CURRICULUM.filter((m) => m.level === level);
}
