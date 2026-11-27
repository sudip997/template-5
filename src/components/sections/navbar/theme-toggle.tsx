"use client";

import { useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  // Counts clicks so the icon animates after a toggle, but not on page load.
  const [toggles, setToggles] = useState(0);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setToggles((count) => count + 1);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring lg:size-9",
        className,
      )}
    >
      {/*
        The icon is chosen with CSS, so it is correct before hydration. A keyframe
        animation is used because the theme provider disables CSS transitions
        while the theme changes.
      */}
      <span
        key={toggles}
        className={cn(
          "grid place-items-center",
          toggles > 0 &&
            "motion-safe:animate-in motion-safe:fade-in motion-safe:spin-in-90 motion-safe:zoom-in-50 motion-safe:duration-300",
        )}
      >
        <IconMoon className="size-[1.125rem] dark:hidden" aria-hidden="true" />
        <IconSun
          className="hidden size-[1.125rem] dark:block"
          aria-hidden="true"
        />
      </span>
    </button>
  );
}
