'use client';

import { useState } from 'react';

export function DocumentButton() {
  const [text, setText] = useState('');

  return (
    <div className="group flex items-center justify-between w-full max-w-[320px] rounded-[30px] border border-[#1a1a1a] bg-[#424242] pl-6 pr-2 py-2 transition-colors focus-within:ring-2 focus-within:ring-white/50 focus-within:bg-[#4d4d4d] hover:bg-[#4d4d4d]">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Open the Document"
        className="text-[#a5a5a5] text-lg font-medium tracking-wide bg-transparent outline-none w-full placeholder:text-[#a5a5a5] truncate mr-2"
      />
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          console.log("Document arrow clicked");
        }}
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#1a1a1a] transition-transform group-hover:scale-105 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/50"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-white"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
