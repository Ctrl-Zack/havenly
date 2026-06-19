'use client';

import React, { useState } from 'react';
import { Subtask } from './subtask';

// Generic Input Wrapper with Floating Label to match Figma
const FieldWrapper = ({ label, children }: { label: string, children: React.ReactNode }) => (
  <div className="relative w-full mt-4">
    <div className="absolute left-4 top-0 bg-[#F2EAE0] px-1 -translate-y-1/2 z-10">
      <span className="text-[12px] font-medium text-[#1A1A1A]">
        {label}
      </span>
    </div>
    <div className="border border-[#1A1A1A] rounded-[24px] h-[48px] flex items-center px-4 overflow-hidden focus-within:ring-2 focus-within:ring-black/10 transition-shadow">
      {children}
    </div>
  </div>
);

export function ManualTaskForm({ onSubmit }: { onSubmit?: () => void }) {
  // Form State
  const [taskName, setTaskName] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('Morning');
  const [startDate, setStartDate] = useState('2026-06-08');
  const [startTime, setStartTime] = useState('16:02');
  const [endDate, setEndDate] = useState('2026-06-08');
  const [endTime, setEndTime] = useState('17:02');
  const [repeat, setRepeat] = useState('Never');
  
  // Subtasks State
  const [subtasks, setSubtasks] = useState<{id: string, title: string, order: number}[]>([]);

  const addSubtask = () => {
    setSubtasks([...subtasks, { id: Date.now().toString(), title: '', order: subtasks.length + 1 }]);
  };

  const updateSubtask = (id: string, title: string) => {
    setSubtasks(subtasks.map(st => st.id === id ? { ...st, title } : st));
  };

  const removeSubtask = (id: string) => {
    setSubtasks(subtasks.filter(st => st.id !== id));
  };

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Title */}
      <h2 className="font-serif text-[24px] font-bold text-[#1A1A1A] tracking-tight mt-[32px] mb-[8px]">
        Create task
      </h2>

      {/* Form Fields Container */}
      <div className="w-full flex flex-col gap-1 px-1">
        
        {/* Task Name */}
        <FieldWrapper label="Task name">
          <input 
            type="text" 
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full h-full bg-transparent outline-none text-[#1A1A1A] text-[14px]"
          />
        </FieldWrapper>

        {/* Time of day */}
        <FieldWrapper label="Time of day">
          <svg className="w-5 h-5 mr-3 text-[#1A1A1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <select 
            value={timeOfDay} 
            onChange={(e) => setTimeOfDay(e.target.value)}
            className="w-full h-full bg-transparent outline-none text-[#1A1A1A] text-[14px] appearance-none cursor-pointer"
          >
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
            <option value="Night">Night</option>
          </select>
          <svg className="w-4 h-4 ml-2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </FieldWrapper>

        {/* Starts Row */}
        <div className="flex gap-3">
          <div className="flex-1 min-w-0">
            <FieldWrapper label="Starts">
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-full min-w-0 bg-transparent outline-none text-[#1A1A1A] text-[13px] sm:text-[14px]"
              />
            </FieldWrapper>
          </div>
          <div className="flex-1 min-w-0">
            <FieldWrapper label="Start time">
              <input 
                type="time" 
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full h-full min-w-0 bg-transparent outline-none text-[#1A1A1A] text-[13px] sm:text-[14px]"
              />
            </FieldWrapper>
          </div>
        </div>

        {/* Ends Row */}
        <div className="flex gap-3">
          <div className="flex-1 min-w-0">
            <FieldWrapper label="Ends">
              <input 
                type="date" 
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full h-full min-w-0 bg-transparent outline-none text-[#1A1A1A] text-[13px] sm:text-[14px]"
              />
            </FieldWrapper>
          </div>
          <div className="flex-1 min-w-0">
            <FieldWrapper label="End time">
              <input 
                type="time" 
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full h-full min-w-0 bg-transparent outline-none text-[#1A1A1A] text-[13px] sm:text-[14px]"
              />
            </FieldWrapper>
          </div>
        </div>

        {/* Repeat */}
        <FieldWrapper label="Repeat">
          <svg className="w-5 h-5 mr-3 text-[#1A1A1A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
          <select 
            value={repeat} 
            onChange={(e) => setRepeat(e.target.value)}
            className="w-full h-full bg-transparent outline-none text-[#1A1A1A] text-[14px] appearance-none cursor-pointer"
          >
            <option value="Never">Never</option>
            <option value="Every day">Every day</option>
            <option value="Every weekday">Every weekday</option>
            <option value="Every weekend">Every weekend</option>
            <option value="Weekly">Weekly</option>
            <option value="Monthly">Monthly</option>
          </select>
          <svg className="w-4 h-4 ml-2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </FieldWrapper>

        {/* Subtasks Section */}
        {subtasks.length === 0 ? (
          <div className="mt-4 -ml-1">
            <Subtask className="w-full" onAddClick={addSubtask} showLabel={false} />
          </div>
        ) : (
          <div className="mt-6 w-full flex flex-col">
            <h3 className="font-['Poppins',sans-serif] text-[14px] font-semibold text-[#1A1A1A] mb-3 ml-1">
              Subtasks
            </h3>
            
            <div className="flex flex-col gap-3">
              {subtasks.map((st, index) => (
                <div key={st.id} className="flex items-center gap-3 group">
                  {/* Number */}
                  <span className="w-4 text-[14px] font-medium font-['Poppins',sans-serif] text-[#1A1A1A] text-right shrink-0">
                    {index + 1}.
                  </span>
                  
                  {/* Input styled like other fields */}
                  <div className="flex-1 border border-[#1A1A1A] rounded-[24px] h-[48px] flex items-center px-4 overflow-hidden focus-within:ring-2 focus-within:ring-black/10 transition-shadow bg-transparent">
                    <input
                      type="text"
                      value={st.title}
                      onChange={(e) => updateSubtask(st.id, e.target.value)}
                      placeholder="Enter subtask..."
                      className="w-full h-full bg-transparent border-none outline-none text-[14px] font-['Poppins',sans-serif] text-[#1A1A1A] placeholder:text-[#1A1A1A]/40"
                    />
                  </div>
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => removeSubtask(st.id)}
                    className="w-[40px] h-[40px] flex items-center justify-center rounded-full text-[#1A1A1A]/40 hover:text-red-500 hover:bg-red-50 active:bg-red-100 transition-colors shrink-0"
                    title="Remove subtask"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={addSubtask}
              className="mt-3 flex items-center gap-2 text-[#418B7E] font-semibold text-[14px] font-['Poppins',sans-serif] hover:text-[#3A7C70] w-fit py-1 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              Add Another Subtask
            </button>
          </div>
        )}

      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-[24px]" />

      {/* Submit Button */}
      <button
        className="w-full h-[56px] shrink-0 bg-[#418B7E] rounded-full flex items-center justify-center gap-2 hover:bg-[#3A7C70] active:bg-[#102321] transition-colors focus:outline-none focus:ring-4 focus:ring-[#418B7E]/20"
        onClick={() => {
          console.log('Create Task', { taskName, timeOfDay, startDate, startTime, endDate, endTime, repeat });
          if (onSubmit) onSubmit();
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15l2 2 4-4" />
        </svg>
        <span className="text-white font-semibold text-[16px]">Create Task</span>
      </button>

    </div>
  );
}
