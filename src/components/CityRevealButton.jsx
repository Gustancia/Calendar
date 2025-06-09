import React, { useState } from 'react';
import comicCity from '../assets/comic-city.png'; // Ajustado a .png según tu estructura

const CityRevealButton = () => {
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    setRevealed(true);
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
          <div
            className="overlay-text"
            onClick={e => e.stopPropagation()}
          >
            <h1>Estás entrando en mi ciudad favorita...</h1>
            <p>¿Te animás a quedarte?</p>
            <button className="ask-button">¿Queres quedarte conmigo pato-lavida?</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CityRevealButton;
