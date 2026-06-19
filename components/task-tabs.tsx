'use client';

import React from 'react';

type TaskTabsProps = {
  selectedTab: 'ai' | 'manual';
  onTabChange: (tab: 'ai' | 'manual') => void;
};

export function TaskTabs({ selectedTab, onTabChange }: TaskTabsProps) {
  return (
    <div className="relative flex items-center p-1 border border-[#1A1A1A] rounded-[24px] w-full shrink-0 h-[52px] bg-[#F2EAE0]">
      
      {/* Sliding Pill Background */}
      <div 
        className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#1A1A1A] rounded-[20px] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          transform: selectedTab === 'ai' ? 'translateX(0)' : 'translateX(100%)',
        }}
      />

      <button
        onClick={() => onTabChange('ai')}
        className={`relative z-10 flex-1 flex items-center justify-center gap-2 h-full rounded-[20px] transition-colors duration-300 ${
          selectedTab === 'ai' ? 'text-white' : 'text-[#1A1A1A] hover:bg-black/5'
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 3v3m0 12v3M3 12h3m12 0h3M7 7l2 2m6 6l2 2m0-10l-2 2m-6 6l-2 2" />
        </svg>
        <span className="font-semibold text-[14px] whitespace-nowrap">AI Decomposition</span>
      </button>
      
      <button
        onClick={() => onTabChange('manual')}
        className={`relative z-10 flex-1 flex items-center justify-center gap-2 h-full rounded-[20px] transition-colors duration-300 ${
          selectedTab === 'manual' ? 'text-white' : 'text-[#1A1A1A] hover:bg-black/5'
        }`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <span className="font-semibold text-[14px] whitespace-nowrap">Manual</span>
      </button>
    </div>
  );
}
