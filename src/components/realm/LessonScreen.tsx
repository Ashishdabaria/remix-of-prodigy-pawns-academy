import { Chessboard } from "react-chessboard";
import { MariposaSay } from "./MariposaSay";

interface LessonScreenProps {
  title: string;
  text: string;
  /** FEN string or "start". Omit/empty for no board. */
  board?: string;
  onComplete: () => void;
  isSaving?: boolean;
}

export function LessonScreen({ title, text, board, onComplete, isSaving }: LessonScreenProps) {
  const fen = !board ? undefined : board === "start" ? undefined : board;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <header className="mb-6 text-center">
        <h1 className="font-display text-3xl font-black text-ink ink-shadow sm:text-4xl">{title}</h1>
      </header>

      <div className="grid gap-6 sm:grid-cols-[1fr_1.2fr] sm:items-center">
        <div className="rounded-2xl border-2 border-ink/15 bg-shard-amethyst/10 p-4 card-pop">
          <MariposaSay moment="LESSON_START" text={text} size={64} />
        </div>

        {board !== undefined && (
          <div className="rounded-2xl border-2 border-ink/15 bg-parchment p-3 card-pop">
            <div className="mx-auto aspect-square w-full max-w-sm">
              <Chessboard
                options={{
                  position: fen,
                  allowDragging: false,
                  showAnimations: false,
                  id: "lesson-board",
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onComplete}
          disabled={isSaving}
          className="rounded-full bg-shard-sun px-8 py-3 font-display text-xl font-black text-ink ring-2 ring-ink/20 shadow-xl hover:scale-105 transition-transform disabled:opacity-60"
        >
          {isSaving ? "Saving…" : "Got it! ✓"}
        </button>
      </div>
    </div>
  );
}
