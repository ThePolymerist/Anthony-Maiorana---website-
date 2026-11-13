import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('dist');
async function walk(dir) { const entries = await readdir(dir, { withFileTypes: true }); return (await Promise.all(entries.map(e => e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name)))).flat(); }
const files = await walk(root);
const pages = files.filter(file => file.endsWith('.html'));
const contents = new Map(await Promise.all(pages.map(async file => [file, await readFile(file, 'utf8')])));
const ids = html => new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
const exists = async file => { try { return (await stat(file)).isFile(); } catch { return false; } };
let links = 0;
for (const [file, html] of contents) {
  const label = path.relative(root, file);
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${label}: one page heading`);
  assert.match(html, /<html[^>]+lang="en"/, `${label}: language`);
  assert.match(html, /<meta name="description" content="[^\"]+"/, `${label}: description`);
  assert.match(html, /<link rel="canonical" href="https:\/\/anthonymaiorana\.com[^\"]*"/, `${label}: canonical`);
  assert.match(html, /id="main"/, `${label}: skip-link target`);
  assert.doesNotMatch(html, /\b(?:TODO|Lorem ipsum|example\.com|undefined)\b/, `${label}: no unfinished content`);
  for (const [, href] of html.matchAll(/\b(?:href|src)="([^\"]+)"/g)) {
    if (!href.startsWith('/') && !href.startsWith('#')) continue;
    const url = new URL(href, 'https://anthonymaiorana.com/' + label.replace(/index\.html$/, ''));
    let target = path.join(root, decodeURIComponent(url.pathname));
    if (url.pathname.endsWith('/')) target = path.join(target, 'index.html');
    if (!(await exists(target)) && await exists(target + '.html')) target += '.html';
    assert.ok(await exists(target), `${label}: missing internal target ${href}`);
    if (url.hash && contents.has(target)) assert.ok(ids(contents.get(target)).has(decodeURIComponent(url.hash.slice(1))), `${label}: missing anchor ${href}`);
    links++;
  }
}
for (const required of ['404.html', 'robots.txt', 'sitemap-index.xml', '_headers', 'social-card.png']) assert.ok(await exists(path.join(root, required)), `Missing ${required}`);
console.log(`Verified ${pages.length} pages and ${links} internal links/assets, canonical URLs, headings, metadata, sitemap, and 404 output.`);
