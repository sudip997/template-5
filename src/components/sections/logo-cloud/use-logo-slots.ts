"use client";

import { useEffect, useState } from "react";

/** Cells in the DOM. Tablets show all of them, phones and desktops show six. */
export const MAX_SLOTS = 8;
export const BASE_SLOTS = 6;

/** Matches Tailwind's `sm` up to (not including) `lg`, where all cells show. */
const TABLET_QUERY = "(min-width: 40rem) and (max-width: 63.98rem)";

/** Swap order: jumps around the grid so changes don't read as a sweep. */
const SWAP_ORDER = [1, 4, 6, 2, 5, 0, 7, 3];

type SlotState = {
  /**
   * Every brand index exactly once. Position = cell number; positions past the
   * visible cells are the brands waiting their turn.
   */
  order: number[];
  swaps: number;
};

/** Swaps one visible cell with one waiting brand, cycling through both. */
function swapOne(state: SlotState, visibleCount: number): SlotState {
  const waitingCount = state.order.length - visibleCount;
  if (waitingCount <= 0) return state;

  const cells = SWAP_ORDER.filter((cell) => cell < visibleCount);
  const cell = cells[state.swaps % cells.length];
  // The extra shift per round stops a cell flipping between the same two brands.
  const round = Math.floor(state.swaps / cells.length);
  const waiting = visibleCount + ((state.swaps + round) % waitingCount);
  const order = [...state.order];
  [order[cell], order[waiting]] = [order[waiting], order[cell]];

  return { order, swaps: state.swaps + 1 };
}

/**
 * Returns the brand index for every cell, changing one cell per interval.
 * A brand is never shown in two cells at once, and every brand gets a turn,
 * including those that start in tablet-only cells. Nothing changes while disabled
 * or while the tab is hidden.
 */
export function useLogoSlots(
  brandCount: number,
  intervalMs: number,
  enabled: boolean,
): readonly number[] {
  const [state, setState] = useState<SlotState>(() => ({
    order: Array.from({ length: brandCount }, (_, index) => index),
    swaps: 0,
  }));

  useEffect(() => {
    if (!enabled) return;

    const timer = window.setInterval(() => {
      if (document.hidden) return;

      const visibleCount = window.matchMedia(TABLET_QUERY).matches
        ? MAX_SLOTS
        : BASE_SLOTS;
      setState((current) => swapOne(current, visibleCount));
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, enabled]);

  return state.order.slice(0, MAX_SLOTS);
}
