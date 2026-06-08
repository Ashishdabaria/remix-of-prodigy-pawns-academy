// Playable module registry for the 5 Beginner modules (Modules 1–5).
// The path route reads the `?module=` search param and renders the matching
// LEVELS, background, track style, and theme. Each module reuses the same
// gameplay engine in realm.$realmId_.path.tsx.

import meadowBg from "@/assets/modules/module1-meadow.jpg";
import farmlandsBg from "@/assets/modules/module2-farmlands.jpg";
import cavernsBg from "@/assets/modules/module3-caverns.jpg";
import forgeBg from "@/assets/modules/module4-forge.jpg";
import skyBg from "@/assets/modules/module5-sky.jpg";
import groveBg from "@/assets/modules/module6-grove.jpg";
import pinFactoryBg from "@/assets/modules/module7-pinfactory.jpg";
import peaksBg from "@/assets/modules/module9-peaks.jpg";
import castleBg from "@/assets/modules/module8-castle.jpg";



import type { StarPiece } from "@/components/realm/CatchTheStar";

export type LevelType = "lesson" | "challenge" | "miniboss" | "treasure" | "boss";

export interface Critter {
  emoji: string;
  name: string;
  taunt: string;
  cheer: string;
}

export interface ClimbLevel {
  id: number;
  name: string;
  type: LevelType;
  blurb: string;
  critter?: Critter;
  /** Per-sub-quest scene background gradient — gives each node a unique look in the modal. */
  sceneTint?: string;
  /** Optional emoji to overlay the stage modal header. */
  sceneIcon?: string;
  /** Module 1 — render Catch the Star for this piece during challenge stage. */
  starPiece?: StarPiece;
  /** Module 1 boss — render the Pawn Promotion Run during challenge stage. */
  promotionRun?: boolean;
}

export type TrackVariant = "meadow" | "farmlands" | "caverns" | "forge" | "sky" | "grove" | "factory" | "peaks" | "castle";

export interface ModuleConfig {
  id: string;
  realmId: string;
  title: string;
  subtitle: string;
  /** Wide background image for the full-bleed path screen. */
  background: string;
  /** Color theme — drives track stroke, header accent, etc. */
  track: TrackVariant;
  /** Big finish-line icon at the prize node. */
  finishIcon: string;
  /** Short label shown on the finish pill. */
  finishLabel: string;
  /** Color overlay applied above background (oklch / rgba string for gradient). */
  overlay: string;
  /** Header accent for the sticky bar's bottom border. */
  accentClass: string;
  /** Levels for this module (12 nodes recommended to match NODE_POS). */
  levels: ClimbLevel[];
}

const CRITTERS: Record<string, Critter> = {
  hoppy:    { emoji: "🐇",  name: "Hoppy the Hare",       taunt: "Catch me if you can!",                       cheer: "Hop-tastic! You got me!" },
  acorn:    { emoji: "🐿️", name: "Acorn the Squirrel",   taunt: "These nuts are MINE!",                       cheer: "Okay okay, share the acorns!" },
  guardian: { emoji: "🗿",  name: "The Board Guardian",   taunt: "None pass without 64 squares of wisdom.",    cheer: "The path is yours, Apprentice." },
  piggy:    { emoji: "🐷",  name: "Pinky the Piggy",      taunt: "Oink oink! My snacks!",                       cheer: "Snort! You can share!" },
  farmer:   { emoji: "👨‍🌾", name: "Farmer Fenn",          taunt: "Race to the barn before sundown!",          cheer: "Wheat-tastic finish!" },
  ghost:    { emoji: "👻",  name: "Cavern Whisper",       taunt: "Boo! Find the check in the gloom!",         cheer: "Whoa — sharp eyes, hero!" },
  drake:    { emoji: "🐉",  name: "Checkmate Drake",      taunt: "No king escapes my fire!",                   cheer: "Cool dragon — masterful mate!" },
  smith:    { emoji: "⚒️",  name: "Smith Magma",          taunt: "Forge me a fork — if you dare!",             cheer: "Hammered it home!" },
  golem:    { emoji: "🗿",  name: "Forge Golem",          taunt: "Cool steel needs a calm mind. Box me in!",   cheer: "Boxed and beaten — well played!" },
  pegasus:  { emoji: "🦄",  name: "Sky-Pegasus",          taunt: "Catch me in the clouds!",                    cheer: "What a flight, brave hero!" },
  marshal:  { emoji: "🛡️",  name: "Sky Marshal Rookwing", taunt: "Connect your rooks before me!",              cheer: "Rooks united — victory!" },
  sleuth:   { emoji: "🦊",  name: "Sleuth the Fox",        taunt: "Spot the tactic — if you can!",              cheer: "Case closed, Detective!" },
  owl:      { emoji: "🦉",  name: "Owlbert the Wise",      taunt: "Pin, fork, skewer — pick the right one!",    cheer: "Wise eyes, hero!" },
};

