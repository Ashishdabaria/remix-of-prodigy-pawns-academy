import { createFileRoute, Link } from "@tanstack/react-router";
import { Mariposa } from "@/components/Mariposa";
import { Buddy } from "@/components/Buddy";
import { CrownProgress } from "@/components/CrownProgress";
import { ShardBadge } from "@/components/ShardBadge";
import { REALMS, SHARDS } from "@/data/realms";
import { STUDENT, DAILY_QUESTS, WEEKLY_QUESTS, SIDE_QUESTS, NEXT_BOSS } from "@/data/student";
import { BADGES } from "@/data/badges";

export const Route = createFileRoute("/student")({
  head: () => ({
    meta: [
      { title: "My Quest — Prodigy Pawns" },
      { name: "description", content: "Your hero dashboard: shards, XP, gold, gems, Brave Hearts, daily quests, and the next boss battle." },
      { property: "og:title", content: "My Quest — Prodigy Pawns" },
      { property: "og:description", content: "Track your adventure through the Kingdom of 64 Realms." },
    ],
  }),
  component: StudentDashboard,
});

function Stat({ label, value, icon, tint }: { label: string; value: string | number; icon: string; tint: string }) {
  return (
    <div className="rounded-2xl border-2 border-ink/15 p-4 card-pop" style={{ background: `color-mix(in oklab, var(--color-${tint}) 18%, var(--color-card))` }}>
      <div className="text-2xl" aria-hidden>{icon}</div>
      <div className="mt-1 font-display text-2xl font-black text-ink">{value}</div>
      <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function StudentDashboard() {
  const currentRealm = REALMS.find((r) => r.id === STUDENT.currentRealmId)!;
  const nextShard = REALMS.find((r) => !STUDENT.shardsCollected.includes(r.shard))!;
  const xpPct = Math.round((STUDENT.xp / STUDENT.xpToNextRank) * 100);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Greeting */}
      <section className="rounded-3xl border-2 border-ink/15 bg-card/80 p-5 card-pop sm:p-7">
        <div className="flex flex-wrap items-center gap-4">
          <Mariposa size={80} />
          <Buddy size={56} label="Buddy" />
          <div className="flex-1">
            <h1 className="font-display text-3xl font-black ink-shadow sm:text-4xl">Hi {STUDENT.name}!</h1>
            <p className="text-ink/75">You're a <strong>{SHARDS[currentRealm.shard].rank}</strong> exploring <strong>{currentRealm.name}</strong>.</p>
          </div>
          <Link
            to="/realm/$realmId"
            params={{ realmId: currentRealm.id }}
            className="rounded-full bg-ink px-4 py-2 text-sm font-black text-parchment"
          >
            Continue quest →
          </Link>
        </div>

        <div className="mt-5 rounded-2xl border-2 border-ink/15 bg-parchment/70 p-4">
          <div className="mb-3 text-center text-[11px] font-black uppercase tracking-widest text-muted-foreground">
            Crown Progress — collect all 8 to graduate
          </div>
          <CrownProgress collected={STUDENT.shardsCollected} size="md" />
        </div>
      </section>

      {/* Stats */}
      <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="XP" value={STUDENT.xp} icon="✦" tint="shard-sun" />
        <Stat label="Gold Coins" value={STUDENT.gold} icon="🪙" tint="shard-amber" />
        <Stat label="Gems" value={STUDENT.gems} icon="💎" tint="shard-sapphire" />
        <Stat label="Brave Hearts" value={STUDENT.braveHearts} icon="♥" tint="rose" />
      </section>

      {/* XP bar */}
      <section className="mt-5 rounded-2xl border-2 border-ink/15 bg-card p-5 card-pop">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-black">Next rank</h2>
          <div className="text-sm font-bold text-ink/70">{STUDENT.xp} / {STUDENT.xpToNextRank} XP</div>
        </div>
        <div className="mt-3 h-4 overflow-hidden rounded-full border-2 border-ink/20 bg-parchment">
          <div className="h-full rounded-full bg-gradient-to-r from-shard-sun to-shard-amber" style={{ width: `${xpPct}%` }} />
        </div>
        <div className="mt-2 flex items-center gap-2 text-sm">
          <span>Next up:</span>
          <ShardBadge shardId={nextShard.shard} size="sm" showLabel />
          <span className="text-ink/70">({SHARDS[nextShard.shard].rank})</span>
        </div>
      </section>

      {/* Brave Heart banner */}
      <section className="mt-5 rounded-3xl border-2 border-dashed border-rose/60 bg-rose/10 p-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="text-3xl" aria-hidden>♥</div>
          <div>
            <div className="font-display text-xl font-black">Great try! Brave Hearts earned today: +3</div>
            <p className="text-sm text-ink/75">No hero leaves empty-handed. Every brave attempt counts.</p>
          </div>
        </div>
      </section>

      {/* Quests + Boss */}
      <section className="mt-5 grid gap-5 lg:grid-cols-3">
        <QuestColumn title="Daily Quests" items={DAILY_QUESTS} />
        <QuestColumn title="Weekly Quests" items={WEEKLY_QUESTS} />
        <div className="rounded-2xl border-2 border-ink/15 bg-shard-amethyst/10 p-5 card-pop">
          <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Next boss battle</div>
          <h3 className="mt-1 font-display text-2xl font-black">{NEXT_BOSS.bossName}</h3>
          <p className="mt-1 text-sm text-ink/70">In the {NEXT_BOSS.realmName}</p>
          <Link
            to="/realm/$realmId"
            params={{ realmId: NEXT_BOSS.realmId }}
            className="mt-4 inline-block rounded-full bg-ink px-4 py-2 text-sm font-black text-parchment"
          >
            Prepare for battle →
          </Link>
        </div>
      </section>

      {/* Side Quests */}
      <section className="mt-5 rounded-2xl border-2 border-ink/15 bg-card p-5 card-pop">
        <h2 className="font-display text-xl font-black">Side Quests</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {SIDE_QUESTS.map((q) => (
            <div key={q.id} className="rounded-xl border-2 border-dashed border-ink/20 bg-parchment/60 p-3">
              <div className="font-bold">⚑ {q.title}</div>
              <div className="text-xs text-ink/60">{q.reward}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Badges */}
      <section className="mt-5 rounded-2xl border-2 border-ink/15 bg-card p-5 card-pop">
        <h2 className="font-display text-xl font-black">Badges</h2>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {BADGES.map((b) => (
            <div key={b.id} className={`flex items-center gap-3 rounded-xl border-2 border-ink/15 p-3 ${b.earned ? "bg-shard-sun/15" : "bg-muted/60 opacity-70"}`}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-parchment text-2xl border-2 border-ink/20" aria-hidden>{b.icon}</div>
              <div>
                <div className="font-display font-black leading-tight">{b.name}</div>
                <div className="text-[11px] text-ink/60">{b.blurb}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Avatar shop preview */}
      <section className="mt-5 rounded-2xl border-2 border-ink/15 bg-card p-5 card-pop">
        <h2 className="font-display text-xl font-black">Hero Shop</h2>
        <p className="text-sm text-ink/70">Spend Gold Coins on capes, crowns, and pet companions.</p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: "🧥", name: "Royal Cape", price: 120 },
            { icon: "👑", name: "Mini Crown", price: 240 },
            { icon: "🐉", name: "Baby Dragon", price: 500 },
            { icon: "🦋", name: "Mariposa Charm", price: 350 },
          ].map((item) => (
            <div key={item.name} className="rounded-xl border-2 border-ink/15 bg-parchment/60 p-3 text-center">
              <div className="text-3xl" aria-hidden>{item.icon}</div>
              <div className="mt-1 font-display font-black">{item.name}</div>
              <div className="text-xs text-ink/70">🪙 {item.price}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function QuestColumn({ title, items }: { title: string; items: { id: string; title: string; reward: string; done?: boolean }[] }) {
  return (
    <div className="rounded-2xl border-2 border-ink/15 bg-card p-5 card-pop">
      <h2 className="font-display text-xl font-black">{title}</h2>
      <ul className="mt-3 space-y-2">
        {items.map((q) => (
          <li key={q.id} className={`flex items-start gap-3 rounded-xl border-2 border-ink/10 p-3 ${q.done ? "bg-shard-emerald/15" : "bg-parchment/60"}`}>
            <span className={`mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink/30 text-xs font-black ${q.done ? "bg-shard-emerald text-ink" : "bg-parchment"}`}>
              {q.done ? "✓" : ""}
            </span>
            <div>
              <div className="font-bold text-ink">{q.title}</div>
              <div className="text-xs text-ink/60">{q.reward}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
