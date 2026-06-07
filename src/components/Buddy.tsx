import { useState } from "react";
import { useEquippedPet } from "@/data/pets-state";
import type { Pet } from "@/data/pets";

interface BuddyProps {
  size?: number;
  label?: string;
}

export function Buddy({ size = 56, label }: BuddyProps) {
  const pet = useEquippedPet();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Your companion: ${pet.name}. Tap for details.`}
        className="group relative inline-flex flex-col items-center"
      >
        <span
          className="inline-flex items-center justify-center rounded-full bg-shard-sun/30 ring-2 ring-shard-sun/60 shadow-md transition-transform group-hover:scale-110 animate-bounce"
          style={{ width: size, height: size, fontSize: size * 0.6, animationDuration: "2.2s" }}
          aria-hidden
        >
          {pet.icon}
        </span>
        <span className="pointer-events-none absolute -bottom-1 left-1/2 h-1.5 w-8 -translate-x-1/2 rounded-full bg-ink/20 blur-sm" />
        {label && <span className="mt-1 text-[10px] font-black uppercase tracking-widest text-ink/60">{label}</span>}
      </button>
      {open && <PetDetails pet={pet} onClose={() => setOpen(false)} />}
    </>
  );
}

function PetDetails({ pet, onClose }: { pet: Pet; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4 animate-fade-in" role="dialog" aria-modal="true" aria-label={`${pet.name} details`}>
      <div className="w-full max-w-sm rounded-3xl border-4 border-ink/20 bg-card p-6 card-pop animate-scale-in text-center">
        <div className="mx-auto inline-flex h-24 w-24 items-center justify-center rounded-full bg-shard-sun/30 text-6xl ring-4 ring-shard-sun/60" aria-hidden>
          {pet.icon}
        </div>
        <h3 className="mt-3 font-display text-2xl font-black">{pet.name}</h3>
        <div className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${
          pet.rarity === "legendary" ? "bg-shard-amethyst/30"
          : pet.rarity === "rare" ? "bg-shard-sapphire/30"
          : "bg-shard-emerald/20"
        }`}>{pet.rarity}{pet.memberOnly ? " • 👑 Royal Pass" : ""}</div>
        <p className="mt-3 text-sm text-ink/80">{pet.blurb}</p>
        <button onClick={onClose} className="mt-5 w-full rounded-full bg-ink px-4 py-2 text-sm font-black text-parchment">Close</button>
      </div>
    </div>
  );
}
