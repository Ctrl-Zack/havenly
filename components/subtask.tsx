'use client';

import { useState } from 'react';

type SubtaskProps = {
  className?: string;
  onAddClick?: () => void;
};

const addIcon = "https://www.figma.com/api/mcp/asset/11262d72-590a-4011-a0fb-af9cadfd4cd3";

export function Subtask({ className, onAddClick }: SubtaskProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={className || "relative w-[362px]"}
      data-node-id="333:2358"
    >
      {/* Floating Label */}
      <div className="absolute left-5 top-0 bg-[#fcfee8] px-1 -translate-y-1/2 z-10">
        <span className="text-[12px] font-normal leading-4 text-[#151515] font-['Poppins']">
          Subtask
        </span>
      </div>

      {/* Main Container */}
      <div className="border-2 border-solid border-black rounded-[24px] pt-6 pb-6 px-0 flex items-center">
        {/* Input Field */}
        <button
          onClick={onAddClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-center justify-center gap-[10px] h-[45px] mx-4 flex-1 border-2 border-dashed border-black rounded-[19px] px-4 transition-all duration-200 hover:bg-gray-200 active:bg-gray-100 cursor-pointer"
          data-node-id="333:2359"
        >
          <span className="text-[14px] font-normal leading-[18px] text-black font-['Poppins'] whitespace-nowrap">
            ADD SUB-TASK
          </span>
          <div
            className="flex-shrink-0 w-6 h-6 flex items-center justify-center"
            data-node-id="333:2360"
          >
            <img
              alt="Add subtask"
              src={addIcon}
              className="w-full h-full object-contain"
            />
          </div>
        </button>
      </div>
    </div>
  );
}
