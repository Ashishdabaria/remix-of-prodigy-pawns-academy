import { useEffect } from "react";
import { motion } from "framer-motion";
import { Mariposa } from "@/components/Mariposa";

interface NodeClearAnimationProps {
  /** Position of the just-cleared node in % of width / px of height. */
  from: { x: number; y: number };
  /** Position of the next node. */
  to?: { x: number; y: number };
  xpGained: number;
  cheer: string;
  onDone: () => void;
}

/**
 * Overlays the path with the celebration sequence:
 *  - cleared node flips to gold checkmark + 3 stars fly in
 *  - +XP coin floats up toward the HUD score chip (top-right)
 *  - trail lights up
 *  - Mariposa walks to the next node, which starts pulsing
 *  - Mariposa speaks a random cheer (via SpeechSynthesis API)
 */
export function NodeClearAnimation({ from, to, xpGained, cheer, onDone }: NodeClearAnimationProps) {
  useEffect(() => {
    // Chime — simple Web Audio bell so we don't need an asset
    try {
      const Ctx = window.AudioContext ?? (window as any).webkitAudioContext;
      if (Ctx) {
        const ctx = new Ctx();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(880, ctx.currentTime);
        o.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.25);
        g.gain.setValueAtTime(0.25, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        o.connect(g).connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + 0.6);
      }
    } catch {
      /* ignore */
    }

    // Speak the cheer
    try {
      const muted = window.localStorage.getItem("pp.voice.muted") === "1";
      if (!muted && window.speechSynthesis) {
        const u = new SpeechSynthesisUtterance(cheer);
        u.pitch = 1.2;
        u.rate = 1.0;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(u);
      }
    } catch {
      /* ignore */
    }

    const t = window.setTimeout(onDone, 2800);
    return () => window.clearTimeout(t);
  }, [cheer, onDone]);

  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
      {/* Gold checkmark flip on the cleared node */}
      <motion.div
        initial={{ rotateY: 0, scale: 1 }}
        animate={{ rotateY: 180, scale: 1.15 }}
        transition={{ duration: 0.5 }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${from.x}%`, top: from.y }}
      >
        <div className="grid h-20 w-20 place-items-center rounded-full border-4 border-parchment bg-shard-sun text-4xl text-ink shadow-2xl ring-4 ring-shard-sun/60">
          <span style={{ transform: "rotateY(180deg)" }}>✓</span>
        </div>
      </motion.div>

      {/* Three stars fly in */}
      {[-40, 0, 40].map((dx, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 0, y: -60, scale: 0.4 }}
          animate={{ opacity: [0, 1, 1, 0], x: dx, y: 0, scale: [0.4, 1.4, 1] }}
          transition={{ duration: 1.4, delay: 0.4 + i * 0.12 }}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-3xl"
          style={{ left: `${from.x}%`, top: from.y - 50, color: "var(--shard-sun)" }}
        >
          ★
        </motion.div>
      ))}

      {/* +XP coin floats from node to top-right HUD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{
          opacity: [0, 1, 1, 0],
          scale: [0.6, 1.1, 1],
          x: ["0%", "0%", "40%"],
          y: [0, -40, -240],
        }}
        transition={{ duration: 1.6, delay: 0.6, times: [0, 0.2, 0.6, 1] }}
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${from.x}%`, top: from.y }}
      >
        <div className="inline-flex items-center gap-1 rounded-full bg-shard-sun px-3 py-1 text-sm font-black text-ink ring-2 ring-ink/20 shadow-lg">
          +{xpGained} 🪙
        </div>
      </motion.div>

      {/* Trail lights up + hero/Mariposa walks to next node */}
      {to && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1] }}
            transition={{ duration: 1.0, delay: 1.0 }}
            className="absolute inset-0"
          >
            <svg viewBox="0 0 100 1" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="trail-glow">
                  <stop offset="0%" stopColor="var(--shard-sun)" stopOpacity="0" />
                  <stop offset="50%" stopColor="var(--shard-sun)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--shard-sun)" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
          </motion.div>

          <motion.div
            initial={{ left: `${from.x}%`, top: from.y, opacity: 0 }}
            animate={{ left: `${to.x}%`, top: to.y, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.2, delay: 1.2, times: [0, 0.15, 0.85, 1] }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
          >
            <Mariposa size={56} />
          </motion.div>

          {/* Pulse on next node */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.6, 1.2], opacity: [0, 0.8, 0] }}
            transition={{ duration: 1.0, delay: 2.0, repeat: 1 }}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${to.x}%`, top: to.y }}
          >
            <div className="h-24 w-24 rounded-full bg-shard-sun/40 ring-4 ring-shard-sun" />
          </motion.div>
        </>
      )}
    </div>
  );
}
