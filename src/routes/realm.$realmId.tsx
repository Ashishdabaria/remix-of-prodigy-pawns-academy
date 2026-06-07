import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getRealm, REALMS, SHARDS, type Realm } from "@/data/realms";
import { ShardBadge } from "@/components/ShardBadge";
import { Mariposa } from "@/components/Mariposa";
import { SideQuest } from "@/components/realm/SideQuest";
import { MiniBossEncounter, BossEncounter, TreasureChest } from "@/components/realm/RealmEncounters";
import { WildEncounter } from "@/components/realm/WildEncounter";
import { MEMBER_REALM_IDS } from "@/data/pets";

export const Route = createFileRoute("/realm/$realmId")({
  loader: ({ params }) => {
    const realm = getRealm(params.realmId);
    if (!realm) throw notFound();
    return { realm };
  },
  head: ({ loaderData }) => {
    const r = loaderData?.realm;
    if (!r) return { meta: [{ title: "Realm not found" }] };
    return {
      meta: [
        { title: `${r.name} — Prodigy Pawns` },
        { name: "description", content: r.tagline },
        { property: "og:title", content: `${r.name} — Prodigy Pawns` },
        { property: "og:description", content: r.tagline },
        { property: "og:image", content: r.image },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: r.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-4xl font-black">Realm not found</h1>
      <p className="mt-2 text-ink/70">Mariposa fluttered the wrong way. Try the quest map!</p>
      <Link to="/" className="mt-6 inline-block rounded-full bg-ink px-5 py-2 font-bold text-parchment">Back to the map</Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-black">This realm hiccuped.</h1>
      <button onClick={reset} className="mt-4 rounded-full bg-ink px-5 py-2 font-bold text-parchment">Try again</button>
    </div>
  ),
  component: RealmPage,
});

function RealmPage() {
  const { realm } = Route.useLoaderData() as { realm: Realm };
  const shard = SHARDS[realm.shard];
  const idx = REALMS.findIndex((r) => r.id === realm.id);
  const prev = REALMS[idx - 1];
  const next = REALMS[idx + 1];
  const [activeQuest, setActiveQuest] = useState<{ index: number; title: string } | null>(null);
  const [completed, setCompleted] = useState<Record<number, boolean>>({});
  const [encounter, setEncounter] = useState<null | "miniBoss" | "boss" | "treasure">(null);
  const [encDone, setEncDone] = useState<{ miniBoss?: boolean; boss?: boolean; treasure?: boolean }>({});
  const [wild, setWild] = useState(false);
  const [memberGate, setMemberGate] = useState(MEMBER_REALM_IDS.has(realm.id));
  const isMemberRealm = MEMBER_REALM_IDS.has(realm.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-10">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-ink/15 card-pop">
        <img src={realm.image} alt={realm.name} width={1280} height={896} className="block h-72 w-full object-cover sm:h-[420px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-end justify-between gap-3 text-parchment sm:bottom-6 sm:left-6 sm:right-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-80">
              <span>Realm {realm.number} of 8</span>
              {isMemberRealm && <span className="rounded-full bg-shard-amethyst/80 px-2 py-0.5 text-[10px] text-parchment">👑 Royal Pass</span>}
            </div>
            <h1 className="font-display text-3xl font-black ink-shadow sm:text-5xl">{realm.name}</h1>
            <p className="mt-1 max-w-2xl text-sm sm:text-base">{realm.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to="/realm/$realmId/play"
                params={{ realmId: realm.id }}
                className="inline-flex items-center gap-2 rounded-full bg-shard-sun px-5 py-2 font-display text-base font-black text-ink shadow-lg ring-2 ring-parchment hover:scale-105 transition-transform"
              >
                ▶ Enter Realm
              </Link>
              <button
                type="button"
                onClick={() => setWild(true)}
                className="inline-flex items-center gap-2 rounded-full bg-parchment/95 px-4 py-2 font-display text-sm font-black text-ink ring-2 ring-ink/20 hover:scale-105 transition-transform"
              >
                ✦ Wild Encounter
              </button>
            </div>
          </div>
          <div className="rounded-2xl bg-parchment/90 p-3 text-ink card-pop">
            <ShardBadge shardId={realm.shard} size="lg" showLabel />
            <div className="mt-1 text-xs font-bold text-ink/70">Hero rank: {shard.rank}</div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {/* What you learn */}
        <section className="rounded-2xl border-2 border-ink/15 bg-card p-5 card-pop lg:col-span-2">
          <h2 className="font-display text-2xl font-black">What you'll learn here</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {realm.curriculum.map((c) => (
              <li key={c} className="flex items-start gap-2 rounded-xl bg-parchment/60 p-3">
                <span aria-hidden className="mt-0.5 text-shard-sun">✦</span>
                <span className="text-sm font-semibold text-ink">{c}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Mariposa */}
        <aside className="rounded-2xl border-2 border-ink/15 bg-shard-amethyst/10 p-5 card-pop">
          <div className="flex items-center gap-3">
            <Mariposa size={72} />
            <h2 className="font-display text-xl font-black">Mariposa here</h2>
          </div>
          <p className="mt-3 text-sm text-ink/80">{realm.mariposaForm}</p>
        </aside>

        {/* Mini-boss */}
        <button
          type="button"
          onClick={() => setEncounter("miniBoss")}
          className={`text-left rounded-2xl border-2 p-5 card-pop hover-scale ${
            encDone.miniBoss ? "border-shard-emerald/60 bg-shard-emerald/15" : "border-ink/15 bg-card"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Mini-boss</div>
            <span className="text-[10px] font-black uppercase tracking-widest text-ink/60">
              {encDone.miniBoss ? "✓ Done" : "Play →"}
            </span>
          </div>
          <h3 className="mt-1 font-display text-xl font-black">🐴 {realm.miniBoss.name}</h3>
          <p className="mt-2 text-sm text-ink/80">{realm.miniBoss.description}</p>
        </button>

        {/* Boss */}
        <button
          type="button"
          onClick={() => setEncounter("boss")}
          className={`text-left rounded-2xl border-2 p-5 card-pop hover-scale ${
            encDone.boss ? "border-shard-emerald/60 bg-shard-emerald/15" : "border-ink/15 bg-shard-sun/15"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Boss battle</div>
            <span className="text-[10px] font-black uppercase tracking-widest text-ink/60">
              {encDone.boss ? "✓ Bested" : "Duel →"}
            </span>
          </div>
          <h3 className="mt-1 font-display text-xl font-black">🗿 {realm.boss.name}</h3>
          <p className="mt-2 text-sm text-ink/80">{realm.boss.description}</p>
        </button>

        {/* Treasure */}
        <button
          type="button"
          onClick={() => setEncounter("treasure")}
          className={`text-left rounded-2xl border-2 p-5 card-pop hover-scale ${
            encDone.treasure ? "border-shard-emerald/60 bg-shard-emerald/15" : "border-ink/15 bg-shard-emerald/10"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Treasure chest</div>
            <span className="text-[10px] font-black uppercase tracking-widest text-ink/60">
              {encDone.treasure ? "✓ Opened" : "Open →"}
            </span>
          </div>
          <h3 className="mt-1 font-display text-lg font-black">🎁 {realm.treasure}</h3>
        </button>


        {/* Side quests */}
        <section className="rounded-2xl border-2 border-ink/15 bg-card p-5 card-pop lg:col-span-3">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <h2 className="font-display text-2xl font-black">Side quests</h2>
            <p className="text-xs font-bold text-ink/60">
              Tap any quest to play a tiny challenge • +20 XP, +5 🪙 each
            </p>
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {realm.sideQuests.map((q, i) => {
              const done = completed[i];
              return (
                <button
                  key={q}
                  type="button"
                  onClick={() => setActiveQuest({ index: i, title: q })}
                  className={`group text-left rounded-xl border-2 border-dashed p-3 text-sm font-semibold transition-all hover-scale ${
                    done
                      ? "border-shard-emerald/60 bg-shard-emerald/15"
                      : "border-ink/20 bg-parchment/60 hover:bg-parchment/90"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span aria-hidden className="text-lg">{done ? "✓" : "⚑"}</span>
                    <span className="flex-1">{q}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-ink">
                      Play →
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {activeQuest && (
        <SideQuest
          questId={`${realm.id}:${activeQuest.index}`}
          questIndex={activeQuest.index}
          title={activeQuest.title}
          reward="+20 XP, +5 🪙"
          onClose={() => {
            setCompleted((c) => ({ ...c, [activeQuest.index]: true }));
            setActiveQuest(null);
          }}
        />
      )}

      {encounter === "miniBoss" && (
        <MiniBossEncounter
          realm={realm}
          onWin={() => setEncDone((d) => ({ ...d, miniBoss: true }))}
          onClose={() => setEncounter(null)}
        />
      )}
      {encounter === "boss" && (
        <BossEncounter
          realm={realm}
          onWin={() => setEncDone((d) => ({ ...d, boss: true }))}
          onClose={() => setEncounter(null)}
        />
      )}
      {encounter === "treasure" && (
        <TreasureChest
          realm={realm}
          onOpen={() => setEncDone((d) => ({ ...d, treasure: true }))}
          onClose={() => setEncounter(null)}
        />
      )}

      {/* Prev / next */}
      <nav className="mt-8 flex flex-wrap items-center justify-between gap-3">
        {prev ? (
          <Link to="/realm/$realmId" params={{ realmId: prev.id }} className="rounded-full bg-ink px-4 py-2 text-sm font-black text-parchment">
            ← Realm {prev.number}: {prev.name}
          </Link>
        ) : <div />}
        <Link to="/" className="rounded-full border-2 border-ink/30 px-4 py-2 text-sm font-black text-ink">Back to map</Link>
        {next ? (
          <Link to="/realm/$realmId" params={{ realmId: next.id }} className="rounded-full bg-ink px-4 py-2 text-sm font-black text-parchment">
            Realm {next.number}: {next.name} →
          </Link>
        ) : <div />}
      </nav>
    </div>
  );
}
