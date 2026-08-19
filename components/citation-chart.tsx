import type { ScholarProfile } from "@/lib/scholar";

/**
 * Citations per year, drawn as inline SVG bars — no chart library, no client JS.
 * Values come straight from the Scholar profile.
 */
export function CitationChart({
  data,
  years = 10,
}: {
  data: ScholarProfile["citationsPerYear"];
  years?: number;
}) {
  const series = data.slice(-years);
  if (!series.length) return null;

  const max = Math.max(...series.map((d) => d.citations), 1);
  const width = 100;
  const height = 44;
  const gap = 1.6;
  const barWidth = (width - gap * (series.length - 1)) / series.length;

  return (
    <figure className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height + 8}`}
        preserveAspectRatio="none"
        className="h-28 w-full"
        role="img"
        aria-label={`Citations per year, ${series[0].year} to ${series[series.length - 1].year}`}
      >
        {series.map((d, i) => {
          const h = Math.max((d.citations / max) * height, 0.8);
          const x = i * (barWidth + gap);
          return (
            <rect
              key={d.year}
              x={x}
              y={height - h}
              width={barWidth}
              height={h}
              rx="0.6"
              className="fill-[var(--color-brand)]"
              opacity={0.35 + (0.65 * (i + 1)) / series.length}
            />
          );
        })}
      </svg>
      <figcaption className="mt-2 flex justify-between font-mono text-[0.65rem] text-[var(--color-muted)]">
        <span>{series[0].year}</span>
        <span>citations per year</span>
        <span>{series[series.length - 1].year}</span>
      </figcaption>
    </figure>
  );
}
