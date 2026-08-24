# MineSeek AI

A dark, frost-themed Minecraft seed finder. Describe a world in plain English,
get matching seeds with spawn coordinates, structures, and an interactive
map. Built to run from a **Xiaomi Pad 6 (or any tablet/phone) at ₹0**.

---

## 1. Project structure

```
mineseek-ai/
├─ index.html                 Vite entry HTML
├─ package.json
├─ vite.config.js
├─ tailwind.config.js         design tokens (colors, fonts, shadows)
├─ postcss.config.js
├─ .env.example                template for future secrets (never commit .env)
└─ src/
   ├─ main.jsx                 React root + router
   ├─ App.jsx                  route table
   ├─ index.css                global styles, glass/shard/aurora effects
   │
   ├─ data/
   │  └─ seeds.js               MOCK seed database + category list
   │
   ├─ lib/                      ← the three swappable "engines"
   │  ├─ aiParser.js             analyzeSeedRequest(prompt) — AI layer
   │  ├─ seedEngine.js           searchSeeds(criteria) — search/scoring layer
   │  ├─ favorites.js            localStorage favorites/collections/notes
   │  └─ community.js            submission queue (mock, no auth yet)
   │
   ├─ components/
   │  ├─ Navbar.jsx
   │  ├─ SearchBar.jsx           the AI search box + popular searches
   │  ├─ ParsedRequirements.jsx  shows what the AI understood
   │  ├─ CategoryGrid.jsx
   │  ├─ FiltersBar.jsx          edition/version/sort/category filters
   │  ├─ SeedCard.jsx            result card (save/share/view)
   │  ├─ ResultsGrid.jsx
   │  └─ SeedMap.jsx             interactive mock map (zoom/pan/measure)
   │
   └─ pages/
      ├─ Home.jsx                hero + AI search + top matches
      ├─ Explore.jsx             full browse/filter/sort experience
      ├─ Details.jsx             full seed detail view + map + notes
      ├─ Favorites.jsx           saved seeds + collections
      └─ Submit.jsx              community seed submission form
```

**Data flow:** `SearchBar` → `analyzeSeedRequest(prompt)` (AI layer) →
returns structured criteria → `searchSeeds(criteria)` (search layer) →
returns scored/sorted seeds from `data/seeds.js` (data layer) → rendered by
`ResultsGrid` / `SeedCard`.

This three-layer separation is deliberate — each one can be replaced
independently without touching the others.

---

## 2. How to run it (₹0, tablet-friendly)

Installing Node.js directly on Android is possible but fiddly. The easiest
₹0 path from a Xiaomi Pad 6 is a browser-based IDE that runs Node for you:

**Option A — StackBlitz (recommended, zero install)**
1. Go to `stackblitz.com` in the tablet browser → "Create" → "Vite + React".
2. Delete the generated `src/` and root files, upload/paste this project's
   files (or import from GitHub, see below).
3. StackBlitz installs dependencies and runs the dev server automatically —
   you get a live preview URL immediately, editable from the touch keyboard.

**Option B — GitHub + Codespaces / CodeSandbox**
1. Create a free GitHub repo from the tablet's browser (github.com → New
   repository → "Add file" → "Upload files") and upload this folder.
2. Open the repo in `codesandbox.io` (paste the GitHub URL) or in a free
   GitHub Codespace — both install and run Vite for you in the browser.

**Option C — a laptop/desktop, if you ever have access to one**
```bash
npm install
npm run dev       # opens http://localhost:5173
npm run build     # production build into dist/
npm run preview   # preview the production build
```

All three options are free and require no local Node install on the tablet.

---

## 3. How to modify it

- **Change the look:** edit `tailwind.config.js` (colors/fonts) and the
  effect classes in `src/index.css` (`.shard-panel`, `.aurora-bg`,
  `.glass`, `.frost-text`).
- **Add/edit sample seeds:** edit `src/data/seeds.js`. Every seed follows
  the same shape — copy an existing entry and change the fields.
- **Add a category:** add an entry to `CATEGORIES` in `src/data/seeds.js`
  and tag matching seeds with its `id`.
