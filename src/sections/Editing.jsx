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

const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const ytThumbFallback = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

const LONG_FORMS = [
  { id: 'lf1', title: 'Moradabad - The brass city', category: 'Documentary', youtubeId: 'VIzWHj8FrXA' },
  { id: 'lf2', title: 'Biturbo', category: 'Edutainment', youtubeId: 'MfOuSuKKzdI' },
  { id: 'lf3', title: 'Samsara - The gin', category: 'Documentary', youtubeId: 'JUCnkdyVsGI' },
  { id: 'lf4', title: 'INDmoney Founder Masterclass', category: 'Masterclass', youtubeId: 'aYqgXabUWWs' },
  { id: 'lf5', title: 'Clovia - The lingerie brand', category: 'Edutainment', youtubeId: 'PTxuqvWqhu0' },
  { id: 'lf6', title: 'Inside the Business of HYROX', category: 'Documentary', youtubeId: 'iIhLVkXaXc8' },
  { id: 'lf7', title: 'Shamik - The comic', category: 'Podcast', youtubeId: 'On0S3Ym4FfA' },
  { id: 'lf8', title: 'Zomato & Zepto Masterclass', category: 'Podcast', youtubeId: 'uOhVaUvRVPE' },
  

  
];

const SHORT_FORMS = [
 { id: 'msf5', name: 'Scratch', type: 'Edutainment', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short9.mp4', poster: 'https://akshayshrivastava.com/images/short9.png', driveUrl: 'https://drive.google.com/file/d/1uwY-PFrG5BDBY7e5WlOJZIB18O-tCKwO/view?usp=sharing' },

  { id: 'sf1', name: "Masters' Union", type: 'Personal Brand', title: 'Retention Hook 1', brand: 'Waywen', videoUrl: 'https://akshayshrivastava.com/videos/short3.mp4', poster: 'https://akshayshrivastava.com/images/short3.png', driveUrl: 'https://drive.google.com/file/d/1Xw9i6DwueS00OjtjmihO6Un0RRNcal6v/view?usp=sharing' },

  { id: 'sf3', name: 'Vishwmitra', type: 'Performance Reel', title: 'Brand Story Reel 3', brand: 'Kolkata Media', videoUrl: 'https://akshayshrivastava.com/videos/short5.mp4', poster: 'https://akshayshrivastava.com/images/short5.png', driveUrl: 'https://drive.google.com/file/d/1KI4EhIOdQZ91bvBi_fLTbbzxloZrfPMJ/view?usp=sharing' },

  { id: 'sf2', name: 'Ankit_sr', type: "Personal Brand", title: 'Viral Podcast Clip 2', brand: 'Edutainment', videoUrl: 'https://akshayshrivastava.com/videos/short19.mp4', poster: 'https://akshayshrivastava.com/images/short19.png', driveUrl: 'https://drive.google.com/file/d/1Al5OymoNf06OhEYKG0quCGF_qQWB4J2c/view?usp=sharing' },

  { id: 'sf6', title: 'Personal Brand', brand: 'Akshay Shrivastava', videoUrl: 'https://akshayshrivastava.com/videos/short18.mp4', poster: 'https://akshayshrivastava.com/images/short18.png', driveUrl: 'https://drive.google.com/file/d/1nIuMt5bekFJO2I8aiZo6NA5E33uNegGN/view?usp=sharing' },
 
  { id: 'sf10', title: "UGC Ad's", brand: 'Frido', videoUrl: 'https://akshayshrivastava.com/videos/short11.mp4', poster: 'https://akshayshrivastava.com/images/short11.png', driveUrl: 'https://drive.google.com/file/d/1O6s9e9q8R4Zc0DdrUUB6MnNDF1km__94/view?usp=sharing' },

  { id: 'msf2', name: 'Vishwmitra', type: 'Performance Reel', title: 'Abstract Product Reel', brand: '3D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short4.mp4', poster: 'https://akshayshrivastava.com/images/short4.png', driveUrl: 'https://drive.google.com/file/d/1du-28m6tarHsR432u2SWzhcRVzKv-7YO/view?usp=sharing' },

  { id: 'msf4', name: 'Ankur Wariko', type: 'UGC Ads', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short7.mp4', poster: 'https://akshayshrivastava.com/images/short7.png', driveUrl: 'https://drive.google.com/file/d/1G0GUMbQXBIAvnLRCs1lgs-BE9lCVvIMy/view?usp=sharing' },
 
  { id: 'sf8', title: "UGC Ad's", brand: 'Frido', videoUrl: 'https://akshayshrivastava.com/videos/short12.mp4', poster: 'https://akshayshrivastava.com/images/short12.png', driveUrl: 'https://drive.google.com/file/d/1-S-L43uq4j1VoEQYINbmZS7iK1QigC_w/view?usp=sharing' },
  { id: 'sf4', name: 'Ankit_sr', type: 'Personal Brand', title: 'Instagram Reel', brand: 'Fit Tribe', videoUrl: 'https://akshayshrivastava.com/videos/short10.mp4', poster: 'https://akshayshrivastava.com/images/short10.png', driveUrl: 'https://drive.google.com/file/d/1gPB6TJ7HZ9_7vzIIjFbSedst69GTeRPx/view?usp=sharing' },
];

const duplicateList = (arr, count = 2) => {
  let output = [];
  for (let i = 0; i < count; i++) {
    output = [...output, ...arr];
  }
  return output;
};

const BADGE_BG = 'bg-[#14120e]';

const ArrowUpRightIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

function VideoCard({ item, aspectRatio = "wide", hoveredId, setHoveredId, onOpenModal }) {
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const lastTouchRef = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const isHovered = hoveredId === item.id;
  const isShort = aspectRatio === "tall";

  const isLink = isShort && Boolean(item.driveUrl);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => { if (cardRef.current) observer.unobserve(cardRef.current); };
  }, []);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || !isShort) return;

    if (isHovered && isVisible) {
      if (!videoEl.getAttribute('src')) {
        videoEl.src = item.videoUrl;
        videoEl.load();
      }
      const p = videoEl.play();
      if (p && p.catch) p.catch(() => {});
    } else {
      videoEl.pause();
      try { videoEl.currentTime = 0; } catch (e) {}
      setIsPlaying(false);
    }

    const handleTimeUpdate = () => {
      if (videoEl.currentTime >= 10.0) {
        videoEl.currentTime = 0;
        videoEl.play().catch(() => {});
      }
    };

    videoEl.addEventListener('timeupdate', handleTimeUpdate);
    return () => videoEl.removeEventListener('timeupdate', handleTimeUpdate);
  }, [isHovered, isVisible, item.videoUrl, isShort]);

  const [previewOn, setPreviewOn] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const wantsPreview = Boolean(item.youtubeId && !item.videoUrl) && isHovered && isVisible;

  useEffect(() => {
    if (!wantsPreview) {
      setPreviewOn(false);
      setPreviewReady(false);
      return;
    }
    const t = setTimeout(() => setPreviewOn(true), 300);
    return () => clearTimeout(t);
  }, [wantsPreview]);

  const cardDimensions = aspectRatio === "wide"
    ? "w-[82vw] xs:w-[290px] sm:w-[420px] aspect-video"
    : "w-[44vw] xs:w-[150px] sm:w-[300px] aspect-[9/16]";

  const lineName = isShort ? (item.name || item.brand) : item.title;
  const lineType = isShort ? (item.type || item.title) : item.category;
  const isYoutubeOnly = item.youtubeId && !item.videoUrl;

  const handleTouchStart = () => { lastTouchRef.current = Date.now(); };
  const handleMouseEnter = () => {
    if (Date.now() - lastTouchRef.current < 800) return;
    setHoveredId(item.id);
  };
  const handleMouseLeave = () => {
    if (Date.now() - lastTouchRef.current < 800) return;
    setHoveredId(null);
  };

  const handleClick = (e) => {
    if (isLink) {
      e.preventDefault();
      e.stopPropagation();
      window.open(item.driveUrl, '_blank', 'noopener,noreferrer');
    } else {
      onOpenModal(item);
    }
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex flex-col shrink-0 cursor-pointer select-none group overflow-hidden bg-[#0f0e0c] no-underline shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out md:hover:-translate-y-1 md:hover:shadow-[0_16px_40px_rgba(212,44,44,0.2)] active:scale-[0.97] md:active:scale-100 rounded-[12px] outline-none ${cardDimensions}`}
    >
      <div className={`absolute inset-0 z-[2] transition-opacity duration-300 ${isShort && isPlaying ? 'opacity-0' : 'opacity-100'}`}>
        <img
          src={isYoutubeOnly ? ytThumb(item.youtubeId) : (item.poster || item.videoUrl)}
          alt={lineName}
          draggable={false}
          className="w-full h-full object-cover filter brightness-[0.88]"
        />
      </div>

      <div className="absolute inset-0 z-[1]">
        {isShort ? (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            draggable={false}
            onPlaying={() => setIsPlaying(true)}
            onWaiting={() => setIsPlaying(false)}
            className="absolute inset-0 w-full h-full object-cover outline-none pointer-events-none"
          />
        ) : isYoutubeOnly ? (
          <>
            {previewOn && (
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${item.youtubeId}&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&fs=0`}
                title={`${item.title} preview`}
                allow="autoplay; encrypted-media"
                tabIndex={-1}
                onLoad={() => setPreviewReady(true)}
                className={`absolute inset-0 w-full h-full border-0 pointer-events-none transition-opacity duration-500 ${previewReady ? 'opacity-100' : 'opacity-0'}`}
              />
            )}
          </>
        ) : (
          <video
            ref={videoRef}
            poster={item.poster}
            muted
            loop
            playsInline
            preload="metadata"
            draggable={false}
            className="absolute inset-0 w-full h-full object-cover outline-none pointer-events-none"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none z-[3]" />

      {isLink && (
        <span
          aria-hidden="true"
          style={{ fontFamily: "'GroteskFont', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          className={`absolute top-3 right-3 z-10 pointer-events-none hidden md:flex items-center gap-2 px-3 py-2 rounded-[4px] ${BADGE_BG} text-white text-[10px] font-semibold uppercase tracking-[0.14em] leading-none ring-1 ring-white/15 shadow-[0_6px_16px_rgba(0,0,0,0.35)] opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300`}
        >
          <span className="whitespace-nowrap">Watch Full Video</span>
          <ArrowUpRightIcon className="w-3 h-3 text-[#FFC300]" />
        </span>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-5 flex flex-col items-start text-left z-10">
        <div
          style={{ fontFamily: "'GroteskFont', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          className="whitespace-normal drop-shadow-md"
        >
          <p className="m-0 text-xs sm:text-base font-bold leading-tight text-[#FFFCFB]">
            {lineName}
          </p>
          <p className="m-0 mt-0.5 text-[9px] sm:text-sm font-normal leading-tight text-[#FFFCFB]/80">
            {lineType}
          </p>
        </div>
      </div>
    </div>
  );
}

function RowArrow({ side, onClick }) {
  const isLeft = side === 'left';
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? 'Scroll left' : 'Scroll right'}
      className={`absolute top-[calc(50%-8px)] -translate-y-1/2 z-30 flex h-8 w-8 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#D42C2C] text-[#FFFCFB] shadow-[0_6px_16px_rgba(0,0,0,0.3)] transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#14120e] focus-visible:ring-offset-2 ${
        isLeft ? 'left-1.5 sm:left-4' : 'right-1.5 sm:right-4'
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
        <path d={isLeft ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
      </svg>
    </button>
  );
}

function MarqueeRow({ items, aspectRatio, direction = 'left', hoveredId, setHoveredId, onOpenModal, speed = 45 }) {
  const containerRef = useRef(null);
  const innerRef = useRef(null);
  const hoveredIdRef = useRef(hoveredId);
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const slideRafRef = useRef(null);
  const isSlidingRef = useRef(false);
  const resumeAtRef = useRef(0);

  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  const wrap = (el) => {
    const half = el.scrollWidth / 2;
    if (half <= 0) return;
    if (el.scrollLeft >= half) el.scrollLeft -= half;
    else if (el.scrollLeft <= 0) el.scrollLeft += half;
  };

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

      const paused =
        hoveredIdRef.current != null ||
        isSlidingRef.current ||
        performance.now() < resumeAtRef.current;

      if (!paused) {
        const dir = direction === 'left' ? 1 : -1;
        el.scrollLeft += dir * speed * (delta / 1000);
        wrap(el);
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [direction, speed]);

  useEffect(() => {
    return () => { if (slideRafRef.current) cancelAnimationFrame(slideRafRef.current); };
  }, []);

  const slide = (sign) => {
    const el = containerRef.current;
    const inner = innerRef.current;
    if (!el || !inner || !inner.children[0]) return;

    if (slideRafRef.current) cancelAnimationFrame(slideRafRef.current);

    const gap = parseFloat(getComputedStyle(inner).columnGap) || 0;
    const cardW = inner.children[0].getBoundingClientRect().width;
    const cards = aspectRatio === 'tall' ? 2 : 1;
    const total = sign * (cardW + gap) * cards;

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
        onMouseLeave={() => setHoveredId(null)}
        className="w-full max-w-full overflow-x-hidden overflow-y-hidden pt-2 pb-6 select-none px-3 sm:px-8"
      >
        <div ref={innerRef} className="inline-flex whitespace-nowrap gap-3 sm:gap-10 w-max items-start">
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

      <RowArrow side="left" onClick={() => slide(-1)} />
      <RowArrow side="right" onClick={() => slide(1)} />
    </div>
  );
}

export default function Editing() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredLongId, setHoveredLongId] = useState(null);
  const [hoveredShortId, setHoveredShortId] = useState(null);
  
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
    const ctx = gsap.matchMedia();

    ctx.add("(min-width: 768px)", () => {
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
    });

    ctx.add("(max-width: 767px)", () => {
      gsap.set(paragraphRef.current, { opacity: 1, y: 0, scale: 1 });
    });

    return () => ctx.revert();
  }, []);

  const isShortForm = selectedVideo && SHORT_FORMS.some(s => s.id === selectedVideo.id);

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
      <div className="relative w-full h-[55vh] sm:h-screen bg-[#14120e] flex flex-col justify-center items-center overflow-hidden m-0 p-0 editing-cutout-mask"> 
        <video 
          ref={heroVideoRef}
          poster= 'https://akshayshrivastava.com/images/EditingMain.png'
          autoPlay 
          loop 
          muted={isHeroMuted} 
          playsInline 
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-[0.75] contrast-100"
        />

        <button
          onClick={toggleHeroSound}
          className="absolute bottom-6 left-4 sm:bottom-16 sm:left-10 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#FFC300] hover:scale-110 transition-all duration-300 shadow-xl cursor-pointer group"
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

        <div className="absolute inset-0 bg-gradient-to-b from-[#14120e]/70 via-[#14120e]/20 to-[#14120e]/80 z-[2] pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-center items-center px-4 text-center max-w-[850px] mx-auto">
          <h1 
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '1px' }}
            className="text-[2.2rem] sm:text-[5.5rem] text-[#FFC300] m-0 leading-none drop-shadow-lg capitalize mb-3 sm:mb-6"
          >
            Editing Work
          </h1>

          <p 
            style={{ fontFamily: "'ParaFont', sans-serif", fontWeight: 100, letterSpacing: '-0.3px' }}
            className="text-[#FFFCFB] text-[11px] sm:text-base md:text-lg max-w-[750px] leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] px-2 mb-2 sm:mb-3"
          >
            The camera captures everything. Editing decides what matters. Through pacing, rhythm, sound, and restraint, an edit can turn the same footage into completely different stories. That’s what makes editing less of a technical process and more of a storytelling language.
          </p>

          <p 
            style={{ fontFamily: "'ParaFont', sans-serif", fontWeight: 100, letterSpacing: '0.2px' }}
            className="text-[#FFC300] text-[11px] sm:text-sm md:text-base drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
          >
            Here are a few stories I've helped shape. Scroll on.
          </p>
        </div>
      </div>

      {/* FEATURED MASTERPIECE SECTION */}
      <div ref={featuredSectionRef} className="w-full mx-auto pt-6 sm:pt-16 pb-4 px-4 flex flex-col items-center relative z-20 text-center overflow-hidden">
        <div className="inline-flex flex-col items-center z-20 px-4">
          <h2 
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing:'1px' }}
            className="text-2xl sm:text-4xl m-0 text-[#D42C2C] leading-tight capitalize"
          >
            Welcome To Editing Section
          </h2>
        </div>

        <div ref={paragraphRef} className="relative z-10 mt-2 sm:mt-3 mb-4 sm:mb-6 max-w-[700px] px-4">
          <p 
            style={{ fontFamily: "ParaFont, sans-serif", fontWeight: 200, letterSpacing : '-0.5px' }}
            className="text-[#3b352e] text-sm sm:text-lg leading-relaxed text-center font-light tracking-wide px-2"
          >
            A collection of some of my best work across UGC ads, brand films, podcasts, documentaries, YouTube videos, reels, shorts, social media campaigns, and more.
          </p>
        </div>

        <div className="max-w-[950px] w-full px-2 sm:px-6 mb-6 sm:mb-10 relative z-20">
          <div className="w-full aspect-video rounded-[8px] overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.15)] bg-[#0f0e0c]">
            <CustomVideoPlayer 
              src="https://akshayshrivastava.com/videos/EditingFull.mp4"
              poster= 'https://akshayshrivastava.com/images/EditingMain.png'
              className="w-full h-full"
              muted={true}
            />
          </div>
        </div>
      </div>

      {/* LONG FORMS */}
      <div id="long-forms" className="w-full max-w-full relative overflow-hidden my-4 sm:my-16">
        <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 flex flex-col items-center text-center mb-4 sm:mb-8">
          <h3 
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing : '1px' }}
            className="text-2xl sm:text-4xl m-0 text-[#D42C2C] leading-tight capitalize"
          >
            Long Forms
          </h3>

          <div 
            style={{ fontFamily: "'ParaFont', sans-serif", letterSpacing: '0.5px' }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-2 sm:mt-3 text-[#3b352e] text-xs sm:text-base tracking-wider text-center capitalize"
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

      {/* SHORT FORMS (Single Row, Opposite Direction: 'right') */}
      <div className="w-full max-w-full relative overflow-hidden my-4 sm:my-20">
        <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 flex flex-col items-center text-center mb-4 sm:mb-8">
          <h3 
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing : '1px' }}
            className="text-2xl sm:text-4xl m-0 text-[#D42C2C] leading-tight capitalize"
          >
            Short Forms
          </h3>

          <div 
            style={{ fontFamily: "'ParaFont', sans-serif", letterSpacing: '0.5px' }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-2 sm:mt-3 text-[#3b352e] text-xs sm:text-base tracking-wider text-center capitalize"
          >
            <span>UGC Ads</span>
            <span className="text-[#FFC300]">•</span>
            <span>Talking Head</span>
            <span className="text-[#FFC300]">•</span>
            <span>Podcast Shorts</span>
            <span className="text-[#FFC300]">•</span>
            <span>Reels</span>
          </div>
        </div>
        
        <div className="mb-3 sm:mb-8">
          <MarqueeRow
            items={duplicateList(SHORT_FORMS)}
            aspectRatio="tall"
            direction="right"
            speed={40}
            hoveredId={hoveredShortId}
            setHoveredId={setHoveredShortId}
            onOpenModal={setSelectedVideo}
          />
        </div>
      </div>

      {/* STATS COUNTER */}
      <StatsCounter />

      {/* SOCIAL PROOF */}
      <div className="m-0 p-0 mb-6 sm:mb-20">
        <SocialProof />
      </div>

      {/* FULLSCREEN PREVIEW MODAL */}
      {selectedVideo && (
        <div 
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-8 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${isShortForm ? 'max-w-[300px] sm:max-w-[380px] aspect-[9/16] rounded-[8px] bg-black' : 'max-w-5xl rounded-[8px] bg-[#FFFCFB]'} overflow-hidden shadow-2xl cursor-default flex flex-col`}
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
                  {selectedVideo.youtubeId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&rel=0`}
                      title={selectedVideo.title}
                      className="w-full h-full border-0"
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      allowFullScreen
                    />
                  ) : (
                    <CustomVideoPlayer 
                      src={selectedVideo.videoUrl} 
                      badgeText={selectedVideo.category || selectedVideo.brand || "Preview"} 
                      className="w-full h-full"
                      autoPlay={true}
                      muted={false}
                    />
                  )}
                </div>
                <div className="p-3 sm:p-6 bg-[#111] text-[#14120e] flex items-center justify-between border-t border-black/5">
                  <h3 
                    style={{ fontFamily: "'GroteskFont', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
                    className="m-0 text-sm sm:text-xl font-bold text-white"
                  >
                    {selectedVideo.title}
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
                    {(selectedVideo.category || selectedVideo.brand) && (
                      <span 
                        style={{ fontFamily: "'GroteskFont', sans-serif", letterSpacing: '-0.3px', fontWeight: 300 }}
                        className="text-[9px] sm:text-xs text-white bg-[#333] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[4px]"
                      >
                        {selectedVideo.category || selectedVideo.brand}
                      </span>
                    )}
                    {selectedVideo.youtubeId && (
                      <a
                        href={`https://youtu.be/${selectedVideo.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "'GroteskFont', sans-serif" }}
                        className="text-[10px] sm:text-xs text-[#D42C2C] hover:underline whitespace-nowrap"
                      >
                        Watch on YouTube ↗
                      </a>
                    )}
                  </div>
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