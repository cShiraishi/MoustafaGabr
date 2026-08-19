import Link from "next/link";

import { Container } from "@/components/ui";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-4xl">This page is not in the record.</h1>
      <p className="mt-4 max-w-md text-[var(--color-ink-2)]">
        The link may be out of date. The research, publications and team pages are all reachable
        from the navigation above.
      </p>
      <Link
        href="/"
        className="mt-8 w-fit rounded-full bg-[var(--color-ink)] px-5 py-2.5 text-sm text-[var(--color-paper)] transition-colors hover:bg-[var(--color-brand)]"
      >
        Back to the lab
      </Link>
    </Container>
  );
}
