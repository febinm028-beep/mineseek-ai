// ---------------------------------------------------------------------------
// AI LAYER — analyzeSeedRequest(userPrompt)
// ---------------------------------------------------------------------------
// This module is the ONLY place that understands natural-language prompts.
// The frontend never talks to an AI provider directly, and no API key is
// ever referenced here or anywhere in client code.
//
// CURRENT STATE (mock): a lightweight keyword/synonym matcher runs entirely
// in the browser and returns a structured requirements object. There is no
// network call, no key, and no cost.
//
// FUTURE STATE (real AI): swap the body of `analyzeSeedRequest` for a call
// to your own backend endpoint (e.g. POST /api/analyze) which in turn calls
// an LLM using a server-side environment variable such as:
//
//   const AI_API_KEY = process.env.MINESEEK_AI_API_KEY;
//
// The function signature and return shape below are the CONTRACT the rest
// of the app relies on — keep them stable and only the implementation
// underneath needs to change. See README.md → "Connecting a real AI API".
// ---------------------------------------------------------------------------

const KEYWORD_MAP = {
  biomes: {
    'snowy slopes': ['snowy', 'snow', 'winter'],
    'ice spikes': ['ice spike', 'ice spikes'],
    'frozen peaks': ['frozen peak', 'frozen mountain', 'glacier'],
    'cherry grove': ['cherry', 'sakura', 'pink blossom', 'blossom'],
    'dark forest': ['dark forest', 'spooky forest'],
    'mangrove swamp': ['mangrove', 'swamp'],
    'warm ocean': ['coral', 'warm ocean', 'tropical'],
    'deep ocean': ['deep ocean', 'ocean monument water'],
    plains: ['plains', 'grassland', 'sunflower'],
    taiga: ['taiga', 'pine forest'],
    savanna: ['savanna', 'acacia'],
    'jagged peaks': ['jagged peak', 'rocky mountain'],
    'windswept hills': ['windswept', 'gravelly hills']
  },
  terrain: {
    mountains: ['mountain', 'peak', 'cliff', 'highland', 'alps'],
    'frozen lake': ['frozen lake', 'ice lake', 'lake'],
    valley: ['valley', 'vale'],
    coastline: ['coast', 'beach', 'shoreline'],
    caves: ['cave', 'underground', 'deep dark']
  },
  structures: {
    village: ['village', 'villager'],
    'ancient city': ['ancient city', 'deep dark', 'sculk'],
    'trial chambers': ['trial chamber', 'trial chambers', 'vault'],
    'woodland mansion': ['mansion', 'woodland mansion'],
    stronghold: ['stronghold', 'end portal'],
    'ocean monument': ['monument', 'guardian temple'],
    'pillager outpost': ['outpost', 'pillager'],
    shipwreck: ['shipwreck', 'sunken ship'],
    'desert temple': ['desert temple', 'pyramid']
  }
};

const CATEGORY_TAGS = new Set([
  'snowy',
  'mountains',
  'cherry',
  'villages',
  'rare',
  'speedrun',
  'ancient-city',
  'mansion',
  'ocean',
  'forest',
  'aesthetic'
]);

function findMatches(text, dictionary) {
  const hits = [];
  for (const [canonical, synonyms] of Object.entries(dictionary)) {
    if (synonyms.some((s) => text.includes(s))) hits.push(canonical);
  }
  return hits;
}

function extractMaxDistance(text) {
  // Look for patterns like "within 500 blocks", "under 1000", "near spawn"
  const numMatch = text.match(/(\d{2,5})\s*(blocks?)?/);
  if (numMatch) return parseInt(numMatch[1], 10);
  if (/near spawn|close to spawn|right at spawn/.test(text)) return 400;
  return null;
}

function extractEdition(text) {
  if (/bedrock/.test(text)) return 'Bedrock';
  if (/java/.test(text)) return 'Java';
  return null;
}

function guessCategoryTags(text, biomes, structures, terrain) {
  const tags = new Set();
  if (biomes.some((b) => b.includes('snowy') || b.includes('ice') || b.includes('frozen'))) tags.add('snowy');
  if (terrain.includes('mountains') || biomes.some((b) => b.includes('peak'))) tags.add('mountains');
  if (biomes.includes('cherry grove')) tags.add('cherry');
  if (structures.includes('village')) tags.add('villages');
  if (structures.includes('ancient city')) tags.add('ancient-city');
  if (structures.includes('woodland mansion')) tags.add('mansion');
  if (biomes.some((b) => b.includes('ocean')) || terrain.includes('coastline')) tags.add('ocean');
  if (biomes.some((b) => b.includes('forest') || b.includes('taiga'))) tags.add('forest');
  if (/aesthetic|beautiful|pretty|scenic|stunning|photogenic/.test(text)) tags.add('aesthetic');
  if (/speedrun|fast|quick|efficient|blind travel/.test(text)) tags.add('speedrun');
  if (/rare|unique|unusual|special/.test(text)) tags.add('rare');
  return [...tags].filter((t) => CATEGORY_TAGS.has(t));
}

/**
 * analyzeSeedRequest
 * Converts a free-text description of a desired Minecraft world into a
 * structured requirements object the seed engine can search against.
 *
 * @param {string} userPrompt
 * @returns {{
 *   biomes: string[],
 *   structures: string[],
 *   terrain: string[],
 *   maxDistance: number|null,
 *   edition: 'Java'|'Bedrock'|null,
 *   aesthetic: boolean,
 *   categoryTags: string[],
 *   rawPrompt: string
 * }}
 */
export function analyzeSeedRequest(userPrompt) {
  const text = (userPrompt || '').toLowerCase().trim();

  const biomes = findMatches(text, KEYWORD_MAP.biomes);
  const terrain = findMatches(text, KEYWORD_MAP.terrain);
  const structures = findMatches(text, KEYWORD_MAP.structures);
  const maxDistance = extractMaxDistance(text);
  const edition = extractEdition(text);
  const aesthetic = /aesthetic|beautiful|pretty|scenic|stunning|gorgeous|photogenic/.test(text);
  const categoryTags = guessCategoryTags(text, biomes, structures, terrain);

  return {
    biomes,
    structures,
    terrain,
    maxDistance,
    edition,
    aesthetic,
    categoryTags,
    rawPrompt: userPrompt || ''
  };
}
