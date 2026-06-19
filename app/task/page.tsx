'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/navbar';
import Task from '@/components/task';
import DateWidget from '@/components/date-widget';
import { CrisisButton } from '@/components/crisis-button';
import { MonthSelector } from '@/components/month-selector';

// --- DUMMY DATA ---
type DummyTask = {
  id: string;
  title: string;
  subtitle: string;
  date: Date;
  variant: 'normal' | 'high-contrast';
};

// Generate some dummy tasks spread across a few months
const generateDummyTasks = (): DummyTask[] => {
  const tasks: DummyTask[] = [];
  const today = new Date();

  // A helper to create dates relative to today
  const createDate = (monthOffset: number, day: number) => {
    const d = new Date(today.getFullYear(), today.getMonth() + monthOffset, day);
    return d;
  };

  tasks.push({
    id: '1',
    title: 'Final Project Network Programming',
    subtitle: 'Lorem Ipsum Dolor Sit Amet.',
    date: createDate(0, 3), // Current month, 3rd
    variant: 'normal',
  });

  tasks.push({
    id: '2',
    title: 'ITS Website Migration',
    subtitle: 'Lorem Ipsum Dolor Sit Amet.',
    date: createDate(0, 2), // Current month, 2nd
    variant: 'normal',
  });

  tasks.push({
    id: '3',
    title: 'Final Project Database Management',
    subtitle: 'Lorem Ipsum Dolor Sit Amet.',
    date: createDate(0, 2), // Current month, 2nd
    variant: 'normal', // Figma shows them all as normal (yellow) on this screen
  });

  tasks.push({
    id: '4',
    title: 'Prepare Midterm Materials',
    subtitle: 'Lorem Ipsum Dolor Sit Amet.',
    date: createDate(1, 15), // Next month, 15th
    variant: 'normal',
  });

  tasks.push({
    id: '5',
    title: 'Finish UI/UX Design Mockups',
    subtitle: 'Lorem Ipsum Dolor Sit Amet.',
    date: createDate(-1, 28), // Previous month, 28th
    variant: 'normal',
  });

  return tasks;
};

const ALL_TASKS = generateDummyTasks();

// --- HELPER FUNCTIONS ---
const getMonthName = (date: Date) => {
  return date.toLocaleDateString('en-US', { month: 'long' });
};

const isSameMonthAndYear = (d1: Date, d2: Date) => {
  return d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear();
};

export default function TaskPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // State for Month Selector
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const handlePrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Derived state: Adjacent month names
  const prevMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
  const nextMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);

  // Filter tasks by selected month
  const filteredTasks = useMemo(() => {
    return ALL_TASKS.filter(task => isSameMonthAndYear(task.date, currentDate))
      .sort((a, b) => b.date.getTime() - a.date.getTime()); // Sort descending by date
  }, [currentDate]);

  // Group tasks by date string
  const groupedTasks = useMemo(() => {
    const groups: Record<string, DummyTask[]> = {};
    filteredTasks.forEach(task => {
      const dateStr = task.date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
      if (!groups[dateStr]) groups[dateStr] = [];
      groups[dateStr].push(task);
    });
    return groups;
  }, [filteredTasks]);

  // Navigation handlers
  const handleSeeSubtask = (id: string) => {
    router.push(`/task/list?id=${id}`);
  };

  const handleCreateTask = () => {
    router.push('/dashboard');
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#b3dcd1] to-[#418b7e] font-['Poppins',sans-serif]">

      {/* Background blobs */}
      <div className="absolute h-[318px] left-[-81px] top-[-72px] w-[345px] pointer-events-none z-0 mix-blend-overlay opacity-50">
        <Image alt="" src="/assets/login-bg-blob.svg" fill className="object-contain" priority />
      </div>

      {/* Main Content Area */}
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-hide">

        {/* Top Header Section (Transparent) */}
        <div className="w-full max-w-[400px] mx-auto relative z-20 pt-[60px] px-6">

          {/* Red Siren Button */}
          <CrisisButton onClick={() => router.push('/crisis-mode')} className="absolute top-[20px] left-[20px]" />

          {/* Transparent DateWidget Wrapper */}
          <div className="-ml-6 -mr-6 flex justify-center w-[calc(100%+48px)] mt-[60px]">
            <DateWidget variant="transparent" />
          </div>
        </div>

        {/* Bottom White Container with Tasks */}
        <div className="w-full max-w-[400px] mx-auto bg-[#FEFDF6] rounded-t-[40px] flex-1 mt-4 relative z-20 pb-[180px] px-4 pt-6 min-h-[500px] shadow-lg">

          {/* Month Selector */}
          {mounted && (
            <MonthSelector
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
            />
          )}

          {/* Task List / Empty State */}
          <div className="w-full flex flex-col gap-8">
            {!mounted ? (
              <div className="flex items-center justify-center p-8">
                <span className="text-black/50 text-sm">Loading tasks...</span>
              </div>
            ) : filteredTasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center mt-4 p-8 text-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-2 font-serif">No tasks for this month</h3>
                <p className="text-[14px] text-[#1A1A1A]/70 mb-6">Start planning your goals!</p>

                <button
                  onClick={handleCreateTask}
                  className="bg-[#1A1A1A] text-white px-6 py-3 rounded-full font-semibold text-[14px] hover:bg-black/80 transition-colors"
                >
                  Create Task
                </button>
              </div>
            ) : (
              Object.entries(groupedTasks).map(([dateStr, tasks]) => (
                <div key={dateStr} className="flex flex-col gap-4">
                  <p className="text-[14px] font-medium text-[#1A1A1A] ml-2">
                    {dateStr}
                  </p>
                  <div className="flex flex-col gap-5">
                    {tasks.map((task, index) => (
                      <Task
                        key={task.id}
                        index={index + 1}
                        title={task.title}
                        subtitle={task.subtitle}
                        variant={task.variant}
                        onSeeSubtask={() => handleSeeSubtask(task.id)}
                        className="w-full shrink-0"
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Bottom Navbar */}
      <Navbar menu="Home" theme="Dark" className="bottom-[20px] z-30" />
    </div>
  );
}
