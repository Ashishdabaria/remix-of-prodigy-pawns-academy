import type { PathPoint } from "@/data/path-layouts";

export interface TrackStyle {
  dim: string;
  lit: string;
  glow: string;
  dash: string;
  litWidth: string;
  dimWidth: string;
  halo: string;
}

interface StonePathProps {
  points: PathPoint[];
  litCount: number;
  trackStyle: TrackStyle;
  animateLit?: boolean;
}

/**
 * StonePath — intentionally renders nothing.
 *
 * The quest map now tells its story through the pedestal nodes themselves
 * (see QuestNode) sitting directly on the themed background art. No
 * connecting trail or stepping stones are drawn so the underlying scene
 * (meadow, caverns, forge, etc.) reads cleanly as the world the hero is
 * adventuring through.
 *
 * Kept as a stable export so the route file's import keeps working and so
 * a future redesign can re-introduce a connector without another refactor.
 */
export function StonePath(_props: StonePathProps) {
  return null;
}
