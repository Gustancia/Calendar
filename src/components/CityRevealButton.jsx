import React, { useState, useRef } from 'react';
import comicCity from '../assets/comic-city.png';
import confetti from 'canvas-confetti';
import { Howl } from 'howler';
import celebrationSound from '../assets/celebration.mp3';

const CityRevealButton = () => {
  const [revealed, setRevealed] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const confettiRef = useRef(null);

  const handleClick = () => {
    setRevealed(true);
    setShowGif(false);
    setTimeout(() => setShowGif(true), 100); // Show GIF after 0,2s
    setTimeout(() => setShowGif(false), 3550); // Hide GIF after 2,8s (adjust if your GIF is longer)
  };

  const handleCelebrate = () => {
    if (celebrated) return;
    setCelebrated(true);
    // Confetti burst
    setTimeout(() => {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.7 },
        zIndex: 9999 // Ensure confetti is above all layers
      });
    }, 0);
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
          {showGif && (
            <img src="/images/sin fondo.gif" alt="web" style={{position:'fixed',top:0,right:0,width:'1000px',zIndex:10,pointerEvents:'none'}} />
          )}
          <div
            className="overlay-text"
            onClick={e => e.stopPropagation()}
          >
            <h1>Ahora… yo sé que recuerdas mi propuesta. Y seguramente estés leyendo esto con mucha anticipación, preguntándote:</h1>
            <p>¿Cuándo me lo va a preguntar? ¿Por qué me está haciendo esperar tanto?</p>
            <p>Bueno… henos aquí.</p>
            <p>Sabiendo vos lo mucho que te amo, y lo feliz que soy de haberte conocido, llegó el momento de hacer la pregunta.</p>
            <p>¿Qué quisieras vos?</p>
            <p>¿Aliarte conmigo? ¿Ligarte a mí? ¿Y quizás, en un futuro, volver a hacernos esta misma pregunta… pero con otros títulos?</p>
            <p>¿Te gustaría hacer mutua esta pregunta y darme el gran honor de decirme que sí?</p>
            <p>¿Te gustaría ser mi media naranja, mi alma gemela o, como se dice comúnmente…</p>
            <button className="ask-button" onClick={handleCelebrate}>
              ¿me confirmas querer ser mi novio?
            </button>
            {celebrated && <div className="mt-4 text-2xl animate-bounce">¡Ya sé tu respuesta amor!, pero mereces el cielo y que te lo pregunte bien bonito... te amo</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CityRevealButton;
