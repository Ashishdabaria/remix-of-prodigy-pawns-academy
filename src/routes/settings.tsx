import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  isMuted,
  setMuted,
  getVolume,
  setVolume,
  playClick,
  type ClickKind,
} from "@/lib/sound";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Prodigy Pawns" },
      { name: "description", content: "Adjust Mariposa's voice and sound effects." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [muted, setMutedState] = useState(false);
  const [volume, setVolumeState] = useState(0.8);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMutedState(isMuted());
    setVolumeState(getVolume());
    setReady(true);
  }, []);

  const toggleMute = () => {
    const next = !muted;
    setMutedState(next);
    setMuted(next);
    if (!next) playClick("soft");
  };

  const onVolumeChange = (vals: number[]) => {
    const v = (vals[0] ?? 0) / 100;
    setVolumeState(v);
    setVolume(v);
  };

  const test = (k: ClickKind, label: string) => (
    <button
      key={k}
      type="button"
      onClick={() => playClick(k)}
      disabled={muted || volume <= 0}
      className="rounded-full border-2 border-ink/20 bg-card px-4 py-2 text-sm font-black text-ink card-pop disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {label}
    </button>
  );

  if (!ready) return null;

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-black text-ink ink-shadow sm:text-4xl">
          Settings
        </h1>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">
          Mariposa's voice and quest sound effects.
        </p>
      </header>

      <section className="rounded-2xl border-2 border-ink/15 bg-card/90 p-5 card-pop">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-black text-ink">Voice & sound</h2>
            <p className="text-xs font-semibold text-muted-foreground">
              Mutes Mariposa's voice and all click sounds.
            </p>
          </div>
          <button
            type="button"
            onClick={toggleMute}
            aria-pressed={muted}
            className="rounded-full border-2 border-ink/30 bg-parchment/80 px-4 py-2 text-sm font-black text-ink"
          >
            {muted ? "🔇 Sound off" : "🔊 Sound on"}
          </button>
        </div>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="sfx-volume" className="text-sm font-black text-ink">
              Sound effects volume
            </label>
            <span className="text-xs font-bold text-muted-foreground tabular-nums">
              {Math.round(volume * 100)}%
            </span>
          </div>
          <Slider
            id="sfx-volume"
            value={[Math.round(volume * 100)]}
            min={0}
            max={100}
            step={1}
            onValueChange={onVolumeChange}
            disabled={muted}
            aria-label="Sound effects volume"
          />
          {muted && (
            <p className="mt-2 text-xs font-semibold text-muted-foreground">
              Turn sound on to adjust volume.
            </p>
          )}
        </div>

        <div className="mt-6">
          <div className="mb-2 text-sm font-black text-ink">Test sounds</div>
          <div className="flex flex-wrap gap-2">
            {test("tap", "🔔 Tap")}
            {test("soft", "✨ Soft")}
            {test("success", "🎉 Success")}
            {test("unlock", "🗝️ Unlock")}
          </div>
        </div>
      </section>
    </main>
  );
}