// ────────── Module 1: Meet the Army ──────────
const MODULE_1: ModuleConfig = {
  id: "meet-the-army",
  realmId: "pawn-village",
  title: "The Opening Meadows",
  subtitle: "Race all 12 quests to win the Pearl Shard!",
  background: meadowBg,
  track: "meadow",
  finishIcon: "☾",
  finishLabel: "Pearl Shard + Apprentice Cape",
  overlay: "radial-gradient(ellipse at center, rgba(255,236,189,0.18) 0%, rgba(58,32,12,0.45) 100%), linear-gradient(to bottom, rgba(255,220,160,0.15), rgba(40,20,8,0.35))",
  accentClass: "border-shard-sun/70",
  levels: [
    { id: 1,  name: "Meet the King",    type: "lesson",    blurb: "The slow, precious ruler.",       sceneIcon: "♔", sceneTint: "linear-gradient(135deg, #fde68a 0%, #fbbf24 100%)" },
    { id: 2,  name: "Meet the Knight",  type: "lesson",    blurb: "The acrobatic L-shaped jumper.",  sceneIcon: "♞", sceneTint: "linear-gradient(135deg, #bbf7d0 0%, #4ade80 100%)" },
    { id: 3,  name: "Meet the Pawn",    type: "lesson",    blurb: "The brave little foot soldier.",  sceneIcon: "♙", sceneTint: "linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)" },
    { id: 4,  name: "Meet the Rook",    type: "lesson",    blurb: "The Tower of Power.",              sceneIcon: "♜", sceneTint: "linear-gradient(135deg, #fed7aa 0%, #ea580c 100%)" },
    { id: 5,  name: "Meet the Bishop",  type: "lesson",    blurb: "The diagonal whisperer.",          sceneIcon: "♝", sceneTint: "linear-gradient(135deg, #ddd6fe 0%, #8b5cf6 100%)" },
    { id: 6,  name: "Meet the Queen",   type: "lesson",    blurb: "The all-powerful warrior queen.",  sceneIcon: "♛", sceneTint: "linear-gradient(135deg, #fce7f3 0%, #ec4899 100%)" },
    { id: 7,  name: "Catch the Star: King",   type: "challenge", blurb: "Tap every square the King can reach.",   starPiece: "king",   sceneIcon: "⭐", sceneTint: "linear-gradient(135deg, #fef9c3 0%, #facc15 100%)" },
    { id: 8,  name: "Catch the Star: Knight", type: "challenge", blurb: "L-shaped leaps across the board.",       starPiece: "knight", critter: CRITTERS.hoppy, sceneIcon: "⭐", sceneTint: "linear-gradient(135deg, #d1fae5 0%, #10b981 100%)" },
    { id: 9,  name: "Catch the Star: Rook",   type: "challenge", blurb: "Straight-line stars only.",              starPiece: "rook",   sceneIcon: "⭐", sceneTint: "linear-gradient(135deg, #fed7aa 0%, #f97316 100%)" },
    { id: 10, name: "Catch the Star: Bishop", type: "treasure",  blurb: "Diagonals — light and dark.",            starPiece: "bishop", sceneIcon: "⭐", sceneTint: "linear-gradient(135deg, #e9d5ff 0%, #a855f7 100%)" },
    { id: 11, name: "Catch the Star: Queen",  type: "challenge", blurb: "Every direction, every star.",           starPiece: "queen",  critter: CRITTERS.acorn, sceneIcon: "⭐", sceneTint: "linear-gradient(135deg, #fbcfe8 0%, #db2777 100%)" },
    { id: 12, name: "Pawn Promotion Run",     type: "boss",      blurb: "Race a pawn to rank 8 — promote!",       promotionRun: true, critter: CRITTERS.guardian, sceneIcon: "👑", sceneTint: "linear-gradient(135deg, #fde68a 0%, #b45309 100%)" },
  ],
};

