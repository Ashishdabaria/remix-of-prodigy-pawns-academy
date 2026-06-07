export interface Pet {
  id: string;
  name: string;
  icon: string;
  blurb: string;
  rarity: "common" | "rare" | "legendary";
  memberOnly?: boolean;
}

export const PETS: Pet[] = [
  { id: "pawnling",   name: "Pawnling",        icon: "♟️", blurb: "A wobbly pawn-pup who follows your every move.",     rarity: "common" },
  { id: "knightcub",  name: "Knight Cub",      icon: "🐴", blurb: "Hops in tiny L-shapes. Loves apples.",              rarity: "common" },
  { id: "bishopowl",  name: "Bishop Owl",      icon: "🦉", blurb: "Glides on diagonals, hoots when you spot a pin.",   rarity: "rare" },
  { id: "rookturtle", name: "Rook Turtle",     icon: "🐢", blurb: "Slow and steady — castles up when scared.",          rarity: "rare" },
  { id: "queenfox",   name: "Queen Fox",       icon: "🦊", blurb: "Clever, quick, sparkles after every checkmate.",     rarity: "rare" },
  { id: "dragonling", name: "Baby Dragon",     icon: "🐉", blurb: "Hatched from a topaz egg. Breathes warm bubbles.",   rarity: "legendary", memberOnly: true },
  { id: "moonbun",    name: "Moon Bunny",      icon: "🐇", blurb: "Pearl-white and glows at night. Royal Pass exclusive.", rarity: "legendary", memberOnly: true },
  { id: "starwhale",  name: "Astral Whale",    icon: "🐋", blurb: "Drifts through the Astral Academy. Members only.",  rarity: "legendary", memberOnly: true },
];

// Member-only realms (Royal Pass) — gates for the last two realms.
export const MEMBER_REALM_IDS = new Set<string>(["endgame-desert", "citadel-of-checkmate"]);
