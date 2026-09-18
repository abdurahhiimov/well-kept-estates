"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/site/wordmark";
import { Button } from "@/components/ui/button";
import { nav, cta } from "@/lib/content";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const pathname = usePathname();

  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  /* A route link ("/about") can be current; an in-page anchor ("/#pricing")
     never is — there's no separate page to mark as active. */
  const isCurrent = (href: string) =>
    !href.includes("#") && href === pathname;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Keyboard behaviour for the mobile panel: Escape closes it and returns
     focus to the button that opened it, and Tab loops inside the panel
     instead of escaping into content stacked behind it. Opening moves focus
     onto the first link so a keyboard user isn't left stranded on a button
     that just changed meaning. */
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const firstLink = panel?.querySelector<HTMLElement>(FOCUSABLE);
    firstLink?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      data-surface="dark"
      /*
        Inline, not a class: `[data-surface="dark"]` is unlayered and would beat
        an equally-specific rule inside @layer components, quietly reverting the
        tint to near-transparent.
      */
      style={
        {
          "--glass-tint": "42 38 34",
          "--glass-tint-a": "0.93",
          "--glass-rim": "255 255 255",
          "--glass-rim-a": "0.13",
          "--glass-blur": "24px",
        } as React.CSSProperties
      }
    >
      {/*
        One continuous bar rather than three floating pills. Separate pills left
        gaps for the page to scroll through, which read as things overlapping;
        a single pane blurs everything passing under it uniformly. It's also why
        there's no pill nested inside — that was the box-in-a-box.
      */}
      <div className="relative border-b border-white/10 bg-night">
        <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between gap-6 px-6 md:h-24">
          {/* Reversed lockup: the emblem knocked out to cream so it carries
              the same weight as the type beside it. The badge's own cream
              ground put a bordered plate inside a bordered bar. */}
          <Link
            href="/"
            aria-label="Well Kept Estates — home"
            className="flex shrink-0 items-center gap-3.5"
          >
            <Image
              src="/logo-emblem-reversed.png"
              alt=""
              width={1412}
              height={1050}
              priority
              sizes="65px"
              className="h-10 w-auto md:h-12"
            />
            <Wordmark size="md" />
          </Link>

          <nav className="hidden lg:block">
            <ul
              className="flex items-center gap-3"
              onMouseLeave={() => setHovered(null)}
            >
              {nav.map((item) => (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHovered(item.href)}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className="relative block whitespace-nowrap px-5 py-1 font-mono text-[0.9rem] uppercase tracking-[0.05em] text-foreground/95 transition-colors duration-200 hover:text-foreground aria-[current=page]:text-foreground"
                  >
                    {item.label}
                    {hovered === item.href && !reduced && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-5 -bottom-0.5 h-px bg-stamp"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Barely lighter than the bar — enough to register as the one thing
              to press, not enough to shout. */}
          <Link
            href={cta.href}
            className="hidden shrink-0 rounded-sm border border-white/15 bg-white/[0.09] px-5 py-1.5 font-mono text-[0.82rem] uppercase tracking-[0.05em] text-foreground shadow-[0_3px_0_0_rgb(0_0_0/0.35)] transition-[transform,box-shadow,background-color] duration-100 ease-out hover:bg-white/[0.14] active:translate-y-[3px] active:shadow-none motion-reduce:transition-none lg:block"
          >
            {cta.label}
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center text-foreground lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 top-full lg:hidden"
          >
            <div className="border-b border-white/10 bg-night">
              <nav className="container flex flex-col py-4">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={isCurrent(item.href) ? "page" : undefined}
                      className="block border-b border-white/10 py-4 font-mono text-sm uppercase tracking-[0.08em] text-foreground"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                <Button asChild variant="paper" size="lg" className="mt-5">
                  <Link href={cta.href} onClick={() => setOpen(false)}>
                    {cta.label}
                  </Link>
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