// ────────── Module 2: Farmer & Piggies ──────────
const MODULE_2: ModuleConfig = {
  id: "farmer-and-piggies",
  realmId: "pawn-village",
  title: "The Sunlit Farmlands",
  subtitle: "Race 12 farm quests to march your pawn to the barn!",
  background: farmlandsBg,
  track: "farmlands",
  finishIcon: "🌾",
  finishLabel: "Pawn Champion badge",
  overlay: "radial-gradient(ellipse at center, rgba(255,220,140,0.18) 0%, rgba(120,60,20,0.45) 100%)",
  accentClass: "border-orange-500/70",
  levels: [
    { id: 1,  name: "Pawn Push",          type: "lesson", blurb: "One square forward — careful and brave.",     sceneIcon: "♙", sceneTint: "linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%)" },
    { id: 2,  name: "Two-Square Start",   type: "lesson", blurb: "First move? Skip ahead two squares.",          sceneIcon: "⏩", sceneTint: "linear-gradient(135deg, #fde68a 0%, #f59e0b 100%)" },
    { id: 3,  name: "Diagonal Snack",     type: "lesson", blurb: "Pawns capture diagonally — yummy!",            sceneIcon: "🍎", sceneTint: "linear-gradient(135deg, #fee2e2 0%, #ef4444 100%)" },
    { id: 4,  name: "Pawn Chain",         type: "lesson", blurb: "Pawns protecting each other — teamwork!",       sceneIcon: "🌽", sceneTint: "linear-gradient(135deg, #fef9c3 0%, #eab308 100%)" },
    { id: 5,  name: "En Passant Magic",   type: "lesson", blurb: "A sneaky special capture.",                      sceneIcon: "✨", sceneTint: "linear-gradient(135deg, #ffedd5 0%, #fb923c 100%)" },
    { id: 6,  name: "Promotion Day",      type: "lesson", blurb: "Reach rank 8 — become a Queen!",                sceneIcon: "👑", sceneTint: "linear-gradient(135deg, #fef3c7 0%, #d97706 100%)" },
    { id: 7,  name: "Eat the Snack",      type: "challenge", blurb: "Capture the floating apple in one move.",   critter: CRITTERS.piggy, sceneIcon: "🍎", sceneTint: "linear-gradient(135deg, #fecaca 0%, #dc2626 100%)" },
    { id: 8,  name: "Race to Barn 1",     type: "challenge", blurb: "March a pawn to rank 5 fast!",               sceneIcon: "🏁", sceneTint: "linear-gradient(135deg, #fef3c7 0%, #ca8a04 100%)" },
    { id: 9,  name: "En Passant Catch",   type: "challenge", blurb: "Spot the magical capture window.",           sceneIcon: "✨", sceneTint: "linear-gradient(135deg, #ffedd5 0%, #ea580c 100%)" },
    { id: 10, name: "Promote Now",        type: "treasure",  blurb: "Pick the perfect promotion piece.",          sceneIcon: "👑", sceneTint: "linear-gradient(135deg, #fef9c3 0%, #b45309 100%)" },
    { id: 11, name: "Pawn Wars Mini",     type: "challenge", blurb: "First pawn to promote wins!",                critter: CRITTERS.farmer, sceneIcon: "⚔️", sceneTint: "linear-gradient(135deg, #fed7aa 0%, #c2410c 100%)" },
    { id: 12, name: "March to the Barn",  type: "boss",      blurb: "8 pawns vs lone King — push the king back!", critter: CRITTERS.farmer, sceneIcon: "🚜", sceneTint: "linear-gradient(135deg, #fde68a 0%, #92400e 100%)" },
  ],
};

// ────────── Module 3: Check, Checkmate & Stalemate ──────────
const MODULE_3: ModuleConfig = {
  id: "check-checkmate-stalemate",
  realmId: "castle-of-kings",
  title: "The Crystal Caverns",
  subtitle: "Race 12 cavern quests to master Check and Checkmate!",
  background: cavernsBg,
  track: "caverns",
  finishIcon: "❄",
  finishLabel: "Escape Artist badge",
  overlay: "radial-gradient(ellipse at center, rgba(125,211,252,0.18) 0%, rgba(20,30,80,0.55) 100%)",
  accentClass: "border-cyan-400/70",
  levels: [
    { id: 1,  name: "Shah! Check!",        type: "lesson", blurb: "When the king is under attack.",            sceneIcon: "⚠️", sceneTint: "linear-gradient(135deg, #dbeafe 0%, #3b82f6 100%)" },
    { id: 2,  name: "Block the Check",     type: "lesson", blurb: "Put a piece in the way.",                    sceneIcon: "🛡️", sceneTint: "linear-gradient(135deg, #e0e7ff 0%, #6366f1 100%)" },
    { id: 3,  name: "Run Away King",       type: "lesson", blurb: "King steps out of danger.",                  sceneIcon: "🏃", sceneTint: "linear-gradient(135deg, #cffafe 0%, #06b6d4 100%)" },
    { id: 4,  name: "Capture the Attacker",type: "lesson", blurb: "Take the piece giving check.",               sceneIcon: "⚔️", sceneTint: "linear-gradient(135deg, #ddd6fe 0%, #7c3aed 100%)" },
    { id: 5,  name: "Checkmate!",          type: "lesson", blurb: "King is trapped — game over!",                sceneIcon: "👑", sceneTint: "linear-gradient(135deg, #e0e7ff 0%, #4338ca 100%)" },
    { id: 6,  name: "Stalemate",           type: "lesson", blurb: "No legal moves but no check — it's a draw.", sceneIcon: "🤝", sceneTint: "linear-gradient(135deg, #f3e8ff 0%, #9333ea 100%)" },
    { id: 7,  name: "Spot the Check #1",   type: "challenge", blurb: "Which piece is giving check?",            sceneIcon: "🔍", sceneTint: "linear-gradient(135deg, #cffafe 0%, #0891b2 100%)" },
    { id: 8,  name: "Spot the Check #2",   type: "challenge", blurb: "Discovered check — find it!",             critter: CRITTERS.ghost, sceneIcon: "🔍", sceneTint: "linear-gradient(135deg, #ddd6fe 0%, #6d28d9 100%)" },
    { id: 9,  name: "Mate in 1 #1",        type: "challenge", blurb: "Finish the king in one move.",            sceneIcon: "👑", sceneTint: "linear-gradient(135deg, #e0e7ff 0%, #4f46e5 100%)" },
    { id: 10, name: "Mate in 1 #2",        type: "treasure",  blurb: "A trickier one-mover.",                    sceneIcon: "👑", sceneTint: "linear-gradient(135deg, #f5d0fe 0%, #a21caf 100%)" },
    { id: 11, name: "Stalemate Trap",      type: "challenge", blurb: "Avoid drawing — find the mate!",          critter: CRITTERS.ghost, sceneIcon: "⚠️", sceneTint: "linear-gradient(135deg, #ddd6fe 0%, #5b21b6 100%)" },
    { id: 12, name: "King's Escape Room",  type: "boss",      blurb: "Identify check, mate, or stalemate — fast!", critter: CRITTERS.drake, sceneIcon: "🐉", sceneTint: "linear-gradient(135deg, #c7d2fe 0%, #312e81 100%)" },
  ],
};

