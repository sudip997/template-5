"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { IconArrowUp, IconSparkles } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "../hero/motion";
import { askExample } from "./signal-content";

const TYPE_INTERVAL_MS = 32;

/** A question types itself into the prompt bar, then the answer appears. */
export function AskPanel({ play }: { play: boolean }) {
  const reduceMotion = useReducedMotion();
  const { question, activity, highlightedWeeks } = askExample;
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    if (!play) return;
    // Reduced motion gets the whole question in one step. This happens after
    // mount, so server and client render the same markup first.
    const step = reduceMotion ? question.length : 1;
    const timer = window.setInterval(() => {
      setTypedLength((current) => {
        if (current >= question.length) {
          window.clearInterval(timer);
          return current;
        }
        return Math.min(current + step, question.length);
      });
    }, TYPE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [play, reduceMotion, question]);

  const answered = typedLength >= question.length;

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex min-h-12 items-center gap-3 rounded-xl border border-primary/40 bg-background px-3.5 py-2 ring-4 ring-primary/10">
        <IconSparkles className="size-4 shrink-0 text-primary" />
        {/* The invisible remainder keeps the text from reflowing while typing. */}
        <p className="flex-1 text-sm">
          {question.slice(0, typedLength)}
          <span className="invisible">{question.slice(typedLength)}</span>
        </p>
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
          <IconArrowUp className="size-4" />
        </span>
      </div>

      <motion.div
        className="flex min-h-0 flex-1 flex-col rounded-xl border bg-background p-4"
        initial={{ opacity: 0, y: 12 }}
        animate={answered ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
      >
        <p className="text-sm font-semibold">{askExample.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{askExample.body}</p>

        <div className="mt-4 flex min-h-24 flex-1 items-end gap-2 border-b sm:gap-3">
          {activity.map((value, week) => (
            <motion.span
              // Weeks are fixed positions, so the index is a stable key.
              key={week}
              className={cn(
                "flex-1 origin-bottom rounded-t-sm",
                week >= activity.length - highlightedWeeks
                  ? "bg-primary"
                  : "bg-primary/25",
              )}
              style={{ height: `${value}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: answered ? 1 : 0 }}
              transition={{
                duration: 0.5,
                delay: 0.15 + week * 0.05,
                ease: EASE_OUT,
              }}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {askExample.chartLabel}
        </p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {askExample.sources.map((source) => (
            <li
              key={source}
              className="rounded-md bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground"
            >
              {source}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
