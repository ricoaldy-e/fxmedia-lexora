# fxmedia-lexora
FXMedia frontend intern test - responsive Lexora homepage.

## Local development

Use Node.js 22 LTS or newer, then run `npm ci`. Local validation also passed on
20.19, but two Netlify CLI dependencies declare Node 22+ and produce engine warnings.
Copy `.env.example` to `.env.local` and set `GUARDIAN_API_KEY` using a
[Guardian Developer key](https://open-platform.theguardian.com/access/).
Never add a `VITE_` prefix or commit the key.

Run `npm run dev:netlify` and open http://localhost:8888. This loads the local
environment and runs Vite together with the official Netlify Functions emulator.
TypeScript is pinned to 5.9.3 because Netlify's dependency scanner requires its
JavaScript compiler API, which the previous native TypeScript 7 package lacks.
`npm run dev` runs the existing UI-only Vite server; it does not serve the news API.
Run `npm run lint` and `npm run build` for validation.

## News integration and deployment

The browser calls `/.netlify/functions/news`. One small function uses native
fetch and a server-only key to request 30 recent Guardian candidates, filter real
articles, and return up to 12 cards with the required metadata. Missing excerpts
are backfilled from standfirst or excluded; unavailable images use a neutral
fallback. HTML is stripped from excerpts, and React renders text without HTML
injection. The official Guardian attribution logo links to the source.

Netlify's response cache headers request a 15-minute durable CDN cache and a
5-minute browser cache. These reduce upstream calls without a custom cache;
local emulation does not prove production cache behavior. The frontend also
deduplicates overlapping requests. The public endpoint still consumes the
Guardian quota and is not an authenticated service.

Deploy using `netlify.toml` (`npm run build`, publish `dist`). Set
`GUARDIAN_API_KEY` in Netlify's environment settings with **Functions** scope;
do not place its value in the repository or build output. Redeploy after setting
or changing it. Netlify deployment, production caching, and usage permissions
must be checked before publishing; local validation alone does not establish them.

The carousel shows 1 card below 768px, 2 at 768–1279px and 3 at 1280px and above,
as required by the assessment, rather than the partial-card Figma previews.
Other unfinished homepage sections and existing placeholder destinations remain
outside this phase. No autoplay or entrance animations are included.
