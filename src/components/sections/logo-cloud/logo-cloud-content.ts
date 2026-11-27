/**
 * Logo cloud copy. Every company here is invented placeholder content for the
 * template. Replace the names (and the marks in `logo-marks.tsx`) with real
 * customers only when you have permission to show them.
 */

import type { LogoMarkName } from "./logo-marks";

export type LogoBrand = {
  name: string;
  mark: LogoMarkName;
  /** Gives each wordmark its own typographic voice, like real logos have. */
  wordmarkClassName: string;
};

export const logoCloudTitle = "Trusted by data-driven teams at";

/** Time between two cell swaps. */
export const logoSwapIntervalMs = 2600;

const display = "font-heading text-lg font-bold tracking-tight";
const spaced = "font-heading text-[0.8125rem] font-bold tracking-[0.14em] uppercase";
const plain = "font-sans text-base font-semibold tracking-tight";
const lower = "font-heading text-lg font-extrabold tracking-tight lowercase";

/** Keep more brands than visible cells (8 at most) so there is something to rotate in. */
export const logoBrands: readonly LogoBrand[] = [
  { name: "Vantora", mark: "peak", wordmarkClassName: display },
  { name: "Quillbase", mark: "stack", wordmarkClassName: plain },
  { name: "Heliogrid", mark: "grid", wordmarkClassName: lower },
  { name: "Orbweave", mark: "orbit", wordmarkClassName: display },
  { name: "Lumenfold", mark: "fold", wordmarkClassName: plain },
  { name: "Stratavue", mark: "strata", wordmarkClassName: spaced },
  { name: "Cobaltry", mark: "hexagon", wordmarkClassName: display },
  { name: "Fernline", mark: "leaf", wordmarkClassName: lower },
  { name: "Tidemark", mark: "wave", wordmarkClassName: plain },
  { name: "Driftwell", mark: "rings", wordmarkClassName: display },
  { name: "Prismlane", mark: "prism", wordmarkClassName: spaced },
  { name: "Kestrova", mark: "wing", wordmarkClassName: plain },
];
