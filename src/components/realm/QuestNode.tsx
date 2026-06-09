import { motion } from "framer-motion";
import type { ClimbLevel, LevelType } from "@/data/modules";

const RING: Record<LevelType, { color: string; label: string; icon: string }> = {
  lesson:    { color: "oklch(0.65 0.17 150)", label: "Lesson",    icon: "✦" },
  challenge: { color: "oklch(0.65 0.16 240)", label: "Challenge", icon: "⚔" },
  miniboss:  { color: "oklch(0.72 0.18 50)",  label: "Mini-boss", icon: "🐴" },
  treasure:  { color: "oklch(0.82 0.17 85)",  label: "Treasure",  icon: "🎁" },
  boss:      { color: "oklch(0.55 0.22 25)",  label: "Boss",      icon: "♛" },
};

export interface QuestNodeProps {
  level: ClimbLevel;
  state: "locked" | "current" | "done";
  stars: number;
  popping: boolean;
  isCurrent: boolean;
  onTap: () => void;
}

/**
 * QuestNode — a single medallion on the stone path.
 *
 * - Preserves all hover/tap animations from the previous inline TrackNode.
 * - When `isCurrent`, shows a bouncing "YOU" chip above the medallion so
 *   the player can always find their place on the trail at a glance.
 * - Locked nodes are visually dim, non-clickable, and announce themselves
 *   to screen readers as locked via aria-disabled.
 */
export function QuestNode({ level, state, stars, popping, isCurrent, onTap }: QuestNodeProps) {
  const ring = RING[level.type];
  const isBoss = level.type === "boss";

  const medallionBg =
    state === "done"
      ? "bg-shard-emerald"
      : state === "current"
        ? "bg-shard-sun"
        : "bg-muted";
  const medallionText = state === "locked" ? "text-ink/40" : "text-ink";

  return (
    <div className="flex flex-col items-center gap-0.5">
      {/* YOU badge — pinned above the medallion when this is the active node */}
      {isCurrent && (
        <motion.div
          initial={{ y: -2, opacity: 0 }}
          animate={{ y: [-4, -8, -4], opacity: 1 }}
          transition={{ y: { duration: 1.4, repeat: Infinity, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
          className="pointer-events-none -mb-1 flex flex-col items-center"
          aria-hidden
        >
          <span className="rounded-full bg-shard-sun px-2 py-0.5 font-display text-[9px] font-black uppercase tracking-widest text-ink shadow-md ring-2 ring-ink/30">
            You
          </span>
          <span className="-mt-0.5 text-shard-sun drop-shadow" style={{ fontSize: "10px", lineHeight: 1 }}>
            ▼
          </span>
        </motion.div>
      )}

      {/* Name tag */}
      <div
        className="rounded-lg border-2 border-ink/25 bg-parchment/95 text-center shadow-md"
        style={{
          maxWidth: "clamp(4.5rem, 18vw, 9rem)",
          padding: "0.1rem 0.4rem",
        }}
      >
        <div
          className="font-display font-black leading-tight text-ink"
          style={{ fontSize: "clamp(8px, 1.6vw, 11px)" }}
        >
          {level.name}
        </div>
      </div>

      {/* Medallion */}
      <motion.button
        type="button"
        onClick={onTap}
        aria-label={`Level ${level.id}: ${level.name} — ${state}`}
        aria-disabled={state !== "current"}
        disabled={state === "done"}
        whileHover={state === "current" ? { scale: 1.08 } : undefined}
        whileTap={state === "current" ? { scale: 0.95 } : undefined}
        animate={
          popping
            ? { scale: [1, 1.3, 1] }
            : state === "current"
              ? { y: [0, -4, 0] }
              : { y: 0 }
        }
        transition={
          popping
            ? { duration: 0.5 }
            : state === "current"
              ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0 }
        }
        className={`relative grid place-items-center rounded-full ${medallionBg} ${medallionText} shadow-xl ${
          state === "current" ? "animate-glow cursor-pointer" : ""
        } ${state === "locked" ? "opacity-80" : ""}`}
        style={{
          width: "clamp(2.25rem, 8vw, 3rem)",
          height: "clamp(2.25rem, 8vw, 3rem)",
          fontSize: "clamp(0.75rem, 2.2vw, 1rem)",
          border: "3px solid var(--parchment)",
          boxShadow: `0 0 0 3px ${ring.color}, 0 6px 12px rgba(0,0,0,0.35)`,
        }}
      >
        {state === "locked" && <span>🔒</span>}
        {state === "current" && (
          <span className="font-black">{isBoss ? "♛" : level.id}</span>
        )}
        {state === "done" && <span className="font-black">✓</span>}

        {/* Number badge */}
        {state !== "current" && (
          <span className="absolute -top-1 -left-1 grid h-4 w-4 place-items-center rounded-full bg-ink text-[9px] font-black text-parchment ring-2 ring-parchment">
            {level.id}
          </span>
        )}

        {/* PLAY tag for current */}
        {state === "current" && (
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-2 py-0.5 text-[8px] font-black uppercase tracking-widest text-parchment shadow-md whitespace-nowrap">
            {isBoss ? "♛ Boss" : "Play"}
          </span>
        )}

        {/* Sparkles when popping */}
        {popping && (
          <>
            {[0, 60, 120, 180, 240, 300].map((deg) => (
              <motion.span
                key={deg}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1.4, 0],
                  x: Math.cos((deg * Math.PI) / 180) * 30,
                  y: Math.sin((deg * Math.PI) / 180) * 30,
                }}
                transition={{ duration: 0.6 }}
                className="pointer-events-none absolute text-shard-sun"
              >
                ✦
              </motion.span>
            ))}
          </>
        )}
      </motion.button>

      {/* Stars */}
      <div className="mt-2 h-3 text-center" aria-label={state === "done" ? `${stars} of 3 stars` : undefined}>
        {state === "done" && (
          <span className="text-[11px] leading-none">
            {[1, 2, 3].map((s) => (
              <span key={s} className={s <= stars ? "text-shard-sun" : "text-ink/20"}>★</span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
