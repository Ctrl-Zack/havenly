'use client';

import React, { useState } from 'react';

type TextFieldProps = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
  type?: 'text' | 'password' | 'email';
  label?: string;
  hideSubmitButton?: boolean;
  containerClassName?: string;
  inputClassName?: string;
};

export function TextField({ 
  value, 
  onChange, 
  placeholder = 'Type your task here...', 
  onSubmit,
  type = 'text',
  label,
  hideSubmitButton = false,
  containerClassName = "h-[64px] rounded-[32px] pl-5 pr-2",
  inputClassName = "text-[15px]"
}: TextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="relative flex flex-col w-full">
      {label && (
        <div className="absolute left-[20px] top-[-10px] bg-[#fcfee8] px-[4px] z-10">
          <span className="font-['Poppins',sans-serif] text-[#151515] text-[12px] leading-[16px] whitespace-nowrap">
            {label}
          </span>
        </div>
      )}
      
      <div className={`relative flex items-center w-full max-w-full border-2 border-[#1A1A1A] bg-transparent overflow-hidden focus-within:ring-2 focus-within:ring-black/10 transition-shadow ${containerClassName}`}>
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && onSubmit) {
              onSubmit();
            }
          }}
          placeholder={placeholder}
          className={`flex-1 h-full bg-transparent outline-none text-[#1A1A1A] placeholder:text-[#a5a5a5] font-['Poppins',sans-serif] ${inputClassName}`}
        />
        
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="mr-3 text-[#a5a5a5] hover:text-[#1a1a1a] focus:outline-none"
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}

        {!hideSubmitButton && (
          <button
            type="button"
            onClick={onSubmit}
            className="w-[40px] h-[40px] shrink-0 bg-[#1A1A1A] rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 focus:outline-none ml-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default TextField;
