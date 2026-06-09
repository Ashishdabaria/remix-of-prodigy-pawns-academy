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
  /** Emoji of the enemy guarding the CURRENT node — appears next to the pedestal. */
  enemyEmoji?: string;
  /** Friendly name of that enemy (shown on its taunt bubble). */
  enemyName?: string;
  onTap: () => void;
}

/**
 * QuestNode — a story pedestal on the realm's adventure map.
 *
 * Visual language inspired by classic quest-map UIs:
 *  - Mossy STONE PEDESTAL as the base for every node.
 *  - A banner FLAG on top: "COMPLETED" (green ✓), "LOCKED" (gray 🔒),
 *    or a bright glowing banner with the level name when current.
 *  - When CURRENT, a small enemy creature appears next to the pedestal
 *    that the hero must "defeat" to advance to the next pedestal.
 *  - The BOSS pedestal (last node) is a small temple/den so it reads as
 *    a climactic destination instead of just another stop.
 */
export function QuestNode({
  level,
  state,
  stars,
  popping,
  isCurrent,
  enemyEmoji,
  enemyName,
  onTap,
}: QuestNodeProps) {
  const ring = RING[level.type];
  const isBoss = level.type === "boss";

  // Pedestal palette — mossy gray for normal, warm glow for current, dim for locked.
  const pedestalGrad =
    state === "done"
      ? "linear-gradient(180deg, #9aa39c 0%, #707a73 55%, #4b524d 100%)"
      : state === "current"
        ? "linear-gradient(180deg, #d6c79a 0%, #b3a070 55%, #7a6845 100%)"
        : "linear-gradient(180deg, #8a8f8a 0%, #5e635f 55%, #3a3d3a 100%)";

  // Flag/banner colors per state.
  const flagBg =
    state === "done"
      ? "bg-emerald-500"
      : state === "current"
        ? "bg-shard-sun"
        : "bg-stone-500";
  const flagText = state === "done" || state === "current" ? "text-ink" : "text-white";

  return (
    <div className="relative flex flex-col items-center gap-1">
      {/* YOU bobbing arrow above the active pedestal */}
      {isCurrent && (
        <motion.div
          animate={{ y: [-2, -6, -2] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none flex flex-col items-center"
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

      {/* Banner FLAG — the visual story label for this stop */}
      <div className="relative flex items-end gap-0">
        <span className={`h-3 w-[3px] rounded-sm ${state === "locked" ? "bg-stone-700" : "bg-amber-900"}`} aria-hidden />
        <div
          className={`relative -ml-px rounded-r-md px-2 py-0.5 font-display text-[9px] font-black uppercase tracking-widest shadow-md ring-1 ring-ink/30 ${flagBg} ${flagText}`}
          style={{
            clipPath: "polygon(0 0, 100% 0, 92% 50%, 100% 100%, 0 100%)",
            paddingRight: "0.9rem",
          }}
        >
          {state === "done" ? "Completed" : state === "current" ? (isBoss ? "Boss Battle" : level.name) : "Locked"}
        </div>
      </div>

      {/* PEDESTAL — the stone base + medallion */}
      <motion.button
        type="button"
        onClick={onTap}
        aria-label={`Level ${level.id}: ${level.name} — ${state}`}
        aria-disabled={state !== "current"}
        disabled={state === "done"}
        whileHover={state === "current" ? { scale: 1.06 } : undefined}
        whileTap={state === "current" ? { scale: 0.94 } : undefined}
        animate={
          popping
            ? { scale: [1, 1.25, 1] }
            : state === "current"
              ? { y: [0, -3, 0] }
              : { y: 0 }
        }
        transition={
          popping
            ? { duration: 0.5 }
            : state === "current"
              ? { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0 }
        }
        className={`relative grid place-items-center ${
          state === "current" ? "cursor-pointer" : ""
        } ${state === "locked" ? "opacity-90" : ""}`}
        style={{
          width: isBoss ? "clamp(3rem, 11vw, 4.25rem)" : "clamp(2.5rem, 9vw, 3.5rem)",
          height: isBoss ? "clamp(3rem, 11vw, 4.25rem)" : "clamp(2.5rem, 9vw, 3.5rem)",
          background: pedestalGrad,
          borderRadius: isBoss ? "12px 12px 8px 8px" : "14px 14px 10px 10px",
          border: "2px solid rgba(20,12,5,0.55)",
          boxShadow:
            state === "current"
              ? `inset 0 -6px 0 rgba(0,0,0,0.25), 0 0 0 3px ${ring.color}, 0 10px 18px rgba(0,0,0,0.45), 0 0 22px ${ring.color}`
              : `inset 0 -6px 0 rgba(0,0,0,0.3), 0 8px 14px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Moss accents on the pedestal */}
        <span aria-hidden className="pointer-events-none absolute -left-1 -top-1 h-2 w-3 rounded-full bg-emerald-700/70 blur-[1px]" />
        <span aria-hidden className="pointer-events-none absolute -right-1 top-1 h-2 w-2 rounded-full bg-emerald-600/60 blur-[1px]" />
        <span aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-emerald-800/40 blur-[1px]" />

        {/* Center icon */}
        <span
          className="relative font-black drop-shadow"
          style={{
            fontSize: isBoss ? "clamp(1.1rem, 3.6vw, 1.5rem)" : "clamp(0.85rem, 2.4vw, 1.1rem)",
            color: state === "locked" ? "rgba(255,255,255,0.85)" : "var(--color-ink)",
          }}
        >
          {state === "locked" && "🔒"}
          {state === "done" && <span className="text-emerald-100">✓</span>}
          {state === "current" && (isBoss ? "♛" : level.id)}
        </span>

        {/* Number chip (corner) for non-current pedestals */}
        {state !== "current" && (
          <span className="absolute -top-2 -left-2 grid h-4 w-4 place-items-center rounded-full bg-ink text-[9px] font-black text-parchment ring-2 ring-parchment shadow">
            {level.id}
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

      {/* ENEMY creature — only appears next to the active pedestal */}
      {isCurrent && enemyEmoji && (
        <motion.div
          className="pointer-events-none absolute -right-8 bottom-2 flex flex-col items-center sm:-right-10"
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          aria-hidden
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, -4, 0], rotate: [-4, 4, -4] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="grid place-items-center rounded-full bg-ink/80 ring-2 ring-shard-sun shadow-lg"
              style={{
                width: "clamp(1.75rem, 6vw, 2.25rem)",
                height: "clamp(1.75rem, 6vw, 2.25rem)",
                fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
              }}
            >
              {enemyEmoji}
            </motion.div>
            <span className="absolute -top-1 -right-1 grid h-3.5 w-3.5 place-items-center rounded-full bg-red-600 text-[8px] font-black text-white ring-1 ring-white">
              !
            </span>
          </div>
          {enemyName && (
            <span className="mt-0.5 max-w-[5rem] truncate rounded-full bg-parchment/95 px-1.5 py-px text-[8px] font-black uppercase tracking-wider text-ink ring-1 ring-ink/30">
              {enemyName}
            </span>
          )}
        </motion.div>
      )}

      {/* Stars for completed */}
      <div className="h-3 text-center" aria-label={state === "done" ? `${stars} of 3 stars` : undefined}>
        {state === "done" && (
          <span className="text-[10px] leading-none">
            {[1, 2, 3].map((s) => (
              <span key={s} className={s <= stars ? "text-shard-sun" : "text-ink/20"}>★</span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
