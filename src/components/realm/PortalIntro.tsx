import { useEffect } from "react";
import { MariposaSay } from "./MariposaSay";
import type { ShardId } from "@/data/realms";

interface PortalIntroProps {
  shardId: ShardId;
  realmName: string;
  onContinue: () => void;
}

/**
 * 4–6s level-open animation:
 *  swirl in shard color → Mariposa flutters in & speaks → tap to continue.
 */
export function PortalIntro({ shardId, realmName, onContinue }: PortalIntroProps) {
  // auto-advance after 6s
  useEffect(() => {
    const t = setTimeout(onContinue, 7000);
    return () => clearTimeout(t);
  }, [onContinue]);

  return (
    <button
      type="button"
      onClick={onContinue}
      className="relative grid min-h-[60vh] w-full place-items-center overflow-hidden rounded-3xl border-4 border-ink/15 bg-ink/90 text-parchment card-pop"
      aria-label="Tap to continue"
    >
      {/* Swirl */}
      <div
        aria-hidden
        className="absolute inset-0 portal-swirl"
        style={{
          background: `conic-gradient(from 0deg,
            color-mix(in oklab, var(--color-${shardColor(shardId)}) 90%, transparent),
            color-mix(in oklab, var(--color-${shardColor(shardId)}) 30%, transparent),
            color-mix(in oklab, var(--color-${shardColor(shardId)}) 90%, transparent))`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 portal-pulse"
        style={{
          background: `radial-gradient(circle at center,
            color-mix(in oklab, white 30%, transparent) 0%,
            transparent 55%)`,
        }}
      />

      {/* Sparkles */}
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute text-shard-sun animate-sparkle"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            fontSize: 12 + (i % 4) * 4,
            animationDelay: `${(i % 5) * 0.3}s`,
          }}
        >
          ✦
        </span>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
        <div className="rounded-full bg-parchment/15 px-3 py-1 text-[11px] font-black uppercase tracking-widest text-parchment/90 backdrop-blur">
          Entering
        </div>
        <h1 className="font-display text-4xl font-black ink-shadow sm:text-6xl">{realmName}</h1>
        <div className="mt-2 rounded-2xl bg-parchment/95 p-3 text-ink card-pop">
          <MariposaSay moment="PORTAL_INTRO" size={64} />
        </div>
        <span className="mt-2 text-xs font-bold text-parchment/80">tap anywhere to continue</span>
      </div>
    </button>
  );
}

function shardColor(id: ShardId): string {
  return `shard-${id}`;
}
