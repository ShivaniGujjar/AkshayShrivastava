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

  const cardDimensions = aspectRatio === "wide" 
    ? "w-[280px] sm:w-[420px] h-[160px] sm:h-[260px]" 
    : "w-[200px] sm:w-[300px] aspect-[9/16]";

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={() => onOpenModal(item)}
      className={`relative group overflow-hidden cursor-pointer bg-[#0f0e0c] shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(48,104,211,0.15)] ${cardDimensions} shrink-0 outline-none focus:outline-none select-none rounded-[8px]`}
    >
      <video
        ref={videoRef}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 filter brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 outline-none focus:outline-none pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0e0c]/90 via-[#0f0e0c]/25 to-transparent transition-opacity duration-300 group-hover:opacity-80" />

      {/* Subtle bottom fade to blend with page lighting */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#0f0e0c]/60 to-transparent pointer-events-none" />

      {item.category && (
        <div 
          style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '-0.3px', fontWeight: 300 }}
          className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#3068D3]/90 backdrop-blur-md px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-[4px] text-[#FFFFFF] text-[10px] sm:text-xs uppercase shadow-sm"
        >
          {item.category}
        </div>
      )}

      <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-9 sm:h-9 rounded-[4px] backdrop-blur-md flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-110 bg-[#3068D3] text-[#FFFFFF] shadow-[0_0_20px_rgba(48,104,211,0.6)]' : 'bg-black/40 text-[#FFFFFF]'}`}>
        {isHovered ? (
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#FFFFFF] rounded-[2px] animate-pulse" />
        ) : (
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform transition-transform duration-300">
        <h4 
          style={{ fontFamily: "'Talina', sans-serif", fontWeight: 300 }}
          className="text-[#FFFFFF] text-lg sm:text-2xl leading-snug drop-shadow-md mb-1"
        >
          {item.title}
        </h4>
        {item.brand && (
          <p 
            style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '-0.3px', fontWeight: 300 }}
            className="text-[#9cbbfb] text-[10px] sm:text-xs uppercase bg-black/50 backdrop-blur-sm px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-[4px] inline-block"
          >
            {item.brand}
          </p>
        )}
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
    <div className="w-full min-h-screen bg-[#FFFCFB] relative overflow-x-hidden pb-16 sm:pb-24 m-0 text-[#14120e]">
      
      <style>{`
        @font-face {
          font-family: 'GenericFont';
          src: url('/generic.woff2') format('woff2');
          font-weight: normal;
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
          font-family: 'CactusJack';
          src: url('/cactus-jack.woff2') format('woff2');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Talina';
          src: url('/Talina-Regular.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'HelveticaNeue';
          src: url('/fonts/HelveticaNeueRoman.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'HelveticaNeue';
          src: url('/fonts/HelveticaNeueBold.otf') format('opentype');
          font-weight: bold;
          font-style: normal;
          font-display: swap;
        }

        /* Pure CSS SVG Noise Grain Overlay */
        

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

      {/* HERO BANNER - WITH CSS CINEMATIC NOISE OVERLAY */}
      <div className="relative w-full h-[70vh] sm:h-screen bg-[#14120e] flex flex-col justify-center items-center overflow-hidden m-0 p-0 editing-cutout-mask"> 
        <video 
          ref={heroVideoRef}
          src="https://akshayshrivastava.com/videos/EditingMain.mp4" 
          autoPlay 
          loop 
          muted={isHeroMuted} 
          playsInline 
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-[0.55] contrast-105"
        />

        {/* 🎞️ RELIABLE CSS NOISE OVERLAY LAYER */}
        <div className="absolute inset-0 pointer-events-none z-[1] cinematic-grain opacity-60 mix-blend-overlay" />

        <button
          onClick={toggleHeroSound}
          className="absolute bottom-12 left-4 sm:bottom-16 sm:left-10 z-20 w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#FFC822] hover:scale-110 transition-all duration-300 shadow-xl cursor-pointer group"
          title={isHeroMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isHeroMuted ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-[#FFC822]" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-[#3068D3]" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-[#14120e]/80 via-transparent to-[#14120e]/60 z-[2] pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-center items-center px-4 text-center mt-6">
          <h1 
            style={{ 
              fontFamily: "'GenericFont', cursive, sans-serif", 
              letterSpacing: '-0.5px', 
              fontWeight: 400 
            }}
            className="text-[3rem] sm:text-[5.5rem] text-[#ffffff] m-0 leading-none drop-shadow-lg"
          >
            Editing Work
          </h1>
          
          <p 
            style={{ fontFamily: "'CactusJack', cursive, sans-serif", letterSpacing : '0.5px' }}
            className="flex items-center justify-center gap-2 sm:gap-3 mt-4 sm:mt-5 text-white text-sm sm:text-2xl tracking-wider text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] uppercase"
          >
            <span>Post - Production</span> 
            <span className="text-[#FFC822]">•</span> 
            <span>Retention Editing</span> 
            <span className="text-[#FFC822]">•</span> 
            <span>UGC Ads</span>
          </p>

          <a
  href="#long-forms"
  className="mt-6 sm:mt-8 bg-[#3068D3] hover:bg-[#2552ab] text-white px-8 py-3.5 rounded-lg font-bold uppercase tracking-wider text-sm transition-all duration-300 shadow-[0_0_25px_rgba(48,104,211,0.5)] hover:scale-105 no-underline"
  style={{ fontFamily: "'CactusJack', cursive, sans-serif" }}
>
  Explore Work
</a>
        </div>
      </div>

      {/* HEADER & FEATURED MASTERPIECE SECTION */}
      <div ref={featuredSectionRef} className="w-full mx-auto pt-10 sm:pt-16 pb-6 px-4 flex flex-col items-center relative z-20 text-center overflow-hidden">
        
        <div className="inline-flex flex-col items-center z-20 px-4">
          <h2 
            style={{ 
              fontFamily: "'GenericFont', cursive, sans-serif", 
              letterSpacing:'-0.5px', 
              fontWeight: 400 
            }}
            className="text-2xl sm:text-4xl m-0 text-[#3068D3] leading-tight"
          >
            Welcome To Editing Section
          </h2>
        </div>

        <div ref={paragraphRef} className="relative z-10 mt-3 mb-6 max-w-[700px] px-4">
          <p 
            style={{ 
              fontFamily: "GroteskFont", 
              fontWeight: 400,
              letterSpacing : '-1px'
            }}
            className="text-[#3b352e] text-xs sm:text-lg leading-relaxed text-center font-light tracking-wide"
          >
            I have worked with multiple startups and influencers on various kind of edit like UGC ads
          </p>
        </div>

        {/* 🍿 FULL WIDE FEATURED MASTERPIECE */}
        <div className="max-w-[950px] w-full px-2 sm:px-6 mb-10 relative z-20">
          <div className="w-full aspect-video rounded-[8px] overflow-hidden shadow-[0_18px_50px_rgba(0,0,0,0.15)] bg-[#0f0e0c]">
            <CustomVideoPlayer 
              src="https://akshayshrivastava.com/videos/EditingFull.mp4"
              badgeText="Featured Masterpiece"
              className="w-full h-full"
              muted={true}
            />
          </div>
        </div>
      </div>

      {/* LONG FORMS */}
      <div id="long-forms" className="w-full max-w-full relative overflow-hidden my-8 sm:my-16">
        <div className="max-w-[1100px] w-full mx-auto px-6 flex flex-col items-center text-center mb-8">
          <h3 
            style={{ 
              fontFamily: "'GenericFont', cursive, sans-serif", 
              letterSpacing : '-0.5px',
              fontWeight: 400 
            }}
            className="text-2xl sm:text-4xl m-0 text-[#3068D3] leading-tight"
          >
            Long Forms
          </h3>

          <div 
            style={{ fontFamily: "'CactusJack', cursive, sans-serif", letterSpacing: '0.5px' , fontWeight : '900' }}
            className="flex items-center justify-center gap-2 sm:gap-3 mt-3 text-[#3b352e] text-xs sm:text-base tracking-wider text-center uppercase"
          >
            <span>Podcasts</span>
            <span className="text-[#FFC822]">•</span>
            <span>Youtube Documentaries</span>
            <span className="text-[#FFC822]">•</span>
            <span>Talking Head</span>
            <span className="text-[#FFC822]">•</span>
            <span>Campus Film</span>
          </div>
        </div>

        <div className="w-full max-w-full overflow-hidden pt-2 pb-6 group">
          <div className="inline-flex whitespace-nowrap gap-5 sm:gap-10 w-max will-change-transform animate-[slowMarqueeLeft_85s_linear_infinite] group-hover:[animation-play-state:paused]">
            {duplicateList(LONG_FORMS).map((item, idx) => (
              <VideoCard 
                key={`long-${idx}`}
                item={item} 
                aspectRatio="wide" 
                hoveredId={hoveredLongId} 
                setHoveredId={setHoveredLongId} 
                onOpenModal={setSelectedVideo}
              />
            ))}
          </div>
        </div>
      </div>

      {/* SHORT FORMS */}
      <div className="w-full max-w-full relative overflow-hidden my-8 sm:my-20">
        <div className="max-w-[1100px] w-full mx-auto px-6 flex flex-col items-center text-center mb-8">
          <h3 
            style={{ 
              fontFamily: "'GenericFont', cursive, sans-serif", 
              letterSpacing : '-0.5px',
              fontWeight: 400 
            }}
            className="text-2xl sm:text-4xl m-0 text-[#3068D3] leading-tight"
          >
            Short Forms
          </h3>

          <div 
            style={{ fontFamily: "'CactusJack', cursive, sans-serif", letterSpacing: '0.5px' , fontWeight : '900' }}
            className="flex items-center justify-center gap-2 sm:gap-3 mt-3 text-[#3b352e] text-xs sm:text-base tracking-wider text-center uppercase"
          >
            <span>UGC Ads</span>
            <span className="text-[#FFC822]">•</span>
            <span>Retention Hooks</span>
            <span className="text-[#FFC822]">•</span>
            <span>Podcast Shorts</span>
            <span className="text-[#FFC822]">•</span>
            <span>Reels</span>
          </div>
        </div>
        
        <div className="w-full max-w-full overflow-hidden pt-2 pb-4 mb-4 sm:mb-8 group">
          <div className="inline-flex whitespace-nowrap gap-5 sm:gap-10 w-max will-change-transform animate-[slowMarqueeLeft_85s_linear_infinite] group-hover:[animation-play-state:paused]">
            {duplicateList(SHORT_FORMS_ROW1).map((item, idx) => (
              <VideoCard 
                key={`short1-${idx}`}
                item={item} 
                aspectRatio="tall" 
                hoveredId={hoveredShort1Id} 
                setHoveredId={setHoveredShort1Id} 
                onOpenModal={setSelectedVideo}
              />
            ))}
          </div>
        </div>

        <div className="w-full max-w-full overflow-hidden py-2 group">
          <div className="inline-flex whitespace-nowrap gap-5 sm:gap-10 w-max will-change-transform animate-[slowMarqueeRight_85s_linear_infinite] group-hover:[animation-play-state:paused]">
            {duplicateList(SHORT_FORMS_ROW2).map((item, idx) => (
              <VideoCard 
                key={`short2-${idx}`}
                item={item} 
                aspectRatio="tall" 
                hoveredId={hoveredShort2Id} 
                setHoveredId={setHoveredShort2Id} 
                onOpenModal={setSelectedVideo}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 🚀 SOCIAL PROOF */}
      <div className="m-0 p-0 mb-12 sm:mb-20">
        <SocialProof />
      </div>

      {/* FULLSCREEN PREVIEW */}
      {selectedVideo && (
        <div 
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${isShortForm ? 'max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-[8px] bg-black' : 'max-w-5xl rounded-[8px] bg-[#FFFCFB]'} overflow-hidden shadow-2xl cursor-default flex flex-col`}
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className={`absolute top-4 right-4 z-[1000] w-10 h-10 rounded-full ${isShortForm ? 'bg-black/60 text-white' : 'bg-[#14120e] text-[#FFFFFF] hover:bg-[#3068D3]'} flex items-center justify-center font-bold text-lg transition-all shadow-lg cursor-pointer backdrop-blur-md`}
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
                <div className="p-4 sm:p-6 bg-[#FFFCFB] text-[#14120e] flex items-center justify-between border-t border-black/5">
                  <h3 
                    style={{ fontFamily: "'Talina', sans-serif", fontWeight: 300 }}
                    className="text-lg sm:text-2xl text-[#3068D3]"
                  >
                    {selectedVideo.title}
                  </h3>
                  {selectedVideo.brand && (
                    <span 
                      style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '-0.3px', fontWeight: 300 }}
                      className="text-[10px] sm:text-xs uppercase text-[#554f46] bg-[#f0eae1] px-2.5 py-1 rounded-[4px]"
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

      <style>{`
        @keyframes slowMarqueeLeft {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        @keyframes slowMarqueeRight {
          0% { transform: translate3d(-50%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
      `}</style>
    </div>
  );
}