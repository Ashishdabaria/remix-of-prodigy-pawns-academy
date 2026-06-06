import { useMemo, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import type { LessonStep } from "@/data/realm1/lessons";
import { MariposaSay } from "./MariposaSay";

interface ChessboardLessonProps {
  step: LessonStep;
  onComplete: () => void;
  onMiss: () => void;
}

export function ChessboardLesson({ step, onComplete, onMiss }: ChessboardLessonProps) {
  const gameRef = useRef(new Chess(step.fen));
  const [position, setPosition] = useState(step.fen);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "miss">("idle");
  const [feedbackNonce, setFeedbackNonce] = useState(0);
  const [done, setDone] = useState(false);

  const squareStyles = useMemo<Record<string, React.CSSProperties>>(() => {
    const styles: Record<string, React.CSSProperties> = {};
    if (step.spotlightSquare) {
      styles[step.spotlightSquare] = {
        boxShadow: "inset 0 0 0 4px var(--color-shard-sun)",
      };
    }
    if (step.goal.kind === "capture-target") {
      styles[step.goal.targetSquare] = {
        boxShadow: "inset 0 0 0 4px var(--color-shard-emerald)",
        background: "color-mix(in oklab, var(--color-shard-emerald) 25%, transparent)",
      };
    }
    return styles;
  }, [step]);

  function handleDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
    if (done) return false;
    if (!targetSquare) return false;
    const game = gameRef.current;
    let result;
    try {
      result = game.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
    } catch {
      return false;
    }
    if (!result) return false;

    // Evaluate against goal
    if (step.goal.kind === "any-legal-move") {
      setPosition(game.fen());
      succeed();
      return true;
    }
    if (step.goal.kind === "capture-target") {
      if (targetSquare === step.goal.targetSquare && result.captured) {
        setPosition(game.fen());
        succeed();
        return true;
      }
      // legal but wrong — undo and count as miss
      game.undo();
      miss();
      return false;
    }
    return false;
  }

  function succeed() {
    setFeedback("correct");
    setFeedbackNonce((n) => n + 1);
    setDone(true);
    setTimeout(onComplete, 1200);
  }

  function miss() {
    setFeedback("miss");
    setFeedbackNonce((n) => n + 1);
    onMiss();
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border-2 border-ink/15 bg-card p-3 card-pop">
        <h3 className="font-display text-2xl font-black">{step.title}</h3>
        <p className="mt-1 text-sm text-ink/75">{step.instruction}</p>
        <div className="mx-auto mt-3 w-full max-w-[480px]">
          <Chessboard
            options={{
              id: step.id,
              position,
              onPieceDrop: handleDrop,
              squareStyles,
              animationDurationInMs: 200,
              boardStyle: { borderRadius: 12, overflow: "hidden" },
            }}
          />
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
            <div className="mt-2 text-xs font-bold text-rose">+1 Brave Heart 💖</div>
          </div>
        )}
      </aside>
    </div>
  );
}
