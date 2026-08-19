import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

import { Reveal } from "@/components/reveal";
import { Container, PageHeader } from "@/components/ui";
import { news } from "@/content/news";

export const metadata: Metadata = {
  title: "News",
  description: "Papers, awards, grants and lab announcements from the Gabr Lab.",
};

export default function NewsPage() {
  const items = [...news].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        eyebrow="News"
        title="Papers, awards and announcements"
        lede="A running record of what has come out of the lab."
      />

      <Container className="py-16">
        <ol className="border-t border-[var(--color-line)]">
          {items.map((item) => (
            <Reveal key={`${item.date}-${item.title}`} as="li" y={12}>
              <article className="grid gap-3 border-b border-[var(--color-line)] py-8 sm:grid-cols-[10rem_1fr] sm:gap-10">
                <div>
                  <time
                    dateTime={item.date}
                    className="block font-mono text-[0.78rem] text-[var(--color-muted)]"
                  >
                    {new Date(item.date).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                  <span className="mt-2 inline-flex rounded-full bg-[var(--color-brand-soft)] px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-[var(--color-brand)]">
                    {item.tag}
                  </span>
                </div>

                <div>
                  <h2 className="text-xl leading-snug">{item.title}</h2>
                  <p className="mt-2.5 max-w-2xl leading-relaxed text-[var(--color-ink-2)]">
                    {item.body}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm text-[var(--color-brand)] hover:text-[var(--color-accent)]"
                    >
                      Read more <ArrowUpRight size={14} />
                    </a>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </Container>
    </>
  );
}
