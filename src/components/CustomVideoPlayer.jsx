import React, { useState, useRef, useEffect } from 'react';

const PlayIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
);
const PauseIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
);
const VolumeIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
);
const MuteIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/></svg>
);

export default function CustomVideoPlayer({ 
  src, 
  poster, 
  badgeText, 
  className = "", 
  videoClassName = "w-full h-full object-cover",
  autoPlay = true,  // 👈 Default Play
  loop = true,      // 👈 Default Loop
  muted = true,     // 👈 Default Muted
  compact = false
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const timerRef = useRef(null);

  useEffect(() => {
    if (autoPlay && videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [autoPlay, src]);

  const togglePlay = (e) => {
    e?.stopPropagation();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e) => {
    e?.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration || 1;
      setCurrentTime(current);
      setDuration(total);
      setProgress((current / total) * 100);
    }
  };

  const handleSeek = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = pos * (videoRef.current.duration || 0);
    }
  };

  const formatTime = (time) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    clearTimeout(timerRef.current);
    if (isPlaying) {
      timerRef.current = setTimeout(() => setShowControls(false), 2500);
    }
  };

  return (
    <div 
      className={`relative overflow-hidden group select-none cursor-pointer ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onClick={togglePlay}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        className={videoClassName}
      />

      {/* Badge Overlay */}
      {badgeText && (
        <span 
          style={{ fontFamily: "'Telina', sans-serif" }}
          className="absolute top-4 left-4 bg-[#144BFF] text-white px-3.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider shadow-md pointer-events-none z-10"
        >
          {badgeText}
        </span>
      )}

      {/* Custom Controls Bar */}
      <div 
        className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 z-20 flex flex-col gap-2 ${showControls ? 'opacity-100' : 'opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Seek Bar */}
        <div 
          className="w-full h-1 bg-white/30 hover:h-2 rounded-full cursor-pointer relative transition-all"
          onClick={handleSeek}
        >
          <div 
            className="h-full bg-[#144BFF] rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-sm" />
          </div>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between text-white text-xs px-1">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="hover:text-[#144BFF] transition-colors">
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            {!compact && (
              <span className="font-mono text-[11px] opacity-80">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            )}
          </div>

          <button onClick={toggleMute} className="hover:text-[#144BFF] transition-colors">
            {isMuted ? <MuteIcon /> : <VolumeIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}