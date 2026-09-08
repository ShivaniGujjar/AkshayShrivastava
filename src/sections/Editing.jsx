import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialProof from '../components/SocialProof';
import Footer from './Footer';
import CustomVideoPlayer from '../components/CustomVideoPlayer';


if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 🎬 REAL SHOWCASE DATA WITH HOSTINGER LINKS
const LONG_FORMS = [
  { id: 'lf1', title: '1', category: 'Podcast', videoUrl: 'https://akshayshrivastava.com/videos/long1.mp4', poster: 'https://akshayshrivastava.com/images/long1.png' },
  { id: 'lf2', title: '2', category: 'Edutainment', videoUrl: 'https://akshayshrivastava.com/videos/long2.mp4', poster: 'https://akshayshrivastava.com/images/long2.png' },
  { id: 'lf3', title: '3', category: 'Documentary', videoUrl: 'https://akshayshrivastava.com/videos/long3.mp4', poster: 'https://akshayshrivastava.com/images/long3.png' },
  { id: 'lf4', title: 'Talking Head Masterclass', category: 'Vlog', videoUrl: 'https://akshayshrivastava.com/videos/long4.mp4', poster: 'https://akshayshrivastava.com/images/long4.png' },
  { id: 'lf5', title: 'Talking Head Masterclass', category: 'Vlog', videoUrl: 'https://akshayshrivastava.com/videos/long5.mp4', poster: 'https://akshayshrivastava.com/images/long5.png' },
  { id: 'lf6', title: 'Talking Head Masterclass', category: 'Vlog', videoUrl: 'https://akshayshrivastava.com/videos/long6.mp4', poster: 'https://akshayshrivastava.com/images/long6.png' },
];

const SHORT_FORMS_ROW1 = [
  { id: 'sf1', title: 'Retention Hook 1', brand: 'Waywen', videoUrl: 'https://akshayshrivastava.com/videos/short3.mp4', poster: 'https://akshayshrivastava.com/images/short3.png' },
  { id: 'sf2', title: 'Viral Podcast Clip 2', brand: 'Edutainment', videoUrl: 'https://akshayshrivastava.com/videos/short19.mp4', poster: 'https://akshayshrivastava.com/images/short19.png' },
  { id: 'sf3', title: 'Brand Story Reel 3', brand: 'Kolkata Media', videoUrl: 'https://akshayshrivastava.com/videos/short5.mp4', poster: 'https://akshayshrivastava.com/images/short5.png' },
  { id: 'sf4', title: 'Fitness Campaign 4', brand: 'Fit Tribe', videoUrl: 'https://akshayshrivastava.com/videos/short10.mp4', poster: 'https://akshayshrivastava.com/images/short10.png' },
  { id: 'sf5', title: 'Short Clip 5', brand: 'Brand Y', videoUrl: 'https://akshayshrivastava.com/videos/short17.mp4', poster: 'https://akshayshrivastava.com/images/short17.png' },
];

const SHORT_FORMS_ROW2 = [
  { id: 'sf11', title: 'Short Clip 11', brand: 'Brand Z', videoUrl: 'https://akshayshrivastava.com/videos/short8.mp4', poster: 'https://akshayshrivastava.com/images/short8.png' },
  { id: 'sf10', title: 'Short Clip 10', brand: 'Startup A', videoUrl: 'https://akshayshrivastava.com/videos/short11.mp4', poster: 'https://akshayshrivastava.com/images/short11.png' },
  { id: 'sf9', title: 'Short Clip 9', brand: 'Creator E', videoUrl: 'https://akshayshrivastava.com/videos/short16.mp4', poster: 'https://akshayshrivastava.com/images/short16.png' },
  { id: 'sf8', title: 'Short Clip 8', brand: 'Creator F', videoUrl: 'https://akshayshrivastava.com/videos/short12.mp4', poster: 'https://akshayshrivastava.com/images/short12.png' },
  { id: 'sf7', title: 'Short Clip 7', brand: 'Media G', videoUrl: 'https://akshayshrivastava.com/videos/short1.mp4', poster: 'https://akshayshrivastava.com/images/short1.png' },
  { id: 'sf6', title: 'Short Clip 6', brand: 'Media H', videoUrl: 'https://akshayshrivastava.com/videos/short18.mp4', poster: 'https://akshayshrivastava.com/images/short18.png' },
];

