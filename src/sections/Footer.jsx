import React from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

const SOCIAL_LINKS = [
  { 
    id: 'Instagram', 
    name: 'Instagram',
    url: 'https://www.instagram.com/akshay__shri/?hl=en',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] sm:w-[26px] sm:h-[26px] fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round shrink-0 text-[#FFFFFF]">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  { 
    id: 'Gmail', 
    name: 'Gmail',
    url: 'mailto:client@email.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] sm:w-[26px] sm:h-[26px] fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round shrink-0 text-[#FFFFFF]">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    )
  },
  { 
    id: 'YouTube', 
    name: 'YouTube',
    url: 'https://youtube.com',
    icon: (
      <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] sm:w-[26px] sm:h-[26px] fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round shrink-0 text-[#FFFFFF]">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
      </svg>
    )
  }
];

export default function Footer() {
  const { scrollYProgress } = useScroll();
  const [isAtCenter, setIsAtCenter] = React.useState(false);
  const [isNameReveal, setIsNameReveal] = React.useState(false);

  React.useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setIsAtCenter(latest > 0.96);
      setIsNameReveal(latest > 0.985);
    });
  }, [scrollYProgress]);

  return (
    <footer className="fixed bottom-0 left-0 w-screen max-w-full box-border z-[9999] h-20 pointer-events-none overflow-visible bg-transparent pb-3 sm:pb-10 px-2 sm:px-8 md:px-12 flex items-end justify-between">
      
      {/* 🌐 BOTTOM-RIGHT: ANIMATED SOCIAL LINKS CONTAINER */}
      <div className="w-full relative h-full z-[15] overflow-visible flex justify-end">
        <motion.div 
          initial={false}
          animate={{
            x: isAtCenter ? 'calc(-50vw + 50% + 10px)' : '0px',
            scale: isAtCenter ? 1.0 : 0.9,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontFamily: "'gourmet', sans-serif" }}
          className="font-gourmet absolute right-0 bottom-0 flex items-center justify-center bg-[#144BFF] border border-white/25 px-1.5 sm:px-4 h-9 sm:h-12 rounded-md pointer-events-auto gap-1.5 sm:gap-4 shadow-xl backdrop-blur-md will-change-transform"
        >
          {/* CONNECT NOW TEXT */}
          <AnimatePresence>
            {isAtCenter && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, width: 0 }}
                animate={{ opacity: 1, scale: 1, width: 'auto' }}
                exit={{ opacity: 0, scale: 0.8, width: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-1.5 sm:gap-4 overflow-hidden shrink-0 h-full"
              >
                <span className="font-gourmet text-[#FFC822] text-[11px] sm:text-base select-none whitespace-nowrap leading-none flex items-center">
                  Connect
                </span>
                <span className="text-[#FFC822] text-[7px] sm:text-[10px] select-none leading-none flex items-center">●</span>
              </motion.div>
            )}
          </AnimatePresence>

          {SOCIAL_LINKS.map((social, idx) => (
            <React.Fragment key={social.id}>
              <a 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={social.name}
                className="font-gourmet text-[#FFFFFF] flex items-center gap-1 no-underline px-0.5 sm:px-1 h-full cursor-pointer group"
              >
                <div className="flex items-center justify-center">{social.icon}</div>
                
                <span className="font-gourmet inline-flex items-center overflow-hidden whitespace-nowrap text-[11px] sm:text-base text-[#FFFFFF] group-hover:text-[#FFC822] transition-colors leading-none">
                  {social.name.split('').map((char, charIdx) => (
                    <span
                      key={charIdx}
                      style={{
                        opacity: isNameReveal ? 1 : 0,
                        maxWidth: isNameReveal ? '20px' : '0px',
                        transform: isNameReveal ? 'translateY(0px)' : 'translateY(4px)',
                        transition: `opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1) ${charIdx * 0.02}s, max-width 0.25s cubic-bezier(0.16, 1, 0.3, 1) ${charIdx * 0.02}s`
                      }}
                      className="inline-block font-gourmet leading-none"
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              </a>
              {idx < SOCIAL_LINKS.length - 1 && (
                <span className="text-[7px] sm:text-[10px] text-[#FFC822] select-none pointer-events-none leading-none flex items-center h-full">●</span>
              )}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </footer>
  );
}