import { Link } from "@tanstack/react-router";
import { Mariposa } from "./Mariposa";

const NAV = [
  { to: "/",           label: "Quest Map" },
  { to: "/student",    label: "My Quest" },
  { to: "/companions", label: "Companions" },
  { to: "/parent",     label: "For Parents" },
  { to: "/codex",      label: "Codex" },
  { to: "/poster",     label: "Poster" },
  { to: "/settings",   label: "Settings" },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-parchment/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3 group">
          <Mariposa size={44} />
          <div className="leading-tight">
            <div className="font-display text-lg font-black text-ink ink-shadow sm:text-xl">Prodigy Pawns</div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Kingdom of 64 Realms</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-3 py-2 text-sm font-bold text-ink/80 transition-colors hover:bg-accent hover:text-ink"
              activeProps={{ className: "bg-ink text-parchment hover:bg-ink hover:text-parchment" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <nav className="flex items-center gap-1 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full px-2 py-1.5 text-xs font-bold text-ink/80 hover:bg-accent"
              activeProps={{ className: "bg-ink text-parchment" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
