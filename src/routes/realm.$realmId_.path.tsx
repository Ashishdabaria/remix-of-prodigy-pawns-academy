import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRealm, type Realm } from "@/data/realms";
import { Mariposa } from "@/components/Mariposa";
import { MuteToggle } from "@/components/realm/MariposaSay";

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
        { title: r ? `${r.name} — Climb the Quest Path` : "Quest Path" },
        { name: "description", content: "Climb the floating platforms to win the Pearl Shard." },
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
  { id: 1,  name: "Meet the board",        type: "lesson" },
  { id: 2,  name: "Meet the King",          type: "lesson" },
  { id: 3,  name: "The Pawn & Rook",        type: "lesson" },
  { id: 4,  name: "The Bishop & Queen",     type: "lesson" },
  { id: 5,  name: "The Knight's hop",       type: "lesson" },
  { id: 6,  name: "Move-it challenge",      type: "challenge" },
  { id: 7,  name: "Catch the Lost Knight",  type: "miniboss" },
  { id: 8,  name: "Capturing safely",       type: "lesson" },
  { id: 9,  name: "Capture 3 targets",      type: "challenge" },
  { id: 10, name: "Treasure: piece values", type: "treasure" },
  { id: 11, name: "Setting up the board",   type: "lesson" },
  { id: 12, name: "The Board Guardian",     type: "boss" },
];

// zig-zag x positions per level (% of width), bottom → top
const X_POS = [50, 30, 65, 28, 70, 35, 60, 25, 72, 40, 58, 50];

const RING: Record<LevelType, { color: string; label: string; icon: string }> = {
  lesson:    { color: "oklch(0.65 0.17 150)", label: "Lesson",    icon: "✦" },
  challenge: { color: "oklch(0.65 0.16 240)", label: "Challenge", icon: "⚔" },
  miniboss:  { color: "oklch(0.72 0.18 50)",  label: "Mini-boss", icon: "🐴" },
  treasure:  { color: "oklch(0.82 0.17 85)",  label: "Treasure",  icon: "🎁" },
  boss:      { color: "oklch(0.55 0.22 25)",  label: "Boss",      icon: "♛" },
};

