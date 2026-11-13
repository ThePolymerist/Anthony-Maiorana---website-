import { XMLParser, XMLValidator } from 'fast-xml-parser';

const ALLOWED_HOSTS = new Set(['polymerist.substack.com']);
const text = value => typeof value === 'string' ? value : typeof value === 'number' ? String(value) : '';
const stripMarkup = value => text(value).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export function parseFeed(xml, now = new Date()) {
  if (/<!DOCTYPE|<!ENTITY/i.test(xml)) throw new Error('Feed contains an unsupported document type or entity declaration.');
  if (XMLValidator.validate(xml) !== true) throw new Error('Feed is not valid XML.');
  const parsed = new XMLParser({ ignoreAttributes: true, processEntities: true }).parse(xml);
  const raw = parsed?.rss?.channel?.item;
  if (!raw) throw new Error('No RSS articles found. Keeping the saved article list.');
  const seen = new Set();
  const items = (Array.isArray(raw) ? raw : [raw]).flatMap(item => {
    try {
      const url = new URL(text(item.link));
      const date = new Date(text(item.pubDate));
      const title = stripMarkup(item.title);
      if (url.protocol !== 'https:' || !ALLOWED_HOSTS.has(url.hostname) || url.username || url.password || !url.pathname.startsWith('/p/')) return [];
      if (!title || !Number.isFinite(date.valueOf()) || date > now) return [];
      url.search = ''; url.hash = '';
      if (seen.has(url.href)) return [];
      seen.add(url.href);
      return [{ title, url: url.href, date: date.toISOString().slice(0, 10), description: stripMarkup(item.description).slice(0, 240) }];
    } catch { return []; }
  }).sort((a, b) => b.date.localeCompare(a.date)).slice(0, 12);
  if (!items.length) throw new Error('No valid articles found. Keeping the saved article list.');
  return items;
}

export async function readLimitedBody(response, limit = 2 * 1024 * 1024) {
  if (!response.body) throw new Error('Feed response is empty.');
  if (Number(response.headers.get('content-length')) > limit) throw new Error('Feed exceeds the size limit.');
  const reader = response.body.getReader();
  const chunks = [];
  let size = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) throw new Error('Feed exceeds the size limit.');
      chunks.push(value);
    }
  } finally { await reader.cancel().catch(() => {}); }
  return Buffer.concat(chunks).toString('utf8');
}
