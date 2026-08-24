import { useState } from 'react';

const POPULAR = ['Snowy mountains', 'Cherry valley', 'Village spawn', 'Rare biomes', 'Ancient city', 'Speedrun'];

export default function SearchBar({ onSearch, size = 'lg' }) {
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);
    // Simulated AI "thinking" delay for feel — real call would await the API.
    await new Promise((r) => setTimeout(r, 550));
    setLoading(false);
    onSearch(value.trim());
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="shard-panel flex items-center gap-3 px-4 py-4 shadow-glow sm:px-6 sm:py-5">
          <span className="text-2xl">🧊</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Describe your perfect Minecraft world..."
            className={`flex-1 bg-transparent text-frost-50 placeholder-white/35 outline-none ${
              size === 'lg' ? 'text-base sm:text-lg' : 'text-sm'
            }`}
            aria-label="Describe your perfect Minecraft world"
          />
          <button
            type="submit"
            disabled={loading}
            className="shrink-0 rounded-lg bg-gradient-to-br from-frost-300 to-frost-500 px-4 py-2.5 text-sm font-semibold text-void transition-transform active:scale-95 disabled:opacity-60 sm:px-5"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-void/30 border-t-void" />
                Analyzing
              </span>
            ) : (
              '🔍 Find My Seed'
            )}
          </button>
        </div>
        {loading && <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full bg-white/5"><div className="h-full w-1/2 shimmer" /></div>}
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wide text-white/35">Popular</span>
        {POPULAR.map((p) => (
          <button
            key={p}
            onClick={() => onSearch(p)}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/70 transition-colors hover:border-frost-300/40 hover:text-frost-100"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
