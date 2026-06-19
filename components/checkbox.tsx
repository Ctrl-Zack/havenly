'use client';

import React from 'react';

type CheckboxProps = {
  id?: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export function Checkbox({ id, label, checked, onChange }: CheckboxProps) {
  const inputId = id || label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        role="checkbox"
        id={inputId}
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-5 h-5 rounded-[6px] border-2 flex items-center justify-center transition-colors ${
          checked 
            ? 'bg-[#1a1a1a] border-[#1a1a1a]' 
            : 'bg-transparent border-[#a5a5a5] hover:border-[#1a1a1a]'
        }`}
      >
        {checked && (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>
      <label 
        htmlFor={inputId}
        onClick={() => onChange(!checked)}
        className="font-['Poppins',sans-serif] text-[14px] text-[#a5a5a5] cursor-pointer select-none hover:text-[#1a1a1a] transition-colors"
      >
        {label}
      </label>
    </div>
  );
}

export default Checkbox;
