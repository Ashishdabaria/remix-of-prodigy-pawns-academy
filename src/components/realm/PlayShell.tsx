import { Link } from "@tanstack/react-router";
import { MuteToggle } from "./MariposaSay";
import { AmbientLayer } from "./AmbientLayer";

export type StageKey = "portal" | "lesson1" | "lesson2" | "lesson3" | "puzzles" | "boss" | "victory";

const STAGES: { key: StageKey; label: string }[] = [
  { key: "portal", label: "Enter" },
  { key: "lesson1", label: "Moves" },
  { key: "lesson2", label: "Captures" },
  { key: "lesson3", label: "Values" },
  { key: "puzzles", label: "Puzzles" },
  { key: "boss", label: "Boss" },
  { key: "victory", label: "Shard" },
];

interface PlayShellProps {
  realmId: string;
  realmName: string;
  stage: StageKey;
  onSkip?: () => void;
  children: React.ReactNode;
}

export function PlayShell({ realmId, realmName, stage, onSkip, children }: PlayShellProps) {
  const idx = STAGES.findIndex((s) => s.key === stage);
  return (
    <div className="relative mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6">
      <AmbientLayer />
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-ink/15 bg-card/90 p-3 card-pop">
        <div className="flex items-center gap-3">
          <Link
            to="/realm/$realmId"
            params={{ realmId }}
            className="rounded-full border-2 border-ink/30 bg-parchment/80 px-3 py-1 text-xs font-black text-ink"
            aria-label="Back to realm lobby"
          >
            ←
          </Link>
          <div>
            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Playing</div>
            <div className="font-display text-base font-black">{realmName}</div>
          </div>
        </div>

        <ol className="flex flex-1 items-center justify-center gap-1.5 sm:gap-2" aria-label="Progress">
          {STAGES.map((s, i) => {
            const done = i < idx;
            const active = i === idx;
            return (
              <li
                key={s.key}
                aria-current={active ? "step" : undefined}
                className={`flex h-6 items-center gap-1 rounded-full px-2 text-[10px] font-black uppercase tracking-widest
                  ${active ? "bg-ink text-parchment" : done ? "bg-shard-emerald/40 text-ink" : "bg-parchment text-ink/40"}`}
              >
                <span aria-hidden>{done ? "✓" : i + 1}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </li>
            );
          })}
        </ol>

        <div className="flex items-center gap-2">
          <MuteToggle />
          {onSkip && stage !== "victory" && (
            <button
              type="button"
              onClick={onSkip}
              className="rounded-full border-2 border-ink/15 px-3 py-1 text-xs font-bold text-ink/60"
            >
              Skip →
            </button>
          )}
        </div>
      </header>

      <main key={stage} className="animate-fade-in">{children}</main>
    </div>
  );
}