const duplicateList = (arr, count = 2) => {
  let output = [];
  for (let i = 0; i < count; i++) {
    output = [...output, ...arr];
  }
  return output;
};

// 🎥 SINGLE VIDEO CARD WITH HOVER PREVIEW
function VideoCard({ item, aspectRatio = "wide", hoveredId, setHoveredId, onOpenModal }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const isHovered = hoveredId === item.id;
  const isAnyHovered = hoveredId !== null;
  const isShort = aspectRatio === "tall";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
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

  // Responsive Card Dimensions optimized for mobile & desktop
  const cardDimensions = aspectRatio === "wide" 
    ? "w-[240px] xs:w-[280px] sm:w-[420px] h-[140px] xs:h-[160px] sm:h-[260px]" 
    : "w-[160px] xs:w-[200px] sm:w-[300px] aspect-[9/16]";

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={() => onOpenModal(item)}
      className={`relative group overflow-hidden cursor-pointer bg-[#0f0e0c] shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(212,44,44,0.15)] ${cardDimensions} shrink-0 outline-none focus:outline-none select-none rounded-[8px]`}
    >
      <video
        ref={videoRef}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="none"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 filter brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 outline-none focus:outline-none pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c]/90 via-[#0f0e0c]/25 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

      {/* Subtle bottom fade to blend with page lighting */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0f0e0c]/60 to-transparent pointer-events-none" />

      {/* Badge / Category for Long forms */}
      {!isShort && item.category && (
        <div 
          style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '0.5px' }}
          className="absolute top-2.5 left-2.5 sm:top-4 sm:left-4 bg-[#D42C2C]/90 backdrop-blur-md px-2 sm:px-3 py-0.5 sm:py-1 rounded-[4px] text-[#FFFCFB] text-[9px] sm:text-xs capitalize shadow-sm"
        >
          {item.category}
        </div>
      )}

      <div className={`absolute top-2.5 right-2.5 sm:top-4 sm:right-4 w-6 h-6 sm:w-9 sm:h-9 rounded-[4px] backdrop-blur-md flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-110 bg-[#D42C2C] text-[#FFFCFB] shadow-[0_0_20px_rgba(212,44,44,0.6)]' : 'bg-black/40 text-[#FFFCFB]'}`}>
        {isHovered ? (
          <span className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 bg-[#FFFCFB] rounded-[2px] animate-pulse" />
        ) : (
          <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 transform transition-transform duration-300">
        {!isShort && (
          <h4 
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '0.5px' }}
            className="text-[#FFFCFB] text-sm sm:text-2xl leading-snug drop-shadow-md mb-1 capitalize"
          >
            {item.title}
          </h4>
        )}
        {item.brand && (
          <p 
            style={{ fontFamily: "'GroteskFont', sans-serif", letterSpacing: '-0.3px', fontWeight: 400 }}
            className="text-[#FFFCFB] text-[9px] sm:text-xs capitalize bg-[#D42C2C] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[4px] inline-block shadow-md"
          >
            {item.brand}
          </p>
        )}
      </div>
    </div>
  );
}

// 🎠 MARQUEE ROW — autoplay/autoscroll, pauses on hover (only hovered video plays),
// resumes on mouse leave, and supports manual drag/swipe.
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
      className="w-full max-w-full overflow-x-scroll overflow-y-hidden pt-2 pb-6 cursor-grab select-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-4 sm:px-8"
      style={{ touchAction: 'pan-y' }}
    >
      <div className="inline-flex whitespace-nowrap gap-4 sm:gap-8 w-max">
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

