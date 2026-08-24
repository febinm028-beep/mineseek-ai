import { Link } from 'react-router-dom';
import { isFavorite, toggleFavorite } from '../lib/favorites.js';
import { useState } from 'react';

function matchColor(match) {
  if (match >= 90) return 'text-glacier';
  if (match >= 70) return 'text-frost-300';
  return 'text-white/60';
}

export default function SeedCard({ seed }) {
  const [fav, setFav] = useState(isFavorite(seed.id));
  const topStructures = seed.structures.slice(0, 3);

  function handleFav(e) {
    e.preventDefault();
    toggleFavorite(seed.id);
    setFav((f) => !f);
  }

  async function handleShare(e) {
    e.preventDefault();
    const text = `${seed.name} — seed ${seed.seed} (${seed.edition} ${seed.version}) on MineSeek AI`;
    if (navigator.share) {
      try {
        await navigator.share({ title: seed.name, text });
      } catch {
        /* user cancelled */
      }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  }

  return (
    <Link
      to={`/seed/${seed.id}`}
      className="group relative block shard-panel-sm shard-panel p-5 transition-transform hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-frost-50">{seed.name}</h3>
          <p className="mt-0.5 text-xs text-white/45">{seed.edition} · {seed.version} · {seed.spawnBiome}</p>
        </div>
        <div className={`shrink-0 text-right font-mono-data ${matchColor(seed.match)}`}>
          <div className="text-xl font-bold leading-none">{seed.match}%</div>
          <div className="text-[10px] uppercase tracking-wide text-white/35">AI Match</div>
        </div>
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-white/60">{seed.description}</p>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {topStructures.map((s) => (
          <span key={s.type} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/60">
            {s.type} · {s.distance}b
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
        <span className="font-mono-data text-xs text-white/40 truncate max-w-[45%]">{seed.seed}</span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleFav}
            aria-label="Save seed"
            className={`rounded-full px-2.5 py-1.5 text-sm transition-colors ${
              fav ? 'bg-frost-300/15 text-frost-200' : 'bg-white/5 text-white/50 hover:text-white/80'
            }`}
          >
            {fav ? '★ Saved' : '☆ Save'}
          </button>
          <button
            onClick={handleShare}
            aria-label="Share seed"
            className="rounded-full bg-white/5 px-2.5 py-1.5 text-sm text-white/50 hover:text-white/80"
          >
            ⤴
          </button>
        </div>
      </div>
    </Link>
  );
}
