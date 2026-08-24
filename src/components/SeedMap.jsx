import { useRef, useState, useCallback } from 'react';

// ---------------------------------------------------------------------------
// MOCK MAP RENDERER
// ---------------------------------------------------------------------------
// Draws spawn + structures on a stylised SVG "biome map". Positions are
// derived deterministically from each structure's real x/z coordinates so
// relative distances stay meaningful, but the terrain/biome shapes drawn
// underneath are decorative placeholders, NOT real chunk data. Swap the
// `<BackgroundTerrain />` and coordinate projection for a real chunk-tile
// renderer when a real world-gen data source is connected.
// ---------------------------------------------------------------------------

const ICONS = {
  Spawn: '🎯',
  Village: '🏘️',
  'Ancient City': '🏛️',
  'Trial Chambers': '⚔️',
  Stronghold: '🌀',
  'Woodland Mansion': '🏰',
  'Ocean Monument': '🌊',
  'Pillager Outpost': '🏹',
  'Frozen Lake': '🧊',
  'Ice Spikes': '❄️',
  Shipwreck: '⚓',
  'Coral Reef': '🐠',
  'Desert Temple': '🏜️',
  'Witch Hut': '🧪'
};

function BackgroundTerrain({ biome }) {
  const palettes = {
    snow: ['#dff3ff', '#a9dcf0', '#cfe9f5'],
    ocean: ['#0e4a5f', '#12617a', '#0a394a'],
    forest: ['#173d2c', '#1f5138', '#123023'],
    default: ['#16202b', '#1c2a38', '#111a23']
  };
  const key = /snow|frozen|ice/i.test(biome) ? 'snow' : /ocean|warm ocean/i.test(biome) ? 'ocean' : /forest|taiga|dark forest/i.test(biome) ? 'forest' : 'default';
  const [a, b, c] = palettes[key];
  return (
    <>
      <rect width="100%" height="100%" fill={a} opacity="0.12" />
      <circle cx="20%" cy="30%" r="140" fill={b} opacity="0.18" />
      <circle cx="75%" cy="65%" r="180" fill={c} opacity="0.18" />
      <circle cx="55%" cy="20%" r="100" fill={b} opacity="0.12" />
    </>
  );
}

export default function SeedMap({ seed, height = 420 }) {
  const containerRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [selected, setSelected] = useState(null);
  const [measurePoints, setMeasurePoints] = useState([]);

  const SCALE = 0.12; // world blocks -> svg px at zoom 1

  const points = [
    { type: 'Spawn', label: 'Spawn', coords: { x: seed.spawn.x, z: seed.spawn.z }, distance: 0 },
    ...seed.structures.map((s) => ({ type: s.type, label: s.type, coords: s.coords, distance: s.distance }))
  ];

  function project(coords) {
    return {
      x: 300 + (coords.x - seed.spawn.x) * SCALE * zoom + pan.x,
      y: 210 + (coords.z - seed.spawn.z) * SCALE * zoom + pan.y
    };
  }

  const onPointerDown = useCallback((e) => {
    setDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastPos.x;
      const dy = e.clientY - lastPos.y;
      setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
      setLastPos({ x: e.clientX, y: e.clientY });
    },
    [dragging, lastPos]
  );

  const onPointerUp = useCallback(() => setDragging(false), []);

  function handlePointClick(p) {
    setSelected(p);
    setMeasurePoints((prev) => {
      if (prev.length >= 2) return [p];
      const next = [...prev, p];
      return next;
    });
  }

  function distanceBetween(p1, p2) {
    const dx = p1.coords.x - p2.coords.x;
    const dz = p1.coords.z - p2.coords.z;
    return Math.round(Math.sqrt(dx * dx + dz * dz));
  }

  return (
    <div className="shard-panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5">
        <span className="text-xs font-medium text-white/50">Interactive map · drag to pan · click two points to measure</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.25))}
            className="grid h-7 w-7 place-items-center rounded-md bg-white/5 text-white/70 hover:bg-white/10"
            aria-label="Zoom out"
          >
            −
          </button>
          <span className="w-10 text-center font-mono-data text-xs text-white/50">{zoom.toFixed(2)}x</span>
          <button
            onClick={() => setZoom((z) => Math.min(3, z + 0.25))}
            className="grid h-7 w-7 place-items-center rounded-md bg-white/5 text-white/70 hover:bg-white/10"
            aria-label="Zoom in"
          >
            +
          </button>
          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-white/60 hover:bg-white/10"
          >
            Reset
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        className="relative cursor-grab select-none active:cursor-grabbing"
        style={{ height }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        <svg width="100%" height="100%" viewBox="0 0 600 420" className="absolute inset-0">
          <BackgroundTerrain biome={seed.spawnBiome} />

          {measurePoints.length === 2 && (
            <line
              x1={project(measurePoints[0].coords).x}
              y1={project(measurePoints[0].coords).y}
              x2={project(measurePoints[1].coords).x}
              y2={project(measurePoints[1].coords).y}
              stroke="#7dd3fc"
              strokeDasharray="6 4"
              strokeWidth="1.5"
            />
          )}

          {points.map((p, i) => {
            const pos = project(p.coords);
            const isSelected = selected && selected.label === p.label && selected.type === p.type;
            return (
              <g key={i} transform={`translate(${pos.x}, ${pos.y})`} className="cursor-pointer" onClick={() => handlePointClick(p)}>
                <circle r={p.type === 'Spawn' ? 16 : 13} fill={isSelected ? 'rgba(125,211,252,0.35)' : 'rgba(17,24,35,0.85)'} stroke="#7dd3fc" strokeWidth="1.2" />
                <text textAnchor="middle" dy="5" fontSize="13">
                  {ICONS[p.type] || '📍'}
                </text>
              </g>
            );
          })}
        </svg>

        {selected && (
          <div className="absolute bottom-3 left-3 glass rounded-lg px-3 py-2 text-xs">
            <div className="font-semibold text-frost-100">{selected.label}</div>
            <div className="font-mono-data text-white/55">
              x: {selected.coords.x}, z: {selected.coords.z} · {selected.distance}b from spawn
            </div>
          </div>
        )}

        {measurePoints.length === 2 && (
          <div className="absolute bottom-3 right-3 glass rounded-lg px-3 py-2 text-xs">
            <div className="text-white/50">Measured distance</div>
            <div className="font-mono-data text-sm font-semibold text-glacier">
              {distanceBetween(measurePoints[0], measurePoints[1])} blocks
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