export default function Editing() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredLongId, setHoveredLongId] = useState(null);
  const [hoveredShort1Id, setHoveredShort1Id] = useState(null);
  const [hoveredShort2Id, setHoveredShort2Id] = useState(null);
  
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const heroVideoRef = useRef(null);

  const featuredSectionRef = useRef(null);
  const paragraphRef = useRef(null);

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
      gsap.fromTo(paragraphRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.95,
      }, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuredSectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        }
      });
    }, featuredSectionRef);

    return () => ctx.revert();
  }, []);

  const isShortForm = selectedVideo && (
    SHORT_FORMS_ROW1.some(s => s.id === selectedVideo.id) || 
    SHORT_FORMS_ROW2.some(s => s.id === selectedVideo.id)
  );

  return (
    <div className="w-full min-h-screen bg-[#FFFCFB] relative overflow-x-hidden pb-12 sm:pb-24 m-0 text-[#14120e]">
      
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
          src="https://akshayshrivastava.com/videos/EditingMain.mp4" 
          poster="https://akshayshrivastava.com/images/EditingHome.png"
          autoPlay 
          loop 
          muted={isHeroMuted} 
          playsInline 
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-[0.75] contrast-100"
        />

        {/* Noise opacity bilkul halki (0.015) */}
        <div className="absolute inset-0 pointer-events-none z-[1] bg-[url('/noise.gif')] bg-repeat opacity-[0.015] mix-blend-overlay" />

        <button
          onClick={toggleHeroSound}
          className="absolute bottom-10 left-4 sm:bottom-16 sm:left-10 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#FFC300] hover:scale-110 transition-all duration-300 shadow-xl cursor-pointer group"
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

        <div className="absolute inset-0 bg-gradient-to-t from-[#14120e]/50 via-transparent to-[#14120e]/30 z-[2] pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-center items-center px-4 text-center mt-6">
          <h1 
            style={{ 
              fontFamily: "'SquidBoy', sans-serif", 
              letterSpacing: '1px'
            }}
            className="text-[2.8rem] sm:text-[5.5rem] text-[#FFFCFB] m-0 leading-none drop-shadow-lg capitalize"
          >
            Editing Work
          </h1>
        </div>
      </div>

      {/* HEADER & FEATURED MASTERPIECE SECTION */}
      <div ref={featuredSectionRef} className="w-full mx-auto pt-8 sm:pt-16 pb-4 px-4 flex flex-col items-center relative z-20 text-center overflow-hidden">
        
        <div className="inline-flex flex-col items-center z-20 px-4">
          <h2 
            style={{ 
              fontFamily: "'SquidBoy', sans-serif", 
              letterSpacing:'1px'
            }}
            className="text-xl sm:text-4xl m-0 text-[#D42C2C] leading-tight capitalize"
          >
            Welcome To Editing Section
          </h2>
        </div>

        <div ref={paragraphRef} className="relative z-10 mt-2 sm:mt-3 mb-6 max-w-[700px] px-4">
          <p 
            style={{ 
              fontFamily: "'ParaFont', sans-serif", 
              fontWeight: 400,
              letterSpacing : '-0.5px'
            }}
            className="text-[#3b352e] text-xs sm:text-lg leading-relaxed text-center font-light tracking-wide"
          >
            I have worked with multiple startups and influencers on various kind of edit like UGC ads
          </p>
        </div>

        {/* 🍿 FULL WIDE FEATURED MASTERPIECE */}
        <div className="max-w-[950px] w-full px-2 sm:px-6 mb-8 sm:mb-10 relative z-20">
          <div className="w-full aspect-video rounded-[8px] overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.15)] bg-[#0f0e0c]">
            <CustomVideoPlayer 
              src="https://akshayshrivastava.com/videos/EditingFull.mp4"
              poster="https://akshayshrivastava.com/images/EditingHome.png"
              badgeText="Featured Masterpiece"
              className="w-full h-full"
              muted={true}
            />
          </div>
        </div>
      </div>

      

      {/* LONG FORMS */}
      <div id="long-forms" className="w-full max-w-full relative overflow-hidden my-6 sm:my-16">
        <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 flex flex-col items-center text-center mb-6 sm:mb-8">
          <h3 
            style={{ 
              fontFamily: "'SquidBoy', sans-serif", 
              letterSpacing : '1px'
            }}
            className="text-xl sm:text-4xl m-0 text-[#D42C2C] leading-tight capitalize"
          >
            Long Forms
          </h3>

          <div 
            style={{ fontFamily: "'ParaFont', sans-serif", letterSpacing: '0.5px' }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-2 sm:mt-3 text-[#3b352e] text-[11px] sm:text-base tracking-wider text-center capitalize"
          >
            <span>Podcasts</span>
            <span className="text-[#FFC300]">•</span>
            <span>Youtube Documentaries</span>
            <span className="text-[#FFC300]">•</span>
            <span>Talking Head</span>
            <span className="text-[#FFC300]">•</span>
            <span>Campus Film</span>
          </div>
        </div>

        <MarqueeRow
          items={duplicateList(LONG_FORMS)}
          aspectRatio="wide"
          direction="left"
          speed={55}
          hoveredId={hoveredLongId}
          setHoveredId={setHoveredLongId}
          onOpenModal={setSelectedVideo}
        />
      </div>

      {/* SHORT FORMS */}
      <div className="w-full max-w-full relative overflow-hidden my-6 sm:my-20">
        <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 flex flex-col items-center text-center mb-6 sm:mb-8">
          <h3 
            style={{ 
              fontFamily: "'SquidBoy', sans-serif", 
              letterSpacing : '1px'
            }}
            className="text-xl sm:text-4xl m-0 text-[#D42C2C] leading-tight capitalize"
          >
            Short Forms
          </h3>

          <div 
            style={{ fontFamily: "'ParaFont', sans-serif", letterSpacing: '0.5px' }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-2 sm:mt-3 text-[#3b352e] text-[11px] sm:text-base tracking-wider text-center capitalize"
          >
            <span>UGC Ads</span>
            <span className="text-[#FFC300]">•</span>
            <span>Retention Hooks</span>
            <span className="text-[#FFC300]">•</span>
            <span>Podcast Shorts</span>
            <span className="text-[#FFC300]">•</span>
            <span>Reels</span>
          </div>
        </div>
        
        <div className="mb-4 sm:mb-8">
          <MarqueeRow
            items={duplicateList(SHORT_FORMS_ROW1)}
            aspectRatio="tall"
            direction="left"
            speed={40}
            hoveredId={hoveredShort1Id}
            setHoveredId={setHoveredShort1Id}
            onOpenModal={setSelectedVideo}
          />
        </div>

        <MarqueeRow
          items={duplicateList(SHORT_FORMS_ROW2)}
          aspectRatio="tall"
          direction="right"
          speed={40}
          hoveredId={hoveredShort2Id}
          setHoveredId={setHoveredShort2Id}
          onOpenModal={setSelectedVideo}
        />
      </div>

      {/* 🚀 SOCIAL PROOF */}
      <div className="m-0 p-0 mb-8 sm:mb-20">
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
                  {selectedVideo.brand && (
                    <span 
                      style={{ fontFamily: "'GroteskFont', sans-serif", letterSpacing: '-0.3px', fontWeight: 300 }}
                      className="text-[9px] sm:text-xs capitalize text-[#554f46] bg-[#f0eae1] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[4px]"
                    >
                      {selectedVideo.brand}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 🚀 FOOTER */}
      <Footer />
    </div>
  );
}