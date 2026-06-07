import { useMemo, useRef, useState } from "react";
import { Chess, type Square } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import { MariposaSay } from "./MariposaSay";

type TaskKind = "push" | "double" | "capture";

interface Task {
  id: TaskKind;
  title: string;
  instruction: string;
  fen: string;
  spotlight: Square;
  /** Allowed destination squares for success. */
  targets: Square[];
  /** Squares to additionally render a star on (visual hint). */
  hintSquares?: Square[];
  /** If true, the move MUST be a capture. */
  mustCapture?: boolean;
  mariposaHint: string;
}

const TASKS: Task[] = [
  {
    id: "push",
    title: "Task 1 — Push the Pawn",
    instruction: "March your pawn forward ONE square. Forward, never back!",
    fen: "4k3/8/8/8/8/8/4P3/4K3 w - - 0 1",
    spotlight: "e2",
    targets: ["e3"],
    hintSquares: ["e3"],
    mariposaHint: "Just one little step forward — tap or drag the pawn to e3.",
  },
  {
    id: "double",
    title: "Task 2 — Two-Square Start",
    instruction: "On its very first move, a pawn is so excited it can leap TWO squares!",
    fen: "4k3/8/8/8/8/8/3P4/4K3 w - - 0 1",
    spotlight: "d2",
    targets: ["d4"],
    hintSquares: ["d4"],
    mariposaHint: "Big leap! From d2 all the way to d4.",
  },
  {
    id: "capture",
    title: "Task 3 — Diagonal Snack",
    instruction: "Pawns capture DIAGONALLY. Grab an enemy piece from the side!",
    // White pawn e4; black knight d5 and black bishop f5 — both capturable.
    fen: "4k3/8/8/3n1b2/4P3/8/8/4K3 w - - 0 1",
    spotlight: "e4",
    targets: ["d5", "f5"],
    hintSquares: ["d5", "f5"],
    mustCapture: true,
    mariposaHint: "Sneak diagonally — exd5 or exf5!",
  },
];

// Tiny gold star as a data-URI background so we can paint it on any square via squareStyles.
const STAR_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
       <path d='M12 2.5l2.95 6.0 6.6.95-4.78 4.65 1.13 6.55L12 17.6 6.1 20.65l1.13-6.55L2.45 9.45l6.6-.95z'
             fill='%23f5b302' stroke='%237a4a00' stroke-width='1' stroke-linejoin='round'/>
     </svg>`,
  );

interface PawnDojoProps {
  onComplete: () => void;
  onMiss: () => void;
}

export function PawnDojo({ onComplete, onMiss }: PawnDojoProps) {
  const [idx, setIdx] = useState(0);
  const task = TASKS[idx];
  const gameRef = useRef(new Chess(task.fen));
  const [position, setPosition] = useState(task.fen);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "miss">("idle");
  const [feedbackNonce, setFeedbackNonce] = useState(0);
  const [done, setDone] = useState(false);

  // Recompute board when task changes
  useMemo(() => {
    gameRef.current = new Chess(task.fen);
    setPosition(task.fen);
    setFeedback("idle");
    setDone(false);
  }, [task.fen]);

  const squareStyles = useMemo<Record<string, React.CSSProperties>>(() => {
    const styles: Record<string, React.CSSProperties> = {};
    // Spotlight the pawn we're learning about.
    styles[task.spotlight] = {
      boxShadow: "inset 0 0 0 4px var(--color-shard-sun)",
    };
    // Paint stars on target / hint squares.
    const stars = new Set<Square>([
      ...(task.hintSquares ?? []),
      ...task.targets,
    ]);
    for (const sq of stars) {
      styles[sq] = {
        backgroundImage: `url("${STAR_SVG}")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "65%",
        boxShadow: task.mustCapture
          ? "inset 0 0 0 4px var(--color-shard-emerald)"
          : "inset 0 0 0 3px color-mix(in oklab, var(--color-shard-sun) 70%, transparent)",
      };
    }
    return styles;
  }, [task]);

  function advance() {
    if (idx + 1 >= TASKS.length) {
      onComplete();
    } else {
      setIdx(idx + 1);
    }
  }

  function handleDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
    if (done || !targetSquare) return false;
    const game = gameRef.current;

    // Must use the spotlight pawn.
    if (sourceSquare !== task.spotlight) {
      flashMiss();
      return false;
    }

    let move;
    try {
      move = game.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
    } catch {
      flashMiss();
      return false;
    }
    if (!move) {
      flashMiss();
      return false;
    }

    const okTarget = task.targets.includes(targetSquare as Square);
    const okCapture = task.mustCapture ? !!move.captured : true;

    if (!okTarget || !okCapture) {
      // Legal but wrong kind of move — undo & count as miss.
      game.undo();
      flashMiss();
      return false;
    }

    setPosition(game.fen());
    setFeedback("correct");
    setFeedbackNonce((n) => n + 1);
    setDone(true);
    setTimeout(advance, 1200);
    return true;
  }

  function flashMiss() {
    setFeedback("miss");
    setFeedbackNonce((n) => n + 1);
    onMiss();
  }

  return (
    <section
      aria-label="Pawn Dojo — three pawn tasks"
      className="grid gap-5 lg:grid-cols-[1fr_320px]"
    >
      <div className="rounded-2xl border-2 border-ink/15 bg-card p-3 card-pop">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-2xl font-black">{task.title}</h3>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={TASKS.length}
            aria-valuenow={idx + (done ? 1 : 0)}
            aria-label={`Pawn task ${idx + 1} of ${TASKS.length}`}
            className="flex items-center gap-1"
          >
            {TASKS.map((t, i) => (
              <span
                key={t.id}
                className={`h-2.5 w-6 rounded-full ${
                  i < idx ? "bg-shard-emerald" : i === idx ? "bg-ink" : "bg-ink/15"
                }`}
              />
            ))}
          </div>
        </div>
        <p className="mt-1 text-sm text-ink/75">{task.instruction}</p>

        <div className="mx-auto mt-3 w-full max-w-[480px]">
          <Chessboard
            options={{
              id: `pawn-dojo-${task.id}`,
              position,
              onPieceDrop: handleDrop,
              squareStyles,
              animationDurationInMs: 200,
              boardStyle: { borderRadius: 12, overflow: "hidden" },
            }}
          />
        </div>

        <p className="mt-3 text-xs font-bold text-ink/55">
          ★ shows where your pawn can land. Drag the pawn onto a star.
        </p>
      </div>

      <aside className="space-y-3">
        <MariposaSay moment="LESSON_START" text={task.mariposaHint} />
        {feedback === "correct" && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border-2 border-shard-emerald/60 bg-shard-emerald/15 p-3"
          >
            <MariposaSay moment="CORRECT" nonce={feedbackNonce} size={56} />
          </div>
        )}
        {feedback === "miss" && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border-2 border-rose/60 bg-rose/10 p-3"
          >
            <MariposaSay moment="MISSED" nonce={feedbackNonce} size={56} />
            <div className="mt-2 text-xs font-bold text-rose">
              +1 Brave Heart 💖 — try a star square!
            </div>
          </div>
        )}
      </aside>
    </section>
  );
}
