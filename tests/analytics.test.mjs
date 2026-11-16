import test from 'node:test';
import assert from 'node:assert/strict';
import { cleanPageLocation, cleanReferrer, linkEvent, installAnalytics } from '../public/analytics.js';
import { buildTaggedUrl } from '../scripts/utm.mjs';

function fixture({ choice, host = 'anthonymaiorana.com', storageFails = false } = {}) {
  class Element {
    hidden = true;
    listeners = {};
    addEventListener(name, cb) { (this.listeners[name] ||= []).push(cb); }
    click(target = this) { for (const cb of this.listeners.click || []) cb({ target }); }
    closest() { return null; }
    focus() { this.focused = true; }
  }
  const controls = Object.fromEntries(['choice', 'settings', 'accept', 'decline'].map(k => [k, new Element()]));
  const scripts = [];
  const doc = new Element();
  Object.assign(doc, {
    querySelector: key => controls[key.match(/data-analytics-(\w+)/)?.[1]],
    referrer: 'https://www.linkedin.com/feed/?private=discard',
    cookie: '_ga=123; _ga_TEST=456; unrelated=keep',
    head: { appendChild: s => scripts.push(s) },
    createElement: () => ({}),
  });
  let saved = choice;
  const win = {
    Element,
    location: { hostname: host, protocol: 'https:', href: `https://${host}/writing/?utm_source=linkedin&utm_medium=social&email=private#private`, reload: () => { win.reloaded = true; } },
    localStorage: {
      getItem() { if (storageFails) throw new Error('disabled'); return saved; },
      setItem(_key, value) { if (storageFails) throw new Error('disabled'); saved = value; },
    },
  };
  const events = () => (win.dataLayer || []).map(args => [...args]);
  const clickLink = (href, intent) => {
    const target = new Element();
    target.closest = selector => selector === 'a[href]' ? { href, dataset: { analyticsIntent: intent } } : null;
    doc.click(target);
  };
  return { win, doc, controls, scripts, events, clickLink };
}

test('Google loads only after consent; repeated consent does not double page views; withdrawal stops events', () => {
  const f = fixture();
  installAnalytics(f.win, f.doc, 'G-TEST123');
  assert.equal(f.controls.choice.hidden, false);
  f.clickLink('https://polymerist.substack.com/subscribe');
  assert.equal(f.scripts.length, 0);
  assert.equal(f.events().length, 0);
  f.controls.accept.click();
  f.controls.accept.click();
  assert.equal(f.scripts.length, 1);
  const configs = f.events().filter(e => e[0] === 'config');
  assert.equal(configs.length, 1);
  assert.equal(configs[0][2].page_location, 'https://anthonymaiorana.com/writing/?utm_source=linkedin&utm_medium=social');
  f.clickLink('https://polymerist.substack.com/subscribe?secret=discard');
  assert.equal(f.events().filter(e => e[0] === 'event' && e[1] === 'newsletter_click').length, 1);
  const before = f.events().length;
  f.controls.decline.click();
  f.clickLink('https://polymerist.substack.com/subscribe');
  assert.equal(f.events().length, before);
  assert.equal(f.win['ga-disable-G-TEST123'], true);
  assert.equal(f.win.reloaded, true);
});

test('saved rejection, missing ID and preview hosts cannot load Google', () => {
  for (const options of [{ choice: 'no' }, { host: 'preview.workers.dev', choice: 'yes' }, { host: 'localhost', choice: 'yes' }]) {
    const f = fixture(options);
    installAnalytics(f.win, f.doc, 'G-TEST123');
    assert.equal(f.scripts.length, 0);
    assert.equal(f.controls.choice.hidden, true);
  }
  const f = fixture({ choice: 'yes' });
  installAnalytics(f.win, f.doc, '');
  assert.equal(f.scripts.length, 0);
});

test('a returning consented browser initializes once; blocked storage is usable', () => {
  const returning = fixture({ choice: 'yes' });
  installAnalytics(returning.win, returning.doc, 'G-TEST123');
  assert.equal(returning.scripts.length, 1);
  const blocked = fixture({ storageFails: true });
  installAnalytics(blocked.win, blocked.doc, 'G-TEST123');
  blocked.controls.accept.click();
  assert.equal(blocked.scripts.length, 1);
});

test('intent events cannot be mistaken for confirmed conversions or ordinary profile links', () => {
  const base = 'https://anthonymaiorana.com/contact/';
  assert.equal(linkEvent('https://www.linkedin.com/in/tonymaiorana/', base), null);
  assert.equal(linkEvent('https://www.linkedin.com/in/tonymaiorana/', base, 'contact').name, 'contact_click');
  assert.equal(linkEvent('https://polymerist.substack.com/p/the-lean-lab?email=private#x', base).name, 'article_click');
  assert.equal(linkEvent('https://polymerist.substack.com/', base), null);
  assert.equal(linkEvent('https://evil.test/subscribe', base), null);
  assert.equal(linkEvent('javascript:alert(1)', base), null);
});

test('URLs retain campaign slugs, discard private query strings and fragments', () => {
  assert.equal(cleanPageLocation('https://anthonymaiorana.com/?utm_source=linkedin&utm_campaign=person%40mail.test&email=private#private'), 'https://anthonymaiorana.com/?utm_source=linkedin');
  assert.equal(cleanReferrer('https://www.linkedin.com/feed/?token=private#private'), 'https://www.linkedin.com/feed/');
  assert.equal(cleanReferrer(''), '');
});

test('UTM builder replaces old campaign fields and preserves destination anchors', () => {
  const result = buildTaggedUrl('https://anthonymaiorana.com/writing/?utm_source=old&utm_term=old#main', 'linkedin', 'social', 'lean-lab', 'd-20261114-01');
  const url = new URL(result);
  assert.equal(url.searchParams.get('utm_source'), 'linkedin');
  assert.equal(url.searchParams.get('utm_content'), 'd-20261114-01');
  assert.equal(url.searchParams.has('utm_term'), false);
  assert.equal(url.hash, '#main');
  assert.throws(() => buildTaggedUrl('http://anthonymaiorana.com', 'linkedin', 'social', 'lean-lab', 'd1'));
  assert.throws(() => buildTaggedUrl('https://anthonymaiorana.com', 'person@mail.test', 'social', 'lean-lab', 'd1'));
});
