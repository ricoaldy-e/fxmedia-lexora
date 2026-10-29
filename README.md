# Lexora — Responsive Legal Website

A responsive homepage implementation based on a supplied Figma frontend assessment design, integrated with The Guardian Open Platform API via serverless Netlify Functions.

- **Live Site:** [https://lexora-web.netlify.app/](https://lexora-web.netlify.app/)
- **Repository:** [https://github.com/ricoaldy-e/fxmedia-lexora](https://github.com/ricoaldy-e/fxmedia-lexora)

This repository represents an assessment project implementing a mock legal website rather than an active commercial firm engagement.

## Features

- **Responsive Homepage Layout:** Complete implementation of desktop and mobile designs across Hero, Introduction, Services, 60th Anniversary, Road to 2027, Legal Support, Media, Career Support, and Footer sections.
- **Guardian News Carousel:** Dynamic news section consuming The Guardian API through a Netlify Function proxy. Renders 1 card below 768px, 2 cards at 768–1279px, and 3 cards at 1280px and above.
- **Loading & State Handling:** Responsive skeleton cards during data fetching, accessible empty and error states with a retry action, and neutral image fallbacks for missing thumbnails.
- **Accessible Autoplay & Controls:** Six-second carousel rotation that pauses on hover or background tab visibility, stops on focus or manual interaction, and includes an accessible Play/Pause toggle.
- **Modal Navigation:** Accessible navigation drawer built with native `<dialog>`, featuring body scroll locking, focus trapping, and `Escape` key dismissal.
- **Motion & Accessibility:** Smooth entrance animations triggered via `IntersectionObserver`. Full `prefers-reduced-motion` support that disables carousel autoplay, skeleton shimmer, and entrance transforms.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4
- **Backend / Serverless:** Netlify Functions (`netlify/functions/news.ts`)
- **API:** The Guardian Open Platform API
- **Tooling:** oxlint

## Getting Started

### Prerequisites

Node.js 20.19+ or 22 LTS, and `npm`.

### Installation

```bash
git clone https://github.com/ricoaldy-e/fxmedia-lexora.git
cd fxmedia-lexora
npm ci
```

### Guardian API Key Setup

1. Request a free developer key at [The Guardian Open Platform](https://open-platform.theguardian.com/access/).
2. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
3. Set your key in `.env.local`:
   ```env
   GUARDIAN_API_KEY=your_api_key_here
   ```
   Do not prefix the variable with `VITE_` or commit `.env.local`.

### Development & Build Commands

- `npm run dev:netlify` — Starts Vite alongside the local Netlify Functions emulator at `http://localhost:8888`. Use this command for full local news API functionality.
- `npm run dev` — Starts the Vite dev server alone (UI only; news API requests will not resolve without the Netlify function).
- `npm run lint` — Runs oxlint across the project.
- `npm run build` — Type-checks and builds production assets into `dist/`.

## Deployment

The application is configured for deployment on Netlify using `netlify.toml`:

1. Connect the GitHub repository to Netlify.
2. The build command (`npm run build`), publish directory (`dist`), and functions directory (`netlify/functions`) are detected automatically.
3. In Netlify Site configuration under **Environment variables**, add `GUARDIAN_API_KEY` scoped to Functions.
4. Deploy the site.

## Known Limitations

- **Simulated Destinations:** Call-to-action buttons ("Find Lawyer", "Find career", "Explore more support") and secondary navigation/footer links lack destination pages in the supplied design and are marked disabled (`aria-disabled="true"`).
- **Search:** The navigation search bar is an interactive UI demonstration rather than a connected search engine.
- **Video Source:** No video media file or streaming URL was provided for the anniversary "Play video" action; it carries an accessible description indicating media is unavailable.
- **External API Availability:** Live news content depends on The Guardian API availability and free-tier rate limits (500 requests/day).
