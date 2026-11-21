---
title: "Weekly Chemical News Agent"
description: "Use your own AI assistant to research chemical-industry news, connect it to manufacturing and commercialization, and request a weekly briefing by email."
status: "Prototype"
category: "AI Tools"
order: 0
updated: "2026-11-21"
promptFile: "/downloads/ai-tools/Weekly_News_Scheduled_Task_Prompt.txt"
sampleUrl: "/projects/weekly-chemical-news-agent/sample/"
---

## A research workflow you can take with you

This free tool is adapted from the weekly news research behind [The Polymerist](https://polymerist.substack.com/). It supplies the search method and editorial context; you use it with your own AI assistant and web access.

The focus is what developments mean for commercialization, manufacturing economics, capital allocation, and the chemical industry's ability to build new capabilities.

[Read a sample briefing](/projects/weekly-chemical-news-agent/sample/) before setting it up. The November 21, 2026 sample shows the output, its source links, and the coverage gaps from the first test.

## What it produces

- Three developed lead stories explaining what happened, why it matters, and the deeper question each raises.
- Up to ten additional headlines, with source links and publication dates.
- An attempt to check official announcements from the 25 largest global chemical companies, with actual coverage reported.
- A check for comparable moves by three or more independent companies.
- A synthesis of the week and a watchlist for what comes next.

The default is the preceding seven days, with a U.S. emphasis and material global developments. The agent should return fewer stories when the evidence is weak and disclose incomplete searches.

## Schedule a weekly email briefing

1. Use **Copy complete prompt** at the bottom of this page. No file upload is needed for this option.
2. Paste it into ChatGPT with scheduled tasks available and send it. The prompt includes the research instructions as well as the scheduling request.
3. Connect the Gmail account you want to use and complete any required sending authorization. If several accounts are available, specify which should send and receive the briefing.
4. Check the actual task confirmation and review the schedule, timezone, next run, and saved instructions in Scheduled.
5. After the first run, check your inbox for the full briefing and review its delivery status in ChatGPT.

The default is **Thursday at 8 a.m. Eastern (America/New_York)**. You can change the day, time, and timezone before sending the prompt. Also update the reporting timezone inside the research instructions if you change it.

The prompt requests the **complete report in the email body**, sent from your connected Gmail account to that same account. It also keeps the report in the task conversation. A Gmail connection, sending permissions, and support for sending during scheduled runs are required. Availability depends on your account and setup. If delivery fails or is unavailable, the agent is instructed to return the report in ChatGPT and clearly say the email was not sent.

Task-notification emails are separate from this full-report email. Pasting a prompt does not itself connect Gmail or grant sending permission.

ChatGPT scheduled tasks cannot access uploaded project files, so the copy-and-paste version includes the research instructions directly in the task prompt. See [OpenAI's scheduled-task documentation](https://help.openai.com/en/articles/10291617-scheduled-tasks-in-chatgpt). If the full prompt cannot be saved or scheduling is unavailable, use the on-demand option below.

## Use it on demand in a project or agent

1. [Download the Markdown instructions](/downloads/ai-tools/The_Polymerist_Weekly_News_Agent.md).
2. Upload the file to your AI conversation or project. Enable live web search and access to source pages.
3. Add this setup instruction to the project or agent's instruction field, or paste it into the conversation:

> Use `The_Polymerist_Weekly_News_Agent.md` as the operating instructions for weekly polymer and chemical-industry research. Follow its search method, editorial lens, verification rules, settings, and report format whenever I request this briefing. Treat the file as instructions to apply, not as a document to summarize. Use my explicit overrides and disclose incomplete research or unavailable web access.

Then request an edition:

> Produce this week's polymer and chemical-industry briefing using `The_Polymerist_Weekly_News_Agent.md`. Use its default settings. State the reporting window and important coverage gaps.

Uploading the Markdown file does not create a schedule or send email. The scheduled prompt below adds those requests separately.

## Adapt it to your interests

Change the region, reporting window, audience, story count, companies, or editorial lens. For example:

> Focus on European polymer manufacturing over the past 14 days and monitor 10 companies. Explain how that narrower coverage limits the report.

## What has been tested

One interactive research run produced the [sample briefing](/projects/weekly-chemical-news-agent/sample/). All 25 selected companies received a source-access attempt, but none received comprehensive monitoring. The email-enabled prompt has not been tested through an unattended scheduled run or in a fresh account.

Treat this as a working first version. Results depend on your AI assistant, browsing access, and execution limits. Verify important claims before publishing or acting on them. No paid news subscription, AI account, or email service is included with the download.
