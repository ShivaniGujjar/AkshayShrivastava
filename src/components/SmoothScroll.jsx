import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);

  useEffect(() => {
    // 🚀 Update Lenis with HEAVY MOMENTUM physics
    const lenis = new Lenis({
      duration: 1.8, // DECELERATION: Lower number (0.8) is fast; higher (1.8-2.5) is heavy glide
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // SILKY ease curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9, // SENSITIVITY: 1.0 is default, <1 is slower, >1 is fast. (0.9 is perfect glide)
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Sync Lenis animation loop
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  return <>{children}</>;
}