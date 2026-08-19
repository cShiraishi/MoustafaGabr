"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Portrait with a typographic fallback: if the image file is not in /public yet
 * (or fails to load) the initials are shown instead of a broken image.
 */
export function Portrait({
  src,
  name,
  className = "",
  sizes,
  priority = false,
  rounded = "full",
}: {
  src: string;
  name: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: "full" | "card";
}) {
  const [failed, setFailed] = useState(false);

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  const shape = rounded === "full" ? "rounded-full" : "rounded-[var(--radius-card)]";

  return (
    <div
      className={`relative overflow-hidden border border-[var(--color-line)] bg-[var(--color-paper-2)] ${shape} ${className}`}
    >
      {failed ? (
        <span
          aria-hidden
          className={`absolute inset-0 flex items-center justify-center font-serif text-[var(--color-line-strong)] ${
            rounded === "full" ? "text-base" : "text-5xl"
          }`}
        >
          {initials}
        </span>
      ) : (
        <Image
          src={src}
          alt={`Portrait of ${name}`}
          fill
          sizes={sizes ?? "10rem"}
          priority={priority}
          className="object-cover object-top"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
