"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "./motion";

type RotatingHeadlineProps = {
  prefix: string;
  words: readonly string[];
  activeIndex: number;
  className?: string;
};

/**
 * The Hero <h1>. Screen readers get one static sentence; the animated word is
 * aria-hidden. All words are stacked invisibly in the same grid cell so the slot
 * is always as wide and tall as the longest word, which prevents layout shift.
 */
export function RotatingHeadline({
  prefix,
  words,
  activeIndex,
  className,
}: RotatingHeadlineProps) {
  const reduceMotion = useReducedMotion();
  const activeWord = words[activeIndex] ?? words[0];

  return (
    <h1
      id="hero-heading"
      className={cn(
        "font-heading text-balance text-[2.75rem] leading-[1.02] font-bold tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[3.5rem] xl:text-[4.25rem]",
        className,
      )}
    >
      <span className="sr-only">{`${prefix} ${words[0]}.`}</span>

      <span aria-hidden="true" className="block">
        {prefix}{" "}
        <span className="block">
          {/* The padding and negative margin keep descenders (the "g") from being clipped. */}
          <span className="-mb-[0.14em] inline-grid overflow-hidden pb-[0.14em] align-top">
            {words.map((word) => (
              <span
                key={word}
                className="invisible col-start-1 row-start-1 select-none"
              >
                {word}
              </span>
            ))}

            <AnimatePresence initial={false}>
              <motion.span
                key={activeWord}
                className="col-start-1 row-start-1 bg-linear-to-r from-primary to-brand-soft bg-clip-text text-transparent"
                initial={
                  reduceMotion
                    ? false
                    : { y: "70%", opacity: 0, filter: "blur(6px)" }
                }
                animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                exit={
                  reduceMotion
                    ? undefined
                    : { y: "-70%", opacity: 0, filter: "blur(6px)" }
                }
                transition={{ duration: 0.5, ease: EASE_OUT }}
              >
                {activeWord}
              </motion.span>
            </AnimatePresence>
          </span>
        </span>
      </span>
    </h1>
  );
}
