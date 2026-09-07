import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Editing', id: 'editing' },
  { label: 'Motion Design', id: 'motion' },
  { label: 'Direction', id: 'direction' },
  { label: 'About Me', id: 'about' }
];

export default function Navbar({ onNavigate, activeSection = 'editing' }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleWheel = (e) => {
      if (e.deltaY > 5) setIsVisible(false);
      else if (e.deltaY < -5) setIsVisible(true);
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
      `}</style>

      <header 
        className={`absolute md:fixed top-10 sm:top-12 md:top-14 left-0 w-screen max-w-full box-border z-[9999] px-4 sm:px-8 md:px-12 pointer-events-none transition-all duration-400 ease-out border-none outline-none ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[200%] opacity-0'
        }`}
      >
        {/* RELATIVE WRAPPER — the center pill is absolutely centered inside
            this, so it stays perfectly aligned regardless of whatever else
            (or nothing) sits to its left/right. */}
        <div className="w-full flex items-center justify-center relative min-h-[1px]">

          {/* CENTER: DESKTOP CAPSULE NAVIGATION — true horizontal center */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center pointer-events-auto">
            <div className="relative bg-[#D42C2C] clean-pill pt-3 pb-3 px-6 rounded-lg overflow-hidden flex items-center justify-center shadow-lg border-none outline-none">
              {/* NOISE OVERLAY */}
              <div 
                className="absolute inset-0 pointer-events-none z-[1] bg-[url('/noise.gif')] bg-repeat"
                style={{ opacity: 0.08, mixBlendMode: 'overlay' }}
              />

              {/* GAP ZEROED OUT */}
              <div className="relative z-[2] flex items-center justify-center">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeSection === item.id;

                  return (
                    <React.Fragment key={item.id}>
                      <a 
                        href={`#${item.id}`} 
                        onClick={(e) => {
                          e.preventDefault();
                          if (onNavigate) onNavigate(item.id);
                        }}
                        style={{ fontFamily: "GourmetEatery, cursive, sans-serif" }}
                        className={`relative inline-flex items-center text-sm sm:text-base tracking-wide transition-all duration-200 cursor-pointer text-[#FFFFFF] hover:text-[#FFC822] whitespace-nowrap capitalize px-1 ${
                          isActive ? 'text-[#FFC822] font-bold' : ''
                        }`}
                      >
                        <span className="leading-none pt-0.5">{item.label}</span>
                      </a>
                      {idx < NAV_ITEMS.length - 1 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFC822] inline-block select-none shrink-0 mx-0.5" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MOBILE MENU TOGGLE — pinned to the left on mobile only */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
            className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 bg-[#D42C2C] clean-pill text-white w-10 h-10 rounded-[6px] overflow-hidden flex items-center justify-center shadow-xl cursor-pointer active:scale-95 transition-transform duration-150 touch-manipulation [-webkit-tap-highlight-color:transparent] pointer-events-auto border-none outline-none"
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

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 z-[1] bg-black/50 backdrop-blur-sm pointer-events-auto"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <div className="md:hidden pointer-events-auto absolute top-16 left-4 right-4 z-[2] bg-[#D42C2C] clean-pill rounded-[8px] overflow-hidden p-6 shadow-2xl flex flex-col items-center justify-center text-center gap-4 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[75vh] overflow-y-auto border-none outline-none">
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
                      if (onNavigate) onNavigate(item.id);
                    }}
                    style={{ fontFamily: "GourmetEatery, cursive, sans-serif" }}
                    className={`text-lg sm:text-xl capitalize tracking-wider text-white hover:text-[#FFC822] transition-colors py-2 w-full no-underline active:text-[#FFC822] touch-manipulation [-webkit-tap-highlight-color:transparent] ${
                      activeSection === item.id ? 'text-[#FFC822] font-bold' : ''
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}