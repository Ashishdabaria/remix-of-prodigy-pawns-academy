import realm1 from "@/assets/realm-1-pawn-village.jpg";
import realm2 from "@/assets/realm-2-castle.jpg";
import realm3 from "@/assets/realm-3-plains.jpg";
import realm4 from "@/assets/realm-4-forest.jpg";
import realm5 from "@/assets/realm-5-mountains.jpg";
import realm6 from "@/assets/realm-6-labyrinth.jpg";
import realm7 from "@/assets/realm-7-desert.jpg";
import realm8 from "@/assets/realm-8-citadel.jpg";

export type ShardId =
  | "pearl" | "sun" | "amber" | "emerald"
  | "sapphire" | "amethyst" | "topaz" | "crown";

export interface Shard {
  id: ShardId;
  name: string;
  shape: string;       // unicode shape icon (color-independent rank cue)
  shapeName: string;   // spoken name of the shape, for a11y
  rank: string;        // hero rank granted by this shard
  colorVar: string;    // tailwind class fragment, e.g. "shard-pearl"
}

export const SHARDS: Record<ShardId, Shard> = {
  pearl:    { id: "pearl",    name: "Pearl Shard",    shape: "☾", shapeName: "Crescent",  rank: "Pawn Apprentice",       colorVar: "shard-pearl" },
  sun:      { id: "sun",      name: "Sun Shard",      shape: "☀", shapeName: "Sun",       rank: "Castle Cadet",          colorVar: "shard-sun" },
  amber:    { id: "amber",    name: "Amber Shard",    shape: "▲", shapeName: "Triangle",  rank: "Field Scout",           colorVar: "shard-amber" },
  emerald:  { id: "emerald",  name: "Emerald Shard",  shape: "♣", shapeName: "Clover",    rank: "Chess Detective",       colorVar: "shard-emerald" },
  sapphire: { id: "sapphire", name: "Sapphire Shard", shape: "❄", shapeName: "Snowflake", rank: "Peak Climber",          colorVar: "shard-sapphire" },
  amethyst: { id: "amethyst", name: "Amethyst Shard", shape: "★", shapeName: "Star",      rank: "Maze Mage",             colorVar: "shard-amethyst" },
  topaz:    { id: "topaz",    name: "Topaz Shard",    shape: "◆", shapeName: "Diamond",   rank: "Desert Sage",           colorVar: "shard-topaz" },
  crown:    { id: "crown",    name: "The Ancient Crown", shape: "♛", shapeName: "Crown",  rank: "Guardian of the 64 Realms", colorVar: "shard-crown" },
};

export const SHARD_ORDER: ShardId[] = [
  "pearl","sun","amber","emerald","sapphire","amethyst","topaz","crown",
];

export interface Realm {
  id: string;
  number: number;
  name: string;
  tagline: string;
  shard: ShardId;
  image: string;
  /** Map-coord percentages (x,y) for the SVG node overlay on top of quest-map.jpg */
  coord: { x: number; y: number };
  curriculum: string[];
  miniBoss: { name: string; description: string };
  boss: { name: string; description: string };
  sideQuests: string[];
  treasure: string;
  mariposaForm: string;
}

