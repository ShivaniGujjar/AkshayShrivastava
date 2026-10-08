import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const GA_ID = import.meta.env.VITE_GA_ID;
const CONSENT_KEY = 'analytics-consent'; // 'granted' | 'denied'
const CONSENT_EVENT = 'analytics-consent-change';

// localStorage can be blocked (private mode, strict settings), so never let it crash the site
export function getConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}

export function setConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

// Adds the Google script. Runs at most once, and only after the visitor accepts.
function loadGa() {
  if (!GA_ID || window.__gaLoaded) return;
  window.__gaLoaded = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  // page views are sent by hand below, because this is a single-page app
  window.gtag('config', GA_ID, { send_page_view: false });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
}

export default function Analytics() {
  const { pathname, search } = useLocation();
  const [granted, setGranted] = useState(getConsent() === 'granted');

  // react when the visitor clicks Accept / Decline in the banner
  useEffect(() => {
    const onChange = () => setGranted(getConsent() === 'granted');
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  // load GA (only if accepted) and report each page the visitor opens
  useEffect(() => {
    if (!granted || !GA_ID) return;
    loadGa();

    // short delay so the page title set by <Seo /> is already updated
    const t = setTimeout(() => {
      window.gtag?.('event', 'page_view', {
        page_path: pathname + search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 150);
    return () => clearTimeout(t);
  }, [granted, pathname, search]);

  return null;
}