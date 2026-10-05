import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SocialProof from '../components/SocialProof';
import Footer from './Footer';
import CustomVideoPlayer from '../components/CustomVideoPlayer';
import StatsCounter from '../components/StatsCounter';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// ✨ SMOOTH: layout effect = initial hidden states are applied BEFORE the first paint (no flash)
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

// 🎬 DIRECTION PROJECTS DATA WITH HOSTINGER LINKS
const DIRECTION_PROJECTS = [
  {
    id: 'dp1',
    num: '01',
    title: 'The Introduction Video',
    description: 'This intro video was my attempt to show who I really am, instead of just going through the motions like every other intro. I poured effort into the story and visuals and somehow, it struck a chord: 200K+ views from an account with only 256 followers.',
    videoUrl: 'https://akshayshrivastava.com/videos/AboutMain.mp4',
    poster: 'https://akshayshrivastava.com/images/AboutMain.png',
  },
  {
    id: 'dp2',
    num: '02',
    title: 'Perfectionism',
    description: 'Exploratory visual storytelling with structured lighting, precise camera movement, and cinematic color grading.',
    videoUrl: 'https://akshayshrivastava.com/videos/MotionMain.mp4',
    poster: 'https://akshayshrivastava.com/images/MotionMain.png',
  },
  {
    id: 'dp3',
    num: '03',
    title: 'folder wallet',
    description: 'Directing on-set talent and seamless motion graphics integration for modern tech positioning.',
    videoUrl: 'https://akshayshrivastava.com/videos/DirectionMain.mp4',
    poster: 'https://akshayshrivastava.com/images/DirectionMain.png',
  }
];

// 📸 FRAME GALLERY: videos are auto-fitted into the gray windows of directionFrames.png
const FRAME_SRC = '/directionFrames.png';
const GALLERY_MAX_WIDTH = 760; // 👈 gallery size in px: chota karna ho to kam karo, bada karna ho to badhao

const FRAME_VIDEOS = [
  {
    title: 'On-Set BTS',
    src: 'https://akshayshrivastava.com/videos/AboutMain.mp4',
    poster: 'https://akshayshrivastava.com/images/AboutMain.png',
    textColor: 'text-white',
  },
  {
    title: 'Storyboard',
    src: 'https://akshayshrivastava.com/videos/short18.mp4',
    poster: 'https://akshayshrivastava.com/images/short18.png',
    textColor: 'text-[#FFC822]',
  },
  {
    title: 'Cam Cut',
    src: 'https://akshayshrivastava.com/videos/MotionMain.mp4',
    poster: 'https://akshayshrivastava.com/images/MotionMain.png',
    textColor: 'text-white',
  },
];

