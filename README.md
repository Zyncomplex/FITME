# 4-Week Polarized Training Site (React + Vite + Tailwind)

This is a ready-to-push starter project containing a single-file React app (`src/App.jsx`) that lists 4 weeks of daily workouts with exercises, muscle groups, and pelvic-floor (sexual-health) notes.

## Features
- Mobile-friendly React UI (Tailwind classes included in markup)
- LocalStorage tracking (mark exercises done)
- Copy JSON button to copy the workout data
- Printable pages via browser print

## Quick start (locally)
```bash
git clone <this-repo>
cd polarized-training-site
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deploy options
### Vercel (recommended)
1. Connect the GitHub repo to Vercel and deploy — Vercel auto-detects Vite.

### GitHub Pages
1. In `vite.config.js` set `base: '/REPO_NAME/'` (replace `REPO_NAME` with your GitHub repo name).
2. Commit and push to GitHub.
3. Run locally: `npm run build`
4. Deploy: `npm run deploy` (this uses `gh-pages` to publish the `dist` folder).

## Notes
- Tailwind is used in class names; install Tailwind and PostCSS if you want the full utility processing.
- If you prefer a zero-config static site, deploy to Vercel or Netlify which will handle the build for you.
