/**
 * Application Constants for MIMO Christmas 2026 Kiosk
 * Theme: Luxury Ivory & Champagne Gold Christmas
 * Workflow: Generic REVA University Student Printing Experience
 */

export const KIOSK_CONFIG = {
  TITLE: 'MIMO Christmas 2026',
  SUBTITLE: 'Self-Service Printing Kiosk',
  VERSION: '1.0.0-rc',
  TARGET_RESOLUTION: {
    WIDTH: 1920,
    HEIGHT: 1080,
    ORIENTATION: 'landscape'
  },
  DEFAULT_IDLE_TIMEOUT_SECONDS: 60,
  SUMMARY_COUNTDOWN_SECONDS: 10,
  SUPPORT_PHONE: '1-800-MIMO-XMAS'
};

export const SCREENS = {
  HOME: 'home',
  CODE_ENTRY: 'code_entry',
  PRINTING: 'printing',
  SUMMARY: 'summary',
  SYSTEM_ERROR: 'system_error',
  MAINTENANCE: 'maintenance'
};

export const SCREEN_LABELS = {
  [SCREENS.HOME]: '1. Home Screen',
  [SCREENS.CODE_ENTRY]: '2. Code Entry',
  [SCREENS.PRINTING]: '3. Printing',
  [SCREENS.SUMMARY]: '4. Summary',
  [SCREENS.SYSTEM_ERROR]: '5. System Error',
  [SCREENS.MAINTENANCE]: '6. Maintenance'
};

export const SCREEN_LABELS_COMPACT = {
  [SCREENS.HOME]: '1. Home',
  [SCREENS.CODE_ENTRY]: '2. Code',
  [SCREENS.PRINTING]: '3. Print',
  [SCREENS.SUMMARY]: '4. Summary',
  [SCREENS.SYSTEM_ERROR]: '5. Error',
  [SCREENS.MAINTENANCE]: '6. Maint'
};

export const SCREEN_NUMBERS = {
  [SCREENS.HOME]: '1',
  [SCREENS.CODE_ENTRY]: '2',
  [SCREENS.PRINTING]: '3',
  [SCREENS.SUMMARY]: '4',
  [SCREENS.SYSTEM_ERROR]: '5',
  [SCREENS.MAINTENANCE]: '6'
};

/**
 * Simulated Student Print Jobs Database
 * Generic REVA University student printing jobs mapped to 4-digit codes
 */
export const DEMO_PRINT_JOBS = {
  '2026': {
    customerName: 'Demo Student',
    documentTitle: 'Standard Document Printing',
    totalPages: 4,
    paperType: 'Standard A4 Document Paper (80 GSM)',
    previewItems: ['Page 1', 'Page 2', 'Page 3', 'Page 4']
  },
  '1225': {
    customerName: 'Demo Student',
    documentTitle: 'Standard Document Printing',
    totalPages: 3,
    paperType: 'Standard A4 Document Paper (80 GSM)',
    previewItems: ['Page 1', 'Page 2', 'Page 3']
  },
  '7842': {
    customerName: 'Demo Student',
    documentTitle: 'Standard Document Printing',
    totalPages: 4,
    paperType: 'Standard A4 Document Paper (80 GSM)',
    previewItems: ['Page 1', 'Page 2', 'Page 3', 'Page 4']
  },
  '9999': {
    customerName: 'Demo Student',
    documentTitle: 'Standard Document Printing (Error Test)',
    totalPages: 4,
    paperType: 'Standard A4 Document Paper (80 GSM)',
    previewItems: ['Page 1', 'Page 2', 'Page 3', 'Page 4'],
    shouldSimulateError: true
  }
};

/**
 * Fallback generator for any custom 4-digit code
 * Yields a generic student print job
 */
export const getPrintJobForCode = (code) => {
  if (DEMO_PRINT_JOBS[code]) {
    return {
      code,
      ...DEMO_PRINT_JOBS[code]
    };
  }

  // Generic fallback student profile
  return {
    code: code || '0000',
    customerName: 'Demo Student',
    documentTitle: 'Standard Document Printing',
    totalPages: 4,
    paperType: 'Standard A4 Document Paper (80 GSM)',
    previewItems: ['Page 1', 'Page 2', 'Page 3', 'Page 4'],
    shouldSimulateError: false
  };
};

/**
 * Initial Kiosk Hardware Status
 */
export const INITIAL_HARDWARE_STATUS = {
  isOnline: true,
  paperLevel: 85, // percentage
  tonerLevel: 92, // percentage
  headTemperature: 41, // Celsius
  totalPrintsCount: 1248,
  isPaperJam: false,
  isOutOfPaper: false,
  statusMessage: 'Ready for Printing'
};
