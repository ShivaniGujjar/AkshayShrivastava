import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialProof from '../components/SocialProof';
import Footer from './Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

const whenFontsReady = (family, timeout = 1200) => {
  if (typeof document === 'undefined' || !document.fonts || !document.fonts.load) {
    return Promise.resolve();
  }
  return Promise.race([
    document.fonts.load(`1em ${family}`).catch(() => {}),
    new Promise((resolve) => setTimeout(resolve, timeout)),
  ]);
};

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const TORN_BOTTOM = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cpolygon points='0,0 100,0 100,97 96,99 92,96.5 88,99 84,97 80,99.5 75,96.5 71,98.5 66,96 61,99 57,97 52,99.5 47,96.5 42,98.5 37,96 33,99 28,97 23,99.5 18,96.5 13,98.5 8,96 4,98.5 0,97'/%3E%3C/svg%3E")`;
const tornMask = {
  maskImage: TORN_BOTTOM,
  WebkitMaskImage: TORN_BOTTOM,
  maskSize: '100% 100%',
  WebkitMaskSize: '100% 100%',
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
};

const STATS = [
  { to: 200, suffix: 'K+', label: 'views on my very first After Effects video', tilt: 'rotate-[-2deg]', paper: 'bg-white', tape: 'rotate-[-3deg]' },
  { to: 27, suffix: ' days', label: 'to land a full-time video editor job', tilt: 'rotate-[1.5deg]', paper: 'bg-[#FFF9DB]', tape: 'rotate-[2deg]' },
  { to: 253, suffix: '', label: 'followers when that video took off', tilt: 'rotate-[-1deg]', paper: 'bg-white', tape: 'rotate-[-1deg]' },
];

const CHAPTERS = [
  {
    num: '01',
    title: 'Where It Started',
    body: [
      `After failing my math exam, my teacher told me, "`,
      { hl: `Akshay, I know you have more potential. You just have to put in more effort.` },
      `" So I put all my effort into my creative journey.`,
    ],
  },
  {
    num: '02',
    title: 'The First Brake',
    body: [
      `Right after school, I started working as a graphic designer, and then one day my employer told me, "Akshay, you're killing it with graphic design. I love it. Please make some videos for us too." That hit me, so once again, I put all my effort into learning Premiere Pro and cracked a completely new job as a full-time video editor in just `,
      { hl: `27 days` },
      `.`,
    ],
  },
  {
    num: '03',
    title: 'Then Things Changed',
    body: [
      `Life was pretty chill because I genuinely loved what I was doing, until one random comment said, "`,
      { hl: `This could be better in After Effects.` },
      `" I don't know why, but maybe I was waiting for that moment. I opened my laptop and decided to make the best use of whatever potential I had. I started learning After Effects by experimenting with my very first video, and that video ended up crossing `,
      { hl: `200K+ views` },
      ` on an account with just 253 followers.`,
    ],
  },
  {
    num: '04',
    title: 'The Realisation',
    body: [
      `That day, I realised my teacher was right - `,
      { hl: `I did have more potential` },
      `, but the direction she wanted me to take wasn't really made for me.`,
    ],
  },
  {
    num: '05',
    title: 'Beyond Editing',
    body: [
      `Video after video, thousands of views, countless likes, comments and messages followed, and then people started saying, "Akshay, you're killing it with your motion design and storytelling." And I was like, wait... they actually love my storytelling. So along with all the editing, motion design and visual skills, `,
      { hl: `writing and direction` },
      ` slowly became a part of what I do too.`,
    ],
  },
  {
    num: '06',
    title: 'Where I Am Now',
    finale: true,
    body: [
      `In short, I was learning when I had nothing to do; I'm still learning when I have a hundred things to do, and I'll probably keep learning while doing some crazy, crazy work. Because I've realised that the most real and visible results come when `,
      { hl: `you learn by doing` },
      `.`,
    ],
  },
];

const renderBody = (segs) =>
  segs.map((seg, i) =>
    typeof seg === 'string' ? (
      <React.Fragment key={i}>{seg}</React.Fragment>
    ) : (
      <mark key={i} className="about-hl">{seg.hl}</mark>
    )
  );

