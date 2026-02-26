# Sunshine Tracker

[![CI](https://github.com/yelynn1/sunshine-tracker/actions/workflows/ci.yml/badge.svg)](https://github.com/yelynn1/sunshine-tracker/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A fun, playful single-page app that tells you how long it's been since a city last saw sunshine — or celebrates the current sunny streak.

**[Live Demo](https://yelynn1.github.io/sunshine-tracker/)**

Type in any city and get a cute cartoon character telling you the weather story:
- **Sunny?** A happy sun shows how long the streak has been
- **Cloudy?** A crying cloud tells you how long since the last sunshine
- **Nighttime?** A sleepy moon recaps the day's sunshine

## How It Works

Uses the free [Open-Meteo API](https://open-meteo.com/) (no API key needed) to fetch 7 days of hourly sunshine data, then walks backwards through the hours to calculate sunshine streaks and droughts.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS 3
- Zero runtime dependencies beyond React

## Features

- Autocomplete city search with debounce
- Animated background gradients (golden for sunny, purple for cloudy, deep indigo for night)
- Inline SVG cartoon characters with CSS animations
- Structured result display with duration pill, weather condition, and temperature
- Handles nighttime, tropical weather, and week-long cloudy stretches

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE)
