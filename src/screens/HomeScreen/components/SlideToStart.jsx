import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsRight, Sparkles, ArrowRight, Check } from 'lucide-react';

/**
 * SlideToStart Component
 * High-performance touchscreen & mouse slide-to-activate control with fallback tap
 */
const SlideToStart = ({ onComplete }) => {
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const trackRef = useRef(null);
  const handleRef = useRef(null);
  const startXRef = useRef(0);
  const maxDistanceRef = useRef(350); // Calculated dynamically

  // Measure max draggable distance inside the track
  const updateTrackMetrics = useCallback(() => {
    if (trackRef.current && handleRef.current) {
      const trackWidth = trackRef.current.clientWidth;
      const handleWidth = handleRef.current.clientWidth;
      // 8px margin padding on both sides
      const maxDist = Math.max(0, trackWidth - handleWidth - 16);
      maxDistanceRef.current = maxDist;
    }
  }, []);

  useEffect(() => {
    updateTrackMetrics();
    window.addEventListener('resize', updateTrackMetrics);
    return () => window.removeEventListener('resize', updateTrackMetrics);
  }, [updateTrackMetrics]);

  // Trigger completion
  const triggerCompletion = useCallback(() => {
    setIsCompleted(true);
    setDragOffset(maxDistanceRef.current);
    // Smooth delay for visual confirmation before screen change
    setTimeout(() => {
      onComplete();
    }, 400);
  }, [onComplete]);

  // Touch Event Handlers
  const handleTouchStart = (e) => {
    if (isCompleted) return;
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX - dragOffset;
  };

  const handleTouchMove = (e) => {
    if (!isDragging || isCompleted) return;
    const currentX = e.touches[0].clientX;
    const newOffset = Math.min(
      maxDistanceRef.current,
      Math.max(0, currentX - startXRef.current)
    );
    setDragOffset(newOffset);
  };

  const handleTouchEnd = () => {
    if (!isDragging || isCompleted) return;
    setIsDragging(false);

    // If dragged >= 80% of track, complete the action
    if (dragOffset >= maxDistanceRef.current * 0.8) {
      triggerCompletion();
    } else {
      // Snap back smoothly
      setDragOffset(0);
    }
  };

  // Mouse Event Handlers
  const handleMouseDown = (e) => {
    if (isCompleted || e.button !== 0) return;
    setIsDragging(true);
    startXRef.current = e.clientX - dragOffset;
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging || isCompleted) return;
      const newOffset = Math.min(
        maxDistanceRef.current,
        Math.max(0, e.clientX - startXRef.current)
      );
      setDragOffset(newOffset);
    };

    const handleMouseUp = () => {
      if (!isDragging || isCompleted) return;
      setIsDragging(false);

      if (dragOffset >= maxDistanceRef.current * 0.8) {
        triggerCompletion();
      } else {
        setDragOffset(0);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isCompleted, triggerCompletion]);

  // Fallback tap/click interaction
  const handleFallbackClick = () => {
    if (isCompleted) return;
    triggerCompletion();
  };

  // Calculate progress ratio (0 to 1)
  const progressRatio = maxDistanceRef.current > 0 ? dragOffset / maxDistanceRef.current : 0;
  const labelOpacity = Math.max(0.08, 1 - progressRatio * 1.6);

  return (
    <div className="slide-to-start-wrapper">
      <div
        ref={trackRef}
        className={`slide-track ${isCompleted ? 'completed' : ''}`}
        onClick={handleFallbackClick}
        role="button"
        tabIndex={0}
        aria-label="Slide to start printing or tap to begin"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            triggerCompletion();
          }
        }}
      >
        {/* Dynamic active progress fill */}
        <div
          className="slide-progress-fill"
          style={{
            width: `${dragOffset + 40}px`,
            transition: isDragging ? 'none' : 'width 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        />

        {/* Center Guided Label */}
        <div
          className="slide-label"
          style={{
            opacity: isCompleted ? 0 : labelOpacity,
            transform: `translateX(${dragOffset * 0.25}px)`
          }}
        >
          <span>Slide to Start</span>
          <div className="slide-chevrons" aria-hidden="true">
            <ChevronsRight size={22} className="chevron-animate-1" />
            <ChevronsRight size={22} className="chevron-animate-2" />
          </div>
        </div>

        {/* Draggable Knob / Handle */}
        <div
          ref={handleRef}
          className={`slide-handle ${isDragging ? 'dragging' : ''} ${isCompleted ? 'success' : ''}`}
          style={{
            transform: `translateX(${dragOffset}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onClick={(e) => e.stopPropagation()} // Let handle drag work cleanly
        >
          {isCompleted ? (
            <Check size={32} className="handle-icon-check" />
          ) : (
            <div className="handle-content">
              <Sparkles size={20} className="handle-sparkle" />
              <ArrowRight size={24} className="handle-arrow" />
            </div>
          )}
        </div>
      </div>

      {/* Accessible touch-friendly fallback tap button / hint */}
      <button
        type="button"
        className="slide-fallback-hint"
        onClick={handleFallbackClick}
        aria-label="Tap here directly to start"
      >
        <span>Or tap here to start</span>
        <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default React.memo(SlideToStart);
