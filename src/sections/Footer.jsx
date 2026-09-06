import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

const SOCIAL_LINKS = [
  { id: 'Instagram', name: 'INSTAGRAM', url: 'https://www.instagram.com/akshay__shri/?hl=en' },
  { id: 'Gmail', name: 'MAIL', url: 'mailto:client@email.com' }
];

export default function Footer() {
  const wrapperRef = useRef(null);
  const pathRef = useRef(null);
  const headRef = useRef(null);
  const labelRef = useRef(null);
  const isVisibleRef = useRef(false);
  const timelineRef = useRef(null);
  const idleTweenRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    gsap.set(headRef.current, { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' });
    gsap.set(labelRef.current, { opacity: 0, y: 6, rotate: -3 });
    gsap.set(wrapperRef.current, { opacity: 0 });

    const buildTimeline = () => {
      const tl = gsap.timeline({ paused: true });

      tl.to(wrapperRef.current, { opacity: 1, duration: 0.1 })
        .fromTo(labelRef.current, 
          { opacity: 0, y: 6, rotate: -3 }, 
          { opacity: 1, y: 0, rotate: -3, duration: 0.4, ease: 'power2.out' }
        )
        .to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.inOut'
        }, '-=0.1')
        .to(headRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'back.out(3)'
        }, '-=0.2')
        .call(() => {
          idleTweenRef.current = gsap.to(wrapperRef.current, {
            y: -5,
            rotate: 1.5,
            duration: 1.1,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
          });
        });

      return tl;
    };

    timelineRef.current = buildTimeline();

    const checkScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;
      const distanceFromBottom = fullHeight - (scrollY + viewportHeight);
      const shouldShow = distanceFromBottom < 250;

      if (shouldShow && !isVisibleRef.current) {
        isVisibleRef.current = true;
        timelineRef.current.play();
      } else if (!shouldShow && isVisibleRef.current) {
        isVisibleRef.current = false;
        idleTweenRef.current?.kill();
        timelineRef.current.pause(0);
        gsap.set(path, { strokeDashoffset: length });
        gsap.set(headRef.current, { opacity: 0, scale: 0.4 });
        gsap.set(labelRef.current, { opacity: 0, y: 6, rotate: -3 });
        gsap.set(wrapperRef.current, { opacity: 0, y: 0, rotate: 0 });
      }
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      idleTweenRef.current?.kill();
      timelineRef.current?.kill();
    };
  }, []);

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'GourmetEatery';
          src: url('/GourmetEatery.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }
      `}</style>

      
      

      <footer className="fixed bottom-8 right-5 sm:right-8 md:right-12 pointer-events-none z-[999] flex justify-end items-end">
        <div 
          className="relative pointer-events-auto bg-[#D42C2C] text-white pt-4 px-3 py-3 rounded-lg flex items-center gap-4 shadow-lg overflow-hidden"
        >
          <div 
            className="absolute inset-0 pointer-events-none z-[1] bg-[url('/noise.gif')] bg-repeat"
            style={{ opacity: 0.08, mixBlendMode: 'overlay' }}
          />

          <div className="relative z-[2] flex items-center gap-4">
            {SOCIAL_LINKS.map((link, idx) => (
              <React.Fragment key={link.id}>
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-white hover:text-[#FFC822] transition-colors text-sm sm:text-base uppercase tracking-wider leading-none flex items-center"
                  style={{ fontFamily: "GourmetEatery, cursive, sans-serif" }}
                >
                  {link.name}
                </a>
                {idx < SOCIAL_LINKS.length - 1 && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFC822] inline-block select-none self-center shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}