import { NextResponse } from "next/server";

import { getScholarProfile, SCHOLAR_REVALIDATE } from "@/lib/scholar";

// Next requires a literal here: 24 h, matching SCHOLAR_REVALIDATE in lib/scholar.ts
export const revalidate = 86400;

/**
 * JSON view of the Scholar record, for embeds, the department site, or a CV
 * generator. Cached for the same window as the pages.
 */
export async function GET() {
  const profile = await getScholarProfile();

  return NextResponse.json(profile, {
    headers: {
      "cache-control": `public, s-maxage=${SCHOLAR_REVALIDATE}, stale-while-revalidate=86400`,
    },
  });
}
