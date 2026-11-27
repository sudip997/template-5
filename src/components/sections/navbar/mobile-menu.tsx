"use client";

import { useEffect, useRef, useState } from "react";
import type * as React from "react";
import { Dialog } from "@base-ui/react/dialog";
import { IconArrowRight, IconMenu2, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { navLinks, primaryCta, signInLink } from "./navbar-content";
import { ThemeToggle } from "./theme-toggle";

/** Matches Tailwind's `lg` breakpoint, where the desktop navigation takes over. */
const DESKTOP_QUERY = "(min-width: 64rem)";

const iconButtonClass =
  "grid size-11 shrink-0 place-items-center rounded-xl text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

/**
 * Mobile and tablet navigation. Base UI's Dialog provides the focus trap,
 * Escape to close, scroll lock and focus return.
 */
export function MobileMenu({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const pendingHref = useRef<string | null>(null);

  // Close the menu if the viewport grows to the desktop layout.
  useEffect(() => {
    const query = window.matchMedia(DESKTOP_QUERY);
    const handleChange = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  // Scroll only after the menu has closed, so the scroll lock cannot undo it.
  function handleLinkClick(
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    pendingHref.current = href;
    setOpen(false);
  }

  function handleOpenChangeComplete(isOpen: boolean) {
    const href = pendingHref.current;
    if (isOpen || !href) return;
    pendingHref.current = null;

    window.requestAnimationFrame(() => {
      window.history.pushState(null, "", href);
      document.getElementById(href.slice(1))?.scrollIntoView();
    });
  }

  return (
    <Dialog.Root
      open={open}
      onOpenChange={setOpen}
      onOpenChangeComplete={handleOpenChangeComplete}
    >
      <Dialog.Trigger
        aria-label="Open menu"
        className={cn(iconButtonClass, className)}
      >
        <IconMenu2 className="size-5" aria-hidden="true" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
        <Dialog.Popup className="fixed inset-x-3 top-3 z-[70] mx-auto max-h-[calc(100dvh-1.5rem)] max-w-xl overflow-y-auto rounded-2xl border bg-popover text-popover-foreground shadow-2xl shadow-primary/10 transition-[opacity,translate] duration-200 outline-none data-ending-style:-translate-y-2 data-ending-style:opacity-0 data-starting-style:-translate-y-2 data-starting-style:opacity-0 motion-reduce:transition-none">
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <div className="flex items-center justify-between gap-2 border-b py-1.5 pr-1.5 pl-4">
            <Logo onClick={() => setOpen(false)} />
            <div className="flex items-center gap-1">
              <ThemeToggle />
              <Dialog.Close aria-label="Close menu" className={iconButtonClass}>
                <IconX className="size-5" aria-hidden="true" />
              </Dialog.Close>
            </div>
          </div>

          <nav aria-label="Mobile" className="px-4 py-2">
            <ul className="divide-y">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(event) => handleLinkClick(event, link.href)}
                    className="group flex items-center justify-between rounded-md py-3.5 font-heading text-xl font-semibold text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    {link.label}
                    <IconArrowRight
                      className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-2.5 border-t bg-secondary/50 p-4 sm:grid-cols-2">
            <a
              href={signInLink.href}
              onClick={(event) => handleLinkClick(event, signInLink.href)}
              className="inline-flex h-12 items-center justify-center rounded-xl border bg-card text-[0.9375rem] font-medium text-foreground transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {signInLink.label}
            </a>
            <a
              href={primaryCta.href}
              onClick={(event) => handleLinkClick(event, primaryCta.href)}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-[0.9375rem] font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-colors hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {primaryCta.label}
              <IconArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
