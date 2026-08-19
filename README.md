# Gabr Lab — moustafagabr.vercel.app

Academic website for **Moustafa T. Gabr, Ph.D.** — Associate Professor of Radiology and
Director of Molecular Imaging and Therapeutics Research, Columbia University Irving
Medical Center.

Next.js 16 (App Router, React 19) · TypeScript · Tailwind CSS v4 · zero runtime UI
dependencies beyond `lucide-react`.

## Running it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
npm run typecheck
npm run sync:scholar # refresh data/scholar-snapshot.json from Google Scholar
```

## Publications: how the Google Scholar link works

Google Scholar has no official public API, so `lib/scholar-source.mjs` implements a
provider chain and normalises all of them to one shape:

| Order | Provider | Needs | Notes |
|---|---|---|---|
| 1 | **SerpAPI** `google_scholar_author` | `SERPAPI_API_KEY` | Paid/free tier, reliable from any IP. Recommended in production. |
| 2 | **Direct scrape** of the public profile | nothing | Free. Works from a laptop or a GitHub Action; Google frequently blocks datacenter IPs (Vercel, AWS). |
| 3 | **Committed snapshot** `data/scholar-snapshot.json` | nothing | Always available, so the page is never empty or wrong. |

Pages that show publications declare `revalidate = 86400`, so the live lookup happens at
most once a day and every other request is served from the cached render. The same data
is exposed as JSON at **`/api/scholar`**.

The snapshot in `data/` was generated with `npm run sync:scholar` (187 records, 2,456
citations, h-index 28). Re-run it whenever you want to refresh the offline fallback —
committing the result keeps the site correct even if both live providers fail.

### Keeping the snapshot fresh automatically

`.github/workflows/scholar.yml` runs the sync weekly on a GitHub runner (whose IP Scholar
generally accepts) and commits the result, which redeploys the site.

## Editing content

Everything editable lives in `content/` — no component changes needed:

| File | What it holds |
|---|---|
| `content/site.ts` | Name, titles, affiliation, email, links, navigation, headline numbers |
| `content/research.ts` | The research areas and their target lists |
| `content/team.ts` | Lab members (`group`: `pi` / `postdoc` / `student` / `alumni`) |
| `content/funding.ts` | Grants and the training timeline |
| `content/news.ts` | News items |

## Images

Put the PI headshot at **`public/team/gabr.jpg`** (portrait crop, ≥ 800 px wide). Until it
exists, `components/portrait.tsx` shows the initials rather than a broken image. Member
photos go in `public/team/` and are referenced from `content/team.ts` via `photo`.

## Design notes

- Tokens are declared once in `app/globals.css` (`@theme static`) and consumed as
  `var(--color-*)`; the dark palette is the same token names redefined under `.dark`.
- The site is light by default; the system preference is deliberately ignored and dark
  only applies to a reader who picked it with the toggle. The choice is applied before
  first paint by the inline script in `app/layout.tsx`, so there is no flash.
- Scroll-in transitions are CSS + IntersectionObserver, scoped to `html.js`. Without
  JavaScript — and for crawlers — every element renders visible.
- Typography: Newsreader (display), Inter (UI), IBM Plex Mono (labels), self-hosted via
  `next/font`.

## Deploying to Vercel

1. Push the repository to GitHub and import it in Vercel.
2. Environment variables (Project → Settings → Environment Variables):
   - `NEXT_PUBLIC_SITE_URL=https://moustafagabr.vercel.app`
   - `NEXT_PUBLIC_SCHOLAR_ID=hw7IDDoAAAAJ`
   - `SERPAPI_API_KEY=…` *(optional but recommended — without it Vercel will usually fall
     back to the snapshot, since Scholar blocks datacenter IPs)*
3. Deploy. The publication pages revalidate every 24 h.

## Verify before launch

Everything on the site was assembled from public sources (Columbia Radiology news, the
Weill Cornell lab page and directory, and the Google Scholar profile). Two things should
be confirmed with Dr. Gabr before the site goes public:

- **Lab roster** (`content/team.ts`) — the postdoc list is the one published by the Weill
  Cornell lab page; who moved to Columbia in July 2026 needs confirming.
- **Contact address and email** (`content/site.ts`) — the email is still the Cornell one
  (`mog4005@med.cornell.edu`) and the street address is a placeholder for the CUIMC
  campus.
