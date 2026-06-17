'use client';

import React from 'react';
import { ModalWrapper } from './modal-wrapper';

type TimesUpModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onTakeBreak?: () => void;
  onContinue?: () => void;
};

export function TimesUpModal({ isOpen = true, onClose, onTakeBreak, onContinue }: TimesUpModalProps) {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-full pt-[40px] pb-[32px] px-[32px] flex flex-col items-center text-center">
        
        {/* Title */}
        <h2 className="font-serif text-[36px] font-bold text-[#1A1A1A] tracking-tight mb-[16px]">
          Time's Up!
        </h2>

        {/* Description */}
        <p className="font-sans text-[15px] text-[#1A1A1A]/70 leading-relaxed max-w-[280px] mb-[40px]">
          You've been focusing for 25 minutes. Let's take a quick break to stretch and drink some water.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 w-full">
          <button
            onClick={() => {
              if (onTakeBreak) onTakeBreak();
              if (onClose) onClose();
            }}
            className="flex-1 h-[52px] rounded-full border-2 border-[#1A1A1A] bg-transparent flex items-center justify-center text-[#1A1A1A] font-semibold text-[15px] hover:bg-black/5 active:bg-black/10 transition-colors focus:outline-none focus:ring-4 focus:ring-black/10"
          >
            Take a Break
          </button>
          
          <button
            onClick={() => {
              if (onContinue) onContinue();
              if (onClose) onClose();
            }}
            className="flex-1 h-[52px] rounded-full bg-[#1A1A1A] flex items-center justify-center gap-2 text-white font-semibold text-[15px] hover:bg-black active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-black/20"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3L19 12L5 21V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Continue
          </button>
        </div>

      </div>
    </ModalWrapper>
  );
}

export default TimesUpModal;
