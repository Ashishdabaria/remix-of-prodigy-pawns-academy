import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { playClick } from "@/lib/sound";

export type StarPiece = "king" | "knight" | "rook" | "bishop" | "queen" | "pawn";

const PIECE_GLYPH: Record<StarPiece, string> = {
  king: "♔",
  knight: "♘",
  rook: "♖",
  bishop: "♗",
  queen: "♕",
  pawn: "♙",
};

// Center the piece on d4 (file=3, rank=3, 0-indexed from bottom-left)
const HOME: Record<StarPiece, [number, number]> = {
  king: [3, 3],
  knight: [3, 3],
  rook: [3, 3],
  bishop: [3, 3],
  queen: [3, 3],
  pawn: [3, 1],
};

/** Compute every legal target square for `piece` placed at `[file, rank]` on an empty board. */
function reachable(piece: StarPiece, file: number, rank: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  const onBoard = (f: number, r: number) => f >= 0 && f < 8 && r >= 0 && r < 8;
  const push = (f: number, r: number) => { if (onBoard(f, r) && (f !== file || r !== rank)) out.push([f, r]); };
  const ray = (df: number, dr: number) => {
    let f = file + df, r = rank + dr;
    while (onBoard(f, r)) { out.push([f, r]); f += df; r += dr; }
  };

  switch (piece) {
    case "king":
      for (let df = -1; df <= 1; df++) for (let dr = -1; dr <= 1; dr++) if (df || dr) push(file + df, rank + dr);
      break;
    case "knight":
      [[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]].forEach(([df,dr]) => push(file+df, rank+dr));
      break;
    case "rook":
      ray(1, 0); ray(-1, 0); ray(0, 1); ray(0, -1);
      break;
    case "bishop":
      ray(1, 1); ray(-1, 1); ray(1, -1); ray(-1, -1);
      break;
    case "queen":
      ray(1, 0); ray(-1, 0); ray(0, 1); ray(0, -1);
      ray(1, 1); ray(-1, 1); ray(1, -1); ray(-1, -1);
      break;
    case "pawn":
      // One forward; two forward from starting rank (rank index 1)
      push(file, rank + 1);
      if (rank === 1) push(file, rank + 2);
      break;
  }
  return out;
}

interface Props {
  piece: StarPiece;
  onSolved?: () => void;
}

export function CatchTheStar({ piece, onSolved }: Props) {
  const [home] = useState<[number, number]>(HOME[piece]);
  const stars = useMemo(() => reachable(piece, home[0], home[1]), [piece, home]);
  const starKey = (f: number, r: number) => `${f},${r}`;
  const starSet = useMemo(() => new Set(stars.map(([f, r]) => starKey(f, r))), [stars]);
  const [caught, setCaught] = useState<Set<string>>(() => new Set());
  const allCaught = caught.size === stars.length && stars.length > 0;

  useEffect(() => {
    if (allCaught) {
      playClick("success");
      onSolved?.();
    }
  }, [allCaught, onSolved]);

  function handleClick(f: number, r: number) {
    const k = starKey(f, r);
    if (!starSet.has(k) || caught.has(k)) { playClick("soft"); return; }
    playClick("tap");
    setCaught((s) => { const n = new Set(s); n.add(k); return n; });
  }

  // Render rank 7 at top, rank 0 at bottom
  const rows: number[] = [7, 6, 5, 4, 3, 2, 1, 0];
  const cols: number[] = [0, 1, 2, 3, 4, 5, 6, 7];

  return (
    <div className="rounded-xl border-2 border-ink/15 bg-parchment p-2">
      <div className="flex items-center justify-between px-1 pb-1.5 text-[10px] font-bold text-ink/70">
        <span>Tap every ⭐ the {piece} can reach</span>
        <span>{caught.size}/{stars.length}</span>
      </div>
      <div className="grid aspect-square grid-cols-8 overflow-hidden rounded-md ring-2 ring-ink/30">
        {rows.map((r) =>
          cols.map((c) => {
            const dark = (r + c) % 2 === 0;
            const isHome = c === home[0] && r === home[1];
            const k = starKey(c, r);
            const isStar = starSet.has(k);
            const isCaught = caught.has(k);
            return (
              <button
                key={k}
                type="button"
                onClick={() => handleClick(c, r)}
                aria-label={isStar ? `Star at ${"abcdefgh"[c]}${r + 1}` : `${"abcdefgh"[c]}${r + 1}`}
                className={`relative grid place-items-center transition-colors ${
                  dark ? "bg-amber-900/70" : "bg-amber-100"
                } ${isStar && !isCaught ? "hover:bg-shard-sun/50" : ""}`}
              >
                {isHome && (
                  <span className={`text-[clamp(14px,3.5vw,28px)] leading-none ${dark ? "text-parchment" : "text-ink"}`}>
                    {PIECE_GLYPH[piece]}
                  </span>
                )}
                {isStar && !isCaught && (
                  <motion.span
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute text-[clamp(10px,2.4vw,18px)] text-shard-sun drop-shadow"
                  >
                    ⭐
                  </motion.span>
                )}
                {isCaught && (
                  <span className="absolute text-[clamp(10px,2.4vw,18px)] text-shard-emerald">✓</span>
                )}
              </button>
            );
          })
        )}
      </div>
      {allCaught && (
        <div className="mt-2 rounded-full bg-shard-emerald/30 px-3 py-1 text-center text-[11px] font-black uppercase tracking-widest text-ink">
          ✓ All stars caught!
        </div>
      )}
    </div>
  );
}
