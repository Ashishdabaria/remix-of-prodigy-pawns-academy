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

interface Critter {
  emoji: string;
  name: string;
  taunt: string;
  cheer: string;
}

interface ClimbLevel {
  id: number;
  name: string;
  type: LevelType;
  blurb: string;
  critter?: Critter;
}

const CRITTERS: Record<string, Critter> = {
  hoppy:    { emoji: "🐇",  name: "Hoppy the Hare",       taunt: "Catch me if you can!",                       cheer: "Hop-tastic! You got me!" },
  acorn:    { emoji: "🐿️", name: "Acorn the Squirrel",   taunt: "These nuts are MINE!",                       cheer: "Okay okay, share the acorns!" },
  bramble:  { emoji: "🦔",  name: "Bramble the Hedgehog", taunt: "Prickly puzzle for you!",                    cheer: "Ouch-less! Well played, hero." },
  knight:   { emoji: "🐴",  name: "The Lost Knight",      taunt: "I forgot my L-moves!",                       cheer: "Phew! Home to the stable I go." },
  guardian: { emoji: "🗿",  name: "The Board Guardian",   taunt: "None pass without 64 squares of wisdom.",    cheer: "The path is yours, Apprentice." },
};

const LEVELS: ClimbLevel[] = [
  { id: 1,  name: "Meet the board",    type: "lesson",    blurb: "Light & dark squares, ranks & files." },
  { id: 2,  name: "Meet the King",     type: "lesson",    blurb: "One royal step in any direction." },
  { id: 3,  name: "Pawn & Rook",       type: "lesson",    blurb: "Tiny pawn, mighty rook lines.", critter: CRITTERS.hoppy },
  { id: 4,  name: "Bishop & Queen",    type: "lesson",    blurb: "Diagonals and the all-powerful queen." },
  { id: 5,  name: "Knight's hop",      type: "lesson",    blurb: "The L-shaped leap over pieces." },
  { id: 6,  name: "Move-it challenge", type: "challenge", blurb: "Mix all the pieces in tiny puzzles.", critter: CRITTERS.acorn },
  { id: 7,  name: "Lost Knight",       type: "miniboss",  blurb: "Help the knight find its way home.",  critter: CRITTERS.knight },
  { id: 8,  name: "Capture safely",    type: "lesson",    blurb: "Take pieces without losing yours." },
  { id: 9,  name: "Capture 3 targets", type: "challenge", blurb: "A captures-only puzzle sprint.",      critter: CRITTERS.bramble },
  { id: 10, name: "Piece values",      type: "treasure",  blurb: "Pawn 1 · Knight & Bishop 3 · Rook 5 · Queen 9." },
  { id: 11, name: "Set up the board",  type: "lesson",    blurb: "Every piece on its proper starting square." },
  { id: 12, name: "Board Guardian",    type: "boss",      blurb: "The final test of the Pawn Village.", critter: CRITTERS.guardian },
];

type StageKind = "video" | "puzzle" | "challenge" | "critter";
interface Stage { kind: StageKind; title: string; desc: string; icon: string; }

function stagesFor(level: ClimbLevel): Stage[] {
  const s: Stage[] = [
    { kind: "video",     title: "Watch the tutorial",  desc: "A short story-video from Mariposa.", icon: "▶︎" },
    { kind: "puzzle",    title: "Practice puzzle",     desc: "A gentle warm-up puzzle.",            icon: "🧩" },
    { kind: "challenge", title: "Quest challenge",     desc: "A trickier mini-quest.",              icon: "⚔️" },
  ];
  if (level.critter) {
    s.push({
      kind: "critter",
      title: `Friendly duel: ${level.critter.name}`,
      desc: level.critter.taunt,
      icon: level.critter.emoji,
    });
  }
  return s;
}

// Serpentine race-track positions (% of width / % of height inside path area).
// Spaced so 12 nodes + START/FINISH fit on phone widths without overlapping.
const NODE_POS: { x: number; y: number }[] = [
  { x: 12, y: 92 }, // 1 START (bottom-left)
  { x: 36, y: 88 },
  { x: 62, y: 84 },
  { x: 86, y: 76 }, // curve at right
  { x: 88, y: 64 },
  { x: 66, y: 60 },
  { x: 40, y: 56 },
  { x: 14, y: 50 }, // curve at left
  { x: 16, y: 38 },
  { x: 40, y: 34 },
  { x: 66, y: 28 },
  { x: 50, y: 14 }, // 12 boss (center-top)
];
const PRIZE_POS = { x: 86, y: 10 };

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

