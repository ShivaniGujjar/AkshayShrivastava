import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialProof from '../components/SocialProof';
import Footer from './Footer';
import CustomVideoPlayer from '../components/CustomVideoPlayer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 🎬 DIRECTION PROJECTS DATA WITH HOSTINGER LINKS
const DIRECTION_PROJECTS = [
  {
    id: 'dp1',
    num: '01',
    title: 'Brand Commercial Direction',
    description: 'A high-impact brand campaign focusing on narrative pacing, emotional resonance, and high retention.',
    videoUrl: 'https://akshayshrivastava.com/videos/DirectionMain.mp4',
    poster: 'https://akshayshrivastava.com/images/DirectionMain.png',
    tag: 'Commercial'
  },
  {
    id: 'dp2',
    num: '02',
    title: 'Short Film Narrative',
    description: 'Exploratory visual storytelling with structured lighting, precise camera movement, and cinematic color grading.',
    videoUrl: 'https://akshayshrivastava.com/videos/long1.mp4',
    poster: 'https://akshayshrivastava.com/images/long1.png',
    tag: 'Narrative'
  },
  {
    id: 'dp3',
    num: '03',
    title: 'Startup Launch Film',
    description: 'Directing on-set talent and seamless motion graphics integration for modern tech positioning.',
    videoUrl: 'https://akshayshrivastava.com/videos/long2.mp4',
    poster: 'https://akshayshrivastava.com/images/long2.png',
    tag: 'Promo'
  }
];

