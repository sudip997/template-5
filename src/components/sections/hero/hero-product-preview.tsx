"use client";

import { useRef } from "react";
import type * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { IconArrowUp, IconSparkles } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ActivityChart } from "./activity-chart";
import type { HeroSlide } from "./hero-content";
import { EASE_OUT } from "./motion";
import { NeuralBackdrop } from "./neural-backdrop";
import { WorkflowGraph } from "./workflow-graph";

type HeroProductPreviewProps = {
  slides: readonly HeroSlide[];
  activeIndex: number;
  className?: string;
};

function PanelHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-3 flex items-center justify-between gap-2">
      <h3 className="text-xs font-medium text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}

/**
 * A believable product window: prompt bar, workflow graph, activity chart and an
 * AI insight card. The prompt and insight follow the rotating headline word.
 * The whole preview is decorative, so it is hidden from assistive technology.
 */
export function HeroProductPreview({
  slides,
  activeIndex,
  className,
}: HeroProductPreviewProps) {
  const reduceMotion = useReducedMotion();
  const tiltRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const springConfig = { stiffness: 120, damping: 20, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(pointerY, [-0.5, 0.5], [3, -3]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-0.5, 0.5], [-4, 4]),
    springConfig,
  );

  const slide = slides[activeIndex] ?? slides[0];

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    // Tilt is a mouse-only flourish: skip touch/pen input and reduced motion.
    if (reduceMotion || event.pointerType !== "mouse" || !tiltRef.current)
      return;
    const rect = tiltRef.current.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function resetTilt() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.div
      aria-hidden="true"
      className={cn("relative isolate", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 28, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.35, ease: EASE_OUT }}
    >
      <NeuralBackdrop className="absolute -top-16 -right-10 -z-10 hidden w-[30rem] max-w-none opacity-60 md:block" />

      <div
        // ref={tiltRef}
        // onPointerMove={handlePointerMove}
        // onPointerLeave={resetTilt}
        className="[perspective:1400px]"
      >
        <motion.div
          //   style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-2xl shadow-primary/10 ring-1 ring-foreground/[0.03]"
        >
          {/* Window chrome */}
          <div className="flex h-11 items-center gap-3 border-b bg-secondary/60 px-4">
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
              <span className="size-2.5 rounded-full bg-border" />
            </div>
            <span className="flex-1 truncate text-center text-xs font-medium text-muted-foreground">
              Nexora workspace
            </span>
            <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">
              Sample data
            </span>
          </div>

          <div className="grid gap-3 p-3 sm:p-4">
            {/* Prompt bar */}
            <div className="flex h-12 items-center gap-3 rounded-xl border bg-background px-3.5">
              <IconSparkles className="size-4 shrink-0 text-primary" />
              <div className="relative h-5 flex-1 overflow-hidden text-sm">
                <AnimatePresence initial={false}>
                  <motion.p
                    key={slide.prompt}
                    className="absolute inset-0 truncate leading-5 text-foreground"
                    initial={reduceMotion ? false : { y: 14, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={reduceMotion ? undefined : { y: -14, opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                  >
                    {slide.prompt}
                  </motion.p>
                </AnimatePresence>
              </div>
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                <IconArrowUp className="size-4" />
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-[1.25fr_1fr]">
              {/* Workflow */}
              <section className="rounded-xl border bg-background p-3">
                <PanelHeader title="Workflow">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                    <span className="size-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
                    Live
                  </span>
                </PanelHeader>
                <WorkflowGraph />
              </section>

              {/* Activity */}
              <section className="flex flex-col rounded-xl border bg-background p-3">
                <PanelHeader title="Events analyzed" />
                <p className="font-heading text-2xl leading-none font-bold tracking-tight">
                  12.4k
                  <span className="ml-1.5 text-xs font-medium tracking-normal text-muted-foreground">
                    this week
                  </span>
                </p>
                <div className="mt-auto pt-3">
                  <ActivityChart />
                </div>
              </section>
            </div>

            {/* AI insight (synced with the headline word) */}
            <section className="rounded-xl border border-primary/20 bg-accent/60 p-4">
              <div className="mb-2 flex items-center gap-1.5 text-xs font-medium text-accent-foreground">
                <IconSparkles className="size-3.5" />
                AI insight
              </div>
              <div className="min-h-[8.5rem] sm:min-h-[6.75rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={slide.insight.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {slide.insight.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {slide.insight.body}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {slide.insight.sources.map((source) => (
                        <li
                          key={source}
                          className="rounded-md border bg-background px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {source}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