// ────────── Module 4: Basic Checkmates ──────────
const MODULE_4: ModuleConfig = {
  id: "basic-checkmates",
  realmId: "castle-of-kings",
  title: "The Lava Forge",
  subtitle: "Race 12 forge quests to master the basic mates!",
  background: forgeBg,
  track: "forge",
  finishIcon: "🔥",
  finishLabel: "Endgame Executioner badge",
  overlay: "radial-gradient(ellipse at center, rgba(251,146,60,0.18) 0%, rgba(60,15,5,0.55) 100%)",
  accentClass: "border-orange-500/80",
  levels: [
    { id: 1,  name: "Queen's Force-Field",  type: "lesson", blurb: "The Queen builds an invisible box.",    sceneIcon: "♛", sceneTint: "linear-gradient(135deg, #fed7aa 0%, #ea580c 100%)" },
    { id: 2,  name: "K+Q Setup",            type: "lesson", blurb: "Bring your King to help.",               sceneIcon: "👑", sceneTint: "linear-gradient(135deg, #fef3c7 0%, #d97706 100%)" },
    { id: 3,  name: "Drive to the Edge",    type: "lesson", blurb: "Push the enemy king to a side.",         sceneIcon: "➡️", sceneTint: "linear-gradient(135deg, #fee2e2 0%, #dc2626 100%)" },
    { id: 4,  name: "Two-Rook Ladder",      type: "lesson", blurb: "Rooks climb the king down the board.",   sceneIcon: "♜", sceneTint: "linear-gradient(135deg, #fed7aa 0%, #b91c1c 100%)" },
    { id: 5,  name: "Avoid Stalemate",      type: "lesson", blurb: "Always leave the king one square — until the final blow.", sceneIcon: "⚠️", sceneTint: "linear-gradient(135deg, #fef9c3 0%, #ca8a04 100%)" },
    { id: 6,  name: "The Final Mate",       type: "lesson", blurb: "Land the perfect checkmate.",            sceneIcon: "✨", sceneTint: "linear-gradient(135deg, #fde68a 0%, #b45309 100%)" },
    { id: 7,  name: "Mate in 1: Q+K",       type: "challenge", blurb: "Finish with Queen and King.",          sceneIcon: "♛", sceneTint: "linear-gradient(135deg, #fed7aa 0%, #c2410c 100%)" },
    { id: 8,  name: "Mate in 1: 2 Rooks",   type: "challenge", blurb: "Ladder mate!",                          critter: CRITTERS.smith, sceneIcon: "♜", sceneTint: "linear-gradient(135deg, #fee2e2 0%, #991b1b 100%)" },
    { id: 9,  name: "Drive Drill",          type: "challenge", blurb: "Push the lone king step by step.",     sceneIcon: "➡️", sceneTint: "linear-gradient(135deg, #ffedd5 0%, #9a3412 100%)" },
    { id: 10, name: "Stalemate Spotter",    type: "treasure",  blurb: "Find the safe — non-stalemating — move.", sceneIcon: "👁️", sceneTint: "linear-gradient(135deg, #fef9c3 0%, #a16207 100%)" },
    { id: 11, name: "Ladder Speedrun",      type: "challenge", blurb: "Mate the king in 5 moves with 2 rooks.", critter: CRITTERS.smith, sceneIcon: "⚡", sceneTint: "linear-gradient(135deg, #fed7aa 0%, #7c2d12 100%)" },
    { id: 12, name: "Box the King",         type: "boss",      blurb: "Land a clean K+Q mate against the Golem.", critter: CRITTERS.golem, sceneIcon: "🗿", sceneTint: "linear-gradient(135deg, #fde68a 0%, #78350f 100%)" },
  ],
};

