// Centralized click/sfx sound helper. WebAudio, no assets needed.
// Respects the existing mute key ("pp.voice.muted") and adds a volume control.

export const MUTE_KEY = "pp.voice.muted";
export const VOLUME_KEY = "pp.sfx.volume"; // 0..1 as string

export function isMuted(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(MUTE_KEY) === "1";
}

export function setMuted(muted: boolean) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  if (muted) window.speechSynthesis?.cancel?.();
  window.dispatchEvent(new CustomEvent("pp:sound-settings"));
}

export function getVolume(): number {
  if (typeof window === "undefined") return 0.8;
  const raw = window.localStorage.getItem(VOLUME_KEY);
  if (raw == null) return 0.8;
  const n = Number(raw);
  if (!Number.isFinite(n)) return 0.8;
  return Math.min(1, Math.max(0, n));
}

export function setVolume(v: number) {
  if (typeof window === "undefined") return;
  const clamped = Math.min(1, Math.max(0, v));
  window.localStorage.setItem(VOLUME_KEY, String(clamped));
  window.dispatchEvent(new CustomEvent("pp:sound-settings"));
}

let _audioCtx: AudioContext | null = null;
function getAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (isMuted()) return null;
  try {
    if (!_audioCtx) {
      const Ctor =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!Ctor) return null;
      _audioCtx = new Ctor();
    }
    if (_audioCtx.state === "suspended") void _audioCtx.resume();
    return _audioCtx;
  } catch {
    return null;
  }
}

export type ClickKind = "tap" | "success" | "unlock" | "soft";

export function playClick(kind: ClickKind = "tap") {
  const ctx = getAudio();
  if (!ctx) return;
  const vol = getVolume();
  if (vol <= 0) return;
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain).connect(ctx.destination);
  let freq = 660, peak = 0.12, dur = 0.08, type: OscillatorType = "triangle";
  if (kind === "success") { freq = 880; peak = 0.16; dur = 0.22; type = "sine"; }
  if (kind === "unlock")  { freq = 520; peak = 0.18; dur = 0.35; type = "sine"; }
  if (kind === "soft")    { freq = 420; peak = 0.07; dur = 0.06; type = "sine"; }
  peak *= vol;
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  if (kind === "success") osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + dur);
  if (kind === "unlock")  osc.frequency.exponentialRampToValueAtTime(freq * 2, now + dur);
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), now + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.start(now);
  osc.stop(now + dur + 0.02);
}
