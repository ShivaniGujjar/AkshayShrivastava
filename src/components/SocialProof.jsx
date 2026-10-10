import React, { useEffect, useState, useRef } from "react";

const DEFAULT_BRANDS = [
  "/waywen.webp",
  "/MastersUnion.jpg",
  "/frido.avif",
  "/webveda.avif",
  "/kraftobench.webp",
  "/Monotech.png",
  "/ambrane.avif",
];

const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "Working with Akshay on editing our crucial videos was an absolute pleasure. Professional, highly attentive to detail, and delivered top-notch quality on time!",
    handle: "Aditya Verma",
    role: "Founder Venturescopilot",
  },
  {
    quote:
      "It was great working with Akshay. He gave clear, honest feedback and kept refining every detail until it felt right, from the spacing to the wording. The same attention to detail shows in his videos.",
    handle: "Shivani Gujjar",
    role: "Developer",
  },
  {
    quote:
      "I've worked with quite a few editors and Akshay is definitely one of the more creative ones. He understands content, not just the editing part, which makes a big difference.",
    handle: "Abhiraj",
    role: "Filmmaker",
  },
  {
    quote:
      "Been working with Akshay for some time now and he's been great. He understands the content, doesn't need much handholding and actually brings his own ideas in.",
    handle: "Pankaj",
    role: "Creative Associate",
  },
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
            const c = document.createElement("canvas");
            c.width = w;
            c.height = h;
            const ctx = c.getContext("2d", { willReadFrequently: true });
            ctx.drawImage(img, 0, 0, w, h);
            const { data } = ctx.getImageData(0, 0, w, h);
            const at = (x, y) => {
              const i = (y * w + x) * 4;
              return [data[i], data[i + 1], data[i + 2], data[i + 3]];
            };
            const corners = [
              at(0, 0),
              at(w - 1, 0),
              at(0, h - 1),
              at(w - 1, h - 1),
            ];
            const solidBg =
              corners.every((c) => c[3] > 200) &&
              corners.every(
                (c) =>
                  Math.max(
                    Math.abs(c[0] - corners[0][0]),
                    Math.abs(c[1] - corners[0][1]),
                    Math.abs(c[2] - corners[0][2]),
                  ) < 12,
              );
            const bg = corners[0];

            let minX = w,
              minY = h,
              maxX = -1,
              maxY = -1;
            for (let y = 0; y < h; y++) {
              for (let x = 0; x < w; x++) {
                const i = (y * w + x) * 4;
                const visible = solidBg
                  ? data[i + 3] > 30 &&
                    Math.max(
                      Math.abs(data[i] - bg[0]),
                      Math.abs(data[i + 1] - bg[1]),
                      Math.abs(data[i + 2] - bg[2]),
                    ) > 28
                  : data[i + 3] > 30 &&
                    !(data[i] > 245 && data[i + 1] > 245 && data[i + 2] > 245);
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
      }),
    );
  }
  return logoCache.get(src);
}

