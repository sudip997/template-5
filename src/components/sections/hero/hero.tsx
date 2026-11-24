"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  IconArrowRight,
  IconCheck,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { Container } from "@/components/container";
import {
  heroHeadlinePrefix,
  heroRotationIntervalMs,
  heroSlides,
} from "./hero-content";
import { HeroProductPreview } from "./hero-product-preview";
import { EASE_OUT } from "./motion";
import { RotatingHeadline } from "./rotating-headline";
import { useRotatingIndex } from "./use-rotating-index";

const headlineWords = heroSlides.map((slide) => slide.word);

const trustPoints = ["No credit card required", "14-day free trial"] as const;

/** Subtle masked grid, a soft blue glow and a fade into the next section. */
function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10"
    >
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_65%_30%,black,transparent_75%)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(55%_45%_at_72%_28%,var(--glow),transparent_70%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}

export function Hero() {
  const reduceMotion = useReducedMotion();
  const activeIndex = useRotatingIndex(
    heroSlides.length,
    heroRotationIntervalMs,
    !reduceMotion,
  );

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: 0.05,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_OUT },
    },
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-x-clip"
    >
      <HeroBackground />

      <Container className="grid items-center gap-14 pt-28 pb-16 sm:pt-32 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12 lg:pt-40 lg:pb-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.div variants={item}>
            <a
              href="#features"
              className="group inline-flex items-center gap-2 rounded-full border bg-card py-1 pr-3 pl-1 text-sm text-muted-foreground shadow-xs transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-medium text-accent-foreground">
                New
              </span>
              AI workflows 2.0
              <IconArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-6">
            <RotatingHeadline
              prefix={heroHeadlinePrefix}
              words={headlineWords}
              activeIndex={activeIndex}
            />
          </motion.div>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-lg leading-relaxed text-pretty text-muted-foreground"
          >
            Nexora connects your tools, understands your questions in plain
            language, and builds the workflows that turn information into
            action.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
          >
            <a
              href="#pricing"
              className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-[0.9375rem] font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-11 sm:w-auto"
            >
              Start free trial
              <IconArrowRight
                className="size-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href="#demo"
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl border bg-card px-6 text-[0.9375rem] font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:h-11 sm:w-auto"
            >
              <IconPlayerPlay className="size-4" aria-hidden="true" />
              Watch demo
            </a>
          </motion.div>

          <motion.ul
            variants={item}
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
          >
            {trustPoints.map((point) => (
              <li key={point} className="inline-flex items-center gap-1.5">
                <IconCheck
                  className="size-4 text-primary"
                  aria-hidden="true"
                />
                {point}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* On large screens the preview bleeds past the container's right edge. */}
        <HeroProductPreview
          slides={heroSlides}
          activeIndex={activeIndex}
          className="w-full lg:w-[calc(100%+4rem)] xl:w-[calc(100%+7rem)]"
        />
      </Container>
    </section>
  );
}
