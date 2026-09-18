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
    <section
      className="w-full relative overflow-hidden pt-6 pb-10 sm:pt-10 sm:pb-24 select-none bg-[#FFFCFB]"
      style={{ fontFamily: "'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
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
          animation: slowSmoothMarqueeLeft 60s linear infinite;
        }
        .animate-marquee-slow-right {
          display: inline-flex;
          white-space: nowrap;
          animation: slowSmoothMarqueeRight 70s linear infinite;
        }
        .animate-marquee-slow-left:hover,
        .animate-marquee-slow-right:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-slow-left, .animate-marquee-slow-right { animation: none; }
        }

        .brand-fade {
          -webkit-mask-image: linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%);
        }
        .testi-fade {
          -webkit-mask-image: linear-gradient(to right, transparent 0, black 4%, black 96%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, black 4%, black 96%, transparent 100%);
        }

        .testi-card {
          transition: transform 0.25s ease;
        }
        .testi-card:hover {
          transform: translateY(-3px);
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
      <div className="w-full relative overflow-hidden mb-0 text-center z-10">
        <div className="inline-flex flex-col items-center mb-4 sm:mb-8 px-4">
          <h3
            style={{ fontFamily: "GenericFont, sans-serif", letterSpacing: '0.3px', fontWeight: 400 }}
            className="text-base sm:text-4xl m-0 text-[#D42C2C] leading-tight"
          >
            Worked With
          </h3>
        </div>

        <div className="w-full overflow-hidden py-1.5 mt-1 sm:py-3 brand-fade">
          <div className="animate-marquee-slow-left gap-8 sm:gap-20 w-max items-center">
            {duplicateList(brands).map((logoUrl, idx) => (
              <div
                key={`brand-logo-${idx}`}
                className="inline-flex items-center justify-center shrink-0 h-6 sm:h-14 opacity-90 hover:opacity-100 transition-opacity"
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

      {/* ────────────────── 2. TESTIMONIALS SECTION ────────────────── */}
      <div className="relative w-full -mt-4 sm:-mt-16 pt-16 pb-20 sm:pt-24 sm:pb-40 flex flex-col items-center justify-center overflow-hidden">

        <div
          className="absolute inset-0 w-full h-full bg-no-repeat bg-center bg-cover pointer-events-none z-0"
          style={{ backgroundImage: `url('/testimonialRed.png')` }}
        />

        <div className="relative z-[15] text-center mb-4 sm:mb-6 pt-14 sm:pt-24 pb-1 sm:pb-2 px-4">
          <h2
            style={{ fontFamily: "GenericFont, sans-serif", letterSpacing: '0.3px', fontWeight: 300 }}
            className="text-xl sm:text-[42px] mt-2 sm:mt-4 m-0 text-[#FFFFFF] leading-tight drop-shadow-md"
          >
            Testimonial
          </h2>

          <p
            style={{ color: '#FFD84D' }}
            className="text-[11px] sm:text-base mt-2 sm:mt-3 font-medium"
          >
            What clients say about my work
          </p>
        </div>

        {/* TICKER CARDS WRAPPER */}
        <div className="w-full overflow-hidden mb-4 sm:mb-10 pb-1 sm:pb-4 py-1 sm:py-3 relative z-[15] testi-fade">
          <div className="animate-marquee-slow-right gap-8 sm:gap-20 w-max items-start">
            {duplicateList(testimonials).map((testi, idx) => (
              <div
                key={`testi-${idx}`}
                className="testi-card relative text-[#FFFFFF] w-[190px] sm:w-[340px] px-3 sm:px-6 inline-flex flex-col items-center text-center shrink-0 whitespace-normal"
              >
                {/* Avatar */}
                <img
                  src={testi.avatar}
                  alt={testi.handle}
                  className="w-11 h-11 sm:w-[72px] sm:h-[72px] rounded-full object-cover shadow-md mb-2.5 sm:mb-4"
                />

                {/* Handle & Role */}
                <h4
                  style={{ letterSpacing: '0.3px', fontWeight: 800 }}
                  className="text-white text-[11px] sm:text-lg m-0 uppercase leading-tight"
                >
                  {testi.handle}
                </h4>
                <p
                  style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '0.5px' }}
                  className="text-white/85 text-[10px] sm:text-base m-0 mt-0.5 mb-3 sm:mb-5"
                >
                  {testi.role}
                </p>

                {/* Quote Text */}
                <p
                  style={{ letterSpacing: '-0.1px', fontWeight: 300 }}
                  className="text-white/90 text-[10px] sm:text-base leading-relaxed m-0 mb-3 sm:mb-6 line-clamp-4"
                >
                  {testi.quote}
                </p>

                
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}