# AnthonyMaiorana.com

A personal digital workshop for Anthony Maiorana's scientific work, independent writing, and evolving projects. Built with Astro and Markdown, with static output for Cloudflare Pages.

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

## Deploy to Cloudflare Pages

1. Push the reviewed implementation to this GitHub repository.
2. In Cloudflare, create a **Pages** project and import `ThePolymerist/Anthony-Maiorana---website-`.
3. Use the settings below.
4. Inspect the resulting `pages.dev` deployment, then add `anthonymaiorana.com` under the project's Custom domains.
5. Add `www.anthonymaiorana.com` if wanted, and configure a redirect from www to the apex domain in Cloudflare. Preserve unrelated mail and DNS records.
6. Confirm HTTPS, both hostnames, the 404 page, feed refresh behavior, and Search Console ownership after publication.

| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Repository root |
| Node version | `24` |
| Server adapter | None; output is static |

Cloudflare currently recommends Workers for new projects, while Pages continues to accept static sites. This implementation honors the Pages target and keeps the output portable. If server features are needed later, evaluate a separate Worker/API or migrate deliberately; do not add the current Astro Cloudflare SSR adapter to this static Pages build without checking compatibility.

Hosting references:

- [Cloudflare static sites](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)
- [Cloudflare build settings](https://developers.cloudflare.com/pages/configuration/build-configuration/)
- [Astro's current Cloudflare guidance](https://docs.astro.build/en/guides/deploy/cloudflare/)

## Project records

- `docs/PROJECT_BRIEF.md`: foundational requirements.
- `docs/DESIGN_AND_ARCHITECTURE.md`: visual direction, site structure, and implementation decisions.
- `docs/CONTENT_SOURCES.md`: source provenance, conservative wording, and outstanding content checks.
- `docs/VALIDATION.md`: verified results and launch limitations.

No analytics, advertising trackers, visitor accounts, or browser-held API keys are included. Fonts are self-hosted through Fontsource; their upstream licenses ship with the font packages. Source visibility does not by itself grant a license to reuse scientific papers, newsletter content, or other third-party material.
