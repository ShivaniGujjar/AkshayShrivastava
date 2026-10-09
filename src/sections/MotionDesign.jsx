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


const SHORT_FORMS = [
  { id: 'msf1', name: 'Scratch', type: 'Shorts', title: '3D Kinetic Typography', brand: 'UGC Ad', videoUrl: 'https://akshayshrivastava.com/videos/short2.mp4', poster: 'https://akshayshrivastava.com/images/short2.png', driveUrl: 'https://drive.google.com/file/d/1T1ZbDwywo7NeJtzUjsaMH0IyKixoZENh/view?usp=sharing' },

  { id: 'msf3', name: 'Ankur Warikoo', type: 'UGC Ads', title: 'Logo Reveal Loop', brand: 'VFX', videoUrl: 'https://akshayshrivastava.com/videos/short6.mp4', poster: 'https://akshayshrivastava.com/images/short6.png', driveUrl: 'https://drive.google.com/file/d/1sp9aXjCVTfg0ApluNZUyV45ZW3dupoVp/view?usp=sharing' },

  { id: 'sf6', title: 'Akshay Shrivastava', brand: 'Personal Brand', videoUrl: 'https://akshayshrivastava.com/videos/short18.mp4', poster: 'https://akshayshrivastava.com/images/short18.png', driveUrl: 'https://drive.google.com/file/d/1nIuMt5bekFJO2I8aiZo6NA5E33uNegGN/view?usp=sharing' },

  { id: 'msf5', name: 'Scratch', type: 'Edutainment', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short9.mp4', poster: 'https://akshayshrivastava.com/images/short9.png', driveUrl: 'https://drive.google.com/file/d/1uwY-PFrG5BDBY7e5WlOJZIB18O-tCKwO/view?usp=sharing' },

  { id: 'msf2', name: 'Vishwmitra', type: 'Performance Reel', title: 'Abstract Product Reel', brand: '3D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short4.mp4', poster: 'https://akshayshrivastava.com/images/short4.png', driveUrl: 'https://drive.google.com/file/d/1du-28m6tarHsR432u2SWzhcRVzKv-7YO/view?usp=sharing' },

  { id: 'msf6', name: 'Scratch', type: 'Shorts', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short13.mp4', poster: 'https://akshayshrivastava.com/images/short13.png', driveUrl: 'https://drive.google.com/file/d/1VCyEzMjQ-O9NZVKu5tELWizC8qOPQ8uP/view?usp=sharing' },

  { id: 'msf10', name: 'Akshay Shrivastava', type: 'Personal Brand', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/MotionMain.mp4', poster: 'https://akshayshrivastava.com/images/MotionMain.png', driveUrl: 'https://drive.google.com/file/d/1-2-YktwU9e8J9jWNR3EpLdP9_ugIPKGP/view?usp=sharing' },

  { id: 'msf7', name: 'Scratch', type: 'Edutainment', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short14.mp4', poster: 'https://akshayshrivastava.com/images/short14.png', driveUrl: 'https://drive.google.com/file/d/1TSZ4IMxv0djTQgD1ZLkZvgIuC60FdeJn/view?usp=sharing' },

  { id: 'msf12', name: 'Waywen', type: 'Promotional Reel', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/DirectionMain.mp4', poster: 'https://akshayshrivastava.com/images/DirectionMain.png', driveUrl: 'https://drive.google.com/file/d/15ke3BYxXFerTseLnU2yX_9Rxixn3iRul/view?usp=sharing' },

  { id: 'msf9', name: 'Scratch', type: 'Shorts', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short15.mp4', poster: 'https://akshayshrivastava.com/images/short15.png', driveUrl: 'https://drive.google.com/file/d/1dZal7IC0rY-PBxSiIBECSZaq70Tli-JV/view?usp=sharing&t=0.571' },

  { id: 'msf4', name: 'Ankur Warikoo', type: 'UGC Ads', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short7.mp4', poster: 'https://akshayshrivastava.com/images/short7.png', driveUrl: 'https://drive.google.com/file/d/1G0GUMbQXBIAvnLRCs1lgs-BE9lCVvIMy/view?usp=sharing' },

  { id: 'msf11', name: 'Scratch', type: 'Edutainment', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/short20.mp4', poster: 'https://akshayshrivastava.com/images/short20.png', driveUrl: 'https://drive.google.com/file/d/1Ic-BfBiQuhe5S5tgqT_0bJlEFV01z66t/view?usp=sharing' },

  { id: 'sf3', name: 'Vishwmitra', type: 'Performance Reel', title: 'Brand Story Reel 3', brand: 'Kolkata Media', videoUrl: 'https://akshayshrivastava.com/videos/short5.mp4', poster: 'https://akshayshrivastava.com/images/short5.png', driveUrl: 'https://drive.google.com/file/d/1KI4EhIOdQZ91bvBi_fLTbbzxloZrfPMJ/view?usp=sharing' },

  { id: 'msf8', name: 'Akshay Shrivastava', type: 'Personal Brand', title: 'Character Animation', brand: '2D Motion', videoUrl: 'https://akshayshrivastava.com/videos/AboutMain.mp4', poster: 'https://akshayshrivastava.com/images/AboutMain.png', driveUrl: 'https://drive.google.com/file/d/1ifLdzvThtJoUQW94w3TUlKRbPaoHrl_H/view?usp=sharing' },
];

const LONG_FORMS = [
  { id: 'lf1', title: 'Moradabad - The brass city', category: 'Documentary', youtubeId: 'VIzWHj8FrXA' },
  { id: 'lf2', title: 'Biturbo', category: 'Edutainment', youtubeId: 'MfOuSuKKzdI' },
  { id: 'lf3', title: 'Samsara - The gin', category: 'Documentary', youtubeId: 'JUCnkdyVsGI' },
  { id: 'lf4', title: 'Clovia - The lingerie brand', category: 'Edutainment', youtubeId: 'PTxuqvWqhu0' },
  { id: 'lf5', title: 'Inside the Business of HYROX', category: 'Documentary', youtubeId: 'iIhLVkXaXc8' },
  { id: 'lf6', title: 'Shamik - The comic', category: 'Podcast', youtubeId: 'On0S3Ym4FfA' },
  
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

  const lineName = item.name || item.title;
  const lineType = item.type || item.brand || item.category;
  const isYoutubeOnly = Boolean(item.youtubeId && !item.videoUrl);
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
  const wantsPreview = isYoutubeOnly && isHovered && isVisible;

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

  const handleTouchStart = () => { lastTouchRef.current = Date.now(); };
  const handleMouseEnter = () => {
    if (Date.now() - lastTouchRef.current < 800) return;
    setHoveredId(item.id);
  };
  const handleMouseLeave = () => {
    if (Date.now() - lastTouchRef.current < 800) return;
    setHoveredId(null);
  };

  const Tag = isLink ? 'a' : 'div';
  const tagProps = isLink
    ? {
        href: item.driveUrl,
        target: '_blank',
        rel: 'noopener noreferrer',
        draggable: false,
        title: 'Opens the full video on Google Drive',
      }
    : {
        role: 'button',
        tabIndex: 0,
        onClick: () => onOpenModal(item),
      };

  return (
    <Tag
      ref={cardRef}
      {...tagProps}
      onTouchStart={handleTouchStart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block group overflow-hidden cursor-pointer bg-[#14120e] no-underline shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out md:hover:-translate-y-1 md:hover:shadow-[0_16px_40px_rgba(212,44,44,0.15)] active:scale-[0.97] md:active:scale-100 ${cardDimensions} shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-[#D42C2C] focus-visible:ring-offset-2 select-none rounded-[12px]`}
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

      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-5 pointer-events-none z-10">
        <div
          style={{ fontFamily: "'GroteskFont', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
          className="whitespace-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
        >
          <p className="m-0 text-[10px] sm:text-base font-bold leading-tight text-[#FFFCFB]">
            {lineName}
          </p>
          {lineType && (
            <p className="m-0 mt-0.5 text-[8px] sm:text-sm font-normal leading-tight text-[#FFFCFB]/80">
              {lineType}
            </p>
          )}
        </div>
      </div>
    </Tag>
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

export default function MotionDesign() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredShortId, setHoveredShortId] = useState(null);
  const [hoveredLongId, setHoveredLongId] = useState(null);
  
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const heroVideoRef = useRef(null);

  const featuredVideoRef = useRef(null);

  const featuredSectionRef = useRef(null);
  const reelRef = useRef(null);
  const textContentRef = useRef(null);

  const toggleHeroSound = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !isHeroMuted;
      setIsHeroMuted(!isHeroMuted);
    }
  };

  // Featured reel click opens the popup modal instead of Google Drive
  const handleFeaturedReelClick = () => {
    setSelectedVideo({
      id: 'featured-main',
      name: 'Akshay Shrivastava',
      type: 'Featured Motion Reel',
      videoUrl: 'https://akshayshrivastava.com/videos/MotionMain.mp4',
      poster: 'https://akshayshrivastava.com/images/MotionMain.png'
    });
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
    });

    ctx.add("(max-width: 767px)", () => {
      gsap.set(reelRef.current, { opacity: 1, x: 0 });
      gsap.set(textContentRef.current, { opacity: 1, x: 0 });
    });

    return () => ctx.revert();
  }, []);

  const isShortForm = selectedVideo && (selectedVideo.id === 'featured-main' || SHORT_FORMS.some(s => s.id === selectedVideo.id));

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
          poster="https://akshayshrivastava.com/images/MotionHome.jpeg"
          autoPlay 
          loop 
          muted={isHeroMuted} 
          playsInline 
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-[0.55] contrast-105"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#14120e]/70 via-[#14120e]/20 to-[#14120e]/80 z-[1] pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-center items-center px-4 text-center max-w-[850px] mx-auto">
          <h1 
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '1px' }}
            className="text-[2.2rem] sm:text-[5.5rem] text-[#FFC300] m-0 text-center leading-none drop-shadow-lg capitalize"
          >
            Motion Work
          </h1>

          <p 
            style={{ fontFamily: "'ParaFont', sans-serif", fontWeight: 400, letterSpacing: '-0.3px' }}
            className="text-[#FFFCFB] text-[11px] sm:text-base md:text-lg max-w-[550px] leading-relaxed font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] px-2 mt-3 sm:mt-6"
          >
            Making things move is easy. Making them move for a reason is the tricky part. Here you'll find animated typography, graphics, 2D/3D work and visual experiments built to actually add something to the story.
          </p>
        </div>
      </div>

      {/* HEADER & FEATURED REEL */}
      <div ref={featuredSectionRef} className="w-full mx-auto pt-6 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-12 relative z-20 overflow-hidden">
        <div className="flex flex-col items-center text-center mb-6 sm:mb-14">
          <h2 
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing:'1px' }}
            className="text-2xl sm:text-4xl m-0 text-[#D42C2C] leading-tight capitalize"
          >
            Welcome to Motion Design section
          </h2>
        </div>

        <div className="max-w-[1050px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-14 relative">
          <div 
            ref={reelRef} 
            onClick={handleFeaturedReelClick}
            className="w-[180px] xs:w-[220px] sm:w-[320px] aspect-[9/16] shrink-0 rounded-[8px] overflow-hidden shadow-2xl bg-black relative cursor-pointer group"
            title="Click to play full video"
          >
            <video 
              ref={featuredVideoRef}
              src="https://akshayshrivastava.com/videos/MotionMain.mp4"
              poster="https://akshayshrivastava.com/images/MotionMain.png"
              className="w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>

          <div ref={textContentRef} className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left px-2 sm:px-0 max-w-lg">
            <h3 
              style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '0.5px' }}
              className="text-xl sm:text-3xl md:text-[2.2rem] text-[#D42C2C] leading-tight mb-2 sm:mb-4 capitalize"
            >
              Bringing Ideas to Life <br />Through Motion
            </h3>
            <p 
              style={{ fontFamily: "'ParaFont', sans-serif", fontWeight: 400, letterSpacing: '-0.3px' }}
              className="text-[#3b352e] text-sm sm:text-lg leading-relaxed font-light px-2"
            >
              I'm a superfan of motion. I love to play and experiment with countable layers and uncountable keyframes, because there's something ridiculously satisfying about watching a bunch of tiny movements come together and suddenly make sense.
            </p>
          </div>
        </div>
      </div>

      {/* SHORT FORMS */}
      <div className="w-full max-w-full relative overflow-hidden my-4 sm:my-20">
        <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 flex flex-col items-center text-center mb-3 sm:mb-6">
          <h3 
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing : '1px' }}
            className="text-2xl sm:text-4xl m-0 text-[#D42C2C] leading-tight capitalize"
          >
            Short Forms
          </h3>

          <div 
            style={{ fontFamily: "'ParaFont', sans-serif", letterSpacing: '0.5px' }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-1.5 sm:mt-3 text-[#3b352e] text-xs sm:text-base tracking-wider text-center capitalize"
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
      <div className="w-full max-w-full relative overflow-hidden my-4 sm:my-20">
        <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 flex flex-col items-center text-center mb-3 sm:mb-6">
          <h3 
            style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing : '1px' }}
            className="text-2xl sm:text-4xl m-0 text-[#D42C2C] leading-tight capitalize"
          >
            Long Forms
          </h3>

          <div 
            style={{ fontFamily: "'ParaFont', sans-serif", letterSpacing: '0.5px' }}
            className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 mt-1.5 sm:mt-3 text-[#3b352e] text-xs sm:text-base tracking-wider text-center capitalize"
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
                    {selectedVideo.name || selectedVideo.title}
                  </h3>
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
                    {(selectedVideo.type || selectedVideo.brand || selectedVideo.category) && (
                      <span 
                        style={{ fontFamily: "'GroteskFont', sans-serif", letterSpacing: '-0.3px', fontWeight: 400 }}
                        className="text-[9px] sm:text-xs text-white bg-[#333] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[4px]"
                      >
                        {selectedVideo.type || selectedVideo.brand || selectedVideo.category}
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