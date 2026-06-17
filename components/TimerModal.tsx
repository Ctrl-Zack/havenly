'use client';

import React, { useState } from 'react';
import { ModalWrapper } from './modal-wrapper';

type TimerModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onStart?: (hours: number, minutes: number) => void;
};

export function TimerModal({ isOpen = true, onClose, onStart }: TimerModalProps) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(25);
  const [second, setSecond] = useState(0);

  const adjustTime = (type: 'hour' | 'minute' | 'second', amount: number) => {
    if (type === 'hour') {
      setHour(prev => Math.max(0, Math.min(23, prev + amount)));
    } else if (type === 'minute') {
      setMinute(prev => {
        const newMin = prev + amount;
        if (newMin >= 60) {
          setHour(h => Math.min(23, h + 1));
          return newMin - 60;
        }
        if (newMin < 0) {
          if (hour > 0) {
            setHour(h => h - 1);
            return newMin + 60;
          }
          return 0;
        }
        return newMin;
      });
    } else {
      setSecond(prev => {
        const newSec = prev + amount;
        if (newSec >= 60) {
          setMinute(m => Math.min(59, m + 1));
          return newSec - 60;
        }
        if (newSec < 0) {
          if (minute > 0 || hour > 0) {
            setMinute(m => m > 0 ? m - 1 : 59);
            return newSec + 60;
          }
          return 0;
        }
        return newSec;
      });
    }
  };

  const totalSeconds = hour * 3600 + minute * 60 + second;
  let displayTitle = '';
  const parts = [];

  if (hour > 0)
     parts.push(`${hour} hr`);

  if (minute > 0)
    parts.push(`${minute} min`);

  if (second > 0)
    parts.push(`${second} sec`);

  displayTitle = parts.join(' ');

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} variant="bottom-sheet">
      <div className="w-full pt-[12px] pb-[24px] px-[24px] flex flex-col items-center">
        
        {/* Header */}
        <div className="w-full flex items-center justify-center relative mb-8">
          <div className="absolute left-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4" />
              <path d="M12 18v4" />
              <path d="M4.93 4.93l2.83 2.83" />
              <path d="M16.24 16.24l2.83 2.83" />
              <path d="M2 12h4" />
              <path d="M18 12h4" />
              <path d="M4.93 19.07l2.83-2.83" />
              <path d="M16.24 7.76l2.83-2.83" />
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4l3 3" />
            </svg>
          </div>
          <h2 className="font-serif text-[28px] font-bold text-[#1A1A1A]">
            {displayTitle}
          </h2>
        </div>

        {/* Time Selector */}
        <div className="w-full h-[120px] bg-[#FDEFC8] rounded-[32px] flex items-center justify-center border border-[#1A1A1A]/5 shadow-sm mb-8">
          <div className="flex items-center gap-6 font-serif text-[32px] font-bold text-[#1A1A1A]">
            
            {/* Hours */}
            <div className="flex flex-col items-center gap-2">
              <button onClick={() => adjustTime('hour', 1)} className="text-[#1A1A1A] hover:scale-125 transition-transform focus:outline-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
              <span className="w-[50px] text-center">{hour.toString().padStart(2, '0')}</span>
              <button onClick={() => adjustTime('hour', -1)} className="text-[#1A1A1A] hover:scale-125 transition-transform focus:outline-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            <span className="mb-1">:</span>

            {/* Minutes */}
            <div className="flex flex-col items-center gap-2">
              <button onClick={() => adjustTime('minute', 5)} className="text-[#1A1A1A] hover:scale-125 transition-transform focus:outline-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
              <span className="w-[50px] text-center">{minute.toString().padStart(2, '0')}</span>
              <button onClick={() => adjustTime('minute', -5)} className="text-[#1A1A1A] hover:scale-125 transition-transform focus:outline-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

            <span className="mb-1">:</span>

            {/* Seconds */}
            <div className="flex flex-col items-center gap-2">
              <button onClick={() => adjustTime('second', 5)} className="text-[#1A1A1A] hover:scale-125 transition-transform focus:outline-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15" />
                </svg>
              </button>
              <span className="w-[50px] text-center">{second.toString().padStart(2, '0')}</span>
              <button onClick={() => adjustTime('second', -5)} className="text-[#1A1A1A] hover:scale-125 transition-transform focus:outline-none">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4 w-full">
          <button
            onClick={onClose}
            className="flex-1 h-[56px] rounded-full border-2 border-[#1A1A1A] bg-transparent flex items-center justify-center text-[#1A1A1A] font-semibold text-[16px] hover:bg-black/5 active:bg-black/10 transition-colors focus:outline-none focus:ring-4 focus:ring-black/10"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (onStart) onStart(hour, minute);
              if (onClose) onClose();
            }}
            className="flex-1 h-[56px] rounded-full bg-[#1A1A1A] flex items-center justify-center gap-2 text-white font-semibold text-[16px] hover:bg-black active:scale-[0.98] transition-all focus:outline-none focus:ring-4 focus:ring-black/20"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3L19 12L5 21V3Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Let's Go
          </button>
        </div>

      </div>
    </ModalWrapper>
  );
}

export default TimerModal;
