import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { getRealm, type Realm } from "@/data/realms";
import { Mariposa } from "@/components/Mariposa";
import { fetchLevels, fetchProgress, getPlayerId, type LevelRow, type ProgressRow } from "@/lib/progress";
import { NodeClearAnimation } from "@/components/realm/NodeClearAnimation";
import { MARIPOSA_LINES } from "@/data/realm1/mariposa-lines";

const searchSchema = z.object({
  cleared: z.string().optional(),
  stars: z.coerce.number().min(0).max(3).optional(),
  xp: z.coerce.number().min(0).max(999).optional(),
});

export const Route = createFileRoute("/realm/$realmId_/path")({
  validateSearch: searchSchema,
  loader: ({ params }) => {
    const realm = getRealm(params.realmId);
    if (!realm) throw notFound();
    return { realm };
  },
  head: ({ loaderData }) => {
    const r = loaderData?.realm;
    return {
      meta: [
        { title: r ? `${r.name} — Realm Path` : "Realm Path" },
        { name: "description", content: "Climb the winding village path, one level at a time." },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-black">Path not found</h1>
      <Link to="/" className="mt-4 inline-block rounded-full bg-ink px-5 py-2 font-black text-parchment">Back to map</Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-black">The path crumbled.</h1>
      <button onClick={reset} className="mt-4 rounded-full bg-ink px-5 py-2 font-black text-parchment">Try again</button>
    </div>
  ),
  component: RealmPathPage,
});

// Winding x-positions (% of width) per level number (1..12)
const X_POSITIONS = [50, 32, 22, 30, 50, 70, 78, 70, 50, 30, 22, 50];

function RealmPathPage() {
  const { realm } = Route.useLoaderData() as { realm: Realm };
  const search = Route.useSearch();
  const navigate = useNavigate();
  const playerId = useMemo(() => getPlayerId(), []);

  const levelsQ = useQuery({
    queryKey: ["levels", realm.id],
    queryFn: () => fetchLevels(realm.id),
  });
  const progressQ = useQuery({
    queryKey: ["progress", realm.id, playerId],
    queryFn: () => fetchProgress(playerId, realm.id),
    enabled: !!playerId,
  });

  const levels: LevelRow[] = levelsQ.data ?? [];
  const progress: ProgressRow[] = progressQ.data ?? [];
  const doneMap = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of progress) m.set(p.level_id, p.stars);
    return m;
  }, [progress]);

  // Current level = first non-done in number order
  const currentIdx = levels.findIndex((l) => !doneMap.has(l.id));

  // Layout
  const ROW = 160;
  const PAD_TOP = 120;
  const PAD_BOTTOM = 120;
  const height = PAD_TOP + PAD_BOTTOM + Math.max(0, levels.length - 1) * ROW;
  const points = levels.map((l, i) => ({
    x: X_POSITIONS[l.number - 1] ?? X_POSITIONS[i] ?? 50,
    y: height - PAD_BOTTOM - i * ROW,
  }));
  const pathD = points.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = points[i - 1];
    const cy = (prev.y + p.y) / 2;
    return `${acc} C ${prev.x} ${cy}, ${p.x} ${cy}, ${p.x} ${p.y}`;
  }, "");

  // Cleared-level animation overlay
  const clearedIdx = search.cleared ? levels.findIndex((l) => l.slug === search.cleared) : -1;
  const [animDone, setAnimDone] = useState(false);
  useEffect(() => {
    setAnimDone(false);
  }, [search.cleared]);

  const cheer = useMemo(() => {
    const lines = MARIPOSA_LINES.CORRECT;
    return lines[Math.floor(Math.random() * lines.length)];
  }, [search.cleared]);

  function clearAnim() {
    setAnimDone(true);
    navigate({
      to: "/realm/$realmId/path",
      params: { realmId: realm.id },
      search: {},
      replace: true,
    });
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Village background */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${realm.image})` }}
        aria-hidden
      />
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-ink/40 via-ink/20 to-ink/70" aria-hidden />

      {/* Header HUD */}
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b-2 border-ink/15 bg-parchment/85 px-4 py-3 backdrop-blur">
        <Link
          to="/realm/$realmId"
          params={{ realmId: realm.id }}
          className="rounded-full border-2 border-ink/30 bg-parchment px-3 py-1 text-xs font-black text-ink"
          aria-label="Back to realm lobby"
        >
          ← Lobby
        </Link>
        <div className="text-center">
          <div className="text-[10px] font-black uppercase tracking-widest text-ink/60">Realm Path</div>
          <div className="font-display text-base font-black text-ink">{realm.name}</div>
        </div>
        <div className="rounded-full bg-shard-sun px-3 py-1 text-xs font-black text-ink ring-2 ring-ink/20">
          {progress.length}/{levels.length || 12}
        </div>
      </header>

      {levelsQ.isLoading && (
        <div className="px-6 py-10 text-center text-sm font-bold text-parchment/80">Loading the path…</div>
      )}

      {/* Scrolling path */}
      {levels.length > 0 && (
        <div className="relative mx-auto w-full max-w-md" style={{ height }}>
          <svg
            viewBox={`0 0 100 ${height}`}
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <path d={pathD} fill="none" stroke="rgba(255, 240, 200, 0.35)" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 5" />
            <path d={pathD} fill="none" stroke="rgba(255, 215, 120, 0.9)" strokeWidth="1.2" strokeLinecap="round" />
          </svg>

          {/* Mariposa hovers above current (hidden during cleared animation) */}
          {currentIdx >= 0 && !(clearedIdx >= 0 && !animDone) && (
            <div
              className="pointer-events-none absolute -translate-x-1/2"
              style={{ left: `${points[currentIdx].x}%`, top: points[currentIdx].y - 64 }}
            >
              <Mariposa size={48} />
            </div>
          )}

          {/* Cleared-node animation overlay */}
          {clearedIdx >= 0 && !animDone && (
            <NodeClearAnimation
              from={points[clearedIdx]}
              to={points[clearedIdx + 1]}
              xpGained={search.xp ?? 20}
              cheer={cheer}
              onDone={clearAnim}
            />
          )}

          {/* Nodes */}
          {levels.map((lvl, i) => {
            const p = points[i];
            const stars = doneMap.get(lvl.id);
            const status: "done" | "current" | "locked" =
              stars !== undefined ? "done" : i === currentIdx ? "current" : "locked";
            const hidden = clearedIdx === i && !animDone;
            return (
              <div
                key={lvl.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: p.y, opacity: hidden ? 0 : 1 }}
              >
                <LevelNode level={lvl} status={status} stars={stars ?? 0} realmId={realm.id} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function LevelNode({
  level,
  status,
  stars,
  realmId,
}: {
  level: LevelRow;
  status: "done" | "current" | "locked";
  stars: number;
  realmId: string;
}) {
  const tappable = status === "current";

  const ring =
    status === "done"
      ? "ring-shard-emerald/70 bg-shard-emerald/30"
      : status === "current"
        ? "ring-shard-sun bg-shard-sun/40 animate-pulse"
        : "ring-ink/30 bg-ink/40";

  const Inner = (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`relative grid h-20 w-20 place-items-center rounded-full border-4 border-parchment shadow-xl ring-4 ${ring}`}
        aria-hidden
      >
        <span className="text-3xl">{status === "locked" ? "🔒" : level.icon ?? "★"}</span>
        <span className="absolute -top-2 -left-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-black text-parchment ring-2 ring-parchment">
          {level.number}
        </span>
        {status === "done" && (
          <span className="absolute -bottom-2 -right-2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-shard-emerald text-sm font-black text-parchment ring-2 ring-parchment">
            ✓
          </span>
        )}
      </div>

      <div className="min-w-[10rem] max-w-[12rem] rounded-xl border-2 border-ink/20 bg-parchment/95 px-3 py-1.5 text-center shadow-md">
        <div className="font-display text-xs font-black leading-tight text-ink">{level.name}</div>
        <div className="mt-0.5 text-[10px] font-bold text-ink/60">{level.blurb}</div>

        {status === "done" && (
          <div className="mt-1 flex items-center justify-center gap-0.5" aria-label={`${stars} of 3 stars`}>
            {[1, 2, 3].map((s) => (
              <span key={s} className={s <= stars ? "text-shard-sun" : "text-ink/20"} aria-hidden>
                ★
              </span>
            ))}
          </div>
        )}

        {status === "current" && (
          <div className="mt-1.5">
            <span className="inline-block rounded-full bg-ink px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-parchment">
              Start ▶
            </span>
          </div>
        )}

        {status === "locked" && (
          <div className="mt-1 text-[10px] font-black uppercase tracking-widest text-ink/40">Locked</div>
        )}
      </div>
    </div>
  );

  if (tappable) {
    return (
      <Link
        to="/realm/$realmId/level/$slug"
        params={{ realmId, slug: level.slug }}
        aria-label={`Level ${level.number}: ${level.name}. Start.`}
        className="block rounded-2xl outline-none transition-transform hover:scale-105 focus-visible:scale-105 focus-visible:ring-4 focus-visible:ring-ring/60"
      >
        {Inner}
      </Link>
    );
  }

  return (
    <div
      aria-disabled
      aria-label={`Level ${level.number}: ${level.name}. ${status === "done" ? `Completed, ${stars} of 3 stars.` : "Locked."}`}
      className={status === "locked" ? "opacity-70" : ""}
    >
      {Inner}
    </div>
  );
}
