'use client';

import React, { useState } from 'react';
import { TextField } from './text-field';
import { Feeling } from './feeling';

export function AITaskForm() {
  const [taskText, setTaskText] = useState('');
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-300 h-full pb-[20px]">
      {/* Title */}
      <h1 className="font-serif text-[32px] font-bold text-[#1A1A1A] tracking-tight mt-[48px] mb-[24px]">
        What's the one thing?
      </h1>

      {/* Text Field */}
      <TextField 
        value={taskText} 
        onChange={setTaskText} 
        placeholder="Type your task here..." 
        onSubmit={() => console.log('Task submitted:', taskText)}
      />

      {/* Spacer */}
      <div className="flex-1" />

      {/* Feeling Component */}
      <div className="w-full max-w-[348px]">
        <Feeling onChange={(emo, energy) => {
          setIsReady(emo !== null && energy !== null);
        }} />
      </div>

      {/* Submit Button */}
      {isReady && (
        <div className="mt-6 animate-in slide-in-from-bottom-4 fade-in duration-200">
          <button
            className="rounded-full bg-[#1A1A1A] text-white w-14 h-14 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
            onClick={() => console.log('AI Task Submitted')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
