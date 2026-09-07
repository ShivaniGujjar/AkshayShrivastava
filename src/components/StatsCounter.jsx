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

// 📊 STATS COUNTER SECTION — a row of animated stats, triggered once when
// scrolled into view. Styled to match the rest of the site: same card
// shadow/hover-lift as the video cards, same section-heading treatment as
// "Long Forms" / "Short Forms".
const DEFAULT_STATS = [
  { value: 200, suffix: '+', label: 'Videos Edited' },
  { value: 50, suffix: 'M+', label: 'Views Generated' },
  { value: 2, suffix: '+', label: 'Years Experience' },
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
      className="w-full max-w-[1100px] mx-auto px-6 my-14 sm:my-20"
    >
      {/* Section heading — same treatment as "Long Forms" / "Short Forms" */}
      <div className="flex flex-col items-center text-center mb-8 sm:mb-10">
        <h3
          style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '1px' }}
          className="text-2xl sm:text-4xl m-0 text-[#D42C2C] leading-tight capitalize"
        >
          The Numbers Don't Lie
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            style={{ transitionDelay: isVisible ? `${idx * 100}ms` : '0ms' }}
            className={`flex flex-col items-center justify-center text-center bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[8px] py-9 sm:py-11 px-4 border border-black/5 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(212,44,44,0.15)] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
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

            <span className="w-8 h-[3px] rounded-full bg-[#FFC300] mt-3 mb-3" />

            <span
              style={{ fontFamily: "'GroteskFont', sans-serif", letterSpacing: '1px' }}
              className="text-[#3b352e] text-xs sm:text-sm tracking-wider capitalize"
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}