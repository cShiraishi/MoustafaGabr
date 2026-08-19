import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/* ------------------------------------------------------------- primitives */

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  image,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
  /** Optional figure that fills the empty right-hand side of the header. */
  image?: { src: string; alt: string; caption?: string; width: number; height: number };
}) {
  return (
    <header className="border-b border-[var(--color-line)] bg-[var(--color-paper-2)] py-16 sm:py-20">
      <Container>
        <div
          className={
            image ? "grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14" : undefined
          }
        >
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] sm:text-5xl">{title}</h1>
            {lede ? (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-2)]">
                {lede}
              </p>
            ) : null}
          </div>

          {image ? (
            <figure className="lg:justify-self-end">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="w-full rounded-[var(--radius-card)] border border-[var(--color-line)] object-cover shadow-[var(--shadow-card)]"
              />
              {image.caption ? (
                <figcaption className="mt-3 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                  {image.caption}
                </figcaption>
              ) : null}
            </figure>
          ) : null}
        </div>
      </Container>
    </header>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2 className="mt-2 text-2xl sm:text-3xl">{title}</h2>
      </div>
      {action ? (
        <Link
          href={action.href}
          className="group inline-flex items-center gap-1.5 text-sm text-[var(--color-brand)] transition-colors hover:text-[var(--color-accent)]"
        >
          {action.label}
          <ArrowRight
            size={15}
            className="transition-transform duration-300 group-hover:translate-x-0.5"
          />
        </Link>
      ) : null}
    </div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-[var(--color-line)] bg-[var(--color-paper)] px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-[var(--color-muted)]">
      {children}
    </span>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius-card)] border border-[var(--color-line)] bg-[var(--color-paper)] shadow-[var(--shadow-card)] ${className}`}
    >
      {children}
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-[var(--color-ink)] text-[var(--color-paper)] hover:bg-[var(--color-brand)] hover:shadow-[var(--shadow-lift)]"
      : "border border-[var(--color-line-strong)] text-[var(--color-ink)] hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]";

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${base} ${styles}`}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}
