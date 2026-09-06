import React, { useState, useRef, useEffect } from 'react';

const COLUMNS = [
  { 
    id: 'editing', 
    title: 'Editing', 
    videoUrl: 'https://akshayshrivastava.com/videos/EditingMain.mp4',
    poster: 'https://akshayshrivastava.com/images/EditingMain.png'
  },
  { 
    id: 'motion', 
    title: 'Motion Design', 
    videoUrl: 'https://akshayshrivastava.com/videos/MotionMain.mp4',
    poster: 'https://akshayshrivastava.com/images/MotionMain.png'
  },
  { 
    id: 'direction', 
    title: 'Direction', 
    videoUrl: 'https://akshayshrivastava.com/videos/DirectionMain.mp4',
    poster: 'https://akshayshrivastava.com/images/DirectionMain.png'
  },
  { 
    id: 'about', 
    title: 'About Me', 
    videoUrl: 'https://akshayshrivastava.com/videos/AboutMain.mp4',
    poster: 'https://akshayshrivastava.com/images/AboutMain.png'
  }
];

const NAV_ITEMS = [
  { label: 'Editing', id: 'editing' },
  { label: 'Motion Design', id: 'motion' },
  { label: 'Direction', id: 'direction' },
  { label: 'About Me', id: 'about' }
];

const SOCIAL_LINKS = [
  { id: 'Instagram', name: 'Instagram', url: 'https://www.instagram.com/akshay__shri/?hl=en' },
  { id: 'Gmail', name: 'Gmail', url: 'mailto:client@email.com' },
  { id: 'LinkedIn', name: 'Linkedin', url: 'https://www.linkedin.com/in/your-profile-here' }
];

/*
  COLOR-ROLE CONTRACT (keep this disciplined everywhere in the file):
  - #08080a (black)  -> base/background only
  - #FFFFFF (white)  -> default resting text
  - #D42C2C (red)    -> resting-state accent (nav labels, links)
  - #FFC300 (yellow) -> ACTIVE / HOVER state only, never resting
  Never introduce a 5th "loud" color via an uncontrolled image asset —
  every poster/video gets the same DUOTONE_TINT treatment below so the
  imagery and the UI chrome read as one palette instead of two.
*/

