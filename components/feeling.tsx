'use client';

import React, { useState } from 'react';
import { Slider } from './slider';

type Emotion = 'Anxious' | 'Tired' | 'Calm' | 'Ready';

const FaceAnxious = ({ stroke }: { stroke: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
    <path d="M8 9.5L10 10.5M16 9.5L14 10.5" />
    <path d="M9 15 Q12 13.5 15 15" />
  </svg>
);

const FaceTired = ({ stroke }: { stroke: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
    <path d="M8 10h2M14 10h2" />
    <path d="M9 15h6" />
  </svg>
);

const FaceCalm = ({ stroke }: { stroke: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
    <path d="M8 10 Q9 9 10 10 M14 10 Q15 9 16 10" />
    <path d="M9 14 Q12 16.5 15 14" />
  </svg>
);

const FaceReady = ({ stroke }: { stroke: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
    <path d="M7.5 9l2 1.5-2 1.5 M16.5 9l-2 1.5 2 1.5" />
    <path d="M9 14h6c0 2-6 2-6 0z" fill={stroke} />
  </svg>
);

const LowEnergyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 9.5h2M14 9.5h2M9 15 Q12 13 15 15"/>
  </svg>
);

const HighEnergyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 10 Q9 9 10 10 M14 10 Q15 9 16 10 M9 14 Q12 17 15 14"/>
  </svg>
);

const emotions: { id: Emotion; label: string; icon: React.FC<{ stroke: string }> }[] = [
  { id: 'Anxious', label: 'Anxious', icon: FaceAnxious },
  { id: 'Tired', label: 'Tired', icon: FaceTired },
  { id: 'Calm', label: 'Calm', icon: FaceCalm },
  { id: 'Ready', label: 'Ready', icon: FaceReady },
];

export function Feeling({ onChange }: { onChange?: (emotion: Emotion | null, energy: number | null) => void }) {
  const [selectedEmotion, setSelectedEmotion] = useState<Emotion | null>(null);
  const [energyLevel, setEnergyLevel] = useState<number | null>(null);
  const [text, setText] = useState('');

  // Call onChange when either updates
  const handleEmotionSelect = (emo: Emotion) => {
    setSelectedEmotion(emo);
    if (onChange) onChange(emo, energyLevel);
  };

  const handleEnergyChange = (val: number) => {
    setEnergyLevel(val);
    if (onChange) onChange(selectedEmotion, val);
  };

  return (
    <div className="w-[348px] h-[360px] bg-[#FDEFC8] rounded-[32px] p-[24px] flex flex-col shadow-sm">
      {/* Header */}
      <div className="text-center mt-2">
        <h2 className="font-serif text-[24px] font-semibold text-[#1A1A1A]">How are you feeling?</h2>
        <p className="font-sans text-[14px] text-[#1A1A1A]/50 mt-1">Checking in helps us support you.</p>
      </div>

      {/* Emotion Selector */}
      <div className="flex justify-between items-center mt-[22px]">
        {emotions.map((emo) => {
          const isSelected = selectedEmotion === emo.id;
          return (
            <button
              key={emo.id}
              onClick={() => handleEmotionSelect(emo.id)}
              className={`flex flex-col items-center justify-center gap-[6px] w-[64px] h-[72px] rounded-[24px] transition-all duration-300 ${
                isSelected 
                  ? 'bg-[#1A1A1A] text-white shadow-md scale-105' 
                  : 'bg-transparent text-[#1A1A1A] hover:bg-black/5'
              }`}
            >
              <emo.icon stroke={isSelected ? 'white' : '#1A1A1A'} />
              <span className="text-[13px] font-medium">{emo.label}</span>
            </button>
          );
        })}
      </div>

      {/* Energy Labels */}
      <div className="flex justify-between items-center mt-[22px] text-[13px] font-medium px-1">
        <div className="flex items-center gap-[6px] text-[#DB2727]">
          <LowEnergyIcon />
          <span>Low energy</span>
        </div>
        <div className="flex items-center gap-[6px] text-[#418B7E]">
          <HighEnergyIcon />
          <span>High energy</span>
        </div>
      </div>

      {/* Slider */}
      <div className="mt-3 px-1" onMouseUp={() => {
        // If slider doesn't expose onChange, we can hack it or we assume it exposes onChange. I'll pass onChange to Slider. 
      }}>
        <Slider className="!w-full max-w-[300px]" defaultValue={50} onChange={(val) => handleEnergyChange(typeof val === 'number' ? val : val[0])} />
      </div>

      {/* Text Input */}
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Anything else? (Optional)"
        className="mt-6 w-full h-[48px] rounded-full border-2 border-[#1A1A1A] bg-transparent px-[20px] text-[14px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none focus:ring-4 focus:ring-black/10 transition-all"
      />
    </div>
  );
}

export default Feeling;
