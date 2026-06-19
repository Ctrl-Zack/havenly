'use client';

import React, { useState } from 'react';
import { ModalWrapper } from './modal-wrapper';

type FinishedTaskModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onSelectOption?: (option: string) => void;
};

const SmileIcon = ({ stroke }: { stroke: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const BreakIcon = ({ stroke }: { stroke: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15V9" />
    <path d="M2 15h20" />
    <path d="M20 15V9a2 2 0 0 0-2-2h-3l-2.5 4.5H8" />
    <path d="M12 11h-4" />
    <path d="M4 19v-4" />
    <path d="M20 19v-4" />
  </svg>
);

const FlagIcon = ({ stroke }: { stroke: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" y1="22" x2="4" y2="15" />
  </svg>
);

const options = [
  { id: 'start_new', label: 'Start New Task', icon: SmileIcon },
  { id: 'take_break', label: 'Take a Break', icon: BreakIcon },
  { id: 'done_today', label: 'Done for Today', icon: FlagIcon },
];

export function FinishedTaskModal({ isOpen = true, onClose, onSelectOption }: FinishedTaskModalProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    if (onSelectOption) onSelectOption(id);
    // Auto close after a short delay for better UX
    if (onClose) {
      setTimeout(() => onClose(), 400);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-full pt-[32px] pb-[32px] px-[20px] flex flex-col items-center text-center">
        
        {/* Title */}
        <h1 className="font-serif text-[32px] font-bold text-[#1A1A1A] tracking-tight mb-[32px]">
          Congratulations!
        </h1>

        {/* Inner Content Box */}
        <div className="w-full max-w-[348px] bg-[#FDEFC8] rounded-[32px] p-[24px] border border-[#FBDE8C] flex flex-col items-center">
          
          <h2 className="font-serif text-[20px] font-bold text-[#1A1A1A] mb-[4px]">
            How are you feeling?
          </h2>
          <p className="font-sans text-[13px] text-[#1A1A1A]/60 mb-[24px]">
            Share your feelings about completing this task.
          </p>

          <div className="flex flex-col gap-4 w-full px-2">
            {options.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full h-[56px] rounded-full flex items-center justify-center gap-3 transition-all duration-300 focus:outline-none ${
                    isSelected 
                      ? 'bg-[#1A1A1A] text-white border-2 border-[#1A1A1A] scale-[1.02] shadow-md' 
                      : 'bg-transparent text-[#1A1A1A] border-2 border-[#1A1A1A] hover:bg-black/5 active:bg-black/10'
                  }`}
                >
                  <opt.icon stroke={isSelected ? 'white' : '#1A1A1A'} />
                  <span className="font-semibold text-[15px]">{opt.label}</span>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </ModalWrapper>
  );
}

export default FinishedTaskModal;
