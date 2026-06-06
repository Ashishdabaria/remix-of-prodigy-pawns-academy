import { useCallback, useEffect, useRef, useState } from "react";
import mariposaImg from "@/assets/mariposa.png";
import shadowImg from "@/assets/shadow-moth.png";
import { addGold, addXP } from "@/data/student";
import { MariposaSay } from "./MariposaSay";

/**
 * Reward mini-game: "Mariposa vs. The Shadow Moth."
 *
 * Mariposa follows the player's pointer/finger inside the arena.
 * Shadow moths spawn at the top and drift toward the bottom.
 * Tap a shadow to zap it. If a shadow reaches the bottom, you lose a heart.
 * Win condition: 12 zaps before time/hearts run out.
 *
 * Pure DOM + rAF, no external deps.
 */

interface ShadowChaseProps {
  onClose: () => void;
}

interface Shadow {
  id: number;
  x: number; // percent 0..100 within arena
  y: number; // percent 0..100
  vy: number; // percent per second
  vx: number;
  size: number; // px
  popping?: boolean;
}

const WIN_SCORE = 12;
const START_HEARTS = 3;
const GAME_SECONDS = 45;

/** Intro dialogue between Smudge (the mischievous shadow imp) and Mariposa. */
const INTRO: { who: "smudge" | "mariposa"; line: string }[] = [
  { who: "smudge", line: "Hehe! I'm Smudge — the giggliest little shadow in all the realms!" },
  { who: "mariposa", line: "Smudge! You've been hiding the Pawn Village's giggles, haven't you?" },
  { who: "smudge", line: "Maaaybe. I bonk into things and the giggles fall out! Catch me if you can, butterfly!" },
  { who: "mariposa", line: "Ready, hero? Move me with your finger and tap each little Smudge to set the giggles free!" },
];

type Status = "ready" | "playing" | "won" | "lost";

export function ShadowChase({ onClose }: ShadowChaseProps) {
  const arenaRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("ready");
  const [introStep, setIntroStep] = useState(0);
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState(START_HEARTS);
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [shadows, setShadows] = useState<Shadow[]>([]);
  const [mari, setMari] = useState({ x: 50, y: 70 });
  const [shake, setShake] = useState(false);
  const nextId = useRef(1);

  const reset = useCallback(() => {
    setScore(0);
    setHearts(START_HEARTS);
    setTimeLeft(GAME_SECONDS);
    setShadows([]);
    setStatus("playing");
  }, []);

  // Pointer tracking
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
    arena.addEventListener("pointermove", onMove);
    return () => arena.removeEventListener("pointermove", onMove);
  }, [status]);

  // Timer
  useEffect(() => {
    if (status !== "playing") return;
    const t = setInterval(() => {
      setTimeLeft((s) => {
        if (s <= 1) {
          clearInterval(t);
          return 0;
        }
        return s - 1;
      });
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
          vy: 12 + Math.random() * 10,
          vx: (Math.random() - 0.5) * 6,
          size: 56 + Math.floor(Math.random() * 28),
        },
      ]);
    }, 900);
    return () => clearInterval(spawn);
  }, [status]);

  // Physics tick
  useEffect(() => {
    if (status !== "playing") return;
    let raf = 0;
    let last = performance.now();
    function tick(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setShadows((prev) => {
        const next: Shadow[] = [];
        let lostHere = 0;
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
        if (lostHere > 0) {
          setHearts((h) => {
            const nh = Math.max(0, h - lostHere);
            return nh;
          });
          setShake(true);
          setTimeout(() => setShake(false), 500);
        }
        return next;
      });
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [status]);

  // Win/Lose
  useEffect(() => {
    if (status !== "playing") return;
    if (score >= WIN_SCORE) {
      setStatus("won");
      addXP(40);
      addGold(15);
    } else if (hearts <= 0 || timeLeft <= 0) {
      setStatus("lost");
    }
  }, [score, hearts, timeLeft, status]);

  function zap(id: number) {
    setShadows((prev) =>
      prev.map((s) => (s.id === id ? { ...s, popping: true } : s)),
    );
    setScore((s) => s + 1);
    setTimeout(() => {
      setShadows((prev) => prev.filter((s) => s.id !== id));
    }, 420);
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/85 p-3 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl rounded-3xl border-4 border-shard-amethyst/60 bg-card p-4 card-pop">
        {/* HUD */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <div className="font-display text-lg font-black">
            🦋⚔️ Shadow Moth Showdown
          </div>
          <div className="flex items-center gap-3 text-sm font-black">
            <span className="rounded-full bg-shard-sun/30 px-3 py-1">⭐ {score}/{WIN_SCORE}</span>
            <span className={`rounded-full bg-rose/30 px-3 py-1 ${shake ? "animate-shake" : ""}`}>
              {"♥".repeat(hearts)}{"♡".repeat(START_HEARTS - hearts)}
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

          {/* Shadows */}
          {status === "playing" &&
            shadows.map((s) => (
              <button
                key={s.id}
                type="button"
                onPointerDown={(e) => {
                  e.preventDefault();
                  if (!s.popping) zap(s.id);
                }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full ${s.popping ? "pointer-events-none" : "cursor-crosshair"}`}
                style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
                aria-label="Zap shadow moth"
              >
                <img
                  src={shadowImg}
                  alt=""
                  draggable={false}
                  className={`h-full w-full select-none drop-shadow-[0_0_12px_rgba(120,40,180,0.7)] ${s.popping ? "animate-zap-pop" : "animate-float"}`}
                />
                {s.popping && (
                  <span className="pointer-events-none absolute inset-0 grid place-items-center text-3xl">⚡</span>
                )}
              </button>
            ))}

          {/* Win / Lose */}
          {status === "won" && (
            <Overlay>
              <h3 className="font-display text-4xl font-black text-shard-sun">Victory!</h3>
              <p className="mt-1 text-parchment/80">The shadows scatter. Mariposa shines bright again.</p>
              <div className="mt-3 rounded-2xl bg-parchment/95 p-2 text-ink">
                <MariposaSay moment="SHARD_WON" size={56} />
              </div>
              <div className="mt-2 text-sm font-bold text-shard-sun">+40 XP   +15 🪙</div>
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
          Tip: keep Mariposa <em>moving</em> — the shadows seek the light.
        </p>
      </div>
    </div>
  );
}

function Overlay({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-10 grid place-items-center bg-ink/60 p-6 text-center backdrop-blur-sm">
      <div className="animate-fade-in flex flex-col items-center">{children}</div>
    </div>
  );
}
