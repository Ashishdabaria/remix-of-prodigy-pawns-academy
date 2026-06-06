import { useMemo, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import type { Puzzle } from "@/data/realm1/puzzles";
import { MariposaSay } from "./MariposaSay";

interface PuzzleBoardProps {
  puzzle: Puzzle;
  index: number;
  total: number;
  onSolve: () => void;
  onMiss: () => void;
}

export function PuzzleBoard({ puzzle, index, total, onSolve, onMiss }: PuzzleBoardProps) {
  const gameRef = useRef(new Chess(puzzle.fen));
  const [position, setPosition] = useState(puzzle.fen);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "miss">("idle");
  const [feedbackNonce, setFeedbackNonce] = useState(0);
  const [done, setDone] = useState(false);

  const squareStyles = useMemo<Record<string, React.CSSProperties>>(() => {
    if (!showHint) return {};
    return {
      [puzzle.solution.from]: {
        boxShadow: "inset 0 0 0 4px var(--color-shard-sun)",
      },
    };
  }, [showHint, puzzle]);

  function handleDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
    if (done || !targetSquare) return false;
    const game = gameRef.current;
    let result;
    try {
      result = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: puzzle.solution.promotion ?? "q",
      });
    } catch {
      return false;
    }
    if (!result) return false;

    const isCorrect =
      sourceSquare === puzzle.solution.from &&
      targetSquare === puzzle.solution.to &&
      game.isCheckmate();

    if (isCorrect) {
      setPosition(game.fen());
      setFeedback("correct");
      setFeedbackNonce((n) => n + 1);
      setDone(true);
      setTimeout(onSolve, 1300);
      return true;
    }

    // Wrong — undo & count as miss
    game.undo();
    setFeedback("miss");
    setFeedbackNonce((n) => n + 1);
    onMiss();
    return false;
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
      <div className="rounded-2xl border-2 border-ink/15 bg-card p-3 card-pop">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-2xl font-black">Puzzle {index + 1} of {total}</h3>
          <span className="rounded-full bg-ink px-3 py-1 text-[11px] font-black uppercase tracking-widest text-parchment">
            {puzzle.theme}
          </span>
        </div>
        <p className="mt-1 text-sm text-ink/75">White to move — mate in 1!</p>
        <div className="mx-auto mt-3 w-full max-w-[480px]">
          <Chessboard
            options={{
              id: puzzle.id,
              position,
              onPieceDrop: handleDrop,
              squareStyles,
              animationDurationInMs: 200,
              boardStyle: { borderRadius: 12, overflow: "hidden" },
            }}
          />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setShowHint(true)}
            className="rounded-full border-2 border-ink/30 bg-parchment/80 px-4 py-1.5 text-sm font-black text-ink"
          >
            💡 Hint
          </button>
          {!done && (
            <button
              type="button"
              onClick={() => {
                onMiss();
                onSolve();
              }}
              className="rounded-full border-2 border-ink/15 px-4 py-1.5 text-xs font-bold text-ink/60"
            >
              Skip (Brave Heart)
            </button>
          )}
        </div>
      </div>

      <aside className="space-y-3">
        <MariposaSay moment="PUZZLE_INTRO" />
        {showHint && (
          <div className="rounded-2xl border-2 border-shard-sun/60 bg-shard-sun/15 p-3">
            <MariposaSay moment="PUZZLE_HINT" text={puzzle.hint} size={56} />
          </div>
        )}
        {feedback === "correct" && (
          <div className="rounded-2xl border-2 border-shard-emerald/60 bg-shard-emerald/15 p-3">
            <MariposaSay moment="CORRECT" nonce={feedbackNonce} size={56} />
            <div className="mt-2 text-xs font-bold text-shard-emerald">+40 XP, +5 Gold 🪙</div>
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
