import type { Metadata } from "next";
import { GraduationCap, Mail, MapPin, AtSign } from "lucide-react";

import { Lattice } from "@/components/lattice";
import { Card, Container, PageHeader } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.pi.name}, ${site.pi.credentials} — ${site.pi.department}, ${site.pi.institution}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch"
        lede="Collaboration enquiries, applications and press requests all reach the lab through the same address."
      />

      <Container className="py-16">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div className="space-y-4">
            <Card className="p-7">
              <p className="eyebrow">Principal Investigator</p>
              <p className="mt-3 font-serif text-2xl">
                {site.pi.name}, {site.pi.credentials}
              </p>
              <p className="mt-1 text-[var(--color-muted)]">
                {site.pi.title} · {site.pi.secondaryTitle}
              </p>

              <ul className="mt-7 space-y-4 text-[0.95rem]">
                <li className="flex items-start gap-3">
                  <Mail size={17} className="mt-0.5 shrink-0 text-[var(--color-brand)]" />
                  <a
                    href={`mailto:${site.pi.email}`}
                    className="underline decoration-[var(--color-line-strong)] underline-offset-4 hover:text-[var(--color-brand)]"
                  >
                    {site.pi.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-[var(--color-brand)]" />
                  <address className="not-italic text-[var(--color-ink-2)]">
                    {site.address.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </li>
                <li className="flex items-start gap-3">
                  <GraduationCap size={17} className="mt-0.5 shrink-0 text-[var(--color-brand)]" />
                  <a
                    href={site.links.scholar}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-[var(--color-line-strong)] underline-offset-4 hover:text-[var(--color-brand)]"
                  >
                    Google Scholar
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <AtSign size={17} className="mt-0.5 shrink-0 text-[var(--color-brand)]" />
                  <a
                    href={site.links.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-[var(--color-line-strong)] underline-offset-4 hover:text-[var(--color-brand)]"
                  >
                    @{site.pi.twitter}
                  </a>
                </li>
              </ul>
            </Card>

            <Card className="p-7">
              <p className="eyebrow">Collaborations</p>
              <p className="mt-3 leading-relaxed text-[var(--color-ink-2)]">
                The lab partners with groups that bring disease models, structural biology or
                clinical questions to a chemical programme. If you have a target and a validated
                phenotype, we can build the matter to interrogate it.
              </p>
            </Card>
          </div>

          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper-2)] p-8">
            <Lattice className="pointer-events-none absolute inset-0 h-full w-full text-[var(--color-brand)] opacity-[0.13]" />
            <div className="relative">
              <p className="eyebrow">Location</p>
              <h2 className="mt-3 text-2xl leading-snug">
                Department of Radiology, Columbia University Irving Medical Center
              </h2>
              <p className="mt-4 leading-relaxed text-[var(--color-ink-2)]">
                The lab sits within the molecular imaging and therapeutics programme on the CUIMC
                campus in Washington Heights, New York.
              </p>
              <a
                href={site.links.columbia}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-block text-sm text-[var(--color-brand)] underline underline-offset-4 hover:text-[var(--color-accent)]"
              >
                Columbia Radiology
              </a>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
