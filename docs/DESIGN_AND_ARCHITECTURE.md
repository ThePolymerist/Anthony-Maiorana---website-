# Design and implementation plan

## Assessment

The existing GitHub repository contains one initial commit (`27ca1b209ea90906cc463c6c3da766afbd2f6e89`) and a README. There is no application, build setup, or deployment configuration to preserve.

The previous ChatGPT-hosted site is an active, privately shared professional profile. Its saved text is an early content source, not the design or deployment target. Its full current source has not been inspected or changed. Résumé and comprehensive CV materials supply the professional content; the current project brief governs scope.

The custom domain did not return a usable website from this environment. A proxy returned HTTP 503. This does not establish the underlying DNS or Cloudflare configuration. No Cloudflare account configuration has been inspected or changed.

## Proposed visual system: an editorial workshop

Use a typographic, paper-like reading environment. A generous serif name and a compact notebook introduce the person and the ongoing work. Article rows, dated citations, restrained rules, and project stages provide structure without a dashboard-like grid.

| Element | Choice | Purpose |
| --- | --- | --- |
| Background | Warm paper `#F6F4EE` | Comfortable long-form reading |
| Main text | Deep ink `#202D29` | Strong contrast without stark black |
| Accent | Forest green `#245B43` | Links, emphasis, in-development cues |
| Secondary text | `#58655E` | Dates and supporting context |
| Rules | `#D4D7CC` | Lightweight editorial hierarchy |
| Idea status | Warm brown `#885032` | Distinguish early concepts |
| Display type | Newsreader | Personal, literary emphasis |
| Body type | DM Sans | Readability and quiet interface labels |
| Content width | Maximum 1,184px; prose about 780px | Readable desktop and mobile composition |
| Motion | Small link movement only; respect reduced motion | Minimal distraction |

Fonts are bundled and self-hosted. No stock laboratory imagery, decorative AI imagery, or generic consulting slogans are needed for this direction.

## Site architecture

| Route | Visitor purpose |
| --- | --- |
| `/` | Understand Anthony and find the writing or workshop |
| `/about/` | Capabilities, experience, education, and context |
| `/cv/` | Detailed public CV with print/PDF styling |
| `/writing/` | The Polymerist, Lean Lab entry point, article index |
| `/publications/` | Search/filter scientific papers and patent records |
| `/projects/` | Project index with explicit stages |
| `/projects/personal-website/` | Development journal for this website |
| `/projects/lean-lab-toolkit/` | Early toolkit concept, labeled Idea |
| `/ideas/` | Open questions; linked from Projects and home |
| `/contact/` | Email and professional profiles |
| `/404.html` | Useful recovery for missing pages |

The main navigation has five links plus the name/home link. Ideas belongs under the workshop rather than expanding the top navigation. The CV is available from About.

## Architecture decisions

1. **Static Astro.** Build content to HTML. Small scripts handle the mobile menu, publication filters, and CV printing. No client framework is required.
2. **Structured content.** Identity, experience, bibliography, and article data live in dedicated files. Markdown content collections generate project pages with validated stages.
3. **Resilient writing index.** Refresh RSS at build time. Validate article origins, dates, XML structure, and payload size. Preserve the last saved index on failure and make its date visible.
4. **Prepared daily updates.** A GitHub Actions workflow can update changed feed data once installed on main. Cloudflare deployment behavior must be confirmed after account connection.
5. **Portable hosting.** Cloudflare Workers serves the static `dist` directory using `wrangler.jsonc`. The owner selected Workers for the initial release; no server adapter is needed.
6. **Public content boundary.** The public CV is derived, not the original document. It excludes federal application metadata, private contact details beyond the chosen professional email, and outside advisory marketing.

## Implementation sequence

| Stage | Work | Acceptance |
| --- | --- | --- |
| Foundation | Branch from existing repository; Astro, lockfile, central layout, design tokens | Reproducible install and build |
| Content | Core pages, public CV, bibliography, project Markdown, curated article index | Source-grounded claims; accurate project stages |
| Interaction | Mobile menu, publication search/filter, print styling, feed refresh | Keyboard access and reliable fallbacks |
| Validation | Type checks, feed tests, static link/metadata audit, browser review where available | Report actual results and limits |
| Release | Push reviewed branch; connect Cloudflare Workers; add domain | Live HTTPS pages, mobile check, real feed refresh |
| Follow-on | Refine copy, fill remaining bibliographic links, add one useful experiment | Site continues to launch independently of future toolkit |

## First-release limits

The implementation is not a claim that the site is publicly deployed. GitHub write access and Cloudflare account configuration are separate outstanding release steps. Publication records without verified DOI links remain readable without invented identifiers. Patent records have not been consolidated by family.

No personal tracking, contact-form backend, CMS, AI API, user accounts, or paid service dependency has been added. Introduce these only for a concrete need.
