import React, { useState, useRef, useEffect } from 'react';
import {
  Wrench,
  Wifi,
  WifiOff,
  Layers,
  Thermometer,
  Printer,
  CheckCircle2,
  AlertOctagon,
  RefreshCw,
  Home,
  Sliders,
  Sparkles
} from 'lucide-react';
import { SCREENS, INITIAL_HARDWARE_STATUS } from '../../utils/constants';
import ChristmasLights from '../HomeScreen/components/ChristmasLights';
import CornerEvergreens from '../HomeScreen/components/CornerEvergreens';
import './MaintenanceScreen.css';

/**
 * Screen 6: Maintenance Screen
 * MIMO Christmas 2026 – Self-Service Printing Kiosk
 * Theme: Luxury Warm Ivory & Champagne Gold (1920x1080 Landscape)
 *
 * Features:
 * - Real-time diagnostics for printer connection, paper levels, and thermal calibration
 * - Toggleable simulated states for Offline, Out-of-Paper, and Maintenance-Required
 * - Diagnostic self-test print cycle simulation with 5-stage progress
 * - Safe exit navigation back to Home Screen
 */
const MaintenanceScreen = ({
  hardwareStatus = INITIAL_HARDWARE_STATUS,
  onUpdateHardware,
  onNavigate
}) => {
  const [diagnosticStatus, setDiagnosticStatus] = useState('idle'); // 'idle' | 'running' | 'completed'
  const [diagnosticProgress, setDiagnosticProgress] = useState(0);
  const timerRef = useRef(null);

  const {
    isOnline = true,
    paperLevel = 85,
    tonerLevel = 92,
    headTemperature = 41,
    totalPrintsCount = 1248,
    isOutOfPaper = false,
    isPaperJam = false
  } = hardwareStatus;

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Map progress percentage to the 5 diagnostic stages
  const getDiagnosticStage = (pct) => {
    if (pct < 20) return 'Initializing printer';
    if (pct < 40) return 'Checking paper tray';
    if (pct < 60) return 'Checking thermal ribbon';
    if (pct < 80) return 'Testing print head';
    if (pct < 100) return 'Printing diagnostic page';
    return 'Diagnostic Test Completed Successfully!';
  };

  // Toggle Kiosk Connection (Online / Offline)
  const toggleOnlineState = () => {
    if (onUpdateHardware) {
      onUpdateHardware({
        isOnline: !isOnline,
        statusMessage: !isOnline ? 'Ready for Printing' : 'Kiosk Hardware Set Offline'
      });
    }
  };

  // Toggle Paper Level (85% / Out of Paper 0%)
  const togglePaperState = () => {
    if (onUpdateHardware) {
      const nextOutOfPaper = !isOutOfPaper;
      onUpdateHardware({
        isOutOfPaper: nextOutOfPaper,
        paperLevel: nextOutOfPaper ? 0 : 85,
        statusMessage: nextOutOfPaper ? 'Out of Paper Error' : 'Paper Tray Loaded (85%)'
      });
    }
  };

  // Toggle Paper Jam / Maintenance Required
  const toggleJamState = () => {
    if (onUpdateHardware) {
      onUpdateHardware({
        isPaperJam: !isPaperJam,
        statusMessage: !isPaperJam ? 'Paper Jam Exception Detected' : 'Printer Feeder Clear'
      });
    }
  };

  // Reset Everything to Normal Operating Status
  const handleResetToNormal = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setDiagnosticStatus('idle');
    setDiagnosticProgress(0);

    if (onUpdateHardware) {
      onUpdateHardware({
        isOnline: true,
        paperLevel: 85,
        tonerLevel: 92,
        isOutOfPaper: false,
        isPaperJam: false,
        statusMessage: 'Ready for Printing'
      });
    }
  };

  // Run Simulated Diagnostic Test Page
  const handleRunDiagnostic = () => {
    if (diagnosticStatus === 'running') return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    setDiagnosticStatus('running');
    setDiagnosticProgress(0);

    timerRef.current = setInterval(() => {
      setDiagnosticProgress((prev) => {
        const next = prev + 1.8;
        if (next >= 100) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setDiagnosticStatus('completed');
          if (onUpdateHardware) {
            onUpdateHardware({
              totalPrintsCount: totalPrintsCount + 1
            });
          }
          return 100;
        }
        return next;
      });
    }, 45);
  };

  const isMaintenanceRequired = isPaperJam || isOutOfPaper || !isOnline;

  return (
    <div className="maintenance-screen-stage">
      <CornerEvergreens />
      <ChristmasLights />

      {/* Central Diagnostic Panel */}
      <div className="maintenance-panel">
        {/* Header */}
        <div className="maintenance-header">
          <div className="maintenance-title-group">
            <div className="maintenance-badge">
              <Wrench size={13} color="#C69A45" />
              <span>Technician Diagnostic Console</span>
            </div>
            <h2 className="maintenance-title">Kiosk Hardware & Service Status</h2>
          </div>

          <div
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              background: isMaintenanceRequired ? 'rgba(143, 38, 56, 0.12)' : 'rgba(23, 76, 58, 0.12)',
              border: `1px solid ${isMaintenanceRequired ? '#8F2638' : '#174C3A'}`,
              color: isMaintenanceRequired ? '#8F2638' : '#174C3A',
              fontWeight: 800,
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {isMaintenanceRequired ? <AlertOctagon size={15} /> : <CheckCircle2 size={15} />}
            <span>{isMaintenanceRequired ? 'MAINTENANCE REQUIRED' : 'ALL SYSTEMS OPTIMAL'}</span>
          </div>
        </div>

        {/* 4 Status Gauges */}
        <div className="diagnostic-gauges-grid">
          {/* Connection */}
          <div className="gauge-card">
            <div className="gauge-icon">
              {isOnline ? <Wifi size={22} color="#174C3A" /> : <WifiOff size={22} color="#8F2638" />}
            </div>
            <div className="gauge-label">Connection</div>
            <div className="gauge-value" style={{ color: isOnline ? '#174C3A' : '#8F2638' }}>
              {isOnline ? 'Online' : 'Offline'}
            </div>
            <div className="gauge-status-sub" style={{ color: isOnline ? '#174C3A' : '#8F2638' }}>
              {isOnline ? '1Gbps Low-Latency' : 'Network Disconnected'}
            </div>
          </div>

          {/* Paper Level */}
          <div className="gauge-card">
            <div className="gauge-icon">
              <Layers size={22} color={isOutOfPaper ? '#8F2638' : '#174C3A'} />
            </div>
            <div className="gauge-label">Paper Tray</div>
            <div className="gauge-value" style={{ color: isOutOfPaper ? '#8F2638' : '#174C3A' }}>
              {isOutOfPaper ? 'Empty (0%)' : `${paperLevel}%`}
            </div>
            <div className="gauge-status-sub" style={{ color: isOutOfPaper ? '#8F2638' : '#174C3A' }}>
              {isOutOfPaper ? 'Out of Paper' : '4×6" Glossy Rolls'}
            </div>
          </div>

          {/* Ribbon / Ink */}
          <div className="gauge-card">
            <div className="gauge-icon">
              <Printer size={22} color="#174C3A" />
            </div>
            <div className="gauge-label">Thermal Ribbon</div>
            <div className="gauge-value">{tonerLevel}%</div>
            <div className="gauge-status-sub" style={{ color: '#174C3A' }}>
              Full Cyan/Magenta/Yellow/Luster
            </div>
          </div>

          {/* Thermal Head */}
          <div className="gauge-card">
            <div className="gauge-icon">
              <Thermometer size={22} color="#174C3A" />
            </div>
            <div className="gauge-label">Print Head</div>
            <div className="gauge-value">{headTemperature}°C</div>
            <div className="gauge-status-sub" style={{ color: '#174C3A' }}>
              Total: {totalPrintsCount} prints
            </div>
          </div>
        </div>

        {/* Interactive Scenario Simulation Section (As Required) */}
        <div className="maintenance-scenarios-section">
          <div className="scenarios-heading">
            <Sliders size={16} color="#174C3A" />
            <span>Simulate Kiosk Scenarios (Workflow Testing)</span>
          </div>

          <div className="scenarios-btn-row">
            {/* Toggle Offline */}
            <button
              type="button"
              className={`scenario-toggle-btn ${!isOnline ? 'active-error' : ''}`}
              onClick={toggleOnlineState}
            >
              {isOnline ? <WifiOff size={15} /> : <Wifi size={15} />}
              <span>{isOnline ? 'Set to Offline State' : 'Restore Online State'}</span>
            </button>

            {/* Toggle Out of Paper */}
            <button
              type="button"
              className={`scenario-toggle-btn ${isOutOfPaper ? 'active-error' : ''}`}
              onClick={togglePaperState}
            >
              <Layers size={15} />
              <span>{isOutOfPaper ? 'Refill Paper Tray (85%)' : 'Set to Out-of-Paper'}</span>
            </button>

            {/* Toggle Jam */}
            <button
              type="button"
              className={`scenario-toggle-btn ${isPaperJam ? 'active-error' : ''}`}
              onClick={toggleJamState}
            >
              <AlertOctagon size={15} />
              <span>{isPaperJam ? 'Clear Paper Jam' : 'Simulate Paper Jam'}</span>
            </button>
          </div>

          {/* Quick Reset All */}
          <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleResetToNormal}
              style={{
                background: 'none',
                border: 'none',
                color: '#C69A45',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}
            >
              <RefreshCw size={12} />
              <span>Reset All to Optimal Online Status</span>
            </button>
          </div>
        </div>

        {/* Diagnostic Progress / Results Section */}
        {diagnosticStatus !== 'idle' && (
          <div className="diagnostic-run-container">
            <div className="diagnostic-status-header">
              <div className="diagnostic-stage-info">
                {diagnosticStatus === 'running' ? (
                  <RefreshCw size={15} className="rotate-active diagnostic-spin-icon" />
                ) : (
                  <CheckCircle2 size={16} color="#174C3A" />
                )}
                <span className={`diagnostic-stage-text ${diagnosticStatus === 'completed' ? 'success' : ''}`}>
                  {getDiagnosticStage(diagnosticProgress)}
                </span>
              </div>
              <span className="diagnostic-percentage">{Math.round(diagnosticProgress)}%</span>
            </div>

            <div className="diagnostic-progress-track">
              <div
                className={`diagnostic-progress-bar ${diagnosticStatus === 'completed' ? 'bar-success' : ''}`}
                style={{ width: `${Math.min(100, Math.round(diagnosticProgress))}%` }}
              />
            </div>

            {/* Success indicator and re-run option when completed */}
            {diagnosticStatus === 'completed' && (
              <div className="diagnostic-success-card">
                <div className="diagnostic-success-indicator">
                  <CheckCircle2 size={20} color="#174C3A" />
                </div>
                <div className="diagnostic-success-body">
                  <div className="diagnostic-success-title">Diagnostic Test Completed Successfully!</div>
                  <div className="diagnostic-success-sub">
                    All 5 diagnostic stages passed. Hardware, paper tray & thermal print head operational.
                  </div>
                </div>
                <button
                  type="button"
                  className="diagnostic-rerun-inline-btn"
                  onClick={handleRunDiagnostic}
                >
                  <RefreshCw size={13} />
                  <span>Run Test Again</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Footer Actions */}
        <div className="maintenance-actions-footer">
          <button
            type="button"
            className={`test-print-btn ${diagnosticStatus === 'running' ? 'btn-disabled' : ''}`}
            onClick={handleRunDiagnostic}
            disabled={diagnosticStatus === 'running'}
          >
            {diagnosticStatus === 'running' ? (
              <>
                <RefreshCw size={16} className="rotate-active" />
                <span>Running Diagnostic Test...</span>
              </>
            ) : diagnosticStatus === 'completed' ? (
              <>
                <RefreshCw size={16} />
                <span>Run Diagnostic Test Again</span>
              </>
            ) : (
              <>
                <Printer size={16} />
                <span>Run Diagnostic Test Page</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="exit-maintenance-btn"
            onClick={() => onNavigate(SCREENS.HOME)}
          >
            <Home size={16} />
            <span>Exit Maintenance & Return Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceScreen;
