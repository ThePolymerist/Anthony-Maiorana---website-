import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { installCopyPrompts } from '../src/scripts/copy-prompts.ts';

function fixture(clipboard, value) {
  let click;
  const button = { hidden: true, addEventListener(name, handler) { if (name === 'click') click = handler; } };
  const text = { value, focused: false, selected: false, focus() { this.focused = true; }, select() { this.selected = true; } };
  const status = { textContent: '' };
  const details = { open: false };
  const elements = { '[data-copy-button]': button, '[data-copy-text]': text, '[data-copy-status]': status, '[data-copy-details]': details };
  const panel = { querySelector: selector => elements[selector] };
  const doc = { querySelectorAll: () => [panel] };
  installCopyPrompts(doc, { clipboard });
  return { button, text, status, details, click: () => click() };
}

test('copies the entire downloadable task, including Unicode, research, and self-email instructions', async () => {
  const prompt = await readFile(new URL('../public/downloads/ai-tools/Weekly_News_Scheduled_Task_Prompt.txt', import.meta.url), 'utf8');
  let copied;
  const view = fixture({ writeText: async value => { copied = value; } }, prompt);
  assert.equal(view.button.hidden, false);
  await view.click();
  assert.equal(copied, prompt);
  assert.match(copied, /EMAIL DELIVERY/);
  assert.match(copied, /same authenticated account/);
  assert.match(copied, /END SAVED RESEARCH INSTRUCTIONS/);
  assert.match(view.status.textContent, /^Copied\./);
});

test('clipboard permission denial selects the full prompt for manual copying', async () => {
  const view = fixture({ writeText: async () => { throw new Error('NotAllowedError'); } }, 'Complete prompt — with links and email instructions');
  await view.click();
  assert.equal(view.details.open, true);
  assert.equal(view.text.focused, true);
  assert.equal(view.text.selected, true);
  assert.match(view.status.textContent, /Automatic copying is unavailable/);
  assert.doesNotMatch(view.status.textContent, /^Copied/);
});

test('a browser without the Clipboard API still exposes manual copying', async () => {
  const view = fixture(undefined, 'Full prompt');
  await view.click();
  assert.equal(view.details.open, true);
  assert.equal(view.text.selected, true);
});
