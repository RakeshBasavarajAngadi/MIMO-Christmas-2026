import React, { useCallback } from 'react';
import { Sparkles, Image, Gift, Award } from 'lucide-react';
import { SCREENS, KIOSK_CONFIG } from '../../utils/constants';
import Snowfall from './components/Snowfall';
import ChristmasLights from './components/ChristmasLights';
import CornerEvergreens from './components/CornerEvergreens';
import FestiveTree from './components/FestiveTree';
import SlideToStart from './components/SlideToStart';
import './HomeScreen.css';

/**
 * Screen 1: Home Screen (Redesign)
 * MIMO Christmas 2026 – Self-Service Printing Kiosk
 * Theme: Luxury Warm Ivory & Champagne Gold (1920x1080 Landscape)
 */
const HomeScreen = ({ onNavigate }) => {
  // Navigate to Code Entry Screen upon slide or fallback tap completion
  const handleStart = useCallback(() => {
    onNavigate(SCREENS.CODE_ENTRY);
  }, [onNavigate]);

  return (
    <div className="home-screen-stage">
      {/* Background Atmosphere: Warm Bokeh Lighting Orbs */}
      <div className="bokeh-orb bokeh-orb-1" aria-hidden="true" />
      <div className="bokeh-orb bokeh-orb-2" aria-hidden="true" />
      <div className="bokeh-orb bokeh-orb-3" aria-hidden="true" />

      {/* Elegant Golden Snowflake Watermark Patterns */}
      <svg className="snowflake-watermark watermark-1" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path d="M50 0 V100 M0 50 H100 M15 15 L85 85 M15 85 L85 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 4" />
      </svg>
      <svg className="snowflake-watermark watermark-2" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path d="M50 5 V95 M5 50 H95 M20 20 L80 80 M20 80 L80 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="50,30 55,45 70,50 55,55 50,70 45,55 30,50 45,45" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>

      {/* Delicate Corner Evergreen Pine Branches with Golden Pinecones & Berries */}
      <CornerEvergreens />

      {/* Low Visual Density Gentle Snowfall & Gold Specks */}
      <Snowfall count={24} />

      {/* Warm Golden Fairy Lights Garland */}
      <ChristmasLights />

      {/* ===================================================================
          Balanced 2-Column Composition
          =================================================================== */}
      <div className="home-content-columns">
        {/* LEFT SECTION: Branding, Typography, Service Highlights & Slide to Start */}
        <div className="home-hero-column">
          {/* MIMO Branding & Logo Presentation */}
          <div className="mimo-brand-presentation">
            <div className="mimo-logo-mark" aria-hidden="true">
              <span className="mimo-logo-monogram">M</span>
            </div>
            {/* Small Badge: MIMO CHRISTMAS 2026 */}
            <div className="brand-hero-badge">
              <Sparkles size={16} className="badge-sparkle-icon" />
              <span className="badge-text-primary">MIMO CHRISTMAS 2026</span>
              <span className="badge-divider" aria-hidden="true" />
              <span className="badge-text-secondary">Official Kiosk</span>
            </div>
          </div>

          {/* Subheading: "Self-Service Printing Kiosk" */}
          <div className="kiosk-title-tag">
            <span className="kiosk-title-text">{KIOSK_CONFIG.SUBTITLE}</span>
            <span className="kiosk-title-line" aria-hidden="true" />
          </div>

          {/* Main Greeting: "Merry Christmas!" (Refined Serif Typography) */}
          <h1 className="home-greeting-heading">
            Merry Christmas!
          </h1>

          {/* Supporting Text */}
          <p className="home-supporting-text">
            Celebrate the season with <span className="home-supporting-highlight">effortless printing</span>.
            Create unforgettable holiday cards, festive photo keepsakes, and gift vouchers in seconds.
          </p>

          {/* Three Small Service Highlights */}
          <div className="home-feature-chips">
            <div className="feature-chip">
              <Image size={18} className="feature-chip-icon" />
              <span>Instant Photo Cards</span>
            </div>
            <div className="feature-chip">
              <Gift size={18} className="feature-chip-icon" />
              <span>Festive Gift Vouchers</span>
            </div>
            <div className="feature-chip">
              <Award size={18} className="feature-chip-icon" />
              <span>Studio Quality Printing</span>
            </div>
          </div>

          {/* Working Slide to Start Interactive Control */}
          <SlideToStart onComplete={handleStart} />
        </div>

        {/* RIGHT SECTION: Large Majestic Realistic Christmas Tree Centerpiece */}
        <div className="home-tree-column">
          <FestiveTree />
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
