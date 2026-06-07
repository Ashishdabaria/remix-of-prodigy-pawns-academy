import { createFileRoute, Link, useNavigate, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRealm, type Realm } from "@/data/realms";
import { fetchLevels, completeLevel, getPlayerId, type LevelRow } from "@/lib/progress";
import { LessonScreen } from "@/components/realm/LessonScreen";
import { PuzzleScreen } from "@/components/realm/PuzzleScreen";
import { BossQuiz } from "@/components/realm/BossQuiz";
import { VictoryShard } from "@/components/realm/VictoryShard";

export const Route = createFileRoute("/realm/$realmId_/level/$slug")({
  loader: ({ params }) => {
    const realm = getRealm(params.realmId);
    if (!realm) throw notFound();
    return { realm };
  },
  head: ({ loaderData, params }) => ({
    meta: [
      { title: `${params.slug} — ${loaderData?.realm?.name ?? "Realm"}` },
      { name: "description", content: "Play a level on the realm path." },
    ],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-black">Level not found</h1>
      <Link to="/" className="mt-4 inline-block rounded-full bg-ink px-5 py-2 font-black text-parchment">
        Back to map
      </Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-black">Hiccup.</h1>
      <button onClick={reset} className="mt-4 rounded-full bg-ink px-5 py-2 font-black text-parchment">
        Try again
      </button>
    </div>
  ),
  component: LevelPlayPage,
});

function LevelPlayPage() {
  const { realm } = Route.useLoaderData() as { realm: Realm };
  const { slug } = Route.useParams();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [bossWon, setBossWon] = useState(false);

  const levelsQ = useQuery({
    queryKey: ["levels", realm.id],
    queryFn: () => fetchLevels(realm.id),
  });

  const level: LevelRow | undefined = levelsQ.data?.find((l) => l.slug === slug);

  async function handleComplete(stars: number) {
    if (!level || saving) return;
    setSaving(true);
    try {
      await completeLevel({ playerId: getPlayerId(), levelId: level.id, stars });
      if (level.is_boss) {
        setBossWon(true); // show VictoryShard inline
      } else {
        navigate({
          to: "/realm/$realmId/path",
          params: { realmId: realm.id },
          search: { cleared: level.slug, stars, xp: level.xp_reward },
        });
      }
    } finally {
      setSaving(false);
    }
  }

  if (levelsQ.isLoading) {
    return <div className="mx-auto max-w-2xl px-6 py-20 text-center text-ink/60">Loading level…</div>;
  }
  if (levelsQ.error || !level) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-20 text-center">
        <h1 className="font-display text-3xl font-black">Level not found</h1>
        <Link
          to="/realm/$realmId/path"
          params={{ realmId: realm.id }}
          className="mt-4 inline-block rounded-full bg-ink px-5 py-2 font-black text-parchment"
        >
          Back to path
        </Link>
      </div>
    );
  }

  // BOSS — shows VictoryShard once cleared
  if (level.is_boss && bossWon) {
    return (
      <VictoryShard
        shardId={realm.shard}
        realmName={realm.name}
        xpGained={level.xp_reward}
        goldGained={20}
        braveHearts={0}
        onReplay={() => setBossWon(false)}
      />
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b-2 border-ink/15 bg-parchment/90 px-4 py-2 backdrop-blur">
        <Link
          to="/realm/$realmId/path"
          params={{ realmId: realm.id }}
          className="rounded-full border-2 border-ink/30 bg-parchment px-3 py-1 text-xs font-black text-ink"
        >
          ← Path
        </Link>
        <div className="text-xs font-black uppercase tracking-widest text-ink/60">
          Level {level.number} · {realm.name}
        </div>
        <div className="w-12" />
      </div>

      <LevelBody level={level} onComplete={handleComplete} saving={saving} />
    </div>
  );
}

function LevelBody({
  level,
  onComplete,
  saving,
}: {
  level: LevelRow;
  onComplete: (stars: number) => void;
  saving: boolean;
}) {
  const c = level.content as {
    text?: string;
    board?: string;
    fen?: string;
    solution?: string[];
  };

  if (level.kind === "lesson") {
    return (
      <LessonScreen
        title={level.name}
        text={c.text ?? "Tap Got It to continue."}
        board={c.board}
        onComplete={() => onComplete(3)}
        isSaving={saving}
      />
    );
  }

  if (level.kind === "puzzle" || level.kind === "minigame") {
    return (
      <PuzzleScreen
        title={level.name}
        text={c.text ?? "Make the right move!"}
        fen={c.fen ?? "8/8/8/8/8/8/8/8 w - - 0 1"}
        solution={c.solution ?? []}
        onComplete={onComplete}
        isSaving={saving}
      />
    );
  }

  // boss
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <header className="mb-4 text-center">
        <h1 className="font-display text-3xl font-black">{level.name}</h1>
        <p className="mt-1 text-sm text-ink/70">{c.text ?? "Defeat the boss!"}</p>
      </header>
      <BossQuiz onVictory={() => onComplete(3)} onMiss={() => { /* gentle */ }} />
    </div>
  );
}
