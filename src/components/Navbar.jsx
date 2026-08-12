import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Editing', id: 'editing' },
  { label: 'Motion design', id: 'motion' },
  { label: 'Direction', id: 'direction' },
  { label: 'About me', id: 'about' }
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
    <header 
      className={`fixed top-4 left-0 w-screen max-w-full box-border z-[9999] px-4 sm:px-8 md:px-12 pointer-events-none transition-all duration-400 ease-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-[200%] opacity-0'
      }`}
    >
      <div className="w-full flex items-center justify-between relative">
        
        {/* LEFT: NAME LOGO */}
        <a 
          href="/"
          onClick={handleHomeClick}
          style={{ fontFamily: "'GourmetEatery', cursive, sans-serif" }}
          className="pointer-events-auto flex items-center gap-1.5 select-none cursor-pointer group"
        >
          <span className="text-[#144BFF] text-lg sm:text-xl tracking-wide transition-colors duration-200 hover:text-[#FFC822] capitalize">
            Akshay shrivastav
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC822] inline-block mb-0.5 animate-pulse shadow-[0_0_6px_#144BFF]" />
        </a>

        {/* CENTER: DESKTOP CAPSULE NAVIGATION */}
        <div className="hidden md:flex pointer-events-auto bg-[#144BFF] border border-white/20 px-6 pt-4 pb-2.5 rounded-xl items-center justify-center gap-2 shadow-xl backdrop-blur-md">
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
                  style={{ fontFamily: "'GourmetEatery', cursive, sans-serif" }}
                  className={`relative inline-flex items-center text-sm sm:text-base transition-all duration-200 cursor-pointer text-[#FFFFFF] hover:text-[#FFC822] ${
                    isActive ? 'text-[#FFC822] font-bold' : ''
                  }`}
                >
                  <span className="leading-none">{item.label}</span>
                </a>

                {idx < NAV_ITEMS.length - 1 && (
                  <span className="text-[#FFC822] text-[10px] leading-none select-none pointer-events-none flex items-center -translate-y-0.5">●</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* RIGHT: DESKTOP CONNECT BUTTON & MOBILE HAMBURGER TOGGLE */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('connect');
            }}
            style={{ fontFamily: "'GourmetEatery', cursive, sans-serif" }}
            className="hidden sm:flex bg-[#144BFF] hover:bg-[#0f3cd9] text-[#FFFFFF] hover:text-[#FFC822] border border-white/20 px-5 pt-3 pb-2.5 rounded-xl text-sm sm:text-base items-center gap-1.5 transition-all duration-300 shadow-xl cursor-pointer hover:scale-105"
          >
            <span className="leading-none">Let's connect ↗</span>
          </a>

          {/* MOBILE HAMBURGER BUTTON */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden bg-[#144BFF] border border-white/20 text-white w-11 h-11 rounded-xl flex items-center justify-center shadow-xl cursor-pointer"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* MOBILE DROPDOWN MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden pointer-events-auto absolute top-16 left-4 right-4 bg-[#144BFF] border border-white/20 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center text-center gap-4 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-200">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                if (onNavigate) onNavigate(item.id);
              }}
              style={{ fontFamily: "'GourmetEatery', cursive, sans-serif" }}
              className={`text-xl text-white hover:text-[#FFC822] transition-colors py-1 ${
                activeSection === item.id ? 'text-[#FFC822] font-bold' : ''
              }`}
            >
              {item.label}
            </a>
          ))}
          <hr className="border-white/20 w-full my-1" />
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              setIsMobileMenuOpen(false);
              if (onNavigate) onNavigate('connect');
            }}
            style={{ fontFamily: "'GourmetEatery', cursive, sans-serif" }}
            className="text-xl text-[#FFC822] flex items-center justify-center gap-2 py-1"
          >
            <span>Let's connect ↗</span>
          </a>
        </div>
      )}
    </header>
  );
}