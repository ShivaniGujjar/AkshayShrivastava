import { useEffect } from 'react';
import { PAGES, SITE_URL, SITE_NAME, DEFAULT_SHARE_IMAGE } from '../seo/siteConfig';

const upsertMeta = (attr, key, content) => {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const upsertCanonical = (href) => {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
};

// Usage: put <Seo page="editing" /> at the top of each page's JSX.
// For one-off pages: <Seo title="..." description="..." path="/x" noindex />
export default function Seo({ page, title, description, path, image, noindex = false }) {
  useEffect(() => {
    const base = PAGES[page] || {};
    const t = title || base.title || SITE_NAME;
    const d = description || base.description || '';
    const url = SITE_URL + (path || base.path || window.location.pathname);
    const img = image || DEFAULT_SHARE_IMAGE;
    const imgUrl = img.startsWith('http') ? img : SITE_URL + img;

    document.title = t;
    upsertMeta('name', 'description', d);
    upsertMeta('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    upsertCanonical(url);

    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);
    upsertMeta('property', 'og:title', t);
    upsertMeta('property', 'og:description', d);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:image', imgUrl);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', t);
    upsertMeta('name', 'twitter:description', d);
    upsertMeta('name', 'twitter:image', imgUrl);
  }, [page, title, description, path, image, noindex]);

  return null;
}