import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getRealm, type Realm } from "@/data/realms";
import { Mariposa } from "@/components/Mariposa";
import { MuteToggle } from "@/components/realm/MariposaSay";
import { playClick } from "@/lib/sound";
import { CatchTheStar } from "@/components/realm/CatchTheStar";
import { PawnPromotionRun } from "@/components/realm/PawnPromotionRun";
import { FarmBoard } from "@/components/realm/FarmBoard";
import { QuestBoard } from "@/components/realm/QuestBoard";
import { MODULE2_TASKS } from "@/data/realm2/tasks";
import { MODULE3_TASKS } from "@/data/realm3/tasks";
import { MODULE4_TASKS } from "@/data/realm4/tasks";
import { MODULE5_TASKS } from "@/data/realm5/tasks";
import {
  MODULES_BY_ID,
  defaultModuleForRealm,
  modulesInRealm,
  type ClimbLevel,
  type LevelType,
  type ModuleConfig,
  type TrackVariant,
} from "@/data/modules";


export const Route = createFileRoute("/realm/$realmId_/path")({
  validateSearch: (search: Record<string, unknown>) => {
    const m = typeof search.module === "string" ? search.module : undefined;
    return { module: m };
  },
  loader: ({ params, location }) => {
    const rawSearch = location.search as Record<string, unknown>;
    const requestedModule = typeof rawSearch.module === "string" ? rawSearch.module : undefined;
    const fallbackRealmId = requestedModule ? MODULES_BY_ID[requestedModule]?.realmId : undefined;
    const realm = getRealm(params.realmId) ?? (fallbackRealmId ? getRealm(fallbackRealmId) : undefined);
    if (!realm) throw notFound();
    return { realm };
  },
  head: ({ loaderData }) => {
    const r = loaderData?.realm;
    return {
      meta: [
        { title: r ? `${r.name} — Quest Path` : "Quest Path" },
        { name: "description", content: "Race the magical path to win the Shard." },
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

// ---------------- Stage stepper data ----------------

type StageKind = "video" | "puzzle" | "challenge" | "critter";
interface Stage { kind: StageKind; title: string; desc: string; icon: string; }

function stagesFor(level: ClimbLevel, moduleId?: string): Stage[] {
  const themes: Record<string, { lesson: Stage; puzzle: Stage; challenge: Stage }> = {
    "farmer-and-piggies": {
      lesson:    { kind: "video",     title: "Farm tutorial",     desc: "A quick board demo — try the move yourself!", icon: "🌾" },
      puzzle:    { kind: "puzzle",    title: "Practice patch",    desc: "Solve a friendly farm puzzle.",                icon: "🧩" },
      challenge: { kind: "challenge", title: "Quest challenge",   desc: "A trickier patch — show off your skill!",      icon: "⚔️" },
    },
    "check-checkmate-stalemate": {
      lesson:    { kind: "video",     title: "Cavern tutorial",   desc: "Mariposa lights the crystal — try the move!", icon: "💎" },
      puzzle:    { kind: "puzzle",    title: "Crystal puzzle",    desc: "Solve the glowing mini-quest.",                icon: "🔮" },
      challenge: { kind: "challenge", title: "Echo challenge",    desc: "A trickier shadow puzzle.",                    icon: "🌀" },
    },
    "basic-checkmates": {
      lesson:    { kind: "video",     title: "Forge tutorial",    desc: "Hammer out the technique — try it yourself!", icon: "🔥" },
      puzzle:    { kind: "puzzle",    title: "Forge drill",       desc: "Stamp the mate cleanly.",                      icon: "🔨" },
      challenge: { kind: "challenge", title: "Anvil challenge",   desc: "A tougher swing — land the mate!",             icon: "⚒️" },
    },
    "opening-principles": {
      lesson:    { kind: "video",     title: "Sky tutorial",      desc: "Pick the cloud-soaring move!",                 icon: "☁️" },
      puzzle:    { kind: "puzzle",    title: "Wind puzzle",       desc: "Find the breezy best move.",                   icon: "🌬️" },
      challenge: { kind: "challenge", title: "Sky challenge",     desc: "A trickier flight — show your wings!",         icon: "🦅" },
    },
  };
  const t = (moduleId && themes[moduleId]) || {
    lesson:    { kind: "video",     title: "Watch the tutorial", desc: "A short story-video from Mariposa.", icon: "▶︎" } as Stage,
    puzzle:    { kind: "puzzle",    title: "Practice puzzle",    desc: "A gentle warm-up puzzle.",            icon: "🧩" } as Stage,
    challenge: { kind: "challenge", title: "Quest challenge",    desc: "A trickier mini-quest.",              icon: "⚔️" } as Stage,
  };
  const s: Stage[] = [t.lesson, t.puzzle, t.challenge];
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

// Click sound helper now lives in @/lib/sound (playClick).

// Per-module storage key — progress is scoped to (realm, module).
function storageKey(moduleId: string) {
  return `pp.module.${moduleId}.climb`;
}

// Track stroke styling per environment.
const TRACK_STYLE: Record<TrackVariant, { dim: string; lit: string; glow: string; dash: string; litWidth: string; dimWidth: string; halo: string }> = {
  meadow:    { dim: "rgba(255,236,170,0.95)", halo: "rgba(40,20,8,0.85)",   lit: "oklch(0.85 0.18 85)",  glow: "oklch(0.85 0.18 85 / 0.9)",  dash: "2.4 2",   litWidth: "8px",   dimWidth: "7px" },
  farmlands: { dim: "rgba(255,220,160,0.95)", halo: "rgba(60,30,8,0.85)",   lit: "oklch(0.72 0.16 65)",  glow: "oklch(0.72 0.16 65 / 0.9)",  dash: "3 1.8",   litWidth: "9px",   dimWidth: "8px" },
  caverns:   { dim: "rgba(200,230,255,0.95)", halo: "rgba(10,20,50,0.85)",  lit: "oklch(0.85 0.16 230)", glow: "oklch(0.85 0.16 230 / 0.95)", dash: "1.4 2",   litWidth: "7px",   dimWidth: "6px" },
  forge:     { dim: "rgba(255,200,160,0.95)", halo: "rgba(40,10,5,0.9)",    lit: "oklch(0.78 0.20 45)",  glow: "oklch(0.78 0.20 45 / 0.95)",  dash: "2.4 1.8", litWidth: "9px",   dimWidth: "8px" },
  sky:       { dim: "rgba(255,255,255,0.98)", halo: "rgba(80,50,120,0.85)", lit: "oklch(0.88 0.14 320)", glow: "oklch(0.88 0.14 320 / 0.95)", dash: "1.6 1.8", litWidth: "7.5px", dimWidth: "6.5px" },
};

function RealmPathPage() {
  const { realm } = Route.useLoaderData() as { realm: Realm };
  const search = Route.useSearch();
  const mod: ModuleConfig =
    (search.module && MODULES_BY_ID[search.module]) || defaultModuleForRealm(realm.id);
  const realmMods = modulesInRealm(realm.id);

  const LEVELS = mod.levels;
  const TOTAL = LEVELS.length;
  const STORAGE_KEY = storageKey(mod.id);
  const trackStyle = TRACK_STYLE[mod.track];

  const [cleared, setCleared] = useState<Record<number, number>>({});
  const [popping, setPopping] = useState<number | null>(null);
  const [victory, setVictory] = useState(false);
  const [lockedMsg, setLockedMsg] = useState<string | null>(null);
  const [openLevelId, setOpenLevelId] = useState<number | null>(null);
  const [flight, setFlight] = useState<{ from: { x: number; y: number }; to: { x: number; y: number }; key: number } | null>(null);

  // Reset state when the module changes (user switched within the realm).
  useEffect(() => {
    setCleared({});
    setVictory(false);
    setOpenLevelId(null);
    setPopping(null);
    setFlight(null);
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setCleared(JSON.parse(raw));
    } catch { /* ignore */ }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mod.id]);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cleared)); } catch { /* ignore */ }
  }, [cleared, STORAGE_KEY]);

  const currentId = useMemo(() => {
    for (const l of LEVELS) if (cleared[l.id] === undefined) return l.id;
    return null;
  }, [cleared, LEVELS]);

  const totalStars = useMemo(
    () => Object.values(cleared).reduce((a, b) => a + b, 0),
    [cleared],
  );
  const doneCount = Object.keys(cleared).length;

  // Build a full, continuous trail through every level node, then the prize.
  const nodePositions = NODE_POS.slice(0, TOTAL);
  const allPoints = [...nodePositions, PRIZE_POS];
  const pathD = buildSmoothPath(allPoints);
  const litCount = doneCount + (doneCount === TOTAL ? 1 : 0);
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
      const idx = LEVELS.findIndex((l) => l.id === level.id);
      const from = nodePositions[idx] ?? nodePositions[0];
      const to = idx + 1 < nodePositions.length ? nodePositions[idx + 1] : PRIZE_POS;
      setFlight({ from, to, key: Date.now() });
      window.setTimeout(() => setFlight(null), 1400);
      if (level.id === TOTAL) {
        setVictory(true);
        speak(`WE DID IT! The ${mod.finishLabel} is yours!`);
      } else {
        const cheer = CHEERS[Math.floor(Math.random() * CHEERS.length)];
        speak(cheer);
      }
    }, 550);
  }

  const openLevel = openLevelId != null ? LEVELS.find((l) => l.id === openLevelId) ?? null : null;

  return (
    <div className="fixed inset-0 z-40 h-[100dvh] w-screen overflow-hidden">
      {/* Full-bleed themed background */}
      <img
        key={mod.id}
        src={mod.background}
        alt=""
        aria-hidden
        className="absolute inset-0 -z-20 h-full w-full object-cover animate-fade-in"
      />
      {/* Themed overlay + vignette for legibility */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: mod.overlay }}
      />

      {/* Sticky frosted header */}
      <header className={`absolute inset-x-0 top-0 z-30 border-b-4 ${mod.accentClass} bg-parchment/85 backdrop-blur-md`}>
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
                {mod.title}
              </h1>
              <p className="mt-0.5 text-[10px] font-bold text-ink/70">
                {mod.subtitle}
              </p>
            </div>
            <MuteToggle />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5">
            <Pill>Quests {doneCount}/{TOTAL}</Pill>
            <Pill>★ {totalStars}</Pill>
            <Pill highlight>{mod.finishIcon} {mod.finishLabel}</Pill>
          </div>
          {/* Module switcher — only show when realm has more than one module */}
          {realmMods.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-1 pt-1">
              <span className="text-[9px] font-black uppercase tracking-widest text-ink/50">Module:</span>
              {realmMods.map((m, i) => {
                const active = m.id === mod.id;
                return (
                  <Link
                    key={m.id}
                    to="/realm/$realmId_/path"
                    params={{ realmId: realm.id }}
                    search={{ module: m.id }}
                    className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-wider ring-2 transition-colors ${
                      active
                        ? "bg-ink text-parchment ring-ink/30"
                        : "bg-parchment/80 text-ink/70 ring-ink/15 hover:bg-parchment"
                    }`}
                  >
                    {i + 1}. {m.title.replace(/^The /, "")}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </header>


      {/* Single-screen race-track board */}
      <div className="absolute inset-x-0 bottom-0 top-[96px]">
        <div className="relative mx-auto h-full w-full max-w-5xl">
          {/* Trail */}
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-visible"
            aria-hidden
          >
            {/* Dark halo for contrast on any background */}
            <path
              d={pathD}
              fill="none"
              stroke={trackStyle.halo}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: "10px", opacity: 0.55 } as React.CSSProperties}
            />
            {/* Bright dashed full trail */}
            <path
              d={pathD}
              fill="none"
              stroke={trackStyle.dim}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: "5px", filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.28))" } as React.CSSProperties}
            />
            {/* Sparkle dashes on top so the route reads as one connected trail */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(255,255,245,0.95)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={trackStyle.dash}
              vectorEffect="non-scaling-stroke"
              style={{ strokeWidth: trackStyle.dimWidth } as React.CSSProperties}
            />

            {/* Bright themed lit portion */}
            {litD && (
              <path
                d={litD}
                fill="none"
                stroke={trackStyle.lit}
                strokeLinecap="round"
                strokeDasharray={trackStyle.dash}
                vectorEffect="non-scaling-stroke"
                style={{
                  strokeWidth: trackStyle.litWidth,
                  filter: `drop-shadow(0 0 6px ${trackStyle.glow})`,
                } as React.CSSProperties}
              >
                {mod.track === "caverns" || mod.track === "sky" ? (
                  <animate
                    attributeName="stroke-dashoffset"
                    from="0"
                    to="-8"
                    dur="1.6s"
                    repeatCount="indefinite"
                  />
                ) : null}
              </path>
            )}
          </svg>

          {/* START marker */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${nodePositions[0].x}%`, top: `${nodePositions[0].y + 9}%` }}
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
            <GrandPrize won={victory || doneCount === TOTAL} icon={mod.finishIcon} />
          </div>


          {/* Level nodes */}
          {LEVELS.map((lvl, i) => {
            const p = nodePositions[i];
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
            moduleId={mod.id}
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
                {mod.finishIcon}
              </motion.div>
              <h2 className="mt-4 font-display text-2xl font-black text-ink ink-shadow">WE DID IT!</h2>
              <p className="mt-1 text-sm font-bold text-ink/80">The {mod.finishLabel} is yours, brave hero!</p>

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

function GrandPrize({ won, icon }: { won: boolean; icon: string }) {
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
        {icon}
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
  moduleId,
  onClose,
  onComplete,
  speak,
}: {
  level: ClimbLevel;
  moduleId: string;
  onClose: () => void;
  onComplete: () => void;
  speak: (t: string) => void;
}) {
  const stages = useMemo(() => stagesFor(level, moduleId), [level, moduleId]);
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
        {/* Header — uses per-sub-quest sceneTint for a unique look on every node */}
        <div
          className="relative flex items-center gap-2 px-4 py-2.5"
          style={{ background: level.sceneTint ?? ring.color }}
        >
          {/* Decorative scene icon, large + faded, floats behind the header text */}
          {level.sceneIcon && (
            <span
              aria-hidden
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 select-none text-5xl opacity-30 drop-shadow"
            >
              {level.sceneIcon}
            </span>
          )}
          <span className="relative z-10 grid h-8 w-8 place-items-center rounded-full bg-parchment text-base font-black ring-2 ring-ink/20">
            {level.id}
          </span>
          <div className="relative z-10 flex-1 leading-tight">
            <div className="font-display text-base font-black text-ink drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">
              {level.name}
            </div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink/80">
              {ring.label} · {level.blurb}
            </div>
          </div>
          <button
            type="button"
            onClick={() => { playClick("soft"); onClose(); }}
            aria-label="Close"
            className="relative z-10 grid h-8 w-8 place-items-center rounded-full bg-parchment/90 font-black text-ink"
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
            <StageBody
              stage={activeStage}
              level={level}
              moduleId={moduleId}
              onAutoComplete={() => finishStage(active)}
            />
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

function StageBody({
  stage,
  level,
  moduleId,
  onAutoComplete,
}: {
  stage: Stage;
  level: ClimbLevel;
  moduleId: string;
  onAutoComplete: () => void;
}) {
  const isFarm = moduleId === "farmer-and-piggies";
  const farmTasks = isFarm ? MODULE2_TASKS[level.id] : undefined;

  if (stage.kind === "video") {
    // Farm tutorial — play the lesson board inline so the kid does the move.
    if (farmTasks?.lesson) {
      return (
        <FarmBoard
          task={farmTasks.lesson}
          onSolve={onAutoComplete}
          onMiss={() => { /* gentle — handled inside FarmBoard */ }}
        />
      );
    }
    return (
      <div
        className="relative aspect-video w-full overflow-hidden rounded-xl border-2 border-ink/20"
        style={{ background: level.sceneTint ?? "linear-gradient(135deg, #312e81 0%, #92400e 100%)" }}
      >
        {/* Themed scene icon as decorative backdrop */}
        {level.sceneIcon && (
          <span
            aria-hidden
            className="pointer-events-none absolute right-3 bottom-2 select-none text-7xl opacity-30 drop-shadow"
          >
            {level.sceneIcon}
          </span>
        )}
        <div className="absolute inset-0 grid place-items-center text-ink">
          <div className="text-center">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-parchment/95 text-2xl text-ink shadow-xl ring-2 ring-ink/20">
              ▶︎
            </div>
            <div className="mt-2 font-display text-sm font-black drop-shadow-[0_1px_0_rgba(255,255,255,0.6)]">Tutorial video</div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-ink/75">
              Mariposa explains {level.name}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (stage.kind === "puzzle" || stage.kind === "challenge") {
    // Module 1: render the real mini-game on the challenge stage.
    if (stage.kind === "challenge" && level.promotionRun) {
      return <PawnPromotionRun onSolved={onAutoComplete} />;
    }
    if (stage.kind === "challenge" && level.starPiece) {
      return <CatchTheStar piece={level.starPiece} />;
    }
    // Module 2: real interactive farm board for puzzle + challenge.
    if (farmTasks) {
      const task = stage.kind === "puzzle" ? farmTasks.puzzle : farmTasks.challenge;
      return (
        <FarmBoard
          task={task}
          onSolve={onAutoComplete}
          onMiss={() => { /* gentle */ }}
        />
      );
    }
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
