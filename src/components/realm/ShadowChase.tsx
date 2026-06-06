import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import mariposaImg from "@/assets/mariposa.png";
import shadowImg from "@/assets/shadow-moth.png";
import { addGold, addXP } from "@/data/student";
import { MariposaSay } from "./MariposaSay";

/**
 * Reward mini-game: "Mariposa vs. Smudge, the Giggle Thief."
 *
 * Mariposa follows the pointer. Tapping a Smudge launches a sparkle bolt
 * from Mariposa toward it; on impact, the Smudge pops. After freeing the
 * required giggles, a Final Riddle (simple math) decides the bonus.
 */

interface ShadowChaseProps {
  onClose: () => void;
}

interface Shadow {
  id: number;
  x: number; // percent 0..100
  y: number; // percent 0..100
  vy: number;
  vx: number;
  size: number;
  popping?: boolean;
  targeted?: boolean;
}

interface Bolt {
  id: number;
  x: number; // current %
  y: number;
  tx: number; // target %
  ty: number;
  targetId: number;
  born: number; // performance.now()
  ttl: number; // ms
}

const WIN_SCORE = 8;
const START_HEARTS = 3;
const GAME_SECONDS = 50;
const SPAWN_MS = 1100;
const FALL_MIN = 9;
const FALL_RANGE = 7;
const BOLT_MS = 260;

const INTRO: { who: "smudge" | "mariposa"; line: string }[] = [
  { who: "smudge", line: "Hehe! I'm Smudge — the giggliest little shadow in all the realms!" },
  { who: "mariposa", line: "Smudge! You've been hiding the Pawn Village's giggles, haven't you?" },
  { who: "smudge", line: "Maaaybe. I bonk into things and the giggles fall out! Catch me if you can, butterfly!" },
  { who: "mariposa", line: "Ready, hero? Tap a Smudge and I'll zap it with sparkle bolts!" },
];

const TUTORIAL: { icon: string; title: string; body: string }[] = [
  { icon: "👆", title: "Move Mariposa", body: "Drag your finger (or move your mouse) anywhere inside the night sky. Mariposa flies wherever you point." },
  { icon: "✨", title: "Tap to fire", body: "Tap a Smudge and Mariposa fires a sparkle bolt at it! Free 8 giggles to win." },
  { icon: "♥", title: "Don't let them land", body: "If a Smudge floats all the way to the ground, you lose a heart. You have 3 — be quick!" },
];

type Status = "ready" | "tutorial" | "playing" | "math" | "won" | "lost";

interface MathQ {
  a: number;
  b: number;
  op: "+" | "-";
  answer: number;
  choices: number[];
}

function makeMathQuestion(): MathQ {
  const op: "+" | "-" = Math.random() < 0.5 ? "+" : "-";
  let a = 1 + Math.floor(Math.random() * 9);
  let b = 1 + Math.floor(Math.random() * 9);
  if (op === "-" && b > a) [a, b] = [b, a];
  const answer = op === "+" ? a + b : a - b;
  const set = new Set<number>([answer]);
  while (set.size < 3) {
    const delta = (Math.random() < 0.5 ? -1 : 1) * (1 + Math.floor(Math.random() * 3));
    const candidate = Math.max(0, answer + delta);
    set.add(candidate);
  }
  const choices = [...set].sort(() => Math.random() - 0.5);
  return { a, b, op, answer, choices };
}

