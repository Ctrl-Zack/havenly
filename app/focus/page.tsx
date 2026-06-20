'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CrisisButton } from '@/components/crisis-button';
import { TextLabel } from '@/components/task-label';
import { RoomTimer } from '@/components/room-timer';

export default function FocusModePage() {
  const router = useRouter();

  const handleFinish = () => {
    // Navigate somewhere or mark done
    router.push('/dashboard');
  };

  return (
    <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#b3dcd1] to-[#418b7e] font-['Poppins',sans-serif]">
      {/* Background blob */}
      <div className="absolute h-[318px] left-[-81px] top-[-72px] w-[345px] pointer-events-none z-0 mix-blend-overlay opacity-50">
        <Image alt="" src="/assets/login-bg-blob.svg" fill className="object-contain" priority />
      </div>

      {/* Top Section */}
      <div className="w-full max-w-[400px] mx-auto relative z-20 pt-[60px] px-6">
        <CrisisButton onClick={() => router.push('/crisis-mode')} className="absolute top-[20px] left-[20px]" />
      </div>

      {/* Main Content Card */}
      <div className="absolute top-[100px] bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-[#FCFEE8] rounded-t-[48px] shadow-2xl pt-[24px] px-6 flex flex-col items-center">
        
        {/* Task Label */}
        <div className="mb-[16px] mt-[10px]">
          <TextLabel 
            className="relative w-[270px]"
            label="Current Task" 
            task="Open the document" 
          />
        </div>

        {/* Timer */}
        <div className="w-full flex justify-center mt-[45px] mb-[5px]">
          <RoomTimer initialMinutes={1} autoStart={false} onFinish={handleFinish} />
        </div>

        {/* Exit Focus Mode */}
        <button 
          onClick={() => router.back()}
          className="absolute bottom-[20px] flex items-center gap-2 hover:opacity-70 transition-opacity"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="#767676" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-['Poppins',sans-serif] text-[12px] text-[#767676] underline decoration-[#767676]">
            Exit Focus Mode
          </span>
        </button>
        
      </div>
    </div>
  );
}
