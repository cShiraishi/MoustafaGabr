import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Microscope, Radiation, Brain } from "lucide-react";

import { CitationChart } from "@/components/citation-chart";
import { Lattice } from "@/components/lattice";
import { Portrait } from "@/components/portrait";
import { Reveal } from "@/components/reveal";
import { ButtonLink, Card, Container, SectionHeading, Tag } from "@/components/ui";
import { grants } from "@/content/funding";
import { news } from "@/content/news";
import { researchAreas } from "@/content/research";
import { highlights, site } from "@/content/site";
import { getScholarProfile, selectedPublications } from "@/lib/scholar";

// Next requires a literal here: 24 h, matching SCHOLAR_REVALIDATE in lib/scholar.ts
export const revalidate = 86400;

const areaIcons = [Microscope, Brain, Radiation];

export default async function HomePage() {
  const scholar = await getScholarProfile();
  const selected = selectedPublications(scholar, 5);
  const featuredAreas = researchAreas.slice(0, 3);

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden border-b border-[var(--color-line)]">
        <Lattice className="pointer-events-none absolute -right-24 top-1/2 hidden h-[520px] w-[780px] -translate-y-1/2 text-[var(--color-brand)] opacity-[0.16] lg:block" />

        <Container className="relative py-20 sm:py-28">
          <Reveal>
            <p className="eyebrow">
              {site.pi.department} · {site.pi.institution}
            </p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-3xl text-[2.6rem] leading-[1.06] sm:text-6xl">
              Small molecules that <em className="italic text-[var(--color-brand)]">image</em> and{" "}
              <em className="italic text-[var(--color-brand)]">reprogram</em> the immune response.
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--color-ink-2)]">
              The Gabr Lab builds first-in-class chemical matter for immune targets that antibodies
              cannot reach — from checkpoint interfaces in glioblastoma to microglial receptors in
              Alzheimer&apos;s disease — and pairs every therapeutic campaign with a PET probe that
              measures whether it worked.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/research">Explore the research</ButtonLink>
              <ButtonLink href="/join" variant="ghost">
                Join the lab
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-16 flex flex-wrap items-center justify-between gap-x-8 gap-y-6 border-t border-[var(--color-line)] pt-6">
              <div className="flex items-center gap-5">
                <Portrait
                  src={site.pi.portrait}
                  name={site.pi.name}
                  priority
                  sizes="3.5rem"
                  className="size-14 shrink-0"
                />
                <div>
                  <p className="font-serif text-lg">
                    {site.pi.name}, {site.pi.credentials}
                  </p>
                  <p className="text-sm text-[var(--color-muted)]">
                    {site.pi.title} · {site.pi.secondaryTitle}
                  </p>
                </div>
              </div>

              <a
                href={site.links.columbia}
                target="_blank"
                rel="noreferrer"
                className="shrink-0"
                aria-label="Columbia University in the City of New York"
              >
                <Image
                  src="/logos/columbia-wordmark.png"
                  alt="Columbia University in the City of New York"
                  width={560}
                  height={87}
                  priority
                  className="h-7 w-auto opacity-75 transition-opacity duration-300 hover:opacity-100 dark:brightness-0 dark:invert sm:h-8"
                />
              </a>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* --------------------------------------------------------- metrics */}
      <section className="border-b border-[var(--color-line)] bg-[var(--color-paper-2)]">
        <Container className="py-14">
          <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Research at a glance</p>
              <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
                {highlights.map((item) => (
                  <div key={item.label}>
                    <dt className="sr-only">{item.label}</dt>
                    <dd>
                      <span className="block font-serif text-4xl tracking-tight">{item.value}</span>
                      <span className="mt-1.5 block text-sm text-[var(--color-ink-2)]">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block font-mono text-[0.68rem] text-[var(--color-muted)]">
                        {item.detail}
                      </span>
                    </dd>
                  </div>
                ))}
                <div>
                  <dd>
                    <span className="block font-serif text-4xl tracking-tight">
                      {scholar.metrics.citations.toLocaleString("en-US")}
                    </span>
                    <span className="mt-1.5 block text-sm text-[var(--color-ink-2)]">Citations</span>
                    <span className="mt-0.5 block font-mono text-[0.68rem] text-[var(--color-muted)]">
                      Google Scholar
                    </span>
                  </dd>
                </div>
                <div>
                  <dd>
                    <span className="block font-serif text-4xl tracking-tight">
                      {scholar.metrics.hIndex}
                    </span>
                    <span className="mt-1.5 block text-sm text-[var(--color-ink-2)]">h-index</span>
                    <span className="mt-0.5 block font-mono text-[0.68rem] text-[var(--color-muted)]">
                      i10-index {scholar.metrics.i10Index}
                    </span>
                  </dd>
                </div>
                <div>
                  <dd>
                    <span className="block font-serif text-4xl tracking-tight">
                      {scholar.publications.length}
                    </span>
                    <span className="mt-1.5 block text-sm text-[var(--color-ink-2)]">
                      Indexed records
                    </span>
                    <span className="mt-0.5 block font-mono text-[0.68rem] text-[var(--color-muted)]">
                      Synced automatically
                    </span>
                  </dd>
                </div>
              </dl>
            </div>

            <Card className="p-6">
              <p className="eyebrow">Citation trajectory</p>
              <div className="mt-5">
                <CitationChart data={scholar.citationsPerYear} />
              </div>
              <a
                href={site.links.scholar}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-[var(--color-brand)] hover:text-[var(--color-accent)]"
              >
                Full Scholar profile <ArrowUpRight size={14} />
              </a>
            </Card>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------------- research */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Programmes"
            title="Three questions the lab is built around"
            action={{ href: "/research", label: "All research areas" }}
          />

          <div className="grid gap-6 md:grid-cols-3">
            {featuredAreas.map((area, i) => {
              const Icon = areaIcons[i] ?? Microscope;
              return (
                <Reveal key={area.slug} delay={i * 0.07}>
                  <Card className="flex h-full flex-col p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-lift)]">
                    <Icon size={20} className="text-[var(--color-brand)]" />
                    <p className="eyebrow mt-5">{area.kicker}</p>
                    <h3 className="mt-2 text-xl leading-snug">{area.title}</h3>
                    <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-[var(--color-ink-2)]">
                      {area.summary}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {area.targets.slice(0, 3).map((t) => (
                        <Tag key={t}>{t}</Tag>
                      ))}
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------- publications */}
      <section className="border-y border-[var(--color-line)] bg-[var(--color-paper-2)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Selected work"
            title="Most-cited publications"
            action={{ href: "/publications", label: "All publications" }}
          />

          <ol className="divide-y divide-[var(--color-line)]">
            {selected.map((pub) => (
              <li key={pub.id} className="py-5 first:pt-0 last:pb-0">
                <Reveal y={10}>
                  <a
                    href={pub.link || site.links.scholar}
                    target="_blank"
                    rel="noreferrer"
                    className="group grid grid-cols-[3rem_1fr] gap-4 sm:grid-cols-[4rem_1fr]"
                  >
                    <span className="font-mono text-sm text-[var(--color-muted)]">{pub.year}</span>
                    <span>
                      <span className="block font-serif text-[1.08rem] leading-snug transition-colors group-hover:text-[var(--color-brand)]">
                        {pub.title}
                      </span>
                      <span className="mt-1 block text-[0.82rem] italic text-[var(--color-muted)]">
                        {pub.venue}
                        {pub.citations ? ` · ${pub.citations} citations` : ""}
                      </span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ---------------------------------------------------------- support */}
      <section className="py-20 sm:py-24">
        <Container>
          <SectionHeading eyebrow="Support" title="Funded programmes" />
          <div className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
            {grants.slice(0, 6).map((grant) => (
              <div key={grant.title} className="bg-[var(--color-paper)] p-6">
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[var(--color-brand)]">
                  {grant.agency} {grant.mechanism}
                </p>
                <p className="mt-3 text-[0.95rem] leading-snug text-[var(--color-ink)]">
                  {grant.title}
                </p>
                <p className="mt-3 text-sm text-[var(--color-muted)]">
                  {grant.institute}
                  {grant.period ? ` · ${grant.period}` : ""}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------- news */}
      <section className="border-t border-[var(--color-line)] py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Latest"
            title="News from the lab"
            action={{ href: "/news", label: "All news" }}
          />
          <div className="grid gap-8 md:grid-cols-3">
            {news.slice(0, 3).map((item) => (
              <Reveal key={item.title} y={12}>
                <article>
                  <p className="font-mono text-[0.7rem] text-[var(--color-muted)]">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}{" "}
                    · {item.tag}
                  </p>
                  <h3 className="mt-2.5 text-lg leading-snug">{item.title}</h3>
                  <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--color-ink-2)]">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-brand-soft)] p-8 sm:p-10">
            <p className="eyebrow">Openings</p>
            <h3 className="mt-3 max-w-2xl text-2xl leading-snug">
              We are recruiting postdocs and students in medicinal chemistry, radiochemistry and
              chemical immunology.
            </h3>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/join">See open positions</ButtonLink>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 px-2 py-2.5 text-sm text-[var(--color-ink-2)] underline underline-offset-4 hover:text-[var(--color-brand)]"
              >
                Contact the PI
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
