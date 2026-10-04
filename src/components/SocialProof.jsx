import React from 'react';

const DEFAULT_BRANDS = [
  "/waywen.webp",
  "/MastersUnion.jpg",
  "/frido.avif",
  "/webveda.avif",
  "/kraftobench.webp",
  "/Monotech.png",
  "/ambrane.avif"
];

const DEFAULT_TESTIMONIALS = [
  {
    quote: "I had the pleasure of working with Akshay on editing two crucial videos, and I couldn't be happier with the results. He was professional, attentive to detail, and delivered high-quality work on time. His creativity and ability to bring my vision to life were truly impressive!",
    handle: "Aditya Verma",
    role: "CONTENT STRATEGY & PRODUCTION"
  },
  {
    quote: "Akshay just gets content. You don't have to explain every little thing to him, which honestly makes the process so much easier.",
    handle: "Client Review",
    role: "FOUNDER"
  },
  {
    quote: "I've worked with quite a few editors and Akshay is definitely one of the more creative ones. He understands content, not just the editing part, which makes a big difference.",
    handle: "Client Review",
    role: "MEDIA LEAD"
  },
  {
    quote: "Been working with Akshay for some time now and he's been great. He understands the content, doesn't need much handholding and actually brings his own ideas in.",
    handle: "Client Review",
    role: "CREATOR"
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
      className="w-full relative overflow-hidden pt-6 pb-20 sm:pt-10 sm:pb-32 select-none bg-[#FFFCFB]"
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
          animation: slowSmoothMarqueeRight 75s linear infinite;
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
          transform: translateY(-4px);
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
      {/* FIX: padding adjusted so cards stay clear of the torn top/bottom edges */}
      <div className="relative w-full -mt-4 sm:-mt-16 pt-14 pb-36 sm:pt-20 sm:pb-60 flex flex-col items-center justify-center overflow-hidden">

        {/* FIX: stretch image to the exact container size so torn edges always sit at top/bottom */}
        {/* PNG has transparent padding on all sides, so the bg layer is oversized
            (negative inset) and the container's overflow-hidden crops that padding.
            Tune: -left/-right-[3.5%] for sides, -top/-bottom for the torn edges. */}
        <div
          className="absolute -left-[4.5%] -right-[4.5%] -top-6 -bottom-6 sm:-top-12 sm:-bottom-12 bg-no-repeat bg-center pointer-events-none z-0"
          style={{
            backgroundImage: `url('/testimonialRed.png')`,
            backgroundSize: '100% 100%',
          }}
        />

        <div className="relative z-[15] text-center mb-4 sm:mb-6 pt-14 sm:pt-24 pb-1 sm:pb-2 px-4">
          <h2
            style={{ fontFamily: "GenericFont, sans-serif", letterSpacing: '0.3px', fontWeight: 300 }}
            className="text-xl sm:text-[42px] pt-8 mt-2 sm:mt-4 m-0 text-[#FFFFFF] leading-tight drop-shadow-md"
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
        {/* FIX: removed extra bottom margin; section padding handles spacing now */}
        <div className="w-full overflow-hidden mb-0 py-2 sm:py-4 relative z-[15] testi-fade">
          <div className="animate-marquee-slow-right gap-6 sm:gap-10 w-max items-stretch">
            {duplicateList(testimonials).map((testi, idx) => (
              <div
                key={`testi-${idx}`}
                className="testi-card relative text-[#FFFFFF] w-[240px] sm:w-[360px] sm:min-h-[300px] p-5 sm:p-7 rounded-[14px] bg-black/20 backdrop-blur-xs border border-white/10 inline-flex flex-col justify-between text-left shrink-0 whitespace-normal"
                style={{ minHeight: '220px' }}
              >
                {/* Statement / Quote */}
                <p
                  style={{ letterSpacing: '-0.1px', fontWeight: 300 }}
                  className="text-white/95 text-xs sm:text-base leading-relaxed m-0 mb-4 sm:mb-6"
                >
                  "{testi.quote}"
                </p>

                {/* Bottom Info Group */}
                <div className="w-full mt-auto">
                  <div className="w-full h-[1px] bg-white/20 mb-3 sm:mb-4" />
                  <div className="w-full flex flex-col">
                    <h4
                      style={{ letterSpacing: '0.5px', fontWeight: 800, color: '#FFD84D' }}
                      className="text-xs sm:text-sm m-0 uppercase leading-tight"
                    >
                      {testi.handle}
                    </h4>
                    <span
                      style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '0.5px' }}
                      className="text-white/70 text-[10px] sm:text-xs m-0 mt-0.5 tracking-wider uppercase"
                    >
                      {testi.role}
                    </span>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}