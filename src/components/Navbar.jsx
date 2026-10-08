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

  if (activeSection === 'hero') {
    return null;
  }

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
        className={`fixed top-4 sm:top-8 md:top-12 left-0 w-full box-border z-[9999] px-3 sm:px-8 md:px-12 pointer-events-none transition-all duration-400 ease-out border-none outline-none bg-transparent ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[200%] opacity-0'
        }`}
      >
        <div className="w-full flex items-center justify-between md:justify-center relative min-h-[44px]">

          {/* MOBILE / LEFT: LOGO */}
          <div className="flex items-center pointer-events-auto md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigate) onNavigate('hero');
              }}
              className="flex items-center shrink-0 cursor-pointer"
              aria-label="Home"
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="h-8 sm:h-10 md:h-12 w-auto select-none pointer-events-none"
                draggable="false"
              />
            </a>
          </div>

          {/* CENTER: DESKTOP CAPSULE NAVIGATION */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center pointer-events-auto">
            <div className="relative bg-[#D42C2C] clean-pill pt-3 pb-3 px-6 rounded-lg overflow-hidden flex items-center justify-center shadow-lg border-none outline-none">
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
                        className={`relative inline-flex items-center text-sm sm:text-base tracking-wide transition-all duration-200 cursor-pointer text-[#FFFFFF] hover:text-[#FFC822] whitespace-nowrap capitalize px-1.5 ${
                          isActive ? 'text-[#FFC822] font-bold' : ''
                        }`}
                      >
                        <span className="leading-none pt-0.5">{item.label}</span>
                      </a>
                      {idx < NAV_ITEMS.length - 1 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFC822] inline-block select-none shrink-0 mx-1" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* MOBILE / RIGHT: SIMPLE CLEAN HAMBURGER TOGGLE */}
          <div className="flex items-center pointer-events-auto md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={isMobileMenuOpen}
              className="text-white bg-transparent p-2 cursor-pointer active:scale-90 transition-transform duration-150 touch-manipulation [-webkit-tap-highlight-color:transparent] pointer-events-auto border-0 outline-none"
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

        </div>

        {/* MOBILE MENU DROPDOWN */}
        {isMobileMenuOpen && (
          <>
            <div
              className="md:hidden fixed inset-0 z-[1] bg-black/70 backdrop-blur-md pointer-events-auto"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <div className="md:hidden pointer-events-auto absolute top-16 left-4 right-4 z-[2] bg-[#D42C2C] clean-pill rounded-[8px] overflow-hidden p-6 shadow-2xl flex flex-col items-center justify-center text-center gap-4 animate-in fade-in slide-in-from-top-4 duration-200 max-h-[75vh] overflow-y-auto border-none outline-none">
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