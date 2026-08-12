import React, { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Editing', id: 'editing' },
  { label: 'Motion design', id: 'motion' },
  { label: 'Direction', id: 'direction' },
  { label: 'About me', id: 'about' }
];

export default function Navbar({ onNavigate, activeSection = 'editing' }) {
  const [isVisible, setIsVisible] = useState(true);

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
      <div className="w-full flex items-center justify-between">
        
        {/* LEFT: NAME LOGO */}
        <a 
          href="/"
          onClick={handleHomeClick}
          className="pointer-events-auto flex items-center gap-1.5 select-none cursor-pointer group "
        >
          <span 
            className="font-gourmet text-[#144BFF] text-lg sm:text-xl tracking-wide transition-colors duration-200 hover:text-[#FFC822] capitalize"
          >
            Akshay shrivastav
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC822] inline-block mb-0.5 animate-pulse shadow-[0_0_6px_#144BFF]" />
        </a>

        {/* CENTER: CAPSULE NAVIGATION (TOP PADDING ADJUSTED) */}
        <div className="pointer-events-auto bg-[#144BFF] border border-white/20 px-6 pt-4 pb-2.5 rounded-xl flex items-center justify-center gap-2 shadow-xl backdrop-blur-md">
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
                  className={`font-gourmet relative inline-flex items-center text-sm sm:text-base transition-all duration-200 cursor-pointer text-[#FFFFFF] hover:text-[#FFC822] ${
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

        {/* RIGHT: CONNECT BUTTON */}
        <div className="pointer-events-auto">
          <a 
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('connect');
            }}
            className="font-gourmet bg-[#144BFF] hover:bg-[#0f3cd9] text-[#FFFFFF] hover:text-[#FFC822] border border-white/20 px-5 pt-3 pb-2.5 rounded-xl text-sm sm:text-base flex items-center gap-1.5 transition-all duration-300 shadow-xl cursor-pointer hover:scale-105"
          >
            <span className="leading-none">Let's connect ↗</span>
          </a>
        </div>

      </div>
    </header>
  );
}