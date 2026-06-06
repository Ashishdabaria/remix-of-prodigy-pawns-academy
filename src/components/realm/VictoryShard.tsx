import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Link, useRouter } from "@tanstack/react-router";
import { ShardBadge } from "@/components/ShardBadge";
import { SHARDS, type ShardId } from "@/data/realms";
import { addShard, addXP, addGold } from "@/data/student";
import { MariposaSay } from "./MariposaSay";
import { ShadowChase } from "./ShadowChase";
import shadowImg from "@/assets/shadow-moth.png";

interface VictoryShardProps {
  shardId: ShardId;
  realmName: string;
  xpGained: number;
  goldGained: number;
  braveHearts: number;
  onReplay: () => void;
}

export function VictoryShard({
  shardId,
  realmName,
  xpGained,
  goldGained,
  braveHearts,
  onReplay,
}: VictoryShardProps) {
  const router = useRouter();
  const shard = SHARDS[shardId];
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    // commit the rewards once on mount
    addShard(shardId);
    addXP(xpGained);
    addGold(goldGained);

    // confetti volley
    const end = Date.now() + 1200;
    const colors = ["#ffd166", "#ef476f", "#06d6a0", "#118ab2", "#ffffff"];
    (function frame() {
      confetti({ particleCount: 3, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 3, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="rounded-3xl border-4 border-ink/15 bg-card p-8 card-pop">
        <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">
          You won
        </div>
        <h2 className="mt-1 font-display text-4xl font-black ink-shadow sm:text-5xl">
          The {shard.name}!
        </h2>
        <p className="mt-2 text-ink/75">You cleared {realmName} and earned a new rank.</p>

        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="scale-150">
            <ShardBadge shardId={shardId} size="lg" />
          </div>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-shard-sun/30 px-4 py-1 font-display text-lg font-black">
            🏆 {shard.rank}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 text-center">
          <Reward icon="✦" label="XP" value={`+${xpGained}`} tint="shard-sun" />
          <Reward icon="🪙" label="Gold" value={`+${goldGained}`} tint="shard-amber" />
          <Reward icon="♥" label="Brave" value={`+${braveHearts}`} tint="rose" />
        </div>

        <div className="mt-6">
          <MariposaSay moment="SHARD_WON" />
        </div>

        {/* Reward mini-game CTA */}
        <div className="mt-6 rounded-2xl border-2 border-dashed border-shard-amethyst/50 bg-shard-amethyst/10 p-4">
          <div className="flex items-center justify-center gap-3">
            <img
              src={shadowImg}
              alt=""
              width={56}
              height={56}
              className="animate-float drop-shadow-[0_0_12px_rgba(120,40,180,0.6)]"
              style={{ width: 56, height: 56 }}
            />
            <div className="text-left">
              <div className="text-[11px] font-black uppercase tracking-widest text-muted-foreground">Reward unlocked</div>
              <div className="font-display text-lg font-black">Smudge stole the village's giggles!</div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowGame(true)}
            className="mt-3 rounded-full bg-shard-amethyst px-5 py-2 font-display text-base font-black text-parchment hover-scale animate-glow"
          >
            🦋✦ Catch Smudge, the Giggle Thief
          </button>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            onClick={() => router.invalidate()}
            className="rounded-full bg-ink px-5 py-2 font-display font-black text-parchment hover-scale"
          >
            Back to the map →
          </Link>
          <button
            type="button"
            onClick={onReplay}
            className="rounded-full border-2 border-ink/30 px-5 py-2 font-display font-black text-ink"
          >
            Play again
          </button>
        </div>
      </div>

      {showGame && <ShadowChase onClose={() => setShowGame(false)} />}
    </div>
  );
}

function Reward({ icon, label, value, tint }: { icon: string; label: string; value: string; tint: string }) {
  return (
    <div
      className="rounded-2xl border-2 border-ink/15 p-3"
      style={{ background: `color-mix(in oklab, var(--color-${tint}) 22%, var(--color-card))` }}
    >
      <div className="text-2xl" aria-hidden>{icon}</div>
      <div className="font-display text-xl font-black">{value}</div>
      <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
