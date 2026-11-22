import React, { useState, useCallback } from 'react';
import KioskLayout from './components/layout/KioskLayout';
import {
  HomeScreen,
  CodeEntryScreen,
  PrintingScreen,
  SummaryScreen,
  SystemErrorScreen,
  MaintenanceScreen
} from './screens';
import {
  SCREENS,
  SCREEN_LABELS,
  SCREEN_LABELS_COMPACT,
  SCREEN_NUMBERS,
  getPrintJobForCode,
  INITIAL_HARDWARE_STATUS
} from './utils/constants';

function App() {
  const [currentScreen, setCurrentScreen] = useState(SCREENS.HOME);

  // Shared Print Job State
  const [printJob, setPrintJob] = useState(() => ({
    ...getPrintJobForCode('2026'),
    currentPage: 1,
    progress: 0,
    status: 'idle',
    errorMessage: null
  }));

  // Shared Kiosk Hardware Diagnostics State
  const [hardwareStatus, setHardwareStatus] = useState(INITIAL_HARDWARE_STATUS);

  // Handler: Start print job from entered code
  const handleStartPrintJob = useCallback((enteredCode) => {
    const jobData = getPrintJobForCode(enteredCode);
    setPrintJob({
      ...jobData,
      currentPage: 1,
      progress: 0,
      status: 'printing',
      errorMessage: null
    });
    setCurrentScreen(SCREENS.PRINTING);
  }, []);

  // Handler: Update progress or current page
  const handleUpdatePrintJob = useCallback((updates) => {
    setPrintJob((prev) => ({
      ...prev,
      ...updates
    }));
  }, []);

  // Handler: Trigger realistic printer error simulation
  const handleSimulateError = useCallback((errorMsg) => {
    setPrintJob((prev) => ({
      ...prev,
      status: 'error',
      errorMessage: errorMsg || 'Paper Feed Jam in Tray 1'
    }));
    setCurrentScreen(SCREENS.SYSTEM_ERROR);
  }, []);

  // Handler: Retry / restart print job
  const handleRetryPrintJob = useCallback(() => {
    setPrintJob((prev) => ({
      ...prev,
      currentPage: 1,
      progress: 0,
      status: 'printing',
      errorMessage: null,
      shouldSimulateError: false
    }));
    setCurrentScreen(SCREENS.PRINTING);
  }, []);

  // Handler: Done / Return to Home
  const handleDonePrintJob = useCallback(() => {
    setPrintJob((prev) => ({
      ...prev,
      currentPage: 1,
      progress: 0,
      status: 'idle',
      errorMessage: null
    }));
    setCurrentScreen(SCREENS.HOME);
  }, []);

  // Handler: Update kiosk hardware diagnostics
  const handleUpdateHardware = useCallback((updates) => {
    setHardwareStatus((prev) => ({
      ...prev,
      ...updates
    }));
  }, []);

  // Render active screen with shared state
  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case SCREENS.HOME:
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case SCREENS.CODE_ENTRY:
        return (
          <CodeEntryScreen
            onNavigate={setCurrentScreen}
            onSubmitCode={handleStartPrintJob}
          />
        );
      case SCREENS.PRINTING:
        return (
          <PrintingScreen
            printJob={printJob}
            onUpdateJob={handleUpdatePrintJob}
            onNavigate={setCurrentScreen}
            onSimulateError={handleSimulateError}
          />
        );
      case SCREENS.SUMMARY:
        return (
          <SummaryScreen
            printJob={printJob}
            onDone={handleDonePrintJob}
            onNavigate={setCurrentScreen}
          />
        );
      case SCREENS.SYSTEM_ERROR:
        return (
          <SystemErrorScreen
            printJob={printJob}
            onRetry={handleRetryPrintJob}
            onNavigate={setCurrentScreen}
          />
        );
      case SCREENS.MAINTENANCE:
        return (
          <MaintenanceScreen
            hardwareStatus={hardwareStatus}
            onUpdateHardware={handleUpdateHardware}
            onNavigate={setCurrentScreen}
          />
        );
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <>
      {/* Development Screen Preview Switcher (Discrete top control) */}
      <div className="dev-preview-wrapper">
        <nav className="screen-navigator-bar" aria-label="Screen preview navigation">
          <span className="dev-tag">Dev Preview</span>
          {Object.entries(SCREEN_LABELS).map(([key, label]) => (
            <button
              key={key}
              className={`nav-pill ${currentScreen === key ? 'active' : ''}`}
              onClick={() => setCurrentScreen(key)}
              title={label}
              aria-label={label}
            >
              <span className="nav-label-full">{label}</span>
              <span className="nav-label-compact">{SCREEN_LABELS_COMPACT[key] || label}</span>
              <span className="nav-label-number">{SCREEN_NUMBERS[key] || '•'}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Kiosk Landscape Layout */}
      <KioskLayout
        currentScreen={currentScreen}
        onScreenChange={setCurrentScreen}
        hardwareStatus={hardwareStatus}
      >
        {renderCurrentScreen()}
      </KioskLayout>
    </>
  );
}

export default App;
