import React from 'react';

/**
 * FestiveTree Component
 * A large, realistic, and majestic Christmas tree centerpiece
 * with lush evergreen boughs, champagne gold and burgundy glass baubles,
 * warm glowing fairy lights, dimensional golden ribbon garlands,
 * an 8-point golden star topper, and luxury holiday presents.
 *
 * Optimized with precise viewBox coordinates so that the entire tree,
 * all 5 tiers, the star, and all wrapped presents are 100% visible
 * without clipping at any resolution or viewport size.
 */
const FestiveTree = () => {
  return (
    <div className="festive-tree-wrapper" aria-hidden="true">
      {/* Warm Ambient Radial Glow behind the tree */}
      <div className="tree-ambient-glow" />

      <svg
        className="festive-tree-svg"
        viewBox="50 80 520 710"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Tree Tier Evergreen Gradients */}
          <linearGradient id="treeTier1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#236B52" />
            <stop offset="60%" stopColor="#174C3A" />
            <stop offset="100%" stopColor="#0F3629" />
          </linearGradient>

          <linearGradient id="treeTier2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E5D47" />
            <stop offset="65%" stopColor="#154535" />
            <stop offset="100%" stopColor="#0D2E23" />
          </linearGradient>

          <linearGradient id="treeTier3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1B5541" />
            <stop offset="70%" stopColor="#123E2F" />
            <stop offset="100%" stopColor="#0B271E" />
          </linearGradient>

          <linearGradient id="treeTier4" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#184D3B" />
            <stop offset="75%" stopColor="#103729" />
            <stop offset="100%" stopColor="#081F17" />
          </linearGradient>

          <linearGradient id="treeTier5" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#154535" />
            <stop offset="80%" stopColor="#0E3024" />
            <stop offset="100%" stopColor="#061812" />
          </linearGradient>

          {/* Champagne Gold Ribbon Garland Gradient */}
          <linearGradient id="goldRibbonFlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C69A45" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#F3E2B8" stopOpacity="0.95" />
            <stop offset="60%" stopColor="#DFBE76" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#9A7529" stopOpacity="0.4" />
          </linearGradient>

          {/* Star Gradients */}
          <linearGradient id="starFacetedLight" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="40%" stopColor="#F3E2B8" />
            <stop offset="100%" stopColor="#C69A45" />
          </linearGradient>

          <linearGradient id="starFacetedDark" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#DFBE76" />
            <stop offset="70%" stopColor="#9A7529" />
            <stop offset="100%" stopColor="#6D5116" />
          </linearGradient>

          {/* Bauble Gradients */}
          <radialGradient id="goldBauble" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="25%" stopColor="#F3E2B8" />
            <stop offset="60%" stopColor="#C69A45" />
            <stop offset="100%" stopColor="#876420" />
          </radialGradient>

          <radialGradient id="burgundyBauble" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFC2CC" />
            <stop offset="25%" stopColor="#B2354C" />
            <stop offset="65%" stopColor="#8F2638" />
            <stop offset="100%" stopColor="#520D1A" />
          </radialGradient>

          {/* Gift Box Gradients */}
          <linearGradient id="burgundyBox" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#B2354C" />
            <stop offset="50%" stopColor="#8F2638" />
            <stop offset="100%" stopColor="#5D1220" />
          </linearGradient>

          <linearGradient id="ivoryBox" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFDF8" />
            <stop offset="70%" stopColor="#F4ECE0" />
            <stop offset="100%" stopColor="#E2D4C0" />
          </linearGradient>

          <linearGradient id="goldFoilBox" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F3E2B8" />
            <stop offset="50%" stopColor="#C69A45" />
            <stop offset="100%" stopColor="#876420" />
          </linearGradient>

          {/* Specular Glow Filters */}
          <filter id="fairyGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="starGlowHalo" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="16" result="bigBlur" />
            <feGaussianBlur stdDeviation="6" result="midBlur" />
            <feMerge>
              <feMergeNode in="bigBlur" />
              <feMergeNode in="midBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Tree Trunk Base */}
        <rect x="290" y="690" width="40" height="55" rx="5" fill="#3E2718" />
        <rect x="298" y="690" width="8" height="55" fill="#583723" opacity="0.6" />

        {/* Snowy Skirt Under Tree */}
        <ellipse cx="310" cy="740" rx="230" ry="24" fill="url(#ivoryBox)" opacity="0.9" filter="drop-shadow(0 10px 20px rgba(41,37,33,0.12))" />
        <ellipse cx="310" cy="738" rx="200" ry="18" fill="#FFFDF8" />

        {/* ========================================================
            TREE BOUGHS & BRANCHES (5 LUSH TIERS)
            ======================================================== */}

        {/* Tier 5 - Broad Bottom Boughs */}
        <g filter="drop-shadow(0 8px 16px rgba(15, 54, 41, 0.25))">
          <path
            d="M80 690 C100 640, 150 630, 200 610 C210 610, 240 600, 260 595 L360 595 C380 600, 410 610, 420 610 C470 630, 520 640, 540 690 C490 710, 420 720, 310 720 C200 720, 130 710, 80 690 Z"
            fill="url(#treeTier5)"
          />
          {/* Foliage tips */}
          <path d="M110 682 Q125 692 140 684 Q160 696 185 686 Q215 698 250 688 Q285 700 310 688 Q335 700 370 688 Q405 698 435 686 Q460 696 480 684 Q495 692 510 682" stroke="#236B52" strokeWidth="2.5" fill="none" />
          <path d="M130 680 Q220 705 310 705 Q400 705 490 680" stroke="rgba(255, 253, 248, 0.45)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* Tier 4 */}
        <g filter="drop-shadow(0 7px 14px rgba(15, 54, 41, 0.22))">
          <path
            d="M120 600 C140 550, 190 535, 230 515 L390 515 C430 535, 480 550, 500 600 C450 618, 380 625, 310 625 C240 625, 170 618, 120 600 Z"
            fill="url(#treeTier4)"
          />
          <path d="M145 592 Q165 604 195 594 Q230 606 270 596 Q310 608 350 596 Q390 606 425 594 Q455 604 475 592" stroke="#246B52" strokeWidth="2.5" fill="none" />
          <path d="M165 590 Q238 612 310 612 Q382 612 455 590" stroke="rgba(255, 253, 248, 0.5)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* Tier 3 */}
        <g filter="drop-shadow(0 6px 12px rgba(15, 54, 41, 0.2))">
          <path
            d="M160 510 C180 460, 220 445, 255 425 L365 425 C400 445, 440 460, 460 510 C415 528, 365 535, 310 535 C255 535, 205 528, 160 510 Z"
            fill="url(#treeTier3)"
          />
          <path d="M185 502 Q215 514 250 504 Q280 516 310 505 Q340 516 370 504 Q405 514 435 502" stroke="#2E8567" strokeWidth="2.5" fill="none" />
          <path d="M195 500 Q252 522 310 522 Q368 522 425 500" stroke="rgba(255, 253, 248, 0.55)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>

        {/* Tier 2 */}
        <g filter="drop-shadow(0 5px 10px rgba(15, 54, 41, 0.18))">
          <path
            d="M195 415 C215 365, 250 350, 275 325 L345 325 C370 350, 405 365, 425 415 C390 432, 350 438, 310 438 C270 438, 230 432, 195 415 Z"
            fill="url(#treeTier2)"
          />
          <path d="M215 408 Q245 420 280 410 Q310 422 340 410 Q375 420 405 408" stroke="#339977" strokeWidth="2.5" fill="none" />
          <path d="M225 405 Q268 424 310 424 Q352 424 395 405" stroke="rgba(255, 253, 248, 0.6)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>

        {/* Tier 1 - Top Canopy */}
        <g filter="drop-shadow(0 4px 8px rgba(15, 54, 41, 0.15))">
          <path
            d="M235 315 C250 260, 275 230, 310 180 C345 230, 370 260, 385 315 C360 330, 335 336, 310 336 C285 336, 260 330, 235 315 Z"
            fill="url(#treeTier1)"
          />
          <path d="M255 310 Q285 320 310 312 Q335 320 365 310" stroke="#3FB38C" strokeWidth="2" fill="none" />
          <path d="M255 306 Q282 322 310 322 Q338 322 365 306" stroke="rgba(255, 253, 248, 0.65)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>

        {/* ========================================================
            CHAMPAGNE GOLD RIBBON GARLANDS (DIAGONAL FLOW)
            ======================================================== */}
        <path
          d="M260 260 Q310 290 355 275"
          stroke="url(#goldRibbonFlow)"
          strokeWidth="4"
          strokeLinecap="round"
          filter="drop-shadow(0 2px 5px rgba(198, 154, 69, 0.35))"
        />
        <path
          d="M220 365 Q310 405 395 375"
          stroke="url(#goldRibbonFlow)"
          strokeWidth="5"
          strokeLinecap="round"
          filter="drop-shadow(0 2px 6px rgba(198, 154, 69, 0.35))"
        />
        <path
          d="M175 465 Q310 520 440 475"
          stroke="url(#goldRibbonFlow)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="drop-shadow(0 3px 8px rgba(198, 154, 69, 0.4))"
        />
        <path
          d="M135 565 Q310 635 480 580"
          stroke="url(#goldRibbonFlow)"
          strokeWidth="7"
          strokeLinecap="round"
          filter="drop-shadow(0 3px 10px rgba(198, 154, 69, 0.45))"
        />

        {/* ========================================================
            CHAMPAGNE GOLD & CHRISTMAS BURGUNDY GLASS BAUBLES
            ======================================================== */}

        {/* Tier 1 Baubles */}
        <circle cx="310" cy="240" r="8.5" fill="url(#burgundyBauble)" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.25))" />
        <circle cx="280" cy="295" r="9" fill="url(#goldBauble)" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.25))" />
        <circle cx="340" cy="300" r="8.5" fill="url(#burgundyBauble)" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.25))" />

        {/* Tier 2 Baubles */}
        <circle cx="245" cy="385" r="10.5" fill="url(#goldBauble)" filter="drop-shadow(0 3px 7px rgba(0,0,0,0.28))" />
        <circle cx="310" cy="370" r="11" fill="url(#burgundyBauble)" filter="drop-shadow(0 3px 7px rgba(0,0,0,0.28))" />
        <circle cx="370" cy="385" r="10" fill="url(#goldBauble)" filter="drop-shadow(0 3px 7px rgba(0,0,0,0.28))" />
        <circle cx="280" cy="415" r="9.5" fill="url(#burgundyBauble)" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.25))" />
        <circle cx="345" cy="415" r="9.5" fill="url(#goldBauble)" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.25))" />

        {/* Tier 3 Baubles */}
        <circle cx="205" cy="480" r="12" fill="url(#burgundyBauble)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))" />
        <circle cx="265" cy="470" r="12.5" fill="url(#goldBauble)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))" />
        <circle cx="330" cy="485" r="11.5" fill="url(#burgundyBauble)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))" />
        <circle cx="410" cy="480" r="12" fill="url(#goldBauble)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))" />
        <circle cx="235" cy="510" r="10.5" fill="url(#goldBauble)" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.25))" />
        <circle cx="375" cy="510" r="11" fill="url(#burgundyBauble)" filter="drop-shadow(0 3px 6px rgba(0,0,0,0.25))" />

        {/* Tier 4 Baubles */}
        <circle cx="165" cy="575" r="13" fill="url(#goldBauble)" filter="drop-shadow(0 4px 9px rgba(0,0,0,0.32))" />
        <circle cx="230" cy="570" r="13.5" fill="url(#burgundyBauble)" filter="drop-shadow(0 4px 9px rgba(0,0,0,0.32))" />
        <circle cx="305" cy="575" r="14" fill="url(#goldBauble)" filter="drop-shadow(0 4px 9px rgba(0,0,0,0.32))" />
        <circle cx="385" cy="565" r="13" fill="url(#burgundyBauble)" filter="drop-shadow(0 4px 9px rgba(0,0,0,0.32))" />
        <circle cx="455" cy="575" r="13.5" fill="url(#goldBauble)" filter="drop-shadow(0 4px 9px rgba(0,0,0,0.32))" />
        <circle cx="195" cy="610" r="11.5" fill="url(#burgundyBauble)" filter="drop-shadow(0 3px 7px rgba(0,0,0,0.28))" />
        <circle cx="420" cy="610" r="12" fill="url(#burgundyBauble)" filter="drop-shadow(0 3px 7px rgba(0,0,0,0.28))" />

        {/* Tier 5 Baubles */}
        <circle cx="125" cy="670" r="14" fill="url(#burgundyBauble)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
        <circle cx="190" cy="665" r="14.5" fill="url(#goldBauble)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
        <circle cx="265" cy="670" r="15" fill="url(#burgundyBauble)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
        <circle cx="355" cy="665" r="15" fill="url(#goldBauble)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
        <circle cx="430" cy="670" r="14" fill="url(#burgundyBauble)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />
        <circle cx="495" cy="670" r="14.5" fill="url(#goldBauble)" filter="drop-shadow(0 4px 10px rgba(0,0,0,0.35))" />

        {/* Delicate Golden Finial Ornaments */}
        <path d="M310 328 L314 340 L310 352 L306 340 Z" fill="#C69A45" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
        <path d="M260 422 L264 434 L260 446 L256 434 Z" fill="#C69A45" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />
        <path d="M360 422 L364 434 L360 446 L356 434 Z" fill="#C69A45" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.2))" />

        {/* ========================================================
            WARM TWINKLING FAIRY LIGHTS
            ======================================================== */}
        <g filter="url(#fairyGlow)">
          <circle cx="295" cy="225" r="3.5" fill="#FFFDF8" />
          <circle cx="325" cy="235" r="3" fill="#FFEAA7" />
          <circle cx="265" cy="280" r="3.5" fill="#FFE699" />
          <circle cx="345" cy="285" r="3.5" fill="#FFFDF8" />
          <circle cx="225" cy="360" r="4" fill="#FFEAA7" />
          <circle cx="285" cy="355" r="4" fill="#FFFDF8" />
          <circle cx="335" cy="360" r="3.5" fill="#FFE699" />
          <circle cx="395" cy="365" r="4" fill="#FFEAA7" />
          <circle cx="185" cy="455" r="4.5" fill="#FFFDF8" />
          <circle cx="245" cy="445" r="4" fill="#FFEAA7" />
          <circle cx="310" cy="455" r="4.5" fill="#FFE699" />
          <circle cx="375" cy="450" r="4" fill="#FFFDF8" />
          <circle cx="435" cy="460" r="4.5" fill="#FFEAA7" />
          <circle cx="145" cy="550" r="4.5" fill="#FFEAA7" />
          <circle cx="215" cy="540" r="4.5" fill="#FFFDF8" />
          <circle cx="280" cy="545" r="5" fill="#FFE699" />
          <circle cx="340" cy="545" r="4.5" fill="#FFFDF8" />
          <circle cx="410" cy="540" r="5" fill="#FFEAA7" />
          <circle cx="475" cy="555" r="4.5" fill="#FFFDF8" />
          <circle cx="105" cy="650" r="5" fill="#FFE699" />
          <circle cx="165" cy="640" r="5" fill="#FFFDF8" />
          <circle cx="240" cy="645" r="5" fill="#FFEAA7" />
          <circle cx="315" cy="645" r="5" fill="#FFFDF8" />
          <circle cx="390" cy="640" r="5" fill="#FFE699" />
          <circle cx="460" cy="645" r="5" fill="#FFFDF8" />
          <circle cx="515" cy="650" r="5" fill="#FFEAA7" />
        </g>

        {/* ========================================================
            8-POINT CHAMPAGNE GOLD STAR TREE TOPPER
            ======================================================== */}
        <g transform="translate(310, 160)" className="tree-star-master" filter="url(#starGlowHalo)">
          {/* Radiant Halo Backing */}
          <circle cx="0" cy="0" r="32" fill="rgba(223, 190, 118, 0.35)" />
          <circle cx="0" cy="0" r="18" fill="rgba(255, 253, 248, 0.7)" />

          {/* Faceted 8-Point Star Rays */}
          {/* Main 4 Points */}
          <polygon points="0,-38 7,-9 0,0" fill="url(#starFacetedLight)" />
          <polygon points="0,-38 -7,-9 0,0" fill="url(#starFacetedDark)" />

          <polygon points="38,0 9,7 0,0" fill="url(#starFacetedLight)" />
          <polygon points="38,0 9,-7 0,0" fill="url(#starFacetedDark)" />

          <polygon points="0,38 -7,9 0,0" fill="url(#starFacetedLight)" />
          <polygon points="0,38 7,9 0,0" fill="url(#starFacetedDark)" />

          <polygon points="-38,0 -9,-7 0,0" fill="url(#starFacetedLight)" />
          <polygon points="-38,0 -9,7 0,0" fill="url(#starFacetedDark)" />

          {/* Diagonal 4 Points */}
          <polygon points="22,-22 9,-2 0,0" fill="url(#starFacetedLight)" />
          <polygon points="22,-22 2,-9 0,0" fill="url(#starFacetedDark)" />

          <polygon points="22,22 2,9 0,0" fill="url(#starFacetedLight)" />
          <polygon points="22,22 9,2 0,0" fill="url(#starFacetedDark)" />

          <polygon points="-22,22 -9,2 0,0" fill="url(#starFacetedLight)" />
          <polygon points="-22,22 -2,9 0,0" fill="url(#starFacetedDark)" />

          <polygon points="-22,-22 -2,-9 0,0" fill="url(#starFacetedLight)" />
          <polygon points="-22,-22 -9,-2 0,0" fill="url(#starFacetedDark)" />

          {/* Central Star Jewel */}
          <circle cx="0" cy="0" r="4.5" fill="#FFFDF8" filter="drop-shadow(0 0 4px #FFFFFF)" />
        </g>

        {/* ========================================================
            LUXURY WRAPPED CHRISTMAS PRESENTS UNDER TREE
            ======================================================== */}

        {/* 1. Large Burgundy Gift Box with Champagne Gold Satin Ribbon (Center-Left) */}
        <g transform="translate(160, 685)" filter="drop-shadow(0 12px 24px rgba(41,37,33,0.18))">
          <rect x="0" y="0" width="85" height="75" rx="6" fill="url(#burgundyBox)" />
          {/* Gold Satin Ribbons */}
          <rect x="36" y="0" width="13" height="75" fill="url(#goldFoilBox)" />
          <rect x="0" y="31" width="85" height="13" fill="url(#goldFoilBox)" />
          {/* Dimensional Bow */}
          <ellipse cx="36" cy="-2" rx="14" ry="9" fill="url(#goldFoilBox)" transform="rotate(-20 36 -2)" />
          <ellipse cx="49" cy="-2" rx="14" ry="9" fill="url(#goldFoilBox)" transform="rotate(20 49 -2)" />
          <circle cx="42.5" cy="0" r="6" fill="#F3E2B8" />
        </g>

        {/* 2. Warm Ivory Gift Box with Deep Evergreen Ribbon (Right) */}
        <g transform="translate(365, 680)" filter="drop-shadow(0 12px 24px rgba(41,37,33,0.18))">
          <rect x="0" y="0" width="95" height="80" rx="7" fill="url(#ivoryBox)" stroke="rgba(198,154,69,0.3)" strokeWidth="1" />
          {/* Evergreen Velvet Ribbon */}
          <rect x="41" y="0" width="13" height="80" fill="#174C3A" />
          <rect x="0" y="33" width="95" height="13" fill="#174C3A" />
          {/* Bow */}
          <ellipse cx="41" cy="-2" rx="15" ry="9" fill="#174C3A" transform="rotate(-22 41 -2)" />
          <ellipse cx="54" cy="-2" rx="15" ry="9" fill="#174C3A" transform="rotate(22 54 -2)" />
          <circle cx="47.5" cy="0" r="6.5" fill="#246B52" />
        </g>

        {/* 3. Champagne Gold Foil Gift Box with Burgundy Bow (Center-Front) */}
        <g transform="translate(260, 710)" filter="drop-shadow(0 14px 28px rgba(41,37,33,0.22))">
          <rect x="0" y="0" width="90" height="65" rx="6" fill="url(#goldFoilBox)" />
          {/* Burgundy Ribbon */}
          <rect x="38" y="0" width="14" height="65" fill="url(#burgundyBox)" />
          <rect x="0" y="25" width="90" height="14" fill="url(#burgundyBox)" />
          {/* Bow */}
          <ellipse cx="38" cy="-3" rx="14" ry="9" fill="url(#burgundyBox)" transform="rotate(-20 38 -3)" />
          <ellipse cx="52" cy="-3" rx="14" ry="9" fill="url(#burgundyBox)" transform="rotate(20 52 -3)" />
          <circle cx="45" cy="-1" r="6" fill="#B2354C" />
        </g>

        {/* 4. Small Delicate Burgundy Keepsake Box (Left-Front) */}
        <g transform="translate(130, 725)" filter="drop-shadow(0 8px 16px rgba(41,37,33,0.15))">
          <rect x="0" y="0" width="55" height="45" rx="5" fill="url(#burgundyBox)" />
          <rect x="23" y="0" width="9" height="45" fill="url(#goldFoilBox)" />
          <rect x="0" y="18" width="55" height="9" fill="url(#goldFoilBox)" />
          <circle cx="27.5" cy="0" r="5" fill="#F3E2B8" />
        </g>
      </svg>
    </div>
  );
};

export default React.memo(FestiveTree);
