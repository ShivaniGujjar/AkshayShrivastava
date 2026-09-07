import React, { useState, useEffect } from 'react';

const SOCIAL_LINKS = [
  { id: 'Instagram', name: 'Instagram', url: 'https://www.instagram.com/akshay__shri/?hl=en' },
  { id: 'Gmail', name: 'Mail', url: 'mailto:client@email.com' },
  { id: 'LinkedIn', name: 'Linkedin', url: 'https://www.linkedin.com/in/your-profile-here' }
];

export default function Footer() {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      
      const distanceFromBottom = fullHeight - (scrollY + viewportHeight);
      if (distanceFromBottom < 120) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      `}</style>

      {/* "Contact Now" text with responsive sizing to prevent awkward breaking on mobile */}
      <div className={`fixed z-[998] left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-500 ease-out ${
        isAtBottom ? 'bottom-20 sm:bottom-28 opacity-100 scale-100' : 'bottom-16 opacity-0 scale-95'
      } flex flex-col items-center justify-center w-full px-4 text-center`}>
        <a 
          href="mailto:client@email.com"
          style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '1px' }}
          className="text-[#D42C2C] hover:text-[#b02222] transition-colors text-2xl xs:text-3xl sm:text-5xl md:text-6xl tracking-wide leading-none drop-shadow-md cursor-pointer pointer-events-auto no-underline whitespace-nowrap"
        >
          Contact Now
        </a>
      </div>

      {/* Social Links Pill transitioning from bottom-right to bottom-center */}
      <footer className={`fixed z-[999] pointer-events-none transition-all duration-500 ease-out ${
        isAtBottom 
          ? 'bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2' 
          : 'bottom-6 sm:bottom-8 right-4 sm:right-8 md:right-12'
      } flex justify-center items-center`}>
        <div 
          className="relative pointer-events-auto bg-[#D42C2C] text-white pt-2 pb-2 px-3 sm:pt-2.5 sm:pb-2.5 sm:px-4 rounded-lg flex items-center justify-center shadow-xl overflow-hidden transition-all duration-300"
        >
          <div 
            className="absolute inset-0 pointer-events-none z-[1] bg-[url('/noise.gif')] bg-repeat"
            style={{ opacity: 0.08, mixBlendMode: 'overlay' }}
          />

          <div className="relative z-[2] flex items-center justify-center">
            {SOCIAL_LINKS.map((link, idx) => (
              <React.Fragment key={link.id}>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-[#FFC822] transition-colors text-[11px] xs:text-xs sm:text-sm md:text-base capitalize tracking-wide leading-none flex items-center px-1"
                  style={{ fontFamily: "GourmetEatery, cursive, sans-serif" }}
                >
                  <span className="leading-none pt-0.5">{link.name}</span>
                </a>
                {idx < SOCIAL_LINKS.length - 1 && (
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#FFC822] inline-block select-none shrink-0 mx-0.5" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}