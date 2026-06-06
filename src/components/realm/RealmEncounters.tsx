import { useEffect, useMemo, useState } from "react";
import { MariposaSay } from "./MariposaSay";
import { addBraveHeart, addGems, addGold, addXP } from "@/data/student";
import { BOSS_QUESTIONS } from "@/data/realm1/boss";
import type { Realm } from "@/data/realms";
import { SHARDS } from "@/data/realms";

/* ----------------------------- Shared modal shell ---------------------------- */

interface ShellProps {
  label: string;
  title: string;
  onClose: () => void;
  accent: "amber" | "amethyst" | "emerald" | "sun";
  children: React.ReactNode;
}

const ACCENT: Record<ShellProps["accent"], string> = {
  amber: "border-shard-amber/60",
  amethyst: "border-shard-amethyst/60",
  emerald: "border-shard-emerald/60",
  sun: "border-shard-sun/70",
};

function ModalShell({ label, title, onClose, accent, children }: ShellProps) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/85 p-3 backdrop-blur-sm">
      <div className={`relative w-full max-w-lg rounded-3xl border-4 ${ACCENT[accent]} bg-card p-5 card-pop animate-scale-in`}>
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            {label}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border-2 border-ink/30 px-3 py-1 text-xs font-black"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <h3 className="font-display text-2xl font-black">{title}</h3>
        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}

/* ============================== MINI-BOSS ENCOUNTER =========================== */
/**
 * A knight-L-shape puzzle. A 5x5 grid; the knight sits in the center and we
 * mark target squares — some are real L-moves, some are decoys. Tap any real
 * L-move to free the Lost Knight. 3 lives.
 */

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];

interface MiniBossProps {
  realm: Realm;
  onClose: () => void;
  onWin: () => void;
}

export function MiniBossEncounter({ realm, onClose, onWin }: MiniBossProps) {
  const SIZE = 5; // 5x5 grid, knight at (2,2)
  const KX = 2;
  const KY = 2;
  const LMOVES = useMemo(
    () => [
      [1, 2], [2, 1], [-1, 2], [-2, 1],
      [1, -2], [2, -1], [-1, -2], [-2, -1],
    ],
    [],
  );

  const [hits, setHits] = useState<Set<string>>(new Set());
  const [lives, setLives] = useState(3);
  const [stage, setStage] = useState<"intro" | "playing" | "won" | "lost">("intro");

  const needed = 3;

  function key(x: number, y: number) {
    return `${x}_${y}`;
  }
  function isKnightMove(x: number, y: number) {
    const dx = x - KX;
    const dy = y - KY;
    return LMOVES.some(([a, b]) => a === dx && b === dy);
  }

  function tap(x: number, y: number) {
    if (stage !== "playing") return;
    if (x === KX && y === KY) return;
    const k = key(x, y);
    if (hits.has(k)) return;

    if (isKnightMove(x, y)) {
      const next = new Set(hits);
      next.add(k);
      setHits(next);
      if (next.size >= needed) {
        addXP(40);
        addGold(10);
        addBraveHeart(1);
        setStage("won");
        onWin();
      }
    } else {
      const remaining = lives - 1;
      setLives(remaining);
      if (remaining <= 0) {
        addBraveHeart(2);
        setStage("lost");
      }
    }
  }

  function reset() {
    setHits(new Set());
    setLives(3);
    setStage("playing");
  }

  return (
    <ModalShell
      label="Mini-boss"
      title={`🐴 ${realm.miniBoss.name}`}
      onClose={onClose}
      accent="amber"
    >
      {stage === "intro" && (
        <>
          <p className="mt-1 text-sm font-bold text-ink/80">{realm.miniBoss.description}</p>
          <div className="mt-3">
            <MariposaSay
              moment="PIECE_HINT"
              text={`Tap ${needed} squares the knight could leap to in one L-shape. 3 lives!`}
              size={56}
            />
          </div>
          <button
            onClick={() => setStage("playing")}
            className="mt-4 w-full rounded-full bg-shard-amber px-5 py-3 font-display text-base font-black text-ink hover-scale animate-glow"
          >
            ▶ Help the knight
          </button>
        </>
      )}

      {(stage === "playing" || stage === "won" || stage === "lost") && (
        <>
          <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-widest text-ink/70">
            <span>Found {hits.size}/{needed}</span>
            <span aria-label={`${lives} lives left`}>{"♥".repeat(lives)}{"♡".repeat(Math.max(0, 3 - lives))}</span>
          </div>

          <div className="mx-auto grid w-fit grid-cols-5 overflow-hidden rounded-md border-2 border-ink/30">
            {Array.from({ length: SIZE * SIZE }).map((_, i) => {
              const x = i % SIZE;
              const y = Math.floor(i / SIZE);
              const dark = (x + y) % 2 === 1;
              const isKnight = x === KX && y === KY;
              const k = key(x, y);
              const found = hits.has(k);
              return (
                <button
                  key={k}
                  type="button"
                  disabled={stage !== "playing" || isKnight}
                  onClick={() => tap(x, y)}
                  className={`grid h-10 w-10 place-items-center text-xl font-black transition
                    ${found ? "bg-shard-emerald text-parchment" : dark ? "bg-ink/70 text-parchment" : "bg-parchment text-ink"}
                    ${isKnight ? "bg-shard-amber text-ink" : ""}
                    ${stage === "playing" && !isKnight ? "hover:scale-105" : ""}`}
                >
                  {isKnight ? "♞" : found ? "✦" : ""}
                </button>
              );
            })}
          </div>

          {stage === "playing" && (
            <p className="mt-3 text-center text-xs font-bold text-ink/60">
              Tip: a knight jumps two-then-one, like the letter <strong>L</strong>.
            </p>
          )}

          {stage === "won" && (
            <div className="mt-4 text-center">
              <div className="font-display text-2xl font-black">🎉 You freed the knight!</div>
              <div className="mt-1 font-bold text-shard-emerald">+40 XP   +10 🪙   +1 ♥</div>
              <button
                onClick={onClose}
                className="mt-3 rounded-full bg-ink px-5 py-2 font-display text-sm font-black text-parchment"
              >
                Done
              </button>
            </div>
          )}

          {stage === "lost" && (
            <div className="mt-4 text-center">
              <div className="font-display text-2xl font-black">💖 Brave try!</div>
              <p className="mt-1 text-sm text-ink/80">The knight giggled — try again!</p>
              <div className="mt-1 font-bold text-rose">+2 ♥ Brave Hearts</div>
              <button
                onClick={reset}
                className="mt-3 rounded-full bg-shard-amber px-5 py-2 font-display text-sm font-black text-ink"
              >
                Try again
              </button>
            </div>
          )}
        </>
      )}
    </ModalShell>
  );
}