// Finds the 3 gray "window" regions in the PNG and returns a mask + corner points for each.
function detectWindows(img) {
  const W = Math.min(img.naturalWidth, 1000);
  const H = Math.round((img.naturalHeight * W) / img.naturalWidth);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, W, H);
  const { data } = ctx.getImageData(0, 0, W, H);

  // 1. flag solid mid-gray pixels (the placeholder windows)
  const flag = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3];
    if (a > 200 && r > 55 && r < 140 && Math.abs(r - g) < 10 && Math.abs(g - b) < 10) flag[i] = 1;
  }

  // 1b. visible bounding box of the whole PNG (to auto-crop transparent padding)
  let minX = W, minY = H, maxX = 0, maxY = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (data[(y * W + x) * 4 + 3] > 30) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const pad = 4;
  minX = Math.max(0, minX - pad);
  minY = Math.max(0, minY - pad);
  maxX = Math.min(W - 1, maxX + pad);
  maxY = Math.min(H - 1, maxY + pad);
  const crop = { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };

  // 1c. find the beige torn strip (for the "Direction Work" title)
  const stripFlag = new Uint8Array(W * H);
  for (let i = 0; i < W * H; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3];
    if (a > 200 && g > 215 && r - g < 14 && r - b > 25 && b > 150 && b < 215) stripFlag[i] = 1;
  }
  const stripSeen = new Uint8Array(W * H);
  let strip = null, stripCount = 0;
  for (let start = 0; start < W * H; start++) {
    if (!stripFlag[start] || stripSeen[start]) continue;
    const st = [start];
    stripSeen[start] = 1;
    let count = 0, x0 = W, y0 = H, x1 = 0, y1 = 0;
    while (st.length) {
      const q = st.pop();
      count++;
      const x = q % W, y = (q - x) / W;
      if (x < x0) x0 = x;
      if (x > x1) x1 = x;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
      if (x > 0 && stripFlag[q - 1] && !stripSeen[q - 1]) { stripSeen[q - 1] = 1; st.push(q - 1); }
      if (x < W - 1 && stripFlag[q + 1] && !stripSeen[q + 1]) { stripSeen[q + 1] = 1; st.push(q + 1); }
      if (y > 0 && stripFlag[q - W] && !stripSeen[q - W]) { stripSeen[q - W] = 1; st.push(q - W); }
      if (y < H - 1 && stripFlag[q + W] && !stripSeen[q + W]) { stripSeen[q + W] = 1; st.push(q + W); }
    }
    if (count > stripCount) { stripCount = count; strip = { x0, y0, x1, y1 }; }
  }
  if (stripCount < W * H * 0.005) strip = null;

  // 2. connected components (flood fill)
  const seen = new Uint8Array(W * H);
  const comps = [];
  for (let start = 0; start < W * H; start++) {
    if (!flag[start] || seen[start]) continue;
    const stack = [start];
    seen[start] = 1;
    const pixels = [];
    let tl = null, tr = null, br = null, bl = null;
    let sumX = 0;
    while (stack.length) {
      const p = stack.pop();
      pixels.push(p);
      const x = p % W, y = (p - x) / W;
      sumX += x;
      if (!tl || x + y < tl[0] + tl[1]) tl = [x, y];
      if (!br || x + y > br[0] + br[1]) br = [x, y];
      if (!tr || x - y > tr[0] - tr[1]) tr = [x, y];
      if (!bl || x - y < bl[0] - bl[1]) bl = [x, y];
      if (x > 0 && flag[p - 1] && !seen[p - 1]) { seen[p - 1] = 1; stack.push(p - 1); }
      if (x < W - 1 && flag[p + 1] && !seen[p + 1]) { seen[p + 1] = 1; stack.push(p + 1); }
      if (y > 0 && flag[p - W] && !seen[p - W]) { seen[p - W] = 1; stack.push(p - W); }
      if (y < H - 1 && flag[p + W] && !seen[p + W]) { seen[p + W] = 1; stack.push(p + W); }
    }
    comps.push({ pixels, tl, tr, br, bl, cx: sumX / pixels.length });
  }

  // 3. keep the 3 biggest, ordered left to right
  const top3 = comps
    .filter((c) => c.pixels.length > W * H * 0.01)
    .sort((a, b) => b.pixels.length - a.pixels.length)
    .slice(0, 3)
    .sort((a, b) => a.cx - b.cx);

  // 4. build a mask image per window (grown by 1px to hide the gray fringe)
  const windows = top3.map((c) => {
    const mc = document.createElement('canvas');
    mc.width = W;
    mc.height = H;
    const mctx = mc.getContext('2d');
    const imgData = mctx.createImageData(W, H);
    const out = imgData.data;
    c.pixels.forEach((p) => {
      const x = p % W, y = (p - x) / W;
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const nx = x + dx, ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
          const o = (ny * W + nx) * 4;
          out[o] = out[o + 1] = out[o + 2] = 0;
          out[o + 3] = 255;
        }
      }
    });
    mctx.putImageData(imgData, 0, 0);
    return { mask: mc.toDataURL('image/png'), tl: c.tl, tr: c.tr, br: c.br, bl: c.bl };
  });

  return { W, H, windows, crop, strip };
}

// ✨ SMOOTH: the pixel scan is heavy, so it runs only once per session (cached) and is deferred
// until the browser is idle. This keeps the page transition from stuttering.
let layoutCache = null;
let layoutPromise = null;

const loadLayout = () => {
  if (layoutCache) return Promise.resolve(layoutCache);
  if (layoutPromise) return layoutPromise;

  layoutPromise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const run = () => {
        try {
          const result = detectWindows(img);
          if (result.windows.length < 3) {
            console.warn('ScrapbookGallery: found', result.windows.length, 'windows. Are the gray windows still in the PNG?');
          }
          layoutCache = result;
          resolve(result);
        } catch (e) {
          reject(e);
        }
      };
      if ('requestIdleCallback' in window) window.requestIdleCallback(run, { timeout: 600 });
      else setTimeout(run, 60);
    };
    img.onerror = reject;
    img.src = FRAME_SRC;
  }).catch((e) => {
    layoutPromise = null;
    throw e;
  });

  return layoutPromise;
};

