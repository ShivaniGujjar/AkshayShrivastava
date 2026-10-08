import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GA_ID, getConsent, setConsent } from './Analytics';

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false);

  // Show only if analytics is configured and the visitor has not chosen yet.
  // Starts hidden, so nothing flashes before the stored choice is read.
  useEffect(() => {
    setVisible(Boolean(GA_ID) && !getConsent());
  }, []);

  if (!visible) return null;

  const choose = (value) => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Analytics consent"
      className="fixed z-[1000000] left-4 right-4 bottom-4 md:left-6 md:right-auto md:bottom-6 md:max-w-[380px] bg-[#08080a] text-white rounded-lg ring-1 ring-white/15 shadow-2xl p-4"
    >
      <p className="text-sm leading-relaxed text-neutral-300">
        I use Google Analytics to see which pages get visited. It only loads if you
        accept. Details in the{' '}
        <Link to="/privacy" className="text-[#FFC300] underline underline-offset-4">
          privacy policy
        </Link>
        .
      </p>

      <div className="mt-4 flex gap-2.5">
        <button
          type="button"
          onClick={() => choose('granted')}
          style={{ fontFamily: 'GourmetEatery, cursive, sans-serif' }}
          className="flex-1 min-h-[40px] rounded-md bg-[#FFC300] text-black text-sm tracking-wide cursor-pointer transition-opacity hover:opacity-90 active:scale-[0.98]"
        >
          Accept
        </button>
        <button
          type="button"
          onClick={() => choose('denied')}
          style={{ fontFamily: 'GourmetEatery, cursive, sans-serif' }}
          className="flex-1 min-h-[40px] rounded-md ring-1 ring-white/20 text-white text-sm tracking-wide cursor-pointer transition-colors hover:ring-white/40 active:scale-[0.98]"
        >
          Decline
        </button>
      </div>
    </div>
  );
}