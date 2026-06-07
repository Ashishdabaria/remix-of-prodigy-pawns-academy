// @ts-expect-error - bun:test is provided at runtime by `bun test`
import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import React from "react";
import { render, cleanup, screen, within, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";

import { MiniBossEncounter } from "@/components/realm/RealmEncounters";
import { REALMS } from "@/data/realms";

const realm = REALMS[0];

function renderMiniBoss() {
  const utils = render(
    React.createElement(MiniBossEncounter, {
      realm,
      onClose: () => {},
      onWin: () => {},
    }),
  );
  return utils;
}

beforeEach(() => {
  document.body.innerHTML = "";
});

afterEach(() => {
  cleanup();
});

describe("Lost Knight puzzle — accessibility", () => {
  it("has no critical/serious axe violations on the intro screen", async () => {
    renderMiniBoss();
    const results = await axe.run(document.body, {
      resultTypes: ["violations"],
      rules: {
        // Modal sits over a parent app; colour-contrast needs theme tokens we
        // can't fully reason about in jsdom — relax just that rule.
        "color-contrast": { enabled: false },
        region: { enabled: false },
      },
    });
    const blocking = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious",
    );
    if (blocking.length) {
      // eslint-disable-next-line no-console
      console.error(JSON.stringify(blocking, null, 2));
    }
    expect(blocking).toEqual([]);
  });

  it("opens the puzzle and exposes a labelled grid with gridcells", async () => {
    const user = userEvent.setup();
    renderMiniBoss();
    await user.click(screen.getByRole("button", { name: /help the knight/i }));

    const grid = await screen.findByRole("grid", { name: /knight/i });
    expect(grid).toBeTruthy();
    const cells = within(grid).getAllByRole("gridcell");
    // 5x5 = 25 cells, knight in center is also a gridcell.
    expect(cells.length).toBe(25);

    // The knight cell is labelled and not focusable.
    const knightCell = cells.find((c) =>
      /knight, center/i.test(c.getAttribute("aria-label") || ""),
    )!;
    expect(knightCell).toBeTruthy();
    expect(knightCell.getAttribute("tabindex")).toBe("-1");

    // Hint button is reachable and labelled.
    const hint = screen.getByRole("button", { name: /reveal a hint/i });
    expect(hint).toBeTruthy();
  });

  it("supports arrow-key roving focus and skips the knight cell", async () => {
    const user = userEvent.setup();
    renderMiniBoss();
    await user.click(screen.getByRole("button", { name: /help the knight/i }));

    const grid = await screen.findByRole("grid", { name: /knight/i });
    const cells = within(grid).getAllByRole("gridcell");

    // Initially exactly one non-knight cell has tabindex=0.
    const initialFocusable = cells.filter((c) => c.getAttribute("tabindex") === "0");
    expect(initialFocusable.length).toBe(1);

    // Focus the roving target, then press ArrowRight 3 times.
    await act(async () => {
      (initialFocusable[0] as HTMLButtonElement).focus();
    });
    await user.keyboard("{ArrowRight}{ArrowRight}{ArrowRight}");

    const focused = document.activeElement as HTMLElement;
    expect(focused.getAttribute("role")).toBe("gridcell");
    expect(focused.getAttribute("aria-label")).not.toMatch(/knight, center/i);
    expect(focused.getAttribute("tabindex")).toBe("0");
  });

  it("reveals a hint when pressing the H key", async () => {
    const user = userEvent.setup();
    renderMiniBoss();
    await user.click(screen.getByRole("button", { name: /help the knight/i }));

    const grid = await screen.findByRole("grid", { name: /knight/i });
    const firstCell = within(grid)
      .getAllByRole("gridcell")
      .find((c) => c.getAttribute("tabindex") === "0")!;
    await act(async () => {
      (firstCell as HTMLButtonElement).focus();
    });
    await user.keyboard("h");

    const hinted = within(grid)
      .getAllByRole("gridcell")
      .find((c) => /hint/i.test(c.getAttribute("aria-label") || ""));
    expect(hinted).toBeTruthy();
  });
});
