import React from 'react';

const DEFAULT_BRANDS = [
  "MASTER'S UNION",
  "WAYWEN",
  "EDUTAINMENT HUB",
  "MEDIA NETWORK",
  "STARTUP LABS",
  "KOLKATA MEDIA"
];

const DEFAULT_TESTIMONIALS = [
  {
    quote: "Retention graphs spiked by 42% after Akshay redid our video pacing! Absolute editing wizard.",
    client: "Founder",
    company: "Waywen"
  },
  {
    quote: "Brought our podcast clips to viral tier status with incredible visual energy and pacing.",
    client: "Media Lead",
    company: "Master's Union"
  },
  {
    quote: "High-energy cuts, slick animation overlays, sound design on point, and super fast turnarounds.",
    client: "Creator",
    company: "Edutainment Hub"
  },
  {
    quote: "Remarkable directional clarity on set and top-tier execution in post-production.",
    client: "Executive Producer",
    company: "Media Network"
  }
];

const duplicateList = (arr, count = 4) => {
  let output = [];
  for (let i = 0; i < count; i++) {
    output = [...output, ...arr];
  }
  return output;
};

export default function SocialProof({ brands = DEFAULT_BRANDS, testimonials = DEFAULT_TESTIMONIALS }) {
  return (
    <section className="w-full relative overflow-hidden pt-10 pb-12 select-none bg-[#FFFCFB]" style={{ fontFamily: "'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      
      {/* 🎨 LOCAL FONT DECLARATION */}
      <style>{`
        @font-face {
          font-family: 'Talina';
          src: url('/Talina-Regular.ttf') format('truetype');
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
          font-family: 'HelveticaNeueBold';
          src: url('/fonts/HelveticaNeueBold.otf') format('opentype');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      {/* ────────────────── 1. WORKED WITH SECTION ────────────────── */}
      <div className="w-full relative overflow-hidden mb-12 sm:mb-16 text-center">
        
        {/* Section Heading - TALINA */}
        <div className="inline-flex flex-col items-center mb-6">
          <h3 
            style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '-1.2px', fontWeight: 400 }}
            className="text-2xl sm:text-4xl md:text-4xl m-0 text-[#144BFF] leading-tight"
          >
            Worked With
          </h3>
        </div>

        {/* Marquee Container */}
        <div className="w-full overflow-hidden py-3 group">
          <div className="inline-flex whitespace-nowrap gap-6 sm:gap-8 w-max will-change-transform animate-[slowMarqueeLeft_65s_linear_infinite] group-hover:[animation-play-state:paused]">
            {duplicateList(brands).map((brand, idx) => (
              <div 
                key={`brand-${idx}`} 
                style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '0.5px', fontWeight: 300 }}
                className="px-7 py-3 bg-[#FFFCFB] text-[#14120e] rounded-md inline-flex items-center justify-center shrink-0 shadow-md text-xs sm:text-sm border border-[#144BFF]/20 backdrop-blur-md hover:border-[#144BFF] hover:text-[#144BFF] hover:scale-105 transition-all duration-300 cursor-default"
              >
                <span className="text-[#FFC822] mr-2.5">•</span>
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────── 2. TESTIMONIALS CINEMATIC BAND ────────────────── */}
      <div className="w-full bg-[#144BFF] relative pt-14 pb-20 sm:pt-20 sm:pb-24 flex flex-col items-center overflow-hidden">
        
        {/* Top Seamless Torn Edge Mask */}
        <div 
          className="absolute top-0 left-0 w-full h-[40px] sm:h-[60px] z-[12] bg-[#FFFCFB]"
          style={{
            maskImage: "url('/bottom.png')",
            WebkitMaskImage: "url('/bottom.png')",
            maskSize: "auto 100%",
            WebkitMaskSize: "auto 100%",
            maskRepeat: "repeat-x",
            WebkitMaskRepeat: "repeat-x",
            maskPosition: "bottom",
            WebkitMaskPosition: "bottom",
            transform: "scaleY(-1)"
          }}
        />

        {/* Header */}
        <div className="relative z-[15] text-center mb-8 px-4 pt-2">
          <h2 
            style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '-0.8px', fontWeight: 400 }}
            className="text-2xl sm:text-4xl md:text-4xl m-0 text-[#FFFFFF] leading-tight drop-shadow-md"
          >
            Testimonial
          </h2>
          <p 
            style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '-0.5px', fontWeight: 600 }} 
            className="text-[#FFFFFF]/95 text-xs sm:text-sm mt-1.5"
          >
            What clients say about my work
          </p>
        </div>

        {/* TICKER CARDS WRAPPER */}
        <div className="w-full overflow-hidden py-2 group relative z-[15]">
          <div className="inline-flex whitespace-nowrap gap-5 sm:gap-7 w-max will-change-transform animate-[slowMarqueeLeft_75s_linear_infinite] group-hover:[animation-play-state:paused]">
            {duplicateList(testimonials).map((testi, idx) => (
              <div 
                key={`testi-${idx}`} 
                className="relative bg-[#FFFCFB] text-[#14120e] w-[300px] sm:w-[370px] p-6 sm:p-7 rounded-xl inline-flex flex-col justify-between shrink-0 shadow-lg whitespace-normal border border-white/20 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Decorative Quote Mark */}
                <span className="text-[#144BFF]/20 font-serif text-5xl leading-none absolute top-3 right-5 select-none pointer-events-none">
                  “
                </span>

                <p 
                  style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '-0.2px', fontWeight: 300 }}
                  className="text-[#14120e] text-xs sm:text-sm leading-relaxed m-0 relative z-10"
                >
                  "{testi.quote}"
                </p>

                <div className="mt-4 pt-3 border-t border-black/10 flex items-center justify-between">
                  <div>
                    <p 
                      style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '0.3px', fontWeight: 400 }} 
                      className="text-[#144BFF] text-[11px] sm:text-xs uppercase m-0"
                    >
                      — {testi.client}
                    </p>
                    {testi.company && (
                      <p 
                        style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '0.3px', fontWeight: 300 }} 
                        className="text-neutral-500 text-[10px] uppercase mt-0.5 m-0"
                      >
                        {testi.company}
                      </p>
                    )}
                  </div>
                  <div className="w-1.5 h-1.5 rounded-sm bg-[#144BFF] shadow-[0_0_6px_#144BFF]" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Seamless Torn Edge Mask */}
        <div 
          className="absolute bottom-0 left-0 w-full h-[40px] sm:h-[60px] z-[12] bg-[#FFFCFB]"
          style={{
            maskImage: "url('/bottom.png')",
            WebkitMaskImage: "url('/bottom.png')",
            maskSize: "auto 100%",
            WebkitMaskSize: "auto 100%",
            maskRepeat: "repeat-x",
            WebkitMaskRepeat: "repeat-x",
            maskPosition: "bottom",
            WebkitMaskPosition: "bottom"
          }}
        />

      </div>

    </section>
  );
}