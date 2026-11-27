"use client";

import { motion, MotionConfig } from "motion/react";
import { cn } from "@/lib/utils";
import { DesktopNav } from "./desktop-nav";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { primaryCta, signInLink } from "./navbar-content";
import { ThemeToggle } from "./theme-toggle";
import { useScrolled } from "./use-scrolled";

/**
 * Fixed site header. At the top of the page it is transparent and aligned with
 * the page container; after scrolling it condenses into a floating bar.
 */
export function Navbar() {
  const condensed = useScrolled();

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        // Keeps layout animations accurate inside a fixed element.
        layoutRoot
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "transition-[padding] duration-300 ease-out motion-reduce:transition-none",
            condensed ? "px-3 pt-3" : "px-0 pt-0",
          )}
        >
          <div
            className={cn(
              "pointer-events-auto mx-auto flex w-full items-center justify-between gap-4 rounded-2xl border transition-[max-width,height,padding,background-color,border-color,box-shadow,backdrop-filter] duration-300 ease-out motion-reduce:transition-none lg:grid lg:grid-cols-[1fr_auto_1fr]",
              condensed
                ? "h-14 max-w-5xl border-border bg-background/80 pr-1.5 pl-4 shadow-lg shadow-foreground/5 backdrop-blur-xl lg:pr-2.5 dark:bg-card/80 dark:shadow-black/40"
                : "h-18 max-w-7xl border-transparent bg-transparent px-5 sm:px-8 lg:px-10",
            )}
          >
            <Logo className="justify-self-start" />

            <DesktopNav className="hidden lg:block" />

            <div className="flex items-center gap-1 justify-self-end">
              <ThemeToggle />
              <a
                href={signInLink.href}
                className="hidden h-9 items-center rounded-xl px-3 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:inline-flex"
              >
                {signInLink.label}
              </a>
              <a
                href={primaryCta.href}
                className="group hidden h-9 items-center gap-1.5 rounded-xl bg-primary px-3.5 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:inline-flex"
              >
                {primaryCta.label}
              </a>
              <MobileMenu className="lg:hidden" />
            </div>
          </div>
        </div>
      </motion.header>
    </MotionConfig>
  );
}
