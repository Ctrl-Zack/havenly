'use client';

import { useState, useEffect } from 'react';

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type CalendarDay = {
  label: string;
  date: number;
  isToday: boolean;
  dateString: string;
  fullDate: Date;
};

function buildCurrentWeek(): { title: string; monthYear: string; days: CalendarDay[] } {
  const today = new Date();
  const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });
  const monthYear = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const days = dayLabels.map((label, index) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + index);
    return {
      label,
      date: day.getDate(),
      isToday: day.toDateString() === today.toDateString(),
      dateString: day.toDateString(),
      fullDate: day,
    };
  });

  return {
    title: weekday,
    monthYear,
    days,
  };
}

export default function DateWidget({ variant = 'card' }: { variant?: 'card' | 'transparent' }) {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toDateString());
  const calendar = buildCurrentWeek();
  
  const selectedDayObj = calendar.days.find(d => d.dateString === selectedDate);
  const displayTitle = selectedDayObj ? selectedDayObj.fullDate.toLocaleDateString('en-US', { weekday: 'long' }) : calendar.title;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const containerClasses = variant === 'card' 
    ? 'w-full max-w-[340px] rounded-[32px] bg-white p-5 text-[#1a1a1a] shadow-[0_24px_60px_rgba(0,0,0,0.12)]' 
    : 'w-full max-w-[340px] pt-8 px-6 pb-2 text-[#1a1a1a]';

  if (!mounted) {
    return <section className={`${containerClasses} min-h-[140px]`} />; // Skeleton
  }

  return (
    <section className={containerClasses}>
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-2">
          <h2 className="text-[36px] leading-[40px] font-serif font-bold tracking-[-0.02em]">
            {displayTitle}
          </h2>
          <p className="text-[13px] font-semibold text-[#151515] pb-1">{calendar.monthYear}</p>
        </div>

        <div className="flex justify-between w-full">
          {calendar.days.map((day) => {
            const isSelected = day.dateString === selectedDate;
            return (
              <button 
                key={day.label} 
                onClick={() => setSelectedDate(day.dateString)}
                className="flex flex-col items-center gap-1 cursor-pointer group"
              >
                <span className={`text-[12px] font-semibold transition-colors ${isSelected ? 'text-[#2f685f]' : 'text-[#2f685f]/70 group-hover:text-[#2f685f]'}`}>
                  {day.label}
                </span>
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[13px] font-semibold transition-all ${
                    isSelected ? 'bg-[#1a1a1a] text-white shadow-md scale-110' : 'text-[#2f685f] group-hover:bg-[#f0f0f0]'
                  }`}
                >
                  {day.date}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