- **Change how prompts are understood:** edit the keyword maps in
  `src/lib/aiParser.js`.
- **Change matching/scoring logic:** edit `scoreSeed()` in
  `src/lib/seedEngine.js`.

---

## 4. Connecting a real AI API later

Right now `analyzeSeedRequest()` in `src/lib/aiParser.js` is a local
keyword matcher — no network call, no key, no cost. To use a real LLM:

1. **Never call the AI API directly from the browser** — that would expose
   your key. Instead create a tiny serverless function (a free Vercel/
   Netlify function both work at ₹0) at, say, `/api/analyze`.
2. In that server function, read your key from an environment variable
   (see `.env.example` — set the real value in your hosting provider's
   dashboard, never in committed code):
   ```js
   const apiKey = process.env.MINESEEK_AI_API_KEY;
   ```
3. Have the function call your AI provider with the user's prompt and a
   system instruction asking for JSON back in this exact shape:
   ```json
   { "biomes": [], "structures": [], "terrain": [], "maxDistance": null,
     "edition": null, "aesthetic": false, "categoryTags": [] }
   ```
4. Update `analyzeSeedRequest()` to `await fetch('/api/analyze', {...})`
   instead of running the local matcher, keeping the same return shape so
   nothing else in the app has to change.

---

## 5. Connecting a real Minecraft seed-analysis engine later

`searchSeeds()` in `src/lib/seedEngine.js` currently filters/scores the
mock array in `src/data/seeds.js`. A real engine would need actual
Minecraft world-generation logic (e.g. a Java/Kotlin service using
Cubiomes or a similar seed-analysis library) to verify biomes, structures
and distances for a given seed and version.

To connect one:
1. Stand up that logic as its own backend service/API (it does not need to
   be JavaScript — Cubiomes-based tools are commonly C/Java).
2. Expose an endpoint like `POST /api/search-seeds` that accepts the same
   `criteria` object `analyzeSeedRequest` produces, and returns seed
   objects in the same shape as `src/data/seeds.js`.
3. Replace the body of `searchSeeds()` with a `fetch('/api/search-seeds', ...)`
   call to that endpoint.
4. Only mark a seed `verified: true` once this real engine has actually
   checked it for the stated Minecraft version — the UI already shows a
   "✓ Seed verified" / "⚠ Unverified" badge based on this flag, per the
   requirement to never claim version-accuracy that hasn't been checked.

---

## 6. Deploying for free

Any static host works since this builds to plain HTML/JS/CSS:

- **Vercel** (recommended): import the GitHub repo at vercel.com, framework
  preset "Vite" is auto-detected, deploy — free tier, no card required.
- **Netlify**: same flow at netlify.com — "Import from Git", build command
  `npm run build`, publish directory `dist`.
- **GitHub Pages**: run `npm run build`, push the `dist/` folder to a
  `gh-pages` branch (or use the `gh-pages` npm package).

All of the above are ₹0 for a project this size.

---

## 7. Mock data vs. real functionality — what's real right now

| Feature | Status |
|---|---|
| AI prompt understanding | **Mock** — local keyword matcher in `aiParser.js`, no network call |
| Seed database | **Mock** — 12 hand-written sample seeds in `data/seeds.js`, not generated from real Minecraft worlds |
| Seed matching/scoring | **Real logic**, but scored against mock data — the algorithm itself works, it just has nothing but sample seeds to search |
| Interactive map | **Mock renderer** — positions are computed from each seed's stored coordinates (so relative distances are consistent), but the terrain drawn underneath is decorative, not real chunk data |
| Favorites / collections / notes | **Real** — actually persisted via `localStorage` on the current device |
| Seed submission | **Mock queue** — held in memory for the session only, no backend, no accounts, no moderation yet |
| Share button | **Real** — uses the native Web Share API where available, falls back to clipboard |
| Java/Bedrock/version selectors | **Real UI**, filtering mock data — wire to a real engine per section 5 before trusting version claims |

Nothing here calls a paid API or requires paid hosting — the whole
prototype runs for ₹0 today, and each mock layer has a clearly marked spot
to plug in the real thing later.
