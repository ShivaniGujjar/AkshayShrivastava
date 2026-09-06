import React, { useState, useEffect } from 'react';
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

  // 🛹 LENIS SMOOTH SCROLL INTEGRATION
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'editing':
        return <Editing onBack={() => setActiveSection('home')} />;
      case 'motion':
        return <MotionDesign onBack={() => setActiveSection('home')} />;
      case 'direction':
        return <Direction onBack={() => setActiveSection('home')} />;
      case 'about':
        return <AboutMe onBack={() => setActiveSection('home')} />;
      default:
        return <Hero onColumnClick={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#08080a] text-slate-100 flex flex-col selection:bg-red-500 selection:text-white relative">
      
      {/* 🎞️ GLOBAL CINEMATIC NOISE OVERLAY (Applies across the entire website) */}
      <div 
        className="fixed inset-0 pointer-events-none z-[999999] bg-[url('/noise.gif')] bg-repeat"
        style={{ opacity: 0.03, mixBlendMode: 'overlay' }}
      />

      {/* Navbar (Only visible when not on home section) */}
      {activeSection !== 'home' && (
        <Navbar onNavigate={handleNavigate} activeSection={activeSection} />
      )}
      
      <main className="flex-1 w-full flex flex-col">
        {renderActiveSection()}
      </main>
    </div>
  );
}