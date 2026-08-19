/**
 * Google Scholar data source.
 *
 * Scholar publishes no official API, so this module implements a provider chain
 * and normalises every provider to the same shape:
 *
 *   1. SerpAPI  (engine=google_scholar_author) — reliable, needs SERPAPI_API_KEY
 *   2. Direct scrape of the public profile — free, frequently blocked from
 *      datacenter IPs, fine from a laptop or a GitHub Action runner
 *   3. Committed snapshot (data/scholar-snapshot.json) — always available
 *
 * The same module is used by the Next.js server components and by
 * `npm run sync:scholar`, so the parsing logic exists exactly once.
 */

const SCHOLAR_BASE = "https://scholar.google.com/citations";
const SERPAPI_BASE = "https://serpapi.com/search.json";
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36";

/* ------------------------------------------------------------------ utils */

const ENTITIES = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
  middot: "·",
  deg: "°",
  alpha: "α",
  beta: "β",
  gamma: "γ",
  kappa: "κ",
  mu: "μ",
  plusmn: "±",
  times: "×",
  prime: "′",
};

export function decodeEntities(input = "") {
  return input
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => ENTITIES[name.toLowerCase()] ?? m);
}

const stripTags = (html = "") =>
  decodeEntities(html.replace(/<[^>]*>/g, "")).replace(/\s+/g, " ").trim();

