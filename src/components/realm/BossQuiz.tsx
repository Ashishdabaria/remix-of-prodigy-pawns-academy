import { useMemo, useState } from "react";
import { BOSS_QUESTIONS, type BossQuestion } from "@/data/realm1/boss";
import { MariposaSay } from "./MariposaSay";

interface BossQuizProps {
  onVictory: () => void;
  onMiss: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function BossQuiz({ onVictory, onMiss }: BossQuizProps) {
  const [round, setRound] = useState(0);
  const questions = useMemo<BossQuestion[]>(() => shuffle(BOSS_QUESTIONS), [round]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [feedbackNonce, setFeedbackNonce] = useState(0);
  const q = questions[idx];

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    setFeedbackNonce((n) => n + 1);
    const correct = i === q.correctIndex;
    if (correct) setCorrectCount((c) => c + 1);
    else onMiss();

    setTimeout(() => {
      if (idx + 1 >= questions.length) {
        const passed = correctCount + (correct ? 1 : 0) >= 4;
        if (passed) onVictory();
        else {
          // gentle replay
          setRound((r) => r + 1);
          setIdx(0);
          setPicked(null);
          setCorrectCount(0);
        }
      } else {
        setIdx(idx + 1);
        setPicked(null);
      }
    }, 1500);
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="rounded-3xl border-2 border-ink/15 bg-card p-6 card-pop">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-black uppercase tracking-widest text-parchment">
            Boss Battle
          </span>
          <span className="text-sm font-bold text-ink/70">
            {idx + 1} / {questions.length} • Correct {correctCount}
          </span>
        </div>

        <div className="mt-5 flex items-center gap-4 rounded-2xl bg-shard-amethyst/15 p-4">
          <div className="text-5xl" aria-hidden>🗿</div>
          <div>
            <h3 className="font-display text-2xl font-black">The Board Guardian</h3>
            <p className="text-sm text-ink/75">
              "A friendly quiz, brave hero. Answer four of five and the Pearl Shard is yours."
            </p>
          </div>
        </div>

        <h4 className="mt-6 font-display text-2xl font-black">{q.prompt}</h4>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {q.options.map((opt, i) => {
            const isPick = picked === i;
            const isCorrect = picked !== null && i === q.correctIndex;
            const isWrongPick = isPick && i !== q.correctIndex;
            return (
              <button
                key={opt}
                type="button"
                disabled={picked !== null}
                onClick={() => pick(i)}
                className={`rounded-2xl border-2 px-4 py-4 text-left font-display text-lg font-black transition
                  ${isCorrect ? "border-shard-emerald bg-shard-emerald/25" : ""}
                  ${isWrongPick ? "border-rose bg-rose/15" : ""}
                  ${picked === null ? "border-ink/20 bg-parchment/70 hover:-translate-y-0.5 hover:bg-shard-sun/20" : ""}
                  disabled:cursor-not-allowed`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div className="mt-4 rounded-xl bg-parchment/70 p-3 text-sm font-semibold text-ink/80">
            {q.explain}
          </div>
        )}
      </div>

      <aside className="space-y-3">
        <MariposaSay moment="BOSS_INTRO" />
        {picked !== null && picked === q.correctIndex && (
          <div className="rounded-2xl border-2 border-shard-emerald/60 bg-shard-emerald/15 p-3">
            <MariposaSay moment="BOSS_CORRECT" nonce={feedbackNonce} size={56} />
          </div>
        )}
        {picked !== null && picked !== q.correctIndex && (
          <div className="rounded-2xl border-2 border-rose/60 bg-rose/10 p-3">
            <MariposaSay moment="BOSS_MISSED" nonce={feedbackNonce} size={56} />
            <div className="mt-2 text-xs font-bold text-rose">+1 Brave Heart 💖</div>
          </div>
        )}
      </aside>
    </div>
  );
}