export function ShadowChase({ onClose }: ShadowChaseProps) {
  const arenaRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("ready");
  const [introStep, setIntroStep] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(START_HEARTS);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [shadows, setShadows] = useState<Shadow[]>([]);
  const [bolts, setBolts] = useState<Bolt[]>([]);
  const [mari, setMari] = useState({ x: 50, y: 70 });
  const [shake, setShake] = useState(false);
  const [mathQ, setMathQ] = useState<MathQ | null>(null);
  const [mathResult, setMathResult] = useState<"idle" | "correct" | "wrong">("idle");
  const [bonusGiven, setBonusGiven] = useState(false);
  const nextId = useRef(1);
  const nextBoltId = useRef(1);
  const mariRef = useRef(mari);
  mariRef.current = mari;

  const reset = useCallback(() => {
    setScore(0);
    setHearts(START_HEARTS);
    setTimeLeft(GAME_SECONDS);
    setShadows([]);
    setBolts([]);
    setMathQ(null);
    setMathResult("idle");
    setBonusGiven(false);
    setStatus("playing");
  }, []);

  // Pointer tracking on window
  useEffect(() => {
    const arena = arenaRef.current;
    if (!arena || status !== "playing") return;
    function onMove(e: PointerEvent) {
      const r = arena!.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      setMari({
        x: Math.max(4, Math.min(96, x)),
        y: Math.max(8, Math.min(92, y)),
      });
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [status]);

  // Timer
  useEffect(() => {
    if (status !== "playing") return;
    const t = setInterval(() => {
      setTimeLeft((s) => (s <= 1 ? 0 : s - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [status]);

  // Spawner
  useEffect(() => {
    if (status !== "playing") return;
    const spawn = setInterval(() => {
      setShadows((prev) => [
        ...prev,
        {
          id: nextId.current++,
          x: 6 + Math.random() * 88,
          y: -6,
          vy: FALL_MIN + Math.random() * FALL_RANGE,
          vx: (Math.random() - 0.5) * 5,
          size: 56 + Math.floor(Math.random() * 28),
        },
      ]);
    }, SPAWN_MS);
    return () => clearInterval(spawn);
  }, [status]);

  // Physics
  useEffect(() => {
    if (status !== "playing") return;
    let raf = 0;
    let last = performance.now();
    function tick(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      let lostHere = 0;
      setShadows((prev) => {
        const next: Shadow[] = [];
        for (const s of prev) {
          if (s.popping) {
            next.push(s);
            continue;
          }
          const ny = s.y + s.vy * dt;
          const nx = Math.max(2, Math.min(98, s.x + s.vx * dt));
          if (ny > 100) {
            lostHere += 1;
            continue;
          }
          next.push({ ...s, x: nx, y: ny });
        }
        return next;
      });
      // Cull old bolts
      setBolts((prev) => prev.filter((b) => now - b.born < b.ttl));
      if (lostHere > 0) {
        setHearts((h) => Math.max(0, h - lostHere));
        setShake(true);
        window.setTimeout(() => setShake(false), 450);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [status]);

  // Game end transitions
  useEffect(() => {
    if (status !== "playing") return;
    if (score >= WIN_SCORE) {
      setMathQ(makeMathQuestion());
      setStatus("math");
    } else if (hearts <= 0 || timeLeft <= 0) {
      setStatus("lost");
    }
  }, [score, hearts, timeLeft, status]);

  // Fire a sparkle bolt at a shadow; on impact, pop it.
  const fire = useCallback((target: Shadow) => {
    if (target.popping || target.targeted) return;
    setShadows((prev) =>
      prev.map((s) => (s.id === target.id ? { ...s, targeted: true } : s)),
    );
    const m = mariRef.current;
    const boltId = nextBoltId.current++;
    setBolts((prev) => [
      ...prev,
      {
        id: boltId,
        x: m.x,
        y: m.y,
        tx: target.x,
        ty: target.y,
        targetId: target.id,
        born: performance.now(),
        ttl: BOLT_MS + 80,
      },
    ]);
    // On impact: mark popping, bump score, remove after pop animation.
    window.setTimeout(() => {
      setShadows((prev) =>
        prev.map((s) => (s.id === target.id ? { ...s, popping: true } : s)),
      );
      setScore((s) => s + 1);
      window.setTimeout(() => {
        setShadows((prev) => prev.filter((s) => s.id !== target.id));
      }, 420);
    }, BOLT_MS);
  }, []);

  function answerMath(choice: number) {
    if (!mathQ || mathResult !== "idle") return;
    if (choice === mathQ.answer) {
      setMathResult("correct");
      if (!bonusGiven) {
        addXP(50);
        addGold(20);
        setBonusGiven(true);
      }
    } else {
      setMathResult("wrong");
      if (!bonusGiven) {
        addXP(40);
        addGold(15);
        setBonusGiven(true);
      }
    }
    window.setTimeout(() => setStatus("won"), 900);
  }

  const heartsStr = useMemo(
    () => "♥".repeat(hearts) + "♡".repeat(START_HEARTS - hearts),
    [hearts],
  );

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/85 p-3 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-3xl border-4 border-shard-amethyst/60 bg-card p-4 card-pop">
        {/* HUD */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="font-display text-lg font-black">
            🦋✦ Catch the Giggle Thief
          </div>
          <div className="flex items-center gap-3 text-sm font-black">
            <span className="rounded-full bg-shard-sun/30 px-3 py-1">⭐ {score}/{WIN_SCORE}</span>
            <span className={`rounded-full bg-rose/30 px-3 py-1 ${shake ? "animate-shake" : ""}`}>
              {heartsStr}
            </span>
            <span className="rounded-full bg-ink/10 px-3 py-1">⏱ {timeLeft}s</span>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border-2 border-ink/30 px-3 py-1 text-xs"
              aria-label="Close mini-game"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Arena */}
        <div
          ref={arenaRef}
          className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border-2 border-ink/15 touch-none ${shake ? "animate-shake" : ""}`}
          style={{
            background:
              "radial-gradient(ellipse at 50% 20%, color-mix(in oklab, var(--color-shard-amethyst) 30%, var(--color-ink) 70%), color-mix(in oklab, var(--color-ink) 92%, black))",
          }}
        >
          {/* Ambient stars */}
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute animate-sparkle text-parchment/70"
              style={{
                left: `${(i * 31) % 100}%`,
                top: `${(i * 47) % 100}%`,
                fontSize: 6 + (i % 3) * 3,
                animationDelay: `${(i % 6) * 0.3}s`,
              }}
            >
              ✦
            </span>
          ))}

          {/* Ready overlay with intro dialogue */}
          {status === "ready" && (
            <Overlay>
              <div className="text-[10px] font-black uppercase tracking-widest text-shard-sun">
                Meet your opponent
              </div>
              <h3 className="mt-1 font-display text-2xl font-black text-parchment sm:text-3xl">
                Smudge, the Giggle Thief
              </h3>

              <div className="mt-4 flex items-end justify-center gap-4">
                <img
                  src={shadowImg}
                  alt="Smudge"
                  width={110}
                  height={110}
                  draggable={false}
                  className={`animate-float drop-shadow-[0_0_18px_rgba(160,80,220,0.7)] ${
                    INTRO[introStep].who === "smudge" ? "" : "opacity-60 saturate-50"
                  }`}
                  style={{ width: 110, height: 110 }}
                />
                <img
                  src={mariposaImg}
                  alt="Mariposa"
                  width={90}
                  height={90}
                  draggable={false}
                  className={`animate-flutter drop-shadow-[0_0_14px_rgba(255,209,102,0.6)] ${
                    INTRO[introStep].who === "mariposa" ? "" : "opacity-60"
                  }`}
                  style={{ width: 90, height: 90 }}
                />
              </div>

              <div className="mt-3 max-w-md rounded-2xl border-2 border-parchment/30 bg-parchment/95 px-4 py-3 text-ink card-pop animate-fade-in" key={introStep}>
                <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                  {INTRO[introStep].who === "smudge" ? "Smudge" : "Mariposa"}
                </div>
                <p className="mt-0.5 text-sm font-semibold">{INTRO[introStep].line}</p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <div className="flex gap-1" aria-hidden>
                  {INTRO.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-4 rounded-full ${
                        i <= introStep ? "bg-shard-sun" : "bg-parchment/30"
                      }`}
                    />
                  ))}
                </div>
                {introStep < INTRO.length - 1 ? (
                  <button
                    onClick={() => setIntroStep((s) => s + 1)}
                    className="rounded-full border-2 border-parchment/40 px-4 py-1.5 text-xs font-black text-parchment"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIntroStep(0);
                      setStatus("tutorial");
                    }}
                    className="rounded-full bg-shard-sun px-5 py-2 font-display text-base font-black text-ink hover-scale animate-glow"
                  >
                    How to play →
                  </button>
                )}
              </div>

              <p className="mt-2 text-[11px] text-parchment/60">
                Goal: free {WIN_SCORE} giggles • {GAME_SECONDS}s • {START_HEARTS} ♥
              </p>
            </Overlay>
          )}

          {/* Tutorial overlay */}
          {status === "tutorial" && (
            <Overlay>
              <div className="text-[10px] font-black uppercase tracking-widest text-shard-sun">
                How to play
              </div>
              <h3 className="mt-1 font-display text-2xl font-black text-parchment sm:text-3xl">
                {TUTORIAL[introStep].title}
              </h3>

              <div className="relative mt-4 grid h-32 w-72 max-w-full place-items-center rounded-2xl border-2 border-parchment/30 bg-ink/50">
                {introStep === 0 && (
                  <>
                    <img
                      src={mariposaImg}
                      alt=""
                      width={56}
                      height={56}
                      className="absolute top-1/2 -translate-y-1/2 animate-tut-drag drop-shadow-[0_0_12px_rgba(255,209,102,0.7)]"
                      style={{ width: 56, height: 56 }}
                    />
                    <span aria-hidden className="absolute right-4 bottom-3 animate-bounce text-2xl">👆</span>
                  </>
                )}
                {introStep === 1 && (
                  <>
                    <img
                      src={mariposaImg}
                      alt=""
                      width={48}
                      height={48}
                      className="absolute left-4 bottom-4 drop-shadow-[0_0_12px_rgba(255,209,102,0.7)]"
                      style={{ width: 48, height: 48 }}
                    />
                    <img
                      src={shadowImg}
                      alt=""
                      width={56}
                      height={56}
                      className="absolute right-4 top-3 animate-float drop-shadow-[0_0_14px_rgba(160,80,220,0.7)]"
                      style={{ width: 56, height: 56 }}
                    />
                    <span aria-hidden className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl animate-zap-pop">✨</span>
                  </>
                )}
                {introStep === 2 && (
                  <>
                    <img
                      src={shadowImg}
                      alt=""
                      width={48}
                      height={48}
                      className="absolute top-1 animate-tut-fall drop-shadow-[0_0_10px_rgba(160,80,220,0.6)]"
                      style={{ width: 48, height: 48 }}
                    />
                    <div className="absolute bottom-1 left-0 right-0 h-1 bg-rose/70" />
                    <span aria-hidden className="absolute bottom-2 right-3 text-2xl">♥♥♥</span>
                  </>
                )}
              </div>

              <p className="mt-3 max-w-md text-sm text-parchment/85">
                {TUTORIAL[introStep].body}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex gap-1" aria-hidden>
                  {TUTORIAL.map((_, i) => (
                    <span
                      key={i}
                      className={`h-1.5 w-5 rounded-full ${
                        i <= introStep ? "bg-shard-sun" : "bg-parchment/30"
                      }`}
                    />
                  ))}
                </div>
                {introStep > 0 && (
                  <button
                    onClick={() => setIntroStep((s) => s - 1)}
                    className="rounded-full border-2 border-parchment/40 px-3 py-1.5 text-xs font-black text-parchment"
                  >
                    ← Back
                  </button>
                )}
                {introStep < TUTORIAL.length - 1 ? (
                  <button
                    onClick={() => setIntroStep((s) => s + 1)}
                    className="rounded-full border-2 border-parchment/40 px-4 py-1.5 text-xs font-black text-parchment"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={reset}
                    className="rounded-full bg-shard-sun px-5 py-2 font-display text-base font-black text-ink hover-scale animate-glow"
                  >
                    ▶ Begin the chase
                  </button>
                )}
              </div>

              <p className="mt-2 text-[11px] text-parchment/60">
                Goal: free {WIN_SCORE} giggles • {GAME_SECONDS}s • {START_HEARTS} ♥
              </p>
            </Overlay>
          )}

          {/* Mariposa */}
          {status === "playing" && (
            <img
              src={mariposaImg}
              alt="Mariposa"
              width={72}
              height={72}
              draggable={false}
              className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 animate-glow drop-shadow-[0_0_18px_rgba(255,209,102,0.7)] transition-[left,top] duration-100 ease-out"
              style={{ left: `${mari.x}%`, top: `${mari.y}%`, width: 72, height: 72 }}
            />
          )}

          {/* Sparkle bolts */}
          {status === "playing" &&
            bolts.map((b) => (
              <span
                key={b.id}
                aria-hidden
                className="pointer-events-none absolute z-20 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center text-xl drop-shadow-[0_0_10px_rgba(255,209,102,0.9)]"
                style={{
                  left: `${b.tx}%`,
                  top: `${b.ty}%`,
                  transition: `left ${BOLT_MS}ms linear, top ${BOLT_MS}ms linear`,
                  // start position is the inline style applied on first render;
                  // we set the target immediately so the browser interpolates.
                  // Hack: use a CSS var trick — render with starting offset via key.
                }}
              >
                ✦
              </span>
            ))}

          {/* Shadows */}
          {status === "playing" &&
            shadows.map((s) => (
              <button
                key={s.id}
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault();
                  if (!s.popping && !s.targeted) fire(s);
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${s.popping ? "pointer-events-none" : "cursor-crosshair"}`}
                style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
                aria-label="Catch Smudge"
              >
                <img
                  src={shadowImg}
                  alt=""
                  draggable={false}
                  className={`h-full w-full select-none drop-shadow-[0_0_12px_rgba(120,40,180,0.7)] ${s.popping ? "animate-zap-pop" : "animate-float"} ${s.targeted && !s.popping ? "ring-4 ring-shard-sun/70 rounded-full" : ""}`}
                />
                {s.popping && (
                  <span className="pointer-events-none absolute inset-0 grid place-items-center text-3xl">⚡</span>
                )}
              </button>
            ))}

          {/* Final Riddle (math) */}
          {status === "math" && mathQ && (
            <Overlay>
              <div className="text-[10px] font-black uppercase tracking-widest text-shard-sun">
                Final Riddle
              </div>
              <h3 className="mt-1 font-display text-2xl font-black text-parchment sm:text-3xl">
                Solve to free the last giggle!
              </h3>
              <p className="mt-2 max-w-md text-sm text-parchment/80">
                Mariposa whispers: "Quick, hero — the last giggle is locked behind a riddle!"
              </p>

              <div className="mt-5 rounded-2xl bg-parchment/95 px-6 py-4 text-ink card-pop">
                <div className="font-display text-4xl font-black">
                  {mathQ.a} {mathQ.op} {mathQ.b} = ?
                </div>
              </div>

              <div className="mt-5 flex flex-wrap justify-center gap-3">
                {mathQ.choices.map((c) => {
                  const isAnswer = mathResult !== "idle" && c === mathQ.answer;
                  const isWrongPick = mathResult === "wrong" && c !== mathQ.answer;
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => answerMath(c)}
                      disabled={mathResult !== "idle"}
                      className={`rounded-2xl border-2 border-parchment/40 bg-ink/30 px-6 py-3 font-display text-2xl font-black text-parchment hover-scale ${
                        isAnswer ? "!bg-shard-emerald !text-ink" : ""
                      } ${isWrongPick ? "!bg-rose/70 !text-parchment" : ""}`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>

              {mathResult === "correct" && (
                <p className="mt-4 font-display text-lg font-black text-shard-emerald">
                  ✦ Correct! +50 XP, +20 🪙
                </p>
              )}
              {mathResult === "wrong" && (
                <p className="mt-4 font-display text-lg font-black text-rose">
                  Close! The answer was {mathQ.answer}. +40 XP, +15 🪙
                </p>
              )}
            </Overlay>
          )}

          {/* Win / Lose */}
          {status === "won" && (
            <Overlay>
              <h3 className="font-display text-4xl font-black text-shard-sun">Victory!</h3>
              <p className="mt-1 text-parchment/80">The shadows scatter. Mariposa shines bright again.</p>
              <div className="mt-3 rounded-2xl bg-parchment/95 p-2 text-ink">
                <MariposaSay moment="SHARD_WON" size={56} />
              </div>
              <div className="mt-2 text-sm font-bold text-shard-sun">
                {mathResult === "correct" ? "+50 XP   +20 🪙" : "+40 XP   +15 🪙"}
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={reset} className="rounded-full border-2 border-parchment/50 px-4 py-2 text-sm font-black text-parchment">
                  Play again
                </button>
                <button onClick={onClose} className="rounded-full bg-shard-sun px-4 py-2 text-sm font-black text-ink">
                  Done
                </button>
              </div>
            </Overlay>
          )}

          {status === "lost" && (
            <Overlay>
              <h3 className="font-display text-4xl font-black text-rose">So close!</h3>
              <p className="mt-1 text-parchment/80">
                The shadows slipped past — but every brave try makes you stronger.
              </p>
              <div className="mt-3 rounded-2xl bg-parchment/95 p-2 text-ink">
                <MariposaSay moment="MISSED" size={56} />
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={reset} className="rounded-full bg-shard-sun px-4 py-2 text-sm font-black text-ink hover-scale">
                  Try again
                </button>
                <button onClick={onClose} className="rounded-full border-2 border-parchment/50 px-4 py-2 text-sm font-black text-parchment">
                  Close
                </button>
              </div>
            </Overlay>
          )}
        </div>

        <p className="mt-2 text-center text-xs text-ink/60">
          Tip: tap a Smudge — Mariposa fires a sparkle bolt at it!
        </p>
      </div>
    </div>
  );
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-30 grid place-items-center bg-ink/60 p-6 text-center backdrop-blur-sm">
      <div className="animate-fade-in flex flex-col items-center">{children}</div>
    </div>
  );
}