// 📸 SCRAPBOOK POLAROID GALLERY (Fixed for Mobile Screens)
function ScrapbookGallery() {
  const videoRefs = useRef([]);
  const containerRefs = useRef([]);
  
  const [visibleIndices, setVisibleIndices] = useState(new Set());
  const [hoveredIdx, setHoveredIdx] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleIndices((prev) => {
          const updated = new Set(prev);
          entries.forEach((entry) => {
            const index = Number(entry.target.getAttribute('data-index'));
            if (entry.isIntersecting) {
              updated.add(index);
            } else {
              updated.delete(index);
            }
          });
          return updated;
        });
      },
      { threshold: 0.25 }
    );

    containerRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((videoEl, idx) => {
      if (!videoEl) return;
      const isVisible = visibleIndices.has(idx);

      if (hoveredIdx !== null) {
        if (idx === hoveredIdx && isVisible) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      } else {
        if (isVisible) {
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      }
    });
  }, [visibleIndices, hoveredIdx]);

  const cardsData = [
    {
      title: 'On-Set BTS',
      src: 'https://akshayshrivastava.com/videos/AboutMain.mp4',
      rotation: 'rotate-[-3.5deg] sm:rotate-[-6deg]',
      textColor: 'text-white'
    },
    {
      title: 'Storyboard',
      src: 'https://akshayshrivastava.com/videos/EditingMain.mp4',
      rotation: 'rotate-[0deg] sm:-translate-y-4',
      textColor: 'text-[#FFC822]'
    },
    {
      title: 'Cam Cut',
      src: 'https://akshayshrivastava.com/videos/MotionMain.mp4',
      rotation: 'rotate-[3.5deg] sm:rotate-[6deg]',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="w-full max-w-[950px] my-8 sm:my-16 flex flex-col items-center justify-center relative select-none px-2 sm:px-4">
      
      {/* 🏷️ TOP BADGE */}
      <div 
        style={{ fontFamily: "'HelveticaNeue', sans-serif", fontWeight: 300, letterSpacing: '1px' }}
        className="relative z-40 mb-5 px-3 sm:px-6 py-1.5 sm:py-2 bg-[#3068D3] text-white text-[9px] sm:text-sm uppercase shadow-md rounded-sm rotate-[-1deg] border border-white/20 text-center"
      >
        🎬 DIRECTOR'S CUT • BTS & STORYBOARD
      </div>

      {/* 🎞️ 3 POLAROID FRAMES CONTAINER */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-3 sm:gap-6 md:gap-8 w-full pt-1 pb-4">
        {cardsData.map((card, idx) => (
          <div 
            key={idx}
            data-index={idx}
            ref={(el) => (containerRefs.current[idx] = el)}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            className={`relative w-[100px] xs:w-[115px] sm:w-[240px] md:w-[260px] ${card.rotation} hover:rotate-0 hover:scale-105 transition-all duration-300 z-10 cursor-pointer group filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)] shrink-0`}
          >
            {/* Tape Accent */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 sm:w-16 h-2.5 sm:h-5 bg-[#E8DCB8]/90 border border-amber-900/10 rotate-[-2deg] z-30 shadow-xs pointer-events-none" />

            {/* White Polaroid Card with Ripped Bottom Edge */}
            <div 
              className="w-full bg-[#FFFFFF] p-1.5 sm:p-3 pb-5 sm:pb-10 rounded-t-lg relative overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to bottom, black 88%, transparent 100%), url("/bottom.png")',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
              }}
            >
              {/* Inner Video Container */}
              <div className="w-full aspect-[3/4] bg-black rounded-sm overflow-hidden relative shadow-inner">
                <video 
                  ref={(el) => (videoRefs.current[idx] = el)}
                  src={card.src} 
                  loop 
                  muted 
                  playsInline 
                  preload="metadata"
                  className="w-full h-full object-cover filter brightness-95 group-hover:brightness-100 transition-all pointer-events-none"
                />
                <span 
                  style={{ fontFamily: "'HelveticaNeue', sans-serif", fontWeight: 300 }}
                  className={`absolute bottom-1 left-1 bg-black/80 ${card.textColor} px-1 py-0.5 rounded text-[7px] sm:text-xs uppercase z-30`}
                >
                  {card.title}
                </span>
              </div>

              {/* Visual Paper Texture Bottom Edge */}
              <div 
                className="absolute bottom-0 left-0 right-0 h-5 sm:h-10 w-full z-20 pointer-events-none bg-repeat-x bg-bottom bg-contain opacity-90"
                style={{
                  backgroundImage: "url('/bottom.png')",
                  filter: "drop-shadow(0px -2px 2px rgba(0,0,0,0.15))"
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// 📱 SHORT FORM (VERTICAL 9:16) DIRECTION VIDEO CARD WITH CUSTOM PLAYER
function DirectionShortCard({ project, isHovered, onHover, onLeave }) {
  return (
    <div 
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="w-[200px] sm:w-[300px] aspect-[9/16] bg-[#14120e] rounded-[12px] overflow-hidden shadow-2xl relative border border-black/10 transition-transform duration-500 hover:scale-[1.02] shrink-0 cursor-pointer"
    >
      <CustomVideoPlayer 
        src={project.videoUrl} 
        badgeText={project.tag}
        className="w-full h-full"
        muted={true}
      />
    </div>
  );
}

// 🚀 ANIMATED DIRECTION ROW WITH SPLIT ANIMATION
function DirectionProjectRow({ project, index, activeHoverId, setActiveHoverId }) {
  const rowRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const textColRef = useRef(null);
  const isReverse = index % 2 !== 0;

  const isHovered = activeHoverId === project.id;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      
      const videoInitialX = isMobile ? 0 : (isReverse ? -120 : 120);
      const textInitialX = isMobile ? 0 : (isReverse ? 80 : -80);
      
      const videoFinalX = isMobile ? 0 : (isReverse ? 60 : -60);
      const textFinalX = isMobile ? 0 : (isReverse ? -40 : 40);

      gsap.set(videoWrapperRef.current, {
        x: videoInitialX,
      });

      gsap.set(textColRef.current, {
        opacity: 0,
        x: textInitialX,
        y: isMobile ? 20 : 0,
        scale: 0.95,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rowRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(videoWrapperRef.current, {
        x: videoFinalX,
        duration: 1.1,
        ease: 'power3.inOut',
      })
      .to(textColRef.current, {
        opacity: 1,
        x: textFinalX,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8');

    }, rowRef);

    return () => ctx.revert();
  }, [isReverse]);

  return (
    <div 
      ref={rowRef}
      className={`flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-center gap-6 md:gap-12 w-full group py-4 relative min-h-[400px] sm:min-h-[550px]`}
    >
      {/* 📱 9:16 Vertical Short Form Video Card */}
      <div ref={videoWrapperRef} className="shrink-0 relative z-20">
        <DirectionShortCard 
          project={project} 
          isHovered={isHovered}
          onHover={() => setActiveHoverId(project.id)}
          onLeave={() => setActiveHoverId(null)}
        />
      </div>

      {/* 📝 Text Content Side */}
      <div 
        ref={textColRef} 
        className="w-full md:max-w-[480px] flex flex-col justify-center text-center md:text-left shrink-0 relative z-10 px-4"
      >
        <h3 
          style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '-0.4px', fontWeight: 400 }}
          className={`text-[#3068D3] text-xl sm:text-3xl md:text-[2.2rem] m-0 leading-tight relative md:px-4 ${isReverse ? 'md:border-r-4' : 'md:border-l-4'} md:border-[#3068D3]`}
        >
          {project.title}
        </h3>

        <p 
          style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '-0.2px', fontWeight: 300 }}
          className="text-[#14120e] text-xs sm:text-lg mt-2.5 sm:mt-4 m-0 leading-relaxed font-light md:px-4"
        >
          {project.description}
        </p>
      </div>
    </div>
  );
}

export default function Direction() {
  const featuredSectionRef = useRef(null);
  const paragraphRef = useRef(null);
  const [activeProjectHoverId, setActiveProjectHoverId] = useState(null);

  // 🔊 HERO VIDEO SOUND STATE & REF
  const heroVideoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleAudio = () => {
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(paragraphRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.9,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: featuredSectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(paragraphRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      });

    }, featuredSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FFFCFB] relative overflow-x-hidden pb-16 sm:pb-24 m-0 text-[#14120e]">
      
      {/* 🎞️ NOISE GIF OVERLAY */}
      <div 
        className="fixed inset-0 pointer-events-none z-[999] bg-[url('/noise.gif')] bg-repeat"
        style={{ opacity: 0.03, mixBlendMode: 'multiply' }}
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
          font-family: 'HelveticaNeueBold';
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

      {/* 🎬 HERO BANNER */}
      <div className="relative w-full h-[60vh] sm:h-screen bg-[#14120e] flex flex-col justify-center items-center overflow-hidden m-0 p-0 editing-cutout-mask"> 
        <video 
  ref={heroVideoRef}
  poster="https://akshayshrivastava.com/images/DirectionMain.png"
  autoPlay 
  loop 
  muted={isMuted} 
  playsInline 
  preload="metadata"
  className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-[0.55] contrast-105"
>
  <source src="https://akshayshrivastava.com/videos/DirectionMain.mp4" />
</video>

        <div className="absolute inset-0 bg-gradient-to-t from-[#14120e]/80 via-transparent to-[#14120e]/60 z-[1] pointer-events-none" />

        {/* 🔊 MINIMAL SOUND TOGGLE BUTTON */}
        <button
          onClick={toggleAudio}
          className="absolute bottom-6 left-4 sm:bottom-12 sm:left-10 z-30 flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 bg-black/60 hover:bg-[#3068D3] backdrop-blur-md text-[#FFFFFF] border border-white/20 rounded-full transition-all duration-300 shadow-xl group cursor-pointer hover:scale-110"
          aria-label="Toggle Sound"
        >
          {isMuted ? (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-[#FFC822] group-hover:text-white transition-colors" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current text-[#FFFFFF] animate-pulse" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
          )}
        </button>

        <div className="relative z-10 flex flex-col justify-center items-center px-4">
          <h1 
            style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '-0.5px', fontWeight: 300 }}
            className="text-[2.5rem] sm:text-[4.2rem] font-light text-[#ffffff] m-0 text-center leading-none"
          >
            Direction Work
          </h1>

         <p 
  style={{ fontFamily: "'HelveticaNeue', sans-serif", fontWeight: 800, letterSpacing : '-0.5px' }}
  className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-[#3068D3] text-xs sm:text-lg tracking-widest text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
>
            <span>Storyboarding</span> 
            <span className="text-[#FFC822] mx-1">•</span> 
            <span>Filmaking</span> 
            <span className="text-[#FFC822] mx-1">•</span> 
            <span>Creative Direction</span>
          </p>
        </div>
      </div>

      {/* 🏛️ HEADER & FEATURED ANIMATION SECTION */}
      <div ref={featuredSectionRef} className="w-full mx-auto pt-10 sm:pt-16 pb-6 px-4 flex flex-col items-center relative z-20 text-center overflow-hidden">
        <div className="inline-flex flex-col items-center z-20 px-4">
          <h2 
            style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '-0.5px', fontWeight: 400 }}
            className="text-2xl sm:text-4xl m-0 text-[#3068D3] leading-tight"
          >
            Welcome to Direction section
          </h2>
        </div>

        <div ref={paragraphRef} className="relative z-10 mt-3 mb-6 max-w-[700px] px-4">
          <p 
            style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '-0.2px', fontWeight: 600 }}
            className="text-[#14120e] text-xs sm:text-lg leading-relaxed font-light text-center"
          >
            I craft compelling visual narratives, combining script analysis, intentional blocking, and precise post-direction to build high-converting brand stories.
          </p>
        </div>

        {/* 📸 Scrapbook gallery */}
        <ScrapbookGallery />
      </div>

      {/* 📱 9:16 SHORT FORM PROJECT ROWS */}
      <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 flex flex-col gap-16 md:gap-24 my-12 sm:my-20">
        {DIRECTION_PROJECTS.map((project, idx) => (
          <DirectionProjectRow 
            key={project.id} 
            project={project} 
            index={idx} 
            activeHoverId={activeProjectHoverId}
            setActiveHoverId={setActiveProjectHoverId}
          />
        ))}
      </div>

      {/* 🚀 SOCIAL PROOF */}
      <div className="m-0 p-0 mb-12 sm:mb-20">
        <SocialProof />
      </div>

      {/* 🚀 FOOTER */}
      <Footer />
    </div>
  );
}