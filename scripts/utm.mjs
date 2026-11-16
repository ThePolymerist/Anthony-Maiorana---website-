import { pathToFileURL } from 'node:url';

export function buildTaggedUrl(destination, source, medium, campaign, distribution) {
  const url = new URL(destination);
  if (url.protocol !== 'https:' || url.username || url.password) throw new Error('Use an HTTPS destination without credentials.');
  const values = { utm_source: source, utm_medium: medium, utm_campaign: campaign, utm_content: distribution };
  for (const [key, value] of Object.entries(values)) {
    if (!/^[a-z0-9][a-z0-9_-]{0,99}$/.test(value ?? '')) throw new Error(key + ' must be a lowercase slug of 1–100 characters.');
  }
  for (const key of [...url.searchParams.keys()]) if (key.startsWith('utm_')) url.searchParams.delete(key);
  for (const [key, value] of Object.entries(values)) url.searchParams.set(key, value);
  return url.href;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const args = process.argv.slice(2);
    if (args.length !== 5) throw new Error('Usage: npm run utm -- <https-url> <source> <medium> <campaign> <distribution-id>');
    console.log(buildTaggedUrl(...args));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