// ────────── Module 5: Opening Principles ──────────
const MODULE_5: ModuleConfig = {
  id: "opening-principles",
  realmId: "centerland-plains",
  title: "The Floating Islands",
  subtitle: "Race 12 sky quests to master the opening!",
  background: skyBg,
  track: "sky",
  finishIcon: "☁",
  finishLabel: "Opening Scholar badge",
  overlay: "radial-gradient(ellipse at center, rgba(186,230,253,0.25) 0%, rgba(30,60,120,0.40) 100%)",
  accentClass: "border-sky-400/70",
  levels: [
    { id: 1,  name: "Control the Center", type: "lesson", blurb: "Aim for e4, d4, e5, d5.",                  sceneIcon: "🎯", sceneTint: "linear-gradient(135deg, #dbeafe 0%, #2563eb 100%)" },
    { id: 2,  name: "Develop Knights",    type: "lesson", blurb: "Knights out before bishops.",               sceneIcon: "♞", sceneTint: "linear-gradient(135deg, #e0f2fe 0%, #0284c7 100%)" },
    { id: 3,  name: "Develop Bishops",    type: "lesson", blurb: "Aim them at the center.",                   sceneIcon: "♝", sceneTint: "linear-gradient(135deg, #cffafe 0%, #0e7490 100%)" },
    { id: 4,  name: "Castle Early",       type: "lesson", blurb: "Tuck your king in safely.",                 sceneIcon: "🏰", sceneTint: "linear-gradient(135deg, #ddd6fe 0%, #6d28d9 100%)" },
    { id: 5,  name: "One Move Per Piece", type: "lesson", blurb: "Don't move the same piece twice.",          sceneIcon: "🔄", sceneTint: "linear-gradient(135deg, #e0e7ff 0%, #4338ca 100%)" },
    { id: 6,  name: "Connect the Rooks",  type: "lesson", blurb: "Empty the back rank between rooks.",        sceneIcon: "♜", sceneTint: "linear-gradient(135deg, #fce7f3 0%, #be185d 100%)" },
    { id: 7,  name: "Best 1st Move",      type: "challenge", blurb: "Pick the strongest opening move.",       sceneIcon: "✨", sceneTint: "linear-gradient(135deg, #dbeafe 0%, #1e40af 100%)" },
    { id: 8,  name: "Best 2nd Move",      type: "challenge", blurb: "Continue with the best plan.",           critter: CRITTERS.pegasus, sceneIcon: "✨", sceneTint: "linear-gradient(135deg, #e0f2fe 0%, #0369a1 100%)" },
    { id: 9,  name: "Castle Now!",        type: "challenge", blurb: "Find the right moment to castle.",       sceneIcon: "🏰", sceneTint: "linear-gradient(135deg, #ddd6fe 0%, #5b21b6 100%)" },
    { id: 10, name: "Rule the Center",    type: "treasure",  blurb: "Choose the move that seizes the center.", sceneIcon: "🎯", sceneTint: "linear-gradient(135deg, #cffafe 0%, #155e75 100%)" },
    { id: 11, name: "Spot the Mistake",   type: "challenge", blurb: "Which opening move breaks a rule?",      critter: CRITTERS.pegasus, sceneIcon: "🔍", sceneTint: "linear-gradient(135deg, #fce7f3 0%, #9d174d 100%)" },
    { id: 12, name: "Connect the Rooks",  type: "boss",      blurb: "Finish development before Marshal does!", critter: CRITTERS.marshal, sceneIcon: "🛡️", sceneTint: "linear-gradient(135deg, #fef3c7 0%, #92400e 100%)" },
  ],
};

