"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { navLinks } from "./navbar-content";

/** Primary links with a soft highlight that glides to the hovered or focused item. */
export function DesktopNav({ className }: { className?: string }) {
  const [highlighted, setHighlighted] = useState<string | null>(null);

  return (
    <nav aria-label="Primary" className={className}>
      <ul
        className="flex items-center gap-0.5"
        onMouseLeave={() => setHighlighted(null)}
        onBlur={() => setHighlighted(null)}
      >
        {navLinks.map((link) => (
          <li key={link.href} className="relative">
            {highlighted === link.href && (
              <motion.span
                layoutId="navbar-highlight"
                aria-hidden="true"
                className="absolute inset-0 rounded-lg bg-secondary"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <a
              href={link.href}
              onMouseEnter={() => setHighlighted(link.href)}
              onFocus={() => setHighlighted(link.href)}
              className="relative block rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
