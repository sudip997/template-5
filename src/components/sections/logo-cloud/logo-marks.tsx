import type * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Simple geometric marks for the fictional brands. They draw with
 * `currentColor`, so they follow the text color in both themes.
 */
const marks = {
  peak: <path d="M2 16 8 4l4 8 2-4 4 8Z" fill="currentColor" />,
  stack: (
    <g fill="currentColor">
      <rect x="3" y="3" width="14" height="3.5" rx="1.75" />
      <rect x="3" y="8.25" width="10" height="3.5" rx="1.75" />
      <rect x="3" y="13.5" width="6" height="3.5" rx="1.75" />
    </g>
  ),
  grid: (
    <g fill="currentColor">
      <rect x="3" y="3" width="6" height="6" rx="1.5" />
      <rect x="11" y="3" width="6" height="6" rx="3" />
      <rect x="3" y="11" width="6" height="6" rx="3" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" />
    </g>
  ),
  orbit: (
    <>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" />
      <circle cx="10" cy="10" r="2.5" fill="currentColor" />
    </>
  ),
  fold: (
    <>
      <path d="M3 3h9l5 5H8Z" fill="currentColor" />
      <path d="M3 3l5 5v9l-5-5Z" fill="currentColor" opacity="0.55" />
    </>
  ),
  strata: (
    <path
      d="m3 7 7-4 7 4-7 4Zm0 4 7 4 7-4M3 14l7 4 7-4"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
  ),
  hexagon: (
    <>
      <path
        d="m10 2 7 4v8l-7 4-7-4V6Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="10" r="2" fill="currentColor" />
    </>
  ),
  leaf: (
    <path
      d="M4 16C3 8 8 3 17 3c1 9-5 14-13 13Zm0 0 8-8"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  wave: (
    <path
      d="M2 8c2.7-4 5.3-4 8 0s5.3 4 8 0M2 14c2.7-4 5.3-4 8 0s5.3 4 8 0"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  ),
  rings: (
    <g stroke="currentColor" strokeWidth="1.8">
      <circle cx="7.5" cy="10" r="5" />
      <circle cx="12.5" cy="10" r="5" />
    </g>
  ),
  prism: (
    <>
      <path d="M10 3 2.5 16H10Z" fill="currentColor" />
      <path d="M10 3l7.5 13H10Z" fill="currentColor" opacity="0.5" />
    </>
  ),
  wing: (
    <path
      d="M2 5c8 0 13 3 16 11-4-3-7-4-10-4l3-2C8 8 5 7 2 5Z"
      fill="currentColor"
    />
  ),
} satisfies Record<string, React.ReactNode>;

export type LogoMarkName = keyof typeof marks;

export function LogoMark({
  name,
  className,
}: {
  name: LogoMarkName;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={cn("size-5 shrink-0", className)}
    >
      {marks[name]}
    </svg>
  );
}
