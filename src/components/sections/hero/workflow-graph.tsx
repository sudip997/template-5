"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  IconBellRinging,
  IconDatabase,
  IconFileAnalytics,
  IconHeadset,
  IconSparkles,
  type Icon,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "./motion";

/** Coordinate space shared by the connector paths and the node positions. */
const WIDTH = 320;
const HEIGHT = 150;

type GraphNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  icon: Icon;
  variant: "default" | "model";
};

const nodes: readonly GraphNode[] = [
  { id: "crm", label: "CRM", x: 44, y: 32, icon: IconDatabase, variant: "default" },
  { id: "tickets", label: "Tickets", x: 44, y: 100, icon: IconHeadset, variant: "default" },
  { id: "model", label: "Nexora", x: 160, y: 66, icon: IconSparkles, variant: "model" },
  { id: "report", label: "Report", x: 276, y: 32, icon: IconFileAnalytics, variant: "default" },
  { id: "alert", label: "Alert", x: 276, y: 100, icon: IconBellRinging, variant: "default" },
];

type GraphEdge = { id: string; path: string; pulseDelay: number };

const edges: readonly GraphEdge[] = [
  { id: "crm-model", path: "M44 32 C 104 32, 100 66, 160 66", pulseDelay: 0 },
  { id: "tickets-model", path: "M44 100 C 104 100, 100 66, 160 66", pulseDelay: 0.5 },
  { id: "model-report", path: "M160 66 C 220 66, 216 32, 276 32", pulseDelay: 1.3 },
  { id: "model-alert", path: "M160 66 C 220 66, 216 100, 276 100", pulseDelay: 1.8 },
];

/**
 * A small data → model → action diagram. Connectors draw in once, then a short
 * bright dash travels along each one (CSS, see `.workflow-pulse` in globals.css).
 * Nodes are positioned in percentages of the same coordinate space as the paths,
 * so everything stays aligned at any width.
 */
export function WorkflowGraph({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn("relative w-full", className)}
      style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
    >
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="absolute inset-0 size-full text-primary"
        fill="none"
        aria-hidden="true"
      >
        {edges.map((edge, index) => (
          <g key={edge.id}>
            <motion.path
              d={edge.path}
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              className="opacity-25"
              initial={reduceMotion ? false : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 0.9,
                delay: 0.9 + index * 0.12,
                ease: EASE_OUT,
              }}
            />
            <path
              d={edge.path}
              pathLength={1}
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              className="workflow-pulse"
              style={{ animationDelay: `${1.8 + edge.pulseDelay}s` }}
            />
          </g>
        ))}
      </svg>

      {nodes.map((node, index) => {
        const NodeIcon = node.icon;
        const isModel = node.variant === "model";

        return (
          <motion.div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${(node.x / WIDTH) * 100}%`,
              top: `${(node.y / HEIGHT) * 100}%`,
            }}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.7 + index * 0.08,
              ease: EASE_OUT,
            }}
          >
            <div
              className={cn(
                "grid place-items-center rounded-xl border",
                isModel
                  ? "size-11 border-transparent bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-4 ring-primary/15"
                  : "size-9 bg-card text-muted-foreground shadow-xs",
              )}
            >
              <NodeIcon className={isModel ? "size-5" : "size-4"} />
            </div>
            <span
              className={cn(
                "absolute left-1/2 -translate-x-1/2 text-[11px] leading-none font-medium whitespace-nowrap",
                isModel ? "top-[calc(100%+6px)] text-foreground" : "top-[calc(100%+5px)] text-muted-foreground",
              )}
            >
              {node.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
