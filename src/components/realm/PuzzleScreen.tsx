import { useMemo, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { MariposaSay } from "./MariposaSay";

interface PuzzleScreenProps {
  title: string;
  text: string;
  fen: string;
  /** Accepted moves in long-algebraic ("e2e4") form. */
  solution: string[];
  onComplete: (stars: number) => void;
  isSaving?: boolean;
}

export function PuzzleScreen({ title, text, fen, solution, onComplete, isSaving }: PuzzleScreenProps) {
  const game = useMemo(() => new Chess(fen), [fen]);
  const [position, setPosition] = useState(fen);
  const [attempts, setAttempts] = useState(0);
  const [status, setStatus] = useState<"idle" | "wrong" | "right">("idle");
  const [missNonce, setMissNonce] = useState(0);

  function reset() {
    game.load(fen);
    setPosition(fen);
    setStatus("idle");
  }

  function handlePieceDrop({
    sourceSquare,
    targetSquare,
  }: {
    sourceSquare: string;
    targetSquare: string | null;
  }): boolean {
    if (!targetSquare) return false;
    const attempted = `${sourceSquare}${targetSquare}`;
    const accepted = solution.some((s) => s.toLowerCase().startsWith(attempted.toLowerCase()));

    if (!accepted) {
      setAttempts((a) => a + 1);
      setStatus("wrong");
      setMissNonce((n) => n + 1);
      // gentle retry — don't penalise
      window.setTimeout(reset, 700);
      return false;
    }

    // Apply the move
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      if (!move) {
        reset();
        return false;
      }
      setPosition(game.fen());
      setStatus("right");
      // 3 stars first try, 2 with one miss, 1 with more
      const stars = attempts === 0 ? 3 : attempts === 1 ? 2 : 1;
      window.setTimeout(() => onComplete(stars), 900);
      return true;
    } catch {
      reset();
      return false;
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <header className="mb-4 text-center">
        <h1 className="font-display text-3xl font-black text-ink ink-shadow sm:text-4xl">{title}</h1>
      </header>

      <div className="rounded-2xl border-2 border-ink/15 bg-shard-amethyst/10 p-4 card-pop">
        {status === "wrong" ? (
          <MariposaSay moment="MISSED" nonce={missNonce} size={56} />
        ) : status === "right" ? (
          <MariposaSay moment="CORRECT" size={56} />
        ) : (
          <MariposaSay moment="PUZZLE_INTRO" text={text} size={56} />
        )}
      </div>

      <div className="mt-5 rounded-2xl border-2 border-ink/15 bg-parchment p-3 card-pop">
        <div className="mx-auto aspect-square w-full max-w-md">
          <Chessboard
            options={{
              position,
              onPieceDrop: handlePieceDrop,
              allowDragging: status !== "right",
              id: "puzzle-board",
              boardStyle: status === "wrong"
                ? { boxShadow: "0 0 0 4px hsl(0 80% 60% / 0.6)", borderRadius: "0.5rem" }
                : undefined,
            }}
          />
        </div>
        {isSaving && (
          <div className="mt-2 text-center text-xs font-bold text-ink/60">Saving your win…</div>
        )}
      </div>
    </div>
  );
}
