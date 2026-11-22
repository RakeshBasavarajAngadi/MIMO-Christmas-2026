import React, { useState, useEffect } from 'react';
import { CheckCircle2, ArrowDown, Clock, Home, Check, FileText, Layers } from 'lucide-react';
import { SCREENS, KIOSK_CONFIG } from '../../utils/constants';
import ChristmasLights from '../HomeScreen/components/ChristmasLights';
import CornerEvergreens from '../HomeScreen/components/CornerEvergreens';
import Snowfall from '../HomeScreen/components/Snowfall';
import './SummaryScreen.css';

/**
 * Screen 4: Summary Screen
 * MIMO Christmas 2026 – Self-Service Printing Kiosk
 * Theme: Luxury Warm Ivory & Champagne Gold (1920x1080 Landscape)
 * Workflow: Generic REVA University Student Document Printing
 *
 * Features:
 * - Completed document page previews labelled Page 1, Page 2, Page 3, etc.
 * - Total pages counter, paper type, and output tray metrics
 * - Clear collect-documents instruction: "Your documents are ready! Please collect your printed pages."
 * - Done button and 10-second automatic return countdown to Home
 */
const SummaryScreen = ({
  printJob = {},
  onDone,
  onNavigate
}) => {
  const {
    customerName = 'Demo Student',
    documentTitle = 'Standard Document Printing',
    totalPages = 4,
    paperType = 'Standard A4 Document Paper (80 GSM)'
  } = printJob;

  const [countdown, setCountdown] = useState(KIOSK_CONFIG.SUMMARY_COUNTDOWN_SECONDS || 10);

  // Return to Home handler (clears state and returns to Home)
  const handleReturnHome = () => {
    if (onDone) {
      onDone();
    } else if (onNavigate) {
      onNavigate(SCREENS.HOME);
    }
  };

  // 10-Second Automatic Return Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleReturnHome();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="summary-screen-stage">
      {/* Background Ambience: Bokeh, Corner Evergreens, Snowfall, Fairy Lights */}
      <div className="summary-bokeh summary-bokeh-1" aria-hidden="true" />
      <div className="summary-bokeh summary-bokeh-2" aria-hidden="true" />
      <CornerEvergreens />
      <Snowfall count={20} />
      <ChristmasLights />

      {/* Main Central Summary Card Panel */}
      <div className="summary-panel">
        {/* Header & Success Badge */}
        <div className="summary-header">
          <div className="summary-success-badge">
            <CheckCircle2 size={15} color="#174C3A" />
            <span>Print Job Completed • Ready for Pickup</span>
          </div>
          <h2 className="summary-title">Your Documents Are Ready!</h2>
          <p className="summary-customer-line">
            Thank you, <strong>{customerName}</strong>! Your print job is complete and ready for pickup.
          </p>
        </div>

        {/* Completed Document Pages Preview Stack */}
        <div className="summary-cards-stack" aria-label="Printed document pages preview">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <div key={idx} className="completed-card-thumb doc-page-thumb">
              <div className="card-thumb-badge">
                <FileText size={13} className="card-thumb-icon" />
                <span className="card-thumb-page-num">Page {idx + 1}</span>
              </div>
              <div className="doc-page-lines-preview">
                <div className="doc-skeleton-title" />
                <div className="doc-skeleton-line" style={{ width: '90%' }} />
                <div className="doc-skeleton-line" style={{ width: '75%' }} />
                <div className="doc-skeleton-line" style={{ width: '82%' }} />
                <div className="doc-skeleton-line" style={{ width: '60%' }} />
              </div>
              <div className="card-thumb-footer">
                <span>Page {idx + 1} of {totalPages}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Job Metrics Details */}
        <div className="summary-metrics-row">
          <div className="summary-metric-card">
            <div className="metric-label">Total Pages Completed</div>
            <div className="metric-value">{totalPages} Pages</div>
          </div>
          <div className="summary-metric-card">
            <div className="metric-label">Paper Type</div>
            <div className="metric-value">{paperType || 'Standard A4 (80 GSM)'}</div>
          </div>
          <div className="summary-metric-card">
            <div className="metric-label">Output Tray</div>
            <div className="metric-value">Main Output Tray (Slot 1)</div>
          </div>
        </div>

        {/* Collection Tray Guidance Instruction (Illuminated) */}
        <div className="collection-instruction-box">
          <div className="collection-icon-badge" aria-hidden="true">
            <ArrowDown size={26} strokeWidth={2.8} />
          </div>
          <div className="collection-text-content">
            <div className="collection-heading">
              Your documents are ready! Please collect your printed pages.
            </div>
            <div className="collection-subtext">
              All {totalPages} pages have been dispensed. Remember to collect all your pages before leaving the kiosk.
            </div>
          </div>
        </div>

        {/* Actions: 10s Countdown & Done Button */}
        <div className="summary-actions-footer">
          <div className="summary-countdown-pill" aria-live="polite">
            <Clock size={16} color="#8F2638" />
            <span>
              Returning to Home in <strong className="countdown-timer-num">{countdown}s</strong>
            </span>
          </div>

          <button
            type="button"
            className="summary-done-btn"
            onClick={handleReturnHome}
            aria-label="Finish and return to Home Screen"
          >
            <span>Done</span>
            <Check size={20} strokeWidth={2.8} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryScreen;
