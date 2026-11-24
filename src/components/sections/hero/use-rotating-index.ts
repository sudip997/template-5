"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through `length` items on a fixed interval.
 * The timer pauses while the tab is hidden and is skipped entirely when disabled
 * (for example when the visitor prefers reduced motion).
 */
export function useRotatingIndex(
  length: number,
  intervalMs: number,
  enabled = true,
): number {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled || length < 2) return;

    let timer: number | undefined;

    const stop = () => {
      if (timer !== undefined) {
        window.clearInterval(timer);
        timer = undefined;
      }
    };

    const start = () => {
      stop();
      timer = window.setInterval(() => {
        setIndex((current) => (current + 1) % length);
      }, intervalMs);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) stop();
      else start();
    };

    if (!document.hidden) start();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [length, intervalMs, enabled]);

  return index;
}
