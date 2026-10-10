# Intermaptic

An interactive holographic 3D Earth that compares the **United States** and **Canada** — geography, culture, government and economy — through twenty-three anchored landmarks, each with its own procedural 3D model.

Built with Vite + React + react-three-fiber. The frontend is a static site that runs on **GitHub Pages**, and the content it reads comes from a small read-only API hosted on **Render**. The frontend also carries its own copy of the atlas, so if the API is unset, slow or down the site still runs — it simply falls back to the bundled copy and the HUD says which one it used.

![Intermaptic globe](docs/screenshot-globe.png)

---

## What it does

- **A 3D globe you can spin, zoom and tap.** Every landmark is a hand-built procedural 3D model standing on the surface of a dark holographic planet — the models are deliberately the brightest thing in frame.
- **Twenty-three beacons, twelve comparisons.** Every stop is matched with a counterpart across the border by theme — capitals, finance megacities, Pacific tech corridors, interior economies, cultural hubs, natural wonders, heritage quarters, carved rock, space and the northern sky, life at the top of the map, and managed against wild water — plus the shared border itself.
- **Four readings per stop.** Geography, culture, government and economy, each written for that specific place — including how its government actually works locally, not just nationally.
- **Head-to-head notes.** Every stop carries comparison bullets naming its counterpart across the border, and selecting a stop arcs a great-circle link to the city it is being compared against.
- **National readout.** A country-level table — population, area, GDP, government, head of state, official languages, health system — plus the measurements the two countries share.
- **The border, drawn.** The 49th parallel, the Great Lakes corridor, the eastern highlands and the Alaska–Yukon line rendered as a glowing dashed ribbon.
- **Live or bundled, and it tells you which.** The atlas can be served by the API in `api/` (see [Deploying](#deploying)). The status strip reads `DATA: LIVE API` when the API answered, `DATA: SYNCING` while it is being asked and `DATA: LOCAL` when the app is using its own bundled copy — so there is never any doubt about where the text on screen came from.

### The twenty-three stops

| Pair | United States | Canada |
| --- | --- | --- |
| Capitals & Federal Power | Washington, D.C. — US Capitol | Ottawa — Parliament Peace Tower |
| Finance Megacities | New York City — Statue of Liberty | Toronto — CN Tower |
| Pacific Tech Corridors | San Francisco Bay Area — Golden Gate Bridge | Vancouver — Canada Place |
| Interior Economic Engines | Chicago — Willis Tower | Calgary — Calgary Tower |
| Cultural Hubs | Los Angeles — Capitol Records Tower | Montreal — Notre-Dame Basilica |
| Natural Wonders | Grand Canyon | Banff & the Canadian Rockies |
| Heritage & Old Quarters | New Orleans — St. Louis Cathedral | Quebec City — Château Frontenac |
| The Shared Border | Niagara Falls (both sides) | Niagara Falls (both sides) |
| Rocks From Deep Time | Mount Rushmore | Gros Morne |
| Rockets & the Northern Sky | Kennedy Space Center | Churchill |
| Life at the Top | Denali | Iqaluit |
| Managed Water, Wild Water | Hoover Dam | Bay of Fundy |

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:5173
```

```bash
npm run build        # production bundle in dist/
npm run preview      # serve the built bundle

npm run check        # atlas data + model registry integrity
npm run check:reading # every reader-facing string is plain and short
npm run check:api    # every API route, called directly
npm run check:all    # all three
```

To run the backend locally, in a second terminal:

```bash
npm start            # the API on http://localhost:3000 (the same server Render runs)
```

Then build or start the frontend against it:

```bash
VITE_API_BASE=http://localhost:3000 npm run dev
```

Requires Node 18 or newer.

---

## Deploying

The frontend and the backend deploy separately, from this one repository.

| | Where | What it is |
| --- | --- | --- |
| Frontend | **GitHub Pages** | the static Vite build — the globe, the HUD and the readings |
| Backend | **Render** | the read-only JSON API in `api/`, served by `server/index.mjs` |

The same five handlers run on either backend host, so there is nothing to change between them:

| Host | How it runs the API |
| --- | --- |
| **Render** | `npm start` runs `server/index.mjs`, a Node web service that mounts the handlers |
| **Vercel** | each file in `api/` is served as a serverless function; `vercel.json` is committed |

The frontend talks to the backend over HTTP, so it needs to be told where the backend is at **build time** (`VITE_API_BASE`). The backend needs to be told which origins may call it (`ALLOWED_ORIGINS`). Both are optional — see [Configuration](#configuration).

### 1. Backend on Render

`render.yaml` is a Render blueprint, so the fastest route is **New +** → **Blueprint** → pick this repository. Render reads the blueprint and creates the service for you.

To create it by hand instead, **New +** → **Web Service** → pick this repository, then:

| Field | Value |
| --- | --- |
| Runtime | Node |
| Build command | `npm ci` |
| Start command | `node server/index.mjs` |
| Health check path | `/api/health` |
| Instance type | Free (or Starter to avoid cold starts) |

Either way, Render sets `PORT` itself and the server reads it. Once it is live, the service URL — something like `https://intermaptic-api.onrender.com` — is what the frontend needs as `API_BASE`.

The routes are:

| Route | Returns |
| --- | --- |
| `GET /api/atlas` | the whole atlas — every stop, every pair, the national comparison, and the counts |
| `GET /api/stops` | the stop list, with `?nation=us\|ca\|shared` and `?kind=` filters |
| `GET /api/stops/:id` | one stop, its counterpart and its pair |
| `GET /api/search?q=` | ranked matches across every reader-facing string |
| `GET /api/health` | `200` when the data is valid, `503` when it is not |

All of it is `GET`-only public data. A `POST` gets a `405`, and an origin outside `ALLOWED_ORIGINS` (when set) gets no CORS header. `GET /` lists the routes, so a bare visit explains itself.

**About the free instance type:** Render sleeps an idle free service, and waking it takes roughly 30–60 seconds — far longer than a page load will wait. Nothing breaks when that happens: the frontend renders its bundled atlas immediately and the HUD reads `DATA: LOCAL`, then quietly re-asks about 25 seconds later and switches itself to `DATA: LIVE API` once the instance is awake. If you want a live API from the very first paint, use a paid instance type or point the frontend at Vercel instead.

### Backend on Vercel instead

Import the repository into Vercel and nothing needs configuring — `vercel.json` is committed and every file in `api/` becomes a function.

```bash
npx vercel          # preview deployment
npx vercel --prod   # production deployment
```

### 2. Frontend on GitHub Pages

`.github/workflows/deploy.yml` builds and publishes the site on every push to `main`.

1. Push the repository to GitHub.
2. **Settings → Pages → Build and deployment → Source: GitHub Actions.**
3. **Settings → Secrets and variables → Actions → Variables → New variable:** `API_BASE` = your Render URL (for example `https://intermaptic-api.onrender.com`), with no trailing slash.
4. Push to `main` and the workflow takes it from there.

Skip step 3 and everything still deploys — the frontend just renders its bundled atlas and the HUD reads `DATA: LOCAL`.

GitHub Pages serves the site from `/<repo-name>/`, so the workflow sets `VITE_BASE` to that sub-path. Vite writes the base into `import.meta.env.BASE_URL`, which is what the earth textures are loaded through in `src/scene/Earth.jsx`. To build a sub-path bundle locally:

```bash
VITE_BASE=/intermaptic/ npm run build
```

### Configuration

Copy `.env.example` to `.env` for local work. The two variables that matter here:

| Variable | Used by | Meaning |
| --- | --- | --- |
| `VITE_API_BASE` | the frontend, at build time | where the API is, for example `https://intermaptic-api.onrender.com`. `same-origin` calls `/api` on whichever host serves the page |
| `ALLOWED_ORIGINS` | the API, at runtime | comma-separated origin allow-list, for example `https://yourname.github.io`. Unset means "any origin", which is the default because this is public read-only data |

### Optional: one origin for both halves

`server/index.mjs` serves the API only — the frontend is the static build on GitHub Pages. If you later put the API behind the same domain as the site, set `VITE_API_BASE=same-origin` and the page will call `/api` on its own origin instead of an absolute URL. That is also the setting to use if you ever host the two together on one host.

---

## Architecture

```
index.html                 app shell + font links + web app manifest
gallery.html               dev-only model gallery (not in the production build)
public/manifest.webmanifest  lets an iPad save the atlas to its home screen
render.yaml                Render blueprint for the API service
vercel.json                Vercel config, if you prefer that backend host
.env.example               documented environment variables
.github/workflows/         GitHub Pages deploy for the frontend
public/textures/           dark earth map and land mask used by the globe shader

server/                    the Node web service Render runs
  index.mjs                entry point: reads PORT, listens, closes on SIGTERM
  app.mjs                  the router, shared by Render and local development

api/                       the same handlers, also deployable as Vercel functions
  atlas.js                 GET /api/atlas
  stops/index.js           GET /api/stops
  stops/[id].js            GET /api/stops/:id
  search.js                GET /api/search?q=
  health.js                GET /api/health
  _lib/http.js             CORS, JSON responses, the read-only route wrapper
  _lib/atlas.js            shapes the data for the wire and measures reading level

scripts/
  check-atlas.mjs          data + model-registry integrity check
  check-reading-level.mjs  the 6th grade rule, enforced
  check-api.mjs            calls every API handler directly

src/
  main.jsx  App.jsx        entry + shell (intro, overlays, Escape handling)
  state/AtlasContext.jsx   all shared state: selection, hover, filters, layers, API load
  lib/theme.js             design tokens, nation colours, model tuning
  lib/geo.js               lat/lng -> Vector3, surface orientation, great circles
  lib/api.js               the API client, with the bundled fallback
  lib/device.js            performance tier for iPads and other touch devices
  data/
    locations.js           aggregator: STOPS, PAIRS, national comparison, validation
    us.js  ca.js           the eleven American and eleven Canadian stops
    us-extra.js ca-extra.js  the four landmarks added to each country later
    shared.js              the shared-border stop + the stop schema reference
    border.js              boundary waypoints and border facts
  models/
    index.js               model registry + the MODEL AUTHORING CONTRACT
    us/ ca/ shared/        twenty-three procedural landmark models
  scene/
    Scene.jsx              the R3F canvas and its lighting
    Earth.jsx              holographic globe shader, atmosphere, orbit rings
    Starfield.jsx          nebula shell and three star layers
    Landmarks.jsx          places and scales the models on the sphere
    Markers.jsx            beacon rings, pin stems and decluttered labels
    BorderRibbon.jsx       the boundary ribbon
    CompareLink.jsx        the arc drawn between a stop and its counterpart
    CameraRig.jsx          orbit controls + the scripted fly-to
  ui/                      Hud, InfoPanel, ComparePanel, AtlasPanel, Intro
  styles/global.css        the whole bridge-console design system
  dev/Gallery.jsx          the model gallery
```

### How a landmark gets onto the globe

Models are authored in their own unit space: base at local `y = 0`, `+Y` up, about `1.0` unit tall. `src/lib/geo.js` converts a stop's latitude and longitude into a position on the sphere, and `surfaceQuaternion` rotates local `+Y` onto the surface normal, so a model that stands up in isolation also stands up on the planet. Everything else is scale.

### Decluttering a crowded hemisphere

All twenty-three landmarks sit inside one continent — Washington and New York are a few hundred kilometres apart, which on a globe of this radius is barely a model's own width. Left alone the field reads as a pile. Three mechanisms in `src/scene/` keep it legible:

- **Labels fade.** Every name plate is projected to screen space once per frame, sorted (focused and hovered first, then nearest the camera) and greedily given space, and anything that would collide is dropped. In practice only eight to ten of the twenty-three names survive at full-globe range. Note that drei renders `<Html>` children into a separate React root, so R3F hooks are not available inside a label — the declutter loop therefore lives in the Canvas tree and reaches each DOM label through a ref.
- **Models shrink when you are far away.** `Landmarks.jsx` eases each model between `farScale` at full-globe range and full size as the camera comes in, using the constants in `MODEL_TUNING`. The wide view shows small, separate monuments; flying to a stop brings it up to full detail.
- **The far side is not drawn.** A model behind the horizon is masked by the globe anyway, so it is skipped rather than rendered — which is also the cheapest frames you can give an iPad.

---

## Extending it

### Adding a stop

1. Add an entry to `src/data/us.js`, `ca.js`, `us-extra.js`, `ca-extra.js` or `shared.js`. The exact schema, with a worked example, is documented at the top of `src/data/shared.js`: `id`, `name`, `country`, `kind`, `lat`, `lng`, `model`, `tagline`, `pair`, three `facts`, the four `sections`, and two or more `comparison` bullets.
2. Point `model` at a key in `src/models/index.js`, and add the matching React component.
3. Run `node scripts/check-atlas.mjs`. It fails loudly on a missing section, a bad coordinate, a model id that is not registered, or a registered model that no stop uses.

### Reading level

**Everything a reader sees about the two countries is written for a 6th grade reading level** (roughly age 11–12). That is the taglines, the quick facts, the four `sections` on every stop, the `comparison` bullets, the pair notes in `src/data/locations.js`, and the country-level rows in `NATIONAL_COMPARISON`. The rules are:

- no sentence longer than **15 words**;
- **two sentences per section** — a stop is a glance, not an article;
- everyday words, with no jargon left unexplained;
- no semicolons and no em dashes in reader-facing text.

It is enforced, not just intended:

```bash
npm run check:reading
```

That script walks every string in the data files, measures the sentences, and reports the average, the longest sentence and any offender by name. It currently reports 386 strings, 655 sentences, an average of 8.5 words per sentence and a longest sentence of exactly 15 words. It fails a section that runs to three sentences. `npm run check:all` runs it together with the atlas and API checks, and the GitHub Pages workflow runs all three, so a hard-to-read sentence cannot reach the deployed site.

### Adding a landmark model

Read the **MODEL AUTHORING CONTRACT** at the top of `src/models/index.js`. In short: one default-exported component taking `{ tint, hovered }`, returning one `<group>`, base at `y = 0`, roughly `1.0` unit tall, procedural three.js primitives only — no `.glb` files, no loaders, no textures, no lights.

Then inspect it visually in the gallery:

```bash
npm run dev
# http://localhost:5173/gallery.html          all twenty-three models in a grid
# http://localhost:5173/gallery.html?elev=38  raised camera, to judge flat features
# http://localhost:5173/gallery.html?only=cn-tower   one model, large and centred
```

> When tuning a model, remember that the globe hides its far side: a landmark is most often seen from **directly above**, so roofs and top-down patterns matter as much as the silhouette (this is why the Grand Canyon's gorge and the Willis Tower's stepped roof plan are built the way they are).

---

## Accessibility and performance

- **Mouse, touch and keyboard.** Beacons respond to pointer and touch. `Escape` closes the overlay stack, then clears the current selection. Buttons are real `<button>` elements with focus-visible styling.
- **Reduced motion.** `prefers-reduced-motion: reduce` collapses all animation and transitions.
- **iPad and touch.** Controls get a 44px minimum touch target, hover-only feedback is replaced by tap feedback (so nothing stays lit up after a tap), safe-area insets are respected in landscape, and the page can be saved to the home screen and launched full screen. Zoom is deliberately left enabled. `src/lib/device.js` picks a performance tier and caps the render resolution, thins the starfield and reduces the globe's segment count on tablets — invisible on a screen that size, and the difference between smooth and stuttering.
- **Mobile.** Below 900px the rail becomes a horizontal strip and the reading panel becomes a bottom sheet; the fly-to camera offsets its target so the focused landmark lands clear of the sheet instead of behind it.
- **Deterministic geometry.** No `Math.random()` anywhere in a model or the starfield, so the scene is byte-identical on every load.
- **Hint for large screenshots:** editing `MODEL_TUNING.scale` in `src/lib/theme.js` resizes every landmark at once.

---

## Assets and credits

- `public/textures/earth-dark.jpg` and `earth-topology.png` are the public earth imagery shipped with the [three-globe](https://github.com/vasturiano/three-globe) project, derived from NASA imagery. They are committed locally, so the globe never requests imagery at runtime. The topology map is used as a land mask: a gradient across it paints the glowing coastlines.
- Fonts — Orbitron, Rajdhani and Share Tech Mono — are loaded from Google Fonts in `index.html`, with monospace and sans-serif fallbacks in `src/styles/global.css`.
- All twenty-three landmark models are original procedural geometry written for this project.

## Known limitations

- The boundary ribbon and the stop coordinates are simplified representations chosen to read correctly at globe scale; they are not survey-grade.
- Landmark models are stylised, recognisable silhouettes rather than surveyed reproductions.
- The national comparison figures are rounded 2024 estimates (IMF, World Bank, national statistics offices) and are labelled as approximate in the UI.
- The 6th grade rules are measured on sentence length and a word list, which is a good approximation of readability rather than a substitute for a teacher's judgement.
- The API is read-only public data with no accounts or writes, and no rate limiting of its own beyond the host's edge caching.
- The free Render instance sleeps when idle, so the first visit after a quiet spell shows the bundled atlas for about half a minute before the live one takes over.
