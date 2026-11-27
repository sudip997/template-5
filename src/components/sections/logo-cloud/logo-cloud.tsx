"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "../hero/motion";
import {
  logoBrands,
  logoCloudTitle,
  logoSwapIntervalMs,
} from "./logo-cloud-content";
import { LogoMark } from "./logo-marks";
import { BASE_SLOTS, useLogoSlots } from "./use-logo-slots";

/**
 * Blue "nodes" on a few grid intersections, keyed by cell. Each one is centred
 * on the 1px line crossing at that corner of the cell.
 */
const nodePositions: Partial<Record<number, string>> = {
  0: "-top-[3px] -left-[3px]",
  2: "-right-[3px] -bottom-[3px]",
  4: "-top-[3px] -right-[3px]",
};

/**
 * A "connected sources" grid of customer logos: hairline cells, a pulse running
 * along the top line and one cell at a time swapping to another brand.
 * The animated grid is decorative; screen readers get one stable list instead.
 */
export function LogoCloud() {
  const reduceMotion = useReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const inView = useInView(gridRef, { amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  const slots = useLogoSlots(
    logoBrands.length,
    logoSwapIntervalMs,
    inView && !hovered && !reduceMotion,
  );

  const grid: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
  };

  const cell: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  };

  return (
    <section
      id="logo-cloud"
      aria-labelledby="logo-cloud-heading"
      className="pt-4 pb-20 sm:pb-24"
    >
      <Container>
        <h2
          id="logo-cloud-heading"
          className="text-center font-medium text-balance text-sm text-muted-foreground/70"
        >
          {logoCloudTitle}
        </h2>

        <ul className="sr-only">
          {logoBrands.map((brand) => (
            <li key={brand.name}>{brand.name}</li>
          ))}
        </ul>

        <div
          ref={gridRef}
          aria-hidden="true"
          className="relative mt-8"
          // Hold still under a mouse so a logo never changes while being looked at.
          onPointerEnter={(event) => {
            if (event.pointerType === "mouse") setHovered(true);
          }}
          onPointerLeave={() => setHovered(false)}
        >
          <motion.div
            variants={grid}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-2 border-t border-l sm:grid-cols-4 lg:grid-cols-6"
          >
            {slots.map((brandIndex, slot) => {
              const brand = logoBrands[brandIndex];
              const nodePosition = nodePositions[slot];

              return (
                <div
                  key={slot}
                  className={cn(
                    "group relative h-20 border-r border-b sm:h-24",
                    slot >= BASE_SLOTS && "hidden sm:block lg:hidden",
                  )}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(60%_75%_at_50%_100%,var(--glow),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <motion.div
                    variants={cell}
                    className="relative size-full overflow-hidden"
                  >
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={brand.name}
                        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                        className="absolute inset-0 flex items-center justify-center gap-2 px-2 text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                      >
                        <LogoMark name={brand.mark} />
                        <span
                          className={cn(
                            "whitespace-nowrap",
                            brand.wordmarkClassName,
                          )}
                        >
                          {brand.name}
                        </span>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>

                  {nodePosition && (
                    <span
                      className={cn(
                        "absolute z-10 size-[5px] rounded-full bg-primary",
                        nodePosition,
                      )}
                    />
                  )}
                </div>
              );
            })}
          </motion.div>

          {/* Pulse travelling along the top line */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden">
            <div className="logo-cloud-pulse h-full w-full bg-[linear-gradient(to_right,transparent_40%,var(--primary)_50%,transparent_60%)]" />
          </div>
        </div>
      </Container>
    </section>
  );
}
