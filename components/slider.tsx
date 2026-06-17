'use client';

import React, { useState } from 'react';

type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  className?: string;
};

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue = 50,
  onChange,
  className = "",
}: SliderProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  const percentage = (currentValue - min) / (max - min);

  return (
    <div 
      className={`relative flex items-center w-[280px] h-[20px] ${className}`}
      style={{ '--percentage': percentage } as React.CSSProperties}
    >
      {/* Background Track */}
      <div className="absolute left-0 right-0 h-[6px] bg-[#c4c4c4] rounded-full pointer-events-none" />
      
      {/* Filled Track */}
      <div 
        className="absolute left-0 h-[6px] bg-[#151515] rounded-full pointer-events-none"
        style={{ width: `calc(var(--percentage) * (100% - 20px) + 10px)` }}
      />
      
      {/* Custom Thumb */}
      <div 
        className="absolute top-0 h-[20px] w-[20px] bg-[#151515] rounded-full pointer-events-none shadow-sm"
        style={{ left: `calc(var(--percentage) * (100% - 20px))` }}
      />

      {/* Invisible Range Input for Native Interaction */}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentValue}
        onChange={handleChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer m-0"
      />
    </div>
  );
}

export default Slider;
