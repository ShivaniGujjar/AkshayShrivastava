import React, { useState, useRef, useEffect } from 'react';

const COLUMNS = [
  { 
    id: 'editing', 
    title: 'Editing', 
    subtitle: 'Because someone has to fix it in post',
    videoUrl: 'https://akshayshrivastava.com/videos/EditingMain.mp4',
    poster: 'https://akshayshrivastava.com/images/EditingHome.jpeg'
  },
  { 
    id: 'motion', 
    title: 'Motion Design', 
    subtitle: 'Making rectangles do interesting things',
    videoUrl: 'https://akshayshrivastava.com/videos/MotionHome.mp4',
    poster: 'https://akshayshrivastava.com/images/MotionHome.jpeg'
  },
  { 
    id: 'direction', 
    title: 'Direction', 
    subtitle: 'I love questionable ideas look intentional',
    videoUrl: 'https://akshayshrivastava.com/videos/DirectionHome.mp4',
    poster: 'https://akshayshrivastava.com/images/DirectionHome.jpeg'
  },
  { 
    id: 'about', 
    title: 'About Me', 
    subtitle: 'I have too many ideas and a Premiere Pro subscription',
    videoUrl: 'https://akshayshrivastava.com/videos/AboutHome.mp4',
    poster: 'https://akshayshrivastava.com/images/AboutHome.jpeg'
  }
];

const NAV_ITEMS = [
  { label: 'Editing', id: 'editing' },
  { label: 'Motion Design', id: 'motion' },
  { label: 'Direction', id: 'direction' },
  { label: 'About Me', id: 'about' }
];

// Mobile: the hero is exactly one screen tall, so the page should not scroll at all.
// Set to false if you ever add more sections below the hero on the home page.
const LOCK_MOBILE_SCROLL = true;

const ID_TO_PATH = {
  editing: '/editing',
  motion: '/motion-design',
  direction: '/direction',
  about: '/about'
};

