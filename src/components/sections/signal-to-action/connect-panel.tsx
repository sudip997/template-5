"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  IconBrandSlack,
  IconCircleCheckFilled,
  IconDatabase,
  IconHeadset,
  IconLoader2,
  IconSparkles,
} from "@tabler/icons-react";
import { EASE_OUT } from "../hero/motion";

const sources = [
  { name: "CRM", icon: IconDatabase },
  { name: "Tickets", icon: IconHeadset },
  { name: "Slack", icon: IconBrandSlack },
] as const;

/** One connector per source row, ending at the vertical centre. */
const connectors = [
  "M0 50 C 55 50, 45 150, 100 150",
  "M0 150 L 100 150",
  "M0 250 C 55 250, 45 150, 100 150",
];

/** How long the last source stays in the "Syncing" state. */
const SYNC_DELAY_MS = 1600;

/** Three sources flowing into Nexora; the last one finishes syncing on screen. */
export function ConnectPanel({ play }: { play: boolean }) {
  const reduceMotion = useReducedMotion();
  const [lastSynced, setLastSynced] = useState(false);

  useEffect(() => {
    if (!play) return;
    const timer = window.setTimeout(
      () => setLastSynced(true),
      reduceMotion ? 0 : SYNC_DELAY_MS,
    );
    return () => window.clearTimeout(timer);
  }, [play, reduceMotion]);

  const syncedCount = lastSynced ? sources.length : sources.length - 1;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center">
        <div className="flex h-64 w-full items-stretch">
          <ul className="grid w-32 shrink-0 grid-rows-3 sm:w-44">
            {sources.map((source, index) => {
              const SourceIcon = source.icon;
              const synced = index < syncedCount;

              return (
                <motion.li
                  key={source.name}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -12 }}
                  animate={play ? { opacity: 1, x: 0 } : undefined}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.1,
                    ease: EASE_OUT,
                  }}
                >
                  <div className="flex w-full items-center gap-2.5 rounded-xl border bg-background p-2.5 shadow-xs">
                    <span className="hidden size-8 shrink-0 place-items-center rounded-lg bg-secondary text-muted-foreground sm:grid">
                      <SourceIcon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium">
                        {source.name}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        {synced ? (
                          <IconCircleCheckFilled className="size-3 text-primary" />
                        ) : (
                          <IconLoader2 className="size-3 text-primary motion-safe:animate-spin" />
                        )}
                        {synced ? "Synced" : "Syncing"}
                      </span>
                    </span>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          <svg
            viewBox="0 0 100 300"
            preserveAspectRatio="none"
            className="h-full min-w-0 flex-1 text-primary"
            fill="none"
          >
            {connectors.map((path) => (
              <path
                key={path}
                d={path}
                stroke="currentColor"
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
                className="signal-flow"
              />
            ))}
          </svg>

          <div className="flex shrink-0 items-center">
            <div className="flex size-20 flex-col items-center justify-center gap-1 rounded-2xl bg-primary text-primary-foreground shadow-xl ring-8 shadow-primary/35 ring-primary/10 sm:size-24">
              <IconSparkles className="size-6" />
              <span className="font-heading text-sm font-bold">Nexora</span>
            </div>
          </div>
        </div>
      </div>

      <p className="border-t pt-3 text-xs text-muted-foreground">
        {syncedCount} of {sources.length} sources synced
      </p>
    </div>
  );
}
