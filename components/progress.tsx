'use client';

import React from 'react';

export type ProgressProps = {
  /** The current progress value (0 to max) */
  value?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | number;
  /** The maximum number of segments (default: 6) */
  max?: number;
  /** Optional theme override */
  variant?: 'default' | 'warning';
  className?: string;
};

export function Progress({ value = 0, max = 6, variant = 'default', className = '' }: ProgressProps) {
  // Determine colors based on variant
  const activeColor = variant === 'warning' ? 'bg-[#FACE68]' : 'bg-[#418B7E]';
  const inactiveColor = variant === 'warning' ? 'bg-[#FDEFC8]' : 'bg-[#C7DED9]'; // A light green approx for default

  // Ensure value is bounded
  const boundedValue = Math.max(0, Math.min(value, max));

  return (
    <div className={`flex items-center gap-[6px] w-[368px] h-[7px] ${className}`}>
      {Array.from({ length: max }).map((_, index) => {
        const isActive = index < boundedValue;
        return (
          <div
            key={index}
            className={`flex-1 h-full rounded-full transition-colors duration-300 ${isActive ? activeColor : inactiveColor}`}
          />
        );
      })}
    </div>
  );
}

export default Progress;
