import React from 'react';

const DEFAULT_BRANDS = [
  "/waywen.webp",
  "/MastersUnion.jpg",
  "/frido.avif",
  "/webveda.avif",
  "/kraftobench.webp"
];

const DEFAULT_TESTIMONIALS = [
  {
    quote: "Retention graphs spiked by 42% after Akshay redid our video pacing! Absolute editing wizard.",
    handle: "@waywen_official",
    role: "FOUNDER",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Brought our podcast clips to viral tier status with incredible visual energy and pacing.",
    handle: "@mastersunion",
    role: "MEDIA LEAD",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "High-energy cuts, slick animation overlays, sound design on point, and super fast turnarounds.",
    handle: "@edutainmenthub",
    role: "CREATOR",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Remarkable directional clarity on set and top-tier execution in post-production.",
    handle: "@medianetwork",
    role: "EXECUTIVE PRODUCER",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80"
  }
];

const duplicateList = (arr, count = 6) => {
  let output = [];
  for (let i = 0; i < count; i++) {
    output = [...output, ...arr];
  }
  return output;
};

export default function SocialProof({ brands = DEFAULT_BRANDS, testimonials = DEFAULT_TESTIMONIALS }) {
  return (
    <section className="w-full relative overflow-hidden pt-4 pb-12 sm:pt-8 sm:pb-20 select-none bg-[#FFFCFB]" style={{ fontFamily: "'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      
      {/* 🎨 ANIMATION STYLING */}
      <style>{`
        @keyframes slowSmoothMarqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }

        @keyframes slowSmoothMarqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        .animate-marquee-slow-left {
          display: inline-flex;
          white-space: nowrap;
          animation: slowSmoothMarqueeLeft 200s linear infinite;
        }

        .animate-marquee-slow-right {
          display: inline-flex;
          white-space: nowrap;
          animation: slowSmoothMarqueeRight 200s linear infinite;
        }

        .animate-marquee-slow-left:hover,
        .animate-marquee-slow-right:hover {
          animation-play-state: paused;
        }

        @font-face {
          font-family: 'GenericFont';
          src: url('/generic.woff2') format('woff2');
          font-display: swap;
        }

        @font-face {
          font-family: 'Talina';
          src: url('/Talina-Regular.ttf') format('truetype');
          font-display: swap;
        }
      `}</style>

      {/* ────────────────── 1. WORKED WITH SECTION ────────────────── */}
      {/* Sirf yahan margin (mb) ko 0 kiya hai taaki gap khatam ho jaye */}
      <div className="w-full relative overflow-hidden mb-0 text-center z-10">
        <div className="inline-flex flex-col items-center mb-4 sm:mb-6 px-4">
          <h3 
            style={{ fontFamily: "GenericFont, sans-serif", letterSpacing: '0.4px', fontWeight: 400 }}
            className="text-xl sm:text-4xl m-0 text-[#3068D3] leading-tight"
          >
            Worked With
          </h3>
        </div>

        <div className="w-full overflow-hidden py-2 mt-2 sm:py-3 ">
          <div className="animate-marquee-slow-left gap-10 sm:gap-16 w-max items-center">
            {duplicateList(brands).map((logoUrl, idx) => (
              <div 
                key={`brand-logo-${idx}`} 
                className="inline-flex items-center justify-center shrink-0 h-10 sm:h-14"
              >
                <img 
                  src={logoUrl} 
                  alt="Brand Logo" 
                  className="h-full w-auto object-contain" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────── 2. TESTIMONIALS SECTION (AVATAR STYLE) ────────────────── */}
      {/* Yahan negative margin (-mt-4) lagaya hai aur top padding (pt) thodi kam ki hai */}
      <div className="relative w-full -mt-8 sm:-mt-20 pt-16 pb-32 sm:pt-20 sm:pb-48 flex flex-col items-center justify-center overflow-hidden">
        
        {/* 🟦 BLUE TORN PAPER BACKGROUND */}
        <div 
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover pointer-events-none z-0"
          style={{ backgroundImage: `url('/testimonial.png')` }}
        />

        {/* Header */}
        <div className="relative z-[15] text-center mb-8 sm:mb-4 pt-20 pb-2 sm:pt-26 px-2">
          <h2 
            style={{ fontFamily: "GenericFont, sans-serif", letterSpacing: '0.4px', fontWeight: 300 }}
            className="text-[40px] mt-6 m-0 text-[#FFFFFF] leading-tight drop-shadow-md pt-2"
          >
            Testimonial
          </h2>

          <p 
            className="text-[#FFFFFF]/95 text-xs sm:text-base mt-1 sm:mt-2 font-medium"
          >
            What clients say about my work
          </p>
          
        </div>

        {/* TICKER CARDS WRAPPER */}
        <div className="w-full overflow-hidden mb-8 pb-4 py-0 sm:py-2 relative z-[15]">
          <div className="animate-marquee-slow-right gap-12 sm:gap-20 w-max items-center">
            {duplicateList(testimonials).map((testi, idx) => (
              <div 
                key={`testi-${idx}`} 
                className="relative text-[#FFFFFF] w-[280px] sm:w-[400px] px-4 sm:px-6 inline-flex flex-col items-center text-center justify-between shrink-0 whitespace-normal"
              >
                {/* Creator Avatar */}
                <div className="mb-4 sm:mb-5">
                  <img 
                    src={testi.avatar} 
                    alt={testi.handle} 
                    className="w-8 h-8 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white/30 shadow-md mx-auto"
                  />
                </div>

                {/* Handle & Role */}
                <div className="mb-4 sm:mb-5">
                  <h4 
                    style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '0.5px' }}
                    className="text-white text-base sm:text-xl m-0 drop-shadow"
                  >
                    {testi.handle}
                  </h4>
                  <p 
                    style={{ letterSpacing: '0.5px', fontWeight: 600 }}
                    className="text-white/70 text-[11px] sm:text-sm uppercase m-0 mt-1"
                  >
                    {testi.role}
                  </p>
                </div>

                {/* Quote Text */}
                <p 
                  style={{ letterSpacing: '-0.1px', fontWeight: 300 }}
                  className="text-white/95 text-sm sm:text-base leading-relaxed m-0"
                >
                  "{testi.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}