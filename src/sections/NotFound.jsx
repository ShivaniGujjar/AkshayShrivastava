import React from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from './Footer';
import { PAGES, SITE_NAME } from '../seo/siteConfig';

const LINKS = [
  { label: 'Home', to: PAGES.home.path },
  { label: 'Editing', to: PAGES.editing.path },
  { label: 'Motion Design', to: PAGES.motion.path },
  { label: 'Direction', to: PAGES.direction.path },
  { label: 'About Me', to: PAGES.about.path },
];

export default function NotFound() {
  return (
    <div className="w-full min-h-screen bg-[#08080a] text-[#FFFCFB] flex flex-col">
      <Seo title={`Page not found | ${SITE_NAME}`} path={window.location.pathname} noindex />

      <style>{`
        @font-face {
          font-family: 'SquidBoy';
          src: url('/Fonts/SquidBoy.otf') format('opentype');
          font-display: swap;
        }
        @font-face {
          font-family: 'ParaFont';
          src: url('/ParaFont.ttf') format('truetype');
          font-display: swap;
        }
      `}</style>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 pt-28 pb-16">
        <h1
          style={{ fontFamily: "'SquidBoy', sans-serif" }}
          className="m-0 text-[clamp(5rem,28vw,11rem)] leading-none text-[#FFC300] font-normal"
        >
          404
        </h1>
        <h2
          style={{ fontFamily: "'SquidBoy', sans-serif" }}
          className="m-0 mt-2 mb-3 text-[clamp(1.4rem,6vw,2.2rem)] text-[#D42C2C] font-normal"
        >
          This page doesn't exist
        </h2>
        <p
          style={{ fontFamily: "'ParaFont', sans-serif" }}
          className="m-0 mb-8 max-w-[440px] text-sm sm:text-base leading-relaxed text-neutral-300"
        >
          The link may be broken, or the page may have moved. Here is where you can go instead.
        </p>

        <nav className="flex flex-wrap justify-center gap-2.5">
          {LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              style={{ fontFamily: "'ParaFont', sans-serif" }}
              className="min-h-11 inline-flex items-center rounded-lg border border-white/20 px-5 text-white no-underline transition-colors hover:text-[#FFC300] hover:border-[#FFC300] active:text-[#FFC300] touch-manipulation"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </main>

      <Footer />
    </div>
  );
}