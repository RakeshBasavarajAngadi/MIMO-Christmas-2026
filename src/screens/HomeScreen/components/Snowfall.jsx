import React, { useMemo } from 'react';

/**
 * Snowfall Component
 * Low visual density, peaceful drifting snowflakes and floating golden particles
 * for the Luxury Ivory & Champagne Gold theme
 */
const Snowfall = ({ count = 24 }) => {
  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, index) => {
      const isGold = index % 3 === 0; // 1 in 3 are delicate gold specks
      const size = isGold ? Math.random() * 3 + 2 : Math.random() * 4 + 3; // 2px to 7px
      const left = Math.random() * 98 + 1; // 1% to 99%
      const duration = Math.random() * 7 + 8; // 8s to 15s (very calm and slow)
      const delay = Math.random() * 8; // 0s to 8s
      const opacity = isGold ? Math.random() * 0.45 + 0.35 : Math.random() * 0.4 + 0.3;
      const drift = (Math.random() - 0.5) * 60; // -30px to +30px

      return {
        id: index,
        isGold,
        size,
        left,
        duration,
        delay,
        opacity,
        drift
      };
    });
  }, [count]);

  return (
    <div className="snowfall-container" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`snowflake ${p.isGold ? 'gold-speck' : 'snow-flake'}`}
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--drift': `${p.drift}px`
          }}
        />
      ))}
    </div>
  );
};

export default React.memo(Snowfall);
