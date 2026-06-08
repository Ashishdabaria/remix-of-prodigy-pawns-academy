import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Mariposa } from "./Mariposa";
import { playClick } from "@/lib/sound";

const KEY = "pp-quick-tour-seen-v1";

interface Step {
  title: string;
  body: string;
  icon: string;
}

const STEPS: Step[] = [
  {
    icon: "🗺️",
    title: "Welcome to the Quest Map",
    body: "This is where all 8 Crown Shard realms live. Realm 1 — Pawn Village — is glowing and ready for you.",
  },
  {
    icon: "🏡",
    title: "Tap Pawn Village",
    body: "From the map, tap Realm 1 (Pawn Village). You'll see the realm hub with a 'Begin Quest' button and a list of modules.",
  },
  {
    icon: "📚",
    title: "Module 1 — Meet the Army",
    body: "Module 1 is the first quest in Pawn Village. It introduces every chess piece: King, Knight, Pawn, Rook, Bishop, Queen.",
  },
  {
    icon: "⚔️",
    title: "Start climbing",
    body: "Press Begin Quest to open the winding path. Tap node 1 (Meet the King) to watch the tutorial, play the practice puzzle, then beat the challenge!",
  },
];

export function QuickTour({ autoOpen = true }: { autoOpen?: boolean }) {
  const [open, setOpen] = useState(false);
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!autoOpen) return;
    try {
      if (!localStorage.getItem(KEY)) setOpen(true);
    } catch {}
  }, [autoOpen]);

  function close() {
    playClick();
    setOpen(false);
    try { localStorage.setItem(KEY, "1"); } catch {}
    setI(0);
  }

  function next() {
    playClick();
    if (i < STEPS.length - 1) setI(i + 1);
    else close();
  }

  function prev() {
    playClick();
    setI(Math.max(0, i - 1));
  }

  function openTour() {
    playClick();
    setI(0);
    setOpen(true);
  }

  const step = STEPS[i];
  const last = i === STEPS.length - 1;

  return (
    <>
      <button
        type="button"
        onClick={openTour}
        className="rounded-full border-2 border-ink/30 bg-parchment/80 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-ink hover:bg-shard-sun/40"
      >
        🦋 Quick tour
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Quick tour"
              className="relative w-full max-w-md rounded-3xl border-2 border-ink/20 bg-card p-6 shadow-2xl"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={close}
                aria-label="Close tour"
                className="absolute right-3 top-3 rounded-full px-2 py-1 text-sm font-black text-ink/60 hover:bg-accent hover:text-ink"
              >
                ✕
              </button>

              <div className="flex items-center gap-3">
                <Mariposa size={56} />
                <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
                  Step {i + 1} of {STEPS.length}
                </div>
              </div>

              <motion.div
                key={i}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-4"
              >
                <div className="text-4xl">{step.icon}</div>
                <h3 className="mt-2 font-display text-2xl font-black text-ink ink-shadow">
                  {step.title}
                </h3>
                <p className="mt-2 text-ink/80">{step.body}</p>
              </motion.div>

              <div className="mt-5 flex items-center justify-between gap-2">
                <button
                  onClick={prev}
                  disabled={i === 0}
                  className="rounded-full px-3 py-1.5 text-xs font-black uppercase tracking-wider text-ink/70 disabled:opacity-30 hover:bg-accent"
                >
                  ← Back
                </button>

                <div className="flex gap-1.5">
                  {STEPS.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-2 w-2 rounded-full ${idx === i ? "bg-ink" : "bg-ink/20"}`}
                    />
                  ))}
                </div>

                {last ? (
                  <Link
                    to="/realm/$realmId_/path"
                    params={{ realmId: "pawn-village" }}
                    onClick={close}
                    className="rounded-full bg-ink px-4 py-2 text-xs font-black uppercase tracking-wider text-parchment hover:bg-ink/90"
                  >
                    Take me there →
                  </Link>
                ) : (
                  <button
                    onClick={next}
                    className="rounded-full bg-ink px-4 py-2 text-xs font-black uppercase tracking-wider text-parchment hover:bg-ink/90"
                  >
                    Next →
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
