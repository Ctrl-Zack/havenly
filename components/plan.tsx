'use client';

export function Plan({ className, onAddClick }: { className?: string; onAddClick?: () => void }) {
  return (
    <div className={`relative w-full max-w-[400px] aspect-[368/190] ${className || ""}`}>
      {/* SVG Background with Cutout */}
      <svg width="100%" height="100%" viewBox="0 0 368 190" preserveAspectRatio="none" className="absolute top-0 left-0 pointer-events-none z-0">
        <defs>
          <clipPath id="plan-card-clip">
            <path d="M40 0 H328 A40 40 0 0 1 368 40 V111.36 A 56 56 0 0 0 289.36 190 H40 A40 40 0 0 1 0 150 V40 A40 40 0 0 1 40 0 Z" />
          </clipPath>
        </defs>
        
        {/* Base Yellow Background */}
        <path d="M40 0 H328 A40 40 0 0 1 368 40 V111.36 A 56 56 0 0 0 289.36 190 H40 A40 40 0 0 1 0 150 V40 A40 40 0 0 1 40 0 Z" fill="#fbd776" />
        
        {/* Decorative Wavy Lines */}
        <g clipPath="url(#plan-card-clip)">
          <path d="M -20 80 C 60 120 100 0 160 30 C 220 60 200 160 260 120 C 320 80 360 20 400 40" stroke="#f6c95a" strokeWidth="24" strokeLinecap="round" fill="none" />
          <path d="M 40 220 C 100 150 160 180 220 140 C 280 100 320 200 380 160" stroke="#f6c95a" strokeWidth="24" strokeLinecap="round" fill="none" />
        </g>
      </svg>

      {/* Top Left Icon Blob */}
      <div className="absolute top-[8.4%] left-[4.3%] z-10 w-[15.2%] aspect-square rounded-full bg-[#f6c95a] flex items-center justify-center">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="5" y="5" width="14" height="16" rx="2" fill="#151515"/>
          <rect x="9" y="3" width="6" height="4" rx="1" fill="#151515"/>
          <rect x="8" y="11" width="5" height="2" rx="1" fill="#fbd776"/>
          <rect x="8" y="15" width="8" height="2" rx="1" fill="#fbd776"/>
        </svg>
      </div>

      {/* Text Content */}
      <div className="absolute top-[42%] left-[6.5%] flex flex-col z-10">
        <h2 className="font-serif text-[clamp(24px,7vw,28px)] font-semibold text-[#151515] leading-[1.1] tracking-tight">
          What's your plan?
        </h2>
        <p className="font-sans text-[14px] text-[#151515]/80 mt-[8px] max-w-[220px] leading-snug">
          Let's make today structured and stress-free.
        </p>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (onAddClick) {
            onAddClick();
          } else {
            console.log("Add plan clicked");
          }
        }}
        className="absolute bottom-0 right-0 z-20 flex w-[21.7%] aspect-square items-center justify-center rounded-[40px] bg-[#151515] text-white hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-xl focus:outline-none focus:ring-4 focus:ring-black/20 cursor-pointer"
      >
        <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

export default Plan;
