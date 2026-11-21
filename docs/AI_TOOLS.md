# AI Tools

Prepared November 21, 2026. The first entry is the Weekly Chemical News Agent, a portable research workflow adapted from The Polymerist's Thursday briefing.

## Location and source of truth

- `/projects/#ai-tools`: tools grouped under the Projects navigation.
- `/projects/weekly-chemical-news-agent/`: overview, sample link, setup, downloads, and full task-prompt copy control.
- `/projects/weekly-chemical-news-agent/sample/`: dated first-test sample, including source gaps and the company coverage appendix.
- `public/downloads/ai-tools/The_Polymerist_Weekly_News_Agent.md`: standalone on-demand agent instructions, version 1.1.
- `public/downloads/ai-tools/Weekly_News_Scheduled_Task_Prompt.txt`: canonical scheduled-task prompt, including self-email delivery. The project page reads these exact bytes at build time for its copy control. Edit this file rather than creating a second embedded prompt.
- `src/content/briefs/2026-11-21.md`: sample text adapted from `Polymerist_Weekly_Brief_Test_2026-11-21.md`. Internal test-preface text removed; source caveats retained.

The downloadable files were copied from the user-approved artifacts last edited November 21, 2026. The website description is adapted from `Weekly_News_Agent_Website_Copy.md`, with the first test's coverage limits made explicit.

## Product boundary

This is a downloadable prompt resource labeled Prototype. The website does not run AI research, connect to Gmail, create scheduled tasks, or send emails. Those actions occur in the visitor's own AI account with that account's tools and permissions. No API key, backend, form, or new data collection is required by this feature.

The scheduled prompt requests one full-report email from the connected Gmail account to that same account, plus the report in the task conversation. It distinguishes that request from task notifications and requires honest reporting when delivery is unavailable or fails. No visitor or owner email address is embedded in the assets.

## Adding another tool

Add a project Markdown entry with `category: "AI Tools"` and an accurate stage. The Projects page groups that category automatically; existing project pages remain intact. Set `promptFile` only for a complete `.txt` prompt under `/downloads/`; the project template then renders the accessible copy control and download link.

## Validation

Run `npm run verify`. The clipboard tests cover full Unicode payload delivery and manual selection when clipboard access is missing or denied. The static output checks validate internal routes and downloadable assets. Browser coverage, when available, should include desktop/mobile layout, the copy action, manual-copy disclosure, and the sample's wide table.

### November 21, 2026 preparation check

- `npm run verify`: passed with 13 tests, 15 generated pages, and 255 checked internal links/assets. Astro reported zero errors and warnings, plus two pre-existing deprecation hints in the feed parser.
- Rendered prompt text and its downloadable `.txt` file were compared byte-for-byte after HTML decoding and matched. Downloaded `.md` instructions matched their source. No email address is embedded in either downloadable prompt.
- Feed refresh returned HTTP 403 and used the existing saved article index; no writing-index change was included.
- Browser QA was unavailable. The managed preview command reported a URL, but the endpoint refused the connection; no supported browser-control tool was exposed. The owned preview was stopped. Desktop/mobile appearance and real-browser clipboard behavior remain unverified; clipboard success/denial/missing-API behavior is covered by unit tests.
- Prepared on a feature branch for review; this record does not claim a live deployment or successful scheduled email delivery.