// ────────── Module 6: Tactics Grove ──────────
const MODULE_6: ModuleConfig = {
  id: "tactics-grove",
  realmId: "detective-forest",
  title: "The Tactics Grove",
  subtitle: "Race 12 grove quests — master pins, forks, and skewers!",
  background: groveBg,
  track: "grove",
  finishIcon: "♣",
  finishLabel: "Emerald Shard + Detective badge",
  overlay: "radial-gradient(ellipse at center, rgba(134,239,172,0.18) 0%, rgba(10,40,20,0.55) 100%)",
  accentClass: "border-emerald-500/70",
  levels: [
    { id: 1,  name: "Knight Fork",         type: "lesson", blurb: "One knight, two targets.",                  sceneIcon: "♞", sceneTint: "linear-gradient(135deg, #d1fae5 0%, #059669 100%)" },
    { id: 2,  name: "Pawn Fork",           type: "lesson", blurb: "Tiny pawn, big trouble.",                    sceneIcon: "♙", sceneTint: "linear-gradient(135deg, #ecfccb 0%, #65a30d 100%)" },
    { id: 3,  name: "The Pin",             type: "lesson", blurb: "Trap a piece against its King.",             sceneIcon: "📌", sceneTint: "linear-gradient(135deg, #bbf7d0 0%, #16a34a 100%)" },
    { id: 4,  name: "The Skewer",          type: "lesson", blurb: "Big piece runs — win the one behind.",       sceneIcon: "🍢", sceneTint: "linear-gradient(135deg, #a7f3d0 0%, #047857 100%)" },
    { id: 5,  name: "Discovered Attack",   type: "lesson", blurb: "Move one piece, attack with another!",       sceneIcon: "✨", sceneTint: "linear-gradient(135deg, #d9f99d 0%, #4d7c0f 100%)" },
    { id: 6,  name: "Double Attack",       type: "lesson", blurb: "Two threats at once — one must fall.",       sceneIcon: "⚔️", sceneTint: "linear-gradient(135deg, #bbf7d0 0%, #15803d 100%)" },
    { id: 7,  name: "Find the Fork",       type: "challenge", blurb: "Spot the winning leap.",                   sceneIcon: "🔍", sceneTint: "linear-gradient(135deg, #d1fae5 0%, #047857 100%)" },
    { id: 8,  name: "Find the Pin",        type: "challenge", blurb: "Lock that piece down!",                    critter: CRITTERS.sleuth, sceneIcon: "📌", sceneTint: "linear-gradient(135deg, #bbf7d0 0%, #166534 100%)" },
    { id: 9,  name: "Skewer Hunt",         type: "challenge", blurb: "Punch through to the back piece.",         sceneIcon: "🍢", sceneTint: "linear-gradient(135deg, #a7f3d0 0%, #065f46 100%)" },
    { id: 10, name: "Discovered Check",    type: "treasure",  blurb: "Move and reveal — surprise check!",         sceneIcon: "✨", sceneTint: "linear-gradient(135deg, #d9f99d 0%, #3f6212 100%)" },
    { id: 11, name: "Back-Rank Detective", type: "challenge", blurb: "Spot the mate hiding in plain sight.",      critter: CRITTERS.owl, sceneIcon: "🔎", sceneTint: "linear-gradient(135deg, #bbf7d0 0%, #14532d 100%)" },
    { id: 12, name: "Grand Detective",     type: "boss",      blurb: "Three tactics — finish the case!",          critter: CRITTERS.owl, sceneIcon: "♣", sceneTint: "linear-gradient(135deg, #86efac 0%, #14532d 100%)" },
  ],
};

// ────────── Module 7: Pin Factory ──────────
const MODULE_7: ModuleConfig = {
  id: "pins-and-skewers",
  realmId: "detective-forest",
  title: "The Pin Factory",
  subtitle: "Race 12 factory quests — chain pins and skewers like a master!",
  background: pinFactoryBg,
  track: "factory",
  finishIcon: "📌",
  finishLabel: "Chain Master badge",
  overlay: "radial-gradient(ellipse at center, rgba(253,224,71,0.18) 0%, rgba(30,15,40,0.55) 100%)",
  accentClass: "border-amber-500/70",
  levels: [
    { id: 1,  name: "Absolute Pin",      type: "lesson",    blurb: "Pin a piece against the King.",            sceneIcon: "📌", sceneTint: "linear-gradient(135deg, #fde68a 0%, #b45309 100%)" },
    { id: 2,  name: "Relative Pin",      type: "lesson",    blurb: "Pin to the Queen — still painful!",        sceneIcon: "🔗", sceneTint: "linear-gradient(135deg, #fef3c7 0%, #92400e 100%)" },
    { id: 3,  name: "Bishop Diagonal Pin", type: "lesson",  blurb: "Long-diagonal traps.",                      sceneIcon: "♝", sceneTint: "linear-gradient(135deg, #fcd34d 0%, #78350f 100%)" },
    { id: 4,  name: "Gang Up!",          type: "lesson",    blurb: "Add an attacker to a pinned piece.",        sceneIcon: "⚔️", sceneTint: "linear-gradient(135deg, #fde047 0%, #713f12 100%)" },
    { id: 5,  name: "Queen Pin",         type: "lesson",    blurb: "Queens make the heaviest pins.",            sceneIcon: "♛", sceneTint: "linear-gradient(135deg, #fbbf24 0%, #7c2d12 100%)" },
    { id: 6,  name: "Skewer Basics",     type: "lesson",    blurb: "Big piece runs — win the one behind.",      sceneIcon: "🍢", sceneTint: "linear-gradient(135deg, #facc15 0%, #6b21a8 100%)" },
    { id: 7,  name: "Royal Skewer",      type: "challenge", blurb: "Skewer the King — claim the prize.",        sceneIcon: "👑", sceneTint: "linear-gradient(135deg, #fde68a 0%, #4c1d95 100%)" },
    { id: 8,  name: "Diagonal Skewer",   type: "challenge", blurb: "Bishop runs the long line.",                critter: CRITTERS.sleuth, sceneIcon: "♝", sceneTint: "linear-gradient(135deg, #fcd34d 0%, #3b0764 100%)" },
    { id: 9,  name: "Pin & Win",         type: "challenge", blurb: "Pin it, then take it!",                     sceneIcon: "📌", sceneTint: "linear-gradient(135deg, #fef3c7 0%, #581c87 100%)" },
    { id: 10, name: "Skewer & Win",      type: "treasure",  blurb: "Check, then collect.",                      sceneIcon: "🎁", sceneTint: "linear-gradient(135deg, #fde68a 0%, #4a044e 100%)" },
    { id: 11, name: "Pin Factory Drill", type: "challenge", blurb: "Find the pinning move — fast!",             critter: CRITTERS.owl, sceneIcon: "⚙️", sceneTint: "linear-gradient(135deg, #fbbf24 0%, #1e1b4b 100%)" },
    { id: 12, name: "Chain Master",      type: "boss",      blurb: "Three masterful pins & skewers.",           critter: CRITTERS.owl, sceneIcon: "🔗", sceneTint: "linear-gradient(135deg, #facc15 0%, #1e1b4b 100%)" },
  ],
};

