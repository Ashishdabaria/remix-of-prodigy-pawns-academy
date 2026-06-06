import { useEffect, useRef, useState } from "react";
import { Mariposa } from "@/components/Mariposa";
import { MARIPOSA_LINES, pickLine, type MomentKey } from "@/data/realm1/mariposa-lines";
import { cn } from "@/lib/utils";

const MUTE_KEY = "pp.voice.muted";

function isMuted() {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(MUTE_KEY) === "1";
}

export function setMariposaMuted(muted: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  if (muted) window.speechSynthesis?.cancel?.();
}

function speak(text: string) {
  if (typeof window === "undefined") return;
  if (isMuted()) return;
  const synth = window.speechSynthesis;
  if (!synth) return;
  synth.cancel();
  const u = new SpeechSynthesisUtterance(text);
  // prefer a friendly en-* voice
  const voices = synth.getVoices();
  const pick =
    voices.find((v) => /female|samantha|victoria|karen|moira|tessa/i.test(v.name)) ||
    voices.find((v) => v.lang?.startsWith("en")) ||
    voices[0];
  if (pick) u.voice = pick;
  u.pitch = 1.15;
  u.rate = 1.0;
  synth.speak(u);
}

interface MariposaSayProps {
  /** Which moment to draw the line from. Re-roll on change of `nonce`. */
  moment: MomentKey;
  /** Bump to re-roll a fresh line (e.g. retry attempt). */
  nonce?: number;
  /** Override with a fixed line instead of drawing from the bible. */
  text?: string;
  size?: number;
  className?: string;
}

/**
 * Renders Mariposa + a speech caption and speaks the line via SpeechSynthesis
 * (respecting the persisted mute toggle). Caption always visible — works
 * silently on muted devices.
 */
export function MariposaSay({ moment, nonce = 0, text, size = 72, className }: MariposaSayProps) {
  // Use a deterministic line for SSR so hydration matches; randomize on the client.
  const [line, setLine] = useState<string>(() => text ?? MARIPOSA_LINES[moment][0]);
  const lastNonce = useRef<{ moment: MomentKey; nonce: number; text?: string }>({ moment, nonce, text });

  // On mount (client-only): roll a random line and speak it.
  useEffect(() => {
    const next = text ?? pickLine(moment);
    setLine(next);
    lastNonce.current = { moment, nonce, text };
    speak(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const prev = lastNonce.current;
    if (prev.moment !== moment || prev.nonce !== nonce || prev.text !== text) {
      const next = text ?? pickLine(moment);
      setLine(next);
      lastNonce.current = { moment, nonce, text };
      speak(next);
    }
  }, [moment, nonce, text]);

  return (
    <div className={cn("flex items-start gap-3", className)}>
      <Mariposa size={size} />
      <div className="relative max-w-md rounded-2xl border-2 border-ink/20 bg-card px-4 py-2.5 card-pop">
        <div
          aria-hidden
          className="absolute -left-2 top-4 h-3 w-3 rotate-45 border-l-2 border-b-2 border-ink/20 bg-card"
        />
        <p className="text-sm font-semibold text-ink">{line}</p>
      </div>
    </div>
  );
}

export function MuteToggle() {
  const [muted, setMuted] = useState<boolean>(false);
  useEffect(() => setMuted(isMuted()), []);
  return (
    <button
      type="button"
      onClick={() => {
        const next = !muted;
        setMuted(next);
        setMariposaMuted(next);
      }}
      aria-pressed={muted}
      aria-label={muted ? "Unmute Mariposa" : "Mute Mariposa"}
      className="rounded-full border-2 border-ink/30 bg-parchment/80 px-3 py-1 text-xs font-black text-ink"
    >
      {muted ? "🔇 Voice off" : "🔊 Voice on"}
    </button>
  );
}
