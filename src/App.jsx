import React, { useRef, useState, useEffect } from 'react';
import Calendario from './components/Calendario'
import RandomGifSlider from './components/RandomGifSlider';

export default function App() {
  // Background music state and ref
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  // Calendar state for controlling gif visibility
  const [showGifSlider, setShowGifSlider] = useState(true);

  // Listen for calendar UI state
  const handleCalendarState = (state) => {
    setShowGifSlider(state === 'home');
  };

  // Play/pause handler
  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // Volume handler
  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) { audioRef.current.volume = v; }
  };

  // Ensure volume is synced
  useEffect(() => {
    if (audioRef.current) { audioRef.current.volume = volume; }
  }, [volume]);

  // Pause on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) { audioRef.current.pause(); }
    };
  }, []);

  return (
    <>
      {/* Background music audio element */}
      <audio
        ref={audioRef}
        src="/In Bloom.mp3"
        loop="true"
        preload="auto"
        style={{ display: 'none' }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      {/* Music controls floating button */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        <button
          onClick={toggleMusic}
          className="bg-[#e38873] text-white rounded-full px-4 py-2 shadow-lg hover:bg-[#cf6a56] focus:outline-none"
          aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolume}
          className="ml-2 align-middle"
          style={{ verticalAlign: 'middle', width: 80 }}
          aria-label="Volumen de la música"
        />
      </div>
      <RandomGifSlider show={showGifSlider} />
      <Calendario onPageChange={handleCalendarState} />
    </>
  );
}
