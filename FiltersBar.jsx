import { CATEGORIES } from '../data/seeds.js';

const SORTS = [
  { id: 'match', label: 'AI Match' },
  { id: 'popularity', label: 'Popularity' },
  { id: 'newest', label: 'Newest' },
  { id: 'distance', label: 'Distance from spawn' }
];

const VERSIONS = ['All versions', '1.21.1', '1.21.30', '1.20.6'];

export default function FiltersBar({ filters, onChange }) {
  function set(key, value) {
    onChange({ ...filters, [key]: value });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        <button
          onClick={() => set('category', null)}
          className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
            !filters.category ? 'bg-frost-300 text-void' : 'bg-white/5 text-white/60 hover:bg-white/10'
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => set('category', c.id)}
            className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              filters.category === c.id ? 'bg-frost-300 text-void' : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            {c.emoji} {c.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={filters.edition || ''}
          onChange={(e) => set('edition', e.target.value || null)}
          className="glass rounded-lg px-3 py-2 text-xs text-white/70 outline-none"
        >
          <option value="">Java + Bedrock</option>
          <option value="Java">Java Edition</option>
          <option value="Bedrock">Bedrock Edition</option>
        </select>

        <select
          value={filters.version || 'All versions'}
          onChange={(e) => set('version', e.target.value)}
          className="glass rounded-lg px-3 py-2 text-xs text-white/70 outline-none"
        >
          {VERSIONS.map((v) => (
            <option key={v} value={v}>{v}</option>
          ))}
        </select>

        <div className="ml-auto flex items-center gap-1.5">
          <span className="hidden text-xs text-white/40 sm:inline">Sort</span>
          <select
            value={filters.sortBy || 'match'}
            onChange={(e) => set('sortBy', e.target.value)}
            className="glass rounded-lg px-3 py-2 text-xs text-white/70 outline-none"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
