"use client";

import { useRef, type CSSProperties } from "react";
import { useAnimationFrame, useInView, useReducedMotion } from "motion/react";
import { liveSignals } from "./features-content";

/** Distance between two row centres, in px. */
const ROW_PITCH = 62;
/** Upward speed, in px per second: a new row reaches the middle every ~2.4s. */
const SPEED = 26;
/** The row that starts in the middle. */
const FIRST_FOCUSED = 2;

/**
 * Where a row sits after the stream has travelled `offset` px. Distances are
 * measured from the middle and wrap around, which makes the loop seamless.
 */
function rowStyle(index: number, offset: number) {
  const loop = liveSignals.length * ROW_PITCH;
  const raw = (index - FIRST_FOCUSED) * ROW_PITCH - offset;
  const y = ((((raw + loop / 2) % loop) + loop) % loop) - loop / 2;
  const distance = Math.abs(y) / ROW_PITCH;

  return {
    transform: `translate3d(0, ${y.toFixed(2)}px, 0) scale(${Math.max(1 - distance * 0.07, 0.8).toFixed(4)})`,
    opacity: Math.max(1 - distance * 0.28, 0.2).toFixed(3),
    /**
     * Drives the highlight: 1 near the middle, 0 elsewhere, with a short
     * crossfade as one row hands over to the next.
     */
    focus: Math.min(Math.max((0.6 - distance) / 0.2, 0), 1).toFixed(3),
  };
}

/**
 * An endless, upward-moving list of events in which the one passing the middle
 * lights up. It pauses under a mouse and off screen, and stands still for people
 * who prefer reduced motion. Rows are updated directly to avoid re-rendering on
 * every frame.
 */
export function SignalStream() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLLIElement | null)[]>([]);
  const offsetRef = useRef(0);
  const hoveredRef = useRef(false);
  const inView = useInView(containerRef, { amount: 0.2 });
  const reduceMotion = useReducedMotion();

  useAnimationFrame((_, delta) => {
    if (!inView || reduceMotion || hoveredRef.current) return;

    // Capped so the stream doesn't jump after the tab has been in the background.
    offsetRef.current += (Math.min(delta, 64) / 1000) * SPEED;

    rowRefs.current.forEach((row, index) => {
      if (!row) return;
      const { transform, opacity, focus } = rowStyle(index, offsetRef.current);
      row.style.transform = transform;
      row.style.opacity = opacity;
      row.style.setProperty("--focus", focus);
    });
  });

  return (
    <>
      <ul className="sr-only">
        {liveSignals.map((signal) => (
          <li key={signal.title}>
            {signal.title}, {signal.source}, {signal.time}
          </li>
        ))}
      </ul>

      <div
        ref={containerRef}
        aria-hidden="true"
        className="@container relative h-72 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]"
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") hoveredRef.current = true;
        }}
        onPointerLeave={() => {
          hoveredRef.current = false;
        }}
      >
        {/* <div className="absolute inset-0 bg-[radial-gradient(color-mix(in_oklab,var(--muted-foreground)_28%,transparent)_1px,transparent_1px)] bg-size-[16px_16px] bg-center" /> */}

        <ul>
          {liveSignals.map((signal, index) => {
            const SignalIcon = signal.icon;
            const { transform, opacity, focus } = rowStyle(index, 0);

            return (
              <li
                key={signal.title}
                ref={(node) => {
                  rowRefs.current[index] = node;
                }}
                className="absolute inset-x-4 top-[calc(50%-1.625rem)] h-13 will-change-transform"
                style={
                  { transform, opacity, "--focus": focus } as CSSProperties
                }
              >
                <div className="relative flex h-full items-center gap-3 rounded-xl border bg-card px-3 shadow-sm dark:bg-secondary">
                  {/* Highlight, faded in as the row reaches the middle */}
                  <span className="pointer-events-none absolute -inset-px rounded-xl border-[1.5px] border-primary opacity-(--focus) shadow-lg shadow-primary/25" />

                  <span className="relative grid size-8 shrink-0 place-items-center rounded-lg bg-secondary text-muted-foreground dark:bg-background">
                    <SignalIcon className="size-4" />
                    <span className="absolute inset-0 grid place-items-center rounded-lg bg-primary text-primary-foreground opacity-(--focus)">
                      <SignalIcon className="size-4" />
                    </span>
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-card-foreground">
                      {signal.title}
                    </span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {signal.source} · {signal.time}
                    </span>
                  </span>

                  <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-accent p-1.5 text-[11px] font-medium text-accent-foreground opacity-(--focus) @[23.5rem]:px-2 @[23.5rem]:py-0.5">
                    <span className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
                    <span className="hidden @[23.5rem]:inline">Analyzing</span>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
