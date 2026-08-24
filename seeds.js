// ---------------------------------------------------------------------------
// MOCK DATA LAYER
// ---------------------------------------------------------------------------
// This file stands in for a real Minecraft world-generation / seed-analysis
// database. Every seed below is FAKE sample data written for this prototype —
// none of these numbers have been run through an actual Minecraft world
// generator. When a real analysis engine exists, this file is what
// `src/lib/seedEngine.js` will stop importing from (see that file's header).
// ---------------------------------------------------------------------------

export const CATEGORIES = [
  { id: 'snowy', label: 'Snowy', emoji: '❄️' },
  { id: 'mountains', label: 'Mountains', emoji: '🏔️' },
  { id: 'cherry', label: 'Cherry Grove', emoji: '🌸' },
  { id: 'villages', label: 'Villages', emoji: '🏘️' },
  { id: 'rare', label: 'Rare', emoji: '💎' },
  { id: 'speedrun', label: 'Speedrun', emoji: '⚔️' },
  { id: 'ancient-city', label: 'Ancient City', emoji: '🏛️' },
  { id: 'mansion', label: 'Mansion', emoji: '🏰' },
  { id: 'ocean', label: 'Ocean', emoji: '🌊' },
  { id: 'forest', label: 'Forest', emoji: '🌲' },
  { id: 'aesthetic', label: 'Aesthetic', emoji: '🌅' }
];

