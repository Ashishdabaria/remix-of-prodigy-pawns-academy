/**
 * Shared progress library — Pawn Village & beyond.
 *
 * Player identity is a UUID stored in localStorage (`pp.playerId`).
 * Replaceable with auth.uid() once auth lands; the function shape stays.
 */
import { supabase } from "@/integrations/supabase/client";

const PLAYER_KEY = "pp.playerId";

export interface LevelRow {
  id: string;
  realm_id: string;
  number: number;
  slug: string;
  name: string;
  blurb: string;
  icon: string | null;
  kind: "lesson" | "puzzle" | "boss" | "minigame";
  content: Record<string, unknown>;
  is_boss: boolean;
  xp_reward: number;
}

export interface ProgressRow {
  level_id: string;
  stars: number;
  completed_at: string;
}

export function getPlayerId(): string {
  if (typeof window === "undefined") return "00000000-0000-0000-0000-000000000000";
  let id = window.localStorage.getItem(PLAYER_KEY);
  if (!id) {
    id = (crypto as Crypto).randomUUID();
    window.localStorage.setItem(PLAYER_KEY, id);
  }
  return id;
}

export async function fetchLevels(realmId: string): Promise<LevelRow[]> {
  const { data, error } = await supabase
    .from("levels")
    .select("*")
    .eq("realm_id", realmId)
    .order("number", { ascending: true });
  if (error) throw error;
  return (data ?? []) as LevelRow[];
}

export async function fetchProgress(playerId: string, realmId: string): Promise<ProgressRow[]> {
  // Filter to this realm by joining via levels
  const { data: levels, error: lErr } = await supabase
    .from("levels")
    .select("id")
    .eq("realm_id", realmId);
  if (lErr) throw lErr;
  const ids = (levels ?? []).map((l) => l.id);
  if (ids.length === 0) return [];

  const { data, error } = await supabase
    .from("level_progress")
    .select("level_id, stars, completed_at")
    .eq("player_id", playerId)
    .in("level_id", ids);
  if (error) throw error;
  return (data ?? []) as ProgressRow[];
}

/**
 * Shared completion writer. Idempotent: upserts on (player_id, level_id),
 * keeping the highest star count seen.
 */
export async function completeLevel(opts: {
  playerId: string;
  levelId: string;
  stars: number;
}): Promise<ProgressRow> {
  const stars = Math.max(0, Math.min(3, Math.round(opts.stars)));

  // Read existing to keep best score
  const { data: existing } = await supabase
    .from("level_progress")
    .select("stars")
    .eq("player_id", opts.playerId)
    .eq("level_id", opts.levelId)
    .maybeSingle();

  const bestStars = Math.max(stars, existing?.stars ?? 0);

  const { data, error } = await supabase
    .from("level_progress")
    .upsert(
      {
        player_id: opts.playerId,
        level_id: opts.levelId,
        stars: bestStars,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "player_id,level_id" },
    )
    .select("level_id, stars, completed_at")
    .single();

  if (error) throw error;
  return data as ProgressRow;
}
