import React, { useRef } from 'react';

const COLUMNS = [
  { 
    id: 'editing', 
    title: 'Editing', 
    subtitle: 'Crafting stories that keep people watching.',
    videoUrl: '../HomeVideo1.mp4' 
  },
  { 
    id: 'motion', 
    title: 'Motion design', 
    subtitle: 'Adding motion that brings stories to life.',
    videoUrl: '../HomeVideo2.mp4' 
  },
  { 
    id: 'direction', 
    title: 'Direction', 
    subtitle: 'Turning ideas into visual experiences.',
    videoUrl: '../HomeVideo3.mp4' 
  },
  { 
    id: 'about', 
    title: 'About me', 
    subtitle: 'The person behind the projects.',
    videoUrl: '../HomeVideo1.mp4' 
  }
];

const SOCIAL_LINKS = [
  { 
    id: 'Instagram', 
    url: 'https://www.instagram.com/akshay__shri/?hl=en',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] sm:w-[26px] sm:h-[26px] fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  { 
    id: 'Gmail', 
    url: 'mailto:client@email.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] sm:w-[26px] sm:h-[26px] fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    )
  },
  { 
    id: 'YouTube', 
    url: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] sm:w-[26px] sm:h-[26px] fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    )
  }
];

export default function Hero({ onColumnClick }) {
  const videoRefs = useRef([]);
  const mobileVideoRefs = useRef([]);

  const handleMouseEnter = (index) => {
    const video = videoRefs.current[index];
    if (video) video.play().catch(() => {});
  };

  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index];
    if (video) video.pause();
  };

  return (
    <section className="w-full h-screen bg-[#08080a] overflow-hidden relative m-0 p-0 select-none">
      
      {/* 🎨 FONT & MASK STYLING */}
      <style>{`
        @font-face {
          font-family: 'RoseryStudio';
          src: url('/RoseryStudio-Regular.ttf') format('truetype');
          font-weight: normal;
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
          font-family: 'HelveticaNeue';
          src: url('/fonts/HelveticaNeueMedium.otf') format('opentype');
          font-weight: 500;
          font-style: normal;
          font-display: swap;
        }

        /* DESKTOP TORN PAPER MASK */
        .organic-torn-mask {
          mask-image: url('/home-mask-desktop.svg');
          -webkit-mask-image: url('/home-mask-desktop.svg');
          mask-size: auto 100vh;
          -webkit-mask-size: auto 100vh;
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
      `}</style>

      {/* 🎬 GLOBAL CORNER VIGNETTE SHADOW */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_45%,_rgba(0,0,0,0.85)_100%)] pointer-events-none z-[12]" />

      {/* 🎞️ NOISE GIF OVERLAY SET TO 0.05 */}
      <div 
        className="absolute inset-0 pointer-events-none z-[16] bg-[url('/noise.gif')] bg-repeat"
        style={{ opacity: 0.05, mixBlendMode: 'overlay' }}
      />

      {/* 📌 STATIC FIXED NAVBAR */}
      <header className="absolute top-3 left-0 w-full box-border z-[30] px-4 sm:px-8 md:px-12 pointer-events-none flex items-center justify-between">
        
        {/* LEFT: NAME LOGO */}
        <div 
          onClick={() => onColumnClick && onColumnClick('home')}
          className="pointer-events-auto flex items-center gap-1.5 select-none cursor-pointer group"
        >
          <span className="font-gourmet text-[#FFC822] text-xs sm:text-xl tracking-wide transition-colors duration-200 capitalize">
            Akshay shrivastav
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFFFFF] inline-block mb-0.5 animate-pulse" />
        </div>

        {/* CENTER: CAPSULE NAVIGATION (Curved rounded-md) */}
        <div className="pointer-events-auto bg-[#0A0B0C] border border-white/25 px-4 pt-4 pb-2.5 rounded-md hidden md:flex items-center justify-center gap-0 shadow-xl backdrop-blur-md">
          {COLUMNS.map((col, idx) => (
            <React.Fragment key={col.id}>
              <button
                onClick={() => onColumnClick && onColumnClick(col.id)}
                className="font-gourmet relative inline-flex items-center text-sm sm:text-base transition-all duration-200 cursor-pointer text-[#FFFFFF] hover:text-[#FFC822] bg-transparent border-none outline-none px-1.5"
              >
                <span className="leading-none">{col.title}</span>
              </button>
              {idx < COLUMNS.length - 1 && (
                <span className="text-[#FFC822] text-[10px] leading-none select-none pointer-events-none flex items-center -translate-y-0.5 mx-1">●</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* RIGHT: CONNECT BUTTON (Curved rounded-md) */}
        <div className="pointer-events-auto">
          <a
            href="https://www.instagram.com/akshay__shri/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="font-gourmet bg-[#0A0B0C] text-[#FFFFFF] hover:text-[#FFC822] border border-white/25 px-4 sm:px-5 h-10 sm:h-11 rounded-md text-xs sm:text-base flex items-center justify-center gap-1.5 transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 no-underline"
          >
            <span className="leading-none pt-0.5">Let's connect ↗</span>
          </a>
        </div>
      </header>
      
      {/* ================= DESKTOP LAYOUT ================= */}
      <div className="hidden md:block w-full h-full overflow-hidden relative">
        <div className="flex flex-row items-stretch w-[calc(100vw+180px)] h-full relative z-[1]">
          {COLUMNS.map((col, index) => {
            const zIndices = ['z-[4]', 'z-[3]', 'z-[2]', 'z-[1]'];
            const isTornCol = index < 3;
            const columnWidths = ['w-[24%]', 'w-[26%]', 'w-[24%]', 'w-[26%]'];

            return (
              <div
                key={col.id}
                className={`group relative h-full ${columnWidths[index]} shrink-0 min-w-0 cursor-pointer overflow-hidden ${zIndices[index]} ${
                  isTornCol ? 'organic-torn-mask pr-[50px] -mr-[50px] [filter:drop-shadow(-15px_0_20px_rgba(0,0,0,0.95))]' : ''
                }`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave(index)}
                onClick={() => onColumnClick && onColumnClick(col.id)}
              >
                <video
                  key={col.videoUrl}
                  ref={(el) => {
                    videoRefs.current[index] = el;
                    if (el) el.load();
                  }}
                  loop
                  muted
                  playsInline
                  preload="auto"
                  src={col.videoUrl}
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.55] contrast-[1.1] grayscale group-hover:grayscale-0 group-hover:brightness-[0.85] transition-all duration-700 ease-out group-hover:scale-[1.03] z-0"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-60" />
                
                <div className={`absolute inset-x-0 top-[58%] z-20 flex flex-col items-center justify-start text-center pointer-events-none mx-auto max-w-[95%] px-2 ${index === 0 ? '-translate-x-3' : ''}`}>
                  <h1 
                    style={{ 
                      fontFamily: "'RoseryStudio', var(--font-rosery), sans-serif", 
                      fontSize: 'clamp(1.8rem, 3.2vw, 3.4rem)',
                      letterSpacing: '0.03em'
                    }}
                    className="text-white uppercase tracking-tight leading-[1.0] drop-shadow-[0_8px_16px_rgba(0,0,0,0.95)] transition-all duration-300 group-hover:text-amber-300 mb-2.5 font-normal"
                  >
                    {col.title}
                  </h1>

                  <p 
                    style={{ fontFamily: "'HelveticaNeue', sans-serif", fontWeight: 'normal' }}
                    className="text-neutral-300 text-xs sm:text-sm max-w-[160px] sm:max-w-[200px] leading-tight transition-colors duration-300 group-hover:text-white"
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
      <div className="md:hidden flex flex-col w-full h-screen overflow-hidden relative z-[1]">
        {COLUMNS.map((col, index) => (
          <div
            key={col.id}
            onClick={() => onColumnClick && onColumnClick(col.id)}
            className={`relative w-full h-[26vh] cursor-pointer overflow-hidden shadow-2xl ${index !== 0 ? '-mt-8' : ''}`}
            style={{ zIndex: 10 - index }}
          >
            <div className="w-full h-full mobile-torn-svg-mask overflow-hidden absolute inset-0 filter drop-shadow-[0_-4px_8px_rgba(0,0,0,0.8)]">
              <video
                ref={(el) => {
                  mobileVideoRefs.current[index] = el;
                  if (el) el.play().catch(() => {});
                }}
                loop
                muted
                playsInline
                autoPlay
                preload="auto"
                src={col.videoUrl}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.55] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40 pointer-events-none z-10" />
            </div>
            
            {/* Content Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30 px-4">
              <h1 
                style={{ fontFamily: "'RoseryStudio', sans-serif" }}
                className="text-white text-xl uppercase tracking-tight leading-none mb-0.5 drop-shadow-[0_4px_8px_rgba(0,0,0,0.95)]"
              >
                {col.title}
              </h1>
              <p 
                style={{ fontFamily: "'HelveticaNeue', sans-serif" }}
                className="text-neutral-300 text-[10px] max-w-[180px] leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
              >
                {col.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 📌 STATIC FIXED FOOTER */}
      <footer className="absolute bottom-0 left-0 w-full box-border z-[30] px-3 sm:px-8 md:px-12 pointer-events-none flex items-end pb-3 sm:pb-10">
        <div className="w-full flex items-center justify-between md:justify-between justify-end relative">
          
          {/* 🟢 BOTTOM-LEFT: AVAILABLE FOR WORK BADGE (Hidden on mobile) */}
          <div className="font-gourmet pointer-events-auto hidden md:flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-5 h-10 sm:h-11 rounded-md bg-[#0a0a0c]/85 text-[#FFC822] border border-white/25 backdrop-blur-md shadow-xl cursor-pointer">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FFC822] animate-pulse shadow-[0_0_8px_#FFC822]" />
            <span className="capitalize text-[#FFC822] text-[11px] sm:text-lg leading-none pt-0.5">
              Available for work
            </span>
          </div>

          {/* 🌐 BOTTOM-RIGHT: SOCIAL LINKS CONTAINER */}
          <div className="flex items-center justify-center bg-[#0a0a0c]/85 border border-white/25 px-2.5 sm:px-4 h-10 sm:h-12 rounded-md shadow-xl backdrop-blur-md pointer-events-auto gap-2.5 sm:gap-4">
            {SOCIAL_LINKS.map((social, idx) => (
              <React.Fragment key={social.id}>
                <a 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={social.id}
                  className="text-white flex items-center justify-center no-underline transition-all duration-200 ease-out p-1 cursor-pointer hover:scale-125 hover:text-[#FFC822]"
                >
                  {social.icon}
                </a>
                {idx < SOCIAL_LINKS.length - 1 && (
                  <span className="text-[10px] text-[#FFC822]/60 select-none pointer-events-none">•</span>
                )}
              </React.Fragment>
            ))}
          </div>

        </div>
      </footer>

    </section>
  );
}