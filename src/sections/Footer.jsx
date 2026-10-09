import React, { useEffect, useRef, useState } from 'react';

const SOCIAL_LINKS = [
  { id: 'Instagram', name: 'Instagram', url: 'https://www.instagram.com/akshay__shri/?hl=en' },
  {
    id: 'Gmail',
    name: 'Gmail',
    url: 'https://mail.google.com/mail/?view=cm&to=Connectwithakshayshri@gmail.com&su=Project%20inquiry',
  },
  { id: 'LinkedIn', name: 'Linkedin', url: 'https://www.linkedin.com/in/akshay-shrivastava-735210210/?isSelfProfile=false' }
];

const PULL_UP_DESKTOP = 240;
const PULL_UP_MOBILE = 40; // Mobile par overlap fix karne ke liye spacing adjust ki hai

export default function Footer() {
  const footerRef = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'GourmetEatery';
          src: url('/GourmetEatery.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'SquidBoy';
          src: url('/Fonts/SquidBoy.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        .ft-root { margin-top: -${PULL_UP_MOBILE}px; }
        @media (min-width: 640px) { .ft-root { margin-top: -${PULL_UP_DESKTOP}px; } }

        .ft-root { padding-bottom: max(2rem, env(safe-area-inset-bottom)); }
        @media (min-width: 640px) { .ft-root { padding-bottom: 3rem; } }

        .ft-pill-wrap {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .ft-in .ft-pill-wrap { opacity: 1; transform: none; }

        @media (prefers-reduced-motion: reduce) {
          .ft-pill-wrap { opacity: 1; transform: none; transition: none; }
        }
      `}</style>

      <footer
        ref={footerRef}
        className={`ft-root w-full pt-8 sm:pt-0 flex flex-col items-center justify-center relative z-20 bg-transparent text-center select-none ${shown ? 'ft-in' : ''}`}
      >
        {/* Contact Now */}
        <div className="mb-3 sm:mb-6 w-full px-4">
          <a
            href="https://mail.google.com/mail/?view=cm&to=Connectwithakshayshri@gmail.com&su=Project%20inquiry"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '0.5px' }}
            className="inline-block py-1 text-[#D42C2C] hover:text-[#b02222] transition-colors text-[1.85rem] sm:text-5xl leading-none cursor-pointer no-underline whitespace-nowrap"
          >
            Contact Now
          </a>
        </div>

        {/* Social handles - Sleek & Compact Pill */}
        <div className="ft-pill-wrap flex justify-center items-center w-full px-4">
          <div className="relative bg-[#D42C2C] text-white py-2 px-4 sm:py-3 sm:px-6 rounded-lg flex items-center justify-center shadow-md sm:shadow-lg overflow-hidden">
            <div className="relative z-[2] flex items-center justify-center gap-3 sm:gap-5">
              {SOCIAL_LINKS.map((link, idx) => (
                <React.Fragment key={link.id}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#FFC822] transition-colors text-[0.85rem] sm:text-[1.2rem] capitalize tracking-wide leading-none flex items-center py-1 px-0"
                    style={{ fontFamily: "GourmetEatery, cursive, sans-serif" }}
                  >
                    <span className="leading-none relative top-[1px]">{link.name}</span>
                  </a>
                  {idx < SOCIAL_LINKS.length - 1 && (
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FFC822] inline-block select-none shrink-0" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}