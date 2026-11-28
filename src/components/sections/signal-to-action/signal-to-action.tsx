"use client";

import { useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import {
  signalHeading,
  signalIntro,
  signalSteps,
  type SignalStep,
} from "./signal-content";
import { SignalPanel } from "./signal-panel";

/**
 * Where the pinned story starts and ends, as fractions of the viewport height:
 * progress is 0 when the track's top reaches START and 1 when its bottom
 * reaches END.
 */
const START = 0.2;
const END = 0.8;

const stepNumber = (index: number) => String(index + 1).padStart(2, "0");

/**
 * Desktop: the step list and one product window stay pinned while scrolling
 * moves through the steps. The `pinned` variant (see globals.css) also requires
 * enough height and no reduced-motion preference.
 */
function PinnedStory() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const inView = useInView(trackRef, { once: true, amount: 0.15 });
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: [`start ${START}`, `end ${END}`],
  });

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const index = Math.floor(progress * signalSteps.length);
    setActiveIndex(Math.min(Math.max(index, 0), signalSteps.length - 1));
  });

  /** Scrolls to the middle of a step's share of the track. */
  function goToStep(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const from = window.scrollY + rect.top - window.innerHeight * START;
    const to = window.scrollY + rect.bottom - window.innerHeight * END;
    window.scrollTo({
      top: from + ((index + 0.5) / signalSteps.length) * (to - from),
      behavior: "smooth",
    });
  }

  return (
    <div
      ref={trackRef}
      className="mt-14 hidden h-[calc(27rem+180svh)] pinned:block"
    >
      <div className="sticky top-[max(6rem,calc(50svh-13.5rem))] grid grid-cols-[minmax(0,4fr)_minmax(0,6fr)] gap-12 xl:gap-20">
        <div className="relative h-[27rem]">
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-0.5 bg-border">
            <motion.div
              className="size-full origin-top bg-primary"
              style={{ scaleY: scrollYProgress }}
            />
          </div>

          <ol className="grid h-full grid-rows-3">
            {signalSteps.map((step, index) => {
              const active = index === activeIndex;

              return (
                <li
                  key={step.id}
                  aria-current={active ? "step" : undefined}
                  className="group relative flex flex-col justify-center pl-8"
                >
                  <span
                    className={cn(
                      "text-sm font-medium tabular-nums transition-colors",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {stepNumber(index)}
                  </span>
                  <h3
                    className={cn(
                      "mt-1 font-heading text-2xl font-bold tracking-tight transition-colors group-hover:text-foreground",
                      active ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => goToStep(index)}
                      // The pseudo-element makes the whole row clickable.
                      className="rounded-sm after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
                    >
                      {step.title}
                    </button>
                  </h3>
                  <p className="mt-2 max-w-sm leading-relaxed text-pretty text-muted-foreground">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <SignalPanel step={signalSteps[activeIndex]} play={inView} />
      </div>
    </div>
  );
}

/** One step with its own window, for small, short or reduced-motion screens. */
function StackedStep({ step, index }: { step: SignalStep; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <li ref={ref} className="grid content-start gap-5">
      <div className="border-l-2 border-primary pl-5">
        <span className="text-sm font-medium text-primary tabular-nums">
          {stepNumber(index)}
        </span>
        <h3 className="mt-1 font-heading text-2xl font-bold tracking-tight">
          {step.title}
        </h3>
        <p className="mt-2 max-w-md leading-relaxed text-pretty text-muted-foreground">
          {step.description}
        </p>
      </div>
      <SignalPanel step={step} play={inView} className="w-full max-w-2xl" />
    </li>
  );
}

export function SignalToAction() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="workflow"
        aria-labelledby="workflow-heading"
        className="scroll-mt-20 border-t py-20 sm:py-28"
      >
        <Container>
          <div className="max-w-2xl">
            <h2
              id="workflow-heading"
              className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              {signalHeading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
              {signalIntro}
            </p>
          </div>

          <PinnedStory />

          <ol className="mt-12 grid gap-14 pinned:hidden">
            {signalSteps.map((step, index) => (
              <StackedStep key={step.id} step={step} index={index} />
            ))}
          </ol>
        </Container>
      </section>
    </MotionConfig>
  );
}
