import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialProof from '../components/SocialProof';
import Footer from './Footer';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import StatsCounter from '../components/StatsCounter';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 🎬 REAL SHOWCASE DATA WITH HOSTINGER LINKS
const SHORT_FORMS = [
  { id: 'msf1', title: '3D Kinetic Typography', brand: 'UGC Ad', videoUrl: 'https://akshayshrivastava.com/videos/short2.mp4', poster: 'https://akshayshrivastava.com/images/short2.png' },
  { id: 'msf2', title: 'Abstract Product Reel', brand: '3D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short4.mp4', poster: 'https://akshayshrivastava.com/images/short4.png' },
  { id: 'msf3', title: 'Logo Reveal Loop', brand: 'VFX', videoUrl: 'https://akshayshrivastava.com/videos/short6.mp4', poster: 'https://akshayshrivastava.com/images/short6.png' },
  { id: 'msf4', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short7.mp4', poster: 'https://akshayshrivastava.com/images/short7.png' },
  { id: 'msf5', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short9.mp4', poster: 'https://akshayshrivastava.com/images/short9.png' },
  { id: 'msf6', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short13.mp4', poster: 'https://akshayshrivastava.com/images/short13.png' },
  { id: 'msf7', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short14.mp4', poster: 'https://akshayshrivastava.com/images/short14.png' },
  { id: 'msf8', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short15.mp4', poster: 'https://akshayshrivastava.com/images/short15.png' },
  { id: 'msf9', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short20.mp4', poster: 'https://akshayshrivastava.com/images/short20.png' },
];

const LONG_FORMS = [
  { id: 'mlf1', title: 'Explainer Film Loop', category: 'Animation', videoUrl: 'https://akshayshrivastava.com/videos/long1.mp4', poster: 'https://akshayshrivastava.com/images/long1.png' },
  { id: 'mlf2', title: 'Campus Documentary Intro', category: 'Titles', videoUrl: 'https://akshayshrivastava.com/videos/long2.mp4', poster: 'https://akshayshrivastava.com/images/long2.png' },
  { id: 'mlf3', title: 'SaaS Platform Walkthrough', category: '3D UI', videoUrl: 'https://akshayshrivastava.com/videos/long3.mp4', poster: 'https://akshayshrivastava.com/images/long3.png' },
];

const duplicateList = (arr, count = 2) => {
  let output = [];
  for (let i = 0; i < count; i++) {
    output = [...output, ...arr];
  }
  return output;
};

// 🎥 SINGLE VIDEO CARD WITH AUTOPLAY & ISOLATED HOVER PLAY
function VideoCard({ item, aspectRatio = "wide", hoveredId, setHoveredId, onOpenModal }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isHovered = hoveredId === item.id;
  const isAnyHovered = hoveredId !== null;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current) return;

    if (!isVisible) {
      videoRef.current.pause();
      return;
    }

    // Logic: If any card is hovered, ONLY play the hovered one. Otherwise, autoplay all visible cards.
    const shouldPlay = isAnyHovered ? isHovered : true;

    if (shouldPlay) {
      if (!videoRef.current.src) {
        videoRef.current.src = item.videoUrl;
      }
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isVisible, isHovered, isAnyHovered, item.videoUrl]);

  const cardDimensions = aspectRatio === "wide" 
    ? "w-[240px] xs:w-[270px] sm:w-[420px] h-[135px] xs:h-[150px] sm:h-[260px]" 
    : "w-[150px] xs:w-[180px] sm:w-[300px] aspect-[9/16]";

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={() => onOpenModal(item)}
      className={`relative group overflow-hidden cursor-pointer bg-[#14120e] shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(212,44,44,0.15)] ${cardDimensions} shrink-0 outline-none focus:outline-none select-none rounded-[8px]`}
    >
      <video
        ref={videoRef}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="metadata"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 filter brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 outline-none focus:outline-none pointer-events-none"
      />

      {/* Bottom scrim */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/70 via-black/25 to-transparent pointer-events-none" />

      {/* PLAIN TEXT TAG */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5 sm:p-5 pointer-events-none">
        <h4 
          style={{ fontFamily: "'GroteskFont', sans-serif", letterSpacing: '-0.2px', fontWeight: 400 }}
          className="text-[#FFFCFB] text-[11px] sm:text-lg leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] m-0"
        >
          {item.title}
        </h4>
        {(item.brand || item.category) && (
          <p 
            style={{ fontFamily: "'GroteskFont', sans-serif", letterSpacing: '-0.1px', fontWeight: 400 }}
            className="text-[#FFFCFB]/75 text-[8px] sm:text-[11px] leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] m-0 mt-0.5"
          >
            {item.brand || item.category}
          </p>
        )}
      </div>
    </div>
  );
}

// 🎠 MARQUEE ROW
function MarqueeRow({ items, aspectRatio, direction = 'left', hoveredId, setHoveredId, onOpenModal, speed = 45 }) {
  const containerRef = useRef(null);
  const hoveredIdRef = useRef(hoveredId);
  const isDraggingRef = useRef(false);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const draggedRef = useRef(false);
  const momentumRafRef = useRef(null);

  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  useEffect(() => {
    return () => {
      if (momentumRafRef.current) cancelAnimationFrame(momentumRafRef.current);
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (direction === 'right') {
      el.scrollLeft = el.scrollWidth / 2;
    }

    const step = (timestamp) => {
      if (lastTimeRef.current == null) lastTimeRef.current = timestamp;
      const delta = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      if (hoveredIdRef.current == null && !isDraggingRef.current) {
        const half = el.scrollWidth / 2;
        const dir = direction === 'left' ? 1 : -1;

        el.scrollLeft += dir * speed * (delta / 1000);

        if (half > 0) {
          if (el.scrollLeft >= half) {
            el.scrollLeft -= half;
          } else if (el.scrollLeft <= 0) {
            el.scrollLeft += half;
          }
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [direction, speed]);

  const DRAG_THRESHOLD = 8;

  const handleMouseDown = (e) => {
    const el = containerRef.current;
    if (!el) return;

    if (momentumRafRef.current) {
      cancelAnimationFrame(momentumRafRef.current);
      momentumRafRef.current = null;
    }

    draggedRef.current = false;
    const startX = e.clientX;
    const startScroll = el.scrollLeft;
    let lastX = e.clientX;
    let lastTime = performance.now();
    let velocity = 0;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;

      if (!isDraggingRef.current) {
        if (Math.abs(dx) < DRAG_THRESHOLD) return;
        isDraggingRef.current = true;
        draggedRef.current = true;
        el.style.cursor = 'grabbing';
      }

      el.scrollLeft = startScroll - dx;

      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) {
        velocity = (moveEvent.clientX - lastX) / dt;
      }
      lastX = moveEvent.clientX;
      lastTime = now;
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      el.style.cursor = 'grab';

      let scrollVelocity = -velocity;
      let lastTs = null;

      const glide = (ts) => {
        if (lastTs == null) lastTs = ts;
        const dt = ts - lastTs;
        lastTs = ts;

        el.scrollLeft += scrollVelocity * dt;
        scrollVelocity *= Math.pow(0.94, dt / 16.67);

        const half = el.scrollWidth / 2;
        if (half > 0) {
          if (el.scrollLeft >= half) el.scrollLeft -= half;
          else if (el.scrollLeft <= 0) el.scrollLeft += half;
        }

        if (Math.abs(scrollVelocity) > 0.02) {
          momentumRafRef.current = requestAnimationFrame(glide);
        } else {
          momentumRafRef.current = null;
          isDraggingRef.current = false;
        }
      };

      if (draggedRef.current && Math.abs(scrollVelocity) > 0.02) {
        momentumRafRef.current = requestAnimationFrame(glide);
      } else {
        isDraggingRef.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleContainerMouseLeave = () => {
    setHoveredId(null);
  };

  const handleClickCapture = (e) => {
    if (draggedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      draggedRef.current = false;
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseLeave={handleContainerMouseLeave}
      onMouseDown={handleMouseDown}
      onTouchStart={() => { isDraggingRef.current = true; }}
      onTouchEnd={() => { isDraggingRef.current = false; }}
      onClickCapture={handleClickCapture}
      className="w-full max-w-full overflow-x-scroll overflow-y-hidden pt-2 pb-4 sm:pb-6 cursor-grab select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-3 sm:px-8"
      style={{ touchAction: 'pan-y' }}
    >
      <div className="inline-flex whitespace-nowrap gap-3 sm:gap-8 w-max">
        {items.map((item, idx) => (
          <VideoCard
            key={`${item.id}-${idx}`}
            item={item}
            aspectRatio={aspectRatio}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            onOpenModal={onOpenModal}
          />
        ))}
      </div>
    </div>
  );
}

export default function MotionDesign() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredShortId, setHoveredShortId] = useState(null);
  const [hoveredLongId, setHoveredLongId] = useState(null);
  
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const heroVideoRef = useRef(null);

  const featuredSectionRef = useRef(null);
  const reelRef = useRef(null);
  const textContentRef = useRef(null);

  const toggleHeroSound = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !isHeroMuted;
      setIsHeroMuted(!isHeroMuted);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedVideo(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 1024;

      gsap.set(reelRef.current, { x: isMobile ? 0 : -50, opacity: 0 });
      gsap.set(textContentRef.current, { x: isMobile ? 0 : 50, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: featuredSectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      });

      tl.to(reelRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: 'power3.out',
      })
      .to(textContentRef.current, {
        opacity: 1,
        x: 0,
        duration: 1.1,
        ease: 'power3.out',
      }, "<0.15");
    }, featuredSectionRef);

    return () => ctx.revert();
  }, []);

  const isShortForm = selectedVideo && SHORT_FORMS.some(s => s.id === selectedVideo.id);

  return (
    <div className="w-full min-h-screen bg-[#FFFCFB] relative overflow-x-hidden pb-12 sm:pb-24 m-0 text-[#14120e]">
      
      <div 
        className="fixed inset-0 pointer-events-none z-[999] bg-[url('/noise.gif')] bg-repeat"
        style={{ opacity: 0.03, mixBlendMode: 'multiply' }}
      />

      <style>{`
        @font-face {
          font-family: 'SquidBoy';
          src: url('/Fonts/SquidBoy.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'SquidBoy';
          src: url('/Fonts/SquidBoy-Bold.otf') format('opentype');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
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
        .editing-cutout-mask {
          mask-image: url('/editingcutout.svg');
          -webkit-mask-image: url('/editingcutout.svg');
          mask-size: 100% 100%;
          -webkit-mask-size: 100% 100%;
          mask-repeat: no-repeat;
          -webkit-mask-repeat: no-repeat;
          mask-position: bottom center;
          -webkit-mask-position: bottom center;
        }
      `}</style>

      {/* HERO BANNER */}
      <div className="relative w-full h-[60vh] sm:h-screen bg-[#14120e] flex flex-col justify-center items-center overflow-hidden m-0 p-0 editing-cutout-mask"> 
        <video 
          ref={heroVideoRef}
          src="https://akshayshrivastava.com/videos/MotionMain.mp4" 
          poster="https://akshayshrivastava.com/images/MotionMain.png"
          autoPlay 
          loop 
          muted={isHeroMuted} 
          playsInline 
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-[0.55] contrast-105"
        />

        <button
          onClick={toggleHeroSound}
          className="absolute bottom-8 left-4 sm:bottom-12 sm:left-10 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#FFC300] hover:scale-110 transition-all duration-300 shadow-xl cursor-pointer group"
          title={isHeroMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isHeroMuted ? (
            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current text-[#FFC300]" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 sm:w-5 sm:h-5 fill-current text-[#D42C2C]" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        <div className="absolute inset-0 bg-gradient-to-b from-[#14120e]/70 via-[#14120e]/20 to-[#14120e]/80 z-[1] pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-center items-center px-4 text-center">
          <h1 
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '1px' }}
            className="text-[2.5rem] sm:text-[5.5rem] text-[#FFFCFB] m-0 text-center leading-none drop-shadow-lg capitalize"
          >
            Motion Work
          </h1>

          <p 
            style={{ fontFamily: "'ParaFont', sans-serif", fontWeight: 400, letterSpacing: '-0.3px' }}
            className="text-[#FFFCFB] text-xs sm:text-base md:text-lg max-w-[600px] leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] px-4 mt-4 sm:mt-6"
          >
            Making things move is easy. Making them move for a reason is the tricky part. Here you'll find animated typography, graphics, 2D/3D work and visual experiments built to actually add something to the story.
          </p>
        </div>
      </div>

      {/* HEADER & FEATURED REEL */}
      <div ref={featuredSectionRef} className="w-full mx-auto pt-8 sm:pt-16 pb-8 px-4 sm:px-12 relative z-20 overflow-hidden">
        <div className="flex flex-col items-center text-center mb-8 sm:mb-14">
          <h2 
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing:'1px' }}
            className="text-xl sm:text-4xl m-0 text-[#D42C2C] leading-tight capitalize"
          >
            Welcome to Motion Design section
          </h2>
        </div>

        <div className="max-w-[1050px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 sm:gap-14 relative">
          <div ref={reelRef} className="w-[220px] xs:w-[260px] sm:w-[320px] aspect-[9/16] shrink-0 rounded-[8px] overflow-hidden shadow-2xl bg-black relative">
            <CustomVideoPlayer 
              src="https://akshayshrivastava.com/videos/MotionMain.mp4"
              poster="https://akshayshrivastava.com/images/MotionMain.png"
              className="w-full h-full"
              autoPlay={true}
              muted={true}
            />
          </div>

          <div ref={textContentRef} className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left px-2 sm:px-0 max-w-lg">
            <h3 
              style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '0.5px' }}
              className="text-xl sm:text-3xl md:text-[2.2rem] text-[#D42C2C] leading-tight mb-3 sm:mb-4 capitalize"
            >
              Bringing Ideas to Life Through Motion
            </h3>
            <p 
              style={{ fontFamily: "'ParaFont', sans-serif", fontWeight: 400, letterSpacing: '-0.3px' }}
              className="text-[#3b352e] text-xs sm:text-lg leading-relaxed font-light"
            >
              I'm a superfan of motion. I love to play and experiment with countable layers and uncountable keyframes, because there's something ridiculously satisfying about watching a bunch of tiny movements come together and suddenly make sense.
            </p>
          </div>
        </div>
      </div>

      {/* SHORT FORMS */}
      <div className="w-full max-w-full relative overflow-hidden my-6 sm:my-20">
        <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 flex flex-col items-center text-center mb-4 sm:mb-6">
          <h3 
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing : '1px' }}
            className="text-xl sm:text-4xl m-0 text-[#D42C2C] leading-tight capitalize"
          >
            Short Forms
          </h3>

          <div 
            style={{ fontFamily: "'ParaFont', sans-serif", letterSpacing: '0.5px' }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-1.5 sm:mt-3 text-[#3b352e] text-[10px] sm:text-base tracking-wider text-center capitalize"
          >
            <span>3D Motion</span>
            <span className="text-[#FFC300]">•</span>
            <span>Logo Reveals</span>
            <span className="text-[#FFC300]">•</span>
            <span>UGC Ads</span>
            <span className="text-[#FFC300]">•</span>
            <span>Kinetic Loops</span>
          </div>
        </div>
        
        <MarqueeRow
          items={duplicateList(SHORT_FORMS)}
          aspectRatio="tall"
          direction="left"
          speed={40}
          hoveredId={hoveredShortId}
          setHoveredId={setHoveredShortId}
          onOpenModal={setSelectedVideo}
        />
      </div>

      {/* LONG FORMS */}
      <div className="w-full max-w-full relative overflow-hidden my-6 sm:my-20">
        <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 flex flex-col items-center text-center mb-4 sm:mb-6">
          <h3 
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing : '1px' }}
            className="text-xl sm:text-4xl m-0 text-[#D42C2C] leading-tight capitalize"
          >
            Long Forms
          </h3>

          <div 
            style={{ fontFamily: "'ParaFont', sans-serif", letterSpacing: '0.5px' }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-1.5 sm:mt-3 text-[#3b352e] text-[10px] sm:text-base tracking-wider text-center capitalize"
          >
            <span>Animated Explainers</span>
            <span className="text-[#FFC300]">•</span>
            <span>Title Sequences</span>
            <span className="text-[#FFC300]">•</span>
            <span>3D Visuals</span>
          </div>
        </div>

        <MarqueeRow
          items={duplicateList(LONG_FORMS)}
          aspectRatio="wide"
          direction="right"
          speed={55}
          hoveredId={hoveredLongId}
          setHoveredId={setHoveredLongId}
          onOpenModal={setSelectedVideo}
        />
      </div>

      <StatsCounter/>

      {/* SOCIAL PROOF */}
      <div className="m-0 p-0 mb-6 sm:mb-20">
        <SocialProof />
      </div>

      {/* FULLSCREEN PREVIEW */}
      {selectedVideo && (
        <div 
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-8 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${isShortForm ? 'max-w-[320px] sm:max-w-[380px] aspect-[9/16] rounded-[8px] bg-black' : 'max-w-5xl rounded-[8px] bg-[#FFFCFB]'} overflow-hidden shadow-2xl cursor-default flex flex-col`}
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className={`absolute top-3 right-3 sm:top-4 sm:right-4 z-[1000] w-8 h-8 sm:w-10 sm:h-10 rounded-full ${isShortForm ? 'bg-black/60 text-white' : 'bg-[#14120e] text-[#FFFCFB] hover:bg-[#D42C2C]'} flex items-center justify-center font-bold text-base sm:text-lg transition-all shadow-lg cursor-pointer backdrop-blur-md`}
            >
              ✕
            </button>

            {isShortForm ? (
              <div className="w-full h-full bg-black flex-1 relative">
                <CustomVideoPlayer 
                  src={selectedVideo.videoUrl} 
                  autoPlay={true}
                  loop={true}
                  muted={false}
                  className="w-full h-full"
                  videoClassName="w-full h-full object-cover outline-none"
                />
              </div>
            ) : (
              <>
                <div className="aspect-video w-full bg-black">
                  <CustomVideoPlayer 
                    src={selectedVideo.videoUrl} 
                    badgeText={selectedVideo.category || selectedVideo.brand || "Preview"} 
                    className="w-full h-full"
                    autoPlay={true}
                    muted={false}
                  />
                </div>
                <div className="p-3 sm:p-6 bg-[#FFFCFB] text-[#14120e] flex items-center justify-between border-t border-black/5">
                  <h3 
                    style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '0.5px' }}
                    className="text-base sm:text-2xl text-[#D42C2C] capitalize"
                  >
                    {selectedVideo.title}
                  </h3>
                  {(selectedVideo.brand || selectedVideo.category) && (
                    <span 
                      style={{ fontFamily: "'GroteskFont', sans-serif", letterSpacing: '-0.3px', fontWeight: 400 }}
                      className="text-[9px] sm:text-xs capitalize text-[#554f46] bg-[#f0eae1] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[4px]"
                    >
                      {selectedVideo.brand || selectedVideo.category}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <Footer />
    </div>
  );
}