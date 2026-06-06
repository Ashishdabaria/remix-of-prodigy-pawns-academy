// @ts-expect-error - bun:test is provided at runtime by `bun test`
import { describe, it, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dir = dirname(fileURLToPath(import.meta.url));
import { REALMS } from "@/data/realms";
import { routeTree } from "@/routeTree.gen";

/**
 * Navigation test: every realm's "Enter Realm" button must open
 * /realm/$realmId/play for that realm.
 *
 * Verifies three independent guarantees:
 *  1. The play route is registered in the generated route tree.
 *  2. The realm lobby renders a TanStack <Link> pointing at the play route
 *     with `params={{ realmId: realm.id }}` (no hard-coded URLs).
 *  3. For every realm in REALMS, the resolved play URL is a non-empty,
 *     well-formed path.
 */

const PLAY_ROUTE_ID = "/realm/$realmId_/play";
const PLAY_ROUTE_PATH = "/realm/$realmId/play";

function collectRouteIds(node: any, acc: string[] = []): string[] {
  if (!node) return acc;
  if (node.id) acc.push(node.id);
  const children = node.children ?? node.options?.children;
  if (Array.isArray(children)) for (const c of children) collectRouteIds(c, acc);
  else if (children && typeof children === "object")
    for (const c of Object.values(children)) collectRouteIds(c, acc);
  return acc;
}

describe("Realm navigation: Enter Realm → /realm/$realmId/play", () => {
  it("registers the play route in the generated route tree", () => {
    const ids = collectRouteIds(routeTree);
    expect(ids).toContain(PLAY_ROUTE_ID);
  });

  it("realm lobby links to the play route via params, not a string", () => {
    const src = readFileSync(
      resolve(__dir, "../realm.$realmId.tsx"),
      "utf8",
    );
    expect(src).toContain(`to="/realm/$realmId/play"`);
    expect(src).toMatch(/params=\{\{\s*realmId:\s*realm\.id\s*\}\}/);
    // Guard against regressing to a hand-rolled href.
    expect(src).not.toMatch(/href=["`]\/realm\//);
  });

  it.each(REALMS.map((r) => [r.id, r.name]))(
    "resolves play URL for realm %s (%s)",
    (id: string) => {
      expect(typeof id).toBe("string");
      expect(id.length).toBeGreaterThan(0);
      const url = PLAY_ROUTE_PATH.replace("$realmId", id);
      expect(url).toBe(`/realm/${id}/play`);
      expect(url).toMatch(/^\/realm\/[a-z0-9-]+\/play$/);
    },
  );
});