function CountUp({ to, suffix = '' }) {
  const ref = useRef(null);
  const [val, setVal] = useState(prefersReducedMotion() ? to : 0);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const obj = { v: 0 };
    let tween;
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        tween = gsap.to(obj, {
          v: to,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => setVal(Math.round(obj.v)),
        });
      },
    });
    return () => {
      st.kill();
      if (tween) tween.kill();
    };
  }, [to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

export default function AboutMe() {
  const rootRef = useRef(null);
  const bioSectionRef = useRef(null);
  const timelineRef = useRef(null);
  const progressRef = useRef(null);
  const imageRef = useRef(null);
  const portraitRef = useRef(null);
  const rowRef = useRef(null);
  const scrollTiltRef = useRef(null);
  const mouseTiltRef = useRef(null);
  const archRef = useRef(null);

  useIsoLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        gsap.set('.name-word', { yPercent: 115, force3D: true });
        const nameTl = gsap.timeline({ paused: true }).to('.name-word', {
          yPercent: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
        });
        whenFontsReady('SquidBoy').then(() => {
          if (!cancelled) nameTl.play();
        });

        gsap.set('.stat-card', { transition: 'none' });
        gsap.from('.stat-card', {
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
          force3D: true,
          clearProps: 'transform,opacity,transition',
          scrollTrigger: { trigger: '.stats-row', start: 'top 88%', once: true },
        });

        gsap.from(portraitRef.current, {
          opacity: 0,
          duration: 1.1,
          ease: 'power2.out',
          clearProps: 'opacity',
          scrollTrigger: { trigger: imageRef.current, start: 'top 88%', once: true },
        });
        gsap.from(imageRef.current, {
          x: 50,
          scale: 0.95,
          duration: 1.1,
          ease: 'power3.out',
          force3D: true,
          clearProps: 'transform',
          scrollTrigger: { trigger: imageRef.current, start: 'top 88%', once: true },
        });

        gsap.fromTo(
          progressRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 65%',
              end: 'bottom 75%',
              scrub: true,
            },
          }
        );

        gsap.utils.toArray('.chapter').forEach((el) => {
          const trigger = { trigger: el, start: 'top 85%', once: true };
          const card = el.querySelector('.chapter-card');

          gsap.set(card, { transition: 'none' });
          gsap.from(card, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
            force3D: true,
            clearProps: 'transform,opacity,transition',
            scrollTrigger: trigger,
          });
          gsap.from(el.querySelector('.chapter-dot'), {
            scale: 0,
            duration: 0.5,
            ease: 'back.out(2.2)',
            scrollTrigger: trigger,
          });
          el.querySelectorAll('.about-hl').forEach((mark) => {
            gsap.fromTo(
              mark,
              { backgroundSize: '0% 100%' },
              {
                backgroundSize: '100% 100%',
                duration: 0.8,
                delay: 0.3,
                ease: 'power2.out',
                scrollTrigger: trigger,
              }
            );
          });
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.set('.name-word', { yPercent: 0 });
        gsap.set('.stat-card', { opacity: 1, y: 0 });
        gsap.set(portraitRef.current, { opacity: 1 });
        gsap.set(imageRef.current, { x: 0, scale: 1 });
        gsap.set(progressRef.current, { scaleY: 1 });
      });

    }, rootRef);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const pinEl = portraitRef.current;
      const row = rowRef.current;
      if (!pinEl || !row) return;

      ScrollTrigger.create({
        trigger: row,
        start: 'top top+=96',
        end: () => 'bottom ' + (pinEl.offsetHeight + 96),
        pin: pinEl,
        pinSpacing: false,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });

      if (prefersReducedMotion()) return;

      gsap.fromTo(
        scrollTiltRef.current,
        { rotationY: -12, rotationX: 3 },
        {
          rotationY: 12,
          rotationX: -3,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top 70%',
            end: 'bottom 40%',
            scrub: 1,
          },
        }
      );

      const tilt = mouseTiltRef.current;
      const arch = archRef.current;
      const rx = gsap.quickTo(tilt, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      const ry = gsap.quickTo(tilt, 'rotationY', { duration: 0.6, ease: 'power3.out' });

      const onMove = (e) => {
        const r = pinEl.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        ry((px - 0.5) * 16);
        rx(-(py - 0.5) * 12);
        arch.style.setProperty('--mx', `${px * 100}%`);
        arch.style.setProperty('--my', `${py * 100}%`);
      };
      const onLeave = () => {
        ry(0);
        rx(0);
        arch.style.setProperty('--mx', '30%');
        arch.style.setProperty('--my', '20%');
      };
      pinEl.addEventListener('mousemove', onMove);
      pinEl.addEventListener('mouseleave', onLeave);

      return () => {
        pinEl.removeEventListener('mousemove', onMove);
        pinEl.removeEventListener('mouseleave', onLeave);
      };
    });

    return () => mm.revert();
  }, []);

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 600);
    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="w-full min-h-screen bg-[#FFFCFB] relative overflow-x-clip pb-0 m-0 text-[#14120e]"
    >
      <div
        className="fixed inset-0 pointer-events-none z-[999] bg-[url('/noise.gif')] bg-repeat"
        style={{ opacity: 0.03 }}
      />

      <style>{`
        @font-face {
          font-family: 'SquidBoy';
          src: url('/Fonts/SquidBoy.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: block;
        }

        @font-face {
          font-family: 'SquidBoy';
          src: url('/Fonts/SquidBoy-Bold.otf') format('opentype');
          font-weight: bold;
          font-style: normal;
          font-display: block;
        }

        @font-face {
          font-family: 'GroteskFont';
          src: url('/grotesk.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'ParaFont';
          src: url('/ParaFont.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        .about-hl {
          background-color: #FFC300;
          color: #14120e;
          padding: 0.1em 0.3em;
          margin: 0 0.05em;
          border-radius: 3px;
          display: inline;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
      `}</style>

      <div
        ref={bioSectionRef}
        className="max-w-[1150px] w-full mx-auto pt-20 sm:pt-36 pb-6 px-4 sm:px-8 flex flex-col items-center relative z-20"
      >
        {/* Name */}
        <h2
          style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '0.5px' }}
          className="w-full text-center text-[#D42C2C] text-2xl sm:text-6xl md:text-[5rem] leading-[1.1] mb-3 sm:mb-6 capitalize"
        >
          {['Akshay', 'Shrivastava'].map((w, i) => (
            <span key={w} className="inline-block overflow-hidden align-bottom pb-[0.14em] mr-[0.25em] last:mr-0">
              <span className={`name-word inline-block will-change-transform ${i === 1 ? 'text-[#14120e]' : ''}`}>{w}</span>
            </span>
          ))}
        </h2>

        {/* Numbers */}
        <div className="stats-row w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-20">
          {STATS.map((st) => (
            <div
              key={st.label}
              className={`stat-card relative ${st.tilt} hover:rotate-0 hover:-translate-y-1 transition-transform duration-300 drop-shadow-[0_10px_18px_rgba(0,0,0,0.12)]`}
            >
              <div
                className={`absolute -top-2.5 left-1/2 -translate-x-1/2 ${st.tape} w-12 sm:w-16 h-3.5 sm:h-5 bg-[#E8DCB8]/90 border border-amber-900/10 z-10 pointer-events-none`}
              />
              <div
                className={`${st.paper} px-4 pt-6 pb-7 sm:pt-9 sm:pb-11 text-center`}
                style={tornMask}
              >
                <div
                  style={{ fontFamily: "'SquidBoy', sans-serif" }}
                  className="text-[#D42C2C] text-3xl sm:text-5xl leading-none"
                >
                  <CountUp to={st.to} suffix={st.suffix} />
                </div>
                <p
                  style={{ fontFamily: "'ParaFont', sans-serif", letterSpacing: '-0.2px' }}
                  className="m-0 mt-1.5 sm:mt-2 text-[11px] sm:text-sm text-[#3b352e] leading-snug"
                >
                  {st.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline + portrait */}
        <div
          ref={rowRef}
          className="w-full flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-16 relative z-10"
        >
          {/* TIMELINE */}
          <div ref={timelineRef} className="flex-1 w-full relative pl-8 sm:pl-14">
            <div className="absolute left-[9px] sm:left-[15px] top-2 bottom-2 w-[3px] rounded bg-black/10" />
            <div
              ref={progressRef}
              className="absolute left-[9px] sm:left-[15px] top-2 bottom-2 w-[3px] rounded bg-[#D42C2C] origin-top"
            />

            {CHAPTERS.map((c) => (
              <article key={c.num} className="chapter relative mb-6 sm:mb-12 last:mb-0">
                <span
                  style={{ fontFamily: "'SquidBoy', sans-serif" }}
                  className="chapter-dot absolute -left-8 sm:-left-14 top-2.5 sm:top-3 w-5 h-5 sm:w-8 sm:h-8 rounded-full bg-[#FFFCFB] border-[2px] sm:border-[3px] border-[#D42C2C] flex items-center justify-center text-[8px] sm:text-xs text-[#D42C2C] z-10"
                >
                  {c.num}
                </span>

                <div
                  className={`chapter-card p-4 sm:p-8 rounded-[12px] sm:rounded-[16px] border shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-transform duration-300 ${
                    c.finale
                      ? 'bg-[#D42C2C] border-[#D42C2C] text-white'
                      : 'bg-white/70 backdrop-blur-md border-black/10 text-[#14120e]'
                  }`}
                >
                  <span
                    style={{ fontFamily: "'GroteskFont', sans-serif" }}
                    className={`block text-[9px] sm:text-xs uppercase tracking-[0.2em] mb-1 ${
                      c.finale ? 'text-white/70' : 'text-[#14120e]/50'
                    }`}
                  >
                    Chapter {c.num}
                  </span>
                  <h3
                    style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '0.5px' }}
                    className={`m-0 mb-2 sm:mb-3 text-lg sm:text-3xl leading-tight capitalize ${
                      c.finale ? 'text-[#FFC300]' : 'text-[#D42C2C]'
                    }`}
                  >
                    {c.title}
                  </h3>
                  <p
                    style={{ fontFamily: "'ParaFont', sans-serif", letterSpacing: '-0.2px', fontWeight: 400 }}
                    className="m-0 text-[11px] sm:text-base md:text-lg leading-relaxed font-light"
                  >
                    {renderBody(c.body)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          {/* PORTRAIT */}
          <div
            ref={portraitRef}
            className="order-first lg:order-last relative w-[200px] xs:w-[240px] sm:w-[340px] lg:w-[360px] shrink-0 mb-4 lg:mb-0"
            style={{ perspective: '1100px' }}
          >
            <div ref={imageRef} style={{ transformStyle: 'preserve-3d' }}>
              <div ref={scrollTiltRef} style={{ transformStyle: 'preserve-3d' }}>
                <div ref={mouseTiltRef} className="relative" style={{ transformStyle: 'preserve-3d' }}>
                  <div
                    className="absolute -bottom-5 sm:-bottom-7 left-[8%] right-[8%] h-5 sm:h-6 rounded-full bg-black/25 blur-xl pointer-events-none"
                    style={{ transform: 'translateZ(-60px)' }}
                  />

                  <div
                    className="absolute -top-3 -right-4 sm:-top-4 sm:-right-10 w-[62%] aspect-square pointer-events-none"
                    style={{ transform: 'translateZ(-70px)' }}
                  >
                    <div className="w-full h-full rounded-full border-2 border-dashed border-[#14120e]/35 animate-[spin_40s_linear_infinite] motion-reduce:animate-none" />
                  </div>

                  <div
                    className="absolute inset-x-0 bottom-0 top-[10%] rounded-t-[999px] border-2 border-[#14120e] pointer-events-none"
                    style={{ transform: 'translate3d(12px, 12px, -40px)' }}
                  />

                  <div
                    ref={archRef}
                    className="absolute inset-x-0 bottom-0 top-[10%] rounded-t-[999px] overflow-hidden"
                    style={{
                      background:
                        'radial-gradient(circle at var(--mx, 30%) var(--my, 20%), rgba(255,255,255,0.22), transparent 55%), #D42C2C',
                    }}
                  >
                    <div
                      className="absolute inset-0 bg-[url('/noise.gif')] bg-repeat pointer-events-none"
                      style={{ opacity: 0.1, mixBlendMode: 'multiply' }}
                    />
                    <div className="absolute inset-3 rounded-t-[999px] border border-white/35 pointer-events-none" />
                  </div>

                  <img
                    src="/me.png"
                    alt="Akshay Shrivastava"
                    onLoad={() => ScrollTrigger.refresh()}
                    className="relative block w-full h-auto select-none drop-shadow-[0_12px_20px_rgba(0,0,0,0.25)]"
                    style={{ transform: 'translateZ(30px)' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="m-0 p-0 mb-0">
        <SocialProof />
      </div>

      <Footer />
    </div>
  );
}