"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const DELETE_DELAY_MS = 28;
const TYPE_DELAY_MS = 70;
const TYPE_JITTER_MS = 40;

/**
 * Types `target` out one character at a time. When the target changes, the
 * current text is deleted back to the shared prefix (if any) and the new word is
 * typed in. When disabled (reduced motion) the target is returned as-is.
 */
function useTypewriter(target: string, enabled: boolean): string {
  const [text, setText] = useState(target);
  const textRef = useRef(target);

  useEffect(() => {
    if (!enabled) {
      textRef.current = target;
      return;
    }

    let timer: number | undefined;

    const update = (next: string) => {
      textRef.current = next;
      setText(next);
    };

    const tick = () => {
      const current = textRef.current;
      if (current === target) return;

      if (target.startsWith(current)) {
        update(target.slice(0, current.length + 1));
        timer = window.setTimeout(
          tick,
          TYPE_DELAY_MS + Math.random() * TYPE_JITTER_MS,
        );
      } else {
        update(current.slice(0, -1));
        timer = window.setTimeout(tick, DELETE_DELAY_MS);
      }
    };

    timer = window.setTimeout(tick, DELETE_DELAY_MS);

    return () => {
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [target, enabled]);

  return enabled ? text : target;
}

type RotatingHeadlineProps = {
  prefix: string;
  words: readonly string[];
  activeIndex: number;
  className?: string;
};

/**
 * The Hero <h1>. Screen readers get one static sentence; the animated word is
 * aria-hidden. All words are stacked invisibly in the same grid cell so the slot
 * is always as wide and tall as the longest word, which prevents layout shift
 * while the active word is being typed or deleted.
 */
export function RotatingHeadline({
  prefix,
  words,
  activeIndex,
  className,
}: RotatingHeadlineProps) {
  const reduceMotion = useReducedMotion();
  const activeWord = words[activeIndex] ?? words[0];
  const typedWord = useTypewriter(activeWord, !reduceMotion);

  return (
    <h1
      id="hero-heading"
      className={cn(
        "font-heading text-balance text-[2.75rem] leading-[1.02] font-bold tracking-[-0.035em] text-foreground sm:text-6xl lg:text-[3.5rem] xl:text-[4.25rem] overflow-visible",
        className,
      )}
    >
      <span className="sr-only">{`${prefix} ${words[0]}.`}</span>

      <span aria-hidden="true" className="block">
        {prefix}{" "}
        <span className="block">
          <span className="inline-grid align-top">
            {words.map((word) => (
              <span
                key={word}
                className="invisible col-start-1 row-start-1 select-none"
              >
                {word}
              </span>
            ))}

            <span className="col-start-1 row-start-1 whitespace-nowrap bg-linear-to-r from-primary to-brand-soft bg-clip-text text-transparent leading-[1.2]">
              {typedWord}
              {!reduceMotion && (
                <motion.span
                  className="ml-[0.05em] inline-block h-[0.82em] w-[0.07em] rounded-full bg-primary"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.55,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                />
              )}
            </span>
          </span>
        </span>
      </span>
    </h1>
  );
}
