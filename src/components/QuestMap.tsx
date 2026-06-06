import { Link } from "@tanstack/react-router";
import mapBg from "@/assets/quest-map.jpg";
import { REALMS, SHARDS, HIDDEN_AREAS } from "@/data/realms";
import { Mariposa } from "./Mariposa";

interface QuestMapProps {
  interactive?: boolean;
}

export function QuestMap({ interactive = true }: QuestMapProps) {
  // Build a smooth winding path through the realm coordinates.
  const pathD = REALMS.reduce((acc, r, i) => {
    if (i === 0) return `M ${r.coord.x} ${r.coord.y}`;
    const prev = REALMS[i - 1].coord;
    const cx1 = (prev.x + r.coord.x) / 2;
    const cy1 = prev.y;
    const cx2 = (prev.x + r.coord.x) / 2;
    const cy2 = r.coord.y;
    return `${acc} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${r.coord.x} ${r.coord.y}`;
  }, "");

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border-4 border-ink/15 card-pop">
      <img
        src={mapBg}
        alt="Quest map of the Kingdom of 64 Realms"
        width={1920}
        height={1080}
        className="block h-auto w-full"
      />

      {/* Title banner */}
      <div className="pointer-events-none absolute left-1/2 top-3 z-10 -translate-x-1/2 sm:top-5">
        <div className="rounded-full border-2 border-ink/20 bg-parchment/85 px-4 py-1.5 text-center backdrop-blur sm:px-6 sm:py-2">
          <div className="font-display text-xs font-black uppercase tracking-widest text-ink/70 sm:text-sm">Prodigy Pawns</div>
          <div className="font-display text-sm font-black text-ink ink-shadow sm:text-lg">The Kingdom of 64 Realms</div>
        </div>
      </div>

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* Winding path */}
        <path d={pathD} fill="none" stroke="rgba(60, 35, 20, 0.35)" strokeWidth="0.9" strokeDasharray="1.4 1.2" strokeLinecap="round" />
        <path d={pathD} fill="none" stroke="rgba(255, 220, 140, 0.85)" strokeWidth="0.5" strokeLinecap="round" />
      </svg>

      {/* Hidden markers */}
      {HIDDEN_AREAS.map((h) => (
        <div
          key={h.id}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${h.coord.x}%`, top: `${h.coord.y}%` }}
          title={h.name}
        >
          <div className="animate-sparkle text-base sm:text-xl" aria-hidden>✦</div>
          <span className="sr-only">{h.name}: {h.blurb}</span>
        </div>
      ))}

      {/* Mariposa appearances */}
      <div className="absolute" style={{ left: "30%", top: "44%" }}>
        <Mariposa size={56} />
      </div>
      <div className="absolute hidden sm:block" style={{ left: "74%", top: "60%" }}>
        <Mariposa size={48} />
      </div>

      {/* Realm nodes */}
      {REALMS.map((r) => {
        const shard = SHARDS[r.shard];
        const bg = `var(--color-${shard.colorVar})`;
        const Node = (
          <>
            <span
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink/40 font-black shadow-lg ring-2 ring-parchment sm:h-14 sm:w-14"
              style={{
                background: `radial-gradient(circle at 30% 30%, color-mix(in oklab, white 60%, ${bg}), ${bg})`,
                color: "var(--color-ink)",
              }}
            >
              <span aria-hidden className="text-lg sm:text-2xl">{shard.shape}</span>
              <span
                className="absolute -top-2 -left-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[10px] font-black text-parchment sm:h-6 sm:w-6 sm:text-xs"
                aria-hidden
              >
                {r.number}
              </span>
            </span>
            <span className="mt-1 hidden whitespace-nowrap rounded-md bg-parchment/90 px-2 py-0.5 text-[11px] font-black text-ink sm:inline-block">
              {r.name}
            </span>
          </>
        );

        return (
          <div
            key={r.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${r.coord.x}%`, top: `${r.coord.y}%` }}
          >
            {interactive ? (
              <Link
                to="/realm/$realmId"
                params={{ realmId: r.id }}
                aria-label={`Realm ${r.number}: ${r.name}. Earn the ${shard.name}, ${shard.shapeName} shape. Rank: ${shard.rank}.`}
                className="group flex flex-col items-center outline-none transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:ring-4 focus-visible:ring-ring/60 rounded-full"
              >
                {Node}
              </Link>
            ) : (
              <div className="flex flex-col items-center">{Node}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}
