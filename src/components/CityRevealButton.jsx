import React, { useState, useRef } from 'react';
import comicCity from '../assets/comic-city.png';
import confetti from 'canvas-confetti';
import { Howl } from 'howler';
import celebrationSound from '../assets/celebration.mp3';

const CityRevealButton = () => {
  const [revealed, setRevealed] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const confettiRef = useRef(null);

  const handleClick = () => {
    setRevealed(true);
  };

  const handleCelebrate = () => {
    if (celebrated) return;
    setCelebrated(true);
    // Confetti burst
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.7 }
    });
    // Play sound
    const sound = new Howl({ src: [celebrationSound] });
    sound.play();
    // Optionally, you can trigger more confetti or effects here
  };

  return (
    <div className="comic-container">
      {!revealed ? (
        <button className="comic-button" onClick={handleClick}>
          <img src={comicCity} alt="Ciudad estilo cómic" className="comic-preview" />
        </button>
      ) : (
        <div
          className="comic-reveal comic-reveal--fullscreen"
          onClick={() => setRevealed(false)}
        >
          <img src={comicCity} alt="Ciudad expandida" className="comic-full" />
          {/* Spider-web overlays */}
          <img src="/images/spiderweb-top-left.png" alt="web" style={{position:'fixed',top:0,left:0,width:'120px',zIndex:10,pointerEvents:'none'}} />
          <img src="/images/spiderweb-top-right.png" alt="web" style={{position:'fixed',top:0,right:0,width:'120px',zIndex:10,pointerEvents:'none'}} />
          <div
            className="overlay-text"
            onClick={e => e.stopPropagation()}
          >
            <h1>Estás entrando en mi ciudad favorita...</h1>
            <p>¿Te animás a quedarte?</p>
            <button className="ask-button" onClick={handleCelebrate}>
              ¿Quieres quedarte conmigo pato-lavida?
            </button>
            {celebrated && <div className="mt-4 text-2xl animate-bounce">¡Te quiero mucho! 🕸️🕷️</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CityRevealButton;
