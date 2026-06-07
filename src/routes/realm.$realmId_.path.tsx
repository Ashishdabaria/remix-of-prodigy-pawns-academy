import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRealm, type Realm } from "@/data/realms";
import { Mariposa } from "@/components/Mariposa";
import { MuteToggle } from "@/components/realm/MariposaSay";
import villageBg from "@/assets/pawn-village-map.jpg";

export const Route = createFileRoute("/realm/$realmId_/path")({
  loader: ({ params }) => {
    const realm = getRealm(params.realmId);
    if (!realm) throw notFound();
    return { realm };
  },
  head: ({ loaderData }) => {
    const r = loaderData?.realm;
    return {
      meta: [
        { title: r ? `${r.name} — Quest Path` : "Quest Path" },
        { name: "description", content: "Race across the Pawn Village to win the Pearl Shard." },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-black">Path not found</h1>
      <Link to="/" className="mt-4 inline-block rounded-full bg-ink px-5 py-2 font-black text-parchment">Back to map</Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-black">The path crumbled.</h1>
      <button onClick={reset} className="mt-4 rounded-full bg-ink px-5 py-2 font-black text-parchment">Try again</button>
    </div>
  ),
  component: RealmPathPage,
});

// ---------------- Level data ----------------

type LevelType = "lesson" | "challenge" | "miniboss" | "treasure" | "boss";

interface ClimbLevel {
  id: number;
  name: string;
  type: LevelType;
}

const LEVELS: ClimbLevel[] = [
  { id: 1,  name: "Meet the board",         type: "lesson" },
  { id: 2,  name: "Meet the King",          type: "lesson" },
  { id: 3,  name: "Pawn & Rook",            type: "lesson" },
  { id: 4,  name: "Bishop & Queen",         type: "lesson" },
  { id: 5,  name: "Knight's hop",           type: "lesson" },
  { id: 6,  name: "Move-it challenge",      type: "challenge" },
  { id: 7,  name: "Lost Knight",            type: "miniboss" },
  { id: 8,  name: "Capture safely",         type: "lesson" },
  { id: 9,  name: "Capture 3 targets",      type: "challenge" },
  { id: 10, name: "Piece values",           type: "treasure" },
  { id: 11, name: "Set up the board",       type: "lesson" },
  { id: 12, name: "Board Guardian",         type: "boss" },
];

// Serpentine race-track positions (% of width / % of height inside path area).
const NODE_POS: { x: number; y: number }[] = [
  { x: 8,  y: 86 }, // 1 START
  { x: 24, y: 88 },
  { x: 42, y: 84 },
  { x: 60, y: 78 },
  { x: 78, y: 72 },
  { x: 86, y: 58 }, // curve right→up
  { x: 70, y: 52 },
  { x: 52, y: 56 },
  { x: 32, y: 52 },
  { x: 14, y: 40 }, // curve left→up
  { x: 30, y: 26 },
  { x: 54, y: 22 }, // boss
];
const PRIZE_POS = { x: 84, y: 14 };

const RING: Record<LevelType, { color: string; label: string; icon: string }> = {
  lesson:    { color: "oklch(0.65 0.17 150)", label: "Lesson",    icon: "✦" },
  challenge: { color: "oklch(0.65 0.16 240)", label: "Challenge", icon: "⚔" },
  miniboss:  { color: "oklch(0.72 0.18 50)",  label: "Mini-boss", icon: "🐴" },
  treasure:  { color: "oklch(0.82 0.17 85)",  label: "Treasure",  icon: "🎁" },
  boss:      { color: "oklch(0.55 0.22 25)",  label: "Boss",      icon: "♛" },
};

const CHEERS = [
  "Yes! You cleared it!",
  "Brilliant racing, hero!",
  "One more lap!",
  "Star power!",
  "You're flying now!",
  "Onward to the Shard!",
];
const LOCKED_LINES = [
  "Not yet — clear the glowing stop first.",
  "Finish the bright one first, hero.",
];

function speak(text: string) {
  if (typeof window === "undefined") return;
  if (window.localStorage.getItem("pp.voice.muted") === "1") return;
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = synth.getVoices();
  const pick =
    voices.find((v) => /female|samantha|victoria|karen|moira|tessa/i.test(v.name)) ||
    voices.find((v) => v.lang?.startsWith("en"));
  if (pick) u.voice = pick;
  u.pitch = 1.2;
  u.rate = 1.0;
  synth.speak(u);
}

const STORAGE_KEY = "pp.pawn-village.climb";

function RealmPathPage() {
  const { realm } = Route.useLoaderData() as { realm: Realm };
  const [cleared, setCleared] = useState<Record<number, number>>({});
  const [popping, setPopping] = useState<number | null>(null);
  const [victory, setVictory] = useState(false);
  const [lockedMsg, setLockedMsg] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setCleared(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cleared)); } catch { /* ignore */ }
  }, [cleared]);

  const currentId = useMemo(() => {
    for (const l of LEVELS) if (cleared[l.id] === undefined) return l.id;
    return null;
  }, [cleared]);

  const totalStars = useMemo(
    () => Object.values(cleared).reduce((a, b) => a + b, 0),
    [cleared],
  );
  const doneCount = Object.keys(cleared).length;

  // Build full smooth trail through all nodes + prize
  const allPoints = [...NODE_POS, PRIZE_POS];
  const pathD = buildSmoothPath(allPoints);
  // Lit portion: through cleared nodes only (+ prize if all 12 done)
  const litCount = doneCount + (doneCount === 12 ? 1 : 0);
  const litD = litCount >= 2 ? buildSmoothPath(allPoints.slice(0, litCount)) : "";

  function handleTap(level: ClimbLevel) {
    if (cleared[level.id] !== undefined) return;
    if (level.id !== currentId) {
      const line = LOCKED_LINES[Math.floor(Math.random() * LOCKED_LINES.length)];
      setLockedMsg(line);
      speak(line);
      window.setTimeout(() => setLockedMsg(null), 1800);
      return;
    }
    setPopping(level.id);
    const stars = (2 + Math.round(Math.random())) as 2 | 3;
    window.setTimeout(() => {
      setCleared((c) => ({ ...c, [level.id]: stars }));
      setPopping(null);
      if (level.id === 12) {
        setVictory(true);
        speak("WE DID IT! The Pearl Shard is yours!");
      } else {
        const cheer = CHEERS[Math.floor(Math.random() * CHEERS.length)];
        speak(cheer);
      }
    }, 550);
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Full-bleed village background */}
      <img
        src={villageBg}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      {/* Warm overlay + vignette for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,236,189,0.18) 0%, rgba(58,32,12,0.45) 100%), linear-gradient(to bottom, rgba(255,220,160,0.15), rgba(40,20,8,0.35))",
        }}
      />

      {/* Sticky header */}
      <header className="absolute inset-x-0 top-0 z-30 border-b-4 border-shard-sun/70 bg-parchment/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl flex-col gap-1.5 px-4 py-2">
          <div className="flex items-center gap-2">
            <Link
              to="/realm/$realmId"
              params={{ realmId: realm.id }}
              aria-label="Back to realm"
              className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink/30 bg-parchment font-black text-ink"
            >
              ‹
            </Link>
            <div className="flex-1 text-center">
              <h1 className="font-display text-lg font-black leading-none text-ink ink-shadow">
                The Pawn Village
              </h1>
              <p className="mt-0.5 text-[10px] font-bold text-ink/70">
                Race all 12 quests to win the Pearl Shard!
              </p>
            </div>
            <MuteToggle />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <Pill>Quests {doneCount}/12</Pill>
            <Pill>★ {totalStars}</Pill>
            <Pill highlight>☾ Pearl Shard + Apprentice Cape</Pill>
          </div>
        </div>
      </header>

      {/* Single-screen race-track board */}
      <div className="absolute inset-x-0 bottom-0 top-[96px]">
        <div className="relative mx-auto h-full w-full max-w-5xl">
          {/* Trail */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            {/* Faint dashed full trail */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(40,20,8,0.55)"
              strokeLinecap="round"
              strokeDasharray="1.2 2"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: "4px" } as React.CSSProperties}
            />
            {/* Bright gold lit portion */}
            {litD && (
              <path
                d={litD}
                fill="none"
                stroke="oklch(0.85 0.18 85)"
                strokeLinecap="round"
                strokeDasharray="1.2 2"
                vectorEffect="non-scaling-stroke"
                style={{
                  strokeWidth: "6px",
                  filter: "drop-shadow(0 0 6px oklch(0.85 0.18 85 / 0.9))",
                } as React.CSSProperties}
              />
            )}
          </svg>

          {/* START marker */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${NODE_POS[0].x}%`, top: `${NODE_POS[0].y + 9}%` }}
          >
            <div className="flex items-end gap-1">
              <Mariposa size={48} />
              <div className="mb-1 rounded-full border-2 border-ink/30 bg-parchment/95 px-2 py-0.5 font-display text-[10px] font-black uppercase tracking-widest text-ink shadow">
                Start
              </div>
            </div>
          </div>

          {/* FINISH / Grand Prize */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${PRIZE_POS.x}%`, top: `${PRIZE_POS.y}%` }}
          >
            <GrandPrize won={victory || doneCount === 12} />
          </div>

          {/* Level nodes */}
          {LEVELS.map((lvl, i) => {
            const p = NODE_POS[i];
            const stars = cleared[lvl.id];
            const state: "locked" | "current" | "done" =
              stars !== undefined ? "done" : lvl.id === currentId ? "current" : "locked";
            return (
              <div
                key={lvl.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <TrackNode
                  level={lvl}
                  state={state}
                  stars={stars ?? 0}
                  popping={popping === lvl.id}
                  onTap={() => handleTap(lvl)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Locked-tap toast */}
      <AnimatePresence>
        {lockedMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-none absolute inset-x-0 bottom-6 z-40 mx-auto w-fit max-w-[90%] rounded-2xl border-2 border-ink/20 bg-parchment/95 px-4 py-2 text-center text-sm font-bold text-ink shadow-lg"
          >
            🦋 {lockedMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Victory overlay */}
      <AnimatePresence>
        {victory && (
          <motion.div
            className="absolute inset-0 z-50 grid place-items-center bg-ink/70 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-sm rounded-3xl border-4 border-shard-sun bg-parchment p-6 text-center card-pop"
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 0, x: 0, opacity: 0 }}
                  animate={{
                    y: [0, -120 - Math.random() * 80],
                    x: [(Math.random() - 0.5) * 240],
                    opacity: [0, 1, 0],
                    rotate: Math.random() * 360,
                  }}
                  transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() }}
                  className="pointer-events-none absolute left-1/2 top-1/2 inline-block h-2 w-2 rounded-sm"
                  style={{ background: ["#f7c948", "#e8a87c", "#7d9b76", "#6ba3c8"][i % 4] }}
                />
              ))}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-shard-pearl text-5xl shadow-2xl ring-4 ring-shard-sun"
              >
                ☾
              </motion.div>
              <h2 className="mt-4 font-display text-2xl font-black text-ink ink-shadow">WE DID IT!</h2>
              <p className="mt-1 text-sm font-bold text-ink/80">The Pearl Shard is yours, brave hero!</p>
              <div className="mt-5 flex flex-col gap-2">
                <Link
                  to="/realm/$realmId"
                  params={{ realmId: realm.id }}
                  className="rounded-full bg-ink px-5 py-2.5 font-display font-black text-parchment"
                >
                  Back to the realm
                </Link>
                <button
                  type="button"
                  onClick={() => { setCleared({}); setVictory(false); }}
                  className="rounded-full border-2 border-ink/30 px-5 py-1.5 text-xs font-black text-ink"
                >
                  Race again
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------- Helpers ----------------

function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;
  // Catmull-Rom-ish smoothing → cubic Beziers
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

// ---------------- Sub-components ----------------

function Pill({ children, highlight }: { children: React.ReactNode; highlight?: boolean }) {
  return (
    <span
      className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ring-2 ${
        highlight
          ? "bg-shard-sun text-ink ring-ink/20"
          : "bg-parchment text-ink ring-ink/20"
      }`}
    >
      {children}
    </span>
  );
}

function GrandPrize({ won }: { won: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-2xl border-2 border-ink/20 bg-parchment/95 px-2.5 py-0.5 font-display text-[10px] font-black uppercase tracking-widest text-ink shadow">
        🏁 Finish
      </div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className={`mt-1.5 grid h-16 w-16 place-items-center rounded-full bg-shard-pearl text-3xl shadow-2xl ring-4 ${won ? "ring-shard-sun animate-glow" : "ring-parchment/80"}`}
      >
        ☾
      </motion.div>
    </div>
  );
}

function TrackNode({
  level,
  state,
  stars,
  popping,
  onTap,
}: {
  level: ClimbLevel;
  state: "locked" | "current" | "done";
  stars: number;
  popping: boolean;
  onTap: () => void;
}) {
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
      {/* Name tag */}
      <div className="max-w-[8.5rem] rounded-lg border-2 border-ink/25 bg-parchment/95 px-2 py-0.5 text-center shadow-md">
        <div className="font-display text-[10px] font-black leading-tight text-ink whitespace-nowrap">
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
        className={`relative grid h-12 w-12 place-items-center rounded-full ${medallionBg} ${medallionText} shadow-xl ${
          state === "current" ? "animate-glow cursor-pointer" : ""
        } ${state === "locked" ? "opacity-80" : ""}`}
        style={{
          border: "3px solid var(--parchment)",
          boxShadow: `0 0 0 3px ${ring.color}, 0 6px 12px rgba(0,0,0,0.35)`,
        }}
      >
        {state === "locked" && <span className="text-lg">🔒</span>}
        {state === "current" && (
          <span className="text-base font-black">{isBoss ? "♛" : level.id}</span>
        )}
        {state === "done" && <span className="text-lg font-black">✓</span>}

        {/* Number badge */}
        {state !== "current" && (
          <span className="absolute -top-1 -left-1 grid h-4 w-4 place-items-center rounded-full bg-ink text-[9px] font-black text-parchment ring-2 ring-parchment">
            {level.id}
          </span>
        )}

        {/* PLAY tag for current */}
        {state === "current" && (
          <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-parchment shadow-md">
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
