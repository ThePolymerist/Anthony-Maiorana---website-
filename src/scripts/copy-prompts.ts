export function installCopyPrompts(doc: Document, nav: Pick<Navigator, 'clipboard'>) {
  doc.querySelectorAll<HTMLElement>('[data-copy-prompt]').forEach(panel => {
    const button = panel.querySelector<HTMLButtonElement>('[data-copy-button]');
    const text = panel.querySelector<HTMLTextAreaElement>('[data-copy-text]');
    const status = panel.querySelector<HTMLElement>('[data-copy-status]');
    const details = panel.querySelector<HTMLDetailsElement>('[data-copy-details]');
    if (!button || !text || !status || !details) return;
    button.hidden = false;
    button.addEventListener('click', async () => {
      try {
        if (!nav.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await nav.clipboard.writeText(text.value);
        status.textContent = 'Copied. Paste the complete prompt into your AI assistant.';
      } catch {
        details.open = true;
        text.focus();
        text.select();
        status.textContent = 'Automatic copying is unavailable. The full prompt is selected; copy it using your device’s copy command.';
      }
    });
  });
}
