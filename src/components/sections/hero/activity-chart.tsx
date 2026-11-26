"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "./motion";

/** Bar heights as a percentage of the plot area. Sample data only. */
const BARS = [34, 46, 40, 56, 52, 64, 60, 72, 78, 84, 92, 100] as const;

/**
 * A weekly activity bar chart. Bars grow up from the baseline once, staggered
 * left to right, and the latest bar is the full-strength brand blue.
 * There is no looping or glow animation.
 */
export function ActivityChart() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative h-24 w-full" aria-hidden="true">
      {/* Horizontal guide lines */}
      {[25, 50, 75].map((position) => (
        <span
          key={position}
          className="absolute inset-x-0 border-t border-dashed border-border"
          style={{ bottom: `${position}%` }}
        />
      ))}

      <div className="relative flex h-full items-end gap-1.5">
        {BARS.map((height, index) => {
          const isLatest = index === BARS.length - 1;

          return (
            <motion.div
              key={index}
              className="flex-1 origin-bottom rounded-t-[3px] bg-primary"
              style={{
                height: `${height}%`,
                opacity: isLatest ? 1 : 0.28 + index * 0.05,
              }}
              initial={reduceMotion ? false : { scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.9 + index * 0.05,
                ease: EASE_OUT,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
