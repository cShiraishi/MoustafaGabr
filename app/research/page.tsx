import type { Metadata } from "next";

import { Reveal } from "@/components/reveal";
import { Container, PageHeader, Tag } from "@/components/ui";
import { researchAreas } from "@/content/research";

export const metadata: Metadata = {
  title: "Research",
  description:
    "Immune checkpoints, glioblastoma, neurodegeneration, the host–microbiome axis, PET imaging and AI-driven discovery in the Gabr Lab.",
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Research"
        title="Chemistry aimed at immune biology that has resisted biologics"
        lede="Every programme starts from a target that matters clinically and a modality that cannot currently reach it. The lab closes that gap with drug-like molecules, structure-guided design and imaging endpoints."
        image={{
          src: "/lab/group.png",
          alt: "Members of the Gabr Lab",
          caption: "The Gabr Lab",
          width: 800,
          height: 533,
        }}
      />

      <Container className="py-16 sm:py-20">
        <div className="divide-y divide-[var(--color-line)]">
          {researchAreas.map((area, index) => (
            <Reveal key={area.slug} className="py-14 first:pt-0 last:pb-0">
              <article
                id={area.slug}
                className="grid gap-8 scroll-mt-24 lg:grid-cols-[minmax(0,7rem)_1fr_minmax(0,15rem)] lg:gap-12"
              >
                <div className="font-mono text-sm text-[var(--color-muted)]">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <p className="eyebrow">{area.kicker}</p>
                  <h2 className="mt-2.5 max-w-2xl text-2xl leading-snug sm:text-[1.75rem]">
                    {area.title}
                  </h2>
                  <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-[var(--color-ink-2)]">
                    {area.summary}
                  </p>
                  <ul className="mt-6 max-w-2xl space-y-3">
                    {area.points.map((point) => (
                      <li key={point} className="flex gap-3 text-[0.95rem] leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-[0.55rem] h-px w-4 shrink-0 bg-[var(--color-brand)]"
                        />
                        <span className="text-[var(--color-ink-2)]">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:pt-8">
                  <p className="eyebrow">Targets</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {area.targets.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </>
  );
}
