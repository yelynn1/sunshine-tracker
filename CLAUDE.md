# Sunshine Tracker

A playful single-page website that shows how long it's been since a city last saw sunshine.

## Tech Stack

- **Vite + React 19 + TypeScript** — SPA, no routing
- **Tailwind CSS 3** — all styling via utility classes, custom animations in `tailwind.config.js`
- **Zero runtime dependencies** beyond React/ReactDOM
- **Font**: Nunito (Google Fonts, loaded via CSS @import)

## Commands

- `npm run dev` — Start dev server (Vite, http://localhost:5173)
- `npm run build` — Type-check + production build
- `npm run lint` — ESLint
- `npx tsc --noEmit` — Type-check only (use this before committing)

## Architecture

```
src/
  App.tsx                    — Root: layout, animated background gradients, state
  main.tsx                   — Entry point
  index.css                  — Tailwind directives + Nunito font
  utils/
    sunshine.ts              — Core algorithm: calculates sunshine streaks/droughts
  hooks/
    useGeocoding.ts          — Debounced city search (Open-Meteo Geocoding API)
    useWeather.ts            — Weather fetch + pipes through calculateSunshine()
  components/
    LocationSearch.tsx        — Search input with autocomplete dropdown
    SunshineResult.tsx        — Result card: cartoon + headline + duration pill + detail
    Cartoons.tsx              — SVG cartoon characters (HappySun, CryingCloud, SleepyMoon, SearchingBird)
```

## APIs (free, no keys)

- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search`
- **Weather**: `https://api.open-meteo.com/v1/forecast` with `&timezone=auto` (returns local time)

## Key Design Decisions

- `sunshine_duration > 0` is the sole indicator of sunshine (NOT weather_code — tropical places have sun even with code 2-3)
- Nighttime detection: `sunshine_duration === 0` + hour between 19:00-05:00
- Sunny streaks skip nighttime gaps (clear night doesn't break a streak)
- "Last sun" duration counts all sunshine hours on that calendar day (not just consecutive)
- `SunshineResult` returns structured fields (`headline`, `duration`, `durationLabel`, `detail`) for flexible UI rendering
- Both hooks use `AbortController` to cancel stale requests
- Debounce is 300ms via `setTimeout` + `useRef` (no lodash)

## Deployment

- **Hosted on GitHub Pages**: https://yelynn1.github.io/sunshine-tracker/
- **Vite base path**: `base: '/sunshine-tracker/'` in `vite.config.ts` (required for subpath hosting)
- **CI/CD**: `.github/workflows/ci.yml` — lint, type-check, build on all PRs; deploy to Pages on push to `main`
- **Branch protection on `main`**: requires passing CI + 1 approving review (admins can bypass)

## Conventions

- No state management library — plain `useState`
- No component library — all custom Tailwind styling
- SVG cartoons are inline React components (no image assets)
- Animations defined in `tailwind.config.js` keyframes
- All changes to `main` go through PRs with passing CI