const CHEERS = [
  "Yes! You cleared it!",
  "Brilliant climbing, hero!",
  "One more step up!",
  "Star power!",
  "You're flying now!",
  "Onward and upward!",
];
const LOCKED_LINES = [
  "Not yet — climb the glowing step first.",
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

// ---------------- Layout constants ----------------
const ROW = 170;          // vertical px between platforms
const PAD_TOP = 220;      // space above level 12 for grand prize
const PAD_BOTTOM = 180;   // space below level 1 for Mariposa

function RealmPathPage() {
  const { realm } = Route.useLoaderData() as { realm: Realm };
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cleared, setCleared] = useState<Record<number, number>>({});
  const [popping, setPopping] = useState<number | null>(null);
  const [victory, setVictory] = useState(false);
  const [lockedMsg, setLockedMsg] = useState<string | null>(null);

  // Hydrate from localStorage on mount
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

  // Layout: bottom-up
  const height = PAD_TOP + PAD_BOTTOM + (LEVELS.length - 1) * ROW;
  const points = LEVELS.map((l, i) => ({
    x: X_POS[i] ?? 50,
    y: height - PAD_BOTTOM - i * ROW,
  }));
  const prizePoint = { x: 50, y: 90 };

  // Trail path (bottom to top through all level points, ending at prize)
  const allPoints = [...points, prizePoint];
  const pathD = allPoints.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = allPoints[i - 1];
    const cy = (prev.y + p.y) / 2;
    return `${acc} C ${prev.x} ${cy}, ${p.x} ${cy}, ${p.x} ${p.y}`;
  }, "");

  // Start scrolled to the bottom (level 1) on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, []);

  // Scroll the next current node into view when progress changes
  function scrollToLevel(id: number) {
    const el = scrollRef.current;
    if (!el) return;
    const idx = LEVELS.findIndex((l) => l.id === id);
    if (idx < 0) return;
    const targetY = points[idx].y;
    const containerH = el.clientHeight;
    const top = Math.max(0, targetY - containerH / 2);
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }

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
    const stars = (2 + Math.round(Math.random())) as 2 | 3; // 2 or 3
    window.setTimeout(() => {
      setCleared((c) => ({ ...c, [level.id]: stars }));
      setPopping(null);
      if (level.id === 12) {
        setVictory(true);
        speak("WE DID IT! The Pearl Shard is yours!");
      } else {
        const cheer = CHEERS[Math.floor(Math.random() * CHEERS.length)];
        speak(cheer);
        window.setTimeout(() => scrollToLevel(level.id + 1), 350);
      }
    }, 550);
  }

  // dash reveal: portion of trail to highlight bright gold
  // Bright up to (doneCount) nodes done; if all done include prize.
  const litCount = doneCount + (doneCount === 12 ? 1 : 0);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Sky → meadow gradient background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.86 0.08 235) 0%, oklch(0.92 0.06 215) 30%, oklch(0.94 0.08 110) 70%, oklch(0.88 0.13 90) 100%)",
        }}
      />
      {/* Drifting clouds */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Cloud className="animate-drift" style={{ top: "8%", animationDuration: "32s" }} />
        <Cloud className="animate-drift" style={{ top: "22%", animationDuration: "44s", animationDelay: "-12s", transform: "scale(0.7)" }} />
        <Cloud className="animate-drift" style={{ top: "40%", animationDuration: "52s", animationDelay: "-28s", transform: "scale(1.2)" }} />
      </div>

      {/* Sticky header */}
      <header className="absolute inset-x-0 top-0 z-30 border-b-4 border-shard-sun/70 bg-parchment/90 backdrop-blur">
        <div className="mx-auto flex max-w-md flex-col gap-2 px-4 py-3">
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
                Climb all 12 quests to win the Pearl Shard!
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

      {/* Scrollable climb */}
      <div ref={scrollRef} className="absolute inset-0 overflow-y-auto pt-[120px]">
        <div className="relative mx-auto w-full max-w-md" style={{ height }}>
          {/* Trail */}
          <svg
            viewBox={`0 0 100 ${height}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            {/* Faint dashed full trail */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(80,50,20,0.35)"
              strokeWidth="0.8"
              strokeLinecap="round"
              strokeDasharray="2 3"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: "3px" } as React.CSSProperties}
            />
            {/* Bright gold lit portion: build a separate path through cleared nodes only */}
            {litCount > 0 && (
              <LitTrail points={allPoints} count={litCount} />
            )}
          </svg>

          {/* Grand prize platform at top */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${prizePoint.x}%`, top: prizePoint.y }}
          >
            <GrandPrize won={victory || doneCount === 12} />
          </div>

          {/* Levels */}
          {LEVELS.map((lvl, i) => {
            const p = points[i];
            const stars = cleared[lvl.id];
            const state: "locked" | "current" | "done" =
              stars !== undefined ? "done" : lvl.id === currentId ? "current" : "locked";
            return (
              <div
                key={lvl.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: p.y }}
              >
                <PlatformNode
                  level={lvl}
                  state={state}
                  stars={stars ?? 0}
                  popping={popping === lvl.id}
                  onTap={() => handleTap(lvl)}
                />
              </div>
            );
          })}

          {/* Mariposa at base */}
          <div
            className="absolute -translate-x-1/2"
            style={{ left: "78%", top: height - 90 }}
          >
            <Mariposa size={56} />
          </div>
        </div>
      </div>

      {/* Locked-tap toast */}
      <AnimatePresence>
        {lockedMsg && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-none absolute inset-x-0 bottom-10 z-40 mx-auto w-fit max-w-[90%] rounded-2xl border-2 border-ink/20 bg-parchment/95 px-4 py-2 text-center text-sm font-bold text-ink shadow-lg"
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
              {/* Confetti */}
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
                  style={{
                    background: ["#f7c948", "#e8a87c", "#7d9b76", "#6ba3c8"][i % 4],
                  }}
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
                  Climb again
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
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

function Cloud({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg
      className={className}
      style={style}
      width="120"
      height="50"
      viewBox="0 0 120 50"
      aria-hidden
    >
      <g fill="rgba(255,255,255,0.85)">
        <ellipse cx="30" cy="30" rx="22" ry="14" />
        <ellipse cx="58" cy="22" rx="26" ry="16" />
        <ellipse cx="88" cy="30" rx="22" ry="14" />
      </g>
    </svg>
  );
}

function LitTrail({ points, count }: { points: { x: number; y: number }[]; count: number }) {
  const lit = points.slice(0, count);
  if (lit.length < 2) return null;
  const d = lit.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = lit[i - 1];
    const cy = (prev.y + p.y) / 2;
    return `${acc} C ${prev.x} ${cy}, ${p.x} ${cy}, ${p.x} ${p.y}`;
  }, "");
  return (
    <path
      d={d}
      fill="none"
      stroke="oklch(0.82 0.17 85)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeDasharray="2 2.5"
      vectorEffect="non-scaling-stroke"
      style={{
        strokeWidth: "4px",
        filter: "drop-shadow(0 0 4px oklch(0.85 0.18 85 / 0.8))",
      } as React.CSSProperties}
    />
  );
}

