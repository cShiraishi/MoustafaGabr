import "server-only";

import snapshot from "@/data/scholar-snapshot.json";
import { fetchScholarProfile, type ScholarProfile } from "./scholar-source.mjs";
import { site } from "@/content/site";

export type { Publication, ScholarProfile, ScholarSource } from "./scholar-source.mjs";

const SNAPSHOT = snapshot as unknown as ScholarProfile;

/** Cache window for the live Scholar lookup, in seconds. */
export const SCHOLAR_REVALIDATE = 60 * 60 * 24;

const isProduction = process.env.NODE_ENV === "production";
const liveInDev = process.env.SCHOLAR_LIVE === "1";

/**
 * Reads the Scholar profile through the provider chain.
 *
 * Called from server components that declare `export const revalidate`, so the
 * network round-trip happens at most once per revalidation window; every other
 * request is served from the rendered page. If every provider fails, the
 * committed snapshot keeps the page correct instead of empty.
 */
export async function getScholarProfile(): Promise<ScholarProfile> {
  if (!isProduction && !liveInDev) return { ...SNAPSHOT, source: "snapshot" };

  return fetchScholarProfile({
    scholarId: site.pi.scholarId,
    serpApiKey: process.env.SERPAPI_API_KEY ?? "",
    allowScrape: process.env.SCHOLAR_ALLOW_SCRAPE !== "0",
    snapshot: SNAPSHOT,
    fetchImpl: (input, init) =>
      fetch(input, { ...init, next: { revalidate: SCHOLAR_REVALIDATE } }),
    onWarn: (message) => console.warn(`[scholar] ${message}`),
  });
}

/** Publications grouped by year, newest first. */
export function groupByYear(publications: ScholarProfile["publications"]) {
  const buckets = new Map<number, ScholarProfile["publications"]>();
  for (const pub of publications) {
    const year = pub.year ?? 0;
    const bucket = buckets.get(year);
    if (bucket) bucket.push(pub);
    else buckets.set(year, [pub]);
  }
  return [...buckets.entries()]
    .sort((a, b) => b[0] - a[0])
    .map(([year, items]) => ({
      year,
      items: [...items].sort((a, b) => b.citations - a.citations),
    }));
}

/** Highest-impact papers, used for the "selected publications" block. */
export function selectedPublications(profile: ScholarProfile, count = 6) {
  return [...profile.publications].sort((a, b) => b.citations - a.citations).slice(0, count);
}

/** Marks the PI in an author string so the reader can find them at a glance. */
export function splitAuthors(authors: string) {
  return authors.split(",").map((raw) => {
    const name = raw.trim();
    return { name, isPi: /(^|\s)M(oustafa)?\.?\s?T?\.?\s?Gabr$/i.test(name) };
  });
}
