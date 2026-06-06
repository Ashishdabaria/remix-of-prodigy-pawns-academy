import { SHARDS, type ShardId } from "@/data/realms";
import { cn } from "@/lib/utils";

interface ShardBadgeProps {
  shardId: ShardId;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  dim?: boolean; // for uncollected shards
  className?: string;
}

export function ShardBadge({ shardId, size = "md", showLabel = false, dim = false, className }: ShardBadgeProps) {
  const shard = SHARDS[shardId];
  const sizes = {
    sm: { box: "h-7 w-7 text-sm", label: "text-xs" },
    md: { box: "h-11 w-11 text-xl", label: "text-sm" },
    lg: { box: "h-16 w-16 text-3xl", label: "text-base" },
  }[size];

  const bg = `var(--color-${shard.colorVar})`;

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span
        aria-label={`${shard.name}, ${shard.shapeName} shape`}
        className={cn(
          "relative inline-flex items-center justify-center rounded-full border-2 border-ink/20 font-black",
          "transition-transform",
          sizes.box,
          dim && "opacity-40 grayscale"
        )}
        style={{
          background: dim
            ? "color-mix(in oklab, var(--color-muted) 60%, transparent)"
            : `radial-gradient(circle at 30% 30%, color-mix(in oklab, white 60%, ${bg}), ${bg})`,
          color: "var(--color-ink)",
          boxShadow: dim
            ? "inset 0 1px 0 rgba(255,255,255,0.4)"
            : `inset 0 1px 0 rgba(255,255,255,0.6), 0 6px 14px -6px color-mix(in oklab, ${bg} 80%, transparent)`,
        }}
      >
        <span aria-hidden className="drop-shadow-sm">{shard.shape}</span>
      </span>
      {showLabel && (
        <span className={cn("font-display font-bold", sizes.label, dim && "opacity-50")}>
          {shard.name}
        </span>
      )}
    </span>
  );
}
