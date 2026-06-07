import { useMemo, useState } from "react";
import type { Realm } from "@/data/realms";

interface Q { q: string; a: number; choices: number[]; }

function makeQuestion(seed: number): Q {
  // Deterministic-ish PRNG seeded by `seed` so each encounter is stable.
  let s = seed || 1;
  const rnd = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const between = (lo: number, hi: number) => lo + Math.floor(rnd() * (hi - lo + 1));

  // Difficulty tuned for ~8-year-olds (Grade 3):
  // 2-digit add/subtract with regrouping, times tables up to 12,
  // simple division facts, and a light missing-number twist.
  const kind = seed % 5;
  let a: number, q: string;
  if (kind === 0) {
    const x = between(13, 49), y = between(14, 49);
    a = x + y;
    q = `A wild pawn appears! Quick: ${x} + ${y} = ?`;
  } else if (kind === 1) {
    const x = between(40, 99), y = between(11, 39);
    a = x - y;
    q = `Knight challenge: ${x} − ${y} = ?`;
  } else if (kind === 2) {
    const x = between(3, 12), y = between(3, 12);
    a = x * y;
    q = `Bishop multiplies: ${x} × ${y} = ?`;
  } else if (kind === 3) {
    // Clean division: build from a known product so the answer is whole.
    const y = between(2, 9);
    const a0 = between(2, 9);
    const x = a0 * y;
    a = a0;
    q = `Rook divides the squad: ${x} ÷ ${y} = ?`;
  } else {
    // Missing addend: x + ? = total
    const x = between(12, 39), a0 = between(13, 39);
    const total = x + a0;
    a = a0;
    q = `Queen's riddle: ${x} + ? = ${total}`;
  }

  // Plausible distractors close to the real answer (off-by-1/2/10 style).
  const set = new Set<number>([a]);
  const offsets = [-10, -2, -1, 1, 2, 10, 11, -11];
  let i = 0;
  while (set.size < 4 && i < 50) {
    const cand = a + offsets[Math.floor(rnd() * offsets.length)] + (i > 8 ? Math.floor(rnd() * 5) - 2 : 0);
    if (cand >= 0 && cand !== a) set.add(cand);
    i++;
  }
  while (set.size < 4) set.add(a + set.size); // safety
  const choices = Array.from(set).sort(() => rnd() - 0.5);
  return { q, a, choices };
}

const CREATURES = ["🐺 Wild Pawn", "🦊 Sneaky Fox-knight", "🐉 Mini Dragon", "🦉 Owl Scholar", "🐢 Wandering Rook-Turtle"];

export function WildEncounter({ realm, onWin, onFlee, onClose }: { realm: Realm; onWin: (xp: number, gold: number) => void; onFlee: () => void; onClose: () => void; }) {
  const seed = useMemo(() => Math.floor(Math.random() * 100000), []);
  const creature = useMemo(() => CREATURES[seed % CREATURES.length], [seed]);
  const question = useMemo(() => makeQuestion(seed), [seed]);
  const [picked, setPicked] = useState<number | null>(null);

  const correct = picked !== null && picked === question.a;
  const wrong = picked !== null && picked !== question.a;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 animate-fade-in" role="dialog" aria-modal="true" aria-label="Wild encounter">
      <div className="w-full max-w-md rounded-3xl border-4 border-ink/20 bg-card p-6 card-pop animate-scale-in">
        <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Wild encounter • {realm.name}</div>
        <h3 className="mt-1 font-display text-2xl font-black">{creature} appeared!</h3>
        <p className="mt-2 text-sm text-ink/80">{question.q}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {question.choices.map((c) => {
            const isPicked = picked === c;
            const cls = picked === null
              ? "bg-parchment hover:bg-shard-sun/30 border-ink/30"
              : c === question.a
                ? "bg-shard-emerald/40 border-shard-emerald"
                : isPicked ? "bg-rose/30 border-rose" : "bg-parchment/50 border-ink/15 opacity-70";
            return (
              <button
                key={c}
                disabled={picked !== null}
                onClick={() => setPicked(c)}
                className={`rounded-xl border-2 px-4 py-3 font-display text-xl font-black text-ink transition-all ${cls}`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {correct && (
          <div className="mt-4 rounded-xl bg-shard-emerald/20 p-3 text-sm font-bold text-ink animate-fade-in">
            ✦ Tamed! +30 XP, +8 🪙
          </div>
        )}
        {wrong && (
          <div className="mt-4 rounded-xl bg-rose/15 p-3 text-sm font-bold text-ink animate-fade-in">
            ♥ Brave Heart earned. The creature scampers off.
          </div>
        )}

        <div className="mt-5 flex items-center justify-between gap-2">
          <button onClick={onFlee} className="rounded-full border-2 border-ink/30 px-4 py-2 text-sm font-black text-ink">Flee</button>
          <button
            onClick={() => { if (correct) onWin(30, 8); onClose(); }}
            className="rounded-full bg-ink px-5 py-2 text-sm font-black text-parchment"
          >
            {picked === null ? "Skip" : correct ? "Claim reward →" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
