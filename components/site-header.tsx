"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { nav, site } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-[var(--color-line)] bg-[var(--color-paper)]/85 backdrop-blur-md"
          : "border-transparent bg-[var(--color-paper)]"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="group flex items-baseline gap-2.5" aria-label={`${site.name} home`}>
          <span className="font-serif text-[1.35rem] leading-none tracking-tight">{site.name}</span>
          <span className="hidden text-[0.7rem] uppercase tracking-[0.16em] text-[var(--color-muted)] transition-colors group-hover:text-[var(--color-brand)] sm:inline">
            Columbia Radiology
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-md px-3 py-2 text-[0.9rem] transition-colors ${
                  active
                    ? "text-[var(--color-ink)]"
                    : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {item.label}
                {active ? (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-[var(--color-brand)]" />
                ) : null}
              </Link>
            );
          })}
          <div className="ml-2 border-l border-[var(--color-line)] pl-2">
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-md p-2 text-[var(--color-ink-2)] transition-colors hover:bg-[var(--color-paper-2)]"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-[var(--color-line)] bg-[var(--color-paper)] px-5 pb-4 pt-2 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block border-b border-[var(--color-line)] py-3 text-[0.95rem] text-[var(--color-ink-2)] last:border-0"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
