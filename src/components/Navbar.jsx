import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Editing', id: 'editing' },
  { label: 'Motion', id: 'motion' },
  { label: 'Direction', id: 'direction' },
  { label: 'About', id: 'about' }
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

  const handleHomeClick = (e) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate('home');
    } else {
      window.location.href = '/';
    }
  };

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
        className={`absolute md:fixed top-8 left-0 w-screen max-w-full box-border z-[9999] px-4 sm:px-8 md:px-12 pointer-events-none transition-all duration-400 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[200%] opacity-0'
        }`}
      >
        {/* 3-COLUMN GRID LAYOUT (Exact Filmkid Structure) */}
        <div className="w-full grid grid-cols-2 md:grid-cols-3 items-center relative">
          
          {/* LEFT: AKSHAY SHRIVASTAV NAME WITH YELLOW DOT */}
          <div className="flex items-center justify-start">
            <a 
              href="/"
              onClick={handleHomeClick}
              style={{ fontFamily: "GourmetEatery, cursive, sans-serif" }}
              className="pointer-events-auto flex items-center gap-2 select-none cursor-pointer group no-underline"
            >
              <span className=" text-[#3068D3] text-base sm:text-xl tracking-wide transition-colors duration-200 hover:text-[#FFC822]  drop-shadow-md">
                Akshay Shrivastava
              </span>
              {/* <span className="w-2 h-2 rounded-full bg-[#FFC822] inline-block mb-0.5 animate-pulse " /> */}
            </a>
          </div>

          {/* CENTER: DESKTOP CAPSULE NAVIGATION (Exact White Dots & Proportions) */}
          <div className="hidden md:flex items-center justify-center pointer-events-auto">
            <div className="relative bg-[#3068D3] clean-pill pt-4 px-8 py-3 rounded-lg overflow-hidden flex items-center justify-center gap-5 shadow-lg">
              {/* NOISE OVERLAY */}
              <div 
                className="absolute inset-0 pointer-events-none z-[1] bg-[url('/noise.gif')] bg-repeat"
                style={{ opacity: 0.08, mixBlendMode: 'overlay' }}
              />

              <div className="relative z-[2] flex items-center justify-center gap-4">
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
                        className={`relative inline-flex items-center text-sm sm:text-base tracking-wide transition-all duration-200 cursor-pointer text-[#FFFFFF] hover:text-[#FFC822] whitespace-nowrap uppercase ${
                          isActive ? 'text-[#FFC822] font-bold' : ''
                        }`}
                      >
                        <span className="leading-none pt-0.5">{item.label}</span>
                      </a>
                      {idx < NAV_ITEMS.length - 1 && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#FFC822] inline-block select-none shrink-0" />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT: TWO SEPARATE PILLS (CART & LOG IN) + MOBILE MENU */}
          <div className="flex items-center justify-end gap-2.5 pointer-events-auto">
            
            
              
            {/* CONNECT BUTTON */}
            <a
              href="#login"
              onClick={(e) => { e.preventDefault(); alert("Log In clicked!"); }}
              style={{ fontFamily: "GourmetEatery, cursive, sans-serif" }}
              className="relative bg-[#3068D3] hover:text-[#FFC822] text-white clean-pill pt-4 px-5 py-2.5 rounded-lg overflow-hidden text-xs sm:text-sm uppercase tracking-wide hidden sm:flex items-center gap-2 transition-all duration-300 shadow-lg cursor-pointer no-underline shrink-0"
            >
              <div 
                className="absolute inset-0 pointer-events-none z-[1] bg-[url('/noise.gif')] bg-repeat"
                style={{ opacity: 0.08, mixBlendMode: 'overlay' }}
              />
              
              <span className="relative z-[2] leading-none pt-0.5">Let's Connect</span>
            </a>

            {/* MOBILE HAMBURGER BUTTON */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
              aria-expanded={isMobileMenuOpen}
              className="relative md:hidden bg-[#3068D3] clean-pill text-white w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center shadow-xl cursor-pointer active:scale-95 transition-transform duration-150 touch-manipulation [-webkit-tap-highlight-color:transparent]"
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

            <div className="md:hidden pointer-events-auto absolute top-14 left-4 right-4 z-[2] bg-[#3068D3] clean-pill rounded-xl overflow-hidden p-6 shadow-2xl flex flex-col items-center justify-center text-center gap-4 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200 max-h-[75vh] overflow-y-auto">
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
                    style={{ fontFamily: "'CactusJack', cursive, sans-serif" }}
                    className={`text-lg sm:text-xl uppercase tracking-wider text-white hover:text-[#FFC822] transition-colors py-2 w-full no-underline active:text-[#FFC822] touch-manipulation [-webkit-tap-highlight-color:transparent] ${
                      activeSection === item.id ? 'text-[#FFC822] font-bold' : ''
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <hr className="border-white/20 w-full my-1" />
                
                
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}