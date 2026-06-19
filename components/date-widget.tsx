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

export default function DateWidget() {
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toDateString());
  const calendar = buildCurrentWeek();
  
  const selectedDayObj = calendar.days.find(d => d.dateString === selectedDate);
  const displayTitle = selectedDayObj ? selectedDayObj.fullDate.toLocaleDateString('en-US', { weekday: 'long' }) : calendar.title;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <section className="max-w-md rounded-[40px] bg-white p-6 text-[#1a1a1a] shadow-[0_24px_60px_rgba(0,0,0,0.12)] min-h-[160px]" />; // Skeleton
  }

  return (
    <section className="max-w-md rounded-[40px] bg-white p-6 text-[#1a1a1a] shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
      <div className="flex flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[48px] leading-[48px] font-serif font-bold tracking-[-0.02em]">
            {displayTitle}
          </h2>
          <p className="text-sm font-semibold text-[#151515]">{calendar.monthYear}</p>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {calendar.days.map((day) => {
            const isSelected = day.dateString === selectedDate;
            return (
              <button 
                key={day.label} 
                onClick={() => setSelectedDate(day.dateString)}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <span className={`text-[14px] font-semibold transition-colors ${isSelected ? 'text-[#2f685f]' : 'text-[#2f685f]/70 group-hover:text-[#2f685f]'}`}>
                  {day.label}
                </span>
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-semibold transition-all ${
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
