'use client';

import React from 'react';

export default function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-[#f3f4f6] flex items-center justify-center p-4 sm:p-8">
      {/* Phone Hardware Shell */}
      <div 
        className="relative bg-white shadow-2xl flex flex-col overflow-hidden"
        style={{
          width: '100%',
          maxWidth: '390px',
          aspectRatio: '390 / 844',
          maxHeight: '100dvh',
          borderRadius: '44px',
          border: '12px solid #111111',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px #333'
        }}
      >
        {/* Dynamic Island / Notch */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-[#111111] rounded-full z-50 pointer-events-none" />

        {/* Volume & Power Buttons (Decorative) */}
        <div className="absolute right-[-14px] top-[140px] w-[2px] h-[40px] bg-[#111111] rounded-r-md pointer-events-none" />
        <div className="absolute left-[-14px] top-[120px] w-[2px] h-[40px] bg-[#111111] rounded-l-md pointer-events-none" />
        <div className="absolute left-[-14px] top-[170px] w-[2px] h-[40px] bg-[#111111] rounded-l-md pointer-events-none" />

        {/* Scrollable Screen Content */}
        <div className="flex-1 w-full h-full relative overflow-y-auto overflow-x-hidden scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
}
