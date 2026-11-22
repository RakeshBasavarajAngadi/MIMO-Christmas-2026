import React from 'react';

/**
 * ChristmasLights Component
 * Refined garland of warm glowing fairy lights in champagne gold, warm ivory,
 * and delicate amber halos, designed for the Luxury Ivory Christmas theme.
 */
const ChristmasLights = () => {
  // Warm luxury light colors: Champagne Gold, Warm Candlelight, Soft Ivory Amber
  const bulbColors = [
    { main: '#FFE699', glow: 'rgba(198, 154, 69, 0.65)' },
    { main: '#FFFDF8', glow: 'rgba(255, 245, 219, 0.75)' },
    { main: '#DFBE76', glow: 'rgba(223, 190, 118, 0.7)' },
    { main: '#F59E0B', glow: 'rgba(245, 158, 11, 0.55)' },
    { main: '#FFE28A', glow: 'rgba(255, 226, 138, 0.65)' }
  ];

  const lightCount = 22;

  return (
    <div className="christmas-lights-garland" aria-hidden="true">
      <svg className="lights-wire" viewBox="0 0 1920 50" preserveAspectRatio="none">
        <path
          d="M0,10 Q240,38 480,10 T960,10 T1440,10 T1920,10"
          fill="none"
          stroke="rgba(198, 154, 69, 0.25)"
          strokeWidth="1.2"
        />
      </svg>
      <div className="lights-bulbs-container">
        {Array.from({ length: lightCount }).map((_, index) => {
          const color = bulbColors[index % bulbColors.length];
          const delay = (index * 0.25) % 2.5;
          return (
            <div
              key={index}
              className="light-socket"
              style={{
                left: `${(index / (lightCount - 1)) * 96 + 2}%`,
                animationDelay: `${delay}s`
              }}
            >
              <div className="light-bulb-base" />
              <div
                className="light-bulb"
                style={{
                  backgroundColor: color.main,
                  boxShadow: `0 0 10px ${color.glow}, 0 0 22px ${color.glow}`,
                  animationDelay: `${delay}s`
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(ChristmasLights);
