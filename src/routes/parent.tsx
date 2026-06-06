import { createFileRoute } from "@tanstack/react-router";
import { Mariposa } from "@/components/Mariposa";
import { PARENT_VIEW } from "@/data/parent";

export const Route = createFileRoute("/parent")({
  head: () => ({
    meta: [
      { title: "For Parents — Prodigy Pawns" },
      { name: "description", content: "See your child's progress through the Kingdom of 64 Realms: shards earned, quests completed, curriculum coverage, and Brave Hearts." },
      { property: "og:title", content: "For Parents — Prodigy Pawns" },
      { property: "og:description", content: "Kind, kid-safe progress overview for parents." },
    ],
  }),
  component: ParentDashboard,
});

function Stat({ label, value, icon }: { label: string; value: string | number; icon: string }) {
  return (
    <div className="rounded-2xl border-2 border-ink/15 bg-card p-4 card-pop">
      <div className="text-2xl" aria-hidden>{icon}</div>
      <div className="mt-1 font-display text-3xl font-black">{value}</div>
      <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function ParentDashboard() {
  const p = PARENT_VIEW;
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <section className="rounded-3xl border-2 border-ink/15 bg-card/80 p-6 card-pop">
        <div className="flex flex-wrap items-center gap-4">
          <Mariposa size={72} />
          <div className="flex-1">
            <h1 className="font-display text-3xl font-black ink-shadow sm:text-4xl">{p.childName}'s adventure</h1>
            <p className="text-ink/75">Current rank: <strong>{p.rankName}</strong> — {p.shardsCollected} of 8 Crown Shards collected.</p>
          </div>
          <button
            onClick={() => window.print()}
            className="rounded-full border-2 border-ink/30 px-4 py-2 text-sm font-black hover:bg-accent"
          >
            Print summary
          </button>
        </div>
      </section>

      <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Weekly quests" value={p.weeklyQuestsCompleted} icon="✦" />
        <Stat label="Puzzles solved" value={p.puzzlesSolved} icon="🧩" />
        <Stat label="Minutes practiced" value={p.minutesPracticed} icon="⏱" />
        <Stat label="Brave Hearts" value={p.braveHearts} icon="♥" />
      </section>

      <section className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border-2 border-ink/15 bg-card p-5 card-pop">
          <h2 className="font-display text-xl font-black">Curriculum mastered</h2>
          <ul className="mt-3 space-y-2">
            {p.curriculumDone.map((c) => (
              <li key={c} className="flex items-start gap-2 rounded-xl bg-shard-emerald/15 p-3">
                <span aria-hidden className="mt-0.5 font-black">✓</span>
                <span className="text-sm font-semibold">{c}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-ink/15 bg-card p-5 card-pop">
          <h2 className="font-display text-xl font-black">Currently practicing</h2>
          <ul className="mt-3 space-y-2">
            {p.curriculumInProgress.map((c) => (
              <li key={c} className="flex items-start gap-2 rounded-xl bg-shard-sun/15 p-3">
                <span aria-hidden className="mt-0.5 font-black">◐</span>
                <span className="text-sm font-semibold">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-5 rounded-3xl border-2 border-dashed border-rose/60 bg-rose/10 p-6">
        <h2 className="font-display text-2xl font-black">About the Brave Heart system</h2>
        <p className="mt-2 max-w-prose text-ink/80">
          Children earn <strong>Brave Heart Points</strong> for trying hard — even in a game they lose. No hero leaves empty-handed. This anti-frustration mechanic keeps kids confident, curious, and coming back. The villain, King Obsidian, is mischievous and silly (think Bowser) — never scary.
        </p>
      </section>

      <section className="mt-5 rounded-2xl border-2 border-ink/15 bg-card p-5 card-pop">
        <h2 className="font-display text-xl font-black">What's next</h2>
        <p className="mt-2 text-ink/80">
          {p.childName} is heading into <strong>The Tactical Mountains</strong> to study forks, pins, and active rooks. Expect a flurry of puzzle solving this week!
        </p>
      </section>
    </div>
  );
}
