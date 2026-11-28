"use client";

import { Fragment } from "react";
import { motion } from "motion/react";
import {
  IconBellRinging,
  IconBolt,
  IconFilter,
  type Icon,
} from "@tabler/icons-react";
import { EASE_OUT } from "../hero/motion";
import { workflowExample } from "./signal-content";

const icons: Record<(typeof workflowExample)[number]["kind"], Icon> = {
  Trigger: IconBolt,
  Condition: IconFilter,
  Action: IconBellRinging,
};

/** The answer turned into a trigger, condition and action chain. */
export function ActPanel({ play }: { play: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <ol className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
        {workflowExample.map((node, index) => {
          const NodeIcon = icons[node.kind];

          return (
            <Fragment key={node.kind}>
              {index > 0 && (
                <motion.li
                  role="presentation"
                  className="mx-auto h-7 w-0.5 origin-top bg-primary"
                  initial={{ scaleY: 0 }}
                  animate={play ? { scaleY: 1 } : undefined}
                  transition={{ duration: 0.3, delay: index * 0.45 - 0.2 }}
                />
              )}
              <motion.li
                className="flex items-center gap-3 rounded-xl border bg-background p-3 shadow-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={play ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.45,
                  delay: index * 0.45,
                  ease: EASE_OUT,
                }}
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <NodeIcon className="size-4" />
                </span>
                <span>
                  <span className="block text-xs text-muted-foreground">
                    {node.kind}
                  </span>
                  <span className="block text-sm font-semibold">
                    {node.label}
                  </span>
                </span>
              </motion.li>
            </Fragment>
          );
        })}
      </ol>

      <p className="border-t pt-3 text-xs text-muted-foreground">
        Runs whenever an account matches the condition
      </p>
    </div>
  );
}
