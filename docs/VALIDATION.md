# First-release validation

Validated November 12, 2026. These results describe the local implementation, not a public deployment.

## Verified

- Astro static build generates 11 HTML pages, including the 404 page.
- Astro/TypeScript diagnostics: zero errors and zero warnings. The feed validator library emits two deprecation hints; its current exported API works and is covered by tests.
- Four feed tests pass: RSS normalization; unsafe URLs/invalid or future dates/duplicate exclusion; malformed XML and error-page rejection; bounded response size.
- Output audit checks every page for a single H1, language, description, canonical URL, and skip-link target, plus internal links/assets, sitemap, robots file, social image, and 404 output.
- Production dependency audit reports zero known vulnerabilities at the time of the check.
- Desktop rendering reviewed in Chromium at a 1,363 CSS-pixel viewport. No horizontal overflow.
- Compact layout checked at effective 454- and 340-pixel widths using browser zoom. Home, About, Writing, Publications, Projects, both project detail pages, Ideas, Contact, and CV fit at 340 pixels without horizontal overflow.
- Mobile navigation opens, closes with Escape, restores focus to its toggle, and allows navigation.
- Publication filters show 15 papers or eight patent/application records. Search narrows results, the zero-result state appears, and clearing/resetting restores all 23 records.
- Site-origin browser error log check showed no errors. Browser-extension metadata errors were outside the site's code.
- Missing arrow font glyphs were replaced with inline SVGs. A mobile word-spacing issue was fixed.

## Limits and release steps

- These checks do not constitute a real iOS/Android-device test, full accessibility audit, or measured Core Web Vitals/Lighthouse report. Browser developer tools were unavailable in this environment; compact breakpoint checks used normal browser zoom.
- The print button is implemented and invokes `window.print()`, but the managed browser did not expose a print dialog. Final printed/PDF pagination remains unverified.
- The RSS endpoint returned an HTML unavailable page here. The saved-index fallback passed; an actual successful live RSS refresh remains to be verified in the hosting environment.
- GitHub read/clone succeeded; authenticated write access is not connected. No remote branch, PR, merge, or GitHub workflow has been created or activated.
- No Cloudflare account deployment, custom-domain connection, DNS change, live HTTPS check, or production URL validation has been performed.
- Bibliographic checks are partial as described in `CONTENT_SOURCES.md`; missing DOI links and patent-family consolidation are follow-on content work.

## Reproduce

```sh
npm ci
npm run verify
npm audit --omit=dev --audit-level=high
```

The dev command uses Astro's `--ignore-lock` option to remain a foreground process when launched by an agent-managed preview supervisor. This avoids Astro's automatic background-server behavior conflicting with the supervisor.
