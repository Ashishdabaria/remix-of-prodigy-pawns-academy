import { createFileRoute, Link } from "@tanstack/react-router";
import { CURRICULUM, LEVEL_LABEL, type Level } from "@/data/curriculum";
import { BADGES } from "@/data/badges";
import { REALMS, SHARDS } from "@/data/realms";

export const Route = createFileRoute("/curriculum")({
  head: () => ({
    meta: [
      { title: "Chess Mastery Curriculum — Prodigy Pawns" },
      {
        name: "description",
        content:
          "A 15-module grandmaster-designed chess curriculum, gamified across the 8 Crown Shard realms.",
      },
      { property: "og:title", content: "Chess Mastery Curriculum — Prodigy Pawns" },
      { property: "og:description", content: "15 modules across Beginner, Intermediate, and Advanced." },
    ],
  }),
  component: CurriculumPage,
});

const LEVEL_ORDER: Level[] = ["beginner", "intermediate", "advanced"];

function CurriculumPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="text-center">
        <h1 className="font-display text-3xl font-black text-ink ink-shadow sm:text-5xl">
          Chess Mastery Curriculum
        </h1>
        <p className="mt-2 text-sm text-ink/75 sm:text-base">
          15 modules across 3 levels — built on the ChessKid.com foundations and woven into the
          quest for the 8 Crown Shards.
        </p>
      </header>

      <div className="mt-8 space-y-10">
        {LEVEL_ORDER.map((lvl) => {
          const mods = CURRICULUM.filter((m) => m.level === lvl);
          return (
            <section key={lvl}>
              <h2 className="font-display text-2xl font-black text-ink">{LEVEL_LABEL[lvl]}</h2>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {mods.map((m) => {
                  const realm = REALMS.find((r) => r.id === m.realmId)!;
                  const shard = SHARDS[realm.shard];
                  const badge = BADGES.find((b) => b.id === m.badgeId);
                  const playable = m.status === "playable";
                  return (
                    <Link
                      key={m.id}
                      to="/realm/$realmId_/path"
                      params={{ realmId: realm.id }}
                      search={playable ? { module: m.id } : {}}
                      className={`block rounded-2xl border-2 border-ink/15 bg-card p-4 card-pop transition-transform hover:scale-[1.01] ${playable ? "" : "opacity-70"}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                          Module {m.number}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ring-2 ${
                            playable
                              ? "bg-shard-emerald/20 text-ink ring-shard-emerald/40"
                              : "bg-muted text-ink/60 ring-ink/10"
                          }`}
                        >
                          {playable ? "Playable" : "Coming soon"}
                        </span>
                      </div>
                      <h3 className="mt-1 font-display text-lg font-black leading-tight">{m.title}</h3>
                      <p className="mt-1 text-xs text-ink/75">{m.theme}</p>

                      <ul className="mt-2 space-y-0.5 text-[11px] text-ink/70">
                        {m.lessons.map((l) => (
                          <li key={l}>· {l}</li>
                        ))}
                      </ul>

                      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] font-bold">
                        <span className="rounded-full bg-parchment px-2 py-0.5 ring-1 ring-ink/15">
                          {shard.shape} {realm.name}
                        </span>
                        {badge && (
                          <span className="rounded-full bg-shard-sun/30 px-2 py-0.5 ring-1 ring-ink/15">
                            {badge.icon} {badge.name}
                          </span>
                        )}
                        <span className="rounded-full bg-ink/5 px-2 py-0.5 ring-1 ring-ink/10">
                          ⚔ {m.challenge}
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-10 rounded-2xl border-2 border-dashed border-ink/20 bg-parchment/60 p-5 text-center">
        <div className="text-3xl">🏆</div>
        <h3 className="mt-1 font-display text-xl font-black">Grandmaster's Seal</h3>
        <p className="mt-1 text-sm text-ink/75">
          Earn all 15 milestone badges to receive the Grandmaster's Seal — the mark of mastery
          across every Crown Shard realm.
        </p>
      </div>
    </div>
  );
}
