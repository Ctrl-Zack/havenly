'use client';

import React from 'react';

export type PeopleVariant = 'focus' | 'idle' | 'not focus';

export type PeopleProps = {
  variant?: PeopleVariant;
  className?: string;
};

export function People({ variant = 'idle', className = '' }: PeopleProps) {
  // Determine stroke color based on variant
  let strokeColor = '#A5A5A5'; // idle (monochrome/400)
  if (variant === 'focus') strokeColor = '#418B7E'; // focus (accent/500)
  if (variant === 'not focus') strokeColor = '#FFA9A9'; // light pink/red

  return (
    <div className={`w-[70px] h-[70px] bg-[#FDF8EE] rounded-[20px] flex items-center justify-center ${className}`}>
      {/* Inner Circle with Border */}
      <div 
        className="w-[50px] h-[50px] bg-[#FDEFC8] rounded-full flex items-center justify-center border-[2.5px]"
        style={{ borderColor: strokeColor }}
      >
        {/* User Icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#33363F" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
        </svg>
      </div>
    </div>
  );
}

export default People;
