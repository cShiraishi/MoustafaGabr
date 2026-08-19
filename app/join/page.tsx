import type { Metadata } from "next";

import { Reveal } from "@/components/reveal";
import { ButtonLink, Card, Container, PageHeader, Tag } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Join Us",
  description:
    "Open postdoctoral, graduate and undergraduate positions in the Gabr Lab at Columbia Radiology.",
};

const positions = [
  {
    role: "Postdoctoral Research Scientist — Medicinal Chemistry",
    profile:
      "Ph.D. in organic or medicinal chemistry. Multi-step synthesis, SAR campaigns and hands-on experience with biophysical assays (SPR, TR-FRET, ITC).",
    tags: ["Synthesis", "SAR", "Biophysics"],
  },
  {
    role: "Postdoctoral Research Scientist — Radiochemistry & Imaging",
    profile:
      "Ph.D. in radiochemistry, nuclear medicine or a related field. F-18/C-11 labelling, small-animal PET, tracer kinetics.",
    tags: ["PET", "Radiolabelling", "In vivo"],
  },
  {
    role: "Graduate Students",
    profile:
      "Students admitted to Columbia graduate programmes in chemistry, pharmacology, biomedical engineering or neuroscience are welcome to rotate.",
    tags: ["Rotations", "Thesis projects"],
  },
  {
    role: "Undergraduate & Post-baccalaureate Researchers",
    profile:
      "Term-time and summer positions for students who want a genuine project rather than a shadowing experience.",
    tags: ["Term-time", "Summer"],
  },
];

export default function JoinPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join us"
        title="Open positions"
        lede="We hire for curiosity and rigour across chemistry, imaging and immunology. Prior experience in all three is not expected — willingness to learn the other two is."
      />

      <Container className="py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {positions.map((position) => (
            <Reveal key={position.role} y={12}>
              <Card className="flex h-full flex-col p-7">
                <h2 className="text-xl leading-snug">{position.role}</h2>
                <p className="mt-3 flex-1 leading-relaxed text-[var(--color-ink-2)]">
                  {position.profile}
                </p>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {position.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <section className="mt-16 rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper-2)] p-8 sm:p-10">
            <h2 className="text-2xl">How to apply</h2>
            <ol className="mt-6 max-w-2xl space-y-5">
              {[
                "Email the PI directly with the subject line “Postdoc / Graduate / Undergraduate application — your name”.",
                "Attach a CV and a short statement (half a page is enough) explaining which of the lab's programmes you want to work on and why.",
                "Postdoctoral applicants: include contact details for three references and a one-paragraph description of your most technically difficult result.",
              ].map((step, i) => (
                <li key={step} className="flex gap-4">
                  <span className="font-mono text-sm text-[var(--color-brand)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-relaxed text-[var(--color-ink-2)]">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8">
              <ButtonLink href={`mailto:${site.pi.email}?subject=Application%20—%20Gabr%20Lab`} external>
                Email {site.pi.shortName}
              </ButtonLink>
            </div>
          </section>
        </Reveal>
      </Container>
    </>
  );
}
