"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { ExternalLink, Quote, Search } from "lucide-react";

import type { Publication } from "@/lib/scholar";

type SortKey = "year" | "citations";

const PAGE_SIZE = 30;

/** Highlights the PI inside Scholar's abbreviated author string. */
function Authors({ authors }: { authors: string }) {
  if (!authors) return null;
  const parts = authors.split(",");
  return (
    <p className="mt-1.5 text-[0.82rem] leading-relaxed text-[var(--color-muted)]">
      {parts.map((raw, i) => {
        const name = raw.trim();
        const isPi = /^m(oustafa)?\.?\s?t?\.?\s?gabr$/i.test(name.replace(/\./g, "."));
        return (
          <span key={`${name}-${i}`}>
            {isPi ? <span className="font-medium text-[var(--color-ink-2)]">{name}</span> : name}
            {i < parts.length - 1 ? ", " : ""}
          </span>
        );
      })}
    </p>
  );
}

export function PublicationList({ publications }: { publications: Publication[] }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("year");
  const [limit, setLimit] = useState(PAGE_SIZE);

  const deferredQuery = useDeferredValue(query);

  const years = useMemo(() => {
    const set = new Set<number>();
    for (const p of publications) if (p.year) set.add(p.year);
    return [...set].sort((a, b) => b - a);
  }, [publications]);

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const rows = publications.filter((p) => {
      if (year !== "all" && String(p.year) !== year) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.venue.toLowerCase().includes(q)
      );
    });
    return rows.sort((a, b) =>
      sort === "citations"
        ? b.citations - a.citations
        : (b.year ?? 0) - (a.year ?? 0) || b.citations - a.citations,
    );
  }, [publications, deferredQuery, year, sort]);

  const visible = filtered.slice(0, limit);

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-5 border-b border-[var(--color-line)] bg-[var(--color-paper)]/90 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative min-w-[220px] flex-1">
            <span className="sr-only">Search publications</span>
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)]"
            />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setLimit(PAGE_SIZE);
              }}
              placeholder="Search title, author or journal"
              className="w-full rounded-full border border-[var(--color-line)] bg-[var(--color-paper-2)] py-2 pl-9 pr-4 text-sm text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-muted)] focus:border-[var(--color-brand)]"
            />
          </label>

          <label className="text-sm">
            <span className="sr-only">Filter by year</span>
            <select
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
                setLimit(PAGE_SIZE);
              }}
              className="rounded-full border border-[var(--color-line)] bg-[var(--color-paper-2)] px-3 py-2 text-sm outline-none focus:border-[var(--color-brand)]"
            >
              <option value="all">All years</option>
              {years.map((y) => (
                <option key={y} value={String(y)}>
                  {y}
                </option>
              ))}
            </select>
          </label>

          <div
            role="group"
            aria-label="Sort publications"
            className="flex overflow-hidden rounded-full border border-[var(--color-line)]"
          >
            {(
              [
                ["year", "Newest"],
                ["citations", "Most cited"],
              ] as [SortKey, string][]
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSort(key)}
                aria-pressed={sort === key}
                className={`px-3.5 py-2 text-sm transition-colors ${
                  sort === key
                    ? "bg-[var(--color-ink)] text-[var(--color-paper)]"
                    : "bg-[var(--color-paper-2)] text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-2 font-mono text-[0.7rem] text-[var(--color-muted)]">
          {filtered.length} of {publications.length} records
        </p>
      </div>

      <ol className="mt-2">
        {visible.map((pub) => (
          <li
            key={pub.id}
            className="group grid grid-cols-[3.25rem_1fr] gap-4 border-b border-[var(--color-line)] py-6 last:border-0 sm:grid-cols-[4.5rem_1fr] sm:gap-6"
          >
            <div className="pt-0.5">
              <div className="font-mono text-sm text-[var(--color-ink-2)]">{pub.year ?? "—"}</div>
              <div className="mt-1 inline-flex items-center gap-1 font-mono text-[0.68rem] text-[var(--color-muted)]">
                <Quote size={10} />
                {pub.citations}
              </div>
            </div>

            <div>
              <h3 className="font-serif text-[1.05rem] leading-snug sm:text-[1.15rem]">
                {pub.link ? (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline decoration-[var(--color-line-strong)] underline-offset-[5px] transition-colors hover:text-[var(--color-brand)] hover:underline"
                  >
                    {pub.title}
                    <ExternalLink
                      size={12}
                      className="ml-1.5 inline -translate-y-px opacity-0 transition-opacity group-hover:opacity-60"
                    />
                  </a>
                ) : (
                  pub.title
                )}
              </h3>
              <Authors authors={pub.authors} />
              {pub.venue ? (
                <p className="mt-1 text-[0.82rem] italic text-[var(--color-ink-2)]">{pub.venue}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>

      {visible.length < filtered.length ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setLimit((n) => n + PAGE_SIZE)}
            className="rounded-full border border-[var(--color-line-strong)] px-6 py-2.5 text-sm transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
          >
            Show {Math.min(PAGE_SIZE, filtered.length - visible.length)} more
          </button>
        </div>
      ) : null}

      {!filtered.length ? (
        <p className="py-16 text-center text-sm text-[var(--color-muted)]">
          No publication matches that filter.
        </p>
      ) : null}
    </div>
  );
}
