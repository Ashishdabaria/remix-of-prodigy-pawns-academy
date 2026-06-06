import { createFileRoute } from "@tanstack/react-router";
import { QuestMap } from "@/components/QuestMap";
import { ShardBadge } from "@/components/ShardBadge";
import { SHARD_ORDER, SHARDS } from "@/data/realms";
import { BADGES } from "@/data/badges";

export const Route = createFileRoute("/poster")({
  head: () => ({
    meta: [
      { title: "Wall Poster — Prodigy Pawns" },
      { name: "description", content: "Printable academy wall poster of the Kingdom of 64 Realms." },
      { property: "og:title", content: "Wall Poster — Prodigy Pawns" },
      { property: "og:description", content: "Print at any size — the full quest map in one giant page." },
    ],
  }),
  component: Poster,
});

function Poster() {
  return (
    <div className="min-h-screen bg-parchment p-6 print:p-0">
      {/* Print control — hidden when printing */}
      <div className="mb-4 flex items-center justify-between print:hidden">
        <a href="/" className="rounded-full border-2 border-ink/30 px-3 py-1.5 text-sm font-black hover:bg-accent">← Back</a>
        <button onClick={() => window.print()} className="rounded-full bg-ink px-4 py-2 text-sm font-black text-parchment">Print poster</button>
      </div>

      {/* Poster canvas — fixed wide aspect for big print */}
      <div className="mx-auto max-w-[1800px] rounded-3xl border-4 border-ink/30 bg-parchment p-6 card-pop print:border-0 print:p-3 print:shadow-none">
        {/* Title banner */}
        <div className="mb-4 text-center">
          <div className="font-display text-xs font-black uppercase tracking-[0.4em] text-ink/70">Prodigy Pawns Academy</div>
          <h1 className="font-display text-4xl font-black text-ink ink-shadow sm:text-6xl">The Kingdom of 64 Realms</h1>
          <p className="mt-1 text-sm text-ink/70 sm:text-base">Collect all 8 Crown Shards. Out-think King Obsidian. Become a Guardian.</p>
        </div>

        {/* Map */}
        <QuestMap interactive={false} />

        {/* Legends */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-ink/20 bg-card p-4">
            <h2 className="font-display text-xl font-black">Crown Shards — Hero Ranks</h2>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
              {SHARD_ORDER.map((id) => (
                <div key={id} className="flex items-center gap-2">
                  <ShardBadge shardId={id} size="sm" />
                  <div className="leading-tight">
                    <div className="text-[11px] font-black">{SHARDS[id].name}</div>
                    <div className="text-[10px] text-ink/60">{SHARDS[id].rank}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border-2 border-ink/20 bg-card p-4">
            <h2 className="font-display text-xl font-black">Achievement Badges</h2>
            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-3">
              {BADGES.map((b) => (
                <div key={b.id} className="flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink/30 bg-parchment text-sm" aria-hidden>{b.icon}</span>
                  <span className="text-[11px] font-bold">{b.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-[10px] font-bold uppercase tracking-widest text-ink/60">
          ✦ Hidden gardens, secret caves & the Astral Academy await beyond the map ✦
        </div>
      </div>
    </div>
  );
}
