'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AIProcessingPage() {
  const router = useRouter();
  const [stage, setStage] = useState(1);

  useEffect(() => {
    // Sequence of stage changes to simulate AI thinking
    const timer1 = setTimeout(() => setStage(2), 1500);
    const timer2 = setTimeout(() => setStage(3), 2500);

    // Redirect after completion
    const timer3 = setTimeout(() => {
      // In a real app we might wait for an API call to finish.
      // For the scope of this prototype, we simulate the network delay
      // and redirect exactly after 3 seconds.
      router.push('/task/list');
    }, 3000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [router]);

  let primaryText = 'Breaking it down...';
  if (stage === 1) primaryText = 'Analyzing task...';
  else if (stage === 2) primaryText = 'Structuring subtasks...';
  else if (stage === 3) primaryText = 'Finalizing output...';

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#b3dcd1] to-[#418b7e] font-['Poppins',sans-serif] flex flex-col items-center justify-center">

      {/* Background blobs / Graphic from Figma */}
      <div className="absolute h-[1100px] left-[-70px] top-[-40px] w-[590px] z-0 pointer-events-none">
        <Image alt="" src="/assets/ai-loading-bg.svg" fill className="object-cover" priority />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">

        {/* Custom CSS for float animation */}
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes gentle-float {
            0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
            50% { transform: translateY(-8px) scale(1.02); opacity: 0.9; }
          }
          .animate-gentle-float {
            animation: gentle-float 3s ease-in-out infinite;
          }
        `}} />

        {/* AI Sparkles Icon */}
        <div className="mb-[40px] animate-gentle-float text-[#F2EAE0]">
          <svg width="160" height="160" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Center large star */}
            <path d="M50 15 C 50 40, 55 45, 80 45 C 55 45, 50 50, 50 75 C 50 50, 45 45, 20 45 C 45 45, 50 40, 50 15 Z" fill="currentColor" />
            {/* Top right small star */}
            <path d="M78 12 C 78 22, 80 24, 90 24 C 80 24, 78 26, 78 36 C 78 26, 76 24, 66 24 C 76 24, 78 22, 78 12 Z" fill="currentColor" />
            {/* Bottom left small star */}
            <path d="M28 65 C 28 72, 29 73, 36 73 C 29 73, 28 74, 28 81 C 28 74, 27 73, 20 73 C 27 73, 28 72, 28 65 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Primary Text (Animated stages) */}
        <h2 className="font-serif text-[36px] leading-[46px] font-bold text-[#F2EAE0] mb-0 transition-all duration-300">
          {primaryText}
        </h2>

        {/* Secondary Text */}
        <p className="text-[14px] leading-[18px] text-[#F2EAE0] font-normal">
          Making it easy and manageable
        </p>

      </div>
    </div>
  );
}
