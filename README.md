# Sunshine Tracker

[![CI](https://github.com/yelynn1/sunshine-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/yelynn1/sunshine-tracker/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A fun, playful single-page app that tells you how long it's been since a city last saw sunshine — or celebrates the current sunny streak.

**[Live Demo](https://yelynn1.github.io/sunshine-tracker/)**

Search for any city — or tap **My Location** to use your current position — and get a cute cartoon character telling you the weather story:
- **Sunny?** A happy sun shows how long the streak has been
- **Cloudy?** A crying cloud tells you how long since the last sunshine
- **Nighttime?** A sleepy moon recaps the day's sunshine

## How It Works

Uses free, no-key-needed APIs:
- [Open-Meteo](https://open-meteo.com/) for geocoding and 7-day hourly sunshine data
- [Nominatim](https://nominatim.openstreetmap.org/) (OpenStreetMap) for reverse geocoding your current location

Walks backwards through the hours to calculate sunshine streaks and droughts.

## Getting Started

```bash
git clone https://github.com/yelynn1/sunshine-tracker.git
cd sunshine-tracker
npm install
npm run dev
```

Open http://localhost:5173

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS 3
- Zero runtime dependencies beyond React

## Features

- **"My Location" button** — one-click geolocation with reverse geocoding
- Autocomplete city search with debounce
- Search history chips for quick re-selection
- Animated background gradients (golden for sunny, purple for cloudy, deep indigo for night)
- Inline SVG cartoon characters with CSS animations
- Structured result display with duration pill, weather condition, and temperature
- Handles nighttime, tropical weather, and week-long cloudy stretches

## Deployment

Deployed to GitHub Pages via CI. Every push to `main` triggers a build and deploy.

`main` is protected — all changes require a PR with passing CI and 1 approving review.

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE)
