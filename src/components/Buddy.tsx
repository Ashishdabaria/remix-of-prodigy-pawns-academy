import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useEquippedPet, setEquippedPet } from "@/data/pets-state";
import { PETS, type Pet } from "@/data/pets";

interface BuddyProps {
  size?: number;
  label?: string;
}

const DEFAULT_PET_ID = "pawnling";

export function Buddy({ size = 56, label }: BuddyProps) {
  const pet = useEquippedPet();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Your companion: ${pet.name}. Tap to view details and equip options.`}
        aria-haspopup="dialog"
        aria-expanded={open}
        className="group relative inline-flex flex-col items-center rounded-full focus:outline-none focus-visible:ring-4 focus-visible:ring-shard-sun/60"
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

      <PetDetailsDialog
        pet={pet}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}

function PetDetailsDialog({
  pet,
  open,
  onOpenChange,
}: {
  pet: Pet;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const isEquipped = true; // Buddy only renders the currently equipped pet
  const rarityClass =
    pet.rarity === "legendary"
      ? "bg-shard-amethyst/30"
      : pet.rarity === "rare"
        ? "bg-shard-sapphire/30"
        : "bg-shard-emerald/20";

  const handleUnequip = () => {
    // Swap to the default starter pet so the buddy always has something to show.
    const fallback = PETS.find((p) => p.id !== pet.id) ?? PETS[0];
    setEquippedPet(fallback.id === pet.id ? DEFAULT_PET_ID : fallback.id);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-sm rounded-3xl border-4 border-ink/20 bg-card p-6 text-center card-pop sm:rounded-3xl"
        aria-describedby="buddy-pet-bio"
      >
        <div
          className="mx-auto inline-flex h-24 w-24 items-center justify-center rounded-full bg-shard-sun/30 text-6xl ring-4 ring-shard-sun/60"
          aria-hidden
        >
          {pet.icon}
        </div>
        <DialogTitle className="mt-3 font-display text-2xl font-black">
          {pet.name}
        </DialogTitle>
        <div
          className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-black uppercase tracking-widest ${rarityClass}`}
          aria-label={`Rarity: ${pet.rarity}${pet.memberOnly ? ", Royal Pass exclusive" : ""}`}
        >
          {pet.rarity}
          {pet.memberOnly ? " • 👑 Royal Pass" : ""}
        </div>
        <DialogDescription id="buddy-pet-bio" className="mt-3 text-sm text-ink/80">
          {pet.blurb}
        </DialogDescription>

        <div className="mt-5 flex flex-col gap-2">
          {isEquipped ? (
            <button
              type="button"
              onClick={handleUnequip}
              className="w-full rounded-full bg-shard-sun px-4 py-2 text-sm font-black text-ink focus:outline-none focus-visible:ring-4 focus-visible:ring-shard-sun/60"
            >
              ✓ Equipped — tap to swap buddy
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setEquippedPet(pet.id);
                onOpenChange(false);
              }}
              className="w-full rounded-full bg-ink px-4 py-2 text-sm font-black text-parchment focus:outline-none focus-visible:ring-4 focus-visible:ring-ink/60"
            >
              Equip {pet.name}
            </button>
          )}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-full border-2 border-ink/20 bg-transparent px-4 py-2 text-sm font-black text-ink focus:outline-none focus-visible:ring-4 focus-visible:ring-ink/40"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
