import { useEffect, useState } from 'react';
import { getFavorites, getCollections, createCollection } from '../lib/favorites.js';
import { getSeedById } from '../data/seeds.js';
import ResultsGrid from '../components/ResultsGrid.jsx';

export default function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [collections, setCollections] = useState([]);
  const [newCollectionName, setNewCollectionName] = useState('');

  useEffect(() => {
    setFavoriteIds(getFavorites());
    setCollections(getCollections());
  }, []);

  const favoriteSeeds = favoriteIds.map(getSeedById).filter(Boolean);

  function handleCreateCollection(e) {
    e.preventDefault();
    if (!newCollectionName.trim()) return;
    setCollections(createCollection(newCollectionName.trim()));
    setNewCollectionName('');
  }

  return (
    <div className="aurora-bg min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-2xl font-bold text-frost-50 sm:text-3xl">Your favorites</h1>
        <p className="mt-1 text-sm text-white/50">Saved on this device with localStorage — {favoriteSeeds.length} seed(s).</p>

        <div className="mt-8">
          <ResultsGrid seeds={favoriteSeeds} emptyMessage="You haven't saved any seeds yet — tap ☆ Save on a seed card to add one." />
        </div>

        <div className="mt-12">
          <h2 className="mb-3 font-display text-lg font-semibold text-frost-50">Collections</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {collections.map((c) => (
              <div key={c.id} className="glass rounded-xl px-4 py-4">
                <div className="font-medium text-frost-100">{c.name}</div>
                <div className="mt-1 text-xs text-white/40">{c.seedIds.length} seed(s)</div>
              </div>
            ))}
          </div>
          <form onSubmit={handleCreateCollection} className="mt-4 flex max-w-sm gap-2">
            <input
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="New collection name"
              className="glass flex-1 rounded-lg px-3 py-2 text-sm text-white/80 outline-none placeholder-white/30"
            />
            <button type="submit" className="rounded-lg bg-frost-300 px-4 py-2 text-sm font-medium text-void">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
