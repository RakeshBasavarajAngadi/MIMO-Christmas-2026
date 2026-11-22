import React, { useState, useEffect, useRef } from 'react';
import { Printer, Sparkles, FileText, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';
import { SCREENS } from '../../utils/constants';
import ChristmasLights from '../HomeScreen/components/ChristmasLights';
import CornerEvergreens from '../HomeScreen/components/CornerEvergreens';
import Snowfall from '../HomeScreen/components/Snowfall';
import './PrintingScreen.css';

/**
 * Screen 3: Printing Screen
 * MIMO Christmas 2026 – Self-Service Printing Kiosk
 * Theme: Luxury Warm Ivory & Champagne Gold (1920x1080 Landscape)
 * Workflow: REVA University Student Document Printing
 *
 * Features:
 * - Generic Student & Standard Document Printing details
 * - Automated progressive simulation (0% to 100%)
 * - Page 1, Page 2, Page 3, Page 4 page queue & current page indicator
 * - Dynamic page counter: "Printing Page X of Y"
 * - Automatic transition to Summary Screen on completion
 * - Realistic error simulation trigger
 */
const PrintingScreen = ({
  printJob = {},
  onUpdateJob,
  onNavigate,
  onSimulateError
}) => {
  const {
    customerName = 'Demo Student',
    documentTitle = 'Standard Document Printing',
    code = '2026',
    totalPages = 4,
    shouldSimulateError = false
  } = printJob;

  const [progress, setProgress] = useState(printJob.progress || 0);
  const [currentPage, setCurrentPage] = useState(printJob.currentPage || 1);
  const intervalRef = useRef(null);

  // Generic document printing status text
  const getStatusText = (pct) => {
    if (pct < 18) return 'Initializing laser engine & document paper feeder...';
    if (pct < 45) return `Dispensing & printing Page ${currentPage} of ${totalPages}...`;
    if (pct < 75) return `Applying toner & standard document formatting...`;
    if (pct < 95) return `Verifying print quality on Page ${currentPage}...`;
    return 'Finalizing printed documents and ejecting to collection tray...';
  };

  // Automated Printing Simulation (0% -> 100%)
  useEffect(() => {
    // If job was already finished, navigate to summary
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onNavigate(SCREENS.SUMMARY);
      }, 500);
      return () => clearTimeout(timer);
    }

    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        // If error simulation is requested (e.g. code 9999) and reaches 45%
        if (shouldSimulateError && prev >= 45) {
          clearInterval(intervalRef.current);
          if (onSimulateError) {
            onSimulateError('Paper Feed Jam Detected in Primary Feeder Tray');
          } else {
            onNavigate(SCREENS.SYSTEM_ERROR);
          }
          return prev;
        }

        const next = Math.min(100, prev + 2);
        const calculatedPage = Math.min(
          totalPages,
          Math.max(1, Math.ceil((next / 100) * totalPages))
        );
        setCurrentPage(calculatedPage);

        if (onUpdateJob) {
          onUpdateJob({
            progress: next,
            currentPage: calculatedPage,
            status: next === 100 ? 'completed' : 'printing'
          });
        }

        if (next >= 100) {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            onNavigate(SCREENS.SUMMARY);
          }, 600);
        }

        return next;
      });
    }, 120);

    return () => clearInterval(intervalRef.current);
  }, [totalPages, shouldSimulateError, onUpdateJob, onNavigate, onSimulateError, currentPage]);

  const handleManualSimulateError = () => {
    clearInterval(intervalRef.current);
    if (onSimulateError) {
      onSimulateError('Paper Feed Jam Detected in Primary Feeder Tray');
    } else {
      onNavigate(SCREENS.SYSTEM_ERROR);
    }
  };

  return (
    <div className="printing-screen-stage">
      {/* Background Ambience: Bokeh, Corner Evergreens, Snowfall, Fairy Lights */}
      <div className="printing-bokeh printing-bokeh-1" aria-hidden="true" />
      <div className="printing-bokeh printing-bokeh-2" aria-hidden="true" />
      <CornerEvergreens />
      <Snowfall count={18} />
      <ChristmasLights />

      {/* Main Central Printing Console Panel */}
      <div className="printing-panel">
        {/* Header Attribution */}
        <div className="printing-header">
          <div className="printing-badge">
            <span className="printing-badge-dot" aria-hidden="true" />
            <span className="printing-badge-text">REVA Student Print Job • #{code}</span>
          </div>
          <h2 className="printing-customer-name">{customerName}</h2>
          <p className="printing-document-title">Standard Document Printing</p>
        </div>

        {/* Realistic Animated Printing Spooler */}
        <div className="printer-spooler-visual" aria-hidden="true">
          {/* Emerging Printed Document Sheet */}
          <div className="emerging-sheet doc-emerging-sheet">
            <div className="sheet-doc-header">
              <FileText size={13} color="#174C3A" />
              <span className="sheet-doc-label">Page {currentPage}</span>
            </div>
            <div className="sheet-text-skeleton" style={{ width: '85%' }} />
            <div className="sheet-text-skeleton" style={{ width: '70%' }} />
            <div className="sheet-text-skeleton" style={{ width: '55%' }} />
          </div>

          {/* Laser Scanning Beam */}
          <div className="laser-beam" />

          {/* Printer Chassis */}
          <div className="spooler-chassis">
            <div className="spooler-slot" />
            <Printer size={26} color="#174C3A" />
            <Layers size={20} color="#C69A45" />
          </div>
        </div>

        {/* Dynamic Page Counter Badge */}
        <div className="page-counter-badge">
          <Layers size={18} className="page-counter-icon" />
          <span className="page-counter-text">
            Printing Page {currentPage} of {totalPages}
          </span>
        </div>

        {/* Document Pages Indicator: Page 1, Page 2, Page 3, Page 4 */}
        <div className="document-pages-row" aria-label="Document pages status">
          {Array.from({ length: totalPages }).map((_, idx) => {
            const pageNum = idx + 1;
            const isCompleted = pageNum < currentPage;
            const isCurrent = pageNum === currentPage;
            return (
              <div
                key={idx}
                className={`doc-page-chip ${isCompleted ? 'completed' : ''} ${isCurrent ? 'active' : ''}`}
              >
                <FileText size={13} className="doc-page-chip-icon" />
                <span className="doc-page-chip-label">Page {pageNum}</span>
                {isCompleted ? (
                  <CheckCircle2 size={12} className="doc-page-chip-status-icon" color="#174C3A" />
                ) : isCurrent ? (
                  <span className="doc-page-chip-pulse">Printing</span>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Large Percentage Display */}
        <div className="printing-progress-hero">
          <span className="progress-number">{progress}</span>
          <span className="progress-percent-symbol">%</span>
        </div>

        {/* Status Message */}
        <p className="printing-status-subtext">{getStatusText(progress)}</p>

        {/* Main Gold Gradient Progress Bar */}
        <div
          className="printing-progress-bar-container"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="printing-progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Simulation Actions for Testing Error Scenario */}
        <div className="printing-actions-footer">
          <button
            type="button"
            className="sim-error-btn"
            onClick={handleManualSimulateError}
            title="Simulate paper feed error to test recovery"
          >
            <AlertTriangle size={13} style={{ display: 'inline', marginRight: '4px', verticalAlign: '-1px' }} />
            <span>Simulate Paper Jam / Feed Error</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrintingScreen;
