// ---------------------------------------------------------------------------
// FAVORITES — localStorage-backed persistence
// ---------------------------------------------------------------------------
// First-version storage for saved seeds, collections and notes. No backend
// or account required. Swap this module for real API calls once user
// accounts exist (see README.md → "Community system / accounts later").
// ---------------------------------------------------------------------------

const KEY = 'mineseek:favorites:v1';
const NOTES_KEY = 'mineseek:notes:v1';
const COLLECTIONS_KEY = 'mineseek:collections:v1';

function read(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // storage unavailable (private mode / quota) — fail silently for prototype
  }
}

export function getFavorites() {
  return read(KEY, []);
}

export function isFavorite(seedId) {
  return getFavorites().includes(seedId);
}

export function toggleFavorite(seedId) {
  const current = getFavorites();
  const next = current.includes(seedId)
    ? current.filter((id) => id !== seedId)
    : [...current, seedId];
  write(KEY, next);
  return next;
}

export function getNotes(seedId) {
  const all = read(NOTES_KEY, {});
  return all[seedId] || '';
}

export function setNote(seedId, text) {
  const all = read(NOTES_KEY, {});
  all[seedId] = text;
  write(NOTES_KEY, all);
}

export function getCollections() {
  return read(COLLECTIONS_KEY, [{ id: 'default', name: 'My Worlds', seedIds: [] }]);
}

export function createCollection(name) {
  const collections = getCollections();
  const next = [...collections, { id: `c-${Date.now()}`, name, seedIds: [] }];
  write(COLLECTIONS_KEY, next);
  return next;
}

export function addToCollection(collectionId, seedId) {
  const collections = getCollections().map((c) =>
    c.id === collectionId && !c.seedIds.includes(seedId)
      ? { ...c, seedIds: [...c.seedIds, seedId] }
      : c
  );
  write(COLLECTIONS_KEY, collections);
  return collections;
}

export function removeFromCollection(collectionId, seedId) {
  const collections = getCollections().map((c) =>
    c.id === collectionId ? { ...c, seedIds: c.seedIds.filter((id) => id !== seedId) } : c
  );
  write(COLLECTIONS_KEY, collections);
  return collections;
}
