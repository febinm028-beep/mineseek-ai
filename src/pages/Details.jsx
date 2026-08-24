import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getSeedById } from '../data/seeds.js';
import SeedMap from '../components/SeedMap.jsx';
import { isFavorite, toggleFavorite, getNotes, setNote } from '../lib/favorites.js';

const THUMB_GRADIENTS = {
  'ice-peaks': 'from-sky-200 via-sky-400 to-slate-700',
  'cherry-bloom': 'from-pink-200 via-pink-400 to-fuchsia-700',
  'ocean-monument': 'from-cyan-200 via-teal-500 to-slate-800',
  'taiga-cabin': 'from-emerald-200 via-emerald-600 to-slate-800',
  'mansion-fog': 'from-stone-300 via-stone-600 to-slate-900',
  'glacier-spire': 'from-sky-100 via-cyan-300 to-indigo-800',
  'sunflower-plains': 'from-yellow-200 via-lime-400 to-emerald-700',
  'ancient-city-glow': 'from-teal-200 via-emerald-800 to-slate-950',
  'coral-reef': 'from-orange-200 via-pink-400 to-cyan-700',
  'windswept-peaks': 'from-stone-200 via-slate-500 to-slate-900',
  'mangrove-glow': 'from-lime-200 via-emerald-700 to-slate-900',
  'trial-chambers': 'from-indigo-200 via-violet-600 to-slate-900'
};

export default function Details() {
  const { id } = useParams();
  const seed = getSeedById(id);
  const [fav, setFav] = useState(seed ? isFavorite(seed.id) : false);
  const [note, setNoteText] = useState(seed ? getNotes(seed.id) : '');

  if (!seed) {
    return (
      <div className="aurora-bg flex min-h-screen items-center justify-center px-4 text-center">
        <div>
          <p className="text-white/60">Seed not found.</p>
          <Link to="/explore" className="mt-3 inline-block text-frost-300 hover:text-frost-200">← Back to Explore</Link>
        </div>
      </div>
    );
  }

  function handleFav() {
    toggleFavorite(seed.id);
    setFav((f) => !f);
  }

  function handleNoteChange(e) {
    const val = e.target.value;
    setNoteText(val);
    setNote(seed.id, val);
  }

  async function handleShare() {
    const text = `${seed.name} — seed ${seed.seed} (${seed.edition} ${seed.version})`;
    if (navigator.share) {
      try { await navigator.share({ title: seed.name, text }); } catch { /* cancelled */ }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    }
  }

  return (
    <div className="aurora-bg min-h-screen px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <Link to="/explore" className="text-xs text-white/40 hover:text-white/70">← Back to Explore</Link>

        <div className={`mt-4 h-40 w-full rounded-2xl bg-gradient-to-br sm:h-56 ${THUMB_GRADIENTS[seed.thumbnail] || 'from-slate-600 to-slate-900'}`} />

        <div className="mt-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
          <div>
            <h1 className="font-display text-2xl font-bold text-frost-50 sm:text-3xl">{seed.name}</h1>
            <p className="mt-1 text-sm text-white/50">{seed.edition} Edition · v{seed.version} · Spawn biome: {seed.spawnBiome}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {seed.tags.map((t) => (
                <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/55">{t}</span>
              ))}
              {seed.verified ? (
                <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[11px] text-emerald-300">✓ Seed verified</span>
              ) : (
                <span className="rounded-full bg-amber-400/10 px-2.5 py-1 text-[11px] text-amber-300">⚠ Unverified</span>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button onClick={handleFav} className={`rounded-lg px-4 py-2.5 text-sm font-medium ${fav ? 'bg-frost-300/15 text-frost-100' : 'bg-white/5 text-white/60 hover:bg-white/10'}`}>
              {fav ? '★ Saved' : '☆ Save Seed'}
            </button>
            <button onClick={handleShare} className="rounded-lg bg-white/5 px-4 py-2.5 text-sm font-medium text-white/60 hover:bg-white/10">
              ⤴ Share
            </button>
          </div>
        </div>

        <div className="mt-6 shard-panel px-5 py-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <div className="text-[11px] uppercase tracking-wide text-white/35">Seed number</div>
              <div className="font-mono-data text-sm font-semibold text-frost-100 break-all">{seed.seed}</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-white/35">Spawn coords</div>
              <div className="font-mono-data text-sm font-semibold text-frost-100">
                {seed.spawn.x}, {seed.spawn.y}, {seed.spawn.z}
              </div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-white/35">AI Match</div>
              <div className="text-sm font-semibold text-glacier">{seed.match ?? '—'}%</div>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wide text-white/35">Popularity</div>
              <div className="text-sm font-semibold text-frost-100">{seed.popularity}/100</div>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-white/65">{seed.description}</p>

        <div className="mt-8">
          <h2 className="mb-3 font-display text-lg font-semibold text-frost-50">Map</h2>
          <SeedMap seed={seed} />
        </div>

        <div className="mt-8">
          <h2 className="mb-3 font-display text-lg font-semibold text-frost-50">Structures &amp; distances</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {seed.structures.map((s) => (
              <div key={s.type} className="glass flex items-center justify-between rounded-lg px-4 py-3">
                <div>
                  <div className="text-sm font-medium text-frost-100">{s.type}</div>
                  <div className="text-xs text-white/40">{s.biome}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono-data text-sm text-white/70">{s.distance}b</div>
                  <div className="font-mono-data text-[11px] text-white/35">x{s.coords.x}, z{s.coords.z}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 font-display text-lg font-semibold text-frost-50">Nearby biomes</h2>
          <div className="flex flex-wrap gap-2">
            {seed.biomesNearby.map((b) => (
              <span key={b} className="rounded-full bg-white/5 px-3 py-1.5 text-xs text-white/60">{b}</span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h2 className="mb-3 font-display text-lg font-semibold text-frost-50">Your notes</h2>
          <textarea
            value={note}
            onChange={handleNoteChange}
            placeholder="Base ideas, things to remember about this seed…"
            rows={3}
            className="glass w-full rounded-xl px-4 py-3 text-sm text-white/80 outline-none placeholder-white/30"
          />
          <p className="mt-1.5 text-[11px] text-white/30">Saved to this device only.</p>
        </div>
      </div>
    </div>
  );
}
