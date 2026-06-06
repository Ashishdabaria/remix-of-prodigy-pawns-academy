import { useState } from "react";
import { VALUE_QUESTIONS, PIECE_VALUES } from "@/data/realm1/lessons";
import { MariposaSay } from "./MariposaSay";

interface ValueLessonProps {
  onComplete: () => void;
  onMiss: () => void;
}

export function ValueLesson({ onComplete, onMiss }: ValueLessonProps) {
  const [idx, setIdx] = useState(0);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "miss">("idle");
  const [feedbackNonce, setFeedbackNonce] = useState(0);
  const q = VALUE_QUESTIONS[idx];

  if (!q) return null;
  const best = q.options.reduce((a, b) => (a.value >= b.value ? a : b));

  function pick(optIndex: number) {
    const choice = q.options[optIndex];
    if (choice.value === best.value) {
      setFeedback("correct");
      setFeedbackNonce((n) => n + 1);
      setTimeout(() => {
        if (idx + 1 >= VALUE_QUESTIONS.length) onComplete();
        else {
          setIdx(idx + 1);
          setFeedback("idle");
        }
      }, 900);
    } else {
      setFeedback("miss");
      setFeedbackNonce((n) => n + 1);
      onMiss();
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border-2 border-ink/15 bg-card p-5 card-pop">
        <h3 className="font-display text-2xl font-black">Lesson 3 — Piece values</h3>
        <p className="mt-1 text-sm text-ink/75">{q.prompt}</p>

        <div className="mt-5 grid grid-cols-2 gap-4">
          {q.options.map((o, i) => (
            <button
              key={o.label}
              type="button"
              onClick={() => pick(i)}
              className="group flex flex-col items-center gap-2 rounded-2xl border-2 border-ink/20 bg-parchment/70 p-6 transition-transform hover:-translate-y-1 hover:bg-shard-sun/20 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/60"
            >
              <span className="text-7xl" aria-hidden>{o.piece}</span>
              <span className="font-display text-lg font-black">{o.label}</span>
              <span className="text-xs font-bold text-ink/60">Tap to choose</span>
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-xl bg-parchment/60 p-3">
          <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Values cheat sheet</div>
          <div className="mt-2 flex flex-wrap gap-3">
            {PIECE_VALUES.map((p) => (
              <span key={p.name} className="inline-flex items-center gap-1 rounded-full border-2 border-ink/20 bg-card px-3 py-1 text-sm font-bold">
                <span className="text-lg" aria-hidden>{p.piece}</span>
                <span>{p.name}</span>
                <span className="text-ink/60">= {p.value}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 text-xs font-bold text-ink/60">
          Question {idx + 1} of {VALUE_QUESTIONS.length}
        </div>
      </div>

      <aside className="space-y-3">
        <MariposaSay moment="LESSON_START" />
        {feedback === "correct" && (
          <div className="rounded-2xl border-2 border-shard-emerald/60 bg-shard-emerald/15 p-3">
            <MariposaSay moment="CORRECT" nonce={feedbackNonce} size={56} />
          </div>
        )}
        {feedback === "miss" && (
          <div className="rounded-2xl border-2 border-rose/60 bg-rose/10 p-3">
            <MariposaSay moment="MISSED" nonce={feedbackNonce} size={56} />
            <div className="mt-2 text-xs font-bold text-rose">+1 Brave Heart 💖 try again!</div>
          </div>
        )}
      </aside>
    </div>
  );
}
