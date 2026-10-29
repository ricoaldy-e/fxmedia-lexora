# Lexora — Responsive Legal Website

A responsive, accessible frontend implementation of the Lexora legal website design based on the supplied Figma specification, featuring serverless integration with The Guardian Open Platform API.

- **Live Production URL:** [https://lexora-web.netlify.app/](https://lexora-web.netlify.app/)
- **GitHub Repository:** [https://github.com/ricoaldy-e/fxmedia-lexora](https://github.com/ricoaldy-e/fxmedia-lexora)

> **Note on Project Scope:** This project was developed as a frontend engineering assessment based on a provided Figma test case. It is not an official commercial website for an active legal practice.

---

## Tech Stack

- **Framework:** React 19 (`react`, `react-dom`)
- **Language:** TypeScript 5.9.3 (pinned for Netlify Functions compiler API compatibility)
- **Bundler & Tooling:** Vite 8.3, oxlint (linter)
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`), custom CSS modules for section layout and torn-paper edge masking
- **Backend / Serverless:** Netlify Functions (`netlify/functions/news.ts`)
- **External API:** The Guardian Open Platform API (`/search` endpoint)
- **Hosting & CI/CD:** Netlify

---

## Features Implemented

- **Pixel-Accurate Responsive Layout:** Faithful recreation of desktop (1440px) and mobile (402px) Figma frames, supporting fluid viewports from 320px up to widescreen monitors.
- **Accessible Modal Navigation:** Full-screen mobile/desktop navigation palette built with HTML `<dialog>`, implementing body scroll lock, focus restoration, backdrop blur, and `Escape` key dismissal.
- **Interactive Search Affordance:** Navigation search form with clear action, keyboard escape handling, and simulated unavailable state feedback.
- **Hero & Brand Composition:** Layered Marina Bay cityscape, color-dodge Lady Justice statue, burgundy ribbon artwork, and brand typography.
- **Statutory Services Grid:** 4-column desktop / 2×2 mobile layout for statutory services with interactive hover reveals and high-contrast gold indicators.
- **60th Anniversary Celebration:** Commemorative section with monochrome delegation photography, ribbon typography, play video trigger, and torn paper edge mask transitions.
- **Road to 2027 Timeline:** Multi-column anniversary roadmap highlighting foundational milestones.
- **Legal Support Scheme Directory:** Interactive category listings with responsive SVG edge masks.
- **Career Support Section:** Promotional banner featuring mobile app mockup and certification badges.
- **Site Footer:** Brand mark, secondary links, copyright statement, and design-matching metadata.
- **Lightweight Brand Favicon:** Optimized 48×48 PNG favicon (3.6 KB) based on the Lexora emblem, replacing the heavy source raster.
- **Open Graph & Social Sharing:** 1200×630 custom social sharing preview image (`/assets/og-image.png`) with standard `og:*` and `twitter:*` tags.

---

## Assessment Bonus Features

1. **Responsive Guardian News Carousel:**
   - 1 card per view on mobile (`<768px`)
   - 2 cards per view on tablet / compact desktop (`768px–1279px`)
   - 3 cards per view on wide desktop (`≥1280px`)
   - Native CSS scroll snap with precise programmatic scrolling and alignment resize observers.
2. **Accessible Autoplay & Manual Controls:**
   - Autoplays one card forward every 6 seconds.
   - Automatically pauses on mouse hover, pointer interaction, window blur, or document visibility loss.
   - Permanently halts automatic rotation upon keyboard focus or manual control interaction.
   - Accessible Play/Pause toggle with dynamic `aria-label` and `role="group"` controls.
3. **Skeleton Loading States:**
   - Responsive shimmer placeholder cards rendered while fetching news articles, matching the exact card geometry of each active breakpoint.
4. **Resilient Error & Fallback Handling:**
   - Server-side error sanitization (never leaking upstream API keys).
   - Client-side error state with an accessible "Try again" retry mechanism.
   - Neutral image fallback when Guardian thumbnails are unavailable or fail to load.
   - Text fallbacks for missing excerpt fields extracted from standfirsts with full HTML tag stripping.
5. **Entrance Animations:**
   - Smooth 600ms fade and 12px rise triggered via `IntersectionObserver` when sections enter the viewport.
   - Heading-only transforms on the news section to ensure carousel scroll measurements remain exact.
6. **Accessibility & Reduced Motion:**
   - Strict adherence to `prefers-reduced-motion: reduce`: instantly disables autoplay, deactivates skeleton shimmer animations, removes entrance transforms, and sets scroll transitions to immediate.
   - Semantic ARIA labels, live regions (`aria-live="polite"`), and hidden descriptive text for screen readers.

---

## Responsive Breakpoints

| Breakpoint Range | Target Layout | News Carousel Display |
| :--- | :--- | :--- |
| **< 768px** | Mobile layout (stacked columns, compressed typography, drawer nav) | 1 card visible |
| **768px – 1023px** | Tablet layout (2-column grids, adapted margins) | 2 cards visible |
| **1024px – 1279px** | Compact desktop (4-column services, desktop header, drawer nav) | 2 cards visible |
| **≥ 1280px** | Standard desktop (full width typography, expanded copy) | 3 cards visible |
| **1440px** | Reference desktop scale (max layout width with fluid padding) | 3 cards visible |

---

## Guardian API Integration & Configuration

The application proxies news requests through a serverless Netlify function (`/.netlify/functions/news`) to safeguard API credentials and normalize payload structures.

### Obtaining an API Key

1. Register for a free developer account at [The Guardian Open Platform](https://open-platform.theguardian.com/access/).
2. Your API key will be emailed to you immediately.

### Local Configuration

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and insert your developer key:
   ```env
   GUARDIAN_API_KEY=your-actual-api-key-here
   ```
3. Never prefix this key with `VITE_` and never commit `.env.local` to version control.

---

## Getting Started

### Prerequisites

- **Node.js:** v20.19.0 LTS or v22.x LTS
- **Package Manager:** `npm` (included with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/ricoaldy-e/fxmedia-lexora.git
cd fxmedia-lexora

# Install dependencies cleanly
npm ci
```

### Development

```bash
# Run full application with Netlify Functions emulator (Recommended)
npm run dev:netlify

# The local site will be available at:
# http://localhost:8888
```

> **Note on `npm run dev`:** Running `npm run dev` starts the standard Vite development server on port 5173. Because the news carousel relies on the Netlify serverless function, always use `npm run dev:netlify` to test full API integration locally.

### Linting & Building

```bash
# Run oxlint across all source files
npm run lint

# Compile TypeScript and bundle for production
npm run build

# Preview the local production build
npm run preview
```

---

## Netlify Deployment

The project is pre-configured for automated continuous deployment via [`netlify.toml`](./netlify.toml):

```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"
```

### Deployment Instructions

1. Push your repository to GitHub.
2. In the Netlify dashboard, create a **New site from Git** and link your repository.
3. Build settings will be auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
4. Under **Site configuration > Environment variables**, add:
   - **Key:** `GUARDIAN_API_KEY`
   - **Value:** `<your-guardian-api-key>`
   - **Scope:** `Functions` (or `All`)
5. Trigger a deployment. Netlify will build the client assets and deploy the news proxy function.

---

## Known Limitations

- **Simulated Navigation Destinations:** Certain call-to-action buttons ("Find Lawyer", "Find career", "Explore more support", and footer links) have no destination pages provided in the Figma design. They are preserved with semantic disabled attributes (`aria-disabled="true"`, `title="Destination unavailable"`) to communicate their non-active status without broken hyperlinks.
- **Search Engine:** The navigation search bar provides interactive UI and unavailable status feedback, but does not index or query site content.
- **Anniversary Video:** No video media file or video streaming URL was included in the design assets for the "Play video" control; the button is preserved with an accessible label noting unavailable media.
- **Timeline Milestones:** Only content for year 2025 was provided in the assessment materials. Years 2026 and 2027 are rendered as inactive visual roadmap markers.
- **Upstream Guardian Quota:** Live news cards rely on The Guardian Open Platform free tier quota (500 calls/day, 1 call/sec). High concurrent traffic or rate limits may temporarily surface the component's built-in retry UI.