/* ================================ BOSS ENCOUNTER ============================== */
/**
 * A quick 3-question pop-quiz right from the realm card. Uses BOSS_QUESTIONS
 * for realm 1; for later realms it falls back to the same set (until per-realm
 * decks are added). For the full boss flow with Mariposa banter, players still
 * play through /realm/$realmId/play.
 */

interface BossProps {
  realm: Realm;
  onClose: () => void;
  onWin: () => void;
}

export function BossEncounter({ realm, onClose, onWin }: BossProps) {
  const shard = SHARDS[realm.shard];
  const deck = useMemo(() => {
    const copy = [...BOSS_QUESTIONS];
    // Deterministic shuffle: first 3 by id hash so different realms get different orders
    let h = 0;
    for (const c of realm.id) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    copy.sort((a, b) => ((h ^ a.id.charCodeAt(0)) % 7) - ((h ^ b.id.charCodeAt(0)) % 7));
    return copy.slice(0, 3);
  }, [realm.id]);

  const [stage, setStage] = useState<"intro" | "playing" | "done">("intro");
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const q = deck[idx];

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    const right = i === q.correctIndex;
    if (right) setScore((s) => s + 1);
    setTimeout(() => {
      if (idx + 1 >= deck.length) {
        const final = score + (right ? 1 : 0);
        const passed = final >= 2;
        if (passed) {
          addXP(60);
          addGold(20);
          onWin();
        } else {
          addBraveHeart(2);
        }
        setStage("done");
      } else {
        setIdx(idx + 1);
        setPicked(null);
      }
    }, 1200);
  }

  return (
    <ModalShell
      label="Boss battle"
      title={`🗿 ${realm.boss.name}`}
      onClose={onClose}
      accent="sun"
    >
      {stage === "intro" && (
        <>
          <p className="mt-1 text-sm font-bold text-ink/80">{realm.boss.description}</p>
          <div className="mt-3">
            <MariposaSay
              moment="BOSS_INTRO"
              text={`A quick 3-question challenge. Answer 2 of 3 and earn ${shard.name} progress!`}
              size={56}
            />
          </div>
          <button
            onClick={() => setStage("playing")}
            className="mt-4 w-full rounded-full bg-shard-sun px-5 py-3 font-display text-base font-black text-ink hover-scale animate-glow"
          >
            ⚔ Begin the duel
          </button>
        </>
      )}

      {stage === "playing" && q && (
        <>
          <div className="mb-2 flex items-center justify-between text-xs font-black uppercase tracking-widest text-ink/70">
            <span>Round {idx + 1} / {deck.length}</span>
            <span>Correct {score}</span>
          </div>
          <h4 className="font-display text-xl font-black">{q.prompt}</h4>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {q.options.map((opt, i) => {
              const isPick = picked === i;
              const isCorrect = picked !== null && i === q.correctIndex;
              const isWrong = isPick && i !== q.correctIndex;
              return (
                <button
                  key={opt}
                  type="button"
                  disabled={picked !== null}
                  onClick={() => pick(i)}
                  className={`rounded-2xl border-2 px-3 py-3 text-left font-display text-base font-black transition
                    ${isCorrect ? "border-shard-emerald bg-shard-emerald/25" : ""}
                    ${isWrong ? "border-rose bg-rose/15" : ""}
                    ${picked === null ? "border-ink/20 bg-parchment/70 hover:-translate-y-0.5 hover:bg-shard-sun/20" : ""}
                    disabled:cursor-not-allowed`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="mt-3 rounded-xl bg-parchment/70 p-3 text-sm font-semibold text-ink/80">
              {q.explain}
            </div>
          )}
        </>
      )}

      {stage === "done" && (
        <div className="mt-2 text-center">
          {score >= 2 ? (
            <>
              <div className="font-display text-3xl font-black">🏆 Victory!</div>
              <p className="mt-1 text-sm text-ink/80">You bested the {realm.boss.name}.</p>
              <div className="mt-1 font-bold text-shard-emerald">+60 XP   +20 🪙</div>
            </>
          ) : (
            <>
              <div className="font-display text-3xl font-black">💖 Brave try!</div>
              <p className="mt-1 text-sm text-ink/80">
                You got {score} / {deck.length}. Mariposa is proud — try again any time.
              </p>
              <div className="mt-1 font-bold text-rose">+2 ♥ Brave Hearts</div>
            </>
          )}
          <button
            onClick={onClose}
            className="mt-3 rounded-full bg-ink px-5 py-2 font-display text-sm font-black text-parchment"
          >
            Done
          </button>
        </div>
      )}
    </ModalShell>
  );
}

/* ============================= TREASURE CHEST ================================ */
/**
 * A tappable treasure chest. On open: confetti-like sparkles, the realm's
 * treasure text is revealed, and the player receives gold + gems + a brave
 * heart. Re-opens grant a tiny consolation only on first open of the session.
 */

interface TreasureProps {
  realm: Realm;
  onClose: () => void;
  onOpen: () => void;
}

export function TreasureChest({ realm, onClose, onOpen }: TreasureProps) {
  const [open, setOpen] = useState(false);
  const shard = SHARDS[realm.shard];

  useEffect(() => {
    if (!open) return;
    addGold(25);
    addGems(1);
    addBraveHeart(1);
    addXP(20);
    onOpen();
  }, [open, onOpen]);

  return (
    <ModalShell
      label="Treasure chest"
      title="🎁 Hidden in the Pawn Village"
      onClose={onClose}
      accent="emerald"
    >
      <div className="relative grid place-items-center py-6">
        {/* Sparkles */}
        {open && (
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 16 }).map((_, i) => (
              <span
                key={i}
                className="absolute text-2xl text-shard-sun animate-fade-in"
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 100}%`,
                  animationDelay: `${i * 60}ms`,
                  transform: `rotate(${i * 23}deg)`,
                }}
              >
                ✦
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => !open && setOpen(true)}
          aria-label={open ? "Chest opened" : "Open chest"}
          className={`relative z-10 grid h-32 w-32 place-items-center rounded-2xl border-4 border-ink/40 bg-shard-amber text-7xl shadow-xl transition-transform ${
            open ? "scale-110" : "hover:scale-105 animate-pulse"
          }`}
        >
          {open ? "🧰" : "🎁"}
        </button>
      </div>

      {!open ? (
        <p className="text-center text-sm font-bold text-ink/70">Tap the chest to open it!</p>
      ) : (
        <div className="text-center">
          <div className="font-display text-2xl font-black">You found:</div>
          <p className="mt-1 font-display text-xl font-black text-shard-emerald">{realm.treasure}</p>
          <p className="mt-2 text-xs font-bold text-ink/60">
            Progress toward the {shard.name} ({shard.rank})
          </p>
          <div className="mt-2 font-bold text-shard-emerald">+20 XP   +25 🪙   +1 💎   +1 ♥</div>
          <button
            onClick={onClose}
            className="mt-4 rounded-full bg-ink px-5 py-2 font-display text-sm font-black text-parchment"
          >
            Tuck it in my pack
          </button>
        </div>
      )}
    </ModalShell>
  );
}
