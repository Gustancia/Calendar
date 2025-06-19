import React, { useEffect, useState } from "react";

const gifs = ["/images/earspin.gif", "/images/spin.gif"];

const RandomGifSlider = ({ show }) => {
  const [visible, setVisible] = useState(false);
  const [top, setTop] = useState(0);
  const [gif, setGif] = useState(gifs[0]);

  useEffect(() => {
    if (!show) {
      setVisible(false);
      return;
    }
    let timeout;
    let interval;
    const showGif = () => {
      setTop(Math.random() * 80); // Random vertical position (0-80vh)
      setGif(gifs[Math.floor(Math.random() * gifs.length)]); // Randomly pick a gif
      setVisible(true);
      timeout = setTimeout(() => setVisible(false), 2500); // Hide after 2.5s
    };

    // Function to schedule the next appearance
    const scheduleNext = () => {
      const nextDelay = 20000 + Math.random() * (120000 - 20000); // 20s to 120s
      interval = setTimeout(() => {
        showGif();
        scheduleNext();
      }, nextDelay);
    };

    scheduleNext();

    return () => {
      clearTimeout(interval);
      clearTimeout(timeout);
    };
  }, [show]);

  if (!show) return null;
  return visible ? (
    <img
      src={gif}
      alt="Random Spin"
      className="random-gif-slider"
      style={{ top: `${top}vh` }}
    />
  ) : null;
};

export default RandomGifSlider;