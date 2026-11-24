import { cn } from "@/lib/utils";

/** Static, decorative neural-network-style cluster that sits behind the product preview. */
const points: readonly (readonly [number, number])[] = [
  [40, 60],
  [120, 20],
  [210, 70],
  [300, 28],
  [400, 64],
  [450, 150],
  [380, 210],
  [290, 170],
  [190, 150],
  [90, 130],
  [60, 230],
  [160, 260],
  [270, 300],
  [390, 310],
];

const links: readonly (readonly [number, number])[] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 7],
  [7, 2],
  [7, 8],
  [8, 2],
  [8, 9],
  [9, 0],
  [9, 10],
  [10, 11],
  [11, 8],
  [11, 12],
  [12, 7],
  [12, 13],
  [13, 6],
];

export function NeuralBackdrop({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 340"
      fill="none"
      aria-hidden="true"
      className={cn(
        "pointer-events-none text-primary [mask-image:radial-gradient(closest-side,black,transparent)]",
        className,
      )}
    >
      {links.map(([from, to]) => (
        <line
          key={`${from}-${to}`}
          x1={points[from][0]}
          y1={points[from][1]}
          x2={points[to][0]}
          y2={points[to][1]}
          stroke="currentColor"
          strokeWidth={1}
          opacity={0.45}
        />
      ))}
      {points.map(([x, y], index) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={index % 3 === 0 ? 4 : 2.5}
          fill="currentColor"
          opacity={index % 3 === 0 ? 0.9 : 0.6}
        />
      ))}
    </svg>
  );
}
