# Audience measurement setup

Prepared November 14, 2026. This is an activation runbook, not evidence that a Google Analytics account or Search Console property has been configured.

## Site implementation

The site is static Astro on Cloudflare Workers Static Assets. A shared layout includes optional Google Analytics and Search Console configuration. There is no Google Tag Manager container, application database, contact form, or server-side tracking dependency.

`PUBLIC_GA4_MEASUREMENT_ID` is an optional public GA4 measurement identifier. With it unset, no Google analytics loader or choice controls are rendered. If it is invalid, the build fails. When set, `public/analytics.js` runs only on HTTPS `anthonymaiorana.com`, never localhost, a preview host, or a workers.dev host. Google's script loads only after a visitor allows analytics. Declining removes the site's first-party GA cookies and reloads if Google had already loaded. The footer lets the visitor change their choice. Cloudflare's existing beacon is separately managed in the hosting account.

Set this variable in **Workers Builds → build variables**, not merely Worker runtime variables. Static Astro reads it at build time. Rebuild after changing it. The ID is public; never add API credentials or subscriber data to this repository. `.env.example` documents both optional variables.

One `gtag('config')` initializes the destination and sends one automatic page view per full-page navigation. There is no manually emitted second page view and no SPA router. Google's current documentation recommends managing tag settings in the UI; it also confirms that the existing `config` setup remains supported. Use the Admin interface for cross-domain settings and keep a single website tag installation.

## Account configuration

1. Reuse the owner's existing Google Analytics account if appropriate. Inspect it before creating duplicates. Otherwise create an account owned by the user, not by a connector vendor.
2. Proposed property: **Anthony Maiorana — Audience**. Proposed web stream: **Professional web presence**, starting URL `https://anthonymaiorana.com`. Time zone **America/New_York**, currency **USD**. One web stream can cover the related website and publication.
3. Use the same stream's measurement ID in the website build variable and in Substack **Settings → Analytics → Google Analytics Measurement ID**. Do not add a second GA tag through Cloudflare or a tag manager.
4. Set 14-month event retention, leave Google signals, user-provided data collection and advertising features off. Website code also disables advertising signals. Turn on email/query-parameter redaction in the stream settings. Do not put personal data in URLs or campaign names.
5. Start with enhanced measurement page views and scrolls. Disable automatic site-search/form tracking and unnecessary automatic outbound/file/video events. The site has explicit intent events below. A print-button click is not proof a PDF was saved.
6. Add exact domains `anthonymaiorana.com` and `polymerist.substack.com` in the Google tag's cross-domain configuration. Do not add all of `substack.com`. Test real redirects and `_gl` handling before claiming a continuous journey. Consent choices on this website do not set consent on Substack.
7. Register event-scoped custom dimensions `link_domain` and `link_path` if needed in reporting. Do not mark all click events as key events. Inspect the actual Substack signup event name/payload and its completion semantics before marking it as a subscription key event.
8. Use **session** source, medium, campaign and manual ad content for the acquisition view. Keep first-user acquisition in a separate view. `utm_content` is the distribution ID and connects sessions to the distribution register. Filtering pages by hostname is not evidence that hostname-level unique users or sessions can be added.

## Event contract

| Event | Trigger | Interpretation |
| --- | --- | --- |
| `page_view` | One GA initialization per consented full-page load | Measured page visit |
| `newsletter_click` | Link to the publication's `/subscribe` page | Subscription intent, not a new subscriber |
| `article_click` | Link to a publication `/p/` article | Reading intent, not proof of reading |
| `contact_click` | Explicit “Connect on LinkedIn” contact CTA | Contact intent, not an inquiry or connection |
| `cv_print` | Pressing Print / save as PDF | Print intent, not a saved/downloaded file |
| Substack signup event | Platform-reported completed signup, verified during activation | Candidate observed web conversion; reconcile with native Substack totals |

Click events contain only destination domain and path, not link text, email addresses or query parameters. Page location allows only the standardized campaign slug fields. Referrer query strings and fragments are removed. Leave unknown quantities blank; zero means an observed zero.

Confirmed inquiries and professional outcomes belong in a private record. Never commit names, messages, subscriber emails, raw exports or analytics data to this public repository. This website intentionally uses professional profiles rather than publishing an email address or a form.

