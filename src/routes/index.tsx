import { createFileRoute, Link } from "@tanstack/react-router";
import { QuestMap } from "@/components/QuestMap";
import { CrownProgress } from "@/components/CrownProgress";
import { ShardBadge } from "@/components/ShardBadge";
import { Mariposa } from "@/components/Mariposa";
import { REALMS, SHARDS } from "@/data/realms";
import { STUDENT } from "@/data/student";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Prodigy Pawns — The Kingdom of 64 Realms" },
      { name: "description", content: "A magical chess academy quest map for kids aged 5–12. Collect all 8 Crown Shards and become a Guardian of the 64 Realms." },
      { property: "og:title", content: "Prodigy Pawns — The Kingdom of 64 Realms" },
      { property: "og:description", content: "Adventure through 8 enchanted realms, learn chess, and rebuild the Ancient Crown." },
    ],
  }),
  component: Index,
});

function Index() {
  const current = REALMS.find((r) => r.id === STUDENT.currentRealmId)!;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Hero strip */}
      <section className="mb-6 grid gap-4 rounded-3xl border-2 border-ink/15 bg-card/80 p-5 card-pop sm:p-7 md:grid-cols-[1fr_auto] md:items-center">
        <div className="flex items-start gap-4">
          <Mariposa size={96} />
          <div>
            <h1 className="font-display text-3xl font-black text-ink ink-shadow sm:text-4xl">
              Welcome back, brave hero!
            </h1>
            <p className="mt-1 max-w-prose text-base text-ink/80">
              Mariposa fluttered all the way here to find you. Eight Crown Shards are scattered across the realms — let's bring them home and out-think King Obsidian!
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-ink px-3 py-1 text-xs font-black uppercase tracking-wider text-parchment">
                Currently in: {current.name}
              </span>
              <Link
                to="/realm/$realmId"
                params={{ realmId: current.id }}
                className="rounded-full border-2 border-ink/40 bg-shard-sun/40 px-3 py-1 text-xs font-black text-ink hover:bg-shard-sun/70"
              >
                Continue quest →
              </Link>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border-2 border-ink/15 bg-parchment/70 p-3">
          <div className="mb-2 text-center text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            Crown Progress
          </div>
          <CrownProgress collected={STUDENT.shardsCollected} />
        </div>
      </section>

      {/* The map */}
      <QuestMap />

      {/* Legend */}
      <section className="mt-8">
        <h2 className="font-display text-2xl font-black text-ink ink-shadow sm:text-3xl">The 8 Crown Shards</h2>
        <p className="mt-1 text-ink/70">Every rank is a Shard. Every Shard has a unique shape, so heroes can tell them apart at a glance — even without colors.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {REALMS.map((r) => {
            const shard = SHARDS[r.shard];
            const collected = STUDENT.shardsCollected.includes(r.shard);
            return (
              <Link
                key={r.id}
                to="/realm/$realmId"
                params={{ realmId: r.id }}
                className="group rounded-2xl border-2 border-ink/15 bg-card p-4 card-pop transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <ShardBadge shardId={r.shard} size="md" dim={!collected} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Realm {r.number}</span>
                </div>
                <h3 className="mt-3 font-display text-lg font-black text-ink leading-tight">{r.name}</h3>
                <p className="mt-1 text-sm text-ink/70">{shard.rank}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
