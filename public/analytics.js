// Basic opt-in: Google is not contacted until analytics is allowed.
// This site uses full-page navigation, so one config call sends one page_view.
const CHOICE_KEY = 'am-analytics-choice-v1';
const CAMPAIGN_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_id'];
const SLUG = /^[a-z0-9][a-z0-9_-]{0,99}$/;

export function cleanPageLocation(value) {
  const url = new URL(value);
  const clean = new URL(url.origin + url.pathname);
  for (const key of CAMPAIGN_KEYS) {
    const value = url.searchParams.get(key);
    if (value && SLUG.test(value)) clean.searchParams.set(key, value);
  }
  return clean.href;
}

export function cleanReferrer(value) {
  try { const url = new URL(value); return url.origin + url.pathname; }
  catch { return ''; }
}

export function linkEvent(href, pageUrl, intent = '') {
  let url;
  try { url = new URL(href, pageUrl); } catch { return null; }
  if (url.protocol !== 'https:') return null;
  let name;
  if (intent === 'contact' && url.hostname === 'www.linkedin.com' && url.pathname === '/in/tonymaiorana/') name = 'contact_click';
  else if (url.hostname === 'polymerist.substack.com') {
    if (/^\/subscribe\/?$/.test(url.pathname)) name = 'newsletter_click';
    else if (/^\/p\/[a-z0-9-]+\/?$/.test(url.pathname)) name = 'article_click';
  }
  return name ? { name, params: { link_domain: url.hostname, link_path: url.pathname } } : null;
}

export function installAnalytics(win, doc, measurementId) {
  if (!/^G-[A-Z0-9]+$/.test(measurementId) || win.location.hostname !== 'anthonymaiorana.com' || win.location.protocol !== 'https:') return;
  const banner = doc.querySelector('[data-analytics-choice]');
  const settings = doc.querySelector('[data-analytics-settings]');
  const accept = doc.querySelector('[data-analytics-accept]');
  const decline = doc.querySelector('[data-analytics-decline]');
  if (!banner || !settings || !accept || !decline) return;
  let choice = null;
  try { choice = win.localStorage.getItem(CHOICE_KEY); } catch { /* Remain usable without storage. */ }
  let started = false;
  let returnFocus = false;
  function gtag() { (win.dataLayer ||= []).push(arguments); }

  const event = (name, params = {}) => {
    if (choice === 'yes' && started) gtag('event', name, { ...params, send_to: measurementId });
  };
  function start() {
    if (started) return;
    started = true;
    win.gtag = gtag;
    gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    gtag('js', new Date());
    gtag('set', { allow_google_signals: false, allow_ad_personalization_signals: false });
    // config is retained for the supported gtag.js destination initialization.
    gtag('config', measurementId, {
      page_location: cleanPageLocation(win.location.href),
      page_referrer: cleanReferrer(doc.referrer),
      cookie_domain: 'anthonymaiorana.com',
    });
    const script = doc.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + measurementId;
    doc.head.appendChild(script);
  }
  function save(value) {
    choice = value;
    try { win.localStorage.setItem(CHOICE_KEY, value); } catch { /* Choice still applies to this page. */ }
    banner.hidden = true;
    if (returnFocus) settings.focus();
  }
  settings.hidden = false;
  settings.addEventListener('click', () => { banner.hidden = false; returnFocus = true; decline.focus(); });
  accept.addEventListener('click', () => { save('yes'); win['ga-disable-' + measurementId] = false; start(); });
  decline.addEventListener('click', () => {
    save('no');
    win['ga-disable-' + measurementId] = true;
    for (const item of doc.cookie.split(';')) {
      const name = item.trim().split('=')[0];
      if (name === '_ga' || name.startsWith('_ga_')) {
        for (const domain of ['', '; domain=anthonymaiorana.com', '; domain=.anthonymaiorana.com']) {
          doc.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax; Secure';
        }
      }
    }
    // Remove Google's already-loaded runtime before any further browsing.
    if (started) win.location.reload();
  });
  doc.addEventListener('click', e => {
    if (!(e.target instanceof win.Element)) return;
    const anchor = e.target.closest('a[href]');
    if (anchor) {
      const match = linkEvent(anchor.href, win.location.href, anchor.dataset.analyticsIntent);
      if (match) event(match.name, match.params);
    }
    if (e.target.closest('#print-cv')) event('cv_print');
  });
  if (choice === 'yes') start();
  else if (choice !== 'no') banner.hidden = false;
}

if (typeof document !== 'undefined') {
  const config = document.querySelector('script[data-measurement-id]');
  if (config) installAnalytics(window, document, config.dataset.measurementId || '');
}
