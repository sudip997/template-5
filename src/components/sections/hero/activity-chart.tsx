"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT } from "./motion";

const WIDTH = 240;
const HEIGHT = 96;

/** A simple rising J-curve with a soft fade underneath. Sample data only. */
const LINE_PATH =
  "M0 80 C 28 79, 44 74, 64 68 S 100 60, 120 52 S 156 42, 176 30 S 214 14, 232 8";
const AREA_PATH = `${LINE_PATH} L232 ${HEIGHT} L0 ${HEIGHT} Z`;
const END_POINT = { x: 232, y: 8 };

export function ActivityChart() {
  const reduceMotion = useReducedMotion();
  const gradientId = useId();

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="h-auto w-full text-primary"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.28" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[24, 48, 72].map((y) => (
        <line
          key={y}
          x1="0"
          x2={WIDTH}
          y1={y}
          y2={y}
          className="stroke-border"
          strokeDasharray="3 4"
        />
      ))}

      <motion.path
        d={AREA_PATH}
        fill={`url(#${gradientId})`}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.2, ease: EASE_OUT }}
      />

      <motion.path
        d={LINE_PATH}
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        initial={reduceMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.3, delay: 0.9, ease: EASE_OUT }}
      />

      {!reduceMotion && (
        <motion.circle
          cx={END_POINT.x}
          cy={END_POINT.y}
          r={4}
          fill="currentColor"
          initial={{ opacity: 0 }}
          animate={{ r: [4, 11], opacity: [0.35, 0] }}
          transition={{
            duration: 2.2,
            delay: 2.2,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}

      <motion.circle
        cx={END_POINT.x}
        cy={END_POINT.y}
        r={4}
        fill="currentColor"
        className="stroke-card"
        strokeWidth={2}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 2.1, ease: EASE_OUT }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      />
    </svg>
  );
}
