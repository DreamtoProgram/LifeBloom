'use client';

import type { DimensionScore } from '@/lib/discovery/analysisEngine';

interface RadarChartProps {
  dimensions: DimensionScore[];
}

export function RadarChart({ dimensions }: RadarChartProps) {
  // Center of 400x400 SVG
  const cx = 200;
  const cy = 200;
  const radius = 130;
  const total = dimensions.length; // 6

  // Helper to calculate coordinates for angle and distance
  const getCoordinates = (index: number, valueRatio: number) => {
    // Start at top (-90 degrees) and rotate clockwise
    const angle = (Math.PI * 2 / total) * index - Math.PI / 2;
    const x = cx + radius * valueRatio * Math.cos(angle);
    const y = cy + radius * valueRatio * Math.sin(angle);
    return { x, y };
  };

  // Concentric polygon grids (20%, 40%, 60%, 80%, 100%)
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  const getPolygonPoints = (ratio: number) => {
    return Array.from({ length: total })
      .map((_, i) => {
        const { x, y } = getCoordinates(i, ratio);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(' ');
  };

  // Data polygon points
  const dataPoints = dimensions
    .map((dim, i) => {
      const ratio = Math.max(0.15, Math.min(1.0, dim.score / 100));
      const { x, y } = getCoordinates(i, ratio);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <div className="flex flex-col items-center w-full">
      {/* Chart Canvas */}
      <div className="w-full max-w-[440px] aspect-square relative">
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full overflow-visible select-none"
          role="img"
          aria-label="Personal Preference Radar Chart"
        >
          {/* Background Concentric Grid Polygons */}
          {gridLevels.map((level, idx) => (
            <polygon
              key={`grid-${idx}`}
              points={getPolygonPoints(level)}
              fill={idx % 2 === 1 ? '#FAF5FD' : '#FFFFFF'}
              stroke="#EDE7EE"
              strokeWidth="1.2"
            />
          ))}

          {/* Radial Spokes from Center to Outer Vertices */}
          {Array.from({ length: total }).map((_, i) => {
            const { x, y } = getCoordinates(i, 1.0);
            return (
              <line
                key={`spoke-${i}`}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="#EDE7EE"
                strokeWidth="1.2"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* User Data Polygon */}
          <polygon
            points={dataPoints}
            fill="url(#radarGradient)"
            fillOpacity="0.45"
            stroke="#9B70C7"
            strokeWidth="2.5"
            className="transition-all duration-700 ease-out"
          />

          {/* Data Points (Dots on vertices) */}
          {dimensions.map((dim, i) => {
            const ratio = Math.max(0.15, Math.min(1.0, dim.score / 100));
            const { x, y } = getCoordinates(i, ratio);
            return (
              <g key={`dot-${dim.key}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="5.5"
                  fill="#9B70C7"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-all duration-700 shadow-sm"
                />
              </g>
            );
          })}

          {/* Dimension Text Labels positioned around perimeter */}
          {dimensions.map((dim, i) => {
            const labelCoord = getCoordinates(i, 1.22);
            // Text alignment adjustments based on quadrant
            let textAnchor: 'start' | 'middle' | 'end' = 'middle';
            if (labelCoord.x > cx + 15) textAnchor = 'start';
            else if (labelCoord.x < cx - 15) textAnchor = 'end';

            let dy = '0.3em';
            if (labelCoord.y < cy - 40) dy = '-0.3em';
            else if (labelCoord.y > cy + 40) dy = '0.9em';

            return (
              <text
                key={`label-${dim.key}`}
                x={labelCoord.x}
                y={labelCoord.y}
                textAnchor={textAnchor}
                dy={dy}
                className="font-sans text-[11px] sm:text-xs font-semibold fill-[#25222A]"
              >
                {dim.label}
                <tspan
                  x={labelCoord.x}
                  dy="1.2em"
                  className="font-mono text-[10px] font-bold fill-[#865CB5]"
                >
                  {dim.score}%
                </tspan>
              </text>
            );
          })}

          {/* SVG Gradient Definition */}
          <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C9A5E8" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#9B70C7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#865CB5" stopOpacity="0.2" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Helper Legend / Subtitle */}
      <p className="font-sans text-xs text-[#6E6872] mt-4 text-center">
        This visualization reflects patterns from your selected responses and is intended for personal reflection.
      </p>
    </div>
  );
}
