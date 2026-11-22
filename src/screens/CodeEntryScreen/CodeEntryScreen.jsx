import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowLeft, Delete, Check, Sparkles, KeyRound, AlertCircle } from 'lucide-react';
import { SCREENS } from '../../utils/constants';
import ChristmasLights from '../HomeScreen/components/ChristmasLights';
import CornerEvergreens from '../HomeScreen/components/CornerEvergreens';
import './CodeEntryScreen.css';

/**
 * Screen 2: Code Entry Screen
 * MIMO Christmas 2026 – Self-Service Printing Kiosk
 * Theme: Luxury Warm Ivory & Champagne Gold (1920x1080 Landscape)
 *
 * Features:
 * - 4 horizontal code entry boxes
 * - 3-column, 4-row numeric keypad with touchscreen & physical keyboard support
 * - AUTOMATIC 4-DIGIT SUBMISSION: Validates and immediately navigates upon entering 4th digit
 * - Backspace support before 4th digit
 * - Duplicate submission prevention
 */
const CodeEntryScreen = ({ onNavigate, onSubmitCode }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);
  const isSubmittedRef = useRef(false);
  const submitTimeoutRef = useRef(null);

  // Clear any pending submission timeout on unmount
  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) {
        clearTimeout(submitTimeoutRef.current);
      }
    };
  }, []);

  // Clear error when user changes code
  const clearError = useCallback(() => {
    if (error) setError('');
  }, [error]);

  // Submit code safely (prevents duplicate navigation events)
  const submitCode = useCallback((finalCode) => {
    if (isSubmittedRef.current) return;
    isSubmittedRef.current = true;

    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
      submitTimeoutRef.current = null;
    }

    if (onSubmitCode) {
      onSubmitCode(finalCode);
    } else if (onNavigate) {
      onNavigate(SCREENS.PRINTING);
    }
  }, [onSubmitCode, onNavigate]);

  // Append digit (touchscreen keypad & physical keyboard)
  const handleDigit = useCallback((digit) => {
    if (isSubmittedRef.current) return;

    setCode((prev) => {
      if (prev.length >= 4) return prev;
      clearError();
      const nextCode = prev + digit;

      // AUTOMATIC SUBMISSION: As soon as the fourth digit is entered,
      // trigger immediate validation & navigation to Printing Screen
      if (nextCode.length === 4) {
        submitTimeoutRef.current = setTimeout(() => {
          submitCode(nextCode);
        }, 120);
      }

      return nextCode;
    });
  }, [clearError, submitCode]);

  // Backspace digit (preserved before 4th digit is entered)
  const handleBackspace = useCallback(() => {
    if (isSubmittedRef.current) return;

    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current);
      submitTimeoutRef.current = null;
    }

    setCode((prev) => {
      clearError();
      return prev.slice(0, -1);
    });
  }, [clearError]);

  // Manual Confirm code (accessible fallback)
  const handleConfirm = useCallback(() => {
    if (isSubmittedRef.current) return;

    if (code.length === 4) {
      submitCode(code);
    } else {
      setError('Please enter all 4 digits of your student printing code.');
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 450);
    }
  }, [code, submitCode]);

  // Physical Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isSubmittedRef.current) return;

      if (e.key >= '0' && e.key <= '9') {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter') {
        handleConfirm();
      } else if (e.key === 'Escape') {
        onNavigate(SCREENS.HOME);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleBackspace, handleConfirm, onNavigate]);

  // Keypad rows matching reference:
  // 1 | 2 | 3
  // 4 | 5 | 6
  // 7 | 8 | 9
  // Backspace | 0 | Confirm
  const keypadButtons = [
    { type: 'number', value: '1' },
    { type: 'number', value: '2' },
    { type: 'number', value: '3' },
    { type: 'number', value: '4' },
    { type: 'number', value: '5' },
    { type: 'number', value: '6' },
    { type: 'number', value: '7' },
    { type: 'number', value: '8' },
    { type: 'number', value: '9' },
    { type: 'backspace' },
    { type: 'number', value: '0' },
    { type: 'confirm' }
  ];

  return (
    <div className="code-entry-stage">
      {/* Background Ambience: Warm Bokeh & Golden Snowflake Watermarks */}
      <div className="code-entry-bokeh code-entry-bokeh-1" aria-hidden="true" />
      <div className="code-entry-bokeh code-entry-bokeh-2" aria-hidden="true" />
      <svg className="code-entry-watermark code-watermark-left" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path d="M50 0 V100 M0 50 H100 M15 15 L85 85 M15 85 L85 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1.2" />
      </svg>
      <svg className="code-entry-watermark code-watermark-right" viewBox="0 0 100 100" fill="none" aria-hidden="true">
        <path d="M50 5 V95 M5 50 H95 M20 20 L80 80 M20 80 L80 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="50,30 55,45 70,50 55,55 50,70 45,55 30,50 45,45" stroke="currentColor" strokeWidth="1" fill="none" />
      </svg>

      {/* Delicate Corner Evergreens Framing */}
      <CornerEvergreens />

      {/* Warm Golden Fairy Lights Garland */}
      <ChristmasLights />

      {/* Large Circular Back Button in Upper-Left Corner */}
      <button
        type="button"
        className="kiosk-back-btn"
        onClick={() => onNavigate(SCREENS.HOME)}
        aria-label="Return to Home Screen"
        title="Return to Home Screen"
      >
        <ArrowLeft size={28} strokeWidth={2.6} />
      </button>

      {/* Central Entry Panel */}
      <div className={`code-entry-panel ${isShaking ? 'shake-active' : ''}`}>
        {/* Panel Header */}
        <div className="code-entry-header">
          <div className="code-panel-badge">
            <KeyRound size={14} className="code-panel-badge-icon" />
            <span className="code-panel-badge-text">Order Verification</span>
          </div>
          <h2 className="code-entry-title">Enter Your MIMO Code Here</h2>
          <p className="code-entry-subtitle">Enter your 4-digit student printing code to continue.</p>
        </div>

        {/* Four Code Display Boxes */}
        <div className="code-boxes-container">
          {[0, 1, 2, 3].map((index) => {
            const digit = code[index];
            const isFilled = digit !== undefined;
            const isActive = index === code.length && code.length < 4;

            return (
              <div
                key={index}
                className={`code-box ${isFilled ? 'filled' : ''} ${isActive ? 'active' : ''}`}
              >
                {isFilled ? (
                  <span className="code-box-digit">{digit}</span>
                ) : isActive ? (
                  <div className="code-box-cursor" aria-hidden="true" />
                ) : null}
              </div>
            );
          })}
        </div>

        {/* Inline Error Message */}
        {error && (
          <div className="code-error-banner" role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* Numeric Keypad (3 Columns × 4 Rows) */}
        <div className="numeric-keypad-grid" role="group" aria-label="Touchscreen numeric keypad">
          {keypadButtons.map((btn, idx) => {
            if (btn.type === 'number') {
              return (
                <button
                  key={idx}
                  type="button"
                  className="keypad-btn keypad-btn-number"
                  onClick={() => handleDigit(btn.value)}
                  aria-label={`Digit ${btn.value}`}
                >
                  {btn.value}
                </button>
              );
            }

            if (btn.type === 'backspace') {
              return (
                <button
                  key={idx}
                  type="button"
                  className="keypad-btn keypad-btn-backspace"
                  onClick={handleBackspace}
                  aria-label="Backspace delete last digit"
                >
                  <Delete size={22} />
                  <span>Clear</span>
                </button>
              );
            }

            if (btn.type === 'confirm') {
              const isEnabled = code.length === 4;
              return (
                <button
                  key={idx}
                  type="button"
                  className="keypad-btn keypad-btn-confirm"
                  onClick={handleConfirm}
                  disabled={!isEnabled}
                  aria-label="Confirm printing code"
                >
                  <span>Confirm</span>
                  <Check size={20} strokeWidth={2.8} />
                </button>
              );
            }

            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default CodeEntryScreen;
