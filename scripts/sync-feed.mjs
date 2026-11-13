import { readFile, writeFile, rename } from 'node:fs/promises';
import { parseFeed, readLimitedBody } from './feed.mjs';

const file = new URL('../src/data/writing.json', import.meta.url);
const previous = JSON.parse(await readFile(file, 'utf8'));
try {
  const response = await fetch('https://polymerist.substack.com/feed', {
    headers: { Accept: 'application/rss+xml, application/xml, text/xml', 'User-Agent': 'AnthonyMaioranaWebsite/0.1 (+https://anthonymaiorana.com)' },
    signal: AbortSignal.timeout(12000),
  });
  if (!response.ok) throw new Error(`Substack returned HTTP ${response.status}.`);
  const items = parseFeed(await readLimitedBody(response));
  if (previous.mode === 'feed' && JSON.stringify(previous.items) === JSON.stringify(items)) {
    console.log(`Article index is current (${items.length} articles).`);
  } else {
    const updated = { source: previous.source, mode: 'feed', checkedAt: new Date().toISOString().slice(0, 10), items };
    const temporary = new URL('../src/data/writing.json.tmp', import.meta.url);
    await writeFile(temporary, JSON.stringify(updated, null, 2) + '\n');
    await rename(temporary, file);
    console.log(`Updated article index (${items.length} articles).`);
  }
} catch (error) {
  if (!Array.isArray(previous.items) || previous.items.length === 0) throw error;
  console.warn(`Feed refresh unavailable: ${error instanceof Error ? error.message : String(error)} Using ${previous.items.length} saved articles.`);
  if (process.argv.includes('--strict')) process.exitCode = 1;
}
