import React from 'react';

interface RadarChartProps {
  raag: number; // 10 - 50
  lstm: number; // 10 - 50
  adg: number;  // 10 - 50
  acl: number;  // 10 - 50
  benchmark?: number; // default 40
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  raag,
  lstm,
  adg,
  acl,
  benchmark = 40,
  size = 280
}) => {
  const center = size / 2;
  const radius = size * 0.38;

  // 4 Axes: Top (RAAG), Right (LSTM), Bottom (ADG), Left (ACL)
  // Scale: 10 to 50 maps to 0 to 1
  const normalize = (val: number) => Math.max(0, Math.min(1, (val - 10) / 40));

  const points = [
    { label: "Awareness · RAAG", score: raag, x: center, y: center - radius * normalize(raag) },
    { label: "Shifting State · LSTM", score: lstm, x: center + radius * normalize(lstm), y: center },
    { label: "Decisions · ADG", score: adg, x: center, y: center + radius * normalize(adg) },
    { label: "Culture · ACL", score: acl, x: center - radius * normalize(acl), y: center }
  ];

  const polygonPath = points.map(p => `${p.x},${p.y}`).join(' ');

  // Benchmark polygon (40 out of 50)
  const normBenchmark = normalize(benchmark);
  const benchPoints = [
    { x: center, y: center - radius * normBenchmark },
    { x: center + radius * normBenchmark, y: center },
    { x: center, y: center + radius * normBenchmark },
    { x: center - radius * normBenchmark, y: center }
  ];
  const benchPath = benchPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Rings for 20, 30, 40, 50
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background concentric diamonds */}
        {rings.map((r, i) => (
          <polygon
            key={i}
            points={`
              ${center},${center - radius * r}
              ${center + radius * r},${center}
              ${center},${center + radius * r}
              ${center - radius * r},${center}
            `}
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
            strokeDasharray={i === rings.length - 1 ? "none" : "3 3"}
          />
        ))}

        {/* Crosshair axes */}
        <line x1={center} y1={center - radius} x2={center} y2={center + radius} stroke="#334155" strokeWidth="1.5" />
        <line x1={center - radius} y1={center} x2={center + radius} y2={center} stroke="#334155" strokeWidth="1.5" />

        {/* Target Benchmark polygon (Gold dashed) */}
        <polygon
          points={benchPath}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity={0.6}
        />

        {/* User score polygon */}
        <polygon
          points={polygonPath}
          fill="rgba(56, 189, 248, 0.25)"
          stroke="#38bdf8"
          strokeWidth="2.5"
        />

        {/* Score Nodes */}
        {points.map((p, idx) => (
          <g key={idx}>
            <circle cx={p.x} cy={p.y} r="5" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <text
              x={p.x}
              y={p.y + (idx === 0 ? -12 : idx === 2 ? 18 : idx === 1 ? -8 : -8)}
              textAnchor={idx === 1 ? 'start' : idx === 3 ? 'end' : 'middle'}
              className="text-[11px] fill-amber-300 font-semibold"
            >
              {p.score}
            </text>
          </g>
        ))}

        {/* Labels at extremities */}
        <text x={center} y={center - radius - 18} textAnchor="middle" className="text-[11px] fill-slate-300 font-medium">
          RAAG (Awareness)
        </text>
        <text x={center + radius + 10} y={center + 4} textAnchor="start" className="text-[11px] fill-slate-300 font-medium">
          LSTM (Shift)
        </text>
        <text x={center} y={center + radius + 22} textAnchor="middle" className="text-[11px] fill-slate-300 font-medium">
          ADG (Decisions)
        </text>
        <text x={center - radius - 10} y={center + 4} textAnchor="end" className="text-[11px] fill-slate-300 font-medium">
          ACL (Culture)
        </text>
      </svg>

      <div className="flex items-center gap-4 text-xs text-slate-400 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 bg-sky-400/40 border border-sky-400 rounded-sm"></span>
          <span>Your Baseline</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t border-dashed border-amber-400"></span>
          <span>RAL Target (40+)</span>
        </div>
      </div>
    </div>
  );
};
