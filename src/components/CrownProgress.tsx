import { SHARD_ORDER, SHARDS, type ShardId } from "@/data/realms";
import { ShardBadge } from "./ShardBadge";

interface CrownProgressProps {
  collected: ShardId[];
  size?: "sm" | "md";
}

export function CrownProgress({ collected, size = "sm" }: CrownProgressProps) {
  const set = new Set(collected);
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Crown progress">
      {SHARD_ORDER.map((id) => (
        <div key={id} className="flex flex-col items-center gap-1">
          <ShardBadge shardId={id} size={size} dim={!set.has(id)} />
          <span className="text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
            {SHARDS[id].shapeName}
          </span>
        </div>
      ))}
    </div>
  );
}
