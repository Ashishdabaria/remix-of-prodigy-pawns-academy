import type { ShardId } from "./realms";

export interface StudentProfile {
  name: string;
  currentRealmId: string;
  shardsCollected: ShardId[];
  xp: number;
  xpToNextRank: number;
  gold: number;
  gems: number;
  braveHearts: number;
}

export const STUDENT: StudentProfile = {
  name: "Avery",
  currentRealmId: "tactical-mountains",
  shardsCollected: ["pearl", "sun", "amber", "emerald"],
  xp: 1240,
  xpToNextRank: 2000,
  gold: 380,
  gems: 24,
  braveHearts: 17,
};

// Mock mutators — in-memory only. A future Lovable Cloud pass swaps these for
// server-fn calls. Pair with router.invalidate() after a mutation to refresh
// consumers that read STUDENT at render time.
export function addShard(id: ShardId) {
  if (!STUDENT.shardsCollected.includes(id)) STUDENT.shardsCollected.push(id);
}
export function addXP(n: number) { STUDENT.xp += n; }
export function addGold(n: number) { STUDENT.gold += n; }
export function addGems(n: number) { STUDENT.gems += n; }
export function addBraveHeart(n: number) { STUDENT.braveHearts += n; }
export function setCurrentRealm(id: string) { STUDENT.currentRealmId = id; }

export interface QuestItem {
  id: string;
  title: string;
  reward: string;
  done?: boolean;
}

export const DAILY_QUESTS: QuestItem[] = [
  { id: "d1", title: "Solve 3 mate-in-1 puzzles", reward: "+40 XP, +5 Gold" },
  { id: "d2", title: "Play a friendly 10-minute game", reward: "+30 XP" },
  { id: "d3", title: "Practice the knight fork pattern", reward: "+25 XP, +1 Gem", done: true },
];

export const WEEKLY_QUESTS: QuestItem[] = [
  { id: "w1", title: "Win 3 puzzle rush rounds", reward: "+200 XP, +30 Gold" },
  { id: "w2", title: "Finish the Tactical Mountains training arc", reward: "+1 Sapphire Shard progress" },
];

export const SIDE_QUESTS: QuestItem[] = [
  { id: "s1", title: "Help the Lost Knight find his L-shape", reward: "+1 Gem" },
  { id: "s2", title: "Visit the Secret Tactical Cave", reward: "Hidden Badge" },
];

export interface BossCard {
  realmId: string;
  realmName: string;
  bossName: string;
  status: "ready" | "training";
}

export const NEXT_BOSS: BossCard = {
  realmId: "tactical-mountains",
  realmName: "Tactical Mountains",
  bossName: "The Fork Giant",
  status: "training",
};
