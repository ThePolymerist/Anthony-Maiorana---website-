# Content sources and review notes

Prepared November 12, 2026.

## Source hierarchy

1. Current owner-supplied foundational brief: controls scope, identity, project stages, and public boundaries.
2. Owner's comprehensive CV and original résumé: professional experience, education, papers, and patent records.
3. Previous website text: secondary source for experience wording and introduction; an early snapshot includes advisory content now excluded.
4. Publisher/Crossref records and The Polymerist archive: bibliographic checks and article links.

Private source documents are not copied into this repository. Their internal application metadata and unrelated personal information are excluded.

## Conservative content decisions

- Owner clarification, November 17, 2026: GCP identified opportunities were $6 million per year; $1 million per year was executed through the Grace Select redesign. The $1 million is a subset of the $6 million, not an additional amount. Never describe the entire opportunity portfolio as realized savings.
- Keep current FDA work at a general professional level. Do not include internal programs, unpublished policy schedules, case-specific review information, internal tools, or confidential review detail.
- Exclude outside advisory relationships and all consulting/service offers, including from the public CV.
- Do not publish a phone number, home address, supervisor contacts, federal-application supplement, vaccination data, or academic course-hour inventory.
- Do not state that the future Lean Lab tools exist. The website itself is labeled In development.
- Treat the previous site's saved content as an early snapshot. Its latest hosted source was not downloaded or edited.

## Bibliography

The comprehensive CV contains 15 paper records and eight patent/application records. Titles, authors, journal, year, volume, and page information were used from that source. Twelve DOI links were present there; ten returned usable Crossref metadata during this session, and two requests returned rate limits. Crossref metadata for the 2009 conservation article uses a short title; the CV provides the full title and subtitle.

Three papers currently have no DOI in the site data. Their titles and citations are shown without fabricated links. The two rate-limited DOI checks and the remaining DOI/title matching are follow-up verification items. The record's presence is grounded in the source CV; this is not a claim of exhaustive independent bibliographic verification.

Patent records are listed by identifier with inventor names. Granted-patent and international-publication links use the identifiers from the CV. Application records without verified publication identifiers remain unlinked. Family consolidation, official title matching, current legal status, and confirmation of live patent destinations remain follow-up work. The website does not claim eight distinct inventions.

## Article index

The initial five-article list was checked against [The Polymerist archive](https://polymerist.substack.com/archive). Exact destinations:

- [Start Here](https://polymerist.substack.com/p/start-here-the-chemistry-behind-what)
- [A World Beyond Crude](https://polymerist.substack.com/p/a-world-beyond-crude) — identified as a guest contribution in the description.
- [In Search of: A Unicorn](https://polymerist.substack.com/p/in-search-of-a-unicorn)
- [The Purpose of The Polymerist](https://polymerist.substack.com/p/the-purpose-of-the-polymerist)
- [The Lean Lab](https://polymerist.substack.com/p/the-lean-lab)

The direct RSS request in this environment returned an HTML unavailable page. The build correctly preserved the saved list. The site labels this initial list Selected reading. A successful production RSS refresh remains to be verified after hosting access is configured.

## Layout reference

[Brendan O'Leary's site](https://boleary.com) was read as an example of combining experience, publications, and software in a personal site. Its design and wording were not copied.

## Professional experience expansion — November 17, 2026

The owner reviewed the proposed copy and confirmed these public-facing facts directly:

- GCP: $6 million in identified annual cost-reduction opportunities, of which $1 million in annual savings was executed.
- Hexion: Resonance polyols were commercially launched before the owner left. No subsequent revenue, adoption, or growth is claimed.
- Worthen: commercially launched a water-based polyurethane adhesive combining performance benefits of two-part systems with the shelf life and flexibility of a one-part system. No unprovided strength, durability, emissions, or other performance metrics are inferred.
- FDA: 50+ consultative reviews in CDRH, presented separately from 100+ submissions as lead reviewer. No aggregate total is inferred. Training counts are excluded at the owner’s direction.

Expanded role details are grounded in the owner’s November 15 professional profile and original MedTech résumé, read during drafting, together with the November 17 corrections above. The newer profile governs discrepancies. The under-one-year adhesive development timeline, standards/certification work, quality-control lab support, manufacturing and field trials, and sensor-development details come from these materials.

The homepage now foregrounds selected professional outcomes, with links into the detailed experience section. About and the public CV continue to share `src/data/experience.ts`. The temporary FDA team-lead detail is a separate entry within the existing FDA employment period. Public copy excludes named review cases, internal systems, confidential training counts, and outside advisory marketing.

## Speaking and conference records — November 20, 2026

Added a dedicated `/speaking/` page, main navigation entry, homepage recording feature immediately after professional experience, publications cross-link, and a shared CV listing. Central records live in `src/data/speaking.ts`.

- FDA town hall: owner supplied https://youtu.be/9bbCbeSxWaU. The official FDA event page links that exact video, slides (media/193939), and transcript (media/193938). The transcript confirms July 22, 2026, co-presentation with Andrea Fiala, practical examples, and industry Q&A. Only public material is described.
- Diabetes Technology Meeting 2024: retained the title/year already present in the public CV, derived from the owner's source materials. No unverified exact date, recording, or program URL was added.
- CPI 2018: owner's LinkedIn award entry provides title and presenter recognition; the existing CV honors confirm the technical-paper award. A 2021 Bakelite conference paper independently cites the 2018 paper, its author list, and the October 1–3 Atlanta conference: https://bakelite.com/wp-content/uploads/2024/03/bakelite_s_2021_cpi_paper_on_effect_of_aromaticity_chain_length_and_functionality_of_aromatic_polyetherols_in_rigid_foams.pdf (reference 4). The 2021 paper is not represented as the owner's work.
- ACS 2016: official POLY program identifies the ferulic-acid thermosets contribution as a poster in the Excellence in Graduate Polymer Research symposium: https://polyacs.org/wp-content/uploads/2018/07/2016-Spring-Natl-ACS-meeting.pdf. It is labeled as a poster, not an oral talk.
- ACS 2017 and ACS 2014 epoxy abstracts: official graphical abstract collections at https://polyacs.org/wp-content/uploads/2021/07/2017-Fall-Graphical-Abstracts.pdf (POLY 559) and https://polyacs.org/wp-content/uploads/2021/07/2014-Fall-Graphical-Abstracts.pdf (POLY 741). Author credit is published; presenter status is not inferred from author order.
- SPIE 2015 and PPS 2016 contributions: Nathan Dawson's university-hosted CV lists titles, dates/venue, and coauthors: https://www.hpu.edu/faculty/cv/cncs-faculty/nathan-dawson.pdf. Neither the lead author's invited/keynote status nor presenter credit is assigned to Anthony. SPIE DOI 10.1117/12.2187312 is corroborated by indexed bibliographic records; direct DOI access was unavailable in this session.
- ACS San Francisco 2014 cellulose abstract, ACS Dallas 2014 cellulose poster, and Belgian Polymer Group 2014 poster: university repository records https://publications.polymtl.ca/72435/, https://publications.polymtl.ca/72724/, and https://publications.polymtl.ca/72722/. Repeated research at different meetings is listed as separate contributions, without implying distinct research publications or personal presenter credit. The Belgian record's spelling “fishcer” is normalized to “Fischer.”

The page is a selected, source-grounded list, not a claim of completeness. Owner suggested Google Scholar as a source; searches did not locate an exact profile and the profile URL was requested. No Scholar profile was invented or linked. Full abstract text and private contact details are not reproduced. The recording is a direct outbound YouTube link; no third-party video player is loaded on page view.