function ScrapbookGallery({ onReady }) {
  const wrapRef = useRef(null);
  const videoRefs = useRef([]);
  const [layout, setLayout] = useState(layoutCache);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // read the PNG and locate the windows (cached after the first visit)
  useEffect(() => {
    let cancelled = false;
    loadLayout()
      .then((result) => {
        if (!cancelled) setLayout(result);
      })
      .catch((e) => {
        console.error('ScrapbookGallery: could not read frame image', e);
        if (!cancelled && onReady) onReady();
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // tell the page the gallery is on screen (after one frame so its size has applied)
  useEffect(() => {
    if (!layout || !onReady) return;
    const id = requestAnimationFrame(() => onReady());
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.25 }
    );
    if (wrapRef.current) observer.observe(wrapRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v, idx) => {
      if (!v) return;
      const shouldPlay = isVisible && (hoveredIdx === null || hoveredIdx === idx);
      if (shouldPlay) v.play().catch(() => {});
      else v.pause();
    });
  }, [isVisible, hoveredIdx, layout]);

  const crop = layout ? layout.crop : null;
  const strip = layout ? layout.strip : null;

  return (
    <div
      className={`w-full mx-auto my-2 sm:my-8 flex justify-center select-none px-2 sm:px-4 transition-opacity duration-700 ease-out ${
        layout ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ maxWidth: GALLERY_MAX_WIDTH }}
    >
      <div
        ref={wrapRef}
        className="relative w-full overflow-hidden"
        style={
          layout
            ? { aspectRatio: `${crop.w} / ${crop.h}`, containerType: 'inline-size' }
            : { minHeight: 300 }
        }
      >
        {layout && (
          /* Inner layer = the full PNG, shifted so only the visible (cropped) area shows */
          <div
            className="absolute"
            style={{
              left: `${(-crop.x / crop.w) * 100}%`,
              top: `${(-crop.y / crop.h) * 100}%`,
              width: `${(layout.W / crop.w) * 100}%`,
              height: `${(layout.H / crop.h) * 100}%`,
            }}
          >
            <img src={FRAME_SRC} alt="" draggable={false} className="block w-full h-full pointer-events-none" />

            {/* Title on the torn strip */}
            {strip && (
              <h2
                style={{
                  fontFamily: "'SquidBoy', sans-serif",
                  letterSpacing: '0.5px',
                  left: `${(((strip.x0 + strip.x1) / 2) / layout.W) * 100}%`,
                  top: `${(((strip.y0 + strip.y1) / 2) / layout.H) * 100}%`,
                  transform: 'translate(-50%, -50%) rotate(-1deg)',
                  fontSize: `${(((strip.y1 - strip.y0) * 0.5) / crop.w) * 100}cqw`,
                }}
                className="absolute z-20 m-0 text-[#D42C2C] leading-none whitespace-nowrap capitalize pointer-events-none"
              >
                Direction <span className='text-[#14120e]'>Work</span>
              </h2>
            )}

            {layout.windows.map((w, idx) => {
              const v = FRAME_VIDEOS[idx];
              if (!v) return null;
              const { W, H } = layout;
              const { tl, tr, br, bl } = w;

              const cx = (tl[0] + tr[0] + br[0] + bl[0]) / 4;
              const cy = (tl[1] + tr[1] + br[1] + bl[1]) / 4;
              const angle = Math.atan2(tr[1] - tl[1], tr[0] - tl[0]);
              const vw = Math.hypot(tr[0] - tl[0], tr[1] - tl[1]) * 1.12;
              const vh = Math.hypot(bl[0] - tl[0], bl[1] - tl[1]) * 1.12;

              const polygon = [tl, tr, br, bl]
                .map(([x, y]) => `${(x / W) * 100}% ${(y / H) * 100}%`)
                .join(',');

              return (
                <React.Fragment key={idx}>
                  {/* video, masked to the exact window shape and rotated with the frame */}
                  <div
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      maskImage: `url(${w.mask})`,
                      WebkitMaskImage: `url(${w.mask})`,
                      maskSize: '100% 100%',
                      WebkitMaskSize: '100% 100%',
                      maskRepeat: 'no-repeat',
                      WebkitMaskRepeat: 'no-repeat',
                    }}
                  >
                    <div
                      className="absolute bg-black overflow-hidden"
                      style={{
                        left: `${((cx - vw / 2) / W) * 100}%`,
                        top: `${((cy - vh / 2) / H) * 100}%`,
                        width: `${(vw / W) * 100}%`,
                        height: `${(vh / H) * 100}%`,
                        transform: `rotate(${angle}rad)`,
                      }}
                    >
                      <video
                        ref={(el) => (videoRefs.current[idx] = el)}
                        src={v.src}
                        poster={v.poster}
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        className={`w-full h-full object-cover transition-all duration-300 ${
                          hoveredIdx === idx ? 'brightness-110' : 'brightness-95'
                        }`}
                      />
                    </div>
                  </div>

                  {/* caption near the bottom-left of each window */}
                  {/* <span
                    style={{
                      fontFamily: "'GroteskFont', sans-serif",
                      fontWeight: 400,
                      left: `${(bl[0] / W) * 100 + 1.5}%`,
                      top: `${(bl[1] / H) * 100 - 1.5}%`,
                      transform: 'translateY(-100%)',
                    }}
                    className={`absolute z-20 pointer-events-none bg-black/80 ${v.textColor} px-1 py-0.5 rounded-[4px] text-[8px] sm:text-xs capitalize`}
                  >
                    {v.title}
                  </span> */}

                  {/* hover target, clipped to the window's four corners */}
                  <div
                    className="absolute inset-0 z-30 cursor-pointer"
                    style={{ clipPath: `polygon(${polygon})` }}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                  />
                </React.Fragment>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// 📱 SHORT FORM DIRECTION VIDEO CARD
function DirectionShortCard({ project, isHovered, onHover, onLeave }) {
  return (
    <div 
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="w-[180px] xs:w-[210px] sm:w-[300px] aspect-[9/16] bg-[#14120e] rounded-[8px] overflow-hidden shadow-2xl relative transition-transform duration-500 hover:scale-[1.02] shrink-0 cursor-pointer"
    >
      <CustomVideoPlayer 
        src={project.videoUrl} 
        poster={project.poster}
        badgeText={project.tag}
        className="w-full h-full"
        muted={true}
      />
    </div>
  );
}

// 🚀 ANIMATED DIRECTION ROW
function DirectionProjectRow({ project, index, activeHoverId, setActiveHoverId }) {
  const rowRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const textColRef = useRef(null);
  const isReverse = index % 2 !== 0;

  const isHovered = activeHoverId === project.id;

  // ✨ SMOOTH: layout effect (no flash), autoAlpha on the video too, GPU transforms, plays once
  useIsoLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      
      const videoInitialX = isMobile ? 0 : (isReverse ? -120 : 120);
      const textInitialX = isMobile ? 0 : (isReverse ? 80 : -80);
      
      const videoFinalX = isMobile ? 0 : (isReverse ? 60 : -60);
      const textFinalX = isMobile ? 0 : (isReverse ? -40 : 40);

      gsap.set(videoWrapperRef.current, {
        x: videoInitialX,
        autoAlpha: 0,
        force3D: true,
      });

      gsap.set(textColRef.current, {
        autoAlpha: 0,
        x: textInitialX,
        y: isMobile ? 20 : 0,
        scale: 0.95,
        force3D: true,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rowRef.current,
          start: 'top 80%',
          once: true,
        },
      });

      tl.to(videoWrapperRef.current, {
        x: videoFinalX,
        autoAlpha: 1,
        duration: 1.1,
        ease: 'power3.inOut',
      })
      .to(textColRef.current, {
        autoAlpha: 1,
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
      className={`flex flex-col ${isReverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center justify-center gap-6 md:gap-12 w-full group py-4 relative min-h-[350px] sm:min-h-[550px]`}
    >
      <div ref={videoWrapperRef} className="shrink-0 relative z-20 will-change-transform">
        <DirectionShortCard 
          project={project} 
          isHovered={isHovered}
          onHover={() => setActiveHoverId(project.id)}
          onLeave={() => setActiveHoverId(null)}
        />
      </div>

      <div 
        ref={textColRef} 
        className="w-full md:max-w-[480px] flex flex-col justify-center text-center md:text-left shrink-0 relative z-10 px-4 will-change-transform"
      >
        <h3 
          style={{ fontFamily: "'SquidBoy', sans-serif", letterSpacing: '0.5px' }}
          className="text-[#D42C2C] text-lg sm:text-3xl md:text-[2.2rem] m-0 leading-tight capitalize relative md:px-4"
        >
          {project.title}
        </h3>

        <p 
          style={{ fontFamily: "'ParaFont', sans-serif", letterSpacing: '-0.2px', fontWeight: 400 }}
          className="text-[#3b352e] text-xs sm:text-lg mt-2 sm:mt-4 m-0 leading-relaxed font-light md:px-4"
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
  const [galleryReady, setGalleryReady] = useState(Boolean(layoutCache));

  const handleGalleryReady = useCallback(() => setGalleryReady(true), []);

  // ✨ SMOOTH: always open the page from the top so triggers are measured from a clean state
  useIsoLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ✨ SMOOTH: hide the intro text before the first paint (no flash)
  useIsoLayoutEffect(() => {
    gsap.set(paragraphRef.current, {
      autoAlpha: 0,
      y: 60,
      scale: 0.95,
      force3D: true,
    });
  }, []);

  // safety net: never leave the text hidden if the gallery takes too long
  useEffect(() => {
    const t = setTimeout(() => setGalleryReady(true), 2500);
    return () => clearTimeout(t);
  }, []);

  // ✨ SMOOTH: reveal the text only AFTER the gallery has its final size (nothing shifts under it)
  useEffect(() => {
    if (!galleryReady) return;

    const ctx = gsap.context(() => {
      gsap.to(paragraphRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: paragraphRef.current,
          start: 'top 92%',
          once: true,
        },
      });
    }, featuredSectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [galleryReady]);

  // ✨ SMOOTH: re-measure all scroll triggers once fonts / images have settled
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 600);
    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#FFFCFB] relative overflow-x-hidden pb-12 sm:pb-24 m-0 text-[#14120e]">
      
      {/* ✨ SMOOTH: blend-mode removed (it forced an expensive full-screen composite on every frame) */}
      <div 
        className="fixed inset-0 pointer-events-none z-[999] bg-[url('/noise.gif')] bg-repeat"
        style={{ opacity: 0.03 }}
      />

      <style>{`
        @font-face {
          font-family: 'SquidBoy';
          src: url('/Fonts/SquidBoy.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
          font-display: block;
        }

        @font-face {
          font-family: 'SquidBoy';
          src: url('/Fonts/SquidBoy-Bold.otf') format('opentype');
          font-weight: bold;
          font-style: normal;
          font-display: block;
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
      `}</style>

      {/* FRAMES + INTRO TEXT */}
      {/* pt-24 / sm:pt-32 keeps the frames clear of the navbar now that the hero is gone */}
      <div ref={featuredSectionRef} className="w-full mx-auto pt-24 sm:pt-32 pb-4 px-4 flex flex-col items-center relative z-20 text-center overflow-hidden">
        <ScrapbookGallery onReady={handleGalleryReady} />

        <div ref={paragraphRef} className="relative z-10 mt-3 mb-4 max-w-[750px] px-4 flex flex-col gap-3 will-change-transform">
          <p 
            style={{ fontFamily: "'ParaFont', sans-serif", letterSpacing: '-0.2px', fontWeight: 400 }}
            className="text-[#3b352e] text-xs sm:text-lg leading-relaxed font-light text-center"
          >
            I’ve always had a head full of random, unhinged ideas, and at some point, I thought, why not actually make them? That’s how I started learning this craft. That curiosity slowly turned into a craft, and the appreciation I received kept me going pushing me deeper into storytelling, motion, and direction.
          </p>
          
        </div>

        
      </div>

      {/* PROJECT ROWS (3 videos) */}
      
      <div className="max-w-[1100px] w-full mx-auto px-4 sm:px-6 flex flex-col gap-10 md:gap-24 my-8 sm:my-20">
        
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

      <StatsCounter/>

      <div className="m-0 p-0 mb-6 sm:mb-20">
        <SocialProof />
      </div>

      <Footer />
    </div>
  );
}