// ---------------- Click sound (WebAudio, no asset needed) ----------------

let _audioCtx: AudioContext | null = null;
function getAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (window.localStorage.getItem("pp.voice.muted") === "1") return null;
  try {
    if (!_audioCtx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      _audioCtx = new Ctor();
    }
    if (_audioCtx.state === "suspended") void _audioCtx.resume();
    return _audioCtx;
  } catch { return null; }
}
type ClickKind = "tap" | "success" | "unlock" | "soft";
function playClick(kind: ClickKind = "tap") {
  const ctx = getAudio();
  if (!ctx) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain).connect(ctx.destination);
  let freq = 660, peak = 0.12, dur = 0.08, type: OscillatorType = "triangle";
  if (kind === "success") { freq = 880; peak = 0.16; dur = 0.22; type = "sine"; }
  if (kind === "unlock")  { freq = 520; peak = 0.18; dur = 0.35; type = "sine"; }
  if (kind === "soft")    { freq = 420; peak = 0.07; dur = 0.06; type = "sine"; }
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (kind === "success") osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + dur);
  if (kind === "unlock")  osc.frequency.exponentialRampToValueAtTime(freq * 2, now + dur);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.start(now);
  osc.stop(now + dur + 0.02);
}

const STORAGE_KEY = "pp.pawn-village.climb";