export const SEEDS = [
  {
    id: 's-001',
    name: 'Frozen Kingdom',
    seed: '-8739184756123890',
    edition: 'Java',
    version: '1.21.1',
    verified: true,
    spawn: { x: 112, y: 82, z: -340 },
    spawnBiome: 'Snowy Slopes',
    tags: ['snowy', 'mountains', 'aesthetic', 'villages'],
    baseMatch: 0,
    popularity: 98,
    createdAt: '2026-06-02',
    structures: [
      { type: 'Village', biome: 'Snowy Tundra', distance: 340, coords: { x: 210, z: -520 } },
      { type: 'Frozen Lake', biome: 'Frozen Peaks', distance: 180, coords: { x: 90, z: -180 } },
      { type: 'Ice Spikes', biome: 'Ice Spikes', distance: 610, coords: { x: 480, z: -760 } }
    ],
    biomesNearby: ['Snowy Slopes', 'Frozen Peaks', 'Grove', 'Frozen River'],
    description:
      'A dramatic frozen valley wraps around spawn, with jagged snow-capped peaks on every horizon and a mirror-flat frozen lake below. A snowy village sits tucked into a saddle between two mountains, 340 blocks out.',
    screenshots: ['mountain-vista', 'frozen-lake', 'snowy-village'],
    thumbnail: 'ice-peaks'
  },
  {
    id: 's-002',
    name: 'Sakura Hollow',
    seed: '4021958637',
    edition: 'Java',
    version: '1.21.1',
    verified: true,
    spawn: { x: -64, y: 74, z: 210 },
    spawnBiome: 'Cherry Grove',
    tags: ['cherry', 'aesthetic', 'forest'],
    baseMatch: 0,
    popularity: 91,
    createdAt: '2026-05-14',
    structures: [
      { type: 'Village', biome: 'Plains', distance: 520, coords: { x: -300, z: 610 } },
      { type: 'Pillager Outpost', biome: 'Forest', distance: 890, coords: { x: 720, z: 300 } }
    ],
    biomesNearby: ['Cherry Grove', 'Plains', 'Flower Forest', 'Meadow'],
    description:
      'Spawn drops you directly inside a sprawling cherry grove in full bloom, with pink petals drifting over a small stream. A meadow and flower forest border it, making this one of the prettiest "photo mode" spawns in the database.',
    screenshots: ['cherry-canopy', 'petal-stream'],
    thumbnail: 'cherry-bloom'
  },
  {
    id: 's-003',
    name: 'Abyssal Anchorage',
    seed: '187342056',
    edition: 'Java',
    version: '1.21.1',
    verified: true,
    spawn: { x: 45, y: 68, z: 12 },
    spawnBiome: 'Beach',
    tags: ['ocean', 'rare', 'ancient-city'],
    baseMatch: 0,
    popularity: 86,
    createdAt: '2026-04-30',
    structures: [
      { type: 'Ocean Monument', biome: 'Deep Ocean', distance: 410, coords: { x: 40, z: 420 } },
      { type: 'Ancient City', biome: 'Deep Dark', distance: 980, coords: { x: -600, z: 720 } },
      { type: 'Shipwreck', biome: 'Ocean', distance: 260, coords: { x: 260, z: 90 } }
    ],
    biomesNearby: ['Beach', 'Deep Ocean', 'Warm Ocean', 'Coral Reef'],
    description:
      'A near-spawn ocean monument guards a coral-lined coastline, and a deep dark ancient city lurks beneath the seabed roughly 980 blocks out — a rare double-structure combination for underwater builders and deep dark explorers alike.',
    screenshots: ['monument-coast', 'coral-shallows'],
    thumbnail: 'ocean-monument'
  },
  {
    id: 's-004',
    name: 'Timberline Refuge',
    seed: '998211430',
    edition: 'Bedrock',
    version: '1.21.30',
    verified: true,
    spawn: { x: 0, y: 90, z: 0 },
    spawnBiome: 'Taiga',
    tags: ['forest', 'mountains', 'villages', 'speedrun'],
    baseMatch: 0,
    popularity: 77,
    createdAt: '2026-03-11',
    structures: [
      { type: 'Village', biome: 'Taiga', distance: 96, coords: { x: 96, z: 20 } },
      { type: 'Stronghold', biome: 'Mountains', distance: 1120, coords: { x: -900, z: 640 } },
      { type: 'Woodland Mansion', biome: 'Dark Forest', distance: 1480, coords: { x: 1200, z: -800 } }
    ],
    biomesNearby: ['Taiga', 'Snowy Taiga', 'Mountains', 'Dark Forest'],
    description:
      'An unusually close village (96 blocks) with a blacksmith chest makes this a favorite speedrun-adjacent seed, backed by a dense taiga forest and distant snow peaks for a cozy survival base.',
    screenshots: ['taiga-village', 'forest-ridge'],
    thumbnail: 'taiga-cabin'
  },
  {
    id: 's-005',
    name: 'Duskwood Manor',
    seed: '-224871095',
    edition: 'Java',
    version: '1.20.6',
    verified: true,
    spawn: { x: 300, y: 70, z: -50 },
    spawnBiome: 'Dark Forest',
    tags: ['mansion', 'forest', 'rare'],
    baseMatch: 0,
    popularity: 82,
    createdAt: '2026-02-22',
    structures: [
      { type: 'Woodland Mansion', biome: 'Dark Forest', distance: 210, coords: { x: 480, z: -140 } },
      { type: 'Village', biome: 'Plains', distance: 640, coords: { x: -300, z: -200 } }
    ],
    biomesNearby: ['Dark Forest', 'Plains', 'Birch Forest'],
    description:
      'A woodland mansion looms just 210 blocks from spawn, wrapped in dense dark oak canopy — an unusually short walk for one of the rarest structures in the game.',
    screenshots: ['mansion-approach', 'dark-canopy'],
    thumbnail: 'mansion-fog'
  },
  {
    id: 's-006',
    name: 'Glacier Spire',
    seed: '55321987001',
    edition: 'Java',
    version: '1.21.1',
    verified: true,
    spawn: { x: -12, y: 140, z: 88 },
    spawnBiome: 'Frozen Peaks',
    tags: ['snowy', 'mountains', 'aesthetic', 'rare'],
    baseMatch: 0,
    popularity: 95,
    createdAt: '2026-06-18',
    structures: [
      { type: 'Ice Spikes', biome: 'Ice Spikes', distance: 300, coords: { x: 250, z: 150 } },
      { type: 'Village', biome: 'Snowy Plains', distance: 720, coords: { x: -600, z: 400 } },
      { type: 'Trial Chambers', biome: 'Underground', distance: 540, coords: { x: 400, z: -300 } }
    ],
    biomesNearby: ['Frozen Peaks', 'Ice Spikes', 'Snowy Slopes', 'Grove'],
    description:
      'Spawns you at Y=140 on a knife-edge frozen peak overlooking a full ice spikes biome — one of the tallest and most dramatic vertical spawns in the collection, with a trial chambers entrance 540 blocks below.',
    screenshots: ['spire-overlook', 'ice-spikes-field'],
    thumbnail: 'glacier-spire'
  },
  {
    id: 's-007',
    name: 'Whispering Steppe',
    seed: '30294857612',
    edition: 'Java',
    version: '1.21.1',
    verified: true,
    spawn: { x: 20, y: 76, z: 40 },
    spawnBiome: 'Plains',
    tags: ['villages', 'speedrun', 'aesthetic'],
    baseMatch: 0,
    popularity: 70,
    createdAt: '2026-01-09',
    structures: [
      { type: 'Village', biome: 'Plains', distance: 48, coords: { x: 60, z: 60 } },
      { type: 'Desert Temple', biome: 'Desert', distance: 900, coords: { x: 850, z: -120 } }
    ],
    biomesNearby: ['Plains', 'Sunflower Plains', 'Desert'],
    description:
      'A double village within sight of spawn, one of which borders a sunflower plains field — an easy, friendly start seed with great early-game loot.',
    screenshots: ['plains-village', 'sunflower-field'],
    thumbnail: 'sunflower-plains'
  },
  {
    id: 's-008',
    name: 'Basalt Deep',
    seed: '-77123456789',
    edition: 'Java',
    version: '1.21.1',
    verified: true,
    spawn: { x: 0, y: 64, z: 0 },
    spawnBiome: 'Forest',
    tags: ['ancient-city', 'rare', 'speedrun'],
    baseMatch: 0,
    popularity: 88,
    createdAt: '2026-05-27',
    structures: [
      { type: 'Ancient City', biome: 'Deep Dark', distance: 260, coords: { x: 180, z: -180 } },
      { type: 'Stronghold', biome: 'Underground', distance: 610, coords: { x: -400, z: 300 } }
    ],
    biomesNearby: ['Forest', 'Deep Dark', 'Lush Caves'],
    description:
      'An exceptionally close ancient city sits only 260 blocks from spawn — top-tier for players hunting the Sculk Catalyst and swift sneak trims early.',
    screenshots: ['sculk-entrance', 'deep-dark-vault'],
    thumbnail: 'ancient-city-glow'
  },
  {
    id: 's-009',
    name: 'Coral Meridian',
    seed: '182736450',
    edition: 'Bedrock',
    version: '1.21.30',
    verified: true,
    spawn: { x: 200, y: 66, z: 300 },
    spawnBiome: 'Warm Ocean',
    tags: ['ocean', 'aesthetic', 'rare'],
    baseMatch: 0,
    popularity: 64,
    createdAt: '2025-12-19',
    structures: [
      { type: 'Coral Reef', biome: 'Warm Ocean', distance: 40, coords: { x: 210, z: 330 } },
      { type: 'Shipwreck', biome: 'Ocean', distance: 380, coords: { x: 500, z: 220 } },
      { type: 'Ocean Monument', biome: 'Deep Ocean', distance: 760, coords: { x: 850, z: 600 } }
    ],
    biomesNearby: ['Warm Ocean', 'Beach', 'Jungle'],
    description:
      'Spawn is surrounded by vivid coral reef in every direction with a jungle coastline nearby — built for underwater screenshots and turtle-egg farms.',
    screenshots: ['reef-panorama', 'jungle-coast'],
    thumbnail: 'coral-reef'
  },
  {
    id: 's-010',
    name: 'Ashfall Ridge',
    seed: '-9182736450',
    edition: 'Java',
    version: '1.21.1',
    verified: true,
    spawn: { x: 400, y: 110, z: -600 },
    spawnBiome: 'Windswept Gravelly Hills',
    tags: ['mountains', 'aesthetic', 'rare'],
    baseMatch: 0,
    popularity: 73,
    createdAt: '2026-04-02',
    structures: [
      { type: 'Village', biome: 'Savanna', distance: 810, coords: { x: 1000, z: -900 } },
      { type: 'Pillager Outpost', biome: 'Windswept Hills', distance: 420, coords: { x: 700, z: -700 } }
    ],
    biomesNearby: ['Windswept Gravelly Hills', 'Windswept Peaks', 'Savanna'],
    description:
      'Jagged grey stone peaks tower over a distant savanna, with goats roaming the cliffside right at spawn — a striking, moody mountain seed for cinematic builds.',
    screenshots: ['gravelly-peaks', 'goat-cliffs'],
    thumbnail: 'windswept-peaks'
  },
  {
    id: 's-011',
    name: 'Lantern Marsh',
    seed: '564738291',
    edition: 'Java',
    version: '1.20.6',
    verified: true,
    spawn: { x: -140, y: 63, z: 90 },
    spawnBiome: 'Mangrove Swamp',
    tags: ['aesthetic', 'rare', 'forest'],
    baseMatch: 0,
    popularity: 58,
    createdAt: '2025-11-30',
    structures: [
      { type: 'Witch Hut', biome: 'Swamp', distance: 220, coords: { x: -280, z: 180 } },
      { type: 'Village', biome: 'Plains', distance: 700, coords: { x: -700, z: -100 } }
    ],
    biomesNearby: ['Mangrove Swamp', 'Swamp', 'Dark Forest'],
    description:
      'Firefly-lit mangrove roots twist over still water right at spawn, with a witch hut close by for early potion ingredients — a quiet, atmospheric start.',
    screenshots: ['mangrove-roots', 'firefly-water'],
    thumbnail: 'mangrove-glow'
  },
  {
    id: 's-012',
    name: 'Highpeak Trials',
    seed: '73920184756',
    edition: 'Java',
    version: '1.21.1',
    verified: true,
    spawn: { x: 60, y: 128, z: -20 },
    spawnBiome: 'Jagged Peaks',
    tags: ['mountains', 'rare', 'speedrun'],
    baseMatch: 0,
    popularity: 80,
    createdAt: '2026-06-10',
    structures: [
      { type: 'Trial Chambers', biome: 'Underground', distance: 190, coords: { x: 140, z: -80 } },
      { type: 'Village', biome: 'Meadow', distance: 460, coords: { x: -300, z: 240 } }
    ],
    biomesNearby: ['Jagged Peaks', 'Meadow', 'Snowy Slopes'],
    description:
      'A trial chambers entrance sits almost directly beneath a jagged peak spawn, with a meadow village a short walk away for early resupply runs.',
    screenshots: ['jagged-peak', 'trial-entrance'],
    thumbnail: 'trial-chambers'
  }
];

export function getSeedById(id) {
  return SEEDS.find((s) => s.id === id) || null;
}