export default function Hero({ onColumnClick }) {
  const videoRefs = useRef([]);
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hasInteracted, setHasInteracted] = useState({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeroInView, setIsHeroInView] = useState(true);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prevOverflow; };
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHeroInView(entry.isIntersecting),
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isHeroInView && isMobileMenuOpen) setIsMobileMenuOpen(false);
  }, [isHeroInView, isMobileMenuOpen]);

  // Lock page scroll on mobile while the hero is on screen (removes the extra scroll + black strip)
  useEffect(() => {
    if (!LOCK_MOBILE_SCROLL || !isHeroInView) return;
    const mq = window.matchMedia('(max-width: 767px)');
    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
    };

    const restore = () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      html.style.overscrollBehavior = prev.htmlOverscroll;
    };
    const apply = () => {
      if (mq.matches) {
        html.style.overflow = 'hidden';
        body.style.overflow = 'hidden';
        html.style.overscrollBehavior = 'none';
      } else {
        restore();
      }
    };

    apply();
    mq.addEventListener('change', apply);
    return () => {
      mq.removeEventListener('change', apply);
      restore();
    };
  }, [isHeroInView]);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
    setHasInteracted(prev => ({ ...prev, [index]: true }));
    const video = videoRefs.current[index];
    if (video) video.play().catch(() => {});
  };

  const handleMouseLeave = (index) => {
    setHoveredIndex(null);
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
    }
  };

  return (
    <section ref={sectionRef} className="w-full md:h-screen bg-[#08080a] overflow-hidden relative m-0 p-0 select-none">
      
      <style>{`
        @font-face {
          font-family: 'SquidBoy';
          src: url('/Fonts/SquidBoy.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'SquidBoy';
          src: url('/Fonts/SquidBoy-Bold.otf') format('opentype');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'HelveticaNeue';
          src: url('/fonts/HelveticaNeueRoman.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'HelveticaNeue';
          src: url('/fonts/HelveticaNeueBold.otf') format('opentype');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'GourmetEatery';
          src: url('/GourmetEatery.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'ParaFont';
          src: url('/ParaFont.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        /* DESKTOP TORN PAPER MASK */
        .organic-torn-mask {
          mask-image: url('/home-mask-desktop.svg');
          -webkit-mask-image: url('/home-mask-desktop.svg');
          mask-size: calc((100vw + 180px) / 4) 100%;
          -webkit-mask-size: calc((100vw + 180px) / 4) 100%;
          mask-repeat: no-repeat;
          -webkit-mask-repeat: no-repeat;
          mask-position: right center;
          -webkit-mask-position: right center;
        }

        /* MOBILE SVG TORN MASK */
        .mobile-torn-svg-mask {
          mask-image: url('/home-mask-mobile.svg');
          -webkit-mask-image: url('/home-mask-mobile.svg');
          mask-size: 100% 100%;
          -webkit-mask-size: 100% 100%;
          mask-repeat: no-repeat;
          -webkit-mask-repeat: no-repeat;
          mask-position: center bottom;
          -webkit-mask-position: center bottom;
        }

        @keyframes mobileRise {
          from { opacity: 0; transform: translate3d(0, 12px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }

        /* Mobile hero height = exactly the visible screen (dvh, with 100vh fallback).
           Page scrolling is locked in JS below, so there is nothing left to scroll to. */
        @media (max-width: 767px) {
          .hero-mobile-h {
            height: 100vh;
            height: 100dvh;
          }
        }

        @media (max-width: 767px) {
          .mobile-tap-card {
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
          }

          .mobile-rise {
            animation: mobileRise 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
            animation-delay: calc(var(--i, 0) * 80ms + 60ms);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mobile-rise { animation: none; }
        }
      `}</style>

      {/* 🎬 GLOBAL CORNER VIGNETTE SHADOW */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(0,0,0,0.3)_100%)] pointer-events-none z-[12]" />

      {/* 📌 HERO'S OWN NAVBAR */}
      {isHeroInView && (
        <header 
          className="absolute md:fixed top-[max(1.2rem,calc(env(safe-area-inset-top)+0.5rem))] md:top-12 left-0 w-screen max-w-full box-border z-[9999] px-2 sm:px-8 md:px-12 pointer-events-none border-0 outline-none transition-opacity duration-300"
        >
          <div className="w-full flex items-center justify-center relative min-h-11 md:min-h-[1px]">
            
            {/* CENTER: DESKTOP CAPSULE NAVIGATION */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center pointer-events-auto">
              <div className="relative bg-[#08080a] clean-pill pt-4 pb-3 px-4 rounded-lg overflow-hidden flex items-center justify-center shadow-lg border-0 outline-none">
                <div className="relative z-[2] flex items-center justify-center">
                  {NAV_ITEMS.map((item, idx) => {
                    const isActive = hoveredIndex === COLUMNS.findIndex(c => c.id === item.id);

                    return (
                      <React.Fragment key={item.id}>
                        <a 
                          href={ID_TO_PATH[item.id]} 
                          onClick={(e) => {
                            e.preventDefault();
                            if (onColumnClick) onColumnClick(item.id);
                          }}
                          onMouseEnter={() => handleMouseEnter(COLUMNS.findIndex(c => c.id === item.id))}
                          onMouseLeave={() => handleMouseLeave(COLUMNS.findIndex(c => c.id === item.id))}
                          style={{ fontFamily: "GourmetEatery, cursive, sans-serif" }}
                          className={`relative inline-flex items-center text-sm sm:text-base tracking-wide transition-all duration-200 cursor-pointer hover:text-[#FFC300] whitespace-nowrap px-1.5 ${
                            isActive ? 'text-[#FFC300]' : 'text-white'
                          }`}
                        >
                          <span className="leading-none pt-0.5">{item.label}</span>
                        </a>
                        {idx < NAV_ITEMS.length - 1 && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D42C2C] inline-block select-none shrink-0 mx-0.5" />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* MOBILE MENU TOGGLE - Shifted more to the left */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={isMobileMenuOpen}
              className="md:hidden absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 text-white bg-transparent p-2 cursor-pointer active:scale-90 transition-transform duration-150 touch-manipulation [-webkit-tap-highlight-color:transparent] pointer-events-auto border-0 outline-none"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

          </div>

          {/* MOBILE MENU */}
          {isMobileMenuOpen && (
            <>
              <div
                className="md:hidden fixed inset-0 z-[1] bg-black/60 backdrop-blur-sm pointer-events-auto"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
              />

              <div className="md:hidden pointer-events-auto absolute top-12 left-4 right-4 z-[2] bg-[#08080a] clean-pill rounded-[12px] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200 max-h-[75dvh] overflow-y-auto border-0 outline-none ring-1 ring-white/10">
                <nav className="relative z-[2] flex flex-col divide-y divide-white/10 px-2 py-1">
                  {NAV_ITEMS.map((item) => (
                    <a 
                      key={item.id}
                      href={ID_TO_PATH[item.id]}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsMobileMenuOpen(false);
                        if (onColumnClick) onColumnClick(item.id);
                      }}
                      style={{ fontFamily: "GourmetEatery, cursive, sans-serif" }}
                      className="flex items-center justify-between min-h-[50px] px-4 text-lg tracking-wider text-white transition-colors no-underline active:text-[#FFC300] touch-manipulation [-webkit-tap-highlight-color:transparent]"
                    >
                      <span className="leading-none pt-0.5">{item.label}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D42C2C] shrink-0" />
                    </a>
                  ))}
                </nav>
              </div>
            </>
          )}
        </header>
      )}
      
      {/* ================= DESKTOP LAYOUT ================= */}
      <div className="hidden md:block w-full h-full overflow-hidden relative">
        <div className="flex flex-row items-stretch w-[calc(100vw+180px)] h-full relative z-[1]">
          {COLUMNS.map((col, index) => {
            const zIndices = ['z-[4]', 'z-[3]', 'z-[2]', 'z-[1]'];
            const isTornCol = index < 3;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={col.id}
                style={{ width: 'calc((100vw + 180px) / 4)' }}
                className={`group relative h-full shrink-0 cursor-pointer overflow-hidden ${zIndices[index]} ${
                  isTornCol ? 'organic-torn-mask pr-[50px] -mr-[50px] [filter:drop-shadow(-15px_0_20px_rgba(0,0,0,0.6))]' : ''
                }`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => onColumnClick && onColumnClick(col.id)}
              >
                {!hasInteracted[index] && (
                  <img 
                    src={col.poster} 
                    alt={col.title}
                    className={`absolute inset-0 w-full h-full object-cover brightness-[0.75] contrast-[1.0] transition-all duration-700 z-[2] pointer-events-none ${
                      isHovered ? 'grayscale-0' : 'grayscale'
                    }`}
                  />
                )}

                <video
                  key={col.videoUrl}
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  src={col.videoUrl}
                  className={`absolute inset-0 w-full h-full object-cover contrast-[1.0] transition-all duration-700 ease-out z-0 ${
                    isHovered ? 'grayscale-0 brightness-[0.95] scale-[1.03]' : 'grayscale brightness-[0.75]'
                  }`}
                />

                <div 
                  className={`absolute inset-0 pointer-events-none z-[3] transition-opacity duration-700 ${isHovered ? 'opacity-0' : ''}`}
                  style={{ backgroundColor: '#2a0d0d', mixBlendMode: 'multiply', opacity: isHovered ? 0 : 0.18 }}
                />

                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-10 transition-opacity duration-500 ${isHovered ? 'opacity-40' : ''}`} />
                
                <div 
                  className="absolute inset-x-0 top-[52%] z-20 flex flex-col items-center justify-start text-center pointer-events-none mx-auto max-w-[85%] px-2"
                >
                  <h1 
                    style={{ 
                      fontFamily: "'SquidBoy', sans-serif", 
                      fontSize: 'clamp(2.0rem, 3.8vw, 4.0rem)',
                      letterSpacing: '0.01em',
                      lineHeight: '1.1'
                    }}
                    className={`drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] transition-all duration-300 mb-2.5 font-normal text-center w-full ${
                      isHovered ? 'text-[#FFC300]' : 'text-[#FFFFFF]'
                    }`}
                  >
                    {col.title}
                  </h1>

                  <p 
                    style={{ fontFamily: "'ParaFont', sans-serif", fontWeight: 'normal' }}
                    className={`text-md sm:text-md max-w-[160px] sm:max-w-[200px] leading-tight transition-colors duration-300 ${
                      isHovered ? 'text-[#FFFFFF]' : 'text-neutral-300'
                    }`}
                  >
                    {col.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================= MOBILE STACKED LAYOUT (COLORFUL THUMBNAILS) ================= */}
      <div
        className="hero-mobile-h md:hidden flex flex-col w-full overflow-hidden relative z-[1] box-border"
      >
        {COLUMNS.map((col, index) => {
          return (
            <div
              key={col.id}
              onClick={() => onColumnClick && onColumnClick(col.id)}
              className={`group mobile-tap-card relative w-full flex-1 min-h-0 cursor-pointer overflow-hidden shadow-xl my-[-5px] first:mt-0 last:mb-0 ${index < 3 ? 'mobile-torn-svg-mask' : ''}`}
              style={{ zIndex: 4 - index }}
            >
              {/* Colorful thumbnail with subtle brightness/contrast */}
              <img 
                src={col.poster} 
                alt={col.title}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.88] contrast-[1.05] z-[1] pointer-events-none transition-transform duration-500 group-active:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/20 pointer-events-none z-10" />
              
              <div
                className="mobile-rise absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-5"
                style={{ '--i': index }}
              >
                {/* Smaller, responsive text: scales with width, but also with screen height
                    so it never overflows a panel on short phones / landscape. */}
                <h1 
                  style={{ 
                    fontFamily: "'SquidBoy', sans-serif",
                    fontSize: 'clamp(1.4rem, min(6.4vw, 5.2dvh), 2.1rem)',
                    letterSpacing: '0.01em',
                    lineHeight: '1.1'
                  }}
                  className="text-[#FFC300] mb-1 drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] text-center w-full font-normal"
                >
                  {col.title}
                </h1>
                <p 
                  style={{ 
                    fontFamily: "'HelveticaNeue', sans-serif",
                    fontSize: 'clamp(0.68rem, min(2.9vw, 2.3dvh), 0.8rem)',
                    textWrap: 'balance'
                  }}
                  className="text-neutral-200 max-w-[80%] leading-snug drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                >
                  {col.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}