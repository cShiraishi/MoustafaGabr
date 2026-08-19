"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/**
 * Scroll-in transition.
 *
 * The hidden state is applied by CSS that is scoped to `html.js`, and that class
 * is set by the inline script in the document head — so the server-rendered
 * markup is fully visible to crawlers and to anyone without JavaScript, and
 * there is no flash of content on hydration. The reveal itself is a compositor
 * transition (opacity + transform), which keeps running even in a background
 * tab, and it is disabled outright under prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => node.classList.add("is-visible");

    // Anything already on screen at mount reveals straight away: no observer
    // round-trip for the hero, and nothing can leave above-the-fold content
    // hidden if intersection callbacks are throttled.
    // (this effect runs after the hidden state has been painted, so the class
    // change still transitions rather than snapping)
    if (node.getBoundingClientRect().top < window.innerHeight * 0.95) {
      show();
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={
        {
          "--reveal-delay": `${delay}s`,
          "--reveal-y": `${y}px`,
        } as CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
