"use client";

import { motion, MotionConfig } from "motion/react";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import { EASE_OUT } from "../hero/motion";
import { features, featuresHeading, type FeatureId } from "./features-content";
import { SignalStream } from "./signal-stream";

/** Desktop: two cards, a tall one on the right, and a wide one underneath. */
const cardLayout: Record<FeatureId, string> = {
  signals: "",
  second: "",
  third: "md:col-span-2 lg:col-span-1 lg:row-span-2",
  fourth: "md:col-span-2",
};

/** Stands in for a card's visual until its content is decided. */
function VisualPlaceholder() {
  return (
    <div
      aria-hidden="true"
      className="mx-6 mb-6 min-h-48 flex-1 rounded-2xl border border-dashed sm:mx-8 sm:mb-8"
    />
  );
}

export function Features() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="features"
        aria-labelledby="features-heading"
        className="scroll-mt-20 border-t py-20 sm:py-28"
      >
        <Container>
          <h2 id="features-heading" className="sr-only">
            {featuresHeading}
          </h2>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {features.map((feature, index) => (
              <motion.article
                key={feature.id}
                className={cn(
                  "flex min-w-0 flex-col overflow-hidden rounded-3xl bg-secondary/70 dark:bg-card",
                  cardLayout[feature.id],
                )}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: EASE_OUT,
                }}
              >
                <div className="p-6 pb-4 sm:p-8 sm:pb-4">
                  <h3 className="font-heading text-xl font-bold tracking-tight text-primary">
                    {feature.title}
                  </h3>
                  <p className="mt-2 max-w-md leading-relaxed text-pretty">
                    {feature.description}
                  </p>
                </div>

                {feature.id === "signals" ? (
                  <div className="mt-auto pb-2">
                    <SignalStream />
                  </div>
                ) : (
                  <VisualPlaceholder />
                )}
              </motion.article>
            ))}
          </div>
        </Container>
      </section>
    </MotionConfig>
  );
}
