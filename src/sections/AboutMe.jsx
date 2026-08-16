import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialProof from '../components/SocialProof';
import Footer from './Footer';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutMe() {
  const bioSectionRef = useRef(null);
  const nameRef = useRef(null);
  const cardRef = useRef(null);

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
      gsap.set(nameRef.current, {
        opacity: 0,
        y: 60,
      });

      gsap.set(cardRef.current, {
        opacity: 0,
        y: 100,
        scale: 0.95,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bioSectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });

      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      })
      .to(cardRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.6');

    }, bioSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FFFCFB] relative overflow-x-hidden pb-16 sm:pb-24 m-0 text-[#14120e]">
      
      {/* 🎞️ NOISE GIF OVERLAY */}
      <div 
        className="fixed inset-0 pointer-events-none z-[999] bg-[url('/noise.gif')] bg-repeat"
        style={{ opacity: 0.05, mixBlendMode: 'multiply' }}
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

      {/* 🎬 HERO BANNER WITH HOSTINGER VIDEO */}
      <div className="relative w-full h-[60vh] sm:h-screen bg-[#14120e] flex flex-col justify-center items-center overflow-hidden m-0 p-0 editing-cutout-mask"> 
        <video 
          ref={heroVideoRef}
          autoPlay 
          loop 
          muted={isMuted} 
          playsInline 
          className="absolute top-0 left-0 w-full h-full object-cover z-0 filter brightness-[0.55] contrast-105"
        >
          <source src="https://akshayshrivastava.com/videos/AboutMain.mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-t from-[#14120e]/80 via-transparent to-[#14120e]/60 z-[1] pointer-events-none" />

        {/* 🔊 MINIMAL SOUND TOGGLE BUTTON */}
        <button
          onClick={toggleAudio}
          className="absolute bottom-6 left-4 sm:bottom-12 sm:left-10 z-30 flex items-center justify-center w-8 h-8 sm:w-11 sm:h-11 bg-black/60 hover:bg-[#144BFF] backdrop-blur-md text-[#FFFFFF] border border-white/20 rounded-full transition-all duration-300 shadow-xl group cursor-pointer hover:scale-110"
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
            About Me
          </h1>

          <p 
            style={{ fontFamily: "'HelveticaNeue', sans-serif", fontWeight: 800, letterSpacing: '-1px' }}
            className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4 text-[#144BFF] text-[10px] sm:text-base uppercase tracking-widest text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
          >
            <span>BIOGRAPHY</span> 
            <span className="text-[#FFC822] mx-1">•</span> 
            <span>EXPERIENCE</span> 
            <span className="text-[#FFC822] mx-1">•</span> 
            <span>CREATIVE VISION</span>
          </p>
        </div>
      </div>

      {/* 🏛️ CORE SHOWCASE CANVAS BODY */}
      <div 
        ref={bioSectionRef} 
        className="max-w-[950px] w-full mx-auto pt-10 sm:pt-16 pb-12 px-4 sm:px-6 flex flex-col items-center text-center relative z-20"
      >
        <h2 
          ref={nameRef}
          style={{ fontFamily: "'Talina', sans-serif", letterSpacing: '-1px', fontWeight: 400 }}
          className="w-full text-center text-[#144BFF] text-3xl sm:text-5xl md:text-[4.2rem] leading-[1.1] mb-6 sm:mb-8"
        >
          Akshay{' '}
          <span className="text-[#14120e] ml-2 sm:ml-4">Shrivastava</span>
        </h2>
        
        <div 
          ref={cardRef}
          style={{ fontFamily: "'HelveticaNeue', sans-serif", letterSpacing: '-0.2px', fontWeight: 300 }}
          className="bg-white/80 backdrop-blur-md p-5 sm:p-10 rounded-[12px] border border-black/10 shadow-xl text-[#14120e] text-xs sm:text-xl md:text-2xl leading-relaxed font-light space-y-4 sm:space-y-6 w-full mb-10 sm:mb-16 relative z-10 text-left"
        >
          <p className="m-0">
            I am a video editor, motion designer, and creative director obsessed with high-retention storytelling and high-fidelity visuals.
          </p>
          <p className="m-0">
            Having worked across startups, digital media networks, and content creators, I specialize in transforming raw footage into engaging podcasts, high-energy UGC ads, cinematic promos, and fluid 2D/3D motion graphics.
          </p>
          <p className="m-0">
            Whether it’s directing on-set, scripting narratives, or fine-tuning post-production pacing, my focus is always on building content that hooks audiences and elevates brand vision.
          </p>
        </div>
      </div>

      {/* 🚀 SOCIAL PROOF */}
      <div className="m-0 p-0 mb-12 sm:mb-20">
        <SocialProof />
      </div>

      {/* 🚀 FLOATING DOCK FOOTER */}
      <Footer />
    </div>
  );
}