function RealmPathPage() {
  const { realm } = Route.useLoaderData() as { realm: Realm };
  const [cleared, setCleared] = useState<Record<number, number>>({});
  const [popping, setPopping] = useState<number | null>(null);
  const [victory, setVictory] = useState(false);
  const [lockedMsg, setLockedMsg] = useState<string | null>(null);
  const [openLevelId, setOpenLevelId] = useState<number | null>(null);
  const [flight, setFlight] = useState<{ from: { x: number; y: number }; to: { x: number; y: number }; key: number } | null>(null);

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
    if (cleared[level.id] !== undefined) { playClick("soft"); return; }
    if (level.id !== currentId) {
      playClick("soft");
      const line = LOCKED_LINES[Math.floor(Math.random() * LOCKED_LINES.length)];
      setLockedMsg(line);
      speak(line);
      window.setTimeout(() => setLockedMsg(null), 1800);
      return;
    }
    playClick("tap");
    setOpenLevelId(level.id);
    speak("Tap each step — start with the tutorial video!");
  }

  function completeLevel(level: ClimbLevel) {
    playClick("unlock");
    setOpenLevelId(null);
    setPopping(level.id);
    const stars = (2 + Math.round(Math.random())) as 2 | 3;
    window.setTimeout(() => {
      setCleared((c) => ({ ...c, [level.id]: stars }));
      setPopping(null);
      // Launch a flying Mariposa from this node to the next node (or to the prize).
      const idx = LEVELS.findIndex((l) => l.id === level.id);
      const from = NODE_POS[idx];
      const to = idx + 1 < NODE_POS.length ? NODE_POS[idx + 1] : PRIZE_POS;
      setFlight({ from, to, key: Date.now() });
      window.setTimeout(() => setFlight(null), 1400);
      if (level.id === 12) {
        setVictory(true);
        speak("WE DID IT! The Pearl Shard is yours!");
      } else {
        const cheer = CHEERS[Math.floor(Math.random() * CHEERS.length)];
        speak(cheer);
      }
    }, 550);
  }

  const openLevel = openLevelId != null ? LEVELS.find((l) => l.id === openLevelId) ?? null : null;

  return (
    <div className="fixed inset-0 z-40 h-[100dvh] w-screen overflow-hidden">
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

          {/* Flying Mariposa: from cleared node → next current node */}
          <AnimatePresence>
            {flight && (
              <motion.div
                key={flight.key}
                className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
                initial={{ left: `${flight.from.x}%`, top: `${flight.from.y}%`, scale: 0.8, opacity: 0 }}
                animate={{
                  left: [`${flight.from.x}%`, `${(flight.from.x + flight.to.x) / 2}%`, `${flight.to.x}%`],
                  top:  [`${flight.from.y}%`, `${Math.min(flight.from.y, flight.to.y) - 6}%`, `${flight.to.y}%`],
                  scale: [0.8, 1.15, 1],
                  opacity: [0, 1, 0.9],
                  rotate: [-8, 6, 0],
                }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 1.2, ease: "easeInOut", times: [0, 0.5, 1] }}
              >
                <div className="relative">
                  <Mariposa size={44} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>


      {/* Stage modal */}
      <AnimatePresence>
        {openLevel && (
          <StageModal
            key={openLevel.id}
            level={openLevel}
            onClose={() => setOpenLevelId(null)}
            onComplete={() => completeLevel(openLevel)}
            speak={speak}
          />
        )}
      </AnimatePresence>

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
      <div
        className="rounded-2xl border-2 border-ink/20 bg-parchment/95 font-display font-black uppercase tracking-widest text-ink shadow"
        style={{ padding: "0.1rem 0.5rem", fontSize: "clamp(8px, 1.6vw, 11px)" }}
      >
        🏁 Finish
      </div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className={`mt-1.5 grid place-items-center rounded-full bg-shard-pearl shadow-2xl ring-4 ${won ? "ring-shard-sun animate-glow" : "ring-parchment/80"}`}
        style={{
          width: "clamp(2.75rem, 9vw, 4rem)",
          height: "clamp(2.75rem, 9vw, 4rem)",
          fontSize: "clamp(1.25rem, 4vw, 1.875rem)",
        }}
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

// ---------------- Stage modal: video → puzzle → challenge → (critter) ----------------

function StageModal({
  level,
  onClose,
  onComplete,
  speak,
}: {
  level: ClimbLevel;
  onClose: () => void;
  onComplete: () => void;
  speak: (t: string) => void;
}) {
  const stages = useMemo(() => stagesFor(level), [level]);
  const [done, setDone] = useState<boolean[]>(() => stages.map(() => false));
  const [active, setActive] = useState(0);
  const ring = RING[level.type];
  const allDone = done.every(Boolean);

  // A stage unlocks only after every earlier stage is complete.
  const unlockedUpTo = done.findIndex((d) => !d);
  function isUnlocked(i: number) {
    if (i === 0) return true;
    return done.slice(0, i).every(Boolean);
  }

  function finishStage(i: number) {
    if (!isUnlocked(i) || done[i]) return;
    playClick("success");
    setDone((d) => {
      const next = [...d];
      next[i] = true;
      return next;
    });
    const stage = stages[i];
    if (stage.kind === "video")     speak("Great watching! Now try the puzzle.");
    if (stage.kind === "puzzle")    speak("Nice solve! Challenge unlocked!");
    if (stage.kind === "challenge") speak("Challenge cleared, hero!");
    if (stage.kind === "critter" && level.critter) speak(level.critter.cheer);
    setActive(Math.min(stages.length - 1, i + 1));
  }


  const activeStage = stages[active];

  return (
    <motion.div
      className="absolute inset-0 z-50 grid place-items-center bg-ink/70 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      onClick={() => { playClick("soft"); onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md overflow-hidden rounded-3xl border-4 bg-parchment text-ink shadow-2xl"
        style={{ borderColor: ring.color }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ background: ring.color }}
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-parchment text-base font-black ring-2 ring-ink/20">
            {level.id}
          </span>
          <div className="flex-1 leading-tight">
            <div className="font-display text-base font-black text-parchment ink-shadow">
              {level.name}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-parchment/85">
              {ring.label} · {level.blurb}
            </div>
          </div>
          <button
            type="button"
            onClick={() => { playClick("soft"); onClose(); }}
            aria-label="Close"
            className="grid h-8 w-8 place-items-center rounded-full bg-parchment/90 font-black text-ink"
          >
            ×
          </button>
        </div>

        {/* Stage stepper */}
        <ol className="flex items-center gap-1 border-b-2 border-ink/10 bg-parchment/80 px-3 py-2">
          {stages.map((s, i) => {
            const isDone = done[i];
            const isActive = i === active;
            return (
              <li key={i} className="flex flex-1 items-center gap-1">
                <button
                  type="button"
                  onClick={() => { if (isUnlocked(i)) { playClick("soft"); setActive(i); } else { playClick("soft"); } }}
                  disabled={!isUnlocked(i)}
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ring-2 transition-colors ${
                    isDone
                      ? "bg-shard-emerald text-ink ring-ink/20"
                      : isActive
                        ? "bg-shard-sun text-ink ring-ink/30"
                        : isUnlocked(i)
                          ? "bg-muted text-ink/60 ring-ink/10"
                          : "bg-muted/60 text-ink/30 ring-ink/10 cursor-not-allowed"
                  }`}
                  aria-label={`Stage ${i + 1}: ${s.title}${isDone ? " (done)" : isUnlocked(i) ? "" : " (locked)"}`}
                >
                  {isDone ? "✓" : isUnlocked(i) ? s.icon : "🔒"}
                </button>
                {i < stages.length - 1 && (
                  <span
                    className={`h-0.5 flex-1 rounded-full ${
                      done[i] ? "bg-shard-emerald" : "bg-ink/15"
                    }`}
                  />
                )}
              </li>
            );
          })}
        </ol>

        {/* Active stage body */}
        <div className="px-4 pb-3 pt-3">
          <div className="text-[10px] font-black uppercase tracking-widest text-ink/60">
            Step {active + 1} of {stages.length}
          </div>
          <h3 className="font-display text-lg font-black leading-tight">
            <span className="mr-1.5">{activeStage.icon}</span>
            {activeStage.title}
          </h3>
          <p className="mt-1 text-sm text-ink/80">{activeStage.desc}</p>

          <div className="mt-3">
            <StageBody stage={activeStage} level={level} />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {!done[active] ? (
              <button
                type="button"
                onClick={() => finishStage(active)}
                disabled={!isUnlocked(active)}
                className={`rounded-full px-5 py-2.5 font-display text-sm font-black shadow-md transition-transform ${
                  isUnlocked(active)
                    ? "bg-ink text-parchment hover:scale-[1.02]"
                    : "bg-muted text-ink/40 cursor-not-allowed"
                }`}
              >
                {!isUnlocked(active)
                  ? `🔒 Finish step ${unlockedUpTo + 1} first`
                  : activeStage.kind === "video"
                    ? "I watched it ▶︎"
                    : activeStage.kind === "puzzle"
                      ? "I solved it 🧩"
                      : activeStage.kind === "challenge"
                        ? "Challenge done ⚔️"
                        : `Defeat ${level.critter?.name ?? "the critter"} ${activeStage.icon}`}
              </button>
            ) : (
              <div className="rounded-full bg-shard-emerald/30 px-4 py-1.5 text-center text-xs font-black uppercase tracking-widest text-ink">
                ✓ Step complete
              </div>
            )}
            <button
              type="button"
              disabled={!allDone}
              onClick={() => { playClick("unlock"); onComplete(); }}
              className={`rounded-full px-5 py-2.5 font-display text-sm font-black shadow-md transition ${
                allDone
                  ? "bg-shard-sun text-ink ring-2 ring-ink/20 hover:scale-[1.02]"
                  : "bg-muted text-ink/40"
              }`}
            >
              {allDone ? "Clear this quest ★" : `Finish all ${stages.length} steps to clear`}
            </button>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}

function StageBody({ stage, level }: { stage: Stage; level: ClimbLevel }) {
  if (stage.kind === "video") {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-ink/20 bg-ink">
        {/* Storybook video placeholder — swap src with a real tutorial when ready. */}
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-indigo-900 via-ink to-amber-900 text-parchment">
          <div className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-shard-sun text-2xl text-ink shadow-xl">
              ▶︎
            </div>
            <div className="mt-2 font-display text-sm font-black">Tutorial video</div>
            <div className="text-[10px] uppercase tracking-widest opacity-80">
              Coming soon — Mariposa explains {level.name}
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (stage.kind === "puzzle" || stage.kind === "challenge") {
    return (
      <div className="rounded-xl border-2 border-ink/15 bg-parchment p-3">
        <div className="grid grid-cols-8 overflow-hidden rounded-md ring-2 ring-ink/30">
          {Array.from({ length: 64 }).map((_, i) => {
            const r = Math.floor(i / 8);
            const c = i % 8;
            const dark = (r + c) % 2 === 1;
            return (
              <div
                key={i}
                className={`aspect-square ${dark ? "bg-amber-900/70" : "bg-amber-100"}`}
              />
            );
          })}
        </div>
        <p className="mt-2 text-[11px] font-bold text-ink/60">
          {stage.kind === "puzzle"
            ? "Practice board — tap “I solved it” when you're ready."
            : "Challenge board — give it your best shot!"}
        </p>
      </div>
    );
  }
  // critter
  const c = level.critter!;
  return (
    <div className="rounded-xl border-2 border-ink/15 bg-gradient-to-br from-amber-50 to-amber-100 p-4 text-center">
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-5xl"
      >
        {c.emoji}
      </motion.div>
      <div className="mt-2 font-display text-base font-black">{c.name}</div>
      <div className="mt-1 rounded-2xl border-2 border-ink/15 bg-parchment px-3 py-1.5 text-xs italic text-ink/80">
        “{c.taunt}”
      </div>
      <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-ink/60">
        Friendly duel — nobody gets hurt!
      </p>
    </div>
  );
}
