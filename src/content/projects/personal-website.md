---
title: "Building a personal digital workshop"
description: "Bringing scientific work, independent writing, and new experiments together in one place. This website is the first project."
status: "In development"
category: "Website / build journal"
order: 1
updated: "2026-11-12"
repository: "https://github.com/ThePolymerist/Anthony-Maiorana---website-"
---

## The question

What does a personal website look like when your work doesn't fit neatly into one job title?

I wanted a place for the scientific papers, industrial experience, and writing I've already done, with room for things I haven't figured out yet. That includes learning to build useful software with AI.

## What I'm building

The first version is deliberately small: a readable home for my work, a publication index, links to The Polymerist, and a place to document projects as they develop. Future tools should be able to grow here without holding up the rest of the site.

## Decisions so far

- **Astro and static pages.** Most of this site is text and links. It should be fast to read and straightforward to maintain.
- **Markdown for project notes.** Adding a project should start with writing, not a redesign.
- **GitHub for source and history.** Changes should be reviewable and reversible.
- **Cloudflare Workers as the hosting target.** The generated site is portable static HTML, so hosting can change without rewriting the content.
- **AI-assisted implementation, with explicit checks.** Useful assistance still needs factual review, working links, mobile checks, and a reproducible build.

## What this demonstrates

This is an experiment in specifying a product, making tradeoffs, and testing the result with AI assistance. It is also a running record of what works and what needs more attention.

The source repository and build notes will record implementation and validation as the site develops. A successful local build is a different milestone from a working public deployment.
