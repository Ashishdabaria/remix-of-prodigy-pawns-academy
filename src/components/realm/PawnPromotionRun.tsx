import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { playClick } from "@/lib/sound";

interface Props {
  onSolved?: () => void;
  /** Seconds the child has to reach rank 8. */
  totalSeconds?: number;
}

/**
 * A lightweight pawn-promotion race. The pawn starts on rank 2 (index 1) on file e.
 * Tap "Step ▲" to advance one square. The very first move may be two squares.
 * Reach rank 8 (index 7) before the timer runs out to promote to a queen.
 */
export function PawnPromotionRun({ onSolved, totalSeconds = 18 }: Props) {
  const FILE = 4; // e-file
  const [rank, setRank] = useState(1); // 0..7
  const [moves, setMoves] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [promoted, setPromoted] = useState(false);
  const [failed, setFailed] = useState(false);
  const calledRef = useRef(false);

  useEffect(() => {
    if (promoted || failed) return;
    if (secondsLeft <= 0) { setFailed(true); return; }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, promoted, failed]);

  useEffect(() => {
    if (promoted && !calledRef.current) {
      calledRef.current = true;
      playClick("success");
      onSolved?.();
    }
  }, [promoted, onSolved]);

  function step(n: 1 | 2) {
    if (promoted || failed) return;
    if (n === 2 && moves !== 0) return; // two-square only on first move
    const next = rank + n;
    if (next > 7) return;
    playClick("tap");
    setRank(next);
    setMoves((m) => m + 1);
    if (next === 7) setPromoted(true);
  }

  function reset() {
    playClick("soft");
    setRank(1);
    setMoves(0);
    setSecondsLeft(totalSeconds);
    setPromoted(false);
    setFailed(false);
    calledRef.current = false;
  }

  const rows = [7, 6, 5, 4, 3, 2, 1, 0];

  return (
    <div className="rounded-xl border-2 border-ink/15 bg-parchment p-2">
      <div className="flex items-center justify-between px-1 pb-1.5 text-[10px] font-bold text-ink/70">
        <span>Race the pawn to rank 8</span>
        <span className={secondsLeft <= 5 && !promoted ? "text-rose-600" : ""}>⏱ {secondsLeft}s · moves {moves}</span>
      </div>
      <div className="grid aspect-square grid-cols-8 overflow-hidden rounded-md ring-2 ring-ink/30">
        {rows.map((r) =>
          [0, 1, 2, 3, 4, 5, 6, 7].map((c) => {
            const dark = (r + c) % 2 === 0;
            const here = c === FILE && r === rank;
            const goal = c === FILE && r === 7;
            return (
              <div
                key={`${c},${r}`}
                className={`relative grid place-items-center ${dark ? "bg-amber-900/70" : "bg-amber-100"}`}
              >
                {goal && !here && (
                  <span className={`text-[clamp(10px,2.4vw,18px)] ${dark ? "text-shard-sun" : "text-shard-sun/80"}`}>👑</span>
                )}
                {here && (
                  <motion.span
                    layout
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className={`text-[clamp(14px,3.5vw,28px)] leading-none ${dark ? "text-parchment" : "text-ink"}`}
                  >
                    {promoted ? "♕" : "♙"}
                  </motion.span>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        {!promoted && !failed && (
          <>
            <button
              type="button"
              onClick={() => step(1)}
              className="rounded-full bg-ink px-3 py-1 text-xs font-black text-parchment"
            >
              Step ▲
            </button>
            <button
              type="button"
              onClick={() => step(2)}
              disabled={moves !== 0}
              className="rounded-full bg-shard-sun px-3 py-1 text-xs font-black text-ink disabled:opacity-40"
            >
              Double step ▲▲
            </button>
          </>
        )}
        {promoted && (
          <span className="rounded-full bg-shard-emerald/30 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-ink">
            ✓ Promoted to Queen!
          </span>
        )}
        {failed && (
          <>
            <span className="rounded-full bg-rose-600/20 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-rose-700">
              ⏱ Time's up
            </span>
            <button
              type="button"
              onClick={reset}
              className="rounded-full border-2 border-ink/30 px-3 py-1 text-xs font-black text-ink"
            >
              Try again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
