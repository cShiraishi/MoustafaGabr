/**
 * Decorative backdrop: a fragment of a molecular graph over a measurement grid.
 * Purely presentational — hidden from assistive technology.
 */
export function Lattice({ className = "" }: { className?: string }) {
  const nodes = [
    [120, 210],
    [186, 172],
    [252, 210],
    [252, 286],
    [186, 324],
    [120, 286],
    [318, 172],
    [384, 210],
    [384, 286],
    [318, 324],
    [450, 172],
    [516, 210],
    [186, 96],
    [318, 96],
    [450, 96],
    [516, 286],
  ];

  const edges: [number, number][] = [
    [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 0],
    [2, 6], [6, 7], [7, 8], [8, 9], [9, 3],
    [6, 10], [10, 11], [11, 7],
    [1, 12], [6, 13], [10, 14], [11, 15],
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 640 420"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="lattice-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" stroke="currentColor" strokeWidth="0.5" opacity="0.18" />
        </pattern>
        <radialGradient id="lattice-fade" cx="52%" cy="46%" r="62%">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <mask id="lattice-mask">
          <rect width="640" height="420" fill="url(#lattice-fade)" />
        </mask>
      </defs>

      <g mask="url(#lattice-mask)">
        <rect width="640" height="420" fill="url(#lattice-grid)" />
        <g stroke="currentColor" strokeWidth="1.1" opacity="0.55">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a][0]}
              y1={nodes[a][1]}
              x2={nodes[b][0]}
              y2={nodes[b][1]}
            />
          ))}
        </g>
        <g>
          {nodes.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i % 5 === 0 ? 5 : 3.2}
              fill="currentColor"
              opacity={i % 5 === 0 ? 0.9 : 0.55}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