function Platform() {
  // grassy floating stepping-stone SVG
  return (
    <svg width="130" height="50" viewBox="0 0 130 50" aria-hidden className="drop-shadow-[0_8px_10px_rgba(0,0,0,0.25)]">
      {/* dirt underside */}
      <ellipse cx="65" cy="32" rx="56" ry="16" fill="oklch(0.42 0.08 60)" />
      <ellipse cx="65" cy="28" rx="58" ry="15" fill="oklch(0.5 0.1 60)" />
      {/* grass top */}
      <ellipse cx="65" cy="22" rx="58" ry="12" fill="oklch(0.7 0.16 145)" />
      <ellipse cx="65" cy="20" rx="58" ry="10" fill="oklch(0.78 0.16 140)" />
      {/* grass blades */}
      <path d="M 18 16 q 3 -6 6 0" stroke="oklch(0.62 0.16 145)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M 100 14 q 3 -6 6 0" stroke="oklch(0.62 0.16 145)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M 60 12 q 3 -7 6 0" stroke="oklch(0.62 0.16 145)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function GrandPrize({ won }: { won: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className="rounded-2xl border-2 border-ink/20 bg-parchment/95 px-3 py-1 font-display text-xs font-black uppercase tracking-widest text-ink shadow">
        Grand Prize
      </div>
      <div className="relative mt-2">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className={`grid h-24 w-24 place-items-center rounded-full bg-shard-pearl text-5xl shadow-2xl ring-4 ${won ? "ring-shard-sun" : "ring-parchment/80"} animate-glow`}
        >
          ☾
        </motion.div>
        <div className="-mt-3 scale-[1.4]">
          <Platform />
        </div>
      </div>
    </div>
  );
}

function PlatformNode({
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
    <div className="flex flex-col items-center gap-1">
      {/* Name tag */}
      <div className="max-w-[11rem] rounded-xl border-2 border-ink/25 bg-parchment/95 px-2.5 py-1 text-center shadow-md">
        <div className="font-display text-[11px] font-black leading-tight text-ink">
          {level.name}
        </div>
        <div className="text-[9px] font-bold uppercase tracking-wider" style={{ color: ring.color }}>
          {ring.icon} {ring.label}
        </div>
      </div>

      {/* Medallion + platform stack */}
      <div className="relative">
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
                ? { y: [0, -6, 0] }
                : { y: 0 }
          }
          transition={
            popping
              ? { duration: 0.5 }
              : state === "current"
                ? { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0 }
          }
          className={`relative z-10 grid h-16 w-16 place-items-center rounded-full border-4 ${medallionBg} ${medallionText} shadow-xl ring-4 ${
            state === "current" ? "animate-glow cursor-pointer" : ""
          } ${state === "locked" ? "opacity-70" : ""}`}
          style={{
            borderColor: "var(--parchment)",
            // @ts-expect-error css var
            "--tw-ring-color": ring.color,
            boxShadow: `0 0 0 4px ${ring.color}`,
          }}
        >
          {state === "locked" && <span className="text-2xl">🔒</span>}
          {state === "current" && (
            <span className="text-2xl">{isBoss ? "♛" : level.id}</span>
          )}
          {state === "done" && <span className="text-2xl font-black">✓</span>}

          {/* Number badge */}
          {state !== "current" && (
            <span className="absolute -top-1.5 -left-1.5 grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] font-black text-parchment ring-2 ring-parchment">
              {level.id}
            </span>
          )}

          {/* PLAY tag for current */}
          {state === "current" && (
            <span className="absolute -right-8 top-1/2 -translate-y-1/2 rounded-full bg-ink px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-parchment shadow-md">
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
                  animate={{ opacity: [0, 1, 0], scale: [0, 1.4, 0], x: Math.cos((deg * Math.PI) / 180) * 36, y: Math.sin((deg * Math.PI) / 180) * 36 }}
                  transition={{ duration: 0.6 }}
                  className="pointer-events-none absolute text-shard-sun"
                >
                  ✦
                </motion.span>
              ))}
            </>
          )}
        </motion.button>

        {/* Platform under medallion */}
        <div className="-mt-3">
          <Platform />
        </div>
      </div>

      {/* Stars */}
      <div className="h-3 text-center" aria-label={state === "done" ? `${stars} of 3 stars` : undefined}>
        {state === "done" && (
          <span className="text-xs leading-none">
            {[1, 2, 3].map((s) => (
              <span key={s} className={s <= stars ? "text-shard-sun" : "text-ink/20"}>★</span>
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