export default function Hero({ onColumnClick }) {
  const videoRefs = useRef([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hasInteracted, setHasInteracted] = useState({});
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 5) setIsNavbarVisible(false);
      else if (e.deltaY < -5) setIsNavbarVisible(true);
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prevOverflow; };
    }
  }, [isMobileMenuOpen]);

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
    <section className="w-full h-dvh md:h-screen bg-[#08080a] overflow-hidden relative m-0 p-0 select-none">
      
      {/* 🎨 FONT STYLING — consolidated to 2 families: SquidBoy (display/personality)
          and HelveticaNeue (everything else: nav, footer, subtitles).
          Dropped GourmetEatery + RoseryStudio — unused/competing voices. */}
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

        @media (max-width: 767px) {
          .mobile-tap-card {
            -webkit-tap-highlight-color: transparent;
            touch-action: manipulation;
          }
        }
      `}</style>

      {/* 🎬 GLOBAL CORNER VIGNETTE SHADOW */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_55%,_rgba(0,0,0,0.3)_100%)] pointer-events-none z-[12]" />

      {/* 🎞️ NOISE GIF OVERLAY */}
      <div 
        className="absolute inset-0 pointer-events-none z-[16] bg-[url('/noise.gif')] bg-repeat"
        style={{ opacity: 0.012, mixBlendMode: 'overlay' }}
      />

      {/* 📌 RENDERED NAVBAR */}
      <header 
        className={`absolute md:fixed top-8 left-0 w-screen max-w-full box-border z-[9999] px-4 sm:px-8 md:px-12 pointer-events-none transition-all duration-400 ease-out ${
          isNavbarVisible ? 'translate-y-0 opacity-100' : '-translate-y-[200%] opacity-0'
        }`}
      >
        <div className="w-full flex items-center justify-center relative">
          
          {/* CENTER: DESKTOP CAPSULE NAVIGATION */}
          <div className="hidden md:flex items-center justify-center pointer-events-auto mx-auto">
            <div className="relative bg-[#08080a] clean-pill pt-3 px-6 py-2.5 rounded-lg overflow-hidden flex items-center justify-center gap-3 shadow-lg" style={{ border: 'none', outline: 'none' }}>
              <div 
                className="absolute inset-0 pointer-events-none z-[1] bg-[url('/noise.gif')] bg-repeat"
                style={{ opacity: 0.08, mixBlendMode: 'overlay' }}
              />

              <div className="relative z-[2] flex items-center justify-center gap-3">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = hoveredIndex === COLUMNS.findIndex(c => c.id === item.id);

                  return (
                    <React.Fragment key={item.id}>
                      <a 
                        href={`#${item.id}`} 
                        onClick={(e) => {
                          e.preventDefault();
                          if (onColumnClick) onColumnClick(item.id);
                        }}
                        onMouseEnter={() => handleMouseEnter(COLUMNS.findIndex(c => c.id === item.id))}
                        onMouseLeave={() => handleMouseLeave(COLUMNS.findIndex(c => c.id === item.id))}
                        style={{ fontFamily: "GourmetEatery, cursive, sans-serif" }}
                        className={`relative inline-flex items-center text-sm sm:text-base tracking-wide transition-all duration-200 cursor-pointer hover:text-[#FFC300] whitespace-nowrap ${
                          isActive ? 'text-[#FFC300]' : 'text-white'
                        }`}
                      >
                        <span className="leading-none pt-0.5">{item.label}</span>
                      </a>
                      {idx < NAV_ITEMS.length - 1 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D42C2C] inline-block select-none shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MOBILE MENU TOGGLE */}
          <div className="flex items-center justify-center w-full md:hidden pointer-events-auto">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={isMobileMenuOpen}
              className="relative md:hidden bg-[#08080a] clean-pill text-[#D42C2C] w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-xl cursor-pointer active:scale-95 transition-transform duration-150 touch-manipulation [-webkit-tap-highlight-color:transparent]"
              style={{ border: 'none', outline: 'none' }}
            >
              <div 
                className="absolute inset-0 pointer-events-none z-[1] bg-[url('/noise.gif')] bg-repeat"
                style={{ opacity: 0.08, mixBlendMode: 'overlay' }}
              />
              <svg className="relative z-[2] w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 z-[1] bg-black/50 pointer-events-auto"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <div className="md:hidden pointer-events-auto absolute top-14 left-4 right-4 z-[2] bg-[#08080a] clean-pill rounded-xl overflow-hidden p-6 shadow-2xl flex flex-col items-center justify-center text-center gap-4 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200 max-h-[75vh] overflow-y-auto" style={{ border: 'none', outline: 'none' }}>
              <div 
                className="absolute inset-0 pointer-events-none z-[1] bg-[url('/noise.gif')] bg-repeat"
                style={{ opacity: 0.08, mixBlendMode: 'overlay' }}
              />
              <div className="relative z-[2] w-full flex flex-col items-center gap-4">
                {NAV_ITEMS.map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMobileMenuOpen(false);
                      if (onColumnClick) onColumnClick(item.id);
                    }}
                    style={{ fontFamily: "GourmetEatery, cursive, sans-serif" }}
                    className="text-lg sm:text-xl tracking-wider text-white hover:text-[#FFC300] transition-colors py-2 w-full no-underline active:text-[#FFC300] touch-manipulation [-webkit-tap-highlight-color:transparent]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </header>
      
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
                className={`group relative h-full w-[25%] shrink-0 min-w-0 cursor-pointer overflow-hidden ${zIndices[index]} ${
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

                {/* DUOTONE TINT — every column gets the same warm-black cast so no
                    single poster (e.g. the Motion Design grid) can introduce an
                    uncontrolled color that fights the red/yellow accent system.
                    Fades out on hover (from the column itself OR the matching navbar item) along with the grayscale. */}
                <div 
                  className={`absolute inset-0 pointer-events-none z-[3] transition-opacity duration-700 ${isHovered ? 'opacity-0' : ''}`}
                  style={{ backgroundColor: '#2a0d0d', mixBlendMode: 'multiply', opacity: isHovered ? 0 : 0.18 }}
                />

                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none z-10 transition-opacity duration-500 ${isHovered ? 'opacity-40' : ''}`} />
                
                <div 
                  className={`absolute inset-x-0 top-[58%] z-20 flex flex-col items-center justify-start text-center pointer-events-none mx-auto max-w-[90%] px-2 ${
                    index === 0 ? '-translate-x-3' : ''
                  } ${index === 3 ? '-translate-x-4' : ''}`}
                >
                  <h1 
                    style={{ 
                      fontFamily: "'SquidBoy', sans-serif", 
                      fontSize: 'clamp(1.8rem, 3.4vw, 3.6rem)',
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
                    style={{ fontFamily: "'HelveticaNeue', sans-serif", fontWeight: 'normal' }}
                    className={`text-xs sm:text-sm max-w-[160px] sm:max-w-[200px] leading-tight transition-colors duration-300 ${
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
      
      {/* ================= MOBILE STACKED LAYOUT ================= */}
      <div className="md:hidden flex flex-col w-full h-dvh overflow-hidden relative z-[1]">
        {COLUMNS.map((col, index) => {
          return (
            <div
              key={col.id}
              onClick={() => onColumnClick && onColumnClick(col.id)}
              className={`mobile-tap-card active:brightness-90 relative w-full h-[25dvh] cursor-pointer overflow-hidden shadow-xl my-[-6px] first:mt-0 ${index < 3 ? 'mobile-torn-svg-mask' : ''}`}
              style={{
                zIndex: 4 - index,
                paddingBottom: index === COLUMNS.length - 1 ? 'env(safe-area-inset-bottom)' : undefined
              }}
            >
              <img 
                src={col.poster} 
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover object-center brightness-[0.75] contrast-[1.0] grayscale z-[1] pointer-events-none"
              />

              {/* Same duotone tint on mobile for consistency */}
              <div 
                className="absolute inset-0 pointer-events-none z-[2]"
                style={{ backgroundColor: '#2a0d0d', mixBlendMode: 'multiply', opacity: 0.18 }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-black/25 pointer-events-none z-10" />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-20 px-4">
                <h1 
                  style={{ 
                    fontFamily: "'SquidBoy', sans-serif",
                    fontSize: 'clamp(1rem, 4.5vw, 1.4rem)',
                    letterSpacing: '0.01em',
                    lineHeight: '1.1'
                  }}
                  className="text-[#FFFFFF] mb-0.5 drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-center w-full font-normal"
                >
                  {col.title}
                </h1>
                <p 
                  style={{ 
                    fontFamily: "'HelveticaNeue', sans-serif",
                    fontSize: 'clamp(0.62rem, 2.6vw, 0.78rem)'
                  }}
                  className="text-neutral-300 max-w-[85%] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                >
                  {col.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ================= CLEAN CENTERED FOOTER ================= */}
      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 pointer-events-none z-[999] flex justify-center items-center">
        <div 
          className="relative pointer-events-auto bg-[#08080a] text-[#D42C2C] pt-3 px-5 py-2 rounded-lg flex items-center gap-3 shadow-lg overflow-hidden"
        >
          <div 
            className="absolute inset-0 pointer-events-none z-[1] bg-[url('/noise.gif')] bg-repeat"
            style={{ opacity: 0.08, mixBlendMode: 'overlay' }}
          />

          <div className="relative z-[2] flex items-center gap-3">
            {SOCIAL_LINKS.map((link, idx) => (
              <React.Fragment key={link.id}>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-[#FFC300] transition-colors text-sm sm:text-base tracking-wider leading-none flex items-center"
                  style={{ fontFamily: "GourmetEatery, cursive, sans-serif" }}
                >
                  {link.name}
                </a>
                {idx < SOCIAL_LINKS.length - 1 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D42C2C] inline-block select-none self-center shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </footer>

    </section>
  );
}