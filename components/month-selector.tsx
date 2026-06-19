'use client';

import React from 'react';

type MonthSelectorProps = {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
};

const getMonthName = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'long' });
};

export function MonthSelector({ currentDate, onPrevMonth, onNextMonth }: MonthSelectorProps) {
  const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

  return (
    <div className="flex items-center justify-center gap-4 py-2 mb-8 relative w-full">
      <button onClick={onPrevMonth} className="p-2 transition-transform hover:scale-110 active:scale-95 text-[#1A1A1A]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
        </svg>
      </button>
      
      <div className="flex items-center gap-4">
        <span className="text-[14px] font-medium text-[#FBDE8C]">
          {getMonthName(prevMonthDate)}
        </span>
        <span className="text-[16px] font-semibold text-[#1A1A1A]">
          {getMonthName(currentDate)}
        </span>
        <span className="text-[14px] font-medium text-[#FBDE8C]">
          {getMonthName(nextMonthDate)}
        </span>
      </div>

      <button onClick={onNextMonth} className="p-2 transition-transform hover:scale-110 active:scale-95 text-[#1A1A1A]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </svg>
      </button>
    </div>
  );
}
