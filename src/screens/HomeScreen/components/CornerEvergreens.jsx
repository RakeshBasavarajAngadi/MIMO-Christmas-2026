import React from 'react';

/**
 * CornerEvergreens Component
 * Delicate realistic pine boughs with golden pinecones and burgundy winterberries.
 * Specifically engineered to hug the top ceiling trim without overlapping the MIMO brand logo or text.
 */
const CornerEvergreens = () => {
  return (
    <div className="corner-evergreens-wrapper" aria-hidden="true">
      {/* Top Left Corner Pine Branch - Horizontal Ceiling Trim Framing */}
      <svg
        className="corner-branch corner-branch-left"
        viewBox="0 0 260 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="needleGradLeft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1E5D47" />
            <stop offset="60%" stopColor="#174C3A" />
            <stop offset="100%" stopColor="#0F3629" />
          </linearGradient>
          <linearGradient id="goldConeLeft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DFBE76" />
            <stop offset="100%" stopColor="#9A7529" />
          </linearGradient>
        </defs>

        {/* Stem - hugging top border */}
        <path d="M-10 -5 Q80 18 160 16 Q200 15 240 10" stroke="#4A3423" strokeWidth="3" strokeLinecap="round" opacity="0.8" />

        {/* Pine needles clusters - staying strictly within 50px height */}
        <g stroke="url(#needleGradLeft)" strokeWidth="2" strokeLinecap="round">
          <path d="M30 8 L55 2 M30 8 L60 10 M30 8 L58 18 M30 8 L50 25" />
          <path d="M60 14 L90 5 M60 14 L98 12 M60 14 L94 22 M60 14 L85 30" />
          <path d="M95 16 L130 6 M95 16 L136 14 M95 16 L132 24 M95 16 L120 34" />
          <path d="M135 16 L170 8 M135 16 L178 15 M135 16 L172 25 M135 16 L160 32" />
          <path d="M175 14 L208 8 M175 14 L215 15 M175 14 L210 24 M175 14 L198 30" />
          <path d="M210 12 L242 7 M210 12 L248 14 M210 12 L240 22" />
          {/* Subtle sprigs */}
          <path d="M20 20 L40 38 M20 20 L32 44" stroke="#174C3A" />
          <path d="M75 22 L95 38 M75 22 L88 44" stroke="#1E5D47" />
        </g>

        {/* Burgundy Winterberries */}
        <g fill="#8F2638" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))">
          <circle cx="80" cy="24" r="4" />
          <circle cx="87" cy="27" r="3.5" />
          <circle cx="83" cy="33" r="3.8" />
          <circle cx="145" cy="23" r="4" />
          <circle cx="152" cy="26" r="3.5" />
        </g>
        <g fill="#FFFDF8" opacity="0.6">
          <circle cx="78.5" cy="22.5" r="1.2" />
          <circle cx="143.5" cy="21.5" r="1.2" />
        </g>

        {/* Small Golden Pinecone tucked cleanly at the top */}
        <g transform="translate(110, 18) rotate(-15)">
          <ellipse cx="8" cy="12" rx="6" ry="9" fill="url(#goldConeLeft)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
          <path d="M4 8 Q8 11 12 8 M3 12 Q8 15 13 12 M4 16 Q8 19 12 16" stroke="#6D5116" strokeWidth="1" fill="none" />
        </g>
      </svg>

      {/* Top Right Corner Pine Branch */}
      <svg
        className="corner-branch corner-branch-right"
        viewBox="0 0 260 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(260, 0) scale(-1, 1)">
          <path d="M-10 -5 Q80 22 160 22 Q200 20 240 15" stroke="#4A3423" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
          <g stroke="url(#needleGradLeft)" strokeWidth="2" strokeLinecap="round">
            <path d="M30 8 L55 2 M30 8 L60 10 M30 8 L58 18 M30 8 L50 25" />
            <path d="M60 14 L90 5 M60 14 L98 12 M60 14 L94 22 M60 14 L85 32" />
            <path d="M95 18 L130 8 M95 18 L136 16 M95 18 L132 26 M95 18 L120 38" />
            <path d="M135 18 L170 10 M135 18 L178 18 M135 18 L172 28 M135 18 L160 36" />
            <path d="M175 16 L208 10 M175 16 L215 18 M175 16 L210 26" />
            <path d="M210 14 L245 10 M210 14 L250 18" />
          </g>

          <g fill="#8F2638" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.15))">
            <circle cx="85" cy="24" r="4" />
            <circle cx="92" cy="28" r="3.5" />
            <circle cx="150" cy="24" r="4" />
            <circle cx="157" cy="28" r="3.5" />
          </g>

          <g transform="translate(115, 18) rotate(-15)">
            <ellipse cx="8" cy="12" rx="6" ry="9" fill="url(#goldConeLeft)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))" />
            <path d="M4 8 Q8 11 12 8 M3 12 Q8 15 13 12 M4 16 Q8 19 12 16" stroke="#6D5116" strokeWidth="1" fill="none" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default React.memo(CornerEvergreens);