export const REALMS: Realm[] = [
  {
    id: "pawn-village",
    number: 1,
    name: "The Pawn Village",
    tagline: "Where every hero's adventure begins.",
    shard: "pearl",
    image: realm1,
    coord: { x: 12, y: 78 },
    curriculum: [
      "How each chess piece moves",
      "Setting up the board",
      "Capturing safely",
      "Piece values: who's worth what?",
    ],
    miniBoss: { name: "The Lost Knight", description: "A friendly knight who keeps getting tangled in his own L-shapes. Help him find his way!" },
    boss: { name: "The Board Guardian", description: "A big cuddly stone guardian who quizzes you on every square and every piece." },
    sideQuests: ["Name all the files and ranks", "Capture three friendly farm targets", "Tuck the king in safely"],
    treasure: "Pearl Shard + Apprentice Cape",
    mariposaForm: "Tiny caterpillar Mariposa peeks out of a flower — her first hello.",
  },
  {
    id: "castle-of-kings",
    number: 2,
    name: "The Castle of Kings",
    tagline: "Crowns, thrones, and the first big mates.",
    shard: "sun",
    image: realm2,
    coord: { x: 14, y: 24 },
    curriculum: [
      "Check, checkmate, and stalemate",
      "Castling (king-side & queen-side)",
      "Pawn promotion",
      "Basic mates: K+Q vs K, K+R vs K, two-rook ladder",
    ],
    miniBoss: { name: "The Sneaky Queen", description: "A giggly queen who hides behind pawns. Spot her and say check!" },
    boss: { name: "The Checkmate Dragon", description: "A friendly dragon who breathes warm bubbles. Defeat with a clean K+Q mate." },
    sideQuests: ["Castle on both sides", "Promote a pawn to a queen", "Ladder mate in five moves"],
    treasure: "Sun Shard + Royal Crown sticker",
    mariposaForm: "Mariposa wraps herself in a tiny silken chrysalis on the castle banner.",
  },
  {
    id: "centerland-plains",
    number: 3,
    name: "The Centerland Plains",
    tagline: "Hold the middle, win the day.",
    shard: "amber",
    image: realm3,
    coord: { x: 38, y: 34 },
    curriculum: [
      "Piece development",
      "Controlling the center (e4, d4, e5, d5)",
      "King safety",
      "Pawn races and basic opposition",
    ],
    miniBoss: { name: "The Lazy Bishop", description: "A snoozy bishop who refuses to leave his starting square. Wake him up by developing every piece!" },
    boss: { name: "The Warlord of Development", description: "A boisterous knight-general who tests if you can deploy every piece in 10 moves." },
    sideQuests: ["Develop both knights before move 6", "Win a pawn race", "Hold the center for 10 moves"],
    treasure: "Amber Shard + Compass of Plans",
    mariposaForm: "Mariposa's wings emerge — small, amber-tipped, fluttering for the very first time.",
  },
  {
    id: "detective-forest",
    number: 4,
    name: "The Detective Forest",
    tagline: "Every move is a clue.",
    shard: "emerald",
    image: realm4,
    coord: { x: 48, y: 56 },
    curriculum: [
      "Checks, captures, threats (the CCT scan)",
      "Rule of the square",
      "Passed pawns",
      "Breakthroughs",
    ],
    miniBoss: { name: "The Riddle Goblin", description: "A merry goblin who only steps aside if you solve three tiny tactical puzzles." },
    boss: { name: "The Phantom Blunder", description: "A trickster ghost who tempts you into bad trades. Beat him by checking every check, capture, and threat." },
    sideQuests: ["Spot the threat in 5 puzzles", "Run a passed pawn home", "Break through a pawn chain"],
    treasure: "Emerald Shard + Magnifying Glass badge",
    mariposaForm: "Mariposa's wings glow emerald and pick up dappled forest light.",
  },
  {
    id: "tactical-mountains",
    number: 5,
    name: "The Tactical Mountains",
    tagline: "Forks, pins, and brave climbs.",
    shard: "sapphire",
    image: realm5,
    coord: { x: 70, y: 18 },
    curriculum: [
      "Forks and double attacks",
      "Pins (absolute and relative)",
      "Active rooks",
      "Intro to Lucena and Philidor positions",
    ],
    miniBoss: { name: "The Twin Knights", description: "Two cheery knights who attack in tandem. Fork them right back!" },
    boss: { name: "The Fork Giant", description: "A big friendly giant who only steps aside when you land a winning fork." },
    sideQuests: ["Land 3 knight forks", "Pin a queen to a king", "Solve a Lucena rook ending"],
    treasure: "Sapphire Shard + Climber's Rope",
    mariposaForm: "Mariposa's wings shimmer sapphire-blue; she leaves frost sparkles in the wind.",
  },
  {
    id: "crystal-labyrinth",
    number: 6,
    name: "The Crystal Labyrinth",
    tagline: "Mirror tactics and dazzling combos.",
    shard: "amethyst",
    image: realm6,
    coord: { x: 50, y: 84 },
    curriculum: [
      "Skewers and discovered attacks",
      "Double check",
      "Removal of the defender, deflection",
      "Minor-piece endings",
    ],
    miniBoss: { name: "The Mirror Knight", description: "Your reflection — but mischievous. Beat him by spotting your own missed tactics." },
    boss: { name: "The Crystal Sorcerer", description: "A dazzling magician who casts double-check spells. Out-think him with a discovered check of your own." },
    sideQuests: ["Win with a skewer", "Land a discovered check", "Convert a B vs N ending"],
    treasure: "Amethyst Shard + Mirror Charm",
    mariposaForm: "Her wings split into a thousand tiny reflections, glowing amethyst.",
  },
  {
    id: "endgame-desert",
    number: 7,
    name: "The Endgame Desert",
    tagline: "Quiet power. Master what remains.",
    shard: "topaz",
    image: realm7,
    coord: { x: 86, y: 76 },
    curriculum: [
      "Master the basic mates",
      "Passed pawns and outside passers",
      "Bishop endings",
      "Rook-and-pawn endings, queen endings",
    ],
    miniBoss: { name: "The Rook Twins", description: "A pair of dancing rooks. Take them on with the rook-ladder mate." },
    boss: { name: "The Pawn Pharaoh & The Endgame Titan", description: "The Pharaoh queens a pawn; the Titan blocks your king. Outplay both with calm endgame technique." },
    sideQuests: ["Win a K+P vs K race", "Convert a rook ending", "Stop a passed pawn cold"],
    treasure: "Topaz Shard + Hourglass of Patience",
    mariposaForm: "Wings of warm topaz; she drifts through sand sparkles like a tiny sunset.",
  },
  {
    id: "citadel-of-checkmate",
    number: 8,
    name: "The Citadel of Checkmate",
    tagline: "Stand before King Obsidian. Wear the Crown.",
    shard: "crown",
    image: realm8,
    coord: { x: 88, y: 14 },
    curriculum: [
      "Planning and prophylaxis",
      "Pawn structure and weak squares",
      "Open files and outposts",
      "Tournament prep and full-game analysis",
    ],
    miniBoss: { name: "The Shadow Grandmaster", description: "A clever mirror-Grandmaster who plays your own best ideas back at you. Outplan him!" },
    boss: { name: "King Obsidian, the Puzzle Tyrant", description: "The big silly boss himself. Beat him to rebuild the Ancient Crown and become a Guardian." },
    sideQuests: ["Plan three moves ahead", "Win an open file", "Analyze one full game with Mariposa"],
    treasure: "The Ancient Crown — Guardian of the 64 Realms",
    mariposaForm: "Fully grown Mariposa — wings shine with all 8 shard colors at once.",
  },
];

export const HIDDEN_AREAS = [
  {
    id: "mate-garden",
    name: "Mariposa's Secret Mate Garden",
    coord: { x: 28, y: 60 },
    blurb: "Hidden garden gates with bonus puzzles: smothered, Arabian, Anastasia's, Boden's, Greek Gift.",
  },
  {
    id: "astral-academy",
    name: "The Astral Academy",
    coord: { x: 78, y: 6 },
    blurb: "A shimmering star-realm above the Citadel for Guardians who graduate. Optional post-game content.",
  },
  {
    id: "tactical-cave",
    name: "Secret Tactical Cave",
    coord: { x: 62, y: 36 },
    blurb: "A hidden cavern of bonus tactics chests.",
  },
] as const;

export function getRealm(id: string) {
  return REALMS.find((r) => r.id === id);
}
