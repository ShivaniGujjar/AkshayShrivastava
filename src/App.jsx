import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 🟢 COMPONENTS & SECTIONS
import Navbar from './components/Navbar';

import Hero from './sections/Hero';
import Editing from './sections/Editing';
import MotionDesign from './sections/MotionDesign';
import Direction from './sections/Direction';
import AboutMe from './sections/AboutMe';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const lenisRef = useRef(null);

  // 🛹 LENIS SMOOTH SCROLL INTEGRATION
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateTicker);
    };
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    
    // Immediate scroll reset for Lenis & Window to prevent mid-page opening
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'editing':
        return <Editing onBack={() => handleNavigate('home')} />;
      case 'motion':
        return <MotionDesign onBack={() => handleNavigate('home')} />;
      case 'direction':
        return <Direction onBack={() => handleNavigate('home')} />;
      case 'about':
        return <AboutMe onBack={() => handleNavigate('home')} />;
      default:
        return <Hero onColumnClick={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#08080a] text-slate-100 flex flex-col selection:bg-red-500 selection:text-white relative">
      
      {/* 🎞️ GLOBAL CINEMATIC NOISE OVERLAY */}
      <div 
        className="fixed inset-0 pointer-events-none z-[999999] bg-[url('/noise.gif')] bg-repeat"
        style={{ opacity: 0.01, mixBlendMode: 'overlay' }}
      />

      {/* Navbar */}
      {activeSection !== 'home' && (
        <Navbar onNavigate={handleNavigate} activeSection={activeSection} />
      )}
      
      <main className="flex-1 w-full flex flex-col">
        {renderActiveSection()}
      </main>
    </div>
  );
}