## Search Console

Use a Domain property for `anthonymaiorana.com`, verified by adding Google's exact TXT value in Cloudflare DNS. Preserve all other DNS records. If DNS access is unavailable, a URL-prefix property can use `PUBLIC_GOOGLE_SITE_VERIFICATION` to render Google's exact token in the shared `<head>`. Build, deploy and then run Google's verification. The prepared field alone does not verify ownership.

Submit `/sitemap-index.xml`; the Astro sitemap integration and `public/robots.txt` already exist. Check a live page through URL Inspection. For the publication, use a separate URL-prefix property for `https://polymerist.substack.com/` only if Substack's available verification method works. Publication settings/features need inspection; do not assume access to Substack DNS or arbitrary HTML upload. Data Studio can read the two Search Console properties directly, avoiding GA's one-linked-Search-Console-property limitation.

## Tagged distribution links

Use a stable content ID per article/asset and a distinct distribution ID per placement. Put the distribution ID in `utm_content`. Store its content ID, topic, format, publication URL and effort minutes in the private register. Tags contain lowercase slugs and no names or email addresses of recipients.

```sh
npm run utm -- 'https://anthonymaiorana.com/writing/' linkedin social lean-lab d-20261114-01
```

| Placement | `utm_source` | `utm_medium` |
| --- | --- | --- |
| LinkedIn post | `linkedin` | `social` |
| Newsletter email | `polymerist` | `email` |
| Reddit post | `reddit` | `social` |
| Bluesky post | `bluesky` | `social` |
| Guest article | Publisher's slug | `referral` |
| Individual outreach | `direct-outreach` | `email` |

`utm_campaign` identifies an initiative, such as `lean-lab`; `utm_content` identifies the individual placement, such as `d-20261114-01`. Do not put UTMs on internal links or on website-to-publication navigation after cross-domain measurement is enabled: that can obscure the original acquisition source. The CLI replaces existing UTM fields and preserves other destination parameters and fragments. Review each result before distributing it. Creating a URL does not publish a post.

## Activation acceptance checks

- Unconfigured build: no GA loader and no choice banner.
- Preview and local hosts: no GA calls even if a measurement ID is present.
- Production, before choice and after decline: no requests to Google Analytics or Tag Manager.
- Allow: one `page_view` for the current page, with correct URL, and subsequent page loads counted once.
- Footer preferences: revoke, confirm GA cookies removed, then browse without further GA calls.
- Use a tagged external test visit and confirm session source, medium, campaign and manual ad content.
- Confirm contact and newsletter clicks each produce the intended event once, with no false inquiry/subscription event.
- Complete an authorized test subscription and inspect the platform's event, hostname and key-event behavior. Verify site → Substack cross-domain continuity in the same consenting browser; redirects, app handoffs and blockers can break it.
- Realtime/DebugView checks are followed by next-day standard reports. Record the first valid production date as the baseline start. Historical GA data cannot be recreated by installing a tag now.
- Exclude owner/testing traffic only after checking the filter in testing mode. Do not guess IP addresses.

`npm run verify` covers type checks, tests, production build and static output checks. Unit tests cover opt-in, rejection, revocation, preview exclusion, duplicate initialization, URL sanitization and UTM construction. These tests do not establish successful collection in a real GA account.

## References

- [Google account/stream structure](https://support.google.com/analytics/answer/9679158)
- [Google tag configuration](https://developers.google.com/tag-platform/gtagjs/configure)
- [Cross-domain measurement](https://support.google.com/analytics/answer/10071811)
- [Google privacy parameters](https://developers.google.com/tag-platform/security/guides/privacy)
- [Substack GA4 setup](https://support.substack.com/hc/en-us/articles/15955098199444-How-do-I-connect-Google-Analytics-4-to-my-Substack-publication)
- [Substack SEO and verification availability](https://support.substack.com/hc/en-us/articles/4407702258836-How-can-I-optimize-my-Substack-publication-for-SEO)
- [Search Console verification](https://support.google.com/webmasters/answer/9008080)
- [GA/Search Console linking limits](https://support.google.com/analytics/answer/10737381)
- [Astro environment variables](https://docs.astro.build/en/guides/environment-variables/)
