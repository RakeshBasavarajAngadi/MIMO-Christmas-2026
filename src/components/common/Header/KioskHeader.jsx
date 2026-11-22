import React, { useState, useEffect } from 'react';
import { Sparkles, Printer, Wifi, ShieldAlert } from 'lucide-react';
import { KIOSK_CONFIG } from '../../../utils/constants';

/**
 * KioskHeader Component
 * Touchscreen top bar with branding, live clock, and system status
 */
const KioskHeader = ({ currentScreen, onOpenMaintenance, hardwareStatus }) => {
  const [currentTime, setCurrentTime] = useState('');

  const isOnline = hardwareStatus ? hardwareStatus.isOnline : true;
  const hasError = hardwareStatus ? (hardwareStatus.isPaperJam || hardwareStatus.isOutOfPaper) : false;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="kiosk-header">
      <div className="kiosk-brand">
        <div className="brand-icon-badge">
          <Sparkles size={28} />
        </div>
        <div className="brand-title">
          <span>{KIOSK_CONFIG.TITLE}</span>
          <span className="brand-subtitle">{KIOSK_CONFIG.SUBTITLE}</span>
        </div>
      </div>

      <div className="kiosk-status-widget">
        <div className="kiosk-clock">
          {currentTime || '12:00:00 PM'}
        </div>

        <div
          className="kiosk-status-badge"
          style={{
            borderColor: !isOnline || hasError ? 'rgba(143, 38, 56, 0.4)' : undefined,
            background: !isOnline || hasError ? 'rgba(143, 38, 56, 0.08)' : undefined,
            color: !isOnline || hasError ? '#8F2638' : undefined
          }}
        >
          <span
            className="status-dot"
            style={{
              backgroundColor: !isOnline || hasError ? '#8F2638' : undefined,
              boxShadow: !isOnline || hasError ? '0 0 8px rgba(143, 38, 56, 0.6)' : undefined
            }}
          />
          <span>{!isOnline ? 'OFFLINE' : hasError ? 'SERVICE' : 'ONLINE'}</span>
        </div>

        {/* Staff quick-access trigger (touch-friendly) */}
        <button
          className="kiosk-btn kiosk-btn-secondary kiosk-staff-btn"
          style={{ minHeight: '44px', padding: '0 16px', fontSize: '13px' }}
          onClick={onOpenMaintenance}
          title="Staff Access"
          aria-label="Staff Access"
        >
          <ShieldAlert size={16} />
          <span>Staff</span>
        </button>
      </div>
    </header>
  );
};

export default KioskHeader;
