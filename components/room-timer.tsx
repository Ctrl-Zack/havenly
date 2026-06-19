'use client';

import React, { useState, useEffect, useCallback } from 'react';

type RoomTimerProps = {
  initialMinutes?: number;
  autoStart?: boolean;
  onFinish?: () => void;
};

export function RoomTimer({
  initialMinutes = 1,
  autoStart = false,
  onFinish,
}: RoomTimerProps) {
  const initialSeconds = initialMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(autoStart);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            if (onFinish) onFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, onFinish]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(initialSeconds);
  };

  const percentage = (timeLeft / initialSeconds) * 100;

  // Determine colors based on percentage
  let strokeColor = '#49917a'; // Green
  let trackColor = '#dcf2ea';  // Light Green

  if (timeLeft === 0){
    trackColor = '#8c8e91dc';
  }
  else if (percentage <= 20) {
    strokeColor = '#ef4444'; // Red
    trackColor = '#fee2e2';  // Light Red
  } else if (percentage <= 50) {
    strokeColor = '#ecb454ff'; // Yellow/Orange
    trackColor = '#fef3c7';  // Light Yellow
  }

  // Formatting time MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  // SVG Circle properties
  const size = 240;
  const strokeWidth = 24;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // By animating from 2C down to C, the gap grows from the start of the path (12 o'clock)
  const strokeDashoffset = circumference + (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full max-w-[320px]">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="absolute inset-0 -rotate-90">
          {/* Background Track Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
            className="transition-colors duration-500 ease-in-out"
          />
          {/* Progress Circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease-in-out'
            }}
          />
        </svg>
        
        {/* Time Text */}
        <div className="relative z-10 flex flex-col items-center">
          <span className="font-serif text-[56px] font-bold tracking-tight text-[#151515] leading-none transition-colors duration-500">
            {formattedTime}
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        {!isRunning && timeLeft > 0 ? (
          <button
            onClick={handleStart}
            className="px-6 py-2.5 bg-[#151515] text-white rounded-full font-medium text-[15px] hover:bg-black transition-colors focus:outline-none focus:ring-4 focus:ring-black/20"
          >
            {timeLeft === initialSeconds ? 'Start' : 'Resume'}
          </button>
        ) : isRunning ? (
          <button
            onClick={handlePause}
            className="px-6 py-2.5 bg-white border-2 border-[#151515] text-[#151515] rounded-full font-medium text-[15px] hover:bg-black/5 transition-colors focus:outline-none focus:ring-4 focus:ring-black/20"
          >
            Pause
          </button>
        ) : null}

        {(timeLeft < initialSeconds || isRunning) && (
          <button
            onClick={handleReset}
            className="px-6 py-2.5 bg-transparent text-[#151515] hover:bg-black/5 rounded-full font-medium text-[15px] transition-colors focus:outline-none focus:ring-4 focus:ring-black/10"
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}

export default RoomTimer;
