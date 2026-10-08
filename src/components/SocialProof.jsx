import React, { useEffect, useState } from 'react';

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
    role: "CONTENT STRATEGY AND PRODUCTION"
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

const MAX_ASPECT = 3.2;
const logoCache = new Map();

function measureLogo(src) {
  if (!logoCache.has(src)) {
    logoCache.set(
      src,
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const natW = img.naturalWidth || 1;
          const natH = img.naturalHeight || 1;
          const full = { natW, natH, bx0: 0, by0: 0, bx1: 1, by1: 1 };
          try {
            const k = 240 / Math.max(natW, natH);
            const w = Math.max(1, Math.round(natW * k));
            const h = Math.max(1, Math.round(natH * k));
            const c = document.createElement('canvas');
            c.width = w;
            c.height = h;
            const ctx = c.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(img, 0, 0, w, h);
            const { data } = ctx.getImageData(0, 0, w, h);
            const at = (x, y) => { const i = (y * w + x) * 4; return [data[i], data[i + 1], data[i + 2], data[i + 3]]; };
            const corners = [at(0, 0), at(w - 1, 0), at(0, h - 1), at(w - 1, h - 1)];
            const solidBg =
              corners.every((c) => c[3] > 200) &&
              corners.every((c) => Math.max(Math.abs(c[0] - corners[0][0]), Math.abs(c[1] - corners[0][1]), Math.abs(c[2] - corners[0][2])) < 12);
            const bg = corners[0];

            let minX = w, minY = h, maxX = -1, maxY = -1;
            for (let y = 0; y < h; y++) {
              for (let x = 0; x < w; x++) {
                const i = (y * w + x) * 4;
                const visible = solidBg
                  ? data[i + 3] > 30 &&
                    Math.max(Math.abs(data[i] - bg[0]), Math.abs(data[i + 1] - bg[1]), Math.abs(data[i + 2] - bg[2])) > 28
                  : data[i + 3] > 30 && !(data[i] > 245 && data[i + 1] > 245 && data[i + 2] > 245);
                if (visible) {
                  if (x < minX) minX = x;
                  if (x > maxX) maxX = x;
                  if (y < minY) minY = y;
                  if (y > maxY) maxY = y;
                }
              }
            }
            if (maxX < 0) return resolve(full);
            resolve({
              natW,
              natH,
              bx0: minX / w,
              by0: minY / h,
              bx1: (maxX + 1) / w,
              by1: (maxY + 1) / h,
            });
          } catch (e) {
            resolve(full);
          }
        };
        img.onerror = () => resolve(null);
        img.src = src;
      })
    );
  }
  return logoCache.get(src);
}

function BrandLogo({ src }) {
  const [m, setM] = useState(null);

  useEffect(() => {
    let alive = true;
    measureLogo(src).then((r) => alive && setM(r));
    return () => { alive = false; };
  }, [src]);

  if (!m) {
    return <img src={src} alt="Brand Logo" className="h-full w-auto object-contain" />;
  }

  const vw = m.bx1 - m.bx0;
  const vh = m.by1 - m.by0;
  const A = (vw * m.natW) / (vh * m.natH);
  const f = Math.min(1, MAX_ASPECT / A);
  const K = f / vh;
  const imgW = K * (m.natW / m.natH);

  return (
    <div className="relative shrink-0 overflow-hidden" style={{ height: 'var(--lh)', width: `calc(var(--lh) * ${f * A})` }}>
      <img
        src={src}
        alt="Brand Logo"
        draggable={false}
        style={{
          position: 'absolute',
          maxWidth: 'none',
          height: `calc(var(--lh) * ${K})`,
          width: `calc(var(--lh) * ${imgW})`,
          left: `calc(var(--lh) * ${-m.bx0 * imgW})`,
          top: `calc(var(--lh) * ${((1 - f) / 2) - (m.by0 * K)})`,
        }}
      />
    </div>
  );
}

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
      className="w-full relative overflow-hidden pt-6 pb-8 sm:pt-10 sm:pb-32 select-none bg-[#FFFCFB]"
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

        .testi-bg {
          background-size: 100% 150%;
        }
        @media (min-width: 640px) {
          .testi-bg {
            background-size: 100% 100%;
          }
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
            className="text-xl sm:text-4xl m-0 text-[#D42C2C] leading-tight"
          >
            Worked With
          </h3>
        </div>

        <div className="w-full overflow-hidden py-1 sm:py-3 brand-fade">
          <div className="animate-marquee-slow-left gap-8 sm:gap-20 w-max items-center will-change-transform">
            {duplicateList(brands).map((logoUrl, idx) => (
              <div
                key={`brand-logo-${idx}`}
                className="inline-flex items-center justify-center shrink-0 h-7 sm:h-[46px] [--lh:28px] sm:[--lh:46px] opacity-90 hover:opacity-100 transition-opacity"
              >
                <BrandLogo src={logoUrl} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ────────────────── 2. TESTIMONIALS SECTION ────────────────── */}
      <div className="relative w-full mt-0 sm:-mt-16 py-14 sm:py-72 flex flex-col items-center justify-center overflow-hidden">
        <div
          className="testi-bg absolute -left-[4.5%] -right-[4.5%] top-0 bottom-0 sm:-top-12 sm:-bottom-12 bg-no-repeat bg-center pointer-events-none z-0"
          style={{ backgroundImage: `url('/testimonialRed.png')` }}
        />

        {/* TICKER CARDS WRAPPER */}
        <div className="w-full overflow-hidden mb-0 py-2 sm:py-4 relative z-[15] testi-fade">
          <div className="animate-marquee-slow-right gap-3 sm:gap-10 w-max items-stretch will-change-transform">
            {duplicateList(testimonials).map((testi, idx) => (
              <div
                key={`testi-${idx}`}
                className="testi-card relative text-[#FFFFFF] w-[240px] sm:w-[360px] min-h-[160px] sm:min-h-[190px] p-3.5 sm:p-7 rounded-[12px] sm:rounded-[14px] bg-black/20 sm:backdrop-blur-xs border border-white/10 inline-flex flex-col justify-between text-left shrink-0 whitespace-normal shadow-md"
              >
                {/* Statement / Quote */}
                <p
                  style={{ letterSpacing: '-0.1px', fontWeight: 300 }}
                  className="text-white/95 text-[11px] sm:text-base leading-relaxed m-0 mb-3 sm:mb-6"
                >
                  "{testi.quote}"
                </p>

                {/* Bottom Info Group */}
                <div className="w-full mt-auto">
                  <div className="w-full h-[1px] bg-white/20 mb-2 sm:mb-4" />
                  <div className="w-full flex flex-col">
                    <h4
                      style={{ letterSpacing: '0.5px', fontWeight: 800, color: '#FFD84D' }}
                      className="text-[11px] sm:text-sm m-0 uppercase leading-tight"
                    >
                      {testi.handle}
                    </h4>
                    <span
                      style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '0.5px' }}
                      className="text-white/70 text-[9px] sm:text-xs m-0 mt-0.5 tracking-wider uppercase"
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