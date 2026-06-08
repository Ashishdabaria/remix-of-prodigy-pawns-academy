import { useMemo, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import { MariposaSay } from "./MariposaSay";

export type QuestGoal =
  | { kind: "move"; from: string; to: string; promotion?: "q" | "n" | "r" | "b" }
  | { kind: "mate-in-1" }
  | { kind: "check" }
  | { kind: "any-of"; moves: { from: string; to: string; promotion?: "q" | "n" | "r" | "b" }[] }
  | { kind: "develop"; from: string; toSquares: string[] };

export interface QuestTask {
  id: string;
  fen: string;
  prompt: string;
  hint: string;
  goal: QuestGoal;
  highlightFrom?: string;
  highlightTo?: string;
  /** Optional theme accent shown above the board */
  badge?: string;
}

interface Props {
  task: QuestTask;
  onSolve: () => void;
  onMiss: () => void;
}

/**
 * Generic single-move puzzle board for Modules 3, 4, 5 (and anywhere else).
 * Always allows a "Skip" path (Brave Heart) so a struggling child never gets stuck.
 */
export function QuestBoard({ task, onSolve, onMiss }: Props) {
  const gameRef = useRef(new Chess(task.fen));
  const [position, setPosition] = useState(task.fen);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "miss">("idle");
  const [nonce, setNonce] = useState(0);
  const [done, setDone] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const squareStyles = useMemo<Record<string, React.CSSProperties>>(() => {
    const s: Record<string, React.CSSProperties> = {};
    if (task.highlightFrom) {
      s[task.highlightFrom] = {
        boxShadow: "inset 0 0 0 4px var(--color-shard-sun)",
      };
    }
    if (task.highlightTo) {
      s[task.highlightTo] = {
        boxShadow: "inset 0 0 0 4px var(--color-shard-emerald)",
        background: "color-mix(in oklab, var(--color-shard-emerald) 25%, transparent)",
      };
    }
    return s;
  }, [task]);

  function evalGoal(from: string, to: string, promotion: string | undefined, result: ReturnType<Chess["move"]>, game: Chess): boolean {
    switch (task.goal.kind) {
      case "move":
        return (
          from === task.goal.from &&
          to === task.goal.to &&
          (!task.goal.promotion || result?.promotion === task.goal.promotion)
        );
      case "any-of":
        return task.goal.moves.some(
          (m) =>
            m.from === from &&
            m.to === to &&
            (!m.promotion || result?.promotion === m.promotion),
        );
      case "mate-in-1":
        return game.isCheckmate();
      case "check":
        return game.inCheck() && !game.isCheckmate();
      case "develop":
        return from === task.goal.from && task.goal.toSquares.includes(to);
    }
  }

  function handleDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
    if (done || !targetSquare) return false;
    const game = gameRef.current;
    let result;
    try {
      result = game.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
    } catch {
      return false;
    }
    if (!result) return false;

    const success = evalGoal(sourceSquare, targetSquare, result.promotion, result, game);
    if (success) {
      setPosition(game.fen());
      setFeedback("correct");
      setNonce((n) => n + 1);
      setDone(true);
      setTimeout(onSolve, 1100);
      return true;
    }
    game.undo();
    setFeedback("miss");
    setNonce((n) => n + 1);
    onMiss();
    return false;
  }

  return (
    <div className="space-y-2">
      <div className="rounded-xl border-2 border-ink/15 bg-card p-2">
        {task.badge && (
          <div className="mb-1 inline-block rounded-full bg-ink px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-parchment">
            {task.badge}
          </div>
        )}
        <p className="px-1 pb-1.5 text-[11px] font-bold text-ink/80">{task.prompt}</p>
        <div className="mx-auto w-full max-w-[320px]">
          <Chessboard
            options={{
              id: task.id,
              position,
              onPieceDrop: handleDrop,
              squareStyles,
              animationDurationInMs: 200,
              boardStyle: { borderRadius: 8, overflow: "hidden" },
            }}
          />
        </div>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setShowHint(true)}
            className="rounded-full border border-ink/25 px-2.5 py-0.5 text-[10px] font-black text-ink"
          >
            💡 Hint
          </button>
          {!done && (
            <button
              type="button"
              onClick={() => {
                onMiss();
                setDone(true);
                setTimeout(onSolve, 200);
              }}
              className="rounded-full border border-ink/15 px-2.5 py-0.5 text-[10px] font-bold text-ink/60"
            >
              Skip (Brave Heart 💖)
            </button>
          )}
        </div>
      </div>
      {showHint && !done && (
        <div className="rounded-xl border-2 border-shard-sun/60 bg-shard-sun/15 p-2">
          <MariposaSay moment="PUZZLE_HINT" text={task.hint} size={40} />
        </div>
      )}
      {feedback === "correct" && (
        <div className="rounded-xl border-2 border-shard-emerald/60 bg-shard-emerald/15 p-2">
          <MariposaSay moment="CORRECT" nonce={nonce} size={40} />
        </div>
      )}
      {feedback === "miss" && !done && (
        <div className="rounded-xl border-2 border-rose/60 bg-rose/10 p-2">
          <MariposaSay moment="MISSED" nonce={nonce} size={40} />
          <div className="mt-1 text-[10px] font-bold text-rose">+1 Brave Heart 💖 — try again!</div>
        </div>
      )}
    </div>
  );
}
