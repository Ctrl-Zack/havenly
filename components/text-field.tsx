'use client';

import React from 'react';

type TextFieldProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
};

export function TextField({ value, onChange, placeholder = 'Type your task here...', onSubmit }: TextFieldProps) {
  return (
    <div className="relative flex items-center w-full max-w-[348px] h-[64px] border border-[#1A1A1A] rounded-[32px] bg-transparent overflow-hidden pl-5 pr-2 focus-within:ring-2 focus-within:ring-black/10 transition-shadow">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSubmit) {
            onSubmit();
          }
        }}
        placeholder={placeholder}
        className="flex-1 h-full bg-transparent outline-none text-[#1A1A1A] text-[15px] placeholder:text-[#1A1A1A]/40"
      />
      <button
        type="button"
        onClick={onSubmit}
        className="w-[40px] h-[40px] shrink-0 bg-[#1A1A1A] rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default TextField;
