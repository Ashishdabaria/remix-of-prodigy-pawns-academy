import { useSyncExternalStore } from "react";
import { PETS, type Pet } from "./pets";

let equippedId = "pawnling";
const listeners = new Set<() => void>();

export function setEquippedPet(id: string) {
  equippedId = id;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useEquippedPet(): Pet {
  const id = useSyncExternalStore(subscribe, () => equippedId, () => equippedId);
  return PETS.find((p) => p.id === id) ?? PETS[0];
}
