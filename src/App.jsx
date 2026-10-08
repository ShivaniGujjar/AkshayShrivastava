import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 🟢 COMPONENTS & SECTIONS
import Navbar from './components/Navbar';
import Seo from './components/Seo';

import Hero from './sections/Hero';
import Editing from './sections/Editing';
import MotionDesign from './sections/MotionDesign';
import Direction from './sections/Direction';
import AboutMe from './sections/AboutMe';
import NotFound from './sections/NotFound';
import Privacy from './sections/Privacy';
import Analytics from './components/Analytics';
import ConsentBanner from './components/ConsentBanner';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// 🔗 One real URL per section.
const ROUTES = {
  home: '/',
  editing: '/editing',
  motion: '/motion-design',
  direction: '/direction',
  about: '/about',
};

const PATH_TO_SECTION = Object.fromEntries(
  Object.entries(ROUTES).map(([section, path]) => [path, section])
);

function AppShell() {
  const lenisRef = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const cleanPath = pathname.replace(/\/+$/, '') || '/';
  const activeSection = PATH_TO_SECTION[cleanPath] || 'home';

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

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleNavigate = (sectionId) => {
    navigate(ROUTES[sectionId] || ROUTES.home);
  };

  const goHome = () => handleNavigate('home');

  return (
    <div className="min-h-screen w-full bg-[#08080a] text-slate-100 flex flex-col selection:bg-red-500 selection:text-white relative">
      
      {/* Navbar */}
      {activeSection !== 'home' && (
        <Navbar onNavigate={handleNavigate} activeSection={activeSection} />
      )}
      
      <main className="flex-1 w-full flex flex-col">
        <Routes>
          <Route path={ROUTES.home} element={<><Seo page="home" /><Hero onColumnClick={handleNavigate} /></>} />
          <Route path={ROUTES.editing} element={<><Seo page="editing" /><Editing onBack={goHome} /></>} />
          <Route path={ROUTES.motion} element={<><Seo page="motion" /><MotionDesign onBack={goHome} /></>} />
          <Route path={ROUTES.direction} element={<><Seo page="direction" /><Direction onBack={goHome} /></>} />
          <Route path={ROUTES.about} element={<><Seo page="about" /><AboutMe onBack={goHome} /></>} />

          <Route path="/privacy" element={<><Seo page="privacy" /><Privacy /></>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Analytics/>
      {/* <ConsentBanner/> */}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}