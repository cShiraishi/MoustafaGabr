import Link from "next/link";
import { Mail, GraduationCap, BookOpen } from "lucide-react";

import { nav, site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--color-line)] bg-[var(--color-paper-2)]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <p className="font-serif text-xl">{site.longName}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[var(--color-muted)]">
            {site.tagline}
          </p>
          <address className="mt-5 space-y-0.5 text-sm not-italic text-[var(--color-muted)]">
            {site.address.lines.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </address>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow">Navigate</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-brand)]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="eyebrow">Elsewhere</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a
                href={`mailto:${site.pi.email}`}
                className="inline-flex items-center gap-2 text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-brand)]"
              >
                <Mail size={14} /> Email
              </a>
            </li>
            <li>
              <a
                href={site.links.scholar}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-brand)]"
              >
                <GraduationCap size={14} /> Google Scholar
              </a>
            </li>
            <li>
              <a
                href={site.links.pubmed}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-[var(--color-ink-2)] transition-colors hover:text-[var(--color-brand)]"
              >
                <BookOpen size={14} /> PubMed
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[var(--color-line)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-[var(--color-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {site.longName}. All rights reserved.
          </p>
          <p>
            Publication records synchronised from{" "}
            <a
              href={site.links.scholar}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 hover:text-[var(--color-brand)]"
            >
              Google Scholar
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
