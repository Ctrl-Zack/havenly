'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import DateWidget from '@/components/date-widget';
import { CurrentTaskCard } from '@/components/current-task-card';
import Navbar from '@/components/navbar';
import { Plan } from '@/components/plan';
import { ManualTaskModal } from '@/components/ManualTaskModal';
import { CrisisButton } from '@/components/crisis-button';

export default function DashboardPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCrisisClick = () => {
    router.push('/crisis-mode');
  };

  const handlePlayTask = () => {
    router.push('/focus');
  };

  const handleViewAllTasks = () => {
    router.push('/task');
  };

  const handleCreateAI = () => {
    router.push('/task/create-ai');
    setIsAddModalOpen(false);
  };

  const handleCreateManual = () => {
    router.push('/task/create');
    setIsAddModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-gradient-to-b from-[#b3dcd1] to-[#418b7e] font-['Poppins',sans-serif]">
      {/* Background blobs / Graphic from Figma */}
      <div className="absolute h-[318px] left-[-81px] top-[-72px] w-[345px] pointer-events-none z-0 mix-blend-overlay opacity-50">
        <Image alt="" src="/assets/login-bg-blob.svg" fill className="object-contain" priority />
      </div>

      {/* Main Scrollable Content */}
      <div className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-hide">

        {/* Top Header Section (Transparent) */}
        <div className="w-full max-w-[400px] mx-auto relative z-20 pt-[60px] px-6">
          <CrisisButton onClick={handleCrisisClick} className="absolute top-[20px] left-[20px]" />
          
          <div className="-ml-6 -mr-6 flex justify-center w-[calc(100%+48px)] mt-[60px]">
            <DateWidget variant="transparent" />
          </div>
        </div>

        {/* Bottom Container Overlay */}
        <div
          className="mt-[40px] relative w-full max-w-[400px] mx-auto rounded-t-[48px] shadow-[0px_-10px_40px_rgba(0,0,0,0.1)] z-10 flex flex-col items-center pt-[32px] pb-[180px] min-h-[600px]"
          style={{ backgroundImage: "linear-gradient(181.844deg, rgb(252, 254, 232) 76.606%, rgb(151, 152, 139) 136.03%)" }}
        >
          <div className="w-full flex flex-col items-center gap-[32px] px-[16px] max-w-[400px]">
            {/* Currently In Progress */}
            <div className="w-full flex justify-center">
              <CurrentTaskCard onPlayClick={handlePlayTask} onViewAllClick={handleViewAllTasks} />
            </div>

            {/* Plan Section */}
            <div className="w-full flex justify-center pb-[20px]">
              <Plan onAddClick={() => setIsAddModalOpen(true)} className="w-full max-w-[400px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navbar (Absolute to PhoneFrame, outside scroll flow) */}
      <Navbar menu="Home" theme="Dark" className="bottom-[20px] z-30" />

      {/* Add Task Modal */}
      <ManualTaskModal isOpen={isAddModalOpen} onClose={handleCloseModal} />
    </div>
  );
}
