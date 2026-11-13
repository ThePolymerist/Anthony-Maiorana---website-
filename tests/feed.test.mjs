import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFeed, readLimitedBody } from '../scripts/feed.mjs';

const article = (link, date = 'Tue, 03 Nov 2026 12:00:00 GMT', title = 'Good science &amp; useful work') => `<item><title>${title}</title><link>${link}</link><pubDate>${date}</pubDate><description><![CDATA[<p>Some <strong>useful</strong> context.</p>]]></description></item>`;
const feed = content => `<?xml version="1.0"?><rss version="2.0"><channel>${content}</channel></rss>`;
const now = new Date('2026-11-12T20:00:00Z');

test('real RSS-shaped content becomes plain text and canonical article links', () => {
  const items = parseFeed(feed(article('https://polymerist.substack.com/p/test?utm_source=feed')), now);
  assert.deepEqual(items, [{ title: 'Good science & useful work', url: 'https://polymerist.substack.com/p/test', date: '2026-11-03', description: 'Some useful context.' }]);
});
test('untrusted destinations, invalid dates, future posts, and duplicate links are excluded', () => {
  const items = parseFeed(feed(
    article('javascript:alert(1)') + article('https://evil.example/p/test') + article('https://polymerist.substack.com.evil.example/p/test') +
    article('https://polymerist.substack.com/p/bad-date', 'not-a-date') + article('https://polymerist.substack.com/p/future', 'Tue, 03 Nov 2030 12:00:00 GMT') +
    article('https://polymerist.substack.com/p/good') + article('https://polymerist.substack.com/p/good?ref=dup')
  ), now);
  assert.equal(items.length, 1); assert.equal(items[0].url, 'https://polymerist.substack.com/p/good');
});
test('error pages, broken XML, and entity declarations cannot replace the saved index', () => {
  for (const xml of ['<html><h1>Unavailable</h1></html>', '<rss><channel>', '<!DOCTYPE rss [<!ENTITY x "bad">]><rss/>', feed('')]) assert.throws(() => parseFeed(xml, now));
});
test('RSS response size is bounded even without a Content-Length header', async () => {
  await assert.rejects(() => readLimitedBody(new Response('x'.repeat(50)), 10), /size limit/);
  assert.equal(await readLimitedBody(new Response('<rss/>'), 10), '<rss/>');
});
