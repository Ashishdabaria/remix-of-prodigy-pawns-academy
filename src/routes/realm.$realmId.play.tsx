import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getRealm, type Realm } from "@/data/realms";
import { PlayShell, type StageKey } from "@/components/realm/PlayShell";
import { PortalIntro } from "@/components/realm/PortalIntro";
import { ChessboardLesson } from "@/components/realm/ChessboardLesson";
import { ValueLesson } from "@/components/realm/ValueLesson";
import { PuzzleBoard } from "@/components/realm/PuzzleBoard";
import { BossQuiz } from "@/components/realm/BossQuiz";
import { VictoryShard } from "@/components/realm/VictoryShard";
import { LESSONS } from "@/data/realm1/lessons";
import { PUZZLES } from "@/data/realm1/puzzles";
import { addBraveHeart } from "@/data/student";
import { Mariposa } from "@/components/Mariposa";

export const Route = createFileRoute("/realm/$realmId/play")({
  loader: ({ params }) => {
    const realm = getRealm(params.realmId);
    if (!realm) throw notFound();
    return { realm };
  },
  head: ({ loaderData }) => {
    const r = loaderData?.realm;
    if (!r) return { meta: [{ title: "Play — Prodigy Pawns" }] };
    return {
      meta: [
        { title: `Play ${r.name} — Prodigy Pawns` },
        { name: "description", content: `Play through ${r.name}: lessons, puzzles, and the boss.` },
        { property: "og:title", content: `Play ${r.name} — Prodigy Pawns` },
        { property: "og:description", content: r.tagline },
        { property: "og:image", content: r.image },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-black">Realm not found</h1>
      <Link to="/" className="mt-6 inline-block rounded-full bg-ink px-5 py-2 font-bold text-parchment">Back to the map</Link>
    </div>
  ),
  errorComponent: ({ reset }) => (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-3xl font-black">A hiccup — let's try again.</h1>
      <button onClick={reset} className="mt-4 rounded-full bg-ink px-5 py-2 font-bold text-parchment">Try again</button>
    </div>
  ),
  component: PlayPage,
});

function PlayPage() {
  const { realm } = Route.useLoaderData() as { realm: Realm };
  const isRealm1 = realm.id === "pawn-village";
  if (!isRealm1) return <ComingSoon realm={realm} />;
  return <Realm1Flow realm={realm} />;
}

function ComingSoon({ realm }: { realm: Realm }) {
  return (
    <PlayShell realmId={realm.id} realmName={realm.name} stage="portal">
      <div className="mx-auto max-w-2xl rounded-3xl border-2 border-dashed border-ink/30 bg-card p-10 text-center card-pop">
        <Mariposa size={96} />
        <h2 className="mt-3 font-display text-3xl font-black">Coming soon!</h2>
        <p className="mt-2 text-ink/75">
          Mariposa is still painting this realm. Try the <strong>Pawn Village</strong> — it's fully playable today.
        </p>
        <Link
          to="/realm/$realmId/play"
          params={{ realmId: "pawn-village" }}
          className="mt-5 inline-block rounded-full bg-ink px-5 py-2 font-display font-black text-parchment"
        >
          Play the Pawn Village →
        </Link>
      </div>
    </PlayShell>
  );
}

function Realm1Flow({ realm }: { realm: Realm }) {
  const [stage, setStage] = useState<StageKey>("portal");
  const [lesson1Step, setLesson1Step] = useState(0);
  const [lesson2Step, setLesson2Step] = useState(0);
  const [puzzleIdx, setPuzzleIdx] = useState(0);
  const [stats, setStats] = useState({ xp: 0, gold: 0, brave: 0 });
  const [replayNonce, setReplayNonce] = useState(0);

  const lesson1 = LESSONS[0];
  const lesson2 = LESSONS[1];

  function miss() {
    addBraveHeart(1);
    setStats((s) => ({ ...s, brave: s.brave + 1 }));
  }

  function nextStage(s: StageKey) {
    setStage(s);
  }

  function handleLesson1Done() {
    if (lesson1Step + 1 < lesson1.steps.length) {
      setLesson1Step(lesson1Step + 1);
    } else {
      setStats((s) => ({ ...s, xp: s.xp + 30 }));
      nextStage("lesson2");
    }
  }

  function handleLesson2Done() {
    if (lesson2Step + 1 < lesson2.steps.length) {
      setLesson2Step(lesson2Step + 1);
    } else {
      setStats((s) => ({ ...s, xp: s.xp + 30 }));
      nextStage("lesson3");
    }
  }

  function handlePuzzleDone() {
    setStats((s) => ({ ...s, xp: s.xp + 40, gold: s.gold + 5 }));
    if (puzzleIdx + 1 < PUZZLES.length) setPuzzleIdx(puzzleIdx + 1);
    else nextStage("boss");
  }

  function skip() {
    if (stage === "portal") nextStage("lesson1");
    else if (stage === "lesson1") {
      miss();
      if (lesson1Step + 1 < lesson1.steps.length) setLesson1Step(lesson1Step + 1);
      else nextStage("lesson2");
    } else if (stage === "lesson2") {
      miss();
      if (lesson2Step + 1 < lesson2.steps.length) setLesson2Step(lesson2Step + 1);
      else nextStage("lesson3");
    } else if (stage === "lesson3") {
      miss();
      nextStage("puzzles");
    } else if (stage === "puzzles") {
      miss();
      if (puzzleIdx + 1 < PUZZLES.length) setPuzzleIdx(puzzleIdx + 1);
      else nextStage("boss");
    } else if (stage === "boss") {
      miss();
      nextStage("victory");
    }
  }

  function replay() {
    setStage("portal");
    setLesson1Step(0);
    setLesson2Step(0);
    setPuzzleIdx(0);
    setStats({ xp: 0, gold: 0, brave: 0 });
    setReplayNonce((n) => n + 1);
  }

  return (
    <PlayShell realmId={realm.id} realmName={realm.name} stage={stage} onSkip={skip}>
      <div key={replayNonce}>
        {stage === "portal" && (
          <PortalIntro shardId={realm.shard} realmName={realm.name} onContinue={() => nextStage("lesson1")} />
        )}

        {stage === "lesson1" && (
          <ChessboardLesson
            key={`l1-${lesson1Step}`}
            step={lesson1.steps[lesson1Step]}
            onComplete={handleLesson1Done}
            onMiss={miss}
          />
        )}

        {stage === "lesson2" && (
          <ChessboardLesson
            key={`l2-${lesson2Step}`}
            step={lesson2.steps[lesson2Step]}
            onComplete={handleLesson2Done}
            onMiss={miss}
          />
        )}

        {stage === "lesson3" && (
          <ValueLesson
            onComplete={() => {
              setStats((s) => ({ ...s, xp: s.xp + 30 }));
              nextStage("puzzles");
            }}
            onMiss={miss}
          />
        )}

        {stage === "puzzles" && (
          <PuzzleBoard
            key={`p-${puzzleIdx}`}
            puzzle={PUZZLES[puzzleIdx]}
            index={puzzleIdx}
            total={PUZZLES.length}
            onSolve={handlePuzzleDone}
            onMiss={miss}
          />
        )}

        {stage === "boss" && (
          <BossQuiz
            onVictory={() => {
              setStats((s) => ({ ...s, xp: s.xp + 80, gold: s.gold + 20 }));
              nextStage("victory");
            }}
            onMiss={miss}
          />
        )}

        {stage === "victory" && (
          <VictoryShard
            shardId={realm.shard}
            realmName={realm.name}
            xpGained={stats.xp}
            goldGained={stats.gold}
            braveHearts={stats.brave}
            onReplay={replay}
          />
        )}
      </div>
    </PlayShell>
  );
}
