#!/usr/bin/env node
/**
 * Refreshes data/scholar-snapshot.json from Google Scholar.
 *
 *   npm run sync:scholar
 *
 * Run it locally or from CI (see .github/workflows/scholar.yml). The snapshot is
 * what the site falls back to whenever the live providers are unavailable, so
 * committing a fresh one keeps the publications page correct even offline.
 */

import { writeFile, readFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { fetchScholarProfile } from "../lib/scholar-source.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const target = resolve(root, "data/scholar-snapshot.json");

const scholarId = process.env.NEXT_PUBLIC_SCHOLAR_ID || "hw7IDDoAAAAJ";
const serpApiKey = process.env.SERPAPI_API_KEY || "";

const previous = await readFile(target, "utf8")
  .then((raw) => JSON.parse(raw))
  .catch(() => null);

const profile = await fetchScholarProfile({
  scholarId,
  serpApiKey,
  allowScrape: true,
  snapshot: previous,
  onWarn: (message) => console.warn(`  ! ${message}`),
});

if (profile.source === "snapshot") {
  console.error("x every live provider failed — the existing snapshot was kept unchanged");
  process.exit(1);
}

await mkdir(dirname(target), { recursive: true });
await writeFile(target, `${JSON.stringify(profile, null, 2)}\n`, "utf8");

const delta = previous ? profile.publications.length - previous.publications.length : 0;
console.log(
  [
    `+ snapshot written via ${profile.source}`,
    `  ${profile.publications.length} publications${delta ? ` (${delta > 0 ? "+" : ""}${delta})` : ""}`,
    `  ${profile.metrics.citations} citations · h-index ${profile.metrics.hIndex} · i10 ${profile.metrics.i10Index}`,
    `  -> ${target}`,
  ].join("\n"),
);
