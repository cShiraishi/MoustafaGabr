import type { Metadata } from "next";

import { Portrait } from "@/components/portrait";
import { Reveal } from "@/components/reveal";
import { Card, Container, PageHeader } from "@/components/ui";
import { trainingTimeline } from "@/content/funding";
import { groupLabels, team, type Member } from "@/content/team";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Team",
  description:
    "The people of the Gabr Lab — principal investigator, postdoctoral researchers and students working across chemistry, imaging and immunology.",
};

const order: Member["group"][] = ["pi", "postdoc", "student", "alumni"];

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

export default function TeamPage() {
  const groups = order
    .map((group) => ({ group, members: team.filter((m) => m.group === group) }))
    .filter((g) => g.members.length);

  const pi = team.find((m) => m.group === "pi");

  return (
    <>
      <PageHeader
        eyebrow="Team"
        title="Chemists, radiochemists and immunologists in one group"
        lede="The lab is deliberately interdisciplinary: the person who designs a molecule sits next to the person who radiolabels it and the person who runs it through primary immune cells."
      />

      {pi ? (
        <Container className="py-16">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-[minmax(0,20rem)_1fr] lg:gap-14">
              <div>
                <Portrait
                  src={pi.photo ?? site.pi.portrait}
                  name={pi.name}
                  rounded="card"
                  priority
                  sizes="(min-width: 1024px) 20rem, 100vw"
                  className="aspect-4/5 w-full"
                />
                <p className="mt-3 font-mono text-[0.65rem] text-[var(--color-muted)]">
                  {site.pi.institution}
                </p>
              </div>

              <div>
                <p className="eyebrow">{groupLabels.pi}</p>
                <h2 className="mt-2 text-3xl">{pi.name}</h2>
                <p className="mt-1 text-[var(--color-muted)]">{pi.focus}</p>

                <div className="prose-lab mt-8 max-w-2xl">
                  <p>
                    Dr. Gabr leads a programme that treats drug discovery and molecular imaging as
                    one discipline. His group has delivered first-in-class chemical matter against
                    targets long considered undruggable — LAG-3/FGL1, CHI3L1, SLIT2/ROBO, TREM2 —
                    and has coupled those campaigns to PET probes so that target engagement is
                    measured rather than assumed.
                  </p>
                  <p>
                    The work is supported by five NIH awards across the National Cancer Institute,
                    the National Institute on Aging, NINDS and NIDDK, alongside foundation funding
                    from the American Cancer Society and the Elsa U. Pardee Foundation.
                  </p>
                </div>

                <ol className="mt-10 space-y-0 border-t border-[var(--color-line)]">
                  {trainingTimeline.map((entry) => (
                    <li
                      key={entry.period}
                      className="grid gap-1 border-b border-[var(--color-line)] py-4 sm:grid-cols-[9rem_1fr] sm:gap-6"
                    >
                      <span className="font-mono text-[0.78rem] text-[var(--color-muted)]">
                        {entry.period}
                      </span>
                      <span>
                        <span className="block text-[0.95rem] text-[var(--color-ink)]">
                          {entry.title}
                        </span>
                        <span className="block text-sm text-[var(--color-muted)]">
                          {entry.org} — {entry.detail}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </Container>
      ) : null}

      <section className="border-t border-[var(--color-line)] bg-[var(--color-paper-2)] py-16">
        <Container>
          {groups
            .filter((g) => g.group !== "pi")
            .map((group) => (
              <div key={group.group} className="mb-14 last:mb-0">
                <h2 className="text-2xl">{groupLabels[group.group]}</h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.members.map((member) => (
                    <Reveal key={member.name} y={12}>
                      <Card className="h-full p-6">
                        <div className="flex size-12 items-center justify-center rounded-full bg-[var(--color-brand-soft)] font-mono text-sm text-[var(--color-brand)]">
                          {initials(member.name)}
                        </div>
                        <h3 className="mt-5 text-lg leading-snug">
                          {member.name}
                          {member.degree ? (
                            <span className="text-[var(--color-muted)]">, {member.degree}</span>
                          ) : null}
                        </h3>
                        <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[var(--color-brand)]">
                          {member.role}
                        </p>
                        {member.focus ? (
                          <p className="mt-3 text-[0.9rem] leading-relaxed text-[var(--color-ink-2)]">
                            {member.focus}
                          </p>
                        ) : null}
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </div>
            ))}
        </Container>
      </section>
    </>
  );
}
