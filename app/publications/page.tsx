import type { Metadata } from "next";
import { ArrowUpRight, RefreshCw } from "lucide-react";

import { CitationChart } from "@/components/citation-chart";
import { PublicationList } from "@/components/publication-list";
import { Card, Container, PageHeader } from "@/components/ui";
import { site } from "@/content/site";
import { getScholarProfile } from "@/lib/scholar";

// Next requires a literal here: 24 h, matching SCHOLAR_REVALIDATE in lib/scholar.ts
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Complete, automatically synchronised publication record for Moustafa T. Gabr, Ph.D., sourced from Google Scholar.",
};

const sourceLabel: Record<string, string> = {
  serpapi: "Google Scholar (SerpAPI)",
  scrape: "Google Scholar (live)",
  snapshot: "Google Scholar (cached snapshot)",
};

export default async function PublicationsPage() {
  const scholar = await getScholarProfile();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Publications — ${site.pi.name}`,
    numberOfItems: scholar.publications.length,
    itemListElement: scholar.publications.slice(0, 40).map((pub, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "ScholarlyArticle",
        name: pub.title,
        datePublished: pub.year ? String(pub.year) : undefined,
        isPartOf: pub.venue || undefined,
        url: pub.link || undefined,
      },
    })),
  };

  return (
    <>
      <PageHeader
        eyebrow="Publications"
        title={`${scholar.publications.length} indexed publications`}
        lede="This list is read from the lab's Google Scholar profile and refreshes automatically — no manual bibliography to fall out of date."
      />

      <Container className="py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { value: scholar.metrics.citations.toLocaleString("en-US"), label: "Citations" },
            { value: scholar.metrics.hIndex, label: "h-index" },
            { value: scholar.metrics.i10Index, label: "i10-index" },
          ].map((stat) => (
            <Card key={stat.label} className="p-6">
              <span className="block font-serif text-4xl">{stat.value}</span>
              <span className="mt-1.5 block text-sm text-[var(--color-muted)]">{stat.label}</span>
            </Card>
          ))}
          <Card className="p-6">
            <CitationChart data={scholar.citationsPerYear} years={8} />
          </Card>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper-2)] px-5 py-3">
          <p className="inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[var(--color-muted)]">
            <RefreshCw size={12} />
            Source: {sourceLabel[scholar.source] ?? scholar.source} · updated{" "}
            {new Date(scholar.fetchedAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
          <a
            href={site.links.scholar}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--color-brand)] hover:text-[var(--color-accent)]"
          >
            Open Scholar profile <ArrowUpRight size={14} />
          </a>
        </div>

        <div className="mt-10">
          <PublicationList publications={scholar.publications} />
        </div>
      </Container>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