// ────────── Module 9: Tactical Peaks ──────────
const MODULE_9: ModuleConfig = {
  id: "game-phases",
  realmId: "tactical-mountains",
  title: "The Tactical Peaks",
  subtitle: "Race 12 summit quests — master the Opening, Middlegame, and Endgame!",
  background: peaksBg,
  track: "peaks",
  finishIcon: "❄",
  finishLabel: "Phase Commander badge",
  overlay: "radial-gradient(ellipse at center, rgba(186,230,253,0.18) 0%, rgba(10,20,50,0.55) 100%)",
  accentClass: "border-sky-400/70",
  levels: [
    { id: 1,  name: "Claim the Center",     type: "lesson",    blurb: "Opening Phase — push e4!",                  sceneIcon: "🎯", sceneTint: "linear-gradient(135deg, #dbeafe 0%, #1d4ed8 100%)" },
    { id: 2,  name: "Develop Pieces",       type: "lesson",    blurb: "Knights and Bishops to the front.",         sceneIcon: "♞", sceneTint: "linear-gradient(135deg, #e0f2fe 0%, #0369a1 100%)" },
    { id: 3,  name: "Castle Safe",          type: "lesson",    blurb: "Tuck the King away — short or long.",        sceneIcon: "🏰", sceneTint: "linear-gradient(135deg, #cffafe 0%, #155e75 100%)" },
    { id: 4,  name: "Checks First",         type: "lesson",    blurb: "CCT step 1 — look for every check.",         sceneIcon: "⚠️", sceneTint: "linear-gradient(135deg, #dbeafe 0%, #1e40af 100%)" },
    { id: 5,  name: "Captures Next",        type: "lesson",    blurb: "CCT step 2 — find the best capture.",         sceneIcon: "⚔️", sceneTint: "linear-gradient(135deg, #c7d2fe 0%, #312e81 100%)" },
    { id: 6,  name: "Threats Last",         type: "lesson",    blurb: "CCT step 3 — what's the opponent planning?",  sceneIcon: "👁️", sceneTint: "linear-gradient(135deg, #ddd6fe 0%, #4338ca 100%)" },
    { id: 7,  name: "Middlegame Plan",      type: "challenge", blurb: "Castle and centralize — find the plan!",     sceneIcon: "🗺️", sceneTint: "linear-gradient(135deg, #bfdbfe 0%, #1e3a8a 100%)" },
    { id: 8,  name: "Activate the King",    type: "challenge", blurb: "Endgame Phase — march your King up!",        critter: CRITTERS.pegasus, sceneIcon: "♔", sceneTint: "linear-gradient(135deg, #e0e7ff 0%, #3730a3 100%)" },
    { id: 9,  name: "Passed Pawn Race",     type: "challenge", blurb: "Promote your pawn to a Queen!",              sceneIcon: "👑", sceneTint: "linear-gradient(135deg, #cffafe 0%, #0c4a6e 100%)" },
    { id: 10, name: "Closing the Game",     type: "treasure",  blurb: "Find the mate in 1.",                         sceneIcon: "✨", sceneTint: "linear-gradient(135deg, #dbeafe 0%, #1e3a8a 100%)" },
    { id: 11, name: "CCT Speed Drill",      type: "challenge", blurb: "Checks, Captures, Threats — fast!",          critter: CRITTERS.owl, sceneIcon: "⚡", sceneTint: "linear-gradient(135deg, #c7d2fe 0%, #1e1b4b 100%)" },
    { id: 12, name: "Phase Navigator",      type: "boss",      blurb: "Opening → Middlegame → Endgame finish!",     critter: CRITTERS.marshal, sceneIcon: "🧭", sceneTint: "linear-gradient(135deg, #bfdbfe 0%, #1e1b4b 100%)" },
  ],
};

