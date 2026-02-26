# Contributing to Sunshine Tracker

Thanks for your interest in contributing! This is a fun little project, so keep things light and playful.

## Prerequisites

- Node.js 18+
- npm

## Getting Started

```bash
git clone https://github.com/yelynn1/sunshine-tracker.git
cd sunshine-tracker
npm install
npm run dev
```

Open http://localhost:5173 and you're good to go.

## Making Changes

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Make sure everything passes:
   ```bash
   npm run lint
   npx tsc --noEmit
   npm run build
   ```
4. Open a pull request

## Code Style

- TypeScript + React with Tailwind CSS utility classes
- No extra dependencies unless absolutely necessary
- Run `npm run lint` before submitting
- Keep it fun — this is a playful weather app, not enterprise software

## Ideas for Contributions

- New cartoon characters for different weather conditions
- Support for Fahrenheit toggle
- Share results on social media
- Accessibility improvements
- Localization / i18n
