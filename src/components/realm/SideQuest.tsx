import { useMemo, useState } from "react";
import { addGold, addXP, addBraveHeart } from "@/data/student";
import { MariposaSay } from "./MariposaSay";

/**
 * A friendly, interactive Side Quest modal.
 *
 * The modal generates a tiny challenge based on the quest index so each of a
 * realm's three side quests feels distinct:
 *  - 0: "Name the square" — pick the file (a–h) of a highlighted square
 *  - 1: "Count the friends" — count icons of a target type
 *  - 2: "Match the piece" — tap the matching chess piece
 *
 * Every result is positive — even a wrong answer earns a Brave Heart. Wins
 * grant +20 XP and +5 gold. Children 5–12: warm tone, big tap targets.
 */

interface SideQuestProps {
  questId: string;
  questIndex: number;
  title: string;
  reward?: string;
  onClose: () => void;
}

type Stage = "intro" | "playing" | "result";

export function SideQuest({ questId, questIndex, title, reward, onClose }: SideQuestProps) {
  const variant = questIndex % 3;
  const [stage, setStage] = useState<Stage>("intro");
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);

  const challenge = useMemo(() => buildChallenge(variant, questId), [variant, questId]);

  function pick(value: string) {
    if (stage !== "playing") return;
    const isRight = value === challenge.answer;
    setPicked(value);
    setCorrect(isRight);
    setStage("result");
    if (isRight) {
      addXP(20);
      addGold(5);
    } else {
      addBraveHeart(1);
    }
  }

  function tryAgain() {
    setPicked(null);
    setCorrect(null);
    setStage("playing");
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/85 p-3 backdrop-blur-sm">
      <div className="relative w-full max-w-lg rounded-3xl border-4 border-shard-emerald/60 bg-card p-5 card-pop">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            Side Quest
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border-2 border-ink/30 px-3 py-1 text-xs font-black"
            aria-label="Close side quest"
          >
            ✕
          </button>
        </div>

        <h3 className="font-display text-2xl font-black">⚑ {title}</h3>
        {reward && (
          <p className="mt-1 text-xs font-bold text-ink/70">Reward: {reward}</p>
        )}

        {stage === "intro" && (
          <div className="mt-4">
            <MariposaSay moment="PIECE_HINT" text={challenge.intro} size={56} />
            <button
              onClick={() => setStage("playing")}
              className="mt-4 w-full rounded-full bg-shard-emerald px-5 py-3 font-display text-base font-black text-parchment hover-scale animate-glow"
            >
              ▶ Start the quest
            </button>
          </div>
        )}

        {stage === "playing" && (
          <div className="mt-4">
            <p className="font-display text-lg font-black">{challenge.prompt}</p>

            {/* Optional visual: a tiny chessboard square or icon group */}
            {challenge.visual && (
              <div className="mt-3 grid place-items-center rounded-2xl bg-parchment/60 p-4">
                {challenge.visual}
              </div>
            )}

            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {challenge.choices.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => pick(c.value)}
                  className="rounded-2xl border-2 border-ink/20 bg-parchment/80 px-3 py-3 font-display text-lg font-black text-ink hover-scale"
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {stage === "result" && (
          <div className="mt-4 text-center">
            <div className="font-display text-3xl font-black">
              {correct ? "✦ Brilliant!" : "🤍 Brave try!"}
            </div>
            <p className="mt-2 text-sm text-ink/80">
              {correct
                ? `Right! The answer was "${challenge.answer}".`
                : `You picked "${picked}". The answer was "${challenge.answer}". You earned a Brave Heart for trying!`}
            </p>
            <div className="mt-2 font-bold text-shard-emerald">
              {correct ? "+20 XP   +5 🪙" : "+1 ♥ Brave Heart"}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button
                onClick={tryAgain}
                className="rounded-full border-2 border-ink/30 px-4 py-2 font-display text-sm font-black"
              >
                Try again
              </button>
              <button
                onClick={onClose}
                className="rounded-full bg-ink px-4 py-2 font-display text-sm font-black text-parchment"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// -------- Challenge builder --------

interface Challenge {
  intro: string;
  prompt: string;
  choices: { value: string; label: string }[];
  answer: string;
  visual?: React.ReactNode;
}

const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
const PIECES = [
  { id: "K", glyph: "♔", name: "King" },
  { id: "Q", glyph: "♕", name: "Queen" },
  { id: "R", glyph: "♖", name: "Rook" },
  { id: "B", glyph: "♗", name: "Bishop" },
  { id: "N", glyph: "♘", name: "Knight" },
  { id: "P", glyph: "♙", name: "Pawn" },
];

function seedFrom(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) >>> 0;
  return h;
}

function buildChallenge(variant: number, seedId: string): Challenge {
  const seed = seedFrom(seedId);

  if (variant === 0) {
    // Name the file of a highlighted square
    const fileIdx = seed % 8;
    const rank = (seed >>> 3) % 8; // 0..7 (0 = rank 1) — unsigned shift!
    const file = FILES[fileIdx];
    const choices = [
      file,
      FILES[(fileIdx + 1) % 8],
      FILES[(fileIdx + 5) % 8],
      FILES[(fileIdx + 3) % 8],
    ]
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 4)
      .sort()
      .map((f) => ({ value: f, label: f.toUpperCase() }));

    return {
      intro: `A tiny pawn is lost on the board. Tell him which file (column) he's standing on!`,
      prompt: `Which letter is the highlighted square's file?`,
      answer: file,
      choices,
      visual: <MiniBoard highlight={{ file: fileIdx, rank }} />,
    };
  }

  if (variant === 1) {
    // Count the friends
    const target = PIECES[seed % PIECES.length];
    const count = 2 + (seed % 4); // 2..5
    const filler = PIECES.filter((p) => p.id !== target.id);
    const items: { glyph: string; key: string }[] = [];
    for (let i = 0; i < count; i++) items.push({ glyph: target.glyph, key: `t${i}` });
    const distractors = 4 + (seed % 3);
    for (let i = 0; i < distractors; i++) {
      const d = filler[(seed + i) % filler.length];
      items.push({ glyph: d.glyph, key: `d${i}` });
    }
    // shuffle deterministically
    const shuffled = items
      .map((it, i) => ({ it, k: (seed + i * 17) % 97 }))
      .sort((a, b) => a.k - b.k)
      .map((x) => x.it);

    const choices = [count, count + 1, Math.max(0, count - 1), count + 2]
      .filter((v, i, a) => a.indexOf(v) === i)
      .slice(0, 4)
      .sort((a, b) => a - b)
      .map((n) => ({ value: String(n), label: String(n) }));

    return {
      intro: `The farm friends are mixed up! Count carefully and tell Mariposa how many ${target.name}s you see.`,
      prompt: `How many ${target.name}s are there?`,
      answer: String(count),
      choices,
      visual: (
        <div className="flex max-w-xs flex-wrap justify-center gap-2 text-3xl text-ink">
          {shuffled.map((it) => (
            <span key={it.key} className="leading-none">{it.glyph}</span>
          ))}
        </div>
      ),
    };
  }

  // variant === 2: Match the piece by name
  const target = PIECES[seed % PIECES.length];
  const choices = PIECES
    .map((p, i) => ({ p, k: (seed + i * 13) % 97 }))
    .sort((a, b) => a.k - b.k)
    .slice(0, 4)
    .map(({ p }) => ({ value: p.id, label: p.glyph }));
  if (!choices.find((c) => c.value === target.id)) {
    choices[0] = { value: target.id, label: target.glyph };
  }
  return {
    intro: `Tuck the king in safely — but first, can you spot the right piece?`,
    prompt: `Tap the ${target.name}.`,
    answer: target.id,
    choices,
  };
}

function MiniBoard({ highlight }: { highlight: { file: number; rank: number } }) {
  const squares: React.ReactNode[] = [];
  for (let r = 7; r >= 0; r--) {
    for (let f = 0; f < 8; f++) {
      const dark = (r + f) % 2 === 1;
      const hi = highlight.file === f && highlight.rank === r;
      squares.push(
        <div
          key={`${f}-${r}`}
          className={`grid h-7 w-7 place-items-center ${
            hi
              ? "bg-shard-sun text-ink font-black animate-pulse"
              : dark
                ? "bg-ink/70"
                : "bg-parchment"
          }`}
        >
          {hi ? "★" : null}
        </div>,
      );
    }
  }
  return (
    <div className="grid grid-cols-8 rounded-md border-2 border-ink/30">
      {squares}
    </div>
  );
}