// ────────── Module 8: Guard the Castle (Quick Mates) ──────────
const MODULE_8: ModuleConfig = {
  id: "quick-mates",
  realmId: "tactical-mountains",
  title: "Guard the Castle",
  subtitle: "Race 12 keep quests — master Scholar's Mate, smothered mate, and back-rank tricks!",
  background: castleBg,
  track: "castle",
  finishIcon: "🏰",
  finishLabel: "Pattern Hunter badge",
  overlay: "radial-gradient(ellipse at center, rgba(254,215,170,0.18) 0%, rgba(30,20,50,0.55) 100%)",
  accentClass: "border-rose-400/70",
  levels: [
    { id: 1,  name: "Target f7",          type: "lesson",    blurb: "The weakest square — aim your bishop!",      sceneIcon: "🎯", sceneTint: "linear-gradient(135deg, #fee2e2 0%, #b91c1c 100%)" },
    { id: 2,  name: "Back-Rank Rook",     type: "lesson",    blurb: "Trapped king + open 8th rank = mate.",        sceneIcon: "♜", sceneTint: "linear-gradient(135deg, #fecaca 0%, #991b1b 100%)" },
    { id: 3,  name: "Back-Rank Queen",    type: "lesson",    blurb: "Queen slides — back-rank checkmate.",         sceneIcon: "♛", sceneTint: "linear-gradient(135deg, #fde68a 0%, #b45309 100%)" },
    { id: 4,  name: "Smothered Mate",     type: "lesson",    blurb: "Knight in the corner — king can't escape!",   sceneIcon: "♞", sceneTint: "linear-gradient(135deg, #fef3c7 0%, #92400e 100%)" },
    { id: 5,  name: "K+Q Team Mate",      type: "lesson",    blurb: "Your King helps the Queen finish.",           sceneIcon: "👑", sceneTint: "linear-gradient(135deg, #fed7aa 0%, #c2410c 100%)" },
    { id: 6,  name: "f7 Fork",            type: "challenge", blurb: "Knight leaps to f7 — fork the rooks!",        sceneIcon: "🍴", sceneTint: "linear-gradient(135deg, #fef3c7 0%, #7c2d12 100%)" },
    { id: 7,  name: "Quick Mate Drill",   type: "challenge", blurb: "Spot the one-move mate fast!",                sceneIcon: "⚡", sceneTint: "linear-gradient(135deg, #fecaca 0%, #7f1d1d 100%)" },
    { id: 8,  name: "Two-Rook Ladder",    type: "challenge", blurb: "Climb the ladder — checkmate!",               critter: CRITTERS.pegasus, sceneIcon: "🪜", sceneTint: "linear-gradient(135deg, #fed7aa 0%, #9a3412 100%)" },
    { id: 9,  name: "Fried Liver",        type: "challenge", blurb: "Open f7 — the Fried Liver attack!",           sceneIcon: "🔥", sceneTint: "linear-gradient(135deg, #fef3c7 0%, #b45309 100%)" },
    { id: 10, name: "Mate in 1",          type: "treasure",  blurb: "Find the lightning mate!",                     sceneIcon: "✨", sceneTint: "linear-gradient(135deg, #fde68a 0%, #78350f 100%)" },
    { id: 11, name: "Pattern Spotter",    type: "challenge", blurb: "Back rank or smothered — finish it!",         critter: CRITTERS.owl, sceneIcon: "🔍", sceneTint: "linear-gradient(135deg, #fecaca 0%, #581c87 100%)" },
    { id: 12, name: "Guard the Castle",   type: "boss",      blurb: "Three quick mates — protect the keep!",        critter: CRITTERS.marshal, sceneIcon: "🏰", sceneTint: "linear-gradient(135deg, #fde68a 0%, #1e1b4b 100%)" },
  ],
};

export const MODULES: ModuleConfig[] = [MODULE_1, MODULE_2, MODULE_3, MODULE_4, MODULE_5, MODULE_6, MODULE_7, MODULE_8, MODULE_9];

export const MODULES_BY_ID: Record<string, ModuleConfig> = Object.fromEntries(
  MODULES.map((m) => [m.id, m]),
);

/** Default module for a realm hub when no `?module=` is provided. */
export function defaultModuleForRealm(realmId: string): ModuleConfig {
  return MODULES.find((m) => m.realmId === realmId) ?? MODULE_1;
}

export function modulesInRealm(realmId: string): ModuleConfig[] {
  return MODULES.filter((m) => m.realmId === realmId);
}

export function isPlayableModule(moduleId: string): boolean {
  return moduleId in MODULES_BY_ID;
}
