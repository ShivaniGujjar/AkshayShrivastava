import React, { useState, useRef, useEffect } from 'react';

// Eases from 0 to 1 fast-then-slow, so the count "settles" into place
// instead of feeling linear/robotic.
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

// 🔢 SINGLE ANIMATED NUMBER — counts up from 0 to `value` once it's visible.
function CountUpNumber({ value, suffix = '', duration = 1800, startWhenVisible }) {
  const [display, setDisplay] = useState(0);
  const hasRunRef = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!startWhenVisible || hasRunRef.current) return;
    hasRunRef.current = true;

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutExpo(progress);
      setDisplay(Math.round(eased * value));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [startWhenVisible, value, duration]);

  return (
    <span>
      {display.toLocaleString('en-US')}{suffix}
    </span>
  );
}

// 🎨 CUSTOM ICONS — simple stroke SVGs (no emoji), colored via currentColor
// so they inherit red/beige/yellow from their wrapper.
const ICONS = {
  film: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
      <path d="M7 6L9 10" />
      <path d="M12 6L14 10" />
      <path d="M17 6L19 10" />
    </svg>
  ),
  eye: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  ),
  hourglass: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12" />
      <path d="M6 21h12" />
      <path d="M7 3c0 5 5 6 5 9s-5 4-5 9" />
      <path d="M17 3c0 5-5 6-5 9s5 4 5 9" />
    </svg>
  ),
};

// A small sparkle used as the pin accent, instead of an emoji.
const SparkleIcon = (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
  </svg>
);

// 📊 STATS COUNTER SECTION — a row of playful, sticker-style animated stats,
// triggered once when scrolled into view. Drop this into any page; pass a
// custom `stats` array or use the defaults below.
const DEFAULT_STATS = [
  { value: 200, suffix: '+', label: 'Videos Edited', icon: 'film', rotate: '-3deg' },
  { value: 50, suffix: 'M+', label: 'Views Generated', icon: 'eye', rotate: '2deg' },
  { value: 2, suffix: '+', label: 'Years Experience', icon: 'hourglass', rotate: '-2deg' },
];

export default function StatsCounter({ stats = DEFAULT_STATS }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // only run once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full max-w-[950px] mx-auto px-4 sm:px-6 my-14 sm:my-20"
    >
      {/* 🎪 SIMPLE HEADING */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-12">
        <span
          style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '1px' }}
          className="inline-flex items-center gap-2 text-[#D42C2C] text-2xl sm:text-3xl capitalize"
        >
          <span className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFC300] shrink-0">{SparkleIcon}</span>
          The Numbers Don't Lie
        </span>

        <span
          style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '1px' }}
          className="inline-flex items-center gap-2 text-[#D42C2C] text-2xl sm:text-3xl capitalize"
        ></span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 pt-2">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            style={{
              transform: `rotate(${stat.rotate || '0deg'})`,
              transitionDelay: isVisible ? `${idx * 120}ms` : '0ms',
            }}
            className={`group relative flex flex-col items-center justify-center text-center bg-white shadow-[0_10px_30px_rgba(0,0,0,0.08)] rounded-[14px] py-9 sm:py-11 px-4 border-2 border-dashed border-[#D42C2C]/25 transition-all duration-500 ease-out hover:rotate-0 hover:scale-[1.06] hover:shadow-[0_16px_40px_rgba(212,44,44,0.2)] hover:border-[#D42C2C]/60 cursor-default ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* ✨ Sparkle pin accent (yellow circle, red sparkle) */}
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#FFC300] border-2 border-white shadow-md flex items-center justify-center text-[#D42C2C] p-1 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
              {SparkleIcon}
            </span>

            <span
              style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '1px' }}
              className="text-[#D42C2C] text-4xl sm:text-5xl md:text-6xl leading-none"
            >
              <CountUpNumber
                value={stat.value}
                suffix={stat.suffix}
                startWhenVisible={isVisible}
              />
            </span>

            {/* Squiggly underline */}
            <svg
              viewBox="0 0 100 10"
              className="w-16 sm:w-20 h-2.5 mt-2 text-[#FFC300]"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 12.5 0, 25 5 T 50 5 T 75 5 T 100 5"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>

            <span
              style={{ fontFamily: "'GroteskFont', sans-serif", letterSpacing: '1px' }}
              className="mt-2 text-[#3b352e] text-xs sm:text-sm tracking-wider capitalize"
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}