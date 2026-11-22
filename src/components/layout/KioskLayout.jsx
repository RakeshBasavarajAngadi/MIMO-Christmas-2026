import React from 'react';
import KioskHeader from '../common/Header/KioskHeader';
import KioskFooter from '../common/Footer/KioskFooter';

/**
 * KioskLayout Component
 * Wraps all screens inside the 1920x1080 touchscreen canvas
 */
const KioskLayout = ({ children, currentScreen, onScreenChange, hardwareStatus }) => {
  return (
    <div className="kiosk-viewport">
      <div className="kiosk-canvas">
        <KioskHeader
          currentScreen={currentScreen}
          onOpenMaintenance={() => onScreenChange('maintenance')}
          hardwareStatus={hardwareStatus}
        />

        <main className="kiosk-main-content">
          {children}
        </main>

        <KioskFooter
          currentScreen={currentScreen}
          onResetHome={() => onScreenChange('home')}
        />
      </div>
    </div>
  );
};

export default KioskLayout;
