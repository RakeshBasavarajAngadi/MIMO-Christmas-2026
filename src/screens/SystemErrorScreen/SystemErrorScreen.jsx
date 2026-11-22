import React, { useState } from 'react';
import { AlertTriangle, RefreshCw, Home, PhoneCall, Wrench, CheckCircle } from 'lucide-react';
import { SCREENS, KIOSK_CONFIG } from '../../utils/constants';
import ChristmasLights from '../HomeScreen/components/ChristmasLights';
import CornerEvergreens from '../HomeScreen/components/CornerEvergreens';
import './SystemErrorScreen.css';

/**
 * Screen 5: System Error Screen
 * MIMO Christmas 2026 – Self-Service Printing Kiosk
 * Theme: Luxury Warm Ivory & Christmas Burgundy (1920x1080 Landscape)
 * Workflow: Generic REVA University Student Document Printing
 *
 * Features:
 * - Realistic printing failure notification (e.g. Paper Feed Jam)
 * - Working Retry button that restarts the simulated printing workflow
 * - Return to Home and Staff Maintenance access
 */
const SystemErrorScreen = ({
  printJob = {},
  onRetry,
  onNavigate
}) => {
  const {
    customerName = 'Demo Student',
    code = '9999',
    currentPage = 2,
    totalPages = 4,
    errorMessage = 'Paper Feed Jam Detected in Primary Feeder Tray'
  } = printJob;

  const [staffAlertSent, setStaffAlertSent] = useState(false);

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else if (onNavigate) {
      onNavigate(SCREENS.PRINTING);
    }
  };

  const handleCallStaff = () => {
    setStaffAlertSent(true);
  };

  return (
    <div className="error-screen-stage">
      {/* Background Ambience */}
      <div className="error-bokeh error-bokeh-1" aria-hidden="true" />
      <div className="error-bokeh error-bokeh-2" aria-hidden="true" />
      <CornerEvergreens />
      <ChristmasLights />

      {/* Central Error Card Panel */}
      <div className="error-panel">
        <div className="error-icon-badge" aria-hidden="true">
          <AlertTriangle size={38} strokeWidth={2.4} />
        </div>

        <h2 className="error-title">Printing Interrupted</h2>
        <p className="error-description">
          The document printing engine paused due to a paper feed exception. Your student print job data is safe in memory.
        </p>

        {/* Diagnostic Metadata Box */}
        <div className="error-diagnostics-box">
          <div className="diagnostic-item">
            <span className="diagnostic-label">Error Code:</span>
            <span className="diagnostic-val" style={{ color: '#8F2638' }}>ERR-JAM-FEEDER (Tray 1 Feed Sensor)</span>
          </div>
          <div className="diagnostic-item">
            <span className="diagnostic-label">Active Job:</span>
            <span className="diagnostic-val">Job #{code} ({customerName} - Standard Document Printing)</span>
          </div>
          <div className="diagnostic-item">
            <span className="diagnostic-label">Paused Position:</span>
            <span className="diagnostic-val">Page {currentPage} of {totalPages}</span>
          </div>
          <div className="diagnostic-item">
            <span className="diagnostic-label">Crew Notification:</span>
            <span className="diagnostic-val" style={{ color: staffAlertSent ? '#174C3A' : '#C69A45' }}>
              {staffAlertSent ? '✓ Staff Dispatch Notified' : 'Automated Ticket Dispatched'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="error-actions-group">
          {/* Working Retry Button: Restarts the simulated printing workflow */}
          <button
            type="button"
            className="retry-job-btn"
            onClick={handleRetry}
            aria-label="Retry print job and resume printing"
          >
            <RefreshCw size={18} strokeWidth={2.5} />
            <span>Retry Print Job</span>
          </button>

          {/* Cancel & Return Home Button */}
          <button
            type="button"
            className="cancel-home-btn"
            onClick={() => onNavigate(SCREENS.HOME)}
            aria-label="Cancel and return to Home Screen"
          >
            <Home size={18} />
            <span>Return Home</span>
          </button>
        </div>

        {/* Staff Assistance and Diagnostic Access */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '14px', alignItems: 'center' }}>
          <button
            type="button"
            className="call-attendant-link"
            onClick={handleCallStaff}
          >
            <PhoneCall size={14} />
            <span>{staffAlertSent ? 'Staff Alerted!' : `Call Floor Staff (${KIOSK_CONFIG.SUPPORT_PHONE})`}</span>
          </button>

          <span style={{ color: '#C69A45' }}>•</span>

          <button
            type="button"
            className="call-attendant-link"
            onClick={() => onNavigate(SCREENS.MAINTENANCE)}
          >
            <Wrench size={14} />
            <span>Open Technician Panel</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SystemErrorScreen;
