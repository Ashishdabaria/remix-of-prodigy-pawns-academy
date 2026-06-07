import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PETS } from "@/data/pets";
import { useEquippedPet, setEquippedPet } from "@/data/pets-state";

export const Route = createFileRoute("/companions")({
  head: () => ({
    meta: [
      { title: "Companions — Prodigy Pawns" },
      { name: "description", content: "Collect chess-themed pets and pick a buddy to walk the realms with you." },
      { property: "og:title", content: "Companions — Prodigy Pawns" },
      { property: "og:description", content: "Pawnlings, Knight Cubs, Baby Dragons and more — your hero's loyal friends." },
    ],
  }),
  component: CompanionsPage,
});

function CompanionsPage() {
  const [equipped, setEquipped] = useState<string>("pawnling");
  const [unlocked] = useState<Set<string>>(new Set(["pawnling", "knightcub", "bishopowl"]));
  const [memberLock, setMemberLock] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <header className="rounded-3xl border-2 border-ink/15 bg-card/80 p-6 card-pop">
        <h1 className="font-display text-3xl font-black ink-shadow sm:text-4xl">Companions</h1>
        <p className="mt-2 max-w-2xl text-ink/75">Every hero deserves a buddy. Tame wild pawns, hatch rare eggs, and equip one companion to follow you across the 64 realms.</p>
      </header>

      <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PETS.map((p) => {
          const isUnlocked = unlocked.has(p.id);
          const isEquipped = equipped === p.id;
          const locked = p.memberOnly && !isUnlocked;
          return (
            <div
              key={p.id}
              className={`rounded-2xl border-2 p-5 card-pop transition-all ${
                isEquipped ? "border-shard-sun bg-shard-sun/15"
                : locked ? "border-ink/15 bg-muted/50"
                : "border-ink/15 bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="text-5xl" aria-hidden>{p.icon}</div>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
                  p.rarity === "legendary" ? "bg-shard-amethyst/30 text-ink"
                  : p.rarity === "rare" ? "bg-shard-sapphire/30 text-ink"
                  : "bg-shard-emerald/20 text-ink"
                }`}>{p.rarity}</span>
              </div>
              <h3 className="mt-2 font-display text-xl font-black">{p.name}</h3>
              <p className="text-sm text-ink/70">{p.blurb}</p>
              {p.memberOnly && (
                <div className="mt-2 text-[11px] font-black uppercase tracking-widest text-shard-amethyst">👑 Royal Pass</div>
              )}
              <button
                onClick={() => locked ? setMemberLock(p.name) : setEquipped(p.id)}
                disabled={!isUnlocked && !locked}
                className={`mt-4 w-full rounded-full px-4 py-2 text-sm font-black ${
                  isEquipped ? "bg-shard-sun text-ink"
                  : locked ? "bg-shard-amethyst/30 text-ink"
                  : isUnlocked ? "bg-ink text-parchment"
                  : "bg-muted text-ink/50"
                }`}
              >
                {isEquipped ? "✓ Equipped" : locked ? "🔒 Unlock with Royal Pass" : isUnlocked ? "Equip" : "Locked — keep adventuring"}
              </button>
            </div>
          );
        })}
      </section>

      {memberLock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 animate-fade-in" role="dialog" aria-modal="true">
          <div className="w-full max-w-sm rounded-3xl border-4 border-ink/20 bg-card p-6 card-pop animate-scale-in text-center">
            <div className="text-5xl">👑</div>
            <h3 className="mt-2 font-display text-2xl font-black">Royal Pass required</h3>
            <p className="mt-2 text-sm text-ink/75"><strong>{memberLock}</strong> lives in a member-only zone. Ask a grown-up about the Royal Pass to unlock legendary pets and bonus realms.</p>
            <button onClick={() => setMemberLock(null)} className="mt-5 w-full rounded-full bg-ink px-4 py-2 text-sm font-black text-parchment">Got it</button>
          </div>
        </div>
      )}
    </div>
  );
}
