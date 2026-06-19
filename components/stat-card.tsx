import React from 'react';

export type StatCardProps = {
  title: string;
  value: string | number;
  subtitle?: string;
  className?: string;
  variant?: 'light' | 'dark' | 'accent' | 'warning';
};

export function StatCard({ title, value, subtitle, className = '', variant = 'light' }: StatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'dark':
        return 'bg-[#1a1a1a] text-white';
      case 'accent':
        return 'bg-[#418B7E] text-white';
      case 'warning':
        return 'bg-[#FACE68] text-[#1a1a1a]';
      case 'light':
      default:
        return 'bg-white/50 backdrop-blur-md text-[#1a1a1a] border border-white/20 shadow-sm';
    }
  };

  return (
    <div className={`p-4 rounded-[24px] flex flex-col justify-center gap-1 transition-all hover:scale-[1.02] cursor-default ${getVariantStyles()} ${className}`}>
      <span className="font-['Poppins',sans-serif] text-[12px] font-medium opacity-80 whitespace-nowrap overflow-hidden text-ellipsis">
        {title}
      </span>
      <div className="font-['Source_Serif_Pro',serif] text-[28px] font-bold leading-tight">
        {value}
      </div>
      {subtitle && (
        <span className="font-['Poppins',sans-serif] text-[10px] font-medium opacity-60">
          {subtitle}
        </span>
      )}
    </div>
  );
}

export default StatCard;
