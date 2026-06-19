'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField } from './text-field';
import { Feeling } from './feeling';

export function AITaskForm() {
  const router = useRouter();
  const [taskText, setTaskText] = useState('');
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-300 h-full pb-[20px] pt-[24px]">
      
      {/* Feeling Component */}
      <div className="w-full flex justify-center px-1 mb-[20px]">
        <Feeling onChange={(emo, energy) => {
          setIsReady(emo !== null && energy !== null);
        }} />
      </div>

      {/* Chat Input Section */}
      <div className="w-full px-1">
        <TextField 
          value={taskText} 
          onChange={setTaskText} 
          placeholder="Type your task here..." 
          onSubmit={() => router.push('/task/ai-processing')}
          containerClassName="min-h-[64px] h-auto rounded-[32px] pl-5 pr-2 py-2 bg-white shadow-sm border-2 border-transparent focus-within:border-[#1A1A1A] transition-all"
        />
      </div>

      {/* Submit Button */}
      {isReady && (
        <div className="mt-6 animate-in slide-in-from-bottom-4 fade-in duration-200 w-full flex justify-end px-2">
          <button
            className="rounded-full bg-[#1A1A1A] text-white px-6 h-14 flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg font-semibold"
            onClick={() => router.push('/task/ai-processing')}
          >
            <span>Generate Plan</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
