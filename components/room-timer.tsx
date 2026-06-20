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
    <div className="flex flex-col items-center justify-center gap-4 w-full max-w-[320px]">
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
      <div className="flex flex-col gap-5 w-full mt-4">
        {/* Done Button */}
        <button
          onClick={() => {
            setIsRunning(false);
            if (onFinish) onFinish();
          }}
          className="bg-[#418b7e] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 h-[60px] rounded-[30px] w-full"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor" className="text-[#f4f9f8]" />
          </svg>
          <span className="font-['Poppins',sans-serif] font-semibold text-[16px] text-[#f4f9f8]">
            Done
          </span>
        </button>

        {/* Pause / Resume Button */}
        {isRunning ? (
          <button
            onClick={handlePause}
            className="bg-[#f8b027] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 h-[60px] rounded-[30px] w-full"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 19C8 19.5523 7.55228 20 7 20C6.44772 20 6 19.5523 6 19V5C6 4.44772 6.44772 4 7 4C7.55228 4 8 4.44772 8 5V19Z" fill="currentColor" className="text-[#441604]" />
              <path d="M18 19C18 19.5523 17.5523 20 17 20C16.4477 20 16 19.5523 16 19V5C16 4.44772 16.4477 4 17 4C17.5523 4 18 4.44772 18 5V19Z" fill="currentColor" className="text-[#441604]" />
            </svg>
            <span className="font-['Poppins',sans-serif] font-semibold text-[16px] text-[#441604]">
              Pause
            </span>
          </button>
        ) : (
          <button
            onClick={handleStart}
            className="bg-[#f8b027] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 h-[60px] rounded-[30px] w-full"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" className="text-[#441604]" />
            </svg>
            <span className="font-['Poppins',sans-serif] font-semibold text-[16px] text-[#441604]">
              Resume
            </span>
          </button>
        )}
      </div>
    </div>
  );
}

export default RoomTimer;
