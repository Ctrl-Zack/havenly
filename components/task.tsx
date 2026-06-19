'use client';

import React from 'react';

export type TaskVariant = 'normal' | 'high-contrast';

export type TaskProps = {
  index?: number;
  title?: string;
  subtitle?: string;
  variant?: TaskVariant;
  onSeeSubtask?: () => void;
  className?: string;
};

export function Task({
  index = 1,
  title = 'Final Project HCI',
  subtitle = 'Lorem Ipsum Dolor Sit Amet.',
  variant = 'normal',
  onSeeSubtask,
  className = '',
}: TaskProps) {
  const isNormal = variant === 'normal';

  // Normal Variant Colors
  const cardBg = isNormal ? 'bg-[#FDEFC8]' : 'bg-white';
  const textColor = '#1A1A1A';
  const subtitleColor = isNormal ? 'text-[#1A1A1A]/50' : 'text-[#1A1A1A]/40';
  const cornerBg = isNormal ? 'bg-[#FDF6E5]' : 'bg-[#1A1A1A]'; // FDF6E5 is a light cream
  const numberColor = isNormal ? 'text-[#1A1A1A]' : 'text-white';
  const numberCircleBg = isNormal ? 'bg-transparent' : 'bg-white';
  const buttonBg = isNormal ? 'bg-[#FACE68]' : 'bg-[#1A1A1A]';
  const buttonText = isNormal ? 'text-[#1A1A1A]' : 'text-white';

  return (
    <div 
      className={`relative w-[368px] min-h-[168px] rounded-[32px] overflow-hidden flex flex-col justify-between p-[24px] ${cardBg} ${className}`}
      style={{
        boxShadow: isNormal ? 'none' : '0px 8px 24px rgba(0,0,0,0.05)',
        border: isNormal ? '5px solid #FBDE8C' : '5px solid #1A1A1A',
      }}
    >
      {/* Top-Left Corner Shape */}
      <div 
        className={`absolute top-0 left-0 w-[64px] h-[64px] rounded-br-[24px] flex items-center justify-center ${cornerBg} z-0`}
      >
        {/* Anti-aliasing corner curves (simulated with box-shadows) */}
        <div 
          className="absolute top-0 left-[100%] w-[24px] h-[24px] rounded-tl-[24px] pointer-events-none"
          style={{ boxShadow: `-12px -12px 0 12px ${isNormal ? '#FDF6E5' : '#1A1A1A'}` }}
        />
        <div 
          className="absolute top-[100%] left-0 w-[24px] h-[24px] rounded-tl-[24px] pointer-events-none"
          style={{ boxShadow: `-12px -12px 0 12px ${isNormal ? '#FDF6E5' : '#1A1A1A'}` }}
        />

        {/* Index Circle */}
        <div className={`relative z-10 w-[40px] h-[40px] rounded-full flex items-center justify-center ${numberCircleBg}`}>
          <span className={`font-serif text-[24px] font-bold ${numberColor} ${!isNormal ? 'text-[#1A1A1A]' : ''}`}>
            {index}
          </span>
        </div>
      </div>

      {/* Top Row: Button */}
      <div className="relative z-10 flex justify-end w-full">
        <button
          onClick={onSeeSubtask}
          className={`h-[48px] px-[20px] rounded-full flex items-center justify-center gap-2 font-semibold text-[15px] transition-transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-black/10 ${buttonBg} ${buttonText}`}
        >
          See Subtask
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="mt-[2px]">
            <path d="M5 3L19 12L5 21V3Z" />
          </svg>
        </button>
      </div>

      {/* Bottom Row: Text */}
      <div className="relative z-10 flex flex-col mt-[20px]">
        <h3 className="font-serif text-[24px] font-bold leading-tight" style={{ color: textColor }}>
          {title}
        </h3>
        <p className={`font-sans text-[14px] mt-1 ${subtitleColor}`}>
          {subtitle}
        </p>
      </div>
    </div>
  );
}

export default Task;
