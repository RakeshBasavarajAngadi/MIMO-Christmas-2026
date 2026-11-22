import React from 'react';
import { HelpCircle, RefreshCw, Home } from 'lucide-react';
import { KIOSK_CONFIG, SCREENS } from '../../../utils/constants';

/**
 * KioskFooter Component
 * Touch-friendly bottom bar with help info and home reset button
 */
const KioskFooter = ({ currentScreen, onResetHome }) => {
  const isHomeScreen = currentScreen === SCREENS.HOME;

  return (
    <footer className="kiosk-footer">
      <div className="kiosk-help-text">
        <HelpCircle size={20} />
        <span>Need assistance? Staff desk nearby or call {KIOSK_CONFIG.SUPPORT_PHONE}</span>
      </div>

      <div className="kiosk-footer-actions">
        {!isHomeScreen && (
          <button
            className="kiosk-btn kiosk-btn-secondary"
            onClick={onResetHome}
            aria-label="Return to Home"
          >
            <Home size={20} />
            <span>Start Over</span>
          </button>
        )}
      </div>
    </footer>
  );
};

export default KioskFooter;