function BrandLogo({ src }) {
  const [m, setM] = useState(null);

  useEffect(() => {
    let alive = true;
    measureLogo(src).then((r) => alive && setM(r));
    return () => {
      alive = false;
    };
  }, [src]);

  if (!m) {
    return (
      <img
        src={src}
        alt="Brand Logo"
        className="h-full w-auto object-contain"
      />
    );
  }

  const vw = m.bx1 - m.bx0;
  const vh = m.by1 - m.by0;
  const A = (vw * m.natW) / (vh * m.natH);

  // Frido specific downscaling factor to match other logos perfectly
  const isFrido = src.includes("frido");
  const scaleAdjustment = isFrido ? 0.72 : 1;

  const f = Math.min(1, MAX_ASPECT / A) * scaleAdjustment;
  const K = f / vh;
  const imgW = K * (m.natW / m.natH);

  return (
    <div
      className="relative shrink-0 overflow-hidden"
      style={{ height: "var(--lh)", width: `calc(var(--lh) * ${f * A})` }}
    >
      <img
        src={src}
        alt="Brand Logo"
        draggable={false}
        style={{
          position: "absolute",
          maxWidth: "none",
          height: `calc(var(--lh) * ${K})`,
          width: `calc(var(--lh) * ${imgW})`,
          left: `calc(var(--lh) * ${-m.bx0 * imgW})`,
          top: `calc(var(--lh) * ${(1 - f) / 2 - m.by0 * K})`,
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

// Pure auto-scroll container for Worked With section with responsive mobile speed
function BrandMarqueeContainer({ children, direction = "left", speed = 45 }) {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const [effectiveSpeed, setEffectiveSpeed] = useState(speed);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      // Mobile par speed slow kar di hai (e.g., 20) taaki tez na bhage
      setEffectiveSpeed(isMobile ? 22 : speed);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [speed]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (direction === "right") {
      el.scrollLeft = el.scrollWidth / 2;
    }

    const step = (timestamp) => {
      if (lastTimeRef.current == null) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const half = el.scrollWidth / 2;
      const dir = direction === "left" ? 1 : -1;

      el.scrollLeft += dir * effectiveSpeed * (delta / 1000);

      if (half > 0) {
        if (el.scrollLeft >= half) {
          el.scrollLeft -= half;
        } else if (el.scrollLeft <= 0) {
          el.scrollLeft += half;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [direction, effectiveSpeed]);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-full overflow-x-hidden overflow-y-hidden select-none testimonial-container [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
    >
      {children}
    </div>
  );
}

// Testimonials container with auto-scroll (slowed down on mobile) + manual navigation arrows
function RowArrow({ side, onClick }) {
  const isLeft = side === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Scroll left" : "Scroll right"}
      className={`absolute top-1/2 -translate-y-1/2 z-30 flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#D42C2C] text-[#FFFCFB] shadow-[0_6px_16px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#14120e] focus-visible:ring-offset-2 ${
        isLeft ? "left-1.5 sm:left-4" : "right-1.5 sm:right-4"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 sm:h-5 sm:w-5"
        aria-hidden="true"
      >
        <path d={isLeft ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}

function TestimonialMarqueeRow({ children, direction = "right", speed = 40 }) {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const slideRafRef = useRef(null);
  const isSlidingRef = useRef(false);
  const resumeAtRef = useRef(0);
  const [effectiveSpeed, setEffectiveSpeed] = useState(speed);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      // Mobile par testimonials ki speed bhi slow kar di hai (e.g., 20)
      setEffectiveSpeed(isMobile ? 20 : speed);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [speed]);

  const wrap = (el) => {
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft <= 0) el.scrollLeft += half;
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (direction === "right") {
      el.scrollLeft = el.scrollWidth / 2;
    }

    const step = (timestamp) => {
      if (lastTimeRef.current == null) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      const paused =
        isSlidingRef.current || performance.now() < resumeAtRef.current;

      if (!paused) {
        const dir = direction === "left" ? 1 : -1;
        el.scrollLeft += dir * effectiveSpeed * (delta / 1000);
        wrap(el);
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [direction, effectiveSpeed]);

  useEffect(() => {
    return () => {
      if (slideRafRef.current) cancelAnimationFrame(slideRafRef.current);
    };
  }, []);

  const slide = (sign) => {
    const el = containerRef.current;
    const inner = innerRef.current;
    if (!el || !inner || !inner.children[0]) return;

    if (slideRafRef.current) cancelAnimationFrame(slideRafRef.current);

    const gap = parseFloat(getComputedStyle(inner).columnGap) || 16;
    const cardW = inner.children[0].getBoundingClientRect().width;
    const total = sign * (cardW + gap);

    const duration = 500;
    const start = performance.now();
    let done = 0;
    isSlidingRef.current = true;

    const tick = (now) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - Math.pow(1 - t, 3);
      const target = total * eased;
      el.scrollLeft += target - done;
      done = target;
      wrap(el);

      if (t < 1) {
        slideRafRef.current = requestAnimationFrame(tick);
      } else {
        slideRafRef.current = null;
        isSlidingRef.current = false;
        resumeAtRef.current = performance.now() + 1500;
      }
    };

    slideRafRef.current = requestAnimationFrame(tick);
  };

  return (
    <div className="relative w-full max-w-full">
      <div
        ref={containerRef}
        className="w-full max-w-full overflow-x-hidden overflow-y-hidden select-none px-3 sm:px-12"
      >
        <div
          ref={innerRef}
          className="inline-flex whitespace-nowrap gap-2.5 sm:gap-10 w-max items-stretch"
        >
          {children}
        </div>
      </div>

      <RowArrow side="left" onClick={() => slide(-1)} />
      <RowArrow side="right" onClick={() => slide(1)} />
    </div>
  );
}

export default function SocialProof({
  brands = DEFAULT_BRANDS,
  testimonials = DEFAULT_TESTIMONIALS,
}) {
  return (
    <section
      className="w-full relative overflow-hidden pt-6 pb-8 sm:pt-10 sm:pb-32 select-none bg-[#FFFCFB]"
      style={{
        fontFamily:
          "'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <style>{`
        .brand-fade {
          -webkit-mask-image: linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, black 6%, black 94%, transparent 100%);
        }
        .testi-fade {
          -webkit-mask-image: linear-gradient(to right, transparent 0, black 4%, black 96%, transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, black 4%, black 96%, transparent 100%);
        }

        /* Mobile par PNG ki height badhane ke liye background-size increase kiya hai */
        .testi-bg {
          background-size: 100% 190%;
        }
        @media (min-width: 640px) {
          .testi-bg {
            background-size: 100% 100%;
          }
        }

        .testimonial-container {
  transform: translateZ(0);
  will-change: scroll-position;
  -webkit-overflow-scrolling: touch;
}
.testi-card {
  transition: transform 0.25s ease;
  transform: translateZ(0);
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
            style={{
              fontFamily: "GenericFont, sans-serif",
              letterSpacing: "0.3px",
              fontWeight: 400,
            }}
            className="text-xl sm:text-4xl m-0 text-[#D42C2C] leading-tight"
          >
            Worked With
          </h3>
        </div>

        <div className="w-full overflow-hidden py-1 sm:py-3 brand-fade">
          <BrandMarqueeContainer direction="left" speed={45}>
            <div className="inline-flex whitespace-nowrap gap-8 sm:gap-20 w-max items-center py-2">
              {duplicateList(brands).map((logoUrl, idx) => (
                <div
                  key={`brand-logo-${idx}`}
                  className="inline-flex items-center justify-center shrink-0 h-5 sm:h-[46px] [--lh:20px] sm:[--lh:46px] opacity-90 hover:opacity-100 transition-opacity"
                >
                  <BrandLogo src={logoUrl} />
                </div>
              ))}
            </div>
          </BrandMarqueeContainer>
        </div>
      </div>

      {/* ────────────────── 2. TESTIMONIALS SECTION ────────────────── */}
      <div className="relative w-full mt-0 sm:-mt-16 py-6 sm:py-42 flex flex-col items-center justify-center overflow-hidden">
        <div
          className="testi-bg absolute -left-[4.5%] -right-[4.5%] top-0 bottom-0 sm:-top-12 sm:-bottom-12 bg-no-repeat bg-center pointer-events-none z-0"
          style={{ backgroundImage: `url('/testimonialRed.png')` }}
        />

        {/* TICKER CARDS WRAPPER */}
        <div className="w-full overflow-hidden mb-0 py-2 sm:py-4 relative z-[15] testi-fade">
          <TestimonialMarqueeRow direction="right" speed={40}>
            {duplicateList(testimonials).map((testi, idx) => (
              <div
                key={`testi-${idx}`}
                className="testi-card relative text-[#FFFFFF] w-[190px] sm:w-[360px] min-h-[110px] sm:min-h-[190px] p-2.5 sm:p-7 rounded-[8px] sm:rounded-[14px] bg-black/25 sm:backdrop-blur-xs border border-white/10 inline-flex flex-col justify-between text-left shrink-0 whitespace-normal shadow-md"
              >
                {/* Statement / Quote */}
                <p
                  style={{ letterSpacing: "-0.1px", fontWeight: 300 }}
                  className="text-white/95 text-[9px] sm:text-base leading-tight sm:leading-relaxed m-0 mb-2 sm:mb-6 whitespace-normal"
                >
                  "{testi.quote}"
                </p>

                {/* Bottom Info Group */}
                <div className="w-full mt-auto">
                  <div className="w-full h-[1px] bg-white/20 mb-1 sm:mb-4" />
                  <div className="w-full flex flex-col">
                    <h4
                      style={{
                        letterSpacing: "0.5px",
                        fontWeight: 800,
                        color: "#FFD84D",
                      }}
                      className="text-[9px] sm:text-sm m-0 uppercase leading-tight"
                    >
                      {testi.handle}
                    </h4>
                    <span
                      style={{
                        fontFamily: "'Talina', sans-serif",
                        letterSpacing: "0.5px",
                      }}
                      className="text-white/70 text-[7px] sm:text-xs m-0 mt-0.5 tracking-wider uppercase"
                    >
                      {testi.role}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </TestimonialMarqueeRow>
        </div>
      </div>
    </section>
  );
}
