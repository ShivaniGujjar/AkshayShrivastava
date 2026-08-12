import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialProof from '../components/SocialProof';
import Footer from './Footer';
import CustomVideoPlayer from '../components/CustomVideoPlayer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 🎬 REAL SHOWCASE DATA
const SHORT_FORMS = [
  { id: 'msf1', title: '3D Kinetic Typography', brand: 'UGC Ad', videoUrl: '', poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600' },
  { id: 'msf2', title: 'Abstract Product Reel', brand: '3D Motion', videoUrl: '', poster: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600' },
  { id: 'msf3', title: 'Logo Reveal Loop', brand: 'VFX', videoUrl: '', poster: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600' },
  { id: 'msf4', title: 'Character Animation', brand: '2D Motion', videoUrl: '', poster: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600' },
];

const LONG_FORMS = [
  { id: 'mlf1', title: 'Explainer Film Loop', category: 'Animation', videoUrl: '', poster: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600' },
  { id: 'mlf2', title: 'Campus Documentary Intro', category: 'Titles', videoUrl: '', poster: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600' },
  { id: 'mlf3', title: 'SaaS Platform Walkthrough', category: '3D UI', videoUrl: '', poster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600' },
];

const duplicateList = (arr, count = 4) => {
  let output = [];
  for (let i = 0; i < count; i++) {
    output = [...output, ...arr];
  }
  return output;
};

// 🎥 SINGLE VIDEO CARD WITH RESPONSIVE SIZING & LARGE CLEAR TITLES
function VideoCard({ item, aspectRatio = "wide", hoveredId, setHoveredId }) {
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
    if (videoRef.current) {
      if (!isVisible) {
        videoRef.current.pause();
      } else if (isAnyHovered) {
        if (isHovered) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
  }, [isVisible, isHovered, isAnyHovered]);

  const cardDimensions = aspectRatio === "wide" 
    ? "w-[280px] sm:w-[420px] h-[160px] sm:h-[260px]" 
    : "w-[200px] sm:w-[300px] aspect-[9/16]";

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => setHoveredId(item.id)}
      onMouseLeave={() => setHoveredId(null)}
      className={`relative group rounded-2xl overflow-hidden cursor-pointer bg-[#14120e] shadow-xl transition-all duration-500 ease-out hover:scale-[1.03] ${cardDimensions} shrink-0 outline-none focus:outline-none select-none border border-black/10`}
    >
      <video
        ref={videoRef}
        src={item.videoUrl}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-all duration-700 filter brightness-[0.85] group-hover:brightness-100 group-hover:scale-105 outline-none focus:outline-none pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#14120e]/90 via-[#14120e]/30 to-transparent transition-opacity duration-300 group-hover:opacity-75" />

      {item.category && (
        <div 
          style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '-0.3px', fontWeight: 300 }}
          className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#144BFF] backdrop-blur-md px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-sm text-[#FFFFFF] text-[10px] sm:text-xs uppercase shadow-sm"
        >
          {item.category}
        </div>
      )}

      <div className={`absolute top-3 right-3 sm:top-4 sm:right-4 w-7 h-7 sm:w-9 sm:h-9 rounded-sm backdrop-blur-md flex items-center justify-center transition-all duration-300 ${isHovered ? 'scale-110 bg-[#144BFF] text-[#FFFFFF] shadow-[0_0_15px_#144BFF]' : 'bg-black/40 text-[#FFFFFF]'}`}>
        {isHovered ? (
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#FFFFFF] rounded-xs animate-pulse" />
        ) : (
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current ml-0.5" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 transform transition-transform duration-300 group-hover:translate-y-0">
        <h4 
          style={{ fontFamily: "'Talina', sans-serif", fontWeight: 300 }}
          className="text-[#FFFFFF] text-lg sm:text-2xl leading-snug drop-shadow-md mb-1"
        >
          {item.title}
        </h4>
        {item.brand && (
          <p 
            style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '-0.3px', fontWeight: 300 }}
            className="text-[#144BFF] text-[10px] sm:text-xs uppercase bg-black/60 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-xs inline-block"
          >
            {item.brand}
          </p>
        )}
      </div>
    </div>
  );
}

export default function MotionDesign() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [hoveredShortId, setHoveredShortId] = useState(null);
  const [hoveredLongId, setHoveredLongId] = useState(null);
  
  // 🔊 HERO VIDEO SOUND STATE & REF
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
        y: 120,
        scale: 0.9,
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

  // Check if selected video is from short forms
  const isShortForm = selectedVideo && SHORT_FORMS.some(s => s.id === selectedVideo.id);

  return (
    <div className="w-full min-h-screen bg-[#FFFCFB] relative overflow-x-hidden pb-32 sm:pb-40 m-0 text-[#14120e]">
      
      {/* 🎞️ GRAIN OVERLAY */}
      <div 
        className="fixed inset-0 pointer-events-none z-[999] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <style>{`
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
          src="https://res.cloudinary.com/n1mfkfh4/video/upload/v1785674839/Perfectionism_compressed_isgrjo.mp4" 
          autoPlay 
          loop 
          muted={isHeroMuted} 
          playsInline 
          className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-[0.55] contrast-105"
        />

        {/* 🔊 SOUND TOGGLE BUTTON */}
        <button
          onClick={toggleHeroSound}
          className="absolute bottom-16 left-6 sm:bottom-28 sm:left-10 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#FFC822] hover:scale-110 transition-all duration-300 shadow-xl cursor-pointer group"
          title={isHeroMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isHeroMuted ? (
            <svg className="w-5 h-5 fill-current text-[#FFC822]" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5 fill-current text-[#144BFF]" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-[#14120e]/80 via-transparent to-[#14120e]/60 z-[1] pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-center items-center px-4">
          <h1 
            style={{ 
              fontFamily: "'Talina', sans-serif", 
              letterSpacing: '-0.5px', 
              fontWeight: 300 
            }}
            className="text-[2.5rem] sm:text-[4.2rem] text-[#ffffff] m-0 text-center leading-none"
          >
            Motion Work
          </h1>
          
          <p 
            style={{ fontFamily: "'HelveticaNeue', sans-serif", fontWeight: 800, letterSpacing : '-1px' }}
            className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-[#144BFF] text-[10px] sm:text-base uppercase tracking-widest text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
          >
            <span>2D & 3D ANIMATION</span> 
            <span className="text-[#FFC822] mx-1">•</span> 
            <span>VFX</span> 
            <span className="text-[#FFC822] mx-1">•</span> 
            <span>KINETIC TITLES</span>
          </p>
        </div>
      </div>

      {/* HEADER & FEATURED MASTERPIECE SECTION */}
      <div ref={featuredSectionRef} className="w-full mx-auto pt-10 sm:pt-16 pb-6 px-4 flex flex-col items-center relative z-20 text-center overflow-hidden">
        
        <div className="inline-flex flex-col items-center z-20 px-4">
          <h2 
            style={{ 
              fontFamily: "'Talina', sans-serif", 
              letterSpacing:'-0.5px', 
              fontWeight: 400 
            }}
            className="text-2xl sm:text-4xl m-0 text-[#144BFF] leading-tight"
          >
            Welcome to Motion Design section
          </h2>
        </div>

        <div ref={paragraphRef} className="relative z-10 mt-3 mb-6 max-w-[700px] px-4">
          <p 
            style={{ 
              fontFamily: "'HelveticaNeue', sans-serif", 
              fontWeight: 600,
              letterSpacing : '-1px'
            }}
            className="text-[#14120e] text-xs sm:text-lg leading-relaxed text-center font-light tracking-wide"
          >
            I craft dynamic 2D/3D motion graphics, kinetic typography, and fluid visual effects that elevate brand campaigns and digital storytelling.
          </p>
        </div>

        {/* 🍿 FULL WIDE FEATURED MASTERPIECE */}
        <div className="max-w-[1100px] w-full px-2 sm:px-6 mb-10 relative z-20">
          <CustomVideoPlayer 
            src="https://res.cloudinary.com/n1mfkfh4/video/upload/v1785674839/Perfectionism_compressed_isgrjo.mp4"
            badgeText="Featured Masterpiece"
            className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-black/10"
            muted={true}
          />
        </div>
      </div>

      {/* SHORT FORMS */}
      <div className="w-full max-w-full relative overflow-hidden my-8 sm:my-20">
        <div className="max-w-[1100px] w-full mx-auto px-6 flex flex-col items-center text-center mb-6">
          <h3 
            style={{ 
              fontFamily: "'Talina', sans-serif", 
              letterSpacing : '-1px',
              fontWeight: 400 
            }}
            className="text-2xl sm:text-4xl m-0 text-[#144BFF] leading-tight"
          >
            Short Forms
          </h3>

          <div 
            style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '-1px', fontWeight: 600 }}
            className="flex items-center justify-center gap-1.5 sm:gap-2.5 mt-3 text-[#14120e] text-[10px] sm:text-base uppercase tracking-wider text-center"
          >
            <span>3D MOTION</span>
            <span className="text-[#FFC822] text-xs sm:text-lg">•</span>
            <span>LOGO REVEALS</span>
            <span className="text-[#FFC822] text-xs sm:text-lg">•</span>
            <span>UGC ADS</span>
            <span className="text-[#FFC822] text-xs sm:text-lg">•</span>
            <span>KINETIC LOOPS</span>
          </div>
        </div>
        
        <div className="w-full max-w-full overflow-hidden pt-2 pb-4 group">
          <div className="inline-flex whitespace-nowrap gap-4 sm:gap-10 w-max will-change-transform animate-[slowMarqueeLeft_85s_linear_infinite] group-hover:[animation-play-state:paused]">
            {duplicateList(SHORT_FORMS).map((item, idx) => (
              <div key={`short-${idx}`} onClick={() => setSelectedVideo(item)}>
                <VideoCard 
                  item={item} 
                  aspectRatio="tall" 
                  hoveredId={hoveredShortId} 
                  setHoveredId={setHoveredShortId} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LONG FORMS */}
      <div className="w-full max-w-full relative overflow-hidden my-8 sm:my-20">
        <div className="max-w-[1100px] w-full mx-auto px-6 flex flex-col items-center text-center mb-6">
          <h3 
            style={{ 
              fontFamily: "'Talina', sans-serif", 
              letterSpacing : '-1px',
              fontWeight: 400 
            }}
            className="text-2xl sm:text-4xl m-0 text-[#144BFF] leading-tight"
          >
            Long Forms
          </h3>

          <div 
            style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '-1px', fontWeight: 600 }}
            className="flex items-center justify-center gap-1.5 sm:gap-2.5 mt-3 text-[#14120e] text-[10px] sm:text-base uppercase tracking-wider text-center"
          >
            <span>ANIMATED EXPLAINERS</span>
            <span className="text-[#FFC822] text-xs sm:text-lg">•</span>
            <span>TITLE SEQUENCES</span>
            <span className="text-[#FFC822] text-xs sm:text-lg">•</span>
            <span>3D VISUALS</span>
          </div>
        </div>

        <div className="w-full max-w-full overflow-hidden pt-2 pb-4 group">
          <div className="inline-flex whitespace-nowrap gap-4 sm:gap-10 w-max will-change-transform animate-[slowMarqueeRight_85s_linear_infinite] group-hover:[animation-play-state:paused]">
            {duplicateList(LONG_FORMS).map((item, idx) => (
              <div key={`long-${idx}`} onClick={() => setSelectedVideo(item)}>
                <VideoCard 
                  item={item} 
                  aspectRatio="wide" 
                  hoveredId={hoveredLongId} 
                  setHoveredId={setHoveredLongId} 
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🚀 SOCIAL PROOF */}
      <div className="m-0 p-0 mb-20 sm:mb-36">
        <SocialProof />
      </div>

      {/* FULLSCREEN PREVIEW WITH DYNAMIC ASPECT RATIO */}
      {selectedVideo && (
        <div 
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-[99999] bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full ${isShortForm ? 'max-w-[340px] sm:max-w-[380px] aspect-[9/16] rounded-2xl bg-black' : 'max-w-5xl rounded-xl bg-[#FFFCFB]'} overflow-hidden shadow-2xl cursor-default flex flex-col`}
          >
            <button 
              onClick={() => setSelectedVideo(null)}
              className={`absolute top-4 right-4 z-[1000] w-10 h-10 rounded-full ${isShortForm ? 'bg-black/60 text-white' : 'bg-[#14120e] text-[#FFFFFF] hover:bg-[#144BFF]'} flex items-center justify-center font-bold text-lg transition-all shadow-lg cursor-pointer backdrop-blur-md`}
            >
              ✕
            </button>

            {isShortForm ? (
              <div className="w-full h-full bg-black flex-1 relative">
                <video 
                  src={selectedVideo.videoUrl} 
                  controls 
                  autoPlay 
                  playsInline 
                  loop
                  className="w-full h-full object-cover outline-none" 
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
                <div className="p-4 sm:p-6 bg-[#FFFCFB] text-[#14120e] flex items-center justify-between border-t border-black/10">
                  <h3 
                    style={{ fontFamily: "'Talina', sans-serif", fontWeight: 300 }}
                    className="text-lg sm:text-2xl text-[#144BFF]"
                  >
                    {selectedVideo.title}
                  </h3>
                  {selectedVideo.brand && (
                    <span 
                      style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '-0.3px', fontWeight: 300 }}
                      className="text-[10px] sm:text-xs uppercase text-[#554f46] bg-[#f0eae1] px-2.5 py-1 rounded-sm border border-black/10"
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