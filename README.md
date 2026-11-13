# AnthonyMaiorana.com

A personal digital workshop for Anthony Maiorana's scientific work, independent writing, and evolving projects. Built with Astro and Markdown, with static output for Cloudflare Workers.

## Run locally

Use Node 24 (see `.nvmrc`).

```sh
npm ci
npm run dev
```

`npm run verify` runs Astro's type checks, feed-handling tests, the production build, and an internal-link/metadata audit. `npm run build:offline` builds from the saved article index without contacting Substack. The production output is `dist/`.

## Edit content

| Content | Location |
| --- | --- |
| Identity, navigation, contact links | `src/data/site.ts` |
| Experience and education | `src/data/experience.ts` |
| Publications and patent records | `src/data/publications.ts` |
| Saved Polymerist article index | `src/data/writing.json` |
| Project notes | `src/content/projects/*.md` |
| Main pages | `src/pages/` |
| Design tokens and layout | `src/styles/global.css` |

Project notes use frontmatter for title, description, status, category, order, and updated date. Valid statuses are `Idea`, `In development`, `Prototype`, and `Published`. Copy `docs/project-template.md` into the projects collection, replace every placeholder, and use an accurate status.

The public CV is a web page at `/cv/` with print styling and a Print / save as PDF button. It intentionally contains only public professional content. Do not upload the full federal-application source CV to `public/`.

## Article updates

The build refreshes the article index from `https://polymerist.substack.com/feed`. If Substack is unavailable or returns an error page, the build uses the saved index and emits a warning. Article links are restricted to the publication's HTTPS `/p/` URLs; feed markup is rendered as text.

The initial saved list is a curated selection verified against the publication archive. It is labeled **Selected reading**, not a live feed. A successful RSS refresh switches the label to **Recent writing**.

`.github/workflows/refresh-writing.yml` prepares a daily refresh at 13:17 UTC, plus a manual Run workflow action. It becomes active only after the workflow is pushed to the default branch and Actions is enabled. It commits only changed article data. Repository rules must allow its narrowly scoped `contents: write` permission; on protected branches, convert it to a pull-request workflow rather than weakening branch protections. Verify that a resulting commit triggers a Cloudflare deployment in the connected account. No external scheduler or deployment hook is configured in this checkout.

## Deploy to Cloudflare Workers

The site uses Workers Static Assets. `wrangler.jsonc` serves the Astro-generated `dist/` directory and explicitly uses the custom 404 page. No server adapter or Worker JavaScript entry point is needed. Wrangler is pinned in the lockfile.

1. In Cloudflare Workers & Pages, create an application and Continue with GitHub.
2. Select `ThePolymerist/Anthony-Maiorana---website-` and production branch `main`.
3. Enter these exact settings:

| Setting | Value |
| --- | --- |
| Project name | `anthony-maiorana` (matches `wrangler.jsonc`) |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Preview command | `npx wrangler preview` |
| Enable Preview builds | On |
| Root directory | Repository root; leave blank |
| Build environment variable | `NODE_VERSION=24` |

4. Deploy and inspect the generated `workers.dev` URL.
5. In the Worker's Settings > Domains & Routes, add a Custom Domain: `anthonymaiorana.com`. Allow Cloudflare to provision its DNS and certificate. Preserve unrelated mail and DNS records.
6. Verify HTTPS, main and nested pages, missing-page HTTP 404, fonts/styles, and writing links. Add `www.anthonymaiorana.com` separately if wanted and configure a redirect to the apex domain.
7. Confirm that later main-branch commits, including feed refresh commits, trigger Workers Builds.

Local deployment validation: `npx wrangler deploy --dry-run`. Local serving of the built site: `npx wrangler dev --local`. These do not publish a live site.

The owner selected Workers on November 12, 2026 after Cloudflare's dashboard identified Pages as the legacy workflow. Astro stays static; interactive backends can be added later for concrete needs. The original Pages plan is superseded.

Hosting references:

- [Workers static assets](https://developers.cloudflare.com/workers/static-assets/)
- [Pages-to-Workers configuration differences](https://developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/)

## Project records

- `docs/PROJECT_BRIEF.md`: foundational requirements.
- `docs/DESIGN_AND_ARCHITECTURE.md`: visual direction, site structure, and implementation decisions.
- `docs/CONTENT_SOURCES.md`: source provenance, conservative wording, and outstanding content checks.
- `docs/VALIDATION.md`: verified results and launch limitations.

No analytics, advertising trackers, visitor accounts, or browser-held API keys are included. Fonts are self-hosted through Fontsource; their upstream licenses ship with the font packages. Source visibility does not by itself grant a license to reuse scientific papers, newsletter content, or other third-party material.
