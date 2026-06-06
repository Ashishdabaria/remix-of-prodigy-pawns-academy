import { createFileRoute, Link } from "@tanstack/react-router";
import heroCast from "@/assets/hero-cast.jpg";
import kingObsidian from "@/assets/king-obsidian.jpg";
import { Mariposa } from "@/components/Mariposa";
import { ShardBadge } from "@/components/ShardBadge";
import { REALMS, SHARDS, SHARD_ORDER, HIDDEN_AREAS } from "@/data/realms";
import { BADGES } from "@/data/badges";

export const Route = createFileRoute("/codex")({
  head: () => ({
    meta: [
      { title: "The Codex — Prodigy Pawns" },
      { name: "description", content: "The story of the Kingdom of 64 Realms, the 8 Crown Shards, Mariposa the chessboard butterfly, and the heroes who set things right." },
      { property: "og:title", content: "The Codex — Prodigy Pawns" },
      { property: "og:description", content: "Lore, ranks, badges, hidden areas, and our diverse cast of heroes." },
      { property: "og:image", content: heroCast },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroCast },
    ],
  }),
  component: Codex,
});

function Codex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Story */}
      <section className="rounded-3xl border-2 border-ink/15 bg-card/80 p-6 card-pop">
        <div className="flex flex-wrap items-center gap-4">
          <Mariposa size={96} />
          <div>
            <h1 className="font-display text-3xl font-black ink-shadow sm:text-5xl">The Story of the 64 Realms</h1>
            <p className="mt-2 max-w-2xl text-ink/80">
              Long ago, the Kingdom of 64 Realms was kept safe by the Ancient Chess Crown. One day the Crown broke into 8 sparkling Crown Shards, and the realms got jumbled and confused. <strong>King Obsidian, the Puzzle Tyrant</strong>, scrambled the squares so nobody could find their way — mischief, not destruction.
            </p>
            <p className="mt-2 max-w-2xl text-ink/80">
              Young heroes called <strong>Prodigy Pawns</strong> are chosen to set things right. Every student begins as a Pawn Apprentice. By completing quests, solving puzzles, and winning friendly battles, they grow into a mighty <strong>Guardian of the 64 Realms</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Mariposa */}
      <section className="mt-5 rounded-2xl border-2 border-ink/15 bg-shard-amethyst/10 p-6 card-pop">
        <h2 className="font-display text-2xl font-black">Mariposa, Your Butterfly Guide</h2>
        <p className="mt-2 max-w-3xl text-ink/80">
          Born from the last spark of the Ancient Crown, Mariposa carries hope and searches for the chosen heroes. Her wings are patterned like a chessboard and trail soft sparkles. She transforms as you grow — caterpillar to butterfly mirrors Pawn to Guardian — and her wings gain a new gem-colored glow with every Shard you collect.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {REALMS.map((r) => (
            <div key={r.id} className="rounded-xl border-2 border-ink/15 bg-card p-3">
              <ShardBadge shardId={r.shard} size="sm" showLabel />
              <p className="mt-2 text-sm text-ink/80">{r.mariposaForm}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ranks table */}
      <section className="mt-5 rounded-2xl border-2 border-ink/15 bg-card p-6 card-pop">
        <h2 className="font-display text-2xl font-black">The 8 Crown Shards</h2>
        <p className="text-ink/70">Each rank is a Crown Shard, recognized by gem <em>and</em> unique shape — so heroes can tell them apart even without color.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="px-3 py-2">Shape</th>
                <th className="px-3 py-2">Shard</th>
                <th className="px-3 py-2">Hero Rank</th>
                <th className="px-3 py-2">Realm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/10">
              {SHARD_ORDER.map((id) => {
                const s = SHARDS[id];
                const realm = REALMS.find((r) => r.shard === id);
                return (
                  <tr key={id} className="text-sm">
                    <td className="px-3 py-3"><ShardBadge shardId={id} size="sm" /></td>
                    <td className="px-3 py-3 font-bold">{s.name} <span className="text-ink/50">({s.shapeName})</span></td>
                    <td className="px-3 py-3">{s.rank}</td>
                    <td className="px-3 py-3">
                      {realm ? (
                        <Link to="/realm/$realmId" params={{ realmId: realm.id }} className="underline decoration-dotted hover:text-primary">
                          {realm.name}
                        </Link>
                      ) : "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Heroes */}
      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border-2 border-ink/15 card-pop">
          <img src={heroCast} alt="The diverse cast of Prodigy Pawn heroes" width={1536} height={1024} loading="lazy" className="block h-auto w-full" />
        </div>
        <div className="rounded-2xl border-2 border-ink/15 bg-card p-6 card-pop">
          <h2 className="font-display text-2xl font-black">Our Heroes</h2>
          <p className="mt-2 text-ink/80">
            Prodigy Pawns come from every village in every realm. Different skin tones, different hair, different abilities — every one of them a hero. The Kingdom is bigger and brighter because of it.
          </p>
        </div>
      </section>

      {/* Villain */}
      <section className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border-2 border-ink/15 bg-card p-6 card-pop">
          <h2 className="font-display text-2xl font-black">King Obsidian (a friendly menace)</h2>
          <p className="mt-2 text-ink/80">
            He's silly, sneaky, and shows up with a lopsided crown and a pocketful of scrambled chess squares. Think Bowser, not a bad-guy. Heroes don't fight him — they out-think him. When he loses, he laughs and tries to scramble the squares all over again.
          </p>
        </div>
        <div className="overflow-hidden rounded-2xl border-2 border-ink/15 card-pop">
          <img src={kingObsidian} alt="King Obsidian, the silly Puzzle Tyrant" width={1024} height={1024} loading="lazy" className="block h-auto w-full" />
        </div>
      </section>

      {/* Badges */}
      <section className="mt-5 rounded-2xl border-2 border-ink/15 bg-card p-6 card-pop">
        <h2 className="font-display text-2xl font-black">Achievement Badges</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {BADGES.map((b) => (
            <div key={b.id} className="flex items-center gap-3 rounded-xl border-2 border-ink/15 bg-shard-sun/10 p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-parchment text-2xl border-2 border-ink/20" aria-hidden>{b.icon}</div>
              <div>
                <div className="font-display font-black leading-tight">{b.name}</div>
                <div className="text-[11px] text-ink/60">{b.blurb}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hidden areas */}
      <section className="mt-5 rounded-2xl border-2 border-ink/15 bg-shard-emerald/10 p-6 card-pop">
        <h2 className="font-display text-2xl font-black">Hidden & Bonus Areas</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {HIDDEN_AREAS.map((h) => (
            <div key={h.id} className="rounded-xl border-2 border-ink/15 bg-card p-4">
              <div className="text-2xl" aria-hidden>✦</div>
              <h3 className="mt-1 font-display text-lg font-black">{h.name}</h3>
              <p className="text-sm text-ink/70">{h.blurb}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
