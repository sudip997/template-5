"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "../hero/motion";
import { ActPanel } from "./act-panel";
import { AskPanel } from "./ask-panel";
import { ConnectPanel } from "./connect-panel";
import type { SignalStep } from "./signal-content";

const panels = {
  connect: ConnectPanel,
  ask: AskPanel,
  act: ActPanel,
} as const;

type SignalPanelProps = {
  step: SignalStep;
  /** Starts the panel's animation, typically once it is on screen. */
  play: boolean;
  className?: string;
};

/**
 * The product window for one step. The window itself stays put while its title
 * and body change. It is an illustration, so assistive technology skips it.
 */
export function SignalPanel({ step, play, className }: SignalPanelProps) {
  const reduceMotion = useReducedMotion();
  const Body = panels[step.id];

  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-[27rem] flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-2xl shadow-primary/10",
        className,
      )}
    >
      <div className="flex h-11 shrink-0 items-center justify-between gap-3 border-b bg-secondary/60 px-4">
        <span className="flex items-center gap-2 text-xs font-medium">
          {step.panelTitle}
          {step.id === "act" && (
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <span className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
              Live
            </span>
          )}
        </span>
        <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
          Sample data
        </span>
      </div>

      <div className="relative min-h-0 flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step.id}
            className="absolute inset-0 p-4 sm:p-5"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            <Body play={play} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
