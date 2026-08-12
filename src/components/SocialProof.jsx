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
    <section className="w-full relative overflow-hidden pt-8 pb-10 select-none bg-[#FFFCFB]" style={{ fontFamily: "'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
      
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
      <div className="w-full relative overflow-hidden mb-10 text-center">
        
        {/* Section Heading - TALINA */}
        <div className="inline-flex flex-col items-center mb-4 px-4">
          <h3 
            style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '0.4px', fontWeight: 400 }}
            className="text-2xl sm:text-4xl m-0 text-[#144BFF] leading-tight"
          >
            Worked With
          </h3>
        </div>

        {/* Marquee Container */}
        <div className="w-full overflow-hidden py-2 group">
          <div className="inline-flex whitespace-nowrap gap-4 sm:gap-8 w-max will-change-transform animate-[slowMarqueeLeft_65s_linear_infinite] group-hover:[animation-play-state:paused]">
            {duplicateList(brands).map((brand, idx) => (
              <div 
                key={`brand-${idx}`} 
                style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '0.5px', fontWeight: 300 }}
                className="px-5 py-2.5 bg-[#FFFCFB] text-[#14120e] rounded-md inline-flex items-center justify-center shrink-0 shadow-sm text-xs sm:text-sm border border-[#144BFF]/20 backdrop-blur-md"
              >
                <span className="text-[#FFC822] mr-2">•</span>
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────── 2. TESTIMONIALS CINEMATIC BAND ────────────────── */}
      <div className="w-full bg-[#144BFF] relative pt-12 pb-16 sm:pt-20 sm:pb-24 flex flex-col items-center overflow-hidden">
        
        {/* Top Seamless Torn Edge Mask */}
        <div 
          className="absolute top-0 left-0 w-full h-[30px] sm:h-[60px] z-[12] bg-[#FFFCFB]"
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
        <div className="relative z-[15] text-center mb-6 px-4 pt-1">
          <h2 
            style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '0.4px', fontWeight: 400 }}
            className="text-2xl sm:text-4xl m-0 text-[#FFFFFF] leading-tight drop-shadow-md"
          >
            Testimonial
          </h2>
          <p 
            style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '0.3px', fontWeight: 600 }} 
            className="text-[#FFFFFF]/95 text-xs sm:text-sm mt-1"
          >
            What clients say about my work
          </p>
        </div>

        {/* TICKER CARDS WRAPPER */}
        <div className="w-full overflow-hidden py-2 group relative z-[15]">
          <div className="inline-flex whitespace-nowrap gap-4 sm:gap-7 w-max will-change-transform animate-[slowMarqueeLeft_75s_linear_infinite] group-hover:[animation-play-state:paused]">
            {duplicateList(testimonials).map((testi, idx) => (
              <div 
                key={`testi-${idx}`} 
                className="relative bg-[#FFFCFB] text-[#14120e] w-[260px] sm:w-[370px] p-4 sm:p-7 rounded-xl inline-flex flex-col justify-between shrink-0 shadow-lg whitespace-normal border border-white/20 backdrop-blur-xl"
              >
                {/* Decorative Quote Mark */}
                <span className="text-[#144BFF]/20 font-serif text-4xl sm:text-5xl leading-none absolute top-2 right-4 select-none pointer-events-none">
                  “
                </span>

                <p 
                  style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '0.2px', fontWeight: 300 }}
                  className="text-[#14120e] text-xs sm:text-sm leading-relaxed m-0 relative z-10"
                >
                  "{testi.quote}"
                </p>

                <div className="mt-3 pt-2.5 border-t border-black/10 flex items-center justify-between">
                  <div>
                    <p 
                      style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '0.4px', fontWeight: 400 }} 
                      className="text-[#144BFF] text-[11px] sm:text-xs uppercase m-0"
                    >
                      — {testi.client}
                    </p>
                    {testi.company && (
                      <p 
                        style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '0.3px', fontWeight: 300 }} 
                        className="text-neutral-500 text-[10px] sm:text-[10px] uppercase mt-0.5 m-0"
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

        {/* Bottom Seamless Torn Edge Mask (Fixed line artifact using -bottom-[2px] and overlap) */}
        <div 
          className="absolute -bottom-[2px] left-0 w-full h-[35px] sm:h-[65px] z-[12] bg-[#FFFCFB]"
          style={{
            maskImage: "url('/bottom.png')",
            WebkitMaskImage: "url('/bottom.png')",
            maskSize: "auto 100%",
            WebkitMaskSize: "auto 100%",
            maskRepeat: "repeat-x",
            WebkitMaskRepeat: "repeat-x",
            maskPosition: "bottom",
            WebkitMaskPosition: "bottom",
            marginTop: "-1px"
          }}
        />

      </div>

    </section>
  );
}