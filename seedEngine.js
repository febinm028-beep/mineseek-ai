// ---------------------------------------------------------------------------
// SEED ENGINE — searchSeeds(criteria)
// ---------------------------------------------------------------------------
// This module is the boundary between "what the user wants" (criteria, from
// aiParser.js) and "what seed data exists" (SEEDS, from data/seeds.js).
//
// CURRENT STATE (mock): scores and filters the in-memory SEEDS array.
// FUTURE STATE (real engine): replace the body of `searchSeeds` with a call
// to a real Minecraft world-generation service, e.g.:
//
//   export async function searchSeeds(criteria) {
//     const res = await fetch('/api/search-seeds', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(criteria)
//     });
//     return res.json();
//   }
//
// Keep the input (criteria shape from aiParser) and output (array of seed
// objects with a `match` percentage attached) stable so the rest of the UI
// does not need to change. See README.md → "Connecting a real seed engine".
// ---------------------------------------------------------------------------

import { SEEDS } from '../data/seeds.js';

function biomeListOf(seed) {
  return [seed.spawnBiome, ...seed.biomesNearby].map((b) => b.toLowerCase());
}

function structureListOf(seed) {
  return seed.structures.map((s) => s.type.toLowerCase());
}

/**
 * Scores a single seed against parsed criteria. Returns 0-100.
 */
function scoreSeed(seed, criteria) {
  let score = 40; // baseline so unrelated seeds don't show as 0%
  let signals = 0;

  const seedBiomes = biomeListOf(seed);
  const seedStructures = structureListOf(seed);

  if (criteria.biomes?.length) {
    signals++;
    const hits = criteria.biomes.filter((b) => seedBiomes.some((sb) => sb.includes(b) || b.includes(sb)));
    score += (hits.length / criteria.biomes.length) * 25;
  }

  if (criteria.terrain?.length) {
    signals++;
    const terrainText = (seed.description + ' ' + seed.spawnBiome).toLowerCase();
    const hits = criteria.terrain.filter((t) => terrainText.includes(t.split(' ')[0]));
    score += (hits.length / criteria.terrain.length) * 15;
  }

  if (criteria.structures?.length) {
    signals++;
    const hits = criteria.structures.filter((s) => seedStructures.some((ss) => ss.includes(s) || s.includes(ss)));
    score += (hits.length / criteria.structures.length) * 25;
  }

  if (criteria.categoryTags?.length) {
    signals++;
    const hits = criteria.categoryTags.filter((c) => seed.tags.includes(c));
    score += (hits.length / criteria.categoryTags.length) * 15;
  }

  if (criteria.edition && seed.edition !== criteria.edition) {
    score -= 20;
  }

  if (criteria.maxDistance) {
    const nearest = Math.min(...seed.structures.map((s) => s.distance), Infinity);
    if (nearest <= criteria.maxDistance) score += 10;
    else score -= 10;
  }

  if (criteria.aesthetic && seed.tags.includes('aesthetic')) score += 8;

  // Popularity gives a small tie-breaking nudge
  score += (seed.popularity / 100) * 5;

  if (signals === 0) score = 55 + (seed.popularity / 100) * 20;

  return Math.max(1, Math.min(99, Math.round(score)));
}

/**
 * searchSeeds
 * @param {object} criteria - output of analyzeSeedRequest()
 * @param {object} [options]
 * @param {string} [options.sortBy] - 'match' | 'popularity' | 'newest' | 'distance'
 * @param {string} [options.category] - optional category id to filter to
 * @param {string} [options.edition] - 'Java' | 'Bedrock'
 * @returns {Array} seeds annotated with a `match` percentage, sorted
 */
export function searchSeeds(criteria = {}, options = {}) {
  let results = SEEDS.map((seed) => ({
    ...seed,
    match: scoreSeed(seed, criteria)
  }));

  if (options.category) {
    results = results.filter((s) => s.tags.includes(options.category));
  }

  if (options.edition) {
    results = results.filter((s) => s.edition === options.edition);
  }

  const sortBy = options.sortBy || 'match';
  results.sort((a, b) => {
    if (sortBy === 'popularity') return b.popularity - a.popularity;
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'distance') {
      const da = Math.min(...a.structures.map((s) => s.distance));
      const db = Math.min(...b.structures.map((s) => s.distance));
      return da - db;
    }
    return b.match - a.match;
  });

  return results;
}
