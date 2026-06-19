'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/button';
import Image from 'next/image';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    // Navigate to the next appropriate page.
    router.push('/register');
  };

  return (
    <div className="bg-gradient-to-b from-[#b3dcd1] to-[#418b7e] to-[62.145%] relative w-full h-full overflow-hidden">
      {/* Background Vector */}
      <div className="absolute h-[1100px] left-[-70px] top-[-39px] w-[589px] pointer-events-none">
        <Image alt="" className="absolute block inset-0 max-w-none w-full h-full object-cover" src="/onboarding-bg-vector.svg" width={589} height={1100} priority />
      </div>

      {/* Content Container Bottom */}
      <div 
        className="-translate-x-1/2 absolute bottom-0 left-1/2 rounded-tl-[48px] rounded-tr-[48px] shadow-[0px_53px_30.9px_60px_rgba(0,0,0,0.04)] h-[486px] w-full max-w-[440px]" 
        style={{ backgroundImage: "linear-gradient(181.57deg, rgb(252, 254, 232) 76.606%, rgb(151, 152, 139) 136.03%)" }} 
      >
        <div className="absolute flex flex-col gap-[48px] items-center left-1/2 -translate-x-1/2 top-[99px] w-[320px]">
          <div className="flex flex-col gap-[16px] items-center text-center w-full">
            <h1 className="font-['Source_Serif_Pro',serif] font-bold leading-[46px] text-[36px] text-[#1a1a1a] w-[297px]">
              A Quiet Place for Busy Mind
            </h1>
            <p className="font-['Poppins',sans-serif] leading-[18px] w-full text-[#a5a5a5] text-[14px]">
              Havenly is designed for ADHD minds—helping you stay focused, organized, and motivated with distraction-free learning that works with your brain, not against it.
            </p>
          </div>
          
          <Button 
            text="Get Started" 
            variant="Dark Neutral"
            size="default" 
            hasIcon={false} 
            className="w-full font-['Poppins',sans-serif] font-semibold text-[16px] leading-[22px]"
            onClick={handleGetStarted}
          />
        </div>
      </div>

      {/* Logo and App Title */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[56px] flex flex-col items-center">
        <div className="overflow-clip size-[200px] relative">
          <Image alt="Logo" className="block w-full h-full object-contain" src="/onboarding-logo.svg" width={200} height={200} priority />
        </div>
        <p className="font-['Source_Serif_Pro',serif] font-bold leading-[46px] text-[36px] text-[#1a1a1a] text-center mt-[20px] whitespace-nowrap">
          Havenly
        </p>
      </div>
    </div>
  );
}
