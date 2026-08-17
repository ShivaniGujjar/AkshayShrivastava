import React from 'react';

const SOCIAL_LINKS = [
  { id: 'Instagram', name: 'INSTAGRAM', url: 'https://www.instagram.com/akshay__shri/?hl=en' },
  { id: 'Gmail', name: 'MAIL', url: 'mailto:client@email.com' }
];

export default function Footer() {
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

      <footer className="fixed bottom-8 right-5 sm:right-8 md:right-12 pointer-events-none z-[999] flex justify-end items-end">
        
        {/* RIGHT PILL: Cactus Jack Font + Noise Texture */}
        <div 
          className="relative pointer-events-auto bg-[#3068D3] text-white pt-4 px-3 py-3 rounded-lg flex items-center gap-4 shadow-lg overflow-hidden"
        >
          {/* 🎞️ NOISE TEXTURE OVERLAY */}
          <div 
            className="absolute inset-0 pointer-events-none z-[1] bg-[url('/noise.gif')] bg-repeat"
            style={{ opacity: 0.08, mixBlendMode: 'overlay' }}
          />

          <div className="relative z-[2] flex items-center gap-4">
            {SOCIAL_LINKS.map((link, idx) => (
              <React.Fragment key={link.id}>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-[#FFC822] transition-colors text-sm sm:text-base uppercase tracking-wider leading-none flex items-center"
                  style={{ fontFamily: "GourmetEatery, cursive, sans-serif" }}
                >
                  {link.name}
                </a>
                {idx < SOCIAL_LINKS.length - 1 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC822] inline-block select-none self-center shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}