const toInt = (value) => {
  const n = parseInt(String(value ?? "").replace(/[^\d]/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
};

/** Stable id so React keys and de-duplication survive a provider switch. */
function makeId(title, year) {
  const slug = String(title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 72);
  return `${slug}-${year ?? "na"}`;
}

/** Splits Scholar's "Venue 12 (3), 45-67, 2024" trailer into venue + year. */
function splitVenue(raw = "") {
  const text = stripTags(raw);
  const match = text.match(/(?:^|[,\s])((?:19|20)\d{2})\s*$/);
  const year = match ? Number(match[1]) : null;
  const venue = (match ? text.slice(0, match.index) : text).replace(/[,\s]+$/, "");
  return { venue, year };
}

function normalisePublication(pub) {
  return {
    id: makeId(pub.title, pub.year),
    title: pub.title,
    authors: pub.authors ?? "",
    venue: pub.venue ?? "",
    year: pub.year ?? null,
    citations: pub.citations ?? 0,
    link: pub.link ?? "",
  };
}

function finalise(profile, source) {
  const seen = new Set();
  const publications = profile.publications
    .map(normalisePublication)
    .filter((p) => p.title && !seen.has(p.id) && seen.add(p.id))
    .sort((a, b) => (b.year ?? 0) - (a.year ?? 0) || b.citations - a.citations);

  return {
    ...profile,
    publications,
    source,
    fetchedAt: profile.fetchedAt ?? new Date().toISOString(),
  };
}

/* --------------------------------------------------------------- provider 1 */

export async function fetchFromSerpApi({ scholarId, apiKey, fetchImpl = fetch }) {
  const publications = [];
  let profile = null;

  // SerpAPI returns up to 100 articles per call; walk the pages until exhausted.
  for (let start = 0; start < 500; start += 100) {
    const url =
      `${SERPAPI_BASE}?engine=google_scholar_author&author_id=${encodeURIComponent(scholarId)}` +
      `&hl=en&sort=pubdate&num=100&start=${start}&api_key=${encodeURIComponent(apiKey)}`;

    const res = await fetchImpl(url, { headers: { accept: "application/json" } });
    if (!res.ok) throw new Error(`SerpAPI responded ${res.status}`);
    const json = await res.json();
    if (json.error) throw new Error(`SerpAPI: ${json.error}`);

    profile ??= json;
    const batch = json.articles ?? [];
    for (const a of batch) {
      publications.push({
        title: decodeEntities(a.title ?? ""),
        authors: decodeEntities(a.authors ?? ""),
        venue: decodeEntities(a.publication ?? ""),
        year: a.year ? Number(a.year) : null,
        citations: toInt(a.cited_by?.value),
        link: a.link ?? "",
      });
    }
    if (batch.length < 100) break;
  }

  const table = profile?.cited_by?.table ?? [];
  const pick = (key) => toInt(table.find((row) => row[key])?.[key]?.all);

  return finalise(
    {
      name: profile?.author?.name ?? "",
      affiliation: profile?.author?.affiliations ?? "",
      interests: (profile?.author?.interests ?? []).map((i) => i.title),
      metrics: {
        citations: pick("citations"),
        hIndex: pick("h_index"),
        i10Index: pick("i10_index"),
      },
      citationsPerYear: (profile?.cited_by?.graph ?? []).map((g) => ({
        year: g.year,
        citations: g.citations,
      })),
      publications,
    },
    "serpapi",
  );
}

/* --------------------------------------------------------------- provider 2 */

export async function fetchFromScrape({ scholarId, fetchImpl = fetch, pageSize = 100 }) {
  const publications = [];
  let html = "";

  for (let cstart = 0; cstart < 400; cstart += pageSize) {
    const url =
      `${SCHOLAR_BASE}?user=${encodeURIComponent(scholarId)}` +
      `&hl=en&view_op=list_works&sortby=pubdate&cstart=${cstart}&pagesize=${pageSize}`;

    const res = await fetchImpl(url, {
      headers: { "user-agent": UA, "accept-language": "en-US,en;q=0.9" },
    });
    if (!res.ok) throw new Error(`Scholar responded ${res.status}`);
    const page = await res.text();
    if (cstart === 0) html = page;

    const rows = page.match(/<tr class="gsc_a_tr">[\s\S]*?<\/tr>/g) ?? [];
    for (const row of rows) {
      // Scholar emits href before class: <a href="/citations?..." class="gsc_a_at">Title</a>
      const titleMatch = row.match(/<a[^>]*href="([^"]*)"[^>]*class="gsc_a_at"[^>]*>([\s\S]*?)<\/a>/);
      const grays = [...row.matchAll(/<div class="gs_gray">([\s\S]*?)<\/div>/g)].map((m) => m[1]);
      const citations = toInt((row.match(/class="gsc_a_ac[^"]*"[^>]*>([\s\S]*?)<\/a>/) ?? [])[1]);
      const yearCell = toInt((row.match(/class="gsc_a_h[^"]*"[^>]*>([\s\S]*?)<\/span>/) ?? [])[1]);
      if (!titleMatch) continue;

      const { venue, year } = splitVenue(grays[1] ?? "");
      publications.push({
        title: stripTags(titleMatch[2]),
        authors: stripTags(grays[0] ?? ""),
        venue,
        year: yearCell || year,
        citations,
        link: titleMatch[1] ? `https://scholar.google.com${decodeEntities(titleMatch[1])}` : "",
      });
    }
    if (rows.length < pageSize) break;
  }

  if (!publications.length) throw new Error("Scholar returned no rows (likely rate-limited)");

  const stats = [...html.matchAll(/<td class="gsc_rsb_std">(\d+)<\/td>/g)].map((m) => Number(m[1]));
  const interests = [...html.matchAll(/class="gsc_prf_inta[^"]*"[^>]*>([\s\S]*?)<\/a>/g)].map((m) =>
    stripTags(m[1]),
  );
  const graphYears = [...html.matchAll(/<span class="gsc_g_t"[^>]*>(\d{4})<\/span>/g)].map((m) =>
    Number(m[1]),
  );
  const graphCounts = [...html.matchAll(/<span class="gsc_g_al">(\d+)<\/span>/g)].map((m) =>
    Number(m[1]),
  );

  return finalise(
    {
      name: stripTags((html.match(/id="gsc_prf_in"[^>]*>([\s\S]*?)<\/div>/) ?? [])[1] ?? ""),
      affiliation: stripTags((html.match(/class="gsc_prf_il"[^>]*>([\s\S]*?)<\/div>/) ?? [])[1] ?? ""),
      interests,
      metrics: { citations: stats[0] ?? 0, hIndex: stats[2] ?? 0, i10Index: stats[4] ?? 0 },
      citationsPerYear: graphYears.map((year, i) => ({ year, citations: graphCounts[i] ?? 0 })),
      publications,
    },
    "scrape",
  );
}

/* ------------------------------------------------------------------ chain */

/**
 * Runs the provider chain and returns the first success.
 * `snapshot` is the committed JSON used as the final fallback.
 */
export async function fetchScholarProfile({
  scholarId,
  serpApiKey = "",
  allowScrape = true,
  snapshot = null,
  fetchImpl = fetch,
  onWarn = () => {},
} = {}) {
  const providers = [];
  if (serpApiKey)
    providers.push(["serpapi", () => fetchFromSerpApi({ scholarId, apiKey: serpApiKey, fetchImpl })]);
  if (allowScrape) providers.push(["scrape", () => fetchFromScrape({ scholarId, fetchImpl })]);

  for (const [name, run] of providers) {
    try {
      const profile = await run();
      if (profile.publications.length) return profile;
      onWarn(`${name}: empty result`);
    } catch (error) {
      onWarn(`${name}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (snapshot) return { ...snapshot, source: "snapshot" };
  throw new Error("No Scholar provider succeeded and no snapshot is available